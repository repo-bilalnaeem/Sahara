import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import React, { useEffect, useRef, useState } from "react";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    console.log("RELOAD LISTINGS", items.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow = ({ item }: any) => (
    <Pressable onPress={() => router.push("/(doctor)")}>
      <Animated.View
        style={{ height: 300 }}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={{ uri: item.imageSource }}
        >
          <LinearGradient
            colors={[
              "rgba(0, 0, 0, 0.40)",
              "rgba(0, 0, 0, 0.50)",
              "rgba(0, 0, 0, 0.18)",
            ]}
            locations={[0.044, 0.2209, 0.566]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.professionLabel}>
            <BlurView intensity={20} style={StyleSheet.absoluteFill} />
            <Image
              source={require("../assets/images/Professional.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.profession}>Professional Doctor</Text>
          </View>

          <View style={styles.ratings}>
            <BlurView intensity={35} style={StyleSheet.absoluteFill} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 7.5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/images/StarGold.png")}
                style={{ width: 18.46, height: 18, objectFit: "scale-down" }}
              />
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 14,
                  fontStyle: "normal",
                  fontWeight: "500",
                }}
              >
                {item.ratings}
              </Text>
            </View>
          </View>

          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.speciality}>{item.occupation}</Text>
          <Pressable style={styles.bookNow}>
            <Text style={styles.bookText}>Book Now</Text>
          </Pressable>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );

  return (
    <View
      style={{
        paddingHorizontal: 13,
        flex: 1,
        top: 75,
      }}
    >
    
      <FlatList
        ref={listRef}
        renderItem={renderRow}
        data={loading ? [] : items}
        contentContainerStyle={styles.listitems}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: 500,
    borderRadius: 24,
    overflow: "hidden",
    objectFit: "cover",
    flex: 1,
  },
  listitems: {
    // flex: 1,
    gap: 16,
    paddingBottom: 24,
    marginTop: 120

  },

  name: {
    color: "#FFF",
    // font-family: Lato;
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22 /* 91.667% */,
    left: 22,
    bottom: -223,
  },

  speciality: {
    color: "#FFF",
    // font-family: Lato;
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 137.5% */,
    left: 22,
    bottom: -233 + 5,
  },

  bookNow: {
    borderRadius: 26,
    backgroundColor: "#2268FB",
    paddingHorizontal: 18,
    paddingVertical: 16,
    position: "absolute",
    bottom: 26,
    right: 22,
  },

  bookText: {
    color: "#FFF",
    // font-family: Lato;
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    // lineHeight: 23.2 /* 23.2px */,
  },

  profession: {
    color: "#FFF",
    // font-family: Inter;
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 13.555 /* 13.555px */,
  },

  professionLabel: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
    top: 20,
    left: 16,
    alignItems: "center",
    position: "absolute",
    padding: 12,
    borderRadius: 20,
    overflow: "hidden",
  },

  ratings: {
    position: "absolute",
    top: 24,
    right: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    overflow: "hidden",
  },
});

export default Listings;
