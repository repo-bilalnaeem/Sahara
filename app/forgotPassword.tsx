import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  Keyboard,
  Animated,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { router } from "expo-router";

import LoginInput from "@/components/LoginInput";
import { LinearGradient } from "expo-linear-gradient";

const forgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [inputWidth, setInputWidth] = useState(0);

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
  };

  const handleOptionPress = (option: string) => {
    const toValue = option === "phone" ? -1 * inputWidth : 0;

    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 650,
      useNativeDriver: false,
    }).start();

    setIsEmail(option === "email");
    setIsPhone(option === "phone");
  };

  const phoneInputStyle = {
    transform: [{ translateX: slideAnim }],
  };

  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView style={isDarkMode ? styles.darkScreen : styles.lightScreen}>
      {isDarkMode ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle="dark-content" />
      )}
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={isDarkMode ? styles.darkScreen : styles.lightScreen}>
          <Text style={isDarkMode ? styles.lightHeading : styles.darkHeading}>
            Forgot Your Password?
          </Text>
          <Text style={isDarkMode ? styles.lightText : styles.darkText}>
            Enter your email or your phone number, we will send you confirmation
            code
          </Text>

          <View style={isDarkMode ? styles.optionsDark : styles.options}>
            <Pressable
              style={[
                styles.option_button,
                isEmail
                  ? { borderColor: "#7593BD" }
                  : { borderColor: "transparent" },
              ]}
              onPress={() => handleOptionPress("email")}
            >
              <Text
                style={
                  isEmail
                    ? isDarkMode
                      ? styles.darkActive
                      : styles.active
                    : styles.notactive
                }
              >
                Email
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.option_button,
                isPhone
                  ? { borderColor: "#7593BD" }
                  : { borderColor: "transparent" },
              ]}
              onPress={() => handleOptionPress("phone")}
            >
              <Text
                style={
                  isPhone
                    ? isDarkMode
                      ? styles.darkActive
                      : styles.active
                    : styles.notactive
                }
              >
                Phone
              </Text>
            </Pressable>
          </View>

          <View style={styles.inputs}>
            <Animated.View
              onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setInputWidth(width);
              }}
              style={[styles.input, phoneInputStyle]}
            >
              <LoginInput
                label="Email"
                placeHolder="mail@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={handleEmailChange}
                imageSource={require("@/assets/images/email.png")}
                secureTextEntry={false}
              />
            </Animated.View>
            <Animated.View style={[styles.input, phoneInputStyle]}>
              <LoginInput
                label="Phone Number"
                placeHolder="+92 123 3845307"
                keyboardType="phone-pad"
                autoCapitalize="none"
                value={phone}
                onChangeText={handlePhoneChange}
                imageSource={require("@/assets/images/phone.png")}
                secureTextEntry={false}
              />
            </Animated.View>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/verification")}
          >
            <LinearGradient
              colors={["#1661E0", "#478EEF"]}
              style={styles.linearGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.LightText}>Reset Password</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

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

  inputs: {
    paddingTop: 8,
    flexDirection: "row",
    maxWidth: "100%",
    overflow: "hidden",
    // justifyContent:"space-between"
  },

  input: {
    width: "100%",
    marginBottom: 20,
    // marginRight: 13,
    // marginRight: 10,
  },

  option_button: {
    // BoorderColor: "rgba(30, 31, 34, 0.80)",
    // borderWidth: 1.5,
    // borderRadius: 29,
    width: "50%",
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  options: {
    borderRadius: 29,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    overflow: "hidden",
  },
  optionsDark: {
    borderRadius: 29,
    borderColor: "##1E1F22",
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    overflow: "hidden",
  },

  active: {
    color: "#7593BD",
    fontSize: 16,
    fontWeight: "500",
  },
  darkActive: {
    color: "#323232",
    fontSize: 16,
    fontWeight: "500",
  },
  notactive: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#A1A8B0",
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
export default forgotPassword;
