import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import GoBack from "@/components/GoBack";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="emergency"
        options={{
          headerLeft: () => <GoBack />,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="(consultation)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(pharmacy)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(laboratory)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="new-recording"
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
};

export default Layout;
