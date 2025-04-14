import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  PixelRatio,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Link, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const scaleFont = (size: number) => size * PixelRatio.getFontScale();

// Components
import UpcomingSchedule from "@/components/UpcomingSchedule";
import ServicesList from "@/components/ServicesList";
import DoctorSpecialityList from "@/components/DoctorSpecialityList";
import SeeMore from "@/components/SeeMore";
import PharmacySponserAd from "@/components/PharmacySponserAd";
import SaharaMart from "@/components/SaharaMart";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useGetAllAppointmentsQuery,
  useGetRecentlyViewedQuery,
} from "@/slices/apiSlice";
import BookNow from "@/components/BookNow";

const Home = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { data, isLoading } = useGetRecentlyViewedQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: latestAppointmnet, isLoading: loadingAppointmnet } =
    useGetAllAppointmentsQuery({ limit: 1 });

  // console.log(latestAppointmnet);

  useEffect(() => {
    // console.log(JSON.stringify(latestAppointmnet, null, 2));
  }, [latestAppointmnet]);

  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  return (
    <View style={[styles.lightScreen]}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <View style={styles.container}>
          {/* <Image
            source={require("@/assets/images/Circle.png")}
            style={styles.circle}
          /> */}
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
            <View style={[{ marginTop: top + 30, marginHorizontal: 16 }]}>
              <View>
                <View style={[styles.profile_greeting_bell]}>
                  <View style={styles.image_greeting}>
                    <Pressable
                      onPress={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer)
                      }
                    >
                      <View>
                        <Image
                          source={require("@/assets/images/Vector.png")}
                          style={styles.profile_img}
                        />
                      </View>
                    </Pressable>
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
              <Text style={[styles.hello]}>
                How are you{"\n"}feeling today?
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View>
          <ServicesList />
          {latestAppointmnet && (
            <>
              <SeeMore heading={"My Checkup Schedule"} />
              <UpcomingSchedule data={latestAppointmnet[0]} />
            </>
          )}
          {/* <RecentlyViewed /> */}
          {data && (
            <View style={{ marginBottom: 32 }}>
              <SeeMore heading="Recently Viewed" />
              <View>
                <FlatList
                  horizontal
                  data={data}
                  renderItem={({ item, index }) => (
                    <BookNow
                      item={item}
                      index={index}
                      style={data.length === 1 ? true : false}
                    />
                  )}
                  keyExtractor={(item) => item.doctorId}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                />
              </View>
            </View>
          )}

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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  lightScreen: {
    flex: 1,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    position: "relative",
  },

  container: {
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#131313",
    backgroundColor: "transparent",
    position: "relative",
  },

  imageBackground: {
    backgroundColor: "#fff",
    objectFit: "cover",
    resizeMode: "cover",
    overflow: "hidden",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: "100%",
    height: hp("42%"),
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  hello: {
    color: "#FFF",
    fontSize: scaleFont(36),
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 53.28,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
    marginVertical: wp("10%"),
    flexGrow: 1,
  },

  profile_img: {
    width: 36,
    height: 32,
    objectFit: "contain",
  },

  bell_icon_container: {
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 3,
    padding: 18,
    borderRadius: 200,
    width: 36,
    height: 36,
    alignItems: "center",
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
    color: "#000000",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 23.68,
    marginLeft: 15,
    // textShadowColor: "rgba(0,0,0,0.4)",
    // textShadowRadius: 4,
    // textShadowOffset: { width: 4, height: 4 },
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
