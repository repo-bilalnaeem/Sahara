import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Href, Slot, Stack, useRouter, useSegments } from "expo-router";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";
import { LogBox } from "react-native";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  LogBox.ignoreAllLogs(true); // Disable all warnings

  const { authState, initialized } = useAuth();
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
      router.replace("/(authenticated)/(tabs)" as Href);
    } else if (!authState?.authenticated && inAuthGroup) {
      router.replace("/signin"); // Ensure this redirects to the correct sign-in route
    }
  }, [loaded, initialized, authState, segments, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
      <Stack.Screen name="verification" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
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


export default RootLayoutNav