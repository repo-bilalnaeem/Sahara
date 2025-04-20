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
  Alert,
  Modal,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { CartItem, useCart } from "@/store/cartStore";
import ProductTile from "@/components/ProductTile";
import SeeMore from "@/components/SeeMore";
import {
  useConfirmProductOrderMutation,
  useCreateProductOrderIntentMutation,
  // useGetGeneralProductsQuery,
  useGetProductsByCategoryTagsQuery,
} from "@/slices/apiSlice";
import { presentPaymentSheet, useStripe } from "@stripe/stripe-react-native";

const USD = 280;

const CustomModal = () => {
  const isDarkMode = useColorScheme() == "dark";
  const router = useRouter();

  const BOOKED_PROMPT = "Your Products have been Ordered!";

  return (
    <View style={[isDarkMode ? styles.modalDark : styles.modalLight]}>
      <View style={styles.modal_inner}>
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/accept.gif")}
            style={styles.gif}
          />
        </View>
        <Text style={isDarkMode ? styles.successLight : styles.successDark}>
          Success
        </Text>
        <Text style={isDarkMode ? styles.modalTextLight : styles.modalTextDark}>
          {BOOKED_PROMPT}
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.replace("/(authenticated)/(drawer)/(tabs)")}
        >
          <LinearGradient
            colors={["#1661E0", "#478EEF"]}
            style={styles.linearGradientModal}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.LightText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Cart = () => {
  const { initPaymentSheet } = useStripe();
  const [createProductIntent] = useCreateProductOrderIntentMutation();
  const [confirmProduct] = useConfirmProductOrderMutation();
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const items = useCart((state) => state.items);
  const DELIVERY_FEE = 200;
  const [productList, setProductList] = useState([]);

  // Log all items and their quantities
  // items.forEach((item: CartItem) => {
  //   console.log(
  //     `Product: ${item.product.name}, Quantity: ${item.quantity}, Product Id: ${item.product.id}`
  //   );
  // });

  // console.log(items);

  const subtotal = Number(
    items
      .reduce(
        (
          accumulator: number,
          item: { product: { price: number }; quantity: number }
        ) => {
          return accumulator + item.product.price * item.quantity;
        },
        0
      )
      .toFixed(2)
  );

  const { data: products, isLoading: loading_products } =
    useGetProductsByCategoryTagsQuery({
      category: "GENERAL",
      tag: "POPULAR_PRODUCT",
      limit: 8,
    });

  // console.log(JSON.stringify(productList, null, 2));

  const onCheckout = async () => {
    try {
      const productData = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      console.log(productData);

      const response = await createProductIntent({
        data: {
          products: productData,
        },
      }).unwrap();
      // console.log("Intent created:", JSON.stringify(response, null, 2));

      console.log(JSON.stringify(response, null, 2));

      if (response.error) {
        console.log(response.error);
        // Alert.alert("Something went wrong!");
        return;
      }

      // 2. Initialize the payment sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: "Sahara Inc.",
        paymentIntentClientSecret: response.clientSecret,
      });

      if (initResponse.error) {
        console.log(initResponse.error.message);
        Alert.alert("Something wnet wrong!");
        return;
      }

      // 3. Present the Payment Sheet from Stripe
      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        Alert.alert(
          `Error code: ${paymentResponse.error.code}`,
          paymentResponse.error.message
        );
        return;
      }

      const { paymentIntentId, orderId, cart } = response;
      console.log(paymentIntentId, orderId, cart);

      cart.forEach((item: any) => {
        console.log(
          `Product ID: ${item.productId}, Quantity: ${item.quantity}`
        );
      });

      // 4. If payment ok -> create the order
      const confirmRes = await confirmProduct({
        data: {
          paymentIntentId,
          orderId,
          cart,
        },
      }).unwrap();

      console.log(response);

      if (confirmRes.error) {
        Alert.alert("Failed to confirm the appointment.");
        return;
      }

      // ✅ Clear the cart
      setModalVisible(true);
      useCart.getState().clearCart();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (products && products?.products) {
      setProductList(products.products);
    }
  }, [products]);

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
      {/* <FlatList contentContainerStyle={{ paddingBottom: 250 }} ListHeaderComponent={
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
      } ListFooterComponent={
          <View style={{ paddingTop: 24 }}>
          <FlatList
            data={items}
            keyExtractor={(item, index) => `${item.product.id}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  source={{ uri: item?.product?.imageUrl }}
                  style={styles.thumbnail}
                />

                <View style={{ flexShrink: 1 }}>
                  <Text style={styles.title}>{item.product.name}</Text>
                  <View style={styles.quantity_price}>
                    <View style={styles.quantity}>
                      <Pressable
                        onPress={() =>
                          useCart.getState().decreaseQuantity(item.product.id)
                        }
                      >
                        <EvilIcons name="trash" size={24} color="black" />
                      </Pressable>
                      <Text style={styles.quantity_number}>
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() =>
                          useCart.getState().increaseQuantity(item.product.id)
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
          data={productList}
          renderItem={ProductTile}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingRight: 16,
          }}
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
          <Text style={styles.label}>Rs. {Number(subtotal)}</Text>
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
      }>
  
        
      </FlatList> */}

      <FlatList
        data={[]}
        renderItem={null}
        contentContainerStyle={{ paddingBottom: 250, paddingHorizontal: 12 }}
        ListHeaderComponent={
          <>
            <View style={styles.delivery_card}>
              <Image
                source={require("@/assets/images/delivery_bike.png")}
                style={styles.bike_img}
              />
              <View style={{ alignSelf: "center", marginRight: "10%" }}>
                <Text style={styles.est}>Est. Delivery Time</Text>
                <Text style={styles.time}>Standard (5-20 mins)</Text>
              </View>
            </View>

            <View style={{ paddingTop: 24 }}>
              {items.map((item, index) => (
                <View key={`${item.product.id}-${index}`} style={styles.card}>
                  <Image
                    source={{ uri: item?.product?.imageUrl }}
                    style={styles.thumbnail}
                  />

                  <View style={{ flexShrink: 1 }}>
                    <Text style={styles.title}>{item.product.name}</Text>
                    <View style={styles.quantity_price}>
                      <View style={styles.quantity}>
                        <Pressable
                          onPress={() =>
                            useCart.getState().decreaseQuantity(item.product.id)
                          }
                        >
                          <EvilIcons name="trash" size={24} color="black" />
                        </Pressable>
                        <Text style={styles.quantity_number}>
                          {item.quantity}
                        </Text>
                        <Pressable
                          onPress={() =>
                            useCart.getState().increaseQuantity(item.product.id)
                          }
                        >
                          <AntDesign name="plus" size={20} color="black" />
                        </Pressable>
                      </View>
                      <Text>Rs. {item.product.price}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <Pressable>
                <View style={styles.more}>
                  <AntDesign name="plus" size={20} color="black" />
                  <Text>Add more items</Text>
                </View>
              </Pressable>
            </View>

            <SeeMore heading="Popular products" />

            <Pressable>
              <FlatList
                horizontal
                data={productList}
                renderItem={ProductTile}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 10,
                  paddingRight: 16,
                }}
              />
            </Pressable>

            <View style={styles.bill}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}>Subtotal</Text>
                <Text style={styles.label}>Rs. {Number(subtotal)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}>Standard delivery</Text>
                <Text style={styles.label}>Rs. {DELIVERY_FEE}</Text>
              </View>
            </View>
          </>
        }
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingHorizontal: 24,
          width: "100%",
          height: 185,
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
          <Text style={[styles.total, { marginBottom: 0 }]}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "300",
              }}
            >
              (incl. fees and tax)
            </Text>
          </Text>
          <Text style={[styles.total, { fontSize: 13, marginBottom: 16 }]}>
            Rs. {DELIVERY_FEE + subtotal}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.total}>
            Payable due{" "}
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
              }}
            >
              (approx)
            </Text>
          </Text>
          <Text style={styles.total}>
            USD {((DELIVERY_FEE + subtotal) / USD).toFixed(2)}
          </Text>
        </View>
        <TouchableWithoutFeedback
          style={{ width: "100%", flexGrow: 1 }}
          onPress={() => onCheckout()}
        >
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

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        // onRequestClose={() => router.replace('/(authenticated)/(drawer)/(tabs)')}
        presentationStyle="fullScreen"
      >
        <CustomModal />
      </Modal>
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
    marginBottom: 10,
    lineHeight: 24,
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
    flexGrow: 1,
    // flexBasis:1
    width: "100%",
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

  modalLight: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 13,
  },
  modalDark: {
    width: "100%",
    flex: 1,
    backgroundColor: "#1E1F22",
    paddingHorizontal: 13,
  },
  modal_inner: {
    flex: 0.9,
  },

  successDark: {
    color: "#4878C9",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 32,
  },
  successLight: {
    color: "#F5F5F5",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 32,
  },
  modalTextDark: {
    color: "#7B6161",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 28 /* 24px */,
    letterSpacing: 0.5,
    marginBottom: "15%",
    marginHorizontal: 18,
  },
  modalTextLight: {
    color: "#C9C9C9",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 28 /* 24px */,
    letterSpacing: 0.5,
    marginBottom: "15%",
    marginHorizontal: 18,
  },

  linearGradientModal: {
    // flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 40,
  },

  LightText: {
    color: "#fff",
    fontSize: 14,
    fontStyle: "normal",
    // marginLeft: 10,
  },

  container: {
    alignItems: "center",
  },
  gif: {
    width: 140,
    height: 140,
    marginTop: "75%",
    marginBottom: "35%",
  },
});

export default Cart;
