import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;
const PRICE = 47.5;
const Product = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  // Log the product ID
  useEffect(() => {
    console.log("Product ID:", id);
  }, [id]);

  const { top } = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <TouchableOpacity
        onPress={router.back}
        style={[styles.closeButton, { marginTop: 52, marginLeft: 18 }]}
      >
        <Ionicons name="close" size={24} color={"#636363"} />
      </TouchableOpacity>
      {/* <Text>{id}</Text> */}

      <View style={[styles.profileImage, { paddingTop: top }]}>
        <Image
          source={require("@/assets/images/medicine_images/img7.jpeg")}
          style={[styles.image, { paddingTop: top }]}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 12,
          // marginTop: 24,
          borderBottomWidth: StyleSheet.hairlineWidth,
          // borderTopWidth: StyleSheet.hairlineWidth,
          paddingTop: 48,
          borderColor: "gray",
        }}
      >
        <Text style={styles.product_name}>Cerelac 3 Fruits & Wheat 350g</Text>
        <Text style={styles.product_price}>Rs. {PRICE.toFixed(2)}</Text>
        <TouchableWithoutFeedback>
          <LinearGradient
            colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.0527, 0.9575]}
            style={styles.linearGradient}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              Add to cart
            </Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 20,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: "gray",

        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 16 }}>
          If this product is not available
        </Text>

        <Pressable style={{ overflow: "hidden" }}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderColor: "#8b8b8b",
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "500", flex: 1 }}>
              Remove it from my order
            </Text>
            <AntDesign name="right" size={22} color="#394A65" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    borderRadius: 24,
    width: 36,
    height: 36,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
    // marginVertical: 22,
    // borderColor: "#000",
    // borderWidth: StyleSheet.hairlineWidth,
    // elevation: 3,
    // shadowRadius: 3,
    // shadowOffset: { width: 0, height: 1 },
    // shadowColor: "#b9b9b9",
    // shadowOpacity:0.5
  },

  image: {
    // width: 150,
    height: 200,
    objectFit: "contain",
  },

  profileImage: {
    height: IMG_HEIGHT,
    width,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  product_name: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 8,
    marginHorizontal: 8,
  },

  product_price: {
    fontSize: 15,
    fontWeight: "400",
    marginHorizontal: 8,
  },

  linearGradient: {
    // height: 210,
    // marginHorizontal: 12,
    marginTop: 24,
    borderRadius: 16,
    marginBottom: 24,
    paddingHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 18,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
export default Product;
