import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

const Product = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Log the product ID
  useEffect(() => {
    console.log("Product ID:", id);
  }, [id]);

  return (
    <View>
      <Text>Helooooo</Text>
      <Text>{id}</Text>
    </View>
  );
};

export default Product;
