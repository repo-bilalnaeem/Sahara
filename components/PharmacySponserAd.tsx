import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const PharmacySponserAd = () => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginBottom: 38,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#a0a0a0",
        height: 160,
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 16,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "gray", fontSize: 12 }}>Sponsored</Text>
        <View>
          <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 4 }}>
            Enjoy muft ka{"\n"}easyload!
          </Text>
          <Text style={{ fontSize: 12, color: "#999999", marginBottom: 8 }}>
            Easyload ab bilkul free
          </Text>
        </View>
      </View>
      <Image
        source={require("@/assets/images/easypaisa_ad.jpg")}
        style={{ height: 160, width: 160, resizeMode: "contain" }}
      />
    </View>
  );
};

export default PharmacySponserAd;
