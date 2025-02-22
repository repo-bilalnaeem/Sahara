import { View, Text, FlatList, Pressable, Platform } from "react-native";
import React from "react";
import { blood_data, popular_data } from "@/assets/data/PharmacyPageData";
import ProductTile from "./ProductTile";
import SeeMore from "./SeeMore";
const isAndroid = Platform.OS === "android";

const SaharaMart = () => {
  return (
    <View style={{ marginVertical: 36 }}>
      <View>
        <Text
          style={[
            {
              marginHorizontal: 16,
              fontWeight: "500",
              fontSize: 20,
              marginBottom: 24,
            },
          ]}
        >
          SaharaMart
        </Text>
        <View>
          <SeeMore heading="Popular products" />
        </View>
        <Pressable>
          <FlatList
            horizontal
            data={popular_data}
            renderItem={ProductTile}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
          />
        </Pressable>
      </View>
      <View style={{ marginTop: 24 }}>
        <SeeMore heading="General" />
      </View>
      <Pressable>
        <FlatList
          horizontal
          data={blood_data}
          renderItem={ProductTile}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          // scrollEnabled={isBottomSheetOpen === false}
        />
      </Pressable>
    </View>
  );
};

export default SaharaMart;
