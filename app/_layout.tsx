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
import { apiSlice, useLazyGetLoggedUserQuery } from "@/slices/apiSlice";

LogBox.ignoreAllLogs();

SplashScreen.preventAutoHideAsync();
const BASE_URL="http://192.168.1.100:3001/"
const InitialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [triggerGetLoggedUser] = useLazyGetLoggedUserQuery();

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
    const checkUserProfile = async () => {
      if (checkingAuth) return;

      try {
        const userData = await triggerGetLoggedUser().unwrap();
        // console.log("Fetched user data:", userData.user);

        // Check if the customer profile is set up
        if (!userData.user.Customer) {
          // Navigate to profile setup page if customer profile isn't set
          router.replace("/(authenticated)/userProfile");
        } else {
          // If customer profile is set, navigate to tabs
          router.replace("/(authenticated)/(drawer)/(tabs)");
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        // Alert.alert("Something went wrong!");
      }
    };

    checkUserProfile();
  }, [accessToken, checkingAuth, router, triggerGetLoggedUser]);

  useEffect(() => {
    if (checkingAuth) return; // don't do anything while still checking auth
  
    const inAuthGroup = segments[0] === "(authenticated)";
  
    if (accessToken && !inAuthGroup) {
      // User is logged in but not inside (authenticated) group
      router.replace("/(authenticated)/(drawer)/(tabs)");
    }
  }, [segments, accessToken, checkingAuth]);
  

  useEffect(() => {
    const checkTokenExpiryAndRefresh = async () => {
      if (!user || !refreshToken) return;

      const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

      console.log("user expiry is:",user.exp)


      if (user.exp < currentTime) {
        try {
          const res = await fetch(`${BASE_URL}auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshToken}`,
            },
          });

          console.log("Response is: ", res)


          if (!res.ok) throw new Error("Failed to refresh token");

          const data = await res.json();

          const { access_token } = data;

          // // Save new tokens
          await secureStorage.setItem("access_token", access_token);
          const refresh_token = await secureStorage.getItem("refresh_token");
          const stream_token = await secureStorage.getItem("stream_token");

          if (!refresh_token || !stream_token) {
            Alert.alert("Session has expired!");
            dispatch(logout());
            dispatch(apiSlice.util.resetApiState());
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
          dispatch(apiSlice.util.resetApiState());

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
    <Stack
      screenOptions={{
        gestureEnabled: false,
      }}
    >
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
