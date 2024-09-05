import React from "react";
import { Stack } from "expo-router";
import HospitalProvider from "@/providers/HospitalProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PharmacyHeader from "@/components/PharmacyHeader";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HospitalProvider>
        <Stack>
          <Stack.Screen
            name="Emergency"
            options={{
              headerShadowVisible: false,
              headerShown: false,

              navigationBarHidden: true,
            }}
          />

          <Stack.Screen
            name="Pharmacy"
            options={{ header: () => <PharmacyHeader /> }}
          />
          <Stack.Screen name="Laboratory" />
          <Stack.Screen name="(shops)" options={{ headerShown: false }} />
          <Stack.Screen name="(product)" options={{ headerShown: false }} />
          <Stack.Screen name="(category)" options={{ headerShown: false }} />
        </Stack>
      </HospitalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
