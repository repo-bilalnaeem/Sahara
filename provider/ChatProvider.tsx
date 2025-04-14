import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { PropsWithChildren } from "react";
import { StreamChat } from "stream-chat";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { User } from "@/app/signin";
import * as SecureStore from "expo-secure-store";

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isReady, setIsReady] = useState(false);

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const storedData = await SecureStore.getItemAsync("user_data");
        if (!storedData) return;
        // console.log(storedData);
        const parsedUser = JSON.parse(storedData);
        // console.log("parsed:", parsedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error(error);
      }
    };
    initializeUser();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log(user.id);

    const connect = async () => {
      await client.connectUser(
        {
          id: user!.id,
          name: userData?.name,
          image: userData?.imageUrl,
          // image: "https://galaxies.dev/img/meerkat_2.jpg",
        },
        client.devToken(user!.id)
      );
      setIsReady(true);
    };
    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [user]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
