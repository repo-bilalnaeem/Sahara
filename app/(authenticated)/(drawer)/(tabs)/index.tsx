import React, { useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  useColorScheme,
  Platform,
  Animated,
  Button,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import UpcomingSchedule from "@/components/UpcomingSchedule";

import ServicesList from "@/components/ServicesList";
import DoctorSpecialityList from "@/components/DoctorSpecialityList";
import RecentlyViewed from "@/components/RecentlyViewed";

import SeeMore from "@/components/SeeMore";
import PharmacySponserAd from "@/components/PharmacySponserAd";
import SaharaMart from "@/components/SaharaMart";
import { Link, router, Stack, useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";

const Home = () => {
  const isDarkMode = useColorScheme() === "dark";
  const isAndroid = Platform.OS === "android";

  const { signOut } = useAuth();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [0, -250],
    extrapolate: "clamp",
  });
  const navigation = useNavigation();

  return (
    <View style={[isDarkMode ? styles.darkScreen : styles.lightScreen]}>
      <Animated.ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16} // Ensures smooth updates
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
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
              colors={["rgba(0, 0, 0, 0.35)", "rgba(0, 0, 0, 0.12)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.25, y: 1 }}
              style={styles.gradient}
            />
            <View style={styles.content}>
              <View
              
              >
                <View
                  style={[
                    styles.profile_greeting_bell,
                    // { paddingTop: top, paddingHorizontal: 20 },
                  ]}
                >
                  <View style={styles.image_greeting}>
                    <Pressable
                      onPress={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer)
                      }
                    >
                      <View style={styles.profile_img_container}>
                        <Image
                          source={require("@/assets/images/profile_img.jpg")}
                          style={styles.profile_img}
                        />
                      </View>
                    </Pressable>
                    <Text style={[styles.name]}>Good Morning,{"\n"}Lizzy</Text>
                  </View>
                  <Link href={"/(authenticated)/notification"} push asChild>
                    <Pressable style={styles.bell_icon_container}>
                      <Image
                        source={require("@/assets/images/bell-icon.png")}
                        style={styles.bell_icon}
                      />
                      <View style={styles.notificationDot} />
                    </Pressable>
                  </Link>
                </View>
              </View>
              <Text
                style={[
                  styles.hello,
                  isAndroid ? { fontSize: 28, lineHeight: 46 } : {},
                ]}
              >
                How are you{"\n"}feeling today?
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View>
          <Button title="sign out" onPress={() => signOut()} />

          <ServicesList />
          <SeeMore heading={"My Checkup Schedule"} />
          <UpcomingSchedule />
          <RecentlyViewed />

          <View>
            <PharmacySponserAd
              height={180}
              title={`Mastercard weekdays`}
              description={`Use Master30 on checkout${"\n"}and get 30% off!`}
              imageSource={require("@/assets/images/Mastercard.jpg")}
              width={150}
            />
          </View>
          <DoctorSpecialityList />
          <SaharaMart />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  lightScreen: {
    backgroundColor: "#ffffff",
    overflow: "hidden",
    position: "relative",
  },
  darkScreen: {
    backgroundColor: "#1E1F22",
    overflow: "hidden",
    position: "relative",
  },

  container: {
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#131313",
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
    fontSize: 36,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 53.28,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
    marginLeft: 10,
    marginVertical: 40,
    marginBottom: 80,
    flexGrow: 1,
  },

  profile_img: {
    width: "100%",
    height: "130%",
    resizeMode: "cover",
  },

  profile_img_container: {
    borderColor: "#fff",
    overflow: "hidden",
    borderWidth: 3,
    width: 60,
    height: 60,
    borderRadius: 200,
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

  content: {
    marginTop: 90,
    marginHorizontal: 19,
  },

  doctorSearch: {
    fontSize: 15,
    fontWeight: "400",
    justifyContent: "center",
    marginHorizontal: 16,
    color: "#a1a1a1",
  },

  profile_greeting_bell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  image_greeting: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 23.68,
    marginLeft: 15,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 4,
    textShadowOffset: { width: 4, height: 4 },
  },

  bell_icon: {
    height: 22,
    width: 22,
    tintColor: "#fff",
    borderColor: "#fff",
  },

  notificationDot: {
    position: "absolute",
    top: 7,
    right: 9,
    backgroundColor: "#e34234",
    width: 8,
    height: 8,
    borderRadius: 5,
  },
});

export default Home;
