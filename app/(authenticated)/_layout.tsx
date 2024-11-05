import React, { useEffect, useState } from "react";
import { Link, Stack, useNavigation } from "expo-router";
import "react-native-get-random-values";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { OverlayProvider } from "stream-chat-expo";
import { useAuth } from "@/context/AuthContext";
import SystemNavigationBar from "react-native-system-navigation-bar";

import GoBack from "@/components/GoBack";
import HeaderDropDown from "@/components/HeaderDropDown";
import { View } from "react-native";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const Layout = () => {
  SystemNavigationBar.navigationHide(); // for android
  const navigation = useNavigation();
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
    <StreamVideo client={client}>
      <OverlayProvider>
        <Stack
        // screenOptions={{
        //   headerShown: false,
        // }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(schedules)" options={{ headerShown: false }} />
          <Stack.Screen name="userProfile" options={{ headerShown: false }} />
          <Stack.Screen name="(services)" options={{ headerShown: false }} />

          <Stack.Screen
            name="chats"
            options={{
              title: "Chats",
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "regular",
              headerStyle: {
                backgroundColor: "#fff",
              },

              headerTitleStyle: { fontSize: 16, fontWeight: "500" },
              headerSearchBarOptions: {
                placeholder: "Search",
              },
              headerLeft: () => (
                <View style={{ marginRight: 13 + 15 }}>
                  <GoBack title={undefined} />
                </View>
              ),
            }}
          />
        </Stack>
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
