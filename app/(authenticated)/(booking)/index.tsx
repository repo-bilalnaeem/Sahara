import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
  useColorScheme,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SERVICE_CHARGES = 200;
const SUBTOTAL = 1000;
const USD = 280;

const CustomModal = () => {
  const isDarkMode = useColorScheme() == "dark";
  const router = useRouter();

  const BOOKED_PROMPT = "Your Appointment is Booked!";

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

const Booking = () => {
  const { initPaymentSheet } = useStripe();
  const [createAppointmentIntent] = useCreateAppointmentIntentMutation();
  const [confirmAppointment] = useConfirmAppointmentMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const { date, timeSlot, id } = useLocalSearchParams();
  const amountInDollars = Number(
    ((SERVICE_CHARGES + SUBTOTAL) / USD).toFixed(2)
  );
  const amountInCents = Math.round(amountInDollars * 100);

  // console.log(timeSlot);

  const onCheckout = async () => {
    const response = await createAppointmentIntent({
      // id: "5db8c0f6-cdf9-4466-a91c-4d1da27255e7",
      id,
      data: {
        amount: amountInCents,
        currency: "usd",
        selectedSlot: timeSlot,
      },
    });

    // console.log("response:", JSON.stringify(response, null, 2));

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
    const { customerId, doctorId, slotId } = response.data.appointment;
    // console.log("paymentIntentId", paymentIntentId);
    // console.log("userId: ", customerId);
    // console.log("doctorId: ", doctorId);
    // console.log("slotId: ", slotId);

    const confirmResponse = await confirmAppointment({
      data: {
        paymentIntentId,
        doctorId,
        userId: customerId,
        slotId,
      },
    });

    // console.log("confirmResponse:", confirmResponse);

    if (confirmResponse.error) {
      Alert.alert("Failed to confirm the appointment.");
      return;
    }

    // Step 5: Navigate to a success screen or notify the user
    // Alert.alert("Payment successful! Your appointment is confirmed.");
    // router.replace("/(authenticated)/success");
    setModalVisible(true);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
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
                width: wp("30%"),
                height: hp("14%"),
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <Image
                source={require("@/assets/images/doctor.jpg")}
                style={{
                  width: wp("30%"),
                  height: hp("20%"),
                  resizeMode: "cover",
                }}
              />
            </View>
            <View style={{ marginTop: 24, flexGrow: 1, marginRight: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontWeight: "400", fontSize: 16, marginBottom: 6 }}
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
                    style={{
                      width: 18.46,
                      height: 18,
                      objectFit: "scale-down",
                    }}
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
                    fontSize: 14,
                    color: "gray",
                    fontWeight: "500",
                    flexGrow: 1,
                  }}
                >
                  Tuesday, 11 Feb 2025 | 15.00 PM
                </Text>
              </View>
              <Divider />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 15,
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
                  <Text style={styles.paymentPrice}>Rs. 1000</Text>
                  <Text style={styles.paymentPrice}>Rs. 200</Text>
                  <Text style={styles.paymentPrice}>-</Text>
                  <Text
                    style={[
                      styles.paymentPrice,
                      { color: "#000", fontWeight: "600" },
                    ]}
                  >
                    Rs. 1200
                  </Text>
                </View>
              </View>
              <Divider />
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 15,
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
                  Stripe Payment
                </Text>
              </View>
            </View>
          </View>
        </View>
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
              Rs. {SERVICE_CHARGES + SUBTOTAL}
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
              USD {((SERVICE_CHARGES + SUBTOTAL) / USD).toFixed(2)}
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
  paymentTags: {
    fontSize: 14,
    color: "gray",
    fontWeight: "500",
    marginRight: 16,
    flexGrow: 1,
    marginBottom: 8,
  },
  paymentPrice: {
    fontSize: 14,
    color: "gray",
    fontWeight: "500",
    marginRight: 16,
    flexGrow: 1,
    marginBottom: 8,
    alignSelf: "flex-end",
  },
  linearGradient: {
    borderRadius: 32,
    paddingHorizontal: 40,
    paddingVertical: 15,
  },

  total: {
    fontSize: 16,
    fontWeight: "600",
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
  container: {
    alignItems: "center",
  },
  gif: {
    width: 140,
    height: 140,
    marginTop: "75%",
    marginBottom: "35%",
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

  // container: { flex: 1, alignItems: "center", justifyContent: "center" },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalButton: {
    marginTop: 15,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default Booking;
