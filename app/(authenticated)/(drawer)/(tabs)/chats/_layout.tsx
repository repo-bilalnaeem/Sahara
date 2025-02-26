import GoBack from "@/components/GoBack";
import { useUser } from "@clerk/clerk-expo";
import { Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat, User } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const client = StreamChat.getInstance(STREAM_KEY!);

const Layout = () => {
  // const { user, isLoaded } = useUser();
  // useEffect(() => {
  //   const connect = async () => {
  //     await client.connectUser(
  //       {
  //         id: user!.id,
  //         name: "Sahara Demo User",
  //         image: "https://getstream.io/random_svg/?name=John",
  //       },
  //       client.devToken(user!.id)
  //     );
  //   };

  //   connect();

  //   return () => {
  //     client.disconnectUser();
  //   };
  // });

  return (
    <OverlayProvider>
      {/* <Chat client={client}> */}
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Messages",
              headerLeft: () => <GoBack />,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="[cid]"
            options={{
              title: "channel",
              headerBackButtonDisplayMode: "minimal",
              headerLeft: () => <GoBack />,

              //   headerShown: false,
            }}
          />
        </Stack>
      {/* </Chat> */}
    </OverlayProvider>
  );
};

export default Layout;
