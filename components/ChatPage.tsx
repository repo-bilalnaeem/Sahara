import HeaderDropDown from "@/components/HeaderDropDown";
import MessageInput from "@/components/MessageInput";
import { keyStorage, storage } from "@/utils/Storage";
import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from 'axios'
import { useMMKVString } from "react-native-mmkv";
import { FlashList } from "@shopify/flash-list";
import ChatMessage from "@/components/ChatMessage";
import { Message, Role } from "@/utils/Interfaces";
import MessageIdeas from "@/components/MessageIdeas";
import { addChat, addMessage, getMessages } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ChatPage = () => {
  const [gptVersion, setGptVersion] = useMMKVString("gptVersion", storage);
  const [height, setHeight] = useState(0);
  const [key, setKey] = useMMKVString("apikey", keyStorage);
  const [organization, setOrganization] = useMMKVString("org", keyStorage);
  const [messages, setMessages] = useState<Message[]>([]);
  const db = useSQLiteContext();
  let { id } = useLocalSearchParams<{ id: string }>();


  const [chatId, _setChatId] = useState(id);
  const chatIdRef = useRef(chatId);
  function setChatId(id: string) {
    chatIdRef.current = id;
    _setChatId(id);
  }

  useEffect(() => {
    if (id) {
      getMessages(db, parseInt(id)).then((res) => {
        setMessages(res);
      });
    }
  }, [id]);

  const flaskBaseURL = process.env.EXPO_PUBLIC_FLASK_SERVER_URL;

  const [result, setResult] = React.useState("");

  const onGptVersionChange = (version: string) => {
    setGptVersion(version);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  // Function to send messages to Flask server
  const getCompletion = async (text: string) => {
    // If it's the first message, create a new chat entry in the database
    if (messages.length === 0) {
      addChat(db, text).then((res) => {
        const chatID = res.lastInsertRowId;
        setChatId(chatID.toString());
  
        // Save the user message in the database
        addMessage(db, chatID, { content: text, role: Role.User });
  
        // Add the user message to the state as well
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: Role.User, content: text },
          { role: Role.Bot, content: "..." }, // Placeholder for bot's response
        ]);
      });
    } else {
      // If there are existing messages, add the new message directly
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: Role.User, content: text },
        { role: Role.Bot, content: "..." }, // Placeholder for bot's response
      ]);
    }
  
    try {
      // Send the user's message to the Flask server to get the bot's response
      const response = await axios.post(`${flaskBaseURL}/chat`, {
        message: text,
        gptVersion: gptVersion === "4" ? "gpt-4" : "gpt-3.5-turbo",
      });
  
      // Update the last message (the bot's placeholder) with the actual response
      setMessages((prevMessages) => {
        return prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, content: response.data.response } // Replace placeholder with response
            : msg
        );
      });
  
      // Save the bot's response to the database as well
      if (chatIdRef.current) {
        addMessage(db, parseInt(chatIdRef.current), {
          content: response.data.response,
          role: Role.Bot,
        });
      }
    } catch (error) {
      console.error("Error fetching response from server:", error);
  
      // If there's an error, replace the placeholder with an error message
      setMessages((prevMessages) => {
        return prevMessages.map((msg, index) =>
          index === prevMessages.length - 1
            ? { ...msg, content: "Sorry, something went wrong!" }
            : msg
        );
      });
  
      // Optionally, save an error message to the database if needed
      if (chatIdRef.current) {
        addMessage(db, parseInt(chatIdRef.current), {
          content: "Sorry, something went wrong!",
          role: Role.Bot,
        });
      }
    }
  };
  
  
  

  
  return (
    <View style={styles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 18,
              }}
            >
              <HeaderDropDown
                title="SaharaBot"
                items={[
                  { key: "3.5", title: "GPT-3.5", icon: "bolt" },
                  { key: "4", title: "GPT-4", icon: "sparkles" },
                ]}
                onSelect={onGptVersionChange}
                selected={gptVersion}
                
              />
            </View>
          ),

          headerRight: () => (
            <Link href={"/(drawer)/(chat)/new"} push asChild>
              <TouchableOpacity>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={"#242026"}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <View style={styles.page} onLayout={onLayout}>
        {messages.length == 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image
              source={require("@/assets/images/my-adaptive-icon.png")}
              style={styles.image}
            />
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="on-drag"
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
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
    // width: 80,
    // height: 80,
    // backgroundColor: "#000",
    // borderRadius: 50,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    // tintColor: "gray",
  },
  page: {
    flex: 1,
  },

  pageContainer: {
    flex: 1,
    backgroundColor: "#FFFCFF",
  },
});
export default ChatPage;
