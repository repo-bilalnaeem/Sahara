import { Ionicons } from "@expo/vector-icons";
import { router, Href, Link } from "expo-router";
import React from "react";
import {
  Pressable,
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Text,
  Platform,
} from "react-native";
const isAndroid = Platform.OS === "android";

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

export function formatTitle(title: string, maxLength = 20) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + " ...";
  }
  return title;
}
const ProductTile = ({ item, index }: RenderProductTileProps) => {
  return (
    <Link href={`/(mart)/${item.key}`} asChild>
      <Pressable>
        <View style={[index === 0 ? { marginLeft: 16 } : null]}>
          <View style={styles.productTile}>
            <Image
              source={item.imageSource}
              style={[{ resizeMode: "contain", width: "auto", height: 100 }]}
            />
            {/* <TouchableWithoutFeedback>
              <View style={styles.add_button}>
                <Ionicons name="add" size={20} color={"#494848"} />
              </View>
            </TouchableWithoutFeedback> */}
          </View>
          <Text
            style={[
              {
                fontSize: 14,
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
            {formatTitle(item.title)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  productTile: {
    width: 100,
    // marginRight: 10,
    // justifyContent: "center",
    // alignItems: "center",
    height: 100,
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

export default ProductTile;
