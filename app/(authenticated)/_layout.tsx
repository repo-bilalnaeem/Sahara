import React, { useEffect, useState } from "react";
import { Stack, useNavigation } from "expo-router";
import "react-native-get-random-values";
import { OverlayProvider } from "stream-chat-expo";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const Layout = () => {
  SystemNavigationBar.navigationHide(); // for android
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  // const { isSignedIn, userId } = useAuth();

  // useEffect(() => {
  //   if (isSignedIn && userId) {
  //     console.log("User ID:", userId);

  //     const streamUser: User = {
  //       id: userId,
  //       type: "guest",
  //     };
  //     const clientInstance = StreamVideoClient.getOrCreateInstance({
  //       apiKey: STREAM_KEY!,
  //       user: streamUser,
  //     });

  //     setClient(clientInstance);
  //     // console.log("Client initialized:", clientInstance);
  //   }
  // }, [isSignedIn]);

  useEffect(() => {
    if (client) {
      // console.log("StreamVideoClient instance:", client);
    }
  }, [client]);

  return client ? (
    <StreamVideo client={client}>
      <OverlayProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(schedules)" options={{ headerShown: false }} />
          <Stack.Screen name="userProfile" options={{ headerShown: false }} />
          <Stack.Screen name="(services)" options={{ headerShown: false }} />
          <Stack.Screen name="(chats)" options={{ headerShown: false }} />
        </Stack>
      </OverlayProvider>
    </StreamVideo>
  ) : (
    <Stack screenOptions={{ headerShown: false }}>
      {/* You can place a fallback UI here if needed */}
    </Stack>
  );
};

export default Layout;
