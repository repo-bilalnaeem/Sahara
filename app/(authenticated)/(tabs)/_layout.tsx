import { Tabs } from "expo-router";
import React from "react";
import { BlurView } from "expo-blur";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import {
  BottomSheetProvider,
  useBottomSheet,
} from "@/context/BottomSheetContext";

const Layout = () => {
  return (
    <BottomSheetProvider>
      <Container />
    </BottomSheetProvider>
  );
};

const Container = () => {
  const { isBottomSheetOpen } = useBottomSheet();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerShown: false,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint={"systemMaterialDark"}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: Platform.OS === "android" ? 0 : 25,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
          height: 70,
          paddingTop: 0,
          paddingBottom: 0,
          marginHorizontal: 10,
          borderRadius: 40,
          overflow: "hidden",
          zIndex: isBottomSheetOpen === true ? -100 : undefined,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          tabBarShowLabel: false,
          // tab
        }}
      />
      <Tabs.Screen
        name="(drawer)"
        options={{
          title: "Messages",
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
            // <MessageIconLight />
          ),
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
};

export default Layout;
