import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

const data = [
  {
    key: "1",
    imageSource: require("@/assets/images/Needle-PNG.png"),
    text: "Neurologist",
    screen: "Neurologists",
  },
];

const RenderItems = () => {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderRadius: 16,
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: "#a0a0a0",
          elevation: 3,
          shadowColor: "#8d8d8d7a",
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
            Delivery
          </Text>
          <Text style={{ fontSize: 14, color: "#535353" }}>
            Deliver items you need
          </Text>
        </View>
        <Image
          source={require("@/assets/images/delivery.png")}
          style={{
            alignSelf: "flex-end",
            height: 80,
            resizeMode: "contain",
            marginRight: -20,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 16,
            paddingBottom: 4,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#a0a0a0",
            elevation: 3,
            shadowColor: "#8d8d8d7a",
            shadowOpacity: 0.8,
            shadowRadius: 3,
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
              Pick-up
            </Text>
            <Text style={{ fontSize: 14, color: "#535353" }}>
              Self-collect for 50% off
            </Text>
          </View>
          <Image
            source={require("@/assets/images/pickup.png")}
            style={{
              alignSelf: "flex-end",
              height: 80,
              width: 100,
              resizeMode: "contain",
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 16,
            // display: "flex",
            // flexDirection: "row",
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#a0a0a0",
            elevation: 3,
            shadowColor: "#8d8d8d7a",
            shadowOpacity: 0.8,
            shadowRadius: 3,
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 4 }}>
              saharago
            </Text>
            <Text style={{ fontSize: 14, color: "#535353" }}>
              Send parcels{"\n"}in a tap
            </Text>
          </View>
          <Image
            source={require("@/assets/images/saharago.png")}
            style={{
              alignSelf: "flex-end",
              height: 60,
              width: 70,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
    </View>
  );
};

const PharmacyFeatures = () => {
  return (
    <View style={{ backgroundColor: "#e9e8e8" }}>
      <RenderItems />
    </View>
  );
};

export default PharmacyFeatures;
