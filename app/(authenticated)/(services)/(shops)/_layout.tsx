import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="convinence" options={{ headerShown: false }} />
      <Stack.Screen name="groceries" options={{ headerShown: false }} />
      <Stack.Screen name="health&wellbeing" options={{ headerShown: false }} />
      <Stack.Screen name="household&living" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
