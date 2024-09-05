import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="Convinence" options={{ headerShown: false }} />
      <Stack.Screen name="Groceries" options={{ headerShown: false }} />
      <Stack.Screen name="Health&Wellbeing" options={{ headerShown: false }} />
      <Stack.Screen name="Household&Living" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
