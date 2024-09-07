import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { medical_data } from "@/assets/data/PharmacyPageData";
import { formatTitle, RenderProductTileProps } from "./pharmacy";
import { Href, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Laboratory = () => {
  const { top } = useSafeAreaInsets();

  const renderProductTile = ({ item, index }: RenderProductTileProps) => (
    <Pressable onPress={() => router.push(`/(product)/${item.key}` as Href)}>
      <View style={[index === 0 ? { marginLeft: 16 } : null]}>
        <View style={styles.productTile}>
          <Image
            source={item.imageSource}
            style={[{ resizeMode: "contain", width: 120, height: 120 }]}
          />
          <TouchableWithoutFeedback>
            <View style={styles.add_button}>
              <Ionicons name="add" size={20} color={"#494848"} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            marginBottom: 4,
            width: 120,
          }}
        >
          Rs. {item.price}
        </Text>
        <Text
          style={{ width: 120, fontSize: 14, fontWeight: "400", color: "gray" }}
        >
          {formatTitle(item.title)}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* style={{ backgroundColor: "#e9e8e8" }} */}
        <View
          style={{
            paddingTop: 12,
            backgroundColor: "#e9e8e8",
            paddingBottom: 12,
          }}
        >
          <LinearGradient
            colors={["rgba(0, 37, 58, 0.76)", "#7cbebeff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.0527, 0.9575]}
            style={styles.linearGradient}
          >
            <Image
              source={require("@/assets/images/family_img.png")}
              style={styles.ad_img}
            />
            <Text
              style={{
                fontSize: 22,
                fontWeight: "600",
                color: "#fff",
                lineHeight: 32,
              }}
            >
              Get your full body{"\n"}checkup
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
              }}
            >
              <FontAwesome name="check-square-o" size={18} color="#a6ff83" />
              <Text
                style={{
                  color: "#dfdfdf",
                  fontSize: 13,
                }}
              >
                Full body checkup{"\n"}with cancer
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 5,
              }}
            >
              <Entypo
                name="lab-flask"
                size={18}
                color="#a6ff83"
                style={{ marginLeft: -2 }}
              />
              <Text
                style={{
                  color: "#dfdfdf",
                  fontSize: 13,
                }}
              >
                Free home sample{"\n"}pickup
              </Text>
            </View>
          </LinearGradient>

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 12,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#FEC091ff",
                borderRadius: 20,
                width: "49%",
                paddingHorizontal: 14,
                paddingVertical: 16,
                height: 140,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#2e2e2e",
                  flexGrow: 1,
                }}
              >
                X-rays{"\n"}Scans & MRI
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable>
                  <FontAwesome5
                    name="arrow-circle-right"
                    size={24}
                    color="black"
                  />
                </Pressable>
                <Fontisto name="stethoscope" size={24} color="#2e2e2e" />
              </View>
            </View>
            <Pressable
              onPress={() => router.push("/(laboratory)")}
              style={{
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 16,
                // backgroundColor: "#F6F7F8ff",
                backgroundColor: "#CFB7B0ff",
                height: 140,
                width: "49%",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                  color: "#2e2e2e",
                  flexGrow: 1,
                }}
              >
                Book{"\n"}Lab Tests
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable>
                  <FontAwesome5
                    name="arrow-circle-right"
                    size={24}
                    color="black"
                  />
                </Pressable>
                <Entypo name="lab-flask" size={24} color="#2e2e2e" />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={{ marginTop: 36 }}>
          <Text style={styles.featuredHeading}>
            Most Common{"\n"}Blood Test
          </Text>
          <Pressable>
            <FlatList
              horizontal
              data={medical_data}
              renderItem={renderProductTile}
              keyExtractor={(item) => item.key}
              showsHorizontalScrollIndicator={false}
              // scrollEnabled={isBottomSheetOpen === false}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: 220,
    marginHorizontal: 12,
    borderRadius: 32,
    marginBottom: 10,
    paddingHorizontal: 26,
    paddingTop: 20,
    // paddingBottom: 8,
  },

  lightBackButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },

  darkBackButton: {
    borderRadius: 24,
    width: 42,
    height: 42,
    backgroundColor: "#1E1F22",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },

  ad_img: {
    width: 160,
    height: 125,
    position: "absolute",
    bottom: 0,
    right: 0,
    objectFit: "scale-down",
  },

  featuredHeading: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 20,
  },

  labBtn: {
    justifyContent: "center",
    alignItems: "center",

    // marginRight: 10,
  },

  lab_icons: {
    width: 42,
    height: 42,
    // marginLeft: 5,
  },

  lab_text: {
    color: "#333",
    // font-family: Lato;
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 157.143% */,
    marginTop: 5,
    textAlign: "center",
  },

  productTile: {
    width: 120,
    marginRight: 16,
    height: 120,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#a0a0a0",
    position: "relative",
    overflow: "hidden",
    marginBottom: 8,
  },

  add_button: {
    backgroundColor: "#fff",
    borderRadius: 200,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowRadius: 2,
    shadowColor: "#777777",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    position: "absolute",
    right: 12,
    bottom: 15,
  },
});

export default Laboratory;
