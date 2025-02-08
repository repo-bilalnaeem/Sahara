import GoBack from "@/components/GoBack";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>

      <Stack.Screen
        name="[id]"
        options={{
          headerLeft: () => <GoBack />,
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Stack>
  );
};

export default Layout;
