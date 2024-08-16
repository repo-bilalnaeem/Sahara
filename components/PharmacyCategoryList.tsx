import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  useColorScheme,
  TextInput,
  Keyboard,
} from "react-native";
import React, { RefObject, useMemo, useRef, useState } from "react";
import SeeMore from "./SeeMore";
import FilterList from "./FilterList";
import Listings from "./SearchListings";
import ListingData from "@/assets/data/RecentlyViewed.json";

const PharmacyCategoryList = () => {
  const inputRef: RefObject<TextInput> = useRef(null);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    inputRef.current?.clear();
  };

  const isDarkMode = useColorScheme() === "dark";

  const [category, setCategory] = useState("All");
  const items = useMemo(() => ListingData as any, []);
  const onDataChanged = (category: string) => {
    // console.log('CHANGED: ', category)
    setCategory(category);
  };

  return (
    <>
      {/* <SeeMore heading="All Categories" /> */}
      <Text style={isDarkMode ? styles.lightHeading : styles.darkHeading}>
        All Categories
      </Text>
      <FilterList onCategoryChanged={onDataChanged} />
      <Listings listings={items} category={category} />
    </>
  );
};

const styles = StyleSheet.create({
  darkHeading: {
    color: "#000",
    fontFamily: "Lato500",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 122.222% */,
    marginHorizontal: 8,
    marginBottom: 4,
  },

  lightHeading: {
    color: "#FFF",
    fontFamily: "Lato500",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 122.222% */,
    marginHorizontal: 8,
    marginBottom: 4,
  },
});

export default PharmacyCategoryList;
