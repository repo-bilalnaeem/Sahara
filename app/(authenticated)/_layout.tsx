import React, { useEffect, useState } from "react";
import { Stack, useNavigation } from "expo-router";
import "react-native-get-random-values";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { OverlayProvider } from "stream-chat-expo";
import { useAuth } from "@/context/AuthContext";
import SystemNavigationBar from "react-native-system-navigation-bar";
import { StripeProvider } from "@stripe/stripe-react-native";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51OlPKCLrLAoOM1DrfTXzkUpLEwZCMIKUJg9p1fjg7O9U5CLMvYipstS8LcnGuANlg3vIcgk4Df4oOzO5HMEACohx00p6ce6w8S";

const Layout = () => {
  SystemNavigationBar.navigationHide(); // for android
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
        console.log(user);
      } catch (e) {
        console.log("Error creating StreamVideo client: ", e);
      }
    } else {
      setClient(null);
    }
  }, [authState]);

  return client ? (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
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
            {/* <Stack.Screen name="(chats)" options={{ headerShown: false }} /> */}
          </Stack>
        </OverlayProvider>
      </StreamVideo>
    </StripeProvider>
  ) : (
    <Stack screenOptions={{ headerShown: false }}></Stack>
  );
};

export default Layout;
