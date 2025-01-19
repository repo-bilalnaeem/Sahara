import GoBack from "@/components/GoBack";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerLeft: () => <GoBack />,
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default Layout;
