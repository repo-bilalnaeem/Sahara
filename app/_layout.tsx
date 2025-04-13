import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

import { ActivityIndicator, useColorScheme, View } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GoBack from "@/components/GoBack";

export { ErrorBoundary } from "expo-router";
import { LogBox } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/store/store";
import { loadToken } from "@/slices/authSlice";
import { Toaster } from "sonner-native";
import { TranscriptionProvider } from "@/context/TranscriptionContext";

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  // const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true); // Prevents routing before token is checked

  useEffect(() => {
    dispatch(loadToken()).finally(() => setCheckingAuth(false));
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // if (!isLoaded) return;
    if (checkingAuth) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (accessToken && !inAuthGroup) {
      router.replace("/(authenticated)/(drawer)/(tabs)");
    } else if (!accessToken && inAuthGroup) {
      router.replace("/signin");
    }
  }, [accessToken, checkingAuth]);

  if (!loaded || checkingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} color={"#000"} />
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
    <TranscriptionProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Toaster />
            <InitialLayout />
          </GestureHandlerRootView>
        </Provider>
      </ThemeProvider>
    </TranscriptionProvider>
  );
};

export default RootLayoutNav;
