import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";

import { useState } from "react";
import LoginInput from "@/components/LoginInput";
import Continue from "@/components/Continue";
import MediaIcons from "@/components/MediaIcons";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSignupMutation } from "@/slices/apiSlice";

const Signup = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === "dark";
  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signup, { isLoading }] = useSignupMutation();

  const handleEmailChange = (text: any) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: any) => {
    setPassword(text);
  };
  const handleConfirmPasswordChange = (text: any) => {
    setConfirmPassword(text);
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const handleSignIn = async () => {
    try {
      const userData = await signup({
        email,
        password,
        confirmPassword,
      }).unwrap();
      console.log(userData);
      router.replace("/");
    } catch (error: any) {
      console.error("Signup error:", error);
      Alert.alert(
        "Unable to signup",
        error?.data?.message || "Please try again."
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView
        style={[isDarkMode ? styles.darkScreen : styles.lightScreen]}
      >
        {isDarkMode ? <StatusBar style="light" /> : <StatusBar style="dark" />}
        <View
          style={{
            display: "flex",
            paddingHorizontal: 13,
            flexGrow: 1,
          }}
        >
          <Text style={isDarkMode ? styles.lightHeading : styles.darkHeading}>
            Sign Up
          </Text>
          <Text style={isDarkMode ? styles.lightText : styles.darkText}>
            Please Sign up to continue
          </Text>
          <View
            style={{
              // flexGrow: 1,
              marginTop: 34,
            }}
          >
            <View style={styles.input}>
              <LoginInput
                label="Email"
                placeHolder="mail@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={handleEmailChange}
                secureTextEntry={false}
                imageSource={undefined} // any other props you need
              />
            </View>

            <View style={styles.input}>
              <LoginInput
                label="Password"
                placeHolder="Enter Password"
                secureTextEntry
                value={password}
                // textContentType="oneTimeCode"
                onChangeText={handlePasswordChange}
                imageSource={undefined} // any other props you need
              />
            </View>

            <View style={styles.input}>
              <LoginInput
                label="Confirm Password"
                placeHolder="Enter Confrim Password"
                secureTextEntry
                // textContentType="oneTimeCode"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                imageSource={undefined} // any other props you need
              />
            </View>
          </View>

          <View style={{ marginBottom: 32 }}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleSignIn}>
              <LinearGradient
                colors={["#1661E0", "#478EEF"]}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.LightText}>Sign up to continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View>
            <Continue>Or Sign up with</Continue>
            <MediaIcons></MediaIcons>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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

  darkHeading: {
    color: "#1E1F22",
    fontSize: 32,
    fontWeight: "500",
    marginTop: 39,
    marginBottom: 28,
  },
  lightHeading: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "500",
    marginTop: 39,
    marginBottom: 28,
  },

  text: {
    color: "rgba(30, 31, 34, 0.80)",
    fontSize: 16,
    marginBottom: 30,
    fontWeight: "400",
    // font-family: Inter;
  },

  darkText: {
    color: "rgba(30, 31, 34, 0.80)",
    fontSize: 16,
    fontWeight: "400",
    width: "90%",
    lineHeight: 24,
    marginLeft: 10,
    marginTop: 24,
  },
  lightText: {
    color: "#A1A8B0",
    fontSize: 16,
    // marginBottom: 30,
    fontWeight: "400",
    lineHeight: 24,
    marginLeft: 10,
    marginTop: 24,
  },

  input: {
    marginBottom: 18,
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

export default Signup;
