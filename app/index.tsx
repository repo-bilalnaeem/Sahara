import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const Page = () => {
  return (
    <View style={styles.lightScreen}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/Vector.png")}
          style={styles.image}
        />
        <View>
          <Text style={styles.heading}>Let’s you In</Text>

          <Pressable style={[styles.button, styles.AppleButton]}>
            <View style={styles.buttonContent}>
              <Image
                style={{ width: 28, height: 28, tintColor: "white" }}
                source={require("@/assets/images/Apple-Icon.png")}
              />
              <Text style={styles.buttonText}>Continue with Apple</Text>
            </View>
          </Pressable>

          <Pressable style={[styles.button, styles.GoogleButton]}>
            <View style={styles.buttonContent}>
              <Image
                style={[{ width: 26 }, { height: 26 }]}
                source={require("../assets/images/Google-Icon.png")}
              />
              <Text style={styles.buttonTextDark}>Continue with Google</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.button, styles.FacebookButton]}>
            <View style={styles.buttonContent}>
              <Image
                style={{ width: 28, height: 28, tintColor: "white" }}
                source={require("@/assets/images/Facebook-Icon.png")}
              />
              <Text style={[styles.buttonText]}>Continue with Facebook</Text>
            </View>
          </Pressable>

          <View style={styles.lines}>
            <View style={styles.line} />
            <Text style={styles.or}>Or</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.loginButton}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/signin")}
            >
              <LinearGradient
                colors={["#1661E0", "#478EEF"]}
                style={styles.linearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.LightText}>
                  Sigin in with email address
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.signup}>
            <Text style={styles.signupText}>Don’t have an account?</Text>
            <Pressable onPress={() => router.navigate("/signup")}>
              {/* <Link href={"/signup"}> */}
              <Text style={styles.signupButton}>Sign up</Text>
              {/* </Link> */}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lightScreen: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    paddingHorizontal: 13,
  },

  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 106,
    height: 99,
    objectFit: "contain",
    marginBottom: 50,
    marginTop: 50,
  },

  heading: {
    fontFamily: "Lato700",
    fontWeight: "500",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 53,
  },

  button: {
    // flexGrow:1,
    // width: "100%",
    height: 60,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: "#2C323E",
    justifyContent: "center",
    paddingHorizontal: "23%",
    alignItems: "center",
  },

  AppleButton: {
    backgroundColor: "#2C323E",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: "Lato400",
    color: "#fff",
    fontSize: 14,
    fontStyle: "normal",
    marginLeft: 10,
  },
  buttonTextDark: {
    fontFamily: "Lato400",
    color: "#000",
    fontSize: 14,
    fontStyle: "normal",
    marginLeft: 10,
  },

  GoogleButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#293851",
    borderStyle: "solid",
  },

  FacebookButton: {
    backgroundColor: "#0e81ff",
  },

  lines: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
  },

  line: {
    width: "44%",
    backgroundColor: "#969696",
    height: 1,
  },

  or: {
    marginHorizontal: 10,
  },

  loginButton: {
    marginBottom: 51,
  },

  signup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  signupText: {
    color: "#948686",
    marginRight: 5,
  },

  signupButton: {
    color: "#5998D2",
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

export default Page;
