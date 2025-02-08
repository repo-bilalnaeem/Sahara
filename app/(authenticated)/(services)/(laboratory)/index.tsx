import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
  } from "react-native";
  import React from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import FontAwesome from "@expo/vector-icons/FontAwesome";
  import Entypo from "@expo/vector-icons/Entypo";
  import Fontisto from "@expo/vector-icons/Fontisto";
  import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
  import { router } from "expo-router";
  import { StatusBar } from "expo-status-bar";
  import { Divider } from "react-native-paper";
  import { commonTests } from "@/assets/data/LaboratoryPageData";
  
  
  const Laboratory = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar style="light" />
        <ScrollView
          contentContainerStyle={{ paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* style={{ backgroundColor: "#e9e8e8" }} */}
          <View
            style={{
              paddingTop: 12,
              backgroundColor: "#e9e8e8",
              paddingBottom: 12,
            }}
          >
            <LinearGradient
              colors={["rgba(0, 37, 58, 0.76)", "#7cbebeff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0.0527, 0.9575]}
              style={styles.linearGradient}
            >
              <Image
                source={require("@/assets/images/family_img.png")}
                style={styles.ad_img}
              />
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  color: "#fff",
                  lineHeight: 32,
                }}
              >
                Get your full body{"\n"}checkup
              </Text>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                <FontAwesome name="check-square-o" size={18} color="#a6ff83" />
                <Text
                  style={{
                    color: "#dfdfdf",
                    fontSize: 13,
                  }}
                >
                  Full body checkup{"\n"}with cancer
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                <Entypo
                  name="lab-flask"
                  size={18}
                  color="#a6ff83"
                  style={{ marginLeft: -2 }}
                />
                <Text
                  style={{
                    color: "#dfdfdf",
                    fontSize: 13,
                  }}
                >
                  Free home sample{"\n"}pickup
                </Text>
              </View>
            </LinearGradient>
  
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 12,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FEC091ff",
                  borderRadius: 20,
                  width: "49%",
                  paddingHorizontal: 14,
                  paddingVertical: 16,
                  height: 140,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#2e2e2e",
                    flexGrow: 1,
                  }}
                >
                  X-rays{"\n"}Scans & MRI
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable>
                    <FontAwesome5
                      name="arrow-circle-right"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                  <Fontisto name="stethoscope" size={24} color="#2e2e2e" />
                </View>
              </View>
              <Pressable
                onPress={() => router.push("/(laboratory)")}
                style={{
                  borderRadius: 20,
                  paddingHorizontal: 14,
                  paddingVertical: 16,
                  // backgroundColor: "#F6F7F8ff",
                  backgroundColor: "#CFB7B0ff",
                  height: 140,
                  width: "49%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#2e2e2e",
                    flexGrow: 1,
                  }}
                >
                  Book{"\n"}Lab Tests
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable>
                    <FontAwesome5
                      name="arrow-circle-right"
                      size={24}
                      color="black"
                    />
                  </Pressable>
                  <Entypo name="lab-flask" size={24} color="#2e2e2e" />
                </View>
              </Pressable>
            </View>
          </View>
  
          <View style={{ marginTop: 36 }}>
            <Text style={styles.featuredHeading}>
              Most Common{"\n"}Blood Test
            </Text>
            {commonTests.map((item, index) => (
              <View
                key={index}
                style={{ paddingHorizontal: 12, paddingVertical: 10 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingBottom: 16,
                    paddingHorizontal: 4,
                  }}
                >
                  <Text
                    style={{
                      flexGrow: 1,
                      color: "rgba(0, 37, 58, 0.76)",
                      fontWeight: "600",
                      flexWrap: "wrap",
                    }}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                  >
                    <Text style={{ fontWeight: "400" }}>Rs. {item.price}</Text>
                    <Pressable>
                      <View
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 20,
                          borderWidth: 1,
                        }}
                      >
                        <Text style={{ fontWeight: "500" }}>Add</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
                <Divider theme={{ colors: { primary: "#000" } }} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    linearGradient: {
      height: 220,
      marginHorizontal: 12,
      borderRadius: 32,
      marginBottom: 10,
      paddingHorizontal: 26,
      paddingTop: 20,
      // paddingBottom: 8,
    },
  
    lightBackButton: {
      borderRadius: 24,
      width: 42,
      height: 42,
      backgroundColor: "#D9D9D9",
      alignItems: "center",
      justifyContent: "center",
      // marginVertical: 22,
    },
  
    darkBackButton: {
      borderRadius: 24,
      width: 42,
      height: 42,
      backgroundColor: "#1E1F22",
      alignItems: "center",
      justifyContent: "center",
      // marginVertical: 22,
    },
  
    ad_img: {
      width: 160,
      height: 125,
      position: "absolute",
      bottom: 0,
      right: 0,
      objectFit: "scale-down",
    },
  
    featuredHeading: {
      fontSize: 20,
      fontWeight: "600",
      marginHorizontal: 16,
      marginBottom: 20,
    },
  
    labBtn: {
      justifyContent: "center",
      alignItems: "center",
  
      // marginRight: 10,
    },
  
    lab_icons: {
      width: 42,
      height: 42,
      // marginLeft: 5,
    },
  
    lab_text: {
      color: "#333",
      // font-family: Lato;
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: 22 /* 157.143% */,
      marginTop: 5,
      textAlign: "center",
    },
  
    productTile: {
      width: 120,
      marginRight: 16,
      height: 120,
      borderRadius: 14,
      backgroundColor: "#F6F6F6",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "#a0a0a0",
      position: "relative",
      overflow: "hidden",
      marginBottom: 8,
    },
  
    add_button: {
      backgroundColor: "#fff",
      borderRadius: 200,
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      elevation: 3,
      shadowRadius: 2,
      shadowColor: "#777777",
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 1 },
      position: "absolute",
      right: 12,
      bottom: 15,
    },
  });
  
  export default Laboratory;
  