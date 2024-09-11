import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const MeetDoctor = () => {
  return (
    <View style={{ paddingHorizontal: 12, gap: 20 }}>
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 8,
          borderRadius: 18,
          backgroundColor: "#f9f9f9",
          //   borderWidth: StyleSheet.hairlineWidth,
          //   borderColor: "gray",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            marginBottom: 18,
          }}
        >
          <View style={styles.image_container}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
              style={styles.image}
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
        <Pressable>
          <LinearGradient
            colors={[
              "#35445F",
              //   "rgba(11, 17, 26, 0.62)",
              "rgba(11, 16, 26, 0.61)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.innerGradient}
          >
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                Book an appointment
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 8,
          borderRadius: 18,
          backgroundColor: "#f9f9f9",
          //   borderWidth: StyleSheet.hairlineWidth,
          //   borderColor: "gray",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            marginBottom: 18,
          }}
        >
          <View style={styles.image_container}>
            <Image
              source={{
                uri: "https://images.pexels.com/photos/5215017/pexels-photo-5215017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
              style={styles.image}
            />
          </View>
          <View style={{ marginTop: 16, flexGrow: 1, marginRight: 16 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontWeight: "400", fontSize: 18, marginBottom: 6 }}
              >
                Dr. Sarah Ayoubi
              </Text>
              <Image
                source={require("@/assets/images/Professional.png")}
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            </View>
            <Text style={{ fontSize: 13, fontWeight: "300" }}>Neurologist</Text>
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
        <Pressable>
          <LinearGradient
            colors={[
              "#35445F",
              //   "rgba(11, 17, 26, 0.62)",
              "rgba(11, 16, 26, 0.61)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.innerGradient}
          >
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontWeight: "500",
                  fontSize: 15,
                }}
              >
                Book an appointment
              </Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image_container: {
    width: 100,
    height: 100,
    borderRadius: 14,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 155,
    // objectFit: "contain",
  },

  innerGradient: {
    borderRadius: 20,
  },
});

export default MeetDoctor;
