const GlassmorphicView = () => (
  <View style={styles.glassContainer}>
    <Image
      source={require("@/assets/images/Search-PNG.png")}
      style={styles.image}
    />
  </View>
);

const NotFound = () => {
  const isDarkMode = useColorScheme() === "dark";
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, justifyContent: "center", top: top }}>
      <GlassmorphicView />
      <View style={{ flex: 0.4, justifyContent: "center" }}>
        <Text style={isDarkMode ? styles.notFoundLight : styles.notFoundDark}>
          Not Found
        </Text>
        <Text
          style={
            isDarkMode ? styles.notFoundTextLight : styles.notFoundTextDark
          }
        >
          Sorry, the keyword you entered could not{"\n"}be found, please check
          again or search{"\n"}with another keyword.
        </Text>
      </View>
    </View>
  );
};

import { Href, router } from "expo-router";
import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Image,
  Text,
  useColorScheme,
  TextStyle,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: data, category }: Props) => {
  console.log("category:", category);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  const items = useMemo(() => data || [], [data]);

  const filteredItems = useMemo(() => {
    if (category === "All") {
      return items; // Show all doctors
    }
    return items.filter(
      (doctor: { department: string }) => doctor.department === category
    ); // Filter by department
  }, [items, category]);

  useEffect(() => {
    console.log("RELOAD LISTINGS", items.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }, 200);
  }, [category]);

  // Memoize the filtered items to avoid unnecessary recalculations
  const filterData = items.filter(
    (department: string) => department === category
  );
  console.log(filterData);

  const renderRow = ({ item }: any) => (
    <Pressable onPress={() => router.push(`(doctor)/${item.doctorId}` as Href)}>
      <Animated.View
        style={{ height: 300 }}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={{
            uri: item.imageUrl,
          }}
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
                5{/* {item.ratings} */}
              </Text>
            </View>
          </View>

          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.speciality}>{item.department}</Text>
          <Pressable style={styles.bookNow}>
            <Text style={styles.bookText}>Book Now</Text>
          </Pressable>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );

  return (
    <View style={{ paddingHorizontal: 13, flex: 1, top: 0 }}>
      {filteredItems.length === 0 ? (
        <NotFound />
      ) : (
        <FlatList
          ref={listRef}
          // keyExtractor={(item) => item.id.toString()}
          renderItem={renderRow}
          data={filteredItems}
          contentContainerStyle={styles.listitems}
          showsVerticalScrollIndicator={false}
          initialNumToRender={2}
          onEndReachedThreshold={0.5}
        />
      )}
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
    gap: 16,
    paddingBottom: 320,
    marginTop: 120,
  },
  name: {
    color: "#FFF",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22,
    left: 22,
    bottom: -223,
  },
  speciality: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
    left: 22,
    bottom: -228,
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
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
  },
  profession: {
    color: "#FFF",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 13.555,
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

  glassContainer: {
    borderRadius: 40,
    marginHorizontal: 20,
    marginTop: 36,
    padding: 20,
    paddingBottom: 0,
    elevation: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  notFoundLight: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 30,
    color: "#fff",
  } as TextStyle,

  notFoundDark: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 30,
  } as TextStyle,

  notFoundTextLight: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 24,
  } as TextStyle,

  notFoundTextDark: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 24,
  } as TextStyle,

  image: {
    height: 150,
    resizeMode: "contain",
  },
});
export default Listings;
