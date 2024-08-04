import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import UpcomingSchedule from "@/components/UpcomingSchedule";
import CustomScrollView from "@/components/CustomScrollView";

import ServicesList from "@/components/ServicesList";
import DoctorSpecialityList from "@/components/DoctorSpecialityList";
import RecentlyViewed from "@/components/RecentlyViewed";
import NearbyDoctor from "@/components/NearbyDoctors";
import AvailableDiscounts from "@/components/AvailableDiscounts";
import NearByFacilities from "@/components/NearByFacilities";
import Biometrics from "@/components/Biometrics";

const Home = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === "dark";
  // const navigateToScreen = (screen) => {
  //   navigation.navigate(screen:);
  // };

  return (
    <View style={isDarkMode ? styles.darkScreen : styles.lightScreen}>
      {isDarkMode ? <StatusBar style="light" /> : <StatusBar style="dark" />}
      <CustomScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/Circle.png")}
            style={styles.circle}
          />
          <ImageBackground
            source={require("@/assets/images/back_img.jpg")}
            style={styles.imageBackground}
          >
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.30)", "rgba(0, 0, 0, 0.2)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            />

            <View style={styles.content}>
              <View style={styles.profile_greeting_bell}>
                <View style={styles.image_greeting}>
                  <View style={styles.profile_img_container}>
                    <Image
                      source={require("@/assets/images/profile_img.jpg")}
                      style={styles.profile_img}
                    />
                  </View>
                  <Text style={styles.name}>Good Morning,{"\n"}Lizzy</Text>
                </View>
                <Pressable
                  style={styles.bell_icon_container}
                  // onPress={handlePress}
                >
                  <Image
                    source={require("@/assets/images/bell-icon.png")}
                    style={styles.bell_icon}
                  />
                  <View style={styles.notificationDot} />
                </Pressable>
              </View>

              <Text style={styles.hello}>How are you{"\n"}feeling today?</Text>
            </View>
          </ImageBackground>
        </View>
        <View>
          <ServicesList
          //  navigation={navigateToScreen}
          />
          <UpcomingSchedule />
          <Biometrics />
          <RecentlyViewed />
          <DoctorSpecialityList />
          <NearbyDoctor />
          <AvailableDiscounts />
          <NearByFacilities />
        </View>
      </CustomScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationDot: {
    position: "absolute",
    top: 7,
    right: 9,
    backgroundColor: "#e34234",
    width: 8,
    height: 8,
    borderRadius: 5,
  },

  lightScreen: {
    backgroundColor: "#fbfbfb",
    overflow: "hidden",
    position: "relative",
    // paddingBottom: 120,
  },
  darkScreen: {
    backgroundColor: "#1E1F22",
    overflow: "hidden",
    position: "relative",
  },

  container: {
    elevation: 10, // for Android
    shadowOpacity: 0.25,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "black", // for iOS
    // height: 370,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    marginTop: 7,

    position: "relative",
  },

  imageBackground: {
    backgroundColor: "#fff",
    objectFit: "cover",
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 50,
    width: "100%",
    // height: 370,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    width: "200%",
    height: "200%",
    top: -350,
    position: "absolute",
    transform: [{ translateX: -250 }],
  },

  hello: {
    color: "#FFF",
    // font-family: Roboto;
    fontSize: 36,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 53.28 /* 53.28px */,
    // width: 273,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
    marginLeft: 10,
    marginVertical: 40,
    marginBottom: 80,
    // letter-spacing: 1.62px;
    flexGrow: 1,
  },

  profile_img: {
    width: "100%",
    height: "130%",
    // objectFit: "fill",
    resizeMode: "cover",
    // borderRadius: 200,
  },

  profile_img_container: {
    borderColor: "#fff",
    overflow: "hidden",
    borderWidth: 3,
    width: 60,
    height: 60,
    // backgroundColor: "#fff",
    borderRadius: 200,
  },

  name: {
    color: "#FFF",
    // text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    // font-family: Lato;
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 23.68 /* 23.68px */,
    marginLeft: 15,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 4,
    textShadowOffset: { width: 4, height: 4 },
  },

  image_greeting: {
    flexDirection: "row",
    alignItems: "center",
  },

  bell_icon: {
    height: 22,
    width: 22,
    tintColor: "#fff",
    borderColor: "#fff",
  },

  bell_icon_container: {
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 3,
    padding: 10,
    borderRadius: 200,
    width: 45,
    height: 45,
    alignItems: "center",
  },

  profile_greeting_bell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  content: {
    marginTop: 65,
    marginHorizontal: 19,
  },

  doctorSearch: {
    fontSize: 15,
    fontWeight: "400",
    justifyContent: "center",
    marginHorizontal: 16,
    color: "#a1a1a1",
  },
});

export default Home;
