import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Cart = () => {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/add_to_cart.png")}
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
          fontSize: 15,
          fontWeight: "400",
          textAlign: "center",
          lineHeight: 24,
        }}
      >
        You haven't added anything to you cart!
      </Text>
      <Pressable onPress={() => router.back()}>
        <LinearGradient
          colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.0527, 0.9575]}
          style={styles.linearGradient}
        >
          <Text style={styles.browse}>Browse</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: 300,
    borderRadius: 20,
    paddingVertical: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    // flexShrink: 1,
    // width: "80%",
  },

  browse: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    // textAlign: "center",
  },
});

export default Cart;
