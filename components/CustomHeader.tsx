import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export interface CustomHeaderProps {
  onPress: () => void;
  heading: string;
}

export const CustomHeader = ({ onPress, heading }: CustomHeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 52,
        paddingLeft: 18,
        gap: 18,
        alignItems: "center",
        backgroundColor: "#fff",
        paddingBottom: 16,
      }}
    >
      <TouchableOpacity onPress={onPress} style={styles.closeButton}>
        <Ionicons name="close" size={24} color={"#000000"} />
      </TouchableOpacity>
      <Text style={{ fontWeight: "600", fontSize: 16 }}>{heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    borderRadius: 24,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
});
