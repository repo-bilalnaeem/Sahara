import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import SeeMore from "./SeeMore";
import BookNow from "./BookNow";
import { doctors } from "@/assets/data/RecentlyViewed";

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
          keyExtractor={(item) => item.doctorId}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />
      </View>
    </View>
  );
};

export default RecentlyViewed;
