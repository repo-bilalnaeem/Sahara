import {
    View,
    Text,
    StyleSheet,
    useColorScheme,
    Pressable,
    FlatList,
    ScrollView,
  } from "react-native";
  import React from "react";
  import PharmacyFeatures from "@/components/PharmacyFeatures";
  import SeeMore from "@/components/SeeMore";
  import PharmacySponserAd from "@/components/PharmacySponserAd";
  
  import {
    data,
    medical_data,
    popular_data,
    categoryData,
    blood_data,
  } from "@/assets/data/PharmacyPageData";
  import { StatusBar } from "expo-status-bar";
  import ProductTile from "@/components/ProductTile";
  import PharmacyServiceList from "@/components/PharmacyServiceList";
  
  const category = categoryData.map((item) => ({
    ...item,
    get screen() {
      return `/(category)/${item.text}`;
    },
  }));
  
  const Pharmacy = () => {
    const isDarkMode = useColorScheme() === "dark";
  
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
  
          <View style={{ paddingVertical: 38, paddingTop: 24 }}>
            <Text
              style={[
                styles.flex_headings,
                isDarkMode ? styles.lightHeading : styles.darkHeading,
              ]}
            >
              Shops
            </Text>
  
            <PharmacyServiceList listData={data} />
          </View>
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
                data={medical_data}
                renderItem={ProductTile}
                keyExtractor={(item) => item.key}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled={isBottomSheetOpen === false}
              />
            </Pressable>
          </View>
  
          <View style={{ marginTop: 38 }}>
            <SeeMore heading="Popular products" />
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
  
          <View style={{ marginTop: 38 }}>
            <SeeMore heading="General" />
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
  