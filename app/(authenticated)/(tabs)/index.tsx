import React, { useCallback, useRef, useMemo } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { RootSiblingParent } from "react-native-root-siblings";
import UpcomingSchedule from "@/components/UpcomingSchedule";
import CustomScrollView from "@/components/CustomScrollView";

import ServicesList from "@/components/ServicesList";
import DoctorSpecialityList from "@/components/DoctorSpecialityList";
import RecentlyViewed from "@/components/RecentlyViewed";
import NearByFacilities from "@/components/NearByFacilities";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import SeeMore from "@/components/SeeMore";
import { useBottomSheet } from "@/context/BottomSheetContext";
import PharmacySponserAd from "@/components/PharmacySponserAd";
import SaharaMart from "@/components/SaharaMart";

const Home = () => {
  const isDarkMode = useColorScheme() === "dark";
  const snapPoints = useMemo(() => ["50%"], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { isBottomSheetOpen, setIsBottomSheetOpen } = useBottomSheet();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setIsBottomSheetOpen(true);
  }, [setIsBottomSheetOpen]);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setIsBottomSheetOpen(false);
  }, [setIsBottomSheetOpen]);

  return (
    <View style={[isDarkMode ? styles.darkScreen : styles.lightScreen]}>
      {/* <StatusBar style="light" /> */}
      <RootSiblingParent>
        <BottomSheetModalProvider>
          <CustomScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={!isBottomSheetOpen}
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
                    <Pressable style={styles.bell_icon_container}>
                      <Image
                        source={require("@/assets/images/bell-icon.png")}
                        style={styles.bell_icon}
                      />
                      <View style={styles.notificationDot} />
                    </Pressable>
                  </View>
                  <Text style={styles.hello}>
                    How are you{"\n"}feeling today?
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View>
              <ServicesList isBottomSheetOpen={isBottomSheetOpen} />
              <SeeMore
                heading={"My Checkup Schedule"}
                onSeeMorePress={handlePresentModalPress}
              />
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
          </CustomScrollView>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onDismiss={handleCloseModalPress}
            index={0}
            containerStyle={{
              position: "absolute",
              backgroundColor: "#30303044",
              flex: 1,
            }}
          >
            <View>
              <Text>More</Text>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </RootSiblingParent>
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
    backgroundColor: "#ffffff",
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
    elevation: 5, // for Android
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#131313", // for iOS
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
