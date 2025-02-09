import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { data } from "@/assets/data/HelpPageData";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Stack, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import { DrawerActions } from "@react-navigation/native";

const HelpCenter = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              style={{ marginLeft: 16 }}
            >
              <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
            </TouchableOpacity>
          ),
        }}
      />
      <StatusBar style="dark" />
      <Divider />

      <View>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 24,
          }}
        >
          <Text style={styles.heading}>How can we help?</Text>
        </View>

        {data.map((item, index) => (
          <View
            key={index}
            style={{
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                // gap: 10,
                paddingLeft: 20,
                paddingRight: 10,
                paddingVertical: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <Image source={item.imageSource} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
                <AntDesign name="right" size={22} color="#394A65" />
              </View>
            </View>
            <Divider />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "#394A65",
    fontSize: 24,
    fontWeight: "700",
    // paddingHorizontal: 8,
    paddingVertical: 20,
  },

  text: {
    fontSize: 16,
    fontWeight: "400",
    color: "#616161",
    flexGrow: 1,
    flexWrap: "wrap",
  },

  image: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
});

export default HelpCenter;
