import React, { Fragment } from "react";
import { Stack } from "expo-router";
import GoBack from "@/components/GoBack";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerLeft: () => <GoBack />,
          headerTransparent: true,
          headerTitle:""
        }}
      />
      <Stack.Screen name="(stream)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
