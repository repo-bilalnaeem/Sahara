// import { useAuth, AuthProvider } from "@/context/AuthContext";
// import { useFonts } from "expo-font";

// import { Slot, Stack, useRouter, useSegments } from "expo-router";
// import {
//   StreamVideo,
//   StreamVideoClient,
//   User,
// } from "@stream-io/video-react-native-sdk";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { OverlayProvider } from "stream-chat-expo";
// import Toast from "react-native-toast-message";

// import * as SplashScreen from "expo-splash-screen";
// import React, { useState } from "react";
// import { useEffect } from "react";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

// const InitialLayout = () => {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState<StreamVideoClient | null>(null);
//   const segments = useSegments();
//   const router = useRouter();

//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//     Lato700: require("@/assets/fonts/Lato-Bold.ttf"),
//     Lato400: require("@/assets/fonts/Lato-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//     if (!initialized) return;
//     const inAuthGroup = segments[0] === "(authenticated)";
//     if (authState?.authenticated && !inAuthGroup) {
//       router.replace("/(authenticated)");
//     } else if (!authState?.authenticated) {
//       client?.disconnectUser();
//       router.replace("/");
//     }
//   }, [loaded, initialized, authState]);

//   // // Initialize the StreamVideoClient when the user is authenticated
//   useEffect(() => {
//     if (authState?.authenticated && authState.token) {
//       const user: User = { id: authState.user_id! };

//       try {
//         const client = new StreamVideoClient({
//           apiKey: STREAM_KEY!,
//           user,
//           token: authState.token,
//         });
//         setClient(client);
//       } catch (e) {
//         console.log("Error creating client: ", e);
//       }
//     }
//   }, [authState]);

//   if (!loaded) {
//     return <Slot />;
//   }

//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="signin" options={{ headerShown: false }} />
//       <Stack.Screen name="signup" options={{ headerShown: false }} />
//       <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
//       <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
//       <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
//       <Stack.Screen name="verification" options={{ headerShown: false }} />
//       <Stack.Screen name="(modals)/modal" options={{ headerShown: false }} />
//     </Stack>
//   );
// };

// const RootLayoutNav = () => {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// };

// export default RootLayoutNav;
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-native-sdk';
import { useAuth, AuthProvider } from "@/context/AuthContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
    } else if (!authState?.authenticated) {
      client?.disconnectUser();
      router.replace("/");
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
        Toast.show({ type: "error", text1: "Failed to initialize video client" });
      }
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
          <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
          <Stack.Screen name="verification" options={{ headerShown: false }} />
          <Stack.Screen name="(modals)/modal" options={{ headerShown: false }} />
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayoutNav;
