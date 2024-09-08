import { View, Text, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Divider } from "react-native-paper";

const Vouchers = () => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar style="dark" />
      <Divider />
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image
          source={require("@/assets/images/voucher-PNG.png")}
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
            // opacity: 0.7,
            marginBottom: 40,
          }}
        />
        <Text
          style={{
            marginBottom: 20,
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          You don't have any{"\n"}vouchers yet.
        </Text>
        <Text
          style={{
            marginBottom: 20,
            fontSize: 15,
            fontWeight: "400",
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          It seems you have no vouchers yet.
        </Text>
      </View>
    </View>
  );
};

export default Vouchers;
