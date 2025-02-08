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
            <Text style={styles.street}>77 7th Lane</Text>
            <Text style={styles.city}>Karachi</Text>
            <Text style={styles.note}>Note to rider: deliver at Plot 77/2</Text>
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
            <Text style={styles.street}>Dolce Vite Silkbank Limited</Text>
            <Text style={styles.city}>Karachi</Text>
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
  },
  note: {
    fontWeight: "300",
    fontSize: 14,
    marginBottom: 4,
  },
});

export default DeliveryAddress;
