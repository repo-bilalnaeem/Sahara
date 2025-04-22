import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import PharmacyFeatures from "@/components/PharmacyFeatures";
import SeeMore from "@/components/SeeMore";
import PharmacySponserAd from "@/components/PharmacySponserAd";

import { categoryData } from "@/assets/data/PharmacyPageData";
import { StatusBar } from "expo-status-bar";
import ProductTile from "@/components/ProductTile";
import PharmacyServiceList from "@/components/PharmacyServiceList";
import {
  useGetProductsByCategoryTagsQuery,
  useGetProductsByTagsQuery,
} from "@/slices/apiSlice";

const category = categoryData.map((item) => ({
  ...item,
  get screen() {
    return `/(authenticated)/(services)/(pharmacy)/${item.category}`;
  },
}));

const Pharmacy = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [popularProductsTag, setPopularProductsTag] = useState([]);
  const [generalProductsCategory, setGeneralProductsCategory] = useState([]);
  const [recommendedProductsTag, setRecommendedProductsTag] = useState([]);

  const { data: recommendedData, isLoading: recommendedLoading } =
    useGetProductsByTagsQuery({
      limit: 8,
      tag: "RECOMMENDED",
    });

  const { data: popularData, isLoading: popularLoading } =
    useGetProductsByTagsQuery({
      limit: 8,
      tag: "POPULAR_PRODUCT",
    });

  const { data: generalData, isLoading: generalLoading } =
    useGetProductsByCategoryTagsQuery({
      limit: 8,
      category: "GENERAL",
      tag: "NONE",
      page: 1,
    });

  useEffect(() => {
    if (popularData && popularData?.products) {
      setPopularProductsTag(popularData?.products);
    }
  }, [popularData]);

  useEffect(() => {
    if (generalData && generalData?.products) {
      setGeneralProductsCategory(generalData?.products);
    }
  }, [generalData]);

  useEffect(() => {
    if (recommendedData && recommendedData?.products) {
      setRecommendedProductsTag(recommendedData?.products);
    }
  }, [recommendedData]);

  // console.log("Popular Product data is: ", popularProductsTag);
  // console.log("Recommended Product data is: ", recommendedProductsTag);
  // console.log("General Product data is: ", generalProductsCategory);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="light" />
      <ScrollView
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        <PharmacyFeatures />

        <View style={{ paddingTop: 48 }} />
        <PharmacySponserAd
          height={160}
          width={160}
          title={`Enjoy muft ka${"\n"}easyload!`}
          description={`Easyload ab bilkul free`}
          imageSource={require("@/assets/images/easypaisa_ad.jpg")}
        />

        <View>
          <SeeMore heading="Recommended for you" />
          <Pressable>
            <FlatList
              horizontal
              data={recommendedProductsTag}
              renderItem={ProductTile}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                paddingRight: 16,
              }}
              // scrollEnabled={isBottomSheetOpen === false}
            />
          </Pressable>
        </View>

        <View style={{ marginTop: 38 }}>
          <SeeMore heading="Popular products" />
          <Pressable>
            <FlatList
              horizontal
              data={popularProductsTag}
              renderItem={ProductTile}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                paddingRight: 16,
              }}
              // scrollEnabled={isBottomSheetOpen === false}
            />
          </Pressable>
        </View>

        <View style={{ paddingVertical: 38 }}>
          <Text
            style={[
              styles.flex_headings,
              isDarkMode ? styles.lightHeading : styles.darkHeading,
            ]}
          >
            Category
          </Text>

          <PharmacyServiceList listData={category} />
        </View>

        <View style={{ marginTop: 0 }}>
          <SeeMore heading="General" />
          <Pressable>
            <FlatList
              horizontal
              data={generalProductsCategory}
              renderItem={ProductTile}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
                paddingRight: 16,
              }}
              // scrollEnabled={isBottomSheetOpen === false}
            />
          </Pressable>
        </View>

        <View style={{ marginTop: 38 }}>
          <PharmacySponserAd
            height={180}
            title={`Mastercard weekdays`}
            description={`Use Master30 on checkout${"\n"}and get 30% off!`}
            imageSource={require("@/assets/images/Mastercard.jpg")}
            width={150}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  darkHeading: {
    color: "#000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
  },
  lightHeading: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22,
  },

  flex_headings: {
    marginHorizontal: 23,
    marginBottom: 26,
  },

  service_icons: {
    width: 42,
    height: 42,
    // marginLeft: 5,
  },

  service_text: {
    color: "#333",
    // font-family: Lato;
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 157.143% */,
    marginTop: 5,
    textAlign: "center",
  },

  doctorServiceBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
    marginRight: 10,
  },
});

export default Pharmacy;
