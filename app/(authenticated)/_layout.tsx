import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useAuth } from "@clerk/clerk-expo";
import GoBack from "@/components/GoBack";
import { StripeProvider } from "@stripe/stripe-react-native";
import VideoProvider from "@/provider/VideoProvider";
import CallProvider from "@/provider/CallProvider";

const STRIPE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const Layout = () => {
  return (
    <Provider store={store}>
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
                <Stack.Screen name="call" />
              </Stack>
            </SQLiteProvider>
          </StripeProvider>
        </CallProvider>
      </VideoProvider>
    </Provider>
  );
};

export default Layout;
