import GoBack from "@/components/GoBack";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
};

export default Layout;
