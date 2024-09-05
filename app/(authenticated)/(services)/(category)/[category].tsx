import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";

const ShopDetail = () => {
  const { category } = useLocalSearchParams<{ category: string }>();

  return (
    <View>
      <Text>{category}</Text>
    </View>
  );
};

export default ShopDetail;
