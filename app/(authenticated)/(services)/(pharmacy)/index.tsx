import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Href, router } from "expo-router";
import PharmacyFeatures from "@/components/PharmacyFeatures";
import SeeMore from "@/components/SeeMore";
import { Ionicons } from "@expo/vector-icons";
import PharmacySponserAd from "@/components/PharmacySponserAd";

import {
  data,
  medical_data,
  popular_data,
  categoryData,
  blood_data,
} from "@/assets/data/PharmacyPageData";
import { StatusBar } from "expo-status-bar";

interface ProductItem {
  key: string;
  imageSource: any;
  price: number;
  title: string;
}

export interface RenderProductTileProps {
  item: ProductItem;
  index: number;
}

interface ServiceItem {
  screen: string;
  imageSource: any;
  text: string;
}

export interface RenderServicesItemProps {
  item: ServiceItem;
  index: number;
}

const category = categoryData.map((item) => ({
  ...item,
  get screen() {
    return `/(category)/${item.text}`;
  },
}));

export function formatTitle(title: string, maxLength = 25) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + " ...";
  }
  return title;
}

const Pharmacy = () => {
  const isDarkMode = useColorScheme() === "dark";

  const renderServicesItem = ({ item, index }: RenderServicesItemProps) => (
    <Pressable
      onPress={() => router.navigate(item.screen as Href)}
      style={{ alignItems: "center" }}
      key={index}
    >
      <View
        style={[
          styles.doctorServiceBtn,
          index === 0 ? { marginLeft: 16 } : null,
        ]}
      >
        <Image
          source={item.imageSource}
          style={[styles.service_icons, { resizeMode: "contain" }]}
        />
      </View>
      <Text
        style={[styles.service_text, index !== 0 ? { marginRight: 10 } : null]}
      >
        {item.text}
      </Text>
    </Pressable>
  );

  const renderProductTile = ({ item, index }: RenderProductTileProps) => (
    <Pressable onPress={() => router.push(`/(product)/${item.key}` as Href)}>
      <View style={[index === 0 ? { marginLeft: 16 } : null]}>
        <View style={styles.productTile}>
          <Image
            source={item.imageSource}
            style={[{ resizeMode: "contain", width: 120, height: 120 }]}
          />
          <TouchableWithoutFeedback>
            <View style={styles.add_button}>
              <Ionicons name="add" size={20} color={"#494848"} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            marginBottom: 4,
            width: 120,
          }}
        >
          Rs. {item.price}
        </Text>
        <Text
          style={{ width: 120, fontSize: 14, fontWeight: "400", color: "gray" }}
        >
          {formatTitle(item.title)}
        </Text>
      </View>
    </Pressable>
  );
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
          {/* <Pressable> */}
          <FlatList
            horizontal
            data={data}
            renderItem={renderServicesItem}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            // scrollEnabled={isBottomSheetOpen === false}
          />
          {/* </Pressable> */}
        </View>
        <PharmacySponserAd
          height={160}
          width={160}
          title={`Enjoy muft ka${"\n"}easyload!`}
          description={`Easyload ab bilkul free`}
          imageSource={require("@/assets/images/easypaisa_ad.jpg")}
        />

        <View>
          <SeeMore
            heading="Recommended for you"
            onSeeMorePress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Pressable>
            <FlatList
              horizontal
              data={medical_data}
              renderItem={renderProductTile}
              keyExtractor={(item) => item.key}
              showsHorizontalScrollIndicator={false}
              // scrollEnabled={isBottomSheetOpen === false}
            />
          </Pressable>
        </View>

        <View style={{ marginTop: 38 }}>
          <SeeMore
            heading="Popular products"
            onSeeMorePress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Pressable>
            <FlatList
              horizontal
              data={popular_data}
              renderItem={renderProductTile}
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

          <FlatList
            horizontal
            data={category}
            renderItem={renderServicesItem}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            // scrollEnabled={isBottomSheetOpen === false}
          />
        </View>

        <View style={{ marginTop: 38 }}>
          <SeeMore
            heading="General"
            onSeeMorePress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Pressable>
            <FlatList
              horizontal
              data={blood_data}
              renderItem={renderProductTile}
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

  productTile: {
    width: 120,
    marginRight: 16,
    // justifyContent: "center",
    // alignItems: "center",
    height: 120,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#a0a0a0",
    // elevation: 3,
    // shadowColor: "#8d8d8d7a",
    // shadowOpacity: 0.8,
    // shadowRadius: 3,
    position: "relative",
    overflow: "hidden",
    marginBottom: 8,
  },

  add_button: {
    backgroundColor: "#fff",
    borderRadius: 200,
    width: 24,
    height: 24,
    // borderColor: "#000",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowRadius: 2,
    shadowColor: "#777777",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    position: "absolute",
    right: 12,
    bottom: 15,
  },
});

export default Pharmacy;
