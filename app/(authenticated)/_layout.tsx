import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { OverlayProvider } from "stream-chat-expo";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const Layout = () => {
  const { authState } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    if (authState?.authenticated && authState.token) {
      const user: User = { id: authState.user_id! };
      try {
        const newClient = new StreamVideoClient({
          apiKey: STREAM_KEY!,
          user,
          token: authState.token,
        });
        setClient(newClient);
      } catch (e) {
        console.log("Error creating StreamVideo client: ", e);
      }
    } else {
      setClient(null);
    }
  }, [authState]);

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
     
        </Stack>
        <Toast />
      </OverlayProvider>
    </StreamVideo>
  ) : (
    // Optionally, you can handle the case where the client is not available
    <Stack screenOptions={{ headerShown: false }}>
      {/* You can place a fallback UI here if needed */}
    </Stack>
  );
};

export default Layout;
