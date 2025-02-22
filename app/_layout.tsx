import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GoBack from "@/components/GoBack";

export { ErrorBoundary } from "expo-router";
import { LogBox } from "react-native";
import VideoProvider from "@/provider/VideoProvider";

LogBox.ignoreAllLogs();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // console.log(segments);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(authenticated)";
    // console.log("In Auth Group:", inAuthGroup);
    // console.log("Is User Authenticated: ", isSignedIn);

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(drawer)/(tabs)");
    } else if (!isSignedIn && inAuthGroup) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"#000"} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          headerLeft: () => <GoBack />,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          headerLeft: () => <GoBack />,
          headerTitle: "",
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="verification"
        options={{
          headerLeft: () => <GoBack />,
          headerTitle: "",
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="resetPassword"
        options={{
          headerLeft: () => <GoBack />,
          headerTitle: "",
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerShown: false,
          sheetGrabberVisible: true,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default RootLayoutNav;
