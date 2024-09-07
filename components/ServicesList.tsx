import {
  Pressable,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import SeeMore from "@/components/SeeMore";
import React from "react";
import { useRouter } from "expo-router";

const data = [
  {
    key: "1",
    imageSource: require("@/assets/images/Emergency-PNG.png"),
    text: "Emergency",
    screen: "/emergency",
  },
  {
    key: "2",
    imageSource: require("@/assets/images/Consultation-PNG.png"),
    text: "Consultation",
    screen: "/consultation",
  },
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

interface ServicesListProps {
  isBottomSheetOpen: boolean; // Define the prop type
}

const ServicesList = ({ isBottomSheetOpen }: ServicesListProps) => {
  const router = useRouter();
  const renderServicesItem = ({ item, index }) => (
    <Pressable
      onPress={() => router.navigate(item.screen)}
      disabled={isBottomSheetOpen === true ? true : false}
    >
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
        <Text style={styles.service_text}>{item.text}</Text>
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
          scrollEnabled={isBottomSheetOpen === false}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  doctorServiceBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 108,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
    marginRight: 10,
  },

  service_icons: {
    width: 36,
    height: 36,
  },

  service_text: {
    color: "#333",
    // font-family: Lato;
    fontSize: 14,
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
