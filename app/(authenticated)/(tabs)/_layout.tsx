import { Tabs } from "expo-router";
import React, { RefObject, useRef } from "react";
import { BlurView } from "expo-blur";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import {
  Platform,
  View,
  StyleSheet,
  TextInput,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";


const Layout = () => {
  const { top } = useSafeAreaInsets();

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
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          // tabBarStyle: { display: "none" },
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
          headerTransparent: true,
          tabBarShowLabel: false,
          header: () => (
            <View style={[styles.meetDoctor, { paddingTop: top / 1.5 }]}>
              <View style={styles.searchbarBox}>
                <AntDesign name="search1" size={20} color="#000" />
                <TextInput
                  style={styles.doctorSearch}
                  placeholder="Search Doctor"
                  placeholderTextColor={"#A9A9A9"}
                />
              </View>
            </View>
          ),
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

const styles = StyleSheet.create({
  searchbarBox: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 30,
    elevation: 5, // or use shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6.54,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    paddingLeft: 20,
  },

  doctorSearch: {
    fontSize: 15,
    fontWeight: "400",
    justifyContent: "center",
    marginHorizontal: 16,
    color: "#a1a1a1",
    flexGrow: 1,
  },

  meetDoctor: {
    marginHorizontal: 13,
    marginTop: 24,
    marginBottom: 12,
  },
});

export default Layout;
