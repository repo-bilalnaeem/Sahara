import GoBack from "@/components/GoBack";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Layout = () => {
  const { top } = useSafeAreaInsets();
  return (
    <Stack
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: "",
          header: () => (
            <View style={{ position: "absolute", left: 16, top }}>
              <GoBack />
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
