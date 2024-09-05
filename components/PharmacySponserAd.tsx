import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import React from "react";

interface PharmacySponserAdProps {
  imageSource: ImageSourcePropType;
  height: number;
  width: number;
  title: string;
  description: string;
  sponsoredText?: string; // Optional prop
}

const PharmacySponserAd: React.FC<PharmacySponserAdProps> = ({
  imageSource,
  height,
  width,
  title,
  description,
  sponsoredText = "Sponsored", // Default value for sponsored text
}) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginBottom: 38,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#a0a0a0",
        height: height,
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-between",
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 16,
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow:1
        }}
      >
        <Text style={{ color: "gray", fontSize: 12 }}>{sponsoredText}</Text>
        <View>
          <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 12 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 12, color: "#999999", marginBottom: 8 }}>
            {description}
          </Text>
        </View>
      </View>
      <Image
        source={imageSource}
        style={{ height: height, width: width, resizeMode: "cover" }}
      />
    </View>
  );
};

export default PharmacySponserAd;
