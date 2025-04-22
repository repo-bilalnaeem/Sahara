import {
  Pressable,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  PixelRatio,
} from "react-native";
import SeeMore from "@/components/SeeMore";
import React from "react";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const isAndroid = Platform.OS === "android";

const data = [
  {
    key: "1",
    imageSource: require("@/assets/images/Emergency-PNG.png"),
    text: "Emergency",
    screen: "/emergency",
  },
  // {
  //   key: "2",
  //   imageSource: require("@/assets/images/Consultation-PNG.png"),
  //   text: "Consultation",
  //   screen: "/(consultation)",
  // },
  {
    key: "3",
    imageSource: require("@/assets/images/Medicine-PNG.png"),
    text: "Pharmacy",
    screen: "/(pharmacy)",
  },
  {
    key: "4",
    imageSource: require("@/assets/images/Needle-PNG.png"),
    text: "Laboratory",
    screen: "/(laboratory)",
  },
];

const ServicesList = () => {
  const router = useRouter();
  const renderServicesItem = ({ item, index }: any) => (
    <Pressable onPress={() => router.navigate(item.screen)}>
      <View
        style={[
          styles.doctorServiceBtn,
          index === 0 ? { marginLeft: 16 } : null,
        ]}
      >
        <Image
          source={item.imageSource}
          style={[styles.service_icons, { resizeMode: "contain" }]}
        />
        <Text
          style={[
            styles.service_text,
            isAndroid ? { fontSize: scaleFont(12) } : {},
          ]}
        >
          {item.text}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <View style={styles.services}>
      <SeeMore heading={"Services"} />
      <Pressable>
        <FlatList
          horizontal
          data={data}
          renderItem={renderServicesItem}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  doctorServiceBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: wp("28.5%"),
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
    marginRight: 10,
  },

  service_icons: {
    // width: wp("6%"),
    width: wp("6.5%"),
    height: hp("3.5%"),
    resizeMode: "cover",
  },

  service_text: {
    color: "#333",
    // font-family: Lato;
    fontSize: scaleFont(12),
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 157.143% */,
    marginTop: 5,
  },

  services: {
    marginVertical: 38,
  },
});

export default ServicesList;
