import { View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Listings from "@/components/SearchList";
import { doctors } from "@/assets/data/RecentlyViewed";
import FilterList from "@/components/SearchFilter";
import { useLocalSearchParams } from "expo-router";
const search = () => {
  const items = useMemo(() => doctors as any, []);
  const [category, setCategory] = useState<string>("All");
  const { query } = useLocalSearchParams();

  // console.log("Doctor Field:", query);

  useEffect(() => {
    if (query) {
      setCategory(query as string);
    }
  }, [query]);

  const onDataChanged = (category: string) => {
    // console.log("CHANGED: ", category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <FilterList onCategoryChanged={onDataChanged} selectedCategory={category}/>
      <Listings listings={items} category={category} />
    </View>
  );
};

export default search;
