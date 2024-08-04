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
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";

import { useState } from "react";
import LoginHook from "@/hooks/LoginHook";
import Continue from "@/components/Continue";
import MediaIcons from "@/components/MediaIcons";
import LoginButton from "@/components/LoginButton";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React from "react";

const Signup = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === "dark";
  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSignIn = () => {
    router.navigate("/userProfile");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView
        style={[
          { paddingTop: headerHeight },
          isDarkMode ? styles.darkScreen : styles.lightScreen,
        ]}
      >
        {isDarkMode ? <StatusBar style="light" /> : <StatusBar style="dark" />}
        <View
          style={{
            display: "flex",
            // flex: 1,
            justifyContent: "space-around",
            paddingHorizontal: 13,
            flexGrow: 1,
          }}
        >
          <Text style={isDarkMode ? styles.lightText : styles.darkText}>
            Please Sign up to continue
          </Text>
          <View>
            <View style={styles.input}>
              <LoginHook
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
              <LoginHook
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
              <LoginHook
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

          <View style={styles.continue}>
            <LoginButton
              onPress={handleSignIn}
              text=" Sign up to continue"
            ></LoginButton>
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
    marginBottom: 30,
    fontWeight: "400",
    width: "90%",
    lineHeight: 24,
    marginLeft: 10,
    marginTop: 80,
  },
  lightText: {
    color: "#A1A8B0",
    fontSize: 16,
    // marginBottom: 30,
    fontWeight: "400",
    lineHeight: 24,
    marginLeft: 10,
    marginTop: 80,
  },

  continue: {
    marginBottom: 32,
  },

  input: {
    marginBottom: 31,
  },
});

export default Signup;
