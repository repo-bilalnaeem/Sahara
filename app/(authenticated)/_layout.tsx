import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";
// import { Provider } from "react-redux";

import GoBack from "@/components/GoBack";
import { StripeProvider } from "@stripe/stripe-react-native";
import VideoProvider from "@/provider/VideoProvider";
import CallProvider from "@/provider/CallProvider";
import ChatProvider from "@/provider/ChatProvider";

const STRIPE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const Layout = () => {
  return (
    <ChatProvider>
      <VideoProvider>
        <CallProvider>
          <StripeProvider publishableKey={STRIPE_KEY!}>
            <SQLiteProvider databaseName="chats.db" onInit={migrateDbIfNeeded}>
              <Stack
                screenOptions={{
                  contentStyle: { backgroundColor: Colors.selected },
                }}
              >
                <Stack.Screen
                  name="(drawer)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(services)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="notification"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(mart)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(doctor)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(schedules)/[id]"
                  options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerLeft: () => <GoBack />,
                  }}
                />
                <Stack.Screen
                  name="(booking)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="success"
                  options={{
                    headerShown: false,
                    presentation: "fullScreenModal",
                  }}
                />
                <Stack.Screen
                  name="call"
                  options={{
                    title:"",
                    headerTransparent: true,
                    headerLeft: () => <GoBack />,
                  }}
                />
                <Stack.Screen
                  name="searching"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
            </SQLiteProvider>
          </StripeProvider>
        </CallProvider>
      </VideoProvider>
    </ChatProvider>
  );
};

export default Layout;
