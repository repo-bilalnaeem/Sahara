import { View } from "react-native";
import React, { useState } from "react";
import Listings from "@/components/SearchList";
import FilterList from "@/components/SearchFilter";
import { useGetDoctorsQuery } from "@/slices/apiSlice";

const search = () => {
  const { data, error, isLoading } = useGetDoctorsQuery(undefined);
  const [category, setCategory] = useState<string>("All");

  const onDataChanged = (category: string) => {
    console.log("CHANGED: ", category);
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <FilterList onCategoryChanged={onDataChanged} />
      <Listings listings={data || []} category={category} />
    </View>
  );
};

export default search;
