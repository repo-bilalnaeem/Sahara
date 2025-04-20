import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

import { ActivityIndicator, Alert, useColorScheme, View } from "react-native";
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
import { loadToken, logout, setCredentials } from "@/slices/authSlice";
import { Toaster } from "sonner-native";
import { TranscriptionProvider } from "@/context/TranscriptionContext";
import { secureStorage } from "@/store/secureStorage";
import { apiSlice } from "@/slices/apiSlice";

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
  const { user, accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );
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

  useEffect(() => {
    const checkTokenExpiryAndRefresh = async () => {
      // console.log("User:", user);
      // console.log("RefreshToken: ", refreshToken);

      if (!user || !refreshToken) return;

      const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

      if (user.exp < currentTime) {
        try {
          const res = await fetch("http://192.168.1.103:3001/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          // console.log("Response is:", JSON.stringify(res));

          if (!res.ok) throw new Error("Failed to refresh token");

          const data = await res.json();
          // console.log(data);

          const { access_token } = data;

          // // Save new tokens
          await secureStorage.setItem("access_token", access_token);
          const refresh_token = await secureStorage.getItem("refresh_token");
          const stream_token = await secureStorage.getItem("stream_token");

          if (!refresh_token || !stream_token) {
            Alert.alert("Session has expired!");
            dispatch(logout());
            dispatch(apiSlice.util.resetApiState()); // ✅ fixed this
            router.replace("/signin");
            return;
          }

          // // Dispatch to update Redux
          dispatch(
            setCredentials({
              access_token,
              refresh_token,
              stream_token,
            })
          );
        } catch (error) {
          Alert.alert("Session has expired!");

          console.error("Token refresh failed:", error);
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState()); // ✅ fixed this

          router.replace("/signin");
        }
      }
    };

    if (!checkingAuth) {
      checkTokenExpiryAndRefresh();
    }
  }, [checkingAuth]);

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
