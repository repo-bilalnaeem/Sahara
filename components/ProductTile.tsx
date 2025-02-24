import { Ionicons } from "@expo/vector-icons";
import { router, Href, Link } from "expo-router";
import React from "react";
import {
  Pressable,
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
const isAndroid = Platform.OS === "android";

interface ProductItem {
  id: string;
  imageUrl: any;
  price: number;
  name: string;
}

export interface RenderProductTileProps {
  item: ProductItem;
  index: number;
}

export function formatTitle(name?: string, maxLength = 20) {
  if (!name) return "";
  return name.length > maxLength ? name.substring(0, maxLength) + " ..." : name;
}

export const ProductTile = ({ item, index }: RenderProductTileProps) => {
  // console.log(item.id);
  return (
    <Link href={`/(mart)/${item.id}`} asChild key={item.id}>
      <Pressable>
        <View style={[index === 0 ? { marginLeft: 16 } : null]}>
          <View style={styles.productTile}>
            <Image
              source={{ uri: item.imageUrl }}
              style={[
                {
                  resizeMode: "contain",
                  width: "auto",
                  height: 80,
                  backgroundColor: "#fff",
                },
              ]}
            />
          </View>
          <Text
            style={[
              {
                marginTop: 6,
                fontSize: 13,
                fontWeight: "500",
                marginBottom: 4,
                width: 100,
              },
            ]}
          >
            Rs. {item.price}
          </Text>
          <Text
            style={[
              { width: 110, fontSize: 14, fontWeight: "400", color: "gray" },
              isAndroid ? { fontSize: 12 } : null,
            ]}
          >
            {formatTitle(item.name)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  productTile: {
    width: 110,
    height: 100,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#a0a0a0",
    overflow: "hidden",
    marginBottom: 8,
    justifyContent: "center",
  },

  add_button: {
    backgroundColor: "#fff",
    borderRadius: 200,
    width: 24,
    height: 24,
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

export default ProductTile;
