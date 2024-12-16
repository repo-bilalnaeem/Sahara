import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Href, Slot, Stack, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store";
import { NativeModules } from "react-native";
import * as SecureStore from "expo-secure-store";

const { scriptURL } = NativeModules.SourceCode;
const scriptHostname = scriptURL.split("://")[1].split(":")[0];
// console.log(scriptHostname);

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  LogBox.ignoreAllLogs(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const segments = useSegments();
  const router = useRouter();

  const accessToken = async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
      const user_id = await SecureStore.getItemAsync("user_id");
      if (access_token && user_id) {
        console.log("Token available");
        console.log("user_id", user_id);
        setIsSignedIn(true); // User is signed in
      } else {
        console.log("No access_token ID found, redirecting to sign-in...");
        setIsSignedIn(false); // User is not signed in
      }
    } catch (err) {
      console.error("Error accessing SecureStore:", err);
    }
  };

  const [loaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Lato700: require("@/assets/fonts/Lato-Bold.ttf"),
    Lato400: require("@/assets/fonts/Lato-Regular.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    accessToken(); // Check SecureStore on app launch
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)" as Href);
    }
  }, [isSignedIn, segments, loaded]);

  if (!loaded) {
    return <Slot />;
  }

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
    <Provider store={store}>
      {/* <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY} */}
      <SQLiteProvider databaseName="chat,db" onInit={migrateDbIfNeeded}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </SQLiteProvider>
      {/* </StripeProvider> */}
    </Provider>
  );
};

export default RootLayoutNav;
