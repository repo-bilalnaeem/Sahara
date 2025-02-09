import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { Divider } from "react-native-paper";

const DeliveryAddress = () => {
  return (
    <View>
      <View>
        <View style={styles.addressContainer}>
          <Feather name="map-pin" size={20} color="black" />
          <View style={{ flexGrow: 1, marginLeft: 12 }}>
            <Text style={styles.street}>123 Greenway Street</Text>
            <Text style={styles.city}>
              Springfield, IL 62704{"\n"}United States
            </Text>
            <Text style={styles.note}>Note to rider: deliver on door step</Text>
          </View>
          <Pressable>
            <Feather name="edit" size={20} color="#666666" />
          </Pressable>
        </View>
        <Divider />
      </View>
      <View>
        <View style={styles.addressContainer}>
          <Feather name="map-pin" size={20} color="black" />
          <View style={{ flexGrow: 1, marginLeft: 12 }}>
            <Text style={styles.street}>456 Oceanview Avenue, Apt 12B</Text>
            <Text style={styles.city}>
              Los Angeles, CA 90012{"\n"}United States
            </Text>
            <Text style={styles.note}>Note to rider: none</Text>
          </View>
          <Pressable>
            <Feather name="edit" size={20} color="#666666" />
          </Pressable>
        </View>
        <Divider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 10,
    paddingLeft: 20,
  },
  street: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
  },

  city: {
    fontWeight: "300",
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 24,
  },
  note: {
    fontWeight: "300",
    fontSize: 14,
    marginBottom: 4,
  },
});

export default DeliveryAddress;
