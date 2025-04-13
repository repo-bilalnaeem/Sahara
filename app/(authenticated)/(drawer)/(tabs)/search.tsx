import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetAllDoctorsQuery } from "@/slices/apiSlice";
import { categories } from "@/assets/data/SearchFilters";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const RenderRow = ({ item, index }: any) => {
  const router = useRouter();
  console.log("item", item);
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/(authenticated)/(doctor)/[id]`,
          params: { id: item.Doctor.doctorId },
        })
      }
    >
      <Animated.View
        style={{ height: 300 }}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={{ uri: item.Doctor.imageUrl }}
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
              source={require("@/assets/images/Professional.png")}
              style={{ width: 22, height: 22 }}
            />
            <Text style={styles.profession}>Professional Doctor</Text>
          </View>

          <View style={styles.ratings}>
            <BlurView intensity={35} style={StyleSheet.absoluteFill} />
            <View style={styles.ratingsContainer}>
              <Image
                source={require("@/assets/images/StarGold.png")}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
              <Text style={styles.ratingText}>5</Text>
            </View>
          </View>

          <Text style={styles.name}>
            {item.Doctor.firstName} {item.Doctor.lastName}
          </Text>
          <Text style={styles.speciality}>{item.Doctor.department}</Text>
          <Pressable style={styles.bookNow}>
            <Text style={styles.bookText}>Book Now</Text>
          </Pressable>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};

const Search = () => {
  const { query } = useLocalSearchParams();
  const [department, setDepartment] = useState<string>("All");
  const { data, isLoading } = useGetAllDoctorsQuery({
    department: department === "All" ? "" : department,
  });

  console.log(data?.doctors);

  const scrollRef = useRef<ScrollView>(null);
  const listRef = useRef<FlatList>(null);
  const itemsRef = useRef<Array<any>>(categories.map(() => null));
  const [activeIndex, setActiveIndex] = useState(0);

  const doctors = data?.doctors || [];

  console.log(doctors);

  const scrollToIndex = (index: number) => {
    const selected = itemsRef.current[index];
    if (selected) {
      selected.measure(
        (x: any, y: any, width: any, height: any, pageX: number) => {
          scrollRef.current?.scrollTo({ x: pageX - 16, y: 0, animated: true });
        }
      );
    }
  };

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    scrollToIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDepartment(categories[index].text);
  };

  useEffect(() => {
    if (query) {
      setDepartment(query as string);
    }
  }, [query]);

  useEffect(() => {
    if (department) {
      const index = categories.findIndex((item) => item.text === department);
      if (index !== -1) {
        setActiveIndex(index);
        scrollToIndex(index);
      }
    }
    console.log("Category Changed");
  }, [department]);

  useEffect(() => {
    if (data) {
      console.log("Refetched Data");
    }
  }, [data]);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          bounces={false}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              onPress={() => selectCategory(index)}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
            >
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryTextDark
                }
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ paddingHorizontal: 13, flex: 1 }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : doctors.length === 0 ? (
          <View style={styles.notFoundContainer}>
            <Image
              source={require("@/assets/images/Not Found Icon.png")}
              style={styles.image}
            />
            <Text style={styles.notFoundTextDark}>Result not Found!</Text>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={doctors}
            renderItem={({ item, index }) => (
              <RenderRow item={item} index={index} />
            )}
            contentContainerStyle={styles.listitems}
            showsVerticalScrollIndicator={false}
            initialNumToRender={2}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingVertical: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#fff",
  },
  categoryTextDark: {
    fontSize: 12,
    color: "#000",
  },
  categoryTextActive: {
    fontSize: 12,
    color: "#fff",
  },
  categoriesBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#478EEF",
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  categoriesBtnActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1661E0",
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
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
    marginTop: 20,
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

  notFoundLight: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    lineHeight: 30,
    color: "#fff",
  },

  notFoundTextDark: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
  },
  image: {
    height: 50,
    width: 50,
    objectFit: "contain",
  },
  ratingText: {
    color: "#FFF",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
  },

  ratingsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 7.5,
    alignItems: "center",
    justifyContent: "center",
  },

  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
});

export default Search;
