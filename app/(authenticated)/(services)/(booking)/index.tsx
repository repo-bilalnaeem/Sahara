import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { BlurView } from "expo-blur";
import BottomSheet from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useCreatePaymentIntentMutation } from "@/slices/apiSlice";
import { PaymentSheet, presentPaymentSheet, useStripe } from "@stripe/stripe-react-native";
import { Href, router } from "expo-router";

const Booking = () => {
  const { initPaymentSheet } = useStripe();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const onCheckout = async () => {
    // 1. create a payment intent
    const response = await createPaymentIntent({
      amount: 100,
      currency: "usd",
    });

    if (response.error) {
      Alert.alert("Something went wrong!");
      return;
    }

    // 2. Initialize the payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Sahara.dev",
      paymentIntentClientSecret: response.data.clientSecret,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("Something went wrong!");
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
    // 4.  If payment ok -> create the order
    PaymentSheet
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* <Divider /> */}
      <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
        <View
          style={{
            paddingHorizontal: 6,
            paddingVertical: 6,
            borderRadius: 16,
            borderColor: "#b6b6b6",
            borderWidth: StyleSheet.hairlineWidth,
            flexDirection: "row",
            gap: 16,
          }}
        >
          <View
            style={{
              width: 130,
              height: 130,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("@/assets/images/doctor.jpg")}
              style={{ width: 130, height: 160, resizeMode: "cover" }}
            />
          </View>
          <View style={{ marginTop: 16, flexGrow: 1, marginRight: 16 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontWeight: "400", fontSize: 18, marginBottom: 6 }}
              >
                Dr. Mathew Lewis
              </Text>
              <Image
                source={require("@/assets/images/Professional.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            </View>
            <Text style={{ fontSize: 13, fontWeight: "300" }}>
              Heart Speacialist
            </Text>
            <View>
              <BlurView
                intensity={100}
                tint={"systemMaterialDark"}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.05)",
                }}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 7.5,
                  alignItems: "center",
                  // justifyContent: "center",
                  marginTop: 16,
                }}
              >
                <Image
                  source={require("@/assets/images/StarGold.png")}
                  style={{ width: 18.46, height: 18, objectFit: "scale-down" }}
                />
                <Text
                  style={{
                    // color: "#FFF",
                    fontSize: 14,
                    fontStyle: "normal",
                    fontWeight: "500",
                  }}
                >
                  4.9
                </Text>
              </View>
            </View>
            <View>
              <Image />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 32 }}>
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              Date
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                marginHorizontal: 10,
                gap: 28,
              }}
            >
              <Image
                source={require("@/assets/images/calendar.png")}
                style={{
                  width: 26,
                  height: 26,
                  resizeMode: "contain",
                  marginLeft: 2,
                }}
              />

              <Text
                style={{
                  fontSize: 15,
                  color: "gray",
                  fontWeight: "500",
                  marginRight: 16,
                  flexGrow: 1,
                }}
              >
                Wednesday, 23 Jun 2024 | 10.00 AM
              </Text>
            </View>
            <Divider />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              Reason
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                marginHorizontal: 10,
                gap: 28,
              }}
            >
              <Image
                source={require("@/assets/images/edit.png")}
                style={{
                  width: 26,
                  height: 26,
                  resizeMode: "contain",
                  marginLeft: 2,
                }}
              />

              <Text
                style={{
                  fontSize: 15,
                  color: "gray",
                  fontWeight: "500",
                  marginRight: 16,
                  flexGrow: 1,
                }}
              >
                Chest Pain
              </Text>
            </View>
            <Divider />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              Payment information
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                marginHorizontal: 10,
                gap: 28,
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.paymentTags}>Counselling</Text>
                <Text style={styles.paymentTags}>Adminstrative fee</Text>
                <Text style={styles.paymentTags}>Additional discount</Text>
                <Text
                  style={[
                    styles.paymentTags,
                    { color: "#000", fontWeight: "600" },
                  ]}
                >
                  General
                </Text>
              </View>
              <View style={{ width: "30%", justifyContent: "flex-end" }}>
                <Text style={styles.paymentPrice}>$60.00</Text>
                <Text style={styles.paymentPrice}>$01.00</Text>
                <Text style={styles.paymentPrice}>-</Text>
                <Text
                  style={[
                    styles.paymentPrice,
                    { color: "#000", fontWeight: "600" },
                  ]}
                >
                  $61.00
                </Text>
              </View>
            </View>
            <Divider />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 16,
              }}
            >
              Method of payment
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                marginHorizontal: 10,
                gap: 28,
                borderWidth: StyleSheet.hairlineWidth,
                paddingHorizontal: 12,
                paddingVertical: 14,
                borderRadius: 12,
                borderColor: "gray",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "gray",
                  fontWeight: "500",
                  marginRight: 16,
                  flexGrow: 1,
                }}
              >
                Visa
              </Text>
            </View>
          </View>
        </View>
      </View>
      <BottomSheet
        snapPoints={[95]}
        handleIndicatorStyle={{
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            marginHorizontal: 18,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 15, marginBottom: 4, fontWeight: "300" }}>
              Total
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 8 }}>
              $ 61.00
            </Text>
          </View>
          <View>
            <Pressable onPress={() => onCheckout()}>
              <LinearGradient
                colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.0527, 0.9575]}
                style={styles.linearGradient}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
                >
                  Book
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentTags: {
    fontSize: 15,
    color: "gray",
    fontWeight: "500",
    marginRight: 16,
    flexGrow: 1,
    marginBottom: 8,
  },
  paymentPrice: {
    fontSize: 15,
    color: "gray",
    fontWeight: "500",
    marginRight: 16,
    flexGrow: 1,
    marginBottom: 8,
    alignSelf: "flex-end",
  },
  linearGradient: {
    // height: 210,
    marginLeft: 12,
    borderRadius: 32,
    // marginBottom: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    // paddingTop: 20,
    // paddingBottom: 17,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default Booking;
