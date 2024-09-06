import React from "react";
import { Stack } from "expo-router";
import HospitalProvider from "@/providers/HospitalProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PharmacyHeader from "@/components/PharmacyHeader";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HospitalProvider>
        <Stack>
          <Stack.Screen
            name="emergency"
            options={{
              headerShadowVisible: false,
              headerShown: false,

              navigationBarHidden: true,
            }}
          />

          <Stack.Screen
            name="pharmacy"
            options={{ header: () => <PharmacyHeader /> }}
          />
          <Stack.Screen name="laboratory" />
          <Stack.Screen name="(shops)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(product)"
            options={{
              headerShown: false,
              // presentation: "containedModal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="(category)" options={{ headerShown: false }} />
        </Stack>
      </HospitalProvider>
    </GestureHandlerRootView>
  );
};



export default Layout;
