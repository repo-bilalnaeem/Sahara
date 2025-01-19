import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Href, Stack, useRouter, useSegments } from "expo-router";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/utils/Database";
import { LogBox, View, Text, StyleSheet } from "react-native";
import GoBack from "@/components/GoBack";
import { Provider } from "react-redux";
import { store } from "@/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_STRIPE_PUBLISHABLE_KEY in your .env"
  );
}

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

    // if (authState?.authenticated && !inAuthGroup) {
    //   router.replace("/(authenticated)/(tabs)" as Href);
    // } else if (!authState?.authenticated && inAuthGroup) {
    //   router.replace("/signin");
    // }
  }, [loaded, initialized, authState, segments, router]);

  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "",
          headerLeft: () => (
            <View style={styles.titleFlex}>
              <GoBack />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="resetPassword"
        options={{
          headerLeft: () => <GoBack />,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          headerLeft: () => <GoBack />,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="verification"
        options={{
          headerTitle: "",
          headerLeft: () => <GoBack />,
        }}
      />
      <Stack.Screen name="modal" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <AuthProvider>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY!}>
        <Provider store={store}>
          <SQLiteProvider databaseName="chat,db" onInit={migrateDbIfNeeded}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <InitialLayout />
            </GestureHandlerRootView>
          </SQLiteProvider>
        </Provider>
      </StripeProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  titleFlex: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    color: "#1E1F22",
    fontStyle: "normal",
    fontWeight: "500",
  },
});

export default RootLayoutNav;
