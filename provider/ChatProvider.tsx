import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { PropsWithChildren } from "react";
import { StreamChat } from "stream-chat";

const client = StreamChat.getInstance(
  process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY!
);

const ChatProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }
    // console.log(user.id);

    const connect = async () => {
      await client.connectUser(
        {
          id: user!.id,
          name: "Sahara Demo User",
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
    return <ActivityIndicator />;
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
};

export default ChatProvider;
