import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  Keyboard,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

import LoginHook from "@/hooks/LoginHook";

import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const NewPassword = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (text: any) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: any) => {
    setConfirmPassword(text);
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const [previousRoute, setPreviousRoute] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (event) => {
      const { routes, index } = event.data.state;
      if (index > 0) {
        setPreviousRoute(routes[index - 1].name);
      } else {
        setPreviousRoute(null);
      }
    });

    return unsubscribe;
  }, [navigation, previousRoute]);

  const handleResetPassword = () => {
    router.replace("/(modal)/modal");
  };

  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView
      style={[
        isDarkMode ? styles.darkScreen : styles.lightScreen,
        { paddingTop: headerHeight },
      ]}
    >
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={isDarkMode ? styles.darkScreen : styles.lightScreen}>
          <View style={{ flex: 1 }}>
            <Text style={isDarkMode ? styles.lightHeading : styles.darkHeading}>
              Create New Password
            </Text>

            <Text style={isDarkMode ? styles.lightText : styles.darkText}>
              Create your new password to login
            </Text>
            <View style={styles.password}>
              <LoginHook
                label="Password"
                placeHolder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
                imageSource={require("@/assets/images/key.png")}
              />
            </View>
            <View style={styles.confirm_password}>
              <LoginHook
                label="Confirm Password"
                placeHolder="Enter Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                imageSource={require("@/assets/images/key.png")}
              />
            </View>
            <TouchableOpacity activeOpacity={0.9} onPress={handleResetPassword}>
              <LinearGradient
                colors={["#1661E0", "#478EEF"]}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.LightText}>Verify</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  lightScreen: {
    flex: 1,
    paddingHorizontal: 13,
    backgroundColor: "#fff",
  },
  darkScreen: {
    flex: 1,
    paddingHorizontal: 13,
    backgroundColor: "#1E1F22",
  },
  darkBackButton: {
    borderRadius: 24,
    width: 48,
    height: 48,
    backgroundColor: "#1E1F22",
    marginTop: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  lightBackButton: {
    borderRadius: 24,
    width: 48,
    height: 48,
    backgroundColor: "#D9D9D9",
    marginTop: 33,
    alignItems: "center",
    justifyContent: "center",
  },
  darkHeading: {
    color: "#1E1F22",
    fontSize: 32,
    fontWeight: "500",
    marginTop: 98,
    marginBottom: 28,
  },
  lightHeading: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "500",
    marginTop: 98,
    marginBottom: 28,
  },
  darkText: {
    color: "rgba(30, 31, 34, 0.80)",
    fontSize: 16,
    marginBottom: 30,
    fontWeight: "400",
    // width: "90%",
    lineHeight: 24,
  },
  lightText: {
    color: "#A1A8B0",
    fontSize: 16,
    marginBottom: 30,
    fontWeight: "400",
    // width: "90%",
    lineHeight: 24,
  },

  password: {
    marginBottom: 20,
  },
  confirm_password: {
    marginBottom: 20,
  },

  modal: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 13,
  },
  modal_inner: {
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  gif: {
    width: 140,
    height: 140,
    marginTop: "75%",
    marginBottom: "35%",
  },
  success: {
    color: "#4878C9",
    textAlign: "center",
    fontSize: 26,
    fontStyle: "normal",
    fontWeight: "500",
    marginBottom: 32,
  },
  modal_text: {
    color: "#7B6161",
    textAlign: "center",
    // font-family: Inter,
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "300",
    lineHeight: 28 /* 24px */,
    letterSpacing: 0.5,
    marginBottom: "15%",
    marginHorizontal: 18,
  },

  nameBackDark: {
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: 25,
    marginRight: 26,
  },

  screenNameLight: {
    // color: "#000",
    color: "#FFF",
    // font-family: Lato;
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
    // marginTop: 10,
  },
  screenNameDark: {
    // color: "#000",
    color: "#1E1F22",

    // font-family: Lato;
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "500",
    // marginTop: 10,
  },

  linearGradient: {
    // flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 40,
  },

  LightText: {
    color: "#fff",
    fontSize: 14,
    fontStyle: "normal",
    // marginLeft: 10,
  },
});
