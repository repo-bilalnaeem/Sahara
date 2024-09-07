import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import PharmacyHeader from "@/components/PharmacyHeader";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <PharmacyHeader />,
        }}
      />
    </Stack>
  );
};

export default Layout;
