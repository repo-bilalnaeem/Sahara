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
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import NotFound from "./NotFound";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useGetDoctorsQuery } from "@/slices/apiSlice";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useGetDoctorsQuery(undefined);
  const [doctors, setDoctors] = useState([]);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (data?.doctors) {
      setDoctors(data.doctors);
    }
  }, [data]);

  useEffect(() => {
    console.log("RELOAD LISTINGS", items.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }, 200);
  }, [category]);

  // Memoize the filtered items to avoid unnecessary recalculations
  const filteredItems = useMemo(() => {
    return category === "All"
      ? items
      : items.filter(({ occupation }) => occupation === category);
  }, [items, category]);

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
            uri: "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          data={doctors}
          contentContainerStyle={styles.listitems}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
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
});
export default Listings;
