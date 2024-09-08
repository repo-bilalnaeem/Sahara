import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import Listings from "@/components/SearchList";
import ListingData from "@/assets/data/RecentlyViewed.json";
import FilterList from "@/components/SearchFilter";
const search = () => {
  const items = useMemo(() => ListingData as any, []);
  const [category, setCategory] = useState<string>("All");

  const onDataChanged = (category: string) => {
    console.log("CHANGED: ", category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <FilterList onCategoryChanged={onDataChanged} />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default search;
