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
import { useMMKVString } from "react-native-mmkv";
import OpenAI from "react-native-openai";
import { FlashList } from "@shopify/flash-list";
import ChatMessage from "@/components/ChatMessage";
import { Message, Role } from "@/utils/Interfaces";
import MessageIdeas from "@/components/MessageIdeas";
import { addChat, addMessage, getMessages } from "@/utils/Database";
import { useSQLiteContext } from "expo-sqlite/next";
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

  // if (!key || key === "" || !organization || organization === "") {
  //   return <Redirect href={"/(modals)/settings"} />;
  // }

  const [chatId, _setChatId] = useState(id);
  const chatIdRef = useRef(chatId);
  // https://stackoverflow.com/questions/55265255/react-usestate-hook-event-handler-using-initial-state
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

  const openAI = useMemo(
    () =>
      new OpenAI({
        apiKey: "",
        organization: "",
      }),
    []
  );

  useEffect(() => {
    const handleNewMessage = (payload: any) => {
      setMessages((messages) => {
        const newMessage = payload.choices[0]?.delta.content;
        if (newMessage) {
          messages[messages.length - 1].content += newMessage;
          return [...messages];
        }
        if (payload.choices[0]?.finishReason) {
          // save the last message

          addMessage(db, parseInt(chatIdRef.current), {
            content: messages[messages.length - 1].content,
            role: Role.Bot,
          });
        }
        return messages;
      });
    };

    openAI.chat.addListener("onChatMessageReceived", handleNewMessage);

    return () => {
      openAI.chat.removeListener("onChatMessageReceived");
    };
  }, [openAI]);

  const onGptVersionChange = (version: string) => {
    setGptVersion(version);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  const getCompletion = async (text: string) => {
    if (messages.length === 0) {
      addChat(db, text).then((res) => {
        const chatID = res.lastInsertRowId;
        setChatId(chatID.toString());
        addMessage(db, chatID, { content: text, role: Role.User });
      });
    }

    setMessages([
      ...messages,
      { role: Role.User, content: text },
      { role: Role.Bot, content: "" },
    ]);
    messages.push();
    openAI.chat.stream({
      messages: [
        {
          role: "user",
          content: text,
        },
      ],
      model: gptVersion == "4" ? "gpt-4" : "gpt-3.5-turbo",
    });
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
              <Link href={"/(chat)/new"} push asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color="#242026"
                    style={{ marginRight: 16 }}
                  />
                </TouchableOpacity>
              </Link>
            </View>
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
