import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
// import { formatTitle } from "./ProductTile";
import { router } from "expo-router";
const isAndroid = Platform.OS === "android";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function formatTitle(name?: string, maxLength = 28) {
  if (!name) return "";
  return name.length > maxLength ? name.substring(0, maxLength) + " ..." : name;
}
export interface ProductItem {
    id: string;
    imageUrl: any;
    price: number;
    name: string;
  }

export interface RenderProductTileProps {
  item: ProductItem;
}

const ProductOnCategory = ({ item }: RenderProductTileProps) => {
  return (
    // <Link href={`/(mart)/${item.id}`} asChild key={item.id}>
    <Pressable onPress={() => router.push(`/(mart)/${item.id}`)}>
      <View>
        <View style={styles.productTile}>
          <Image
            source={{ uri: item.imageUrl }}
            style={[
              {
                resizeMode: "contain",
                width: "auto",
                height: 100,
                backgroundColor: "#fff",
              },
            ]}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={[
                {
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 4,
                  //   width: 100,
                },
              ]}
            >
              Rs. {item.price}
            </Text>
            <Text
              style={[
                {
                  width: wp("45%"),
                  fontSize: 15,
                  fontWeight: "400",
                  color: "gray",
                  marginTop: 4,
                },
                isAndroid ? { fontSize: 12 } : null,
              ]}
            >
              {formatTitle(item.name)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
    // </Link>
  );
};

const styles = StyleSheet.create({
  productTile: {
    width: wp("50%"),
    height: 200,
    // borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#a0a0a0",
    overflow: "hidden",
    justifyContent: "center",
  },
});

export default ProductOnCategory;
