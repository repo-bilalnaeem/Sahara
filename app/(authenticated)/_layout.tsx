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
import GoBack from "@/components/GoBack";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const Layout = () => {
  SystemNavigationBar.navigationHide(); // for android
  const { authState } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const { top } = useSafeAreaInsets();
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
    <StreamVideo client={client}>
      <OverlayProvider>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="(schedules)" options={{ headerShown: false }} />
          <Stack.Screen name="userProfile" options={{ headerShown: false }} />
          <Stack.Screen name="(services)" options={{ headerShown: false }} />
          <Stack.Screen
            name="notification"
            options={{
              headerLeft: () => <GoBack />,
            }}
          />
        </Stack>
      </OverlayProvider>
    </StreamVideo>
  ) : (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="notification"
        options={{
          header: () => (
            <View
              style={[
                {
                  display: "flex",
                  flexDirection: "row",
                  paddingHorizontal: 12,
                  gap: 16,
                  alignItems: "center",
                  marginBottom: 16,
                },
                {
                  paddingTop: top,
                },
              ]}
            >
              <GoBack />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Notifications
              </Text>
            </View>
          ),
          title: "",
        }}
      />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
