import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCart } from "@/store/cartStore";
import { popular_data } from "@/assets/data/PharmacyPageData";
import ProductTile from "@/components/ProductTile";
import SeeMore from "@/components/SeeMore";

const Cart = () => {
  const router = useRouter();
  const items = useCart((state) => state.items);
  const DELIVERY_FEE = 200;

  // Log all items and their quantities
  items.forEach((item: { product: { title: any }; quantity: any }) => {
    console.log(`Product: ${item.product.title}, Quantity: ${item.quantity}`);
  });

  const subtotal = items.reduce(
    (
      accumulator: number,
      item: { product: { price: number }; quantity: number }
    ) => {
      return accumulator + item.product.price * item.quantity;
    },
    0
  );

  if (items.length === 0) {
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
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
          You haven't added anything to your cart!
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
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 32,
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
        <View
          style={{
            paddingHorizontal: 12,
          }}
        >
          <View style={styles.delivery_card}>
            <Image
              source={require("@/assets/images/delivery_bike.png")}
              style={styles.bike_img}
            />
            <View
              style={{
                alignSelf: "center",
                marginRight: "10%",
              }}
            >
              <Text style={styles.est}>Est. Delivery Time</Text>
              <Text style={styles.time}>Standard (5-20 mins)</Text>
            </View>
          </View>
          <View style={{ paddingTop: 24 }}>
            <FlatList
              data={items}
              keyExtractor={(item, index) => `${item.product.key}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View>
                    <Image
                      source={require("@/assets/images/medicine_images/img2.jpeg")}
                      style={styles.thumbnail}
                    />
                  </View>
                  <View style={{ flexGrow: 1, marginRight: 30 }}>
                    <Text style={styles.title}>{item.product.title}</Text>
                    <View style={styles.quantity_price}>
                      <View style={styles.quantity}>
                        <Pressable
                          onPress={() =>
                            useCart
                              .getState()
                              .decreaseQuantity(item.product.key)
                          }
                        >
                          <EvilIcons name="trash" size={24} color="black" />
                        </Pressable>
                        <Text style={styles.quantity_number}>
                          {item.quantity}
                        </Text>
                        <Pressable
                          onPress={() =>
                            useCart
                              .getState()
                              .increaseQuantity(item.product.key)
                          }
                        >
                          <AntDesign name="plus" size={20} color="black" />
                        </Pressable>
                      </View>
                      <Text>Rs. {item.product.price}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
            <Pressable>
              <View style={styles.more}>
                <AntDesign name="plus" size={20} color="black" />

                <Text>Add more items</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View>
          <SeeMore heading="Popular products" />
        </View>
        <Pressable>
          <FlatList
            horizontal
            data={popular_data}
            renderItem={ProductTile}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
          />
        </Pressable>
        <View style={styles.bill}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.label}>Rs. {subtotal}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Standard delivery</Text>
            <Text style={styles.label}>Rs. {DELIVERY_FEE}</Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingHorizontal: 24,
          width: "100%",
          height: 160,
          backgroundColor: "#ffffff",
          paddingTop: 24,
          zIndex: 2,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,

          // Shadow for iOS
          shadowColor: "#000000ff",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.16,
          shadowRadius: 12,

          // Shadow for Android
          elevation: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.total}>
            Total{" "}
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
              }}
            >
              (incl. fees and tax)
            </Text>
          </Text>
          <Text style={styles.total}>Rs. {DELIVERY_FEE + subtotal}</Text>
        </View>
        <TouchableWithoutFeedback style={{ width: "100%", flexGrow: 1 }}>
          <LinearGradient
            colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.0527, 0.9575]}
            style={[styles.linearGradient, { width: "100%" }]}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              Proceed to Payment
            </Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
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

  thumbnail: {
    width: 60,
    height: 50,
    objectFit: "contain",
  },

  title: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 6,
  },

  card: {
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginLeft: 8,
  },

  delivery_card: {
    padding: 16,
    display: "flex",
    borderRadius: 16,
    borderColor: "#a0a0a0",
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",

    // Shadow for iOS
    shadowColor: "#00000092",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,

    // Shadow for Android
    elevation: 5,
  },

  est: {
    fontSize: 15,
    fontWeight: "300",
  },

  time: {
    fontSize: 18,
    fontWeight: "500",
  },

  bike_img: {
    width: 80,
    height: 85,
    objectFit: "contain",
  },

  quantity: {
    borderRadius: 16,
    borderColor: "#a0a0a0",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#fff",
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  quantity_number: {
    fontSize: 16,
  },

  quantity_price: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  more: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#a0a0a0",
    marginTop: 18,
    marginBottom: 36,
    gap: 18,
  },

  bill: {
    borderColor: "#a0a0a0",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginTop: 36,
    paddingTop: 24,
  },

  label: {
    fontSize: 15,
    color: "#3f3f3f",
    marginBottom: 10,
  },

  total: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
});

export default Cart;
