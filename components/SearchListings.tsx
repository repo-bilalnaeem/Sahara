import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  useColorScheme,
  ImageBackground,
  FlatListProps,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

import NotFound from "@/components/NotFound";

interface ListingItem {
  id: string;
  imageSource: string;
  firstName: string;
  lastName: string;
  occupation: string;
  ratings: number;
}

interface ListingsProps {
  listings: ListingItem[];
  category: string;
}

const Listings: React.FC<ListingsProps> = ({ listings: items, category }) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList<ListingItem>>(null);
  const isDarkMode = useColorScheme() === "dark";
  const [filteredData, setFilteredData] = useState<ListingItem[]>([]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const navigateToListing = (itemId: string) => {
    router.push(``);
  };

  const renderRow: FlatListProps<ListingItem>["renderItem"] = ({ item }) => (
    <Pressable onPress={() => navigateToListing(item.id)}>
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
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.professionLabel}>
            <BlurView intensity={20} style={StyleSheet.absoluteFillObject} />
            <Image
              source={require("@/assets/images/Professional.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.profession}>Professional Doctor</Text>
          </View>

          <View style={styles.ratings}>
            <BlurView intensity={35} style={StyleSheet.absoluteFillObject} />
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
                source={require("@/assets/images/StarGold.png")}
                style={{ width: 18.46, height: 18, resizeMode: "contain" }}
              />
              <Text style={styles.ratingText}>{item.ratings}</Text>
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

  return filteredData.length !== 0 ? (
    <View style={styles.container}>
      <FlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : filteredData}
        contentContainerStyle={styles.listitems}
        showsVerticalScrollIndicator={false}
      />
    </View>
  ) : (
    <NotFound />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    flex: 1,
    marginTop: 16,
  } as ViewStyle,
  backgroundImage: {
    height: 500,
    borderRadius: 24,
    overflow: "hidden",
    resizeMode: "cover",
    flex: 1,
  } as ImageStyle,
  listitems: {
    gap: 16,
    paddingBottom: 100,
  } as ViewStyle,
  name: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 22,
    left: 22,
    bottom: -223,
  } as TextStyle,
  speciality: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    left: 22,
    bottom: -228,
  } as TextStyle,
  bookNow: {
    borderRadius: 26,
    backgroundColor: "#2268FB",
    paddingHorizontal: 18,
    paddingVertical: 16,
    position: "absolute",
    bottom: 26,
    right: 22,
  } as ViewStyle,
  bookText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "400",
  } as TextStyle,
  profession: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 13.555,
  } as TextStyle,
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
  } as ViewStyle,
  ratings: {
    position: "absolute",
    top: 24,
    right: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    overflow: "hidden",
  } as ViewStyle,
  ratingText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  } as TextStyle,
});

export default Listings;
