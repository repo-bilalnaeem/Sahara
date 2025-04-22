import { View, Text, FlatList, Pressable, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import ProductTile from "./ProductTile";
import SeeMore from "./SeeMore";
import {
  useGetProductsByCategoryTagsQuery,
  useGetProductsByTagsQuery,
} from "@/slices/apiSlice";

const SaharaMart = () => {
  const { data, isLoading } = useGetProductsByTagsQuery({
    limit: 8,
    tag: "POPULAR_PRODUCT",
  });
  const { data: general, isLoading: loading_general } =
    useGetProductsByCategoryTagsQuery({
      category: "GENERAL",
      tag: "NONE",
      limit: 8,
      page: 1,
    });
  const [products, setProducts] = useState([]);

  const [generalProducts, setGeneralProducts] = useState([]);

  useEffect(() => {
    if (data && data?.products) {
      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (general && general?.products) {
      // console.log(JSON.stringify(general, null, 2));
      setGeneralProducts(general.products);
    }
  }, [general]);

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
            data={products}
            renderItem={({ item, index }) => (
              <ProductTile item={item} index={index} />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingRight: 16,
            }}
            // scrollEnabled={isBottomSheetOpen === false}
          />
        </Pressable>
      </View>
      <View style={{ marginTop: 24 }}>
        <SeeMore heading="General" />
      </View>
      <Pressable>
        <FlatList
          horizontal
          data={generalProducts}
          renderItem={({ item, index }) => (
            <ProductTile item={item} index={index} />
          )}
          contentContainerStyle={{
            gap: 10,
            paddingRight: 16,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </Pressable>
    </View>
  );
};

export default SaharaMart;
