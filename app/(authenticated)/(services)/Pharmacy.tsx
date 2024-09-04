import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  Touchable,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import PharmacyFeatures from "@/components/PharmacyFeatures";
import SeeMore from "@/components/SeeMore";
import { Ionicons } from "@expo/vector-icons";
import PharmacySponserAd from "@/components/PharmacySponserAd";

const data = [
  {
    key: "1",
    imageSource: require("@/assets/images/convinence.png"),
    text: "Convenience",
    screen: "/(shops)/Convinence",
  },
  {
    key: "2",
    imageSource: require("@/assets/images/groceries.png"),
    text: "Groceries",
    screen: "/(shops)/Groceries",
  },
  {
    key: "3",
    imageSource: require("@/assets/images/health.png"),
    text: `Health &${"\n"}Wellbeing`,
    screen: "/(shops)/Health&Wellbeing",
  },
  {
    key: "4",
    imageSource: require("@/assets/images/household.png"),
    text: `Household &${"\n"}Living`,
    screen: "/(shops)/Household&Living",
  },
];

const medical_data = [
  {
    key: "1",
    imageSource: require("@/assets/images/medicine_images/img1.jpeg"),
    title: "Strepsils Honey & Lemon Lozenges",
    price: 197.13,
  },
  {
    key: "2",
    imageSource: require("@/assets/images/medicine_images/img2.jpeg"),
    title: "Panadol Extra Tablets",
    price: 47.5,
  },
  {
    key: "3",
    imageSource: require("@/assets/images/medicine_images/img3.jpeg"),
    title: "Softin Tablets 10mg",
    price: 95.0,
  },
  {
    key: "4",
    imageSource: require("@/assets/images/medicine_images/img4.jpeg"),
    title: "Glucerna Milk Powder Vanilla 400g",
    price: 3744.0,
  },
  {
    key: "5",
    imageSource: require("@/assets/images/medicine_images/img5.jpeg"),
    title: "Evion Capsules 400gm",
    price: 102.4,
  },
];

const popular_data = [
  {
    key: "1",
    imageSource: require("@/assets/images/medicine_images/img6.jpeg"),
    title: "Ensure Milk Powder Chocolate 400g",
    price: 2945.0,
  },
  {
    key: "2",
    imageSource: require("@/assets/images/medicine_images/img7.jpeg"),
    title: "Cerelac 3 Fruits & Wheat 350g",
    price: 47.5,
  },
  {
    key: "3",
    imageSource: require("@/assets/images/medicine_images/img8.png"),
    title: "Cerealc Rice 175g",
    price: 95.0,
  },
  {
    key: "4",
    imageSource: require("@/assets/images/medicine_images/img9.jpeg"),
    title: "Cerelac Nature Roa 175 Grams",
    price: 601.0,
  },
  {
    key: "5",
    imageSource: require("@/assets/images/medicine_images/img10.jpeg"),
    title:
      "Nestle Cerelac Natures Selection Multigrain, Pomegranate, Cherries & Apples 350G",
    price: 1220.0,
  },
];

const categoryData = [
  {
    key: "1",
    imageSource: require("@/assets/images/general.png"),
    text: "General",
  },
  {
    key: "2",
    imageSource: require("@/assets/images/blood.png"),
    text: "Blood",
  },
  {
    key: "3",
    imageSource: require("@/assets/images/brain.png"),
    text: "Brain",
  },
  {
    key: "4",
    imageSource: require("@/assets/images/chemo.png"),
    text: "Chemotherapy",
  },
  { key: "5", imageSource: require("@/assets/images/cold.png"), text: "Cold" },
  {
    key: "6",
    imageSource: require("@/assets/images/device.png"),
    text: "Devices",
  },
  { key: "7", imageSource: require("@/assets/images/ear.png"), text: "Ear" },
  { key: "8", imageSource: require("@/assets/images/eye.png"), text: "Eye" },
];

const general_data = [
  {
    key: "1",
    imageSource: require("@/assets/images/medicine_images/img11.jpeg"),
    title: "Peditral Powder Orange Sachet (1 Box = 25 sachets)",
    price: 26.96,
  },
  {
    key: "2",
    imageSource: require("@/assets/images/medicine_images/img12.jpeg"),
    title: "Nexum Capsules 20mg",
    price: 188.0,
  },
  {
    key: "3",
    imageSource: require("@/assets/images/medicine_images/img13.jpeg"),
    title: "Azomax 250 Capsules 250mg",
    price: 694.51,
  },
  {
    key: "4",
    imageSource: require("@/assets/images/medicine_images/img14.jpeg"),
    title: "Polyfax Skin Ointment 20g",
    price: 170.0,
  },
  {
    key: "5",
    imageSource: require("@/assets/images/medicine_images/img15.jpeg"),
    title: "Brufen Tablets 200mg (1 strip = 10 tablets)",
    price: 39.67,
  },
];

const category = categoryData.map((item) => ({
  ...item,
  get screen() {
    return `/(shops)/${item.text}`;
  },
}));

function formatTitle(title: string, maxLength = 25) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + " ...";
  }
  return title;
}

const Pharmacy = () => {
  const { top } = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === "dark";

  const renderServicesItem = ({ item, index }) => (
    <Pressable
      onPress={() => router.navigate(item.screen)}
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

  const renderProductTile = ({ item, index }) => (
    <Pressable>
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
      <ScrollView
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
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
        <PharmacySponserAd />

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

        <View style={{ marginTop: 24 }}>
          <SeeMore
            heading="General"
            onSeeMorePress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Pressable>
            <FlatList
              horizontal
              data={general_data}
              renderItem={renderProductTile}
              keyExtractor={(item) => item.key}
              showsHorizontalScrollIndicator={false}
              // scrollEnabled={isBottomSheetOpen === false}
            />
          </Pressable>
        </View>

        <View style={{ marginTop: 38 }}>
          <SeeMore
            heading="Blood"
            onSeeMorePress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <Pressable>
            <FlatList
              horizontal
              data={general_data}
              renderItem={renderProductTile}
              keyExtractor={(item) => item.key}
              showsHorizontalScrollIndicator={false}
              // scrollEnabled={isBottomSheetOpen === false}
            />
          </Pressable>
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
    marginRight: 10,
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
