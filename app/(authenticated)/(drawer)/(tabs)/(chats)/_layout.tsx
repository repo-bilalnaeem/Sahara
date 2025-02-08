import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GoBack from "@/components/GoBack";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chats",
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerStyle: {
            backgroundColor: "#fff",
          },

          headerTitleStyle: { fontSize: 16, fontWeight: "500" },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
        }}
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default Layout;
