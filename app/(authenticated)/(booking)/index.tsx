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
import { LinearGradient } from "expo-linear-gradient";
import {
  useCreatePaymentIntentMutation,
  useCreateAppointmentIntentMutation,
  useConfirmAppointmentMutation,
} from "@/slices/apiSlice";
import {
  PaymentSheet,
  presentPaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";

const Booking = () => {
  const { initPaymentSheet } = useStripe();
  const [createAppointmentIntent] = useCreateAppointmentIntentMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [creatAppointmentEntry] = useConfirmAppointmentMutation();

  const onCheckout = async () => {
    console.log("Pressed!");
    const response = await createAppointmentIntent({
      id: "d4cb8dc2-5d09-4bd6-8a99-6e4acf50d387",
      doctorId: "d6983584-7341-42cc-9e50-570f63019869",
      data: {
        amount: 50 * 1,
        currency: "usd",
        selectedSlot: "2025-01-14T15:00:00.000Z",
      },
    });

    console.log("response:", response);

    if (response.error) {
      console.log(response.error);
      Alert.alert("Something went wrong!");
      return;
    }

    // 2. Initialize the payment sheet
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Sahara Inc.",
      paymentIntentClientSecret: response.data.clientSecret,
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

    // 4. If payment ok -> create the order

    // Step 4: Confirm the appointment after successful payment
    const paymentIntentId = response.data.paymentIntentId;
    console.log("paymentIntentId", paymentIntentId);

    const confirmResponse = await creatAppointmentEntry({
      data: {
        paymentIntentId,
        doctorId: "d6983584-7341-42cc-9e50-570f63019869",
        userId: "d4cb8dc2-5d09-4bd6-8a99-6e4acf50d387",
        slotId: 31,
      },
    });

    console.log("confirmResponse:", confirmResponse);

    if (confirmResponse.error) {
      Alert.alert("Failed to confirm the appointment.");
      return;
    }

    // Step 5: Navigate to a success screen or notify the user
    // Alert.alert("Payment successful! Your appointment is confirmed.");
    // router.push("/success");
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
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                Book
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
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
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   Pressable,
//   Alert,
// } from "react-native";
// import React from "react";
// import { Link, router, useLocalSearchParams } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// import {
//   PaymentSheet,
//   presentPaymentSheet,
//   useStripe,
// } from "@stripe/stripe-react-native";
// import {
//   useCreatePaymentIntentMutation,
//   useCreateAppointmentIntentMutation,
// } from "@/slices/apiSlice";

// const Payment = () => {
//   const { top } = useSafeAreaInsets();
//   const { id } = useLocalSearchParams();
//   const { initPaymentSheet } = useStripe();
//   const [createPaymentIntent] = useCreatePaymentIntentMutation();
//   const [createAppointmentIntent] = useCreateAppointmentIntentMutation();

//   const onCheckout = async () => {
//     // 1. Create a payment intent
//     console.log("Pressed!");
//     const response = await createPaymentIntent({
//       amount: 100 * 100 * 1,
//       currency: "usd",
//     });

//     console.log("response:", response);

//     if (response.error) {
//       console.log(response.error);
//       Alert.alert("Something went wrong!");
//       return;
//     }

//     // 2. Initialize the payment sheet
//     const initResponse = await initPaymentSheet({
//       merchantDisplayName: "Sadaa Air",
//       paymentIntentClientSecret: response.data.clientSecret,
//     });

//     console.log("initResponse", initResponse);

//     if (initResponse.error) {
//       console.log(initResponse.error.message);
//       Alert.alert("Something wnet wring!");
//       return;
//     }

//     // 3. Present the Payment Sheet from Stripe
//     const paymentResponse = await presentPaymentSheet();
//     if (paymentResponse.error) {
//       Alert.alert(
//         `Error code: ${paymentResponse.error.code}`,
//         paymentResponse.error.message
//       );
//       return;
//     }

//     // 4. If payment ok -> create the order
//     PaymentSheet;
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       <View style={[styles.screen, { paddingTop: top }]}>
//         <Pressable style={styles.button} onPress={() => onCheckout()}>
//           <Text style={styles.button_text}>Confirm</Text>
//         </Pressable>

//         <Pressable
//           style={styles.button_outline}
//           onPressIn={() => router.replace("/")}
//         >
//           <Text style={[styles.button_text, { color: "#000" }]}>Cancel</Text>
//         </Pressable>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     marginHorizontal: 16,
//   },

//   button: {
//     backgroundColor: "#255257",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 16,
//   },

//   button_outline: {
//     borderWidth: StyleSheet.hairlineWidth,
//     backgroundColor: "#fff",
//     borderColor: "#255257",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 16,
//   },

//   button_text: {
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 16,
//     fontStyle: "normal",
//     fontWeight: "500",
//     lineHeight: 16,
//   },

//   amount: {
//     color: "#191919",
//     textAlign: "right",
//     fontSize: 24,
//     fontWeight: "600",
//     lineHeight: 24,
//   },

//   total: {
//     color: "#555",
//     fontSize: 16,
//     fontWeight: "300",
//     lineHeight: 24,
//   },

//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default Payment;
