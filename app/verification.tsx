import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";

import LoginButton from "../components/LoginButton";
import { router } from "expo-router";

interface RouteParams {
  email: string;
}

const VerificationCode = () => {
  const isDarkMode = useColorScheme() === "dark";
  const navigation = useNavigation();
  const route = useRoute();
  const headerHeight = useHeaderHeight();
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

  const { email } = route.params as RouteParams;

  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const CELL_COUNT = 4;

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const handleVerificationCode = () => {
    if (previousRoute === "forgotPassword") {
      router.navigate("/resetPassword");
    } else if (previousRoute === "signin") {
      router.navigate("/signin");
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResend = async () => {
    try {
      setCanResend(false);
      setTimer(30);
    } catch (error) {
      console.log("Error resending verification code:", error);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
    }
  }, [timer]);

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView
        style={[
          isDarkMode ? styles.darkScreen : styles.lightScreen,
          { paddingTop: headerHeight },
        ]}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingHorizontal: 13,
          }}
        >
          <Text style={isDarkMode ? styles.lightText : styles.darkText}>
            Enter code that we have sent to your number{" "}
            <Text
              style={[
                { fontWeight: "700" },
                isDarkMode ? { color: "#FFF" } : null,
              ]}
            >
              {email}
            </Text>
          </Text>

          {/* <View style={styles.verifycodes}> */}
          {/* {codes.map((code, index) => (
              <TextInput
                key={index}
                style={[
                  index === activeIndex ? styles.active : styles.not_active,
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={code}
                onChangeText={(text) => handleCodeChange(index, text)}
                ref={(ref) => (codeRefs.current[index] = ref!)}
              />
            ))} */}
          {/* </View> */}

          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.verifycodes}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Fragment key={index}>
                <View
                  // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.not_active, isFocused && styles.active]}
                >
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              </Fragment>
            )}
          />

          <View style={styles.resend}>
            <Text style={styles.color_light}>Didn’t receive the code?</Text>
            {timer > 0 ? (
              <Text style={isDarkMode ? styles.resendLight : styles.resendDark}>
                {formatTimer(timer)}
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text
                  style={isDarkMode ? styles.resendLight : styles.resendDark}
                >
                  Resend
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <LoginButton
            onPress={handleVerificationCode}
            text="Verify"
          ></LoginButton>
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
  darkBackButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#1E1F22",
    alignItems: "center",
    justifyContent: "center",
  },
  lightBackButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },

  darkText: {
    color: "rgba(30, 31, 34, 0.80)",
    fontSize: 16,
    marginBottom: 30,
    fontWeight: "400",
    // width: "90%",
    lineHeight: 24,
    marginTop: 98,
    marginLeft: 10,
  },
  lightText: {
    color: "#A1A8B0",
    fontSize: 16,
    marginBottom: 30,
    fontWeight: "400",
    // width: "90%",
    lineHeight: 24,
    marginTop: 98,
    marginLeft: 10,
  },

  verifycodes: {
    flexDirection: "row",
    marginBottom: 28,
    marginHorizontal: 10,
  },

  active: {
    // width: 64,
    // height: 64,
    backgroundColor: "#fff",
    borderColor: "#7593BD",
    borderWidth: 2.2,
    borderRadius: 16,
    marginRight: 24,
    fontWeight: "600",
    textAlign: "center",
    fontSize: 26,
    color: "#101623",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  cellText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 26,
    color: "#101623",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  resend: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 29,
  },

  color_light: {
    color: "#717784",
    marginRight: 6,
    fontSize: 15,
  },

  resendDark: {
    fontSize: 15,
    color: "#1E1F22",
    fontWeight: "600",
  },
  resendLight: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "600",
  },

  not_active: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.4,
    elevation: 2,
    backgroundColor: "#FDFDFD",
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 24,
    borderColor: "#adadad",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 26,
    justifyContent: "center",
    alignItems: "center",
  },

  nameBackDark: {
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: 25,
    marginRight: 26,
  },

  backButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
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
});

export default VerificationCode;
