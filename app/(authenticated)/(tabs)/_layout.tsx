import { Tabs } from "expo-router";
import React from "react";
import { BlurView } from "expo-blur";
import { Feather, Ionicons } from "@expo/vector-icons";
const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            // tint={ isDarkMode? "systemMaterialDark" :"systemThickMaterialLight"}
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
          bottom: 25,
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
        },
      }}
    >
      <Tabs.Screen
        name="(services)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarItemStyle: {
            // marginTop: 13,
          },
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          headerTransparent: true,
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="(chat)"
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
