import React from "react";
import { Stack } from "expo-router";
import GoBack from "@/components/GoBack";
import HospitalProvider from "@/providers/HospitalProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HospitalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen
            name="Emergency"
            options={{
              header: () => <GoBack title={undefined} />,
              headerBackVisible: true,
            }}
          />
          <Stack.Screen name="Consultation" options={{ headerShown: false }} />
          <Stack.Screen name="Pharmacy" options={{ headerShown: false }} />
          <Stack.Screen name="Laboratory" />
        </Stack>
      </HospitalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
