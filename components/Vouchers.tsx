import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Divider } from "react-native-paper";
import { Stack, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";

const Vouchers = () => {
  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              style={{ marginLeft: 16 }}
            >
              <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
            </TouchableOpacity>
          ),
        }}
      />
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
