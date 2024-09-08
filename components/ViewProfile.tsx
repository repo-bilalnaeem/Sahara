import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";

const ViewProfile = () => {
  return (
    <View style={{ flex: 1, marginHorizontal: 16, marginVertical: 24 }}>
      <StatusBar style="dark" />
      <Text style={styles.heading}>Personal details</Text>
      <View style={{ gap: 12 }}>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "gray",
              }}
            >
              Name
            </Text>
            <Feather name="edit" size={20} color="#666666" />
          </View>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>Bilal Naeem</Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "gray",
              }}
            >
              Email address
            </Text>
            <Feather name="edit" size={20} color="#666666" />
          </View>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>
            b.naeem2021@gmail.com
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "gray",
              }}
            >
              Password
            </Text>
            <Feather name="edit" size={20} color="#666666" />
          </View>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>********</Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 10,
            // paddingBottom: 22,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "gray",
              }}
            >
              Mobile number
            </Text>
            <Feather name="edit" size={20} color="#666666" />
          </View>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>+923343853304</Text>
        </View>
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.heading}>Connected accounts</Text>
        <View style={{ gap: 12 }}>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    // tintColor: "#2F6EF4",
                    resizeMode: "contain",
                  }}
                  source={require("@/assets/images/Google-Icon.png")}
                />
                <Text style={{ fontSize: 14, fontWeight: "600" }}>Google</Text>
              </View>
              <Pressable>
                <View style={styles.connect}>
                  <Text style={{ fontWeight: "500" }}>Connect</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    // tintColor: "#2F6EF4",
                    resizeMode: "contain",
                  }}
                  source={require("@/assets/images/Apple-Icon.png")}
                />
                <Text style={{ fontSize: 14, fontWeight: "600" }}>Apple</Text>
              </View>
              <Pressable>
                <View style={styles.connect}>
                  <Text style={{ fontWeight: "500" }}>Connect</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
              >
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: "#2F6EF4",
                    resizeMode: "contain",
                  }}
                  source={require("@/assets/images/Facebook-Icon.png")}
                />
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  Facebook
                </Text>
              </View>
              <Pressable>
                <View style={styles.connect}>
                  <Text style={{ fontWeight: "500" }}>Connect</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  heading: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 16,
    marginLeft: 8,
  },
  connect: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
});
