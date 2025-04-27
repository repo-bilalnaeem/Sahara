import {
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import {
  Redirect,
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import HeaderDropDown from "@/components/HeaderDropDown";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";
import { Message, Role } from "@/utils/Interfaces";
import { StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ChatMessage from "@/components/ChatMessage";
import { useMMKVString } from "react-native-mmkv";
import { Storage } from "@/utils/Storage";
import OpenAI from "react-native-openai";
import { useSQLiteContext } from "expo-sqlite";
import { addChat, addMessage, getMessages } from "@/utils/Database";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { DrawerActions } from "@react-navigation/native";
import { useTranscription } from "@/context/TranscriptionContext";
import { toast } from "sonner-native";
import * as FileSystem from "expo-file-system";

const role = `
You are an experienced, empathetic, and highly knowledgeable doctor specializing in patient communication and care.
Your role is to engage in realistic, professional medical consultations with patients. You must adhere to the following guidelines:
1. Act as a Real Doctor:  
   - Converse naturally with the patient, showing empathy and professionalism.  
   - Ask relevant and focused counter-questions to gather essential details about the patient's condition.  
2. Diagnosis and Treatment:  
   - Accurately diagnose conditions based on patient symptoms and responses.  
   - Provide concise and to-the-point answers and diagnoses to ensure clarity.  
3. Specialist Recommendations:  
   - Recommend consultations with specialist doctors when necessary.  
   - Ensure referrals are appropriate to the patient's condition.  
4. Medication Advice:  
   - Recommend over-the-counter medications where applicable, explaining their purpose.  
   - Avoid prescribing controlled substances or medications requiring a prescription.  
5. Education and Counseling:  
   - Educate patients about their condition in simple, understandable terms.  
   - Offer actionable advice and steps to manage or improve their health.  
6. Ethical and Domain-Specific Responses:  
   - Stick strictly to medical advice. Politely refuse to answer questions outside the medical domain.  
   - Comply with medical ethics, ensuring the privacy and well-being of the patient.  
7. Evidence-Based Practices:  
   - Base all diagnoses and recommendations on up-to-date, evidence-based medical practices.  
   - Consider a vast database of medical knowledge to make comprehensive treatment plans.  
8. Compliance and Monitoring:  
   - Prescribe therapies and treatments while monitoring their potential effectiveness and side effects.  
   - Emphasize follow-ups and continuity of care for better patient outcomes.  
9. Concise Responses:  
   - Provide short, focused answers that are between 75 to 90 words.  
   - Avoid lengthy explanations and prioritize clear and concise communication.  
10. Domain-Specific Queries Only:  
   - Do not answer any question outside the domain of medicine.  
   - Respond with: "I don't have knowledge about this topic. If you have any other medical query, feel free to ask."
   - "جواب دیں: "مجھے اس موضوع کا علم نہیں ہے۔ اگر آپ کے پاس کوئی اور طبی سوال ہو تو براہ کرم پوچھیں۔
11. Personalized Assistance:  
   - Your name is "Sahara", and you are here to assist patients with their medical queries.  
   - Where appropriate, mention your name in your responses in a professional and empathetic manner.
12. Language Flexibility:  
   - Respond only in English or Urdu.  
   - If the patient asks in Urdu, reply in Urdu.  
   - If the patient asks in English, reply in English.  
   - If the patient uses Hindi, respond in Urdu.    
You are here to help the patient feel cared for and provide expert medical advice in a conversational manner, just as a real doctor would.
IMPORTANT:
- Always make sure responses are between **75 to 90 words** in length, unless the user explicitly asks for a shorter reply.
- Be thorough in your medical explanation without being repetitive. Use empathetic language while staying concise.
- Strictly **do not answer any question that is not related to medicine**. If such a question is asked, respond with:  
  "I don't have knowledge about this topic. If you have any other medical query, feel free to ask."  
  جواب دیں: "مجھے اس موضوع کا علم نہیں ہے۔ اگر آپ کے پاس کوئی اور طبی سوال ہو تو براہ کرم پوچھیں۔"
`;

const ChatPage = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [height, setHeight] = useState(0);
  const { audioUri, setAudioUri } = useTranscription();
  const [isTranscribing, setIsTranscribing] = useState(false);
  const isTranscribingRef = useRef(false);

  const [gptVersion, setGptVersion] = useMMKVString("gptVersion", Storage);

  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const [chatId, setChatId] = useState<string | null>(id);
  const chatIdRef = useRef<string | null>(id);

  const apiKey = process.env.EXPO_PUBLIC_OPENAI_KEY!!;

  const organization = process.env.EXPO_PUBLIC_ORGANIZATION_KEY!!;

  useEffect(() => {
    if (!id) {
      console.log("No chat ID provided — waiting to create new chat...");
      return;
    }

    console.log("Switching to Chat ID:", id);

    setMessages([]);

    getMessages(db, parseInt(id))
      .then((messages) => {
        if (!Array.isArray(messages)) {
          console.error("Invalid messages format:", messages);
          setMessages([]);
          return;
        }
        setMessages(messages.filter((msg) => msg?.content !== undefined));
      })
      .catch((err) => console.error("Error fetching messages:", err));
  }, [id]);

  const openAI = useMemo(
    () =>
      new OpenAI({
        apiKey,
        organization,
      }),
    []
  );

  const getCompletion = async (message: string) => {
    console.log("Getting completion for:", message);
    let chatID = chatIdRef.current;

    if (!chatID) {
      try {
        const result = await addChat(db, message);
        chatID = result.lastInsertRowId.toString();
        setChatId(chatID);
        chatIdRef.current = chatID;
        console.log("New Chat ID:", chatID);
      } catch (error) {
        console.error("Error creating new chat:", error);
        return;
      }
    }

    const userMessage = { content: message, role: Role.User };
    const botMessage = { role: Role.Bot, content: "" };

    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);

    try {
      await addMessage(db, parseInt(chatID), userMessage);
    } catch (error) {
      console.error("Error saving user message:", error);
    }

    try {
      // const stream = openAI.chat.stream({
      //   messages: [
      //     { role: "system", content: role },
      //     { role: "user", content: message },
      //   ],
      //   model: gptVersion === "4" ? "gpt-4" : "gpt-3.5-turbo",
      // });

      // 🛠 Build a conversation context

      const MAX_HISTORY_MESSAGES = 10; // ⬅️ last 10 user+bot messages

      const conversationHistory = [
        { role: "system", content: role },
        ...messages
          .slice(-MAX_HISTORY_MESSAGES) // ✅ only take the latest N messages
          .map((msg) => ({
            role: msg.role === Role.User ? "user" : "assistant",
            content: msg.content,
          })),
        { role: "user", content: message },
      ];

      const stream = openAI.chat.stream({
        messages: conversationHistory,
        model: gptVersion === "4" ? "gpt-4" : "gpt-3.5-turbo",
      });
    } catch (error) {
      console.error("OpenAI API Error:", error);
    }
  };

  useEffect(() => {
    const handleMessage = (payload: any) => {
      if (!payload.choices || payload.choices.length === 0) return;

      setMessages((prevMessages) => {
        if (prevMessages.length === 0) return prevMessages;

        const lastMessageIndex = prevMessages.length - 1;
        const lastMessage = prevMessages[lastMessageIndex];

        if (!lastMessage || lastMessage.role !== Role.Bot) return prevMessages;

        const newContent = payload.choices[0]?.delta?.content || "";

        if (newContent) {
          return prevMessages.map((msg, index) =>
            index === lastMessageIndex
              ? { ...msg, content: msg.content + newContent }
              : msg
          );
        }

        if (payload.choices[0]?.finishReason) {
          try {
            // Ensure message isn't saved twice
            if (lastMessage.content.trim() !== "") {
              addMessage(
                db,
                parseInt(chatIdRef.current as string),
                lastMessage
              );
            }
          } catch (error) {
            console.error("Error saving bot message:", error);
          }
        }

        return prevMessages;
      });
    };

    openAI.chat.addListener("onChatMessageReceived", handleMessage);

    return () => {
      openAI.chat.removeListener("onChatMessageReceived");
    };
  }, [openAI]);

  const onLayout = (event: any) => {
    setHeight(event.nativeEvent.layout.height);
  };

  useEffect(() => {
    const transcribeAudioIfNeeded = async () => {
      if (!audioUri || isTranscribing) return;

      setIsTranscribing(true);
      toast.loading("Transcribing audio...");

      try {
        const formData = new FormData();
        const audioData = {
          uri: audioUri,
          name: "audio.m4a",
          type: "audio/m4a",
        };
        formData.append("file", audioData as any);

        const response = await fetch(`/api/speech-to-text`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }).then((res) => res.json());

        console.log("Transcription Response:", response);

        if (response.text) {
          getCompletion(response.text);
        } else {
          toast.error("No transcription found");
        }

        // Delete file and clear state
        await FileSystem.deleteAsync(audioUri, { idempotent: true });
        setAudioUri(null);
      } catch (error) {
        console.error("Error transcribing audio:", error);
        toast.error("Failed to transcribe");
      } finally {
        setIsTranscribing(false);
        toast.dismiss();
      }
    };

    transcribeAudioIfNeeded();
  }, [audioUri]);
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: "SaharaBot",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              style={{ marginLeft: 16 }}
            >
              <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image
              source={require("@/assets/images/Vector.png")}
              style={styles.image}
            />
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 30 }}
          keyboardDismissMode="on-drag"
        />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSend={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});

export default ChatPage;
