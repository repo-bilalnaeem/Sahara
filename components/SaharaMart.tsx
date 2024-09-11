import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { blood_data, popular_data } from "@/assets/data/PharmacyPageData";
import ProductTile from "./ProductTile";
import SeeMore from "./SeeMore";

const SaharaMart = () => {
  return (
    <View style={{ marginVertical: 38 }}>
      <View>
        <Text
          style={{
            marginHorizontal: 23,
            fontWeight: "500",
            fontSize: 20,
            marginBottom: 24,
          }}
        >
          SaharaMart
        </Text>
        <View>
          <SeeMore
            heading="Popular products"
            onSeeMorePress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </View>
        <Pressable>
          <FlatList
            horizontal
            data={popular_data}
            renderItem={ProductTile}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            // scrollEnabled={isBottomSheetOpen === false}
          />
        </Pressable>
      </View>
      <View style={{ marginTop: 24 }}>
        <SeeMore
          heading="General"
          onSeeMorePress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
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
