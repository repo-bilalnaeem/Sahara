import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="userProfile" options={{ headerShown: false }} />
      <Stack.Screen name="(schedules)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
