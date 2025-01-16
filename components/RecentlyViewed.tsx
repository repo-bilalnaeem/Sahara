import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import SeeMore from "./SeeMore";
import BookNow from "./BookNow";
import { doctors } from "@/assets/data/RecentlyViewed";

interface Item {
  id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  ratings: number;
  imageSource: string;
  about: string;
  reviews: { patientName: string; reviews: string }[];
}

const RecentlyViewed = () => {
  return (
    <View style={{ marginBottom: 32 }}>
      <SeeMore heading="Recently Viewed" />
      <View>
        <FlatList
          horizontal
          data={doctors}
          renderItem={({ item, index }) => (
            <BookNow item={item} index={index} />
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />
      </View>
    </View>
  );
};

export default RecentlyViewed;
