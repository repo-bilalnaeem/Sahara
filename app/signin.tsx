import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  useColorScheme,
  Alert,
  PixelRatio,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const scaleFont = (size: number) => size * PixelRatio.getFontScale();

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LoginInput from "@/components/LoginInput";
import { CheckBox } from "react-native-elements";
import MediaIcons from "@/components/MediaIcons";
import Continue from "@/components/Continue";
import { useLoginMutation } from "@/slices/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/slices/authSlice";

const signin = () => {
  const isDarkMode = useColorScheme() === "dark";

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const handleEmailChange = (text: any) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: any) => {
    setPassword(text);
  };

  const handleCheckBoxChange = () => {
    setSelection(!isSelected);
  };

  const handleLogin = async () => {
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
    } catch (error) {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.lightScreen}>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/Vector.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.heading}>Login to your account</Text>

        <View>
          <View>
            <View style={styles.input}>
              <LoginInput
                label="Email"
                placeHolder="mail@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={handleEmailChange}
                secureTextEntry={false}
                imageSource={undefined}
              />
            </View>

            <View style={styles.input}>
              <LoginInput
                label="Password"
                placeHolder="Enter Password"
                secureTextEntry={true}
                value={password}
                onChangeText={handlePasswordChange}
                imageSource={undefined}
              />
            </View>
          </View>

          <View>
            <View style={styles.checkContainer}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  checked={isSelected}
                  onPress={handleCheckBoxChange}
                  checkedColor="#1661E0"
                  uncheckedColor={"transparent"}
                  checkedIcon={
                    <View style={styles.checkedIcon}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  }
                  uncheckedIcon={
                    <View
                      style={
                        isDarkMode
                          ? styles.lightUncheckedIcon
                          : styles.darkUncheckedIcon
                      }
                    />
                  }
                  containerStyle={
                    isDarkMode ? styles.lightCheckbox : styles.darkCheckbox
                  }
                />
                <Text style={isDarkMode ? styles.lightLabel : styles.darkLabel}>
                  Remember me
                </Text>
              </View>
            </View>

            <View style={styles.loginButton}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={["#1661E0", "#478EEF"]}
                  style={styles.linearGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.LightText}>
                    Sign in with email address
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/forgotPassword")}
          >
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={styles.continue}>
            <Continue>Or Continue with</Continue>
          </View>
          <MediaIcons />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  lightScreen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    paddingHorizontal: 13,
  },
  logo: {
    alignItems: "center",
  },

  image: {
    width: wp("28%"),
    height: hp("10%"),
    objectFit: "contain",
    // marginBottom: wp('10%'),
    marginTop: hp("10%"),
  },

  heading: {
    textAlign: "center",
    color: "#2C2C2C",
    fontSize: scaleFont(24),
    fontWeight: "500",
    // marginBottom: 38,
    fontFamily: "Lato400",
  },

  input: {
    marginBottom: 20,
  },

  checkContainer: {
    marginBottom: 24,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
  },

  checkedIcon: {
    borderRadius: 6,
    backgroundColor: "#1661E0",
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  checkmark: {
    color: "white",
  },

  lightUncheckedIcon: {
    borderRadius: 6,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "transparent",
  },

  darkUncheckedIcon: {
    borderRadius: 6,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#808080",
  },

  lightCheckbox: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    borderRadius: 6,
  },

  darkCheckbox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },

  lightLabel: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "500",
  },

  darkLabel: {
    color: "#605B5B",
    fontSize: 14,
    fontWeight: "500",
  },

  loginButton: {
    marginBottom: 24,
  },

  forgot: {
    color: "#3981EA",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },

  continue: {
    marginBottom: 10,
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

export default signin;
