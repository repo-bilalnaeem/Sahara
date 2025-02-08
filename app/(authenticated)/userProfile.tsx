import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  useColorScheme,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import LoginHook from "@/hooks/LoginHook";
import PhoneNumberInput from "@/components/PhoneNumberInput";
import DateOfBirthInput from "@/components/DateOfBirthInput";
import GenderInput from "@/components/GenderInput";
import { Link, router } from "expo-router";

const userProfile = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === "dark";
  const { width } = Dimensions.get("window");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    // if (!result.cancelled) {
    //   setImage(result.uri);
    // }
  };

  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("PK");
  const [selectedCountryName, setSelectedCountryName] = useState("Pakistan");

  const handleGenderChange = (selectedGender: string | null) => {
    setGender(selectedGender);
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
  };

  const handleCountryChange = ({
    countryCode,
    countryName,
  }: {
    countryCode: string;
    countryName: string;
  }) => {
    setSelectedCountryCode(countryCode);
    setSelectedCountryName(countryName);
  };

  const handleNameChange = (text: string) => {
    const capitalizedText = text
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    setName(capitalizedText);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePress = () => {
    Keyboard.dismiss();
  };

  const completeProfile = () => {
    router.navigate("/modal");
  };

  return (
    <SafeAreaView style={isDarkMode ? styles.screenDark : styles.screenLight}>
      <StatusBar style={isDarkMode ? "light" : "dark"} hidden={false} />
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 4, paddingHorizontal: 13, marginTop: 100 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Pressable onPress={pickImage} style={styles.profileIcon}>
                <Image
                  source={
                    image
                      ? { uri: image }
                      : require("@/assets/images/profile-avatar.png")
                  }
                  style={
                    image
                      ? {
                          width: 100,
                          height: 100,
                          objectFit: "contain",
                          borderRadius: 100,
                        }
                      : {
                          width: 60,
                          height: 60,
                          objectFit: "contain",
                          // borderRadius: 100,
                        }
                  }
                />
                {!image && (
                  <Pressable
                    onPress={pickImage}
                    style={{
                      backgroundColor: "#418DBF",
                      padding: 6,
                      borderRadius: 20,
                      position: "absolute",
                      bottom: 0,
                      right: -5,
                      zIndex: 1,
                    }}
                  >
                    <Image
                      source={require("@/assets/images/camera-profile.png")}
                      style={{ width: 24, height: 24, tintColor: "#fff" }}
                    />
                  </Pressable>
                )}
              </Pressable>
            </View>

            <View style={styles.input}>
              <LoginHook
                label="Full Name"
                placeHolder="John Doe"
                value={name}
                onChangeText={handleNameChange}
                secureTextEntry={false}
                imageSource={undefined}
              />

              <PhoneNumberInput
                value={phoneNumber}
                onPhoneNumberChange={handlePhoneNumberChange}
                onCountryChange={handleCountryChange}
              />

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: width / 2 - 20 }}>
                  <DateOfBirthInput onDateChange={handleDateChange} />
                </View>

                <View style={{ width: width / 2 - 20 }}>
                  <GenderInput onGenderChange={handleGenderChange} />
                </View>
              </View>
            </View>

            <Pressable style={styles.proceed} onPress={completeProfile}>
              <Image
                source={require("@/assets/images/arrow-needle.png")}
                style={styles.nav}
              />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenLight: {
    flex: 1,
    // paddingHorizontal: 13,
    backgroundColor: "#FFF",
  },
  screenDark: {
    flex: 1,
    // paddingHorizontal: 13,
    backgroundColor: "#1E1F22",
  },

  goBack: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 23,
    // marginRight: 26,
    // marginTop: 20,
  },

  backButton: {
    borderRadius: 24,
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonDark: {
    borderRadius: 24,
    width: 40,
    height: 40,
    backgroundColor: "#1E1F22",
    alignItems: "center",
    justifyContent: "center",
  },

  screenNameLight: {
    // color: "#000",
    color: "#FFF",
    // font-family: Lato;
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    // marginTop: 10,
  },

  screenNameDark: {
    // color: "#000",
    color: "#1E1F22",

    // font-family: Lato;
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    // marginTop: 10,
  },

  profileIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 100,
    // overflow: "hidden",
  },

  input: {
    gap: 28,
    marginTop: "14%",
  },

  proceed: {
    height: 60,
    width: 60,
    backgroundColor: "#1661E0",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },

  nav: {
    width: 30,
    height: 30,
    transform: [{ rotate: "-90deg" }],
    tintColor: "#fff",
  },
});

export default userProfile;
