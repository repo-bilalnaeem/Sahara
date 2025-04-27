import { Tabs } from "expo-router";
import React, { useRef } from "react";
import { BlurView } from "expo-blur";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import {
  Platform,
  View,
  StyleSheet,
  TextInput,
  PixelRatio,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import GoBack from "@/components/GoBack";
const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const Layout = () => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint={"systemMaterialDark"}
            style={{
              flex: 1,
              backgroundColor:
                Platform.OS === "android" ? "#7d7d7d" : "rgba(0,0,0,0.05)", // for android
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: Platform.OS === "android" ? 15 : 25,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
          height: hp("7.25%"),
          paddingTop: 10,
          paddingBottom: 0,
          marginHorizontal: 10,
          borderRadius: 40,
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={22} color={color} />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="search1" size={22} color={color} />
          ),
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: { display: "none" },
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: "Messages",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbubbles-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({});

export default Layout;
