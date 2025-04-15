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

          header: () => (
            <View
              style={[
                styles.meetDoctor,
                {
                  paddingTop: top,
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity
                onPressIn={router.back}
                style={[styles.darkBackButton]}
              >
                <Image
                  style={[
                    { width: wp("5%") },
                    { height: hp("2%") },
                    { tintColor: "#6e6e6e", objectFit: "contain" },
                  ]}
                  source={require("@/assets/images/arrow.png")}
                />
              </TouchableOpacity>
              <View style={styles.searchbarBox}>
                <AntDesign name="search1" size={scaleFont(20)} color="#000" />
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

const styles = StyleSheet.create({
  searchbarBox: {
    backgroundColor: "#fff",
    height: hp("5.75%"),
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
    fontSize: scaleFont(15),
    fontWeight: "400",
    justifyContent: "center",
    marginHorizontal: 16,
    color: "#a1a1a1",
    flexGrow: 1,
  },

  meetDoctor: {
    paddingHorizontal: 13,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },

  darkBackButton: {
    borderRadius: 24,
    width: wp("3%"),
    height: hp("4%"),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },
});

export default Layout;
