import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";

SplashScreen.preventAutoHideAsync();

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const InitialLayout = () => {
  const { authState, initialized } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const segments = useSegments();
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Lato700: require("@/assets/fonts/Lato-Bold.ttf"),
    Lato400: require("@/assets/fonts/Lato-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    if (!initialized) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (authState?.authenticated && !inAuthGroup) {
      router.replace("/(authenticated)");
    } else if (!authState?.authenticated && inAuthGroup) {
      client?.disconnectUser();
      router.replace("/signin"); // Ensure this redirects to the correct sign-in route
    }
  }, [loaded, initialized, authState, segments, router, client]);

  useEffect(() => {
    if (authState?.authenticated && authState.token) {
      const user: User = { id: authState.user_id! };

      try {
        const client = new StreamVideoClient({
          apiKey: STREAM_KEY!,
          user,
          token: authState.token,
        });
        setClient(client);
      } catch (e) {
        console.log("Error creating client: ", e);
        Toast.show({
          type: "error",
          text1: "Failed to initialize video client",
        });
      }
    } else {
      setClient(null); // Clear the client if the user is not authenticated
    }
  }, [authState]);

  return (
    <>
      {!client ? (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signin" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgotPassword"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="verification" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/modal"
            options={{ headerShown: false }}
          />
        </Stack>
      ) : (
        <StreamVideo client={client}>
          <OverlayProvider>
            <Slot />
            <Toast />
          </OverlayProvider>
        </StreamVideo>
      )}
    </>
  );
};

const RootLayoutNav = () => {
  return (
    <AuthProvider>
      <SQLiteProvider databaseName="chat,db" onInit={migrateDbIfNeeded}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </SQLiteProvider>
    </AuthProvider>
  );
};

export default RootLayoutNav;
