import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Href, useRouter } from "expo-router";
import { formatTitle, RenderProductTileProps } from "../pharmacy";
import { Ionicons } from "@expo/vector-icons";
import { data } from "@/assets/data/labPageData";

const index = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >

    </View>
  );
};

const styles = StyleSheet.create({
  testName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#27487e",
  },

  labTestTile: {
    borderRadius: 14,
    backgroundColor: "#FFF",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#a0a0a0",
    position: "relative",
    overflow: "hidden",
    marginBottom: 8,
  },

  productTile: {
    width: 120,
    // marginRight: 16,
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

export default index;
