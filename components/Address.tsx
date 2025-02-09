import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-paper";
import DeliveryAddress from "./DeliveryAddress";
import { Stack, useNavigation } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import Colors from "@/constants/Colors";

const Addresses = () => {
  const navigation = useNavigation();

  const snapPoints = useMemo(() => [120], []);
  return (
    <View style={{ flex: 1 }}>
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
      <DeliveryAddress />
      <BottomSheet
        snapPoints={snapPoints}
        index={0}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
      >
        <View>
          <Pressable>
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
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                Add New Address
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    // height: 210,
    marginHorizontal: 12,
    borderRadius: 16,
    marginBottom: 30,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 17,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default Addresses;
