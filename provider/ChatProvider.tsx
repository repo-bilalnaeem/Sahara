import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { PropsWithChildren } from "react";
import { StreamChat } from "stream-chat";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log(user.id);

    const connect = async () => {
      await client.connectUser(
        {
          id: user!.id,
          name: "Bilal Naeem",
          image: "https://getstream.io/random_svg/?name=John",
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
