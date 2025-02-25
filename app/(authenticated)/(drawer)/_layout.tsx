import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
import React from "react";
import { View, Image } from "react-native";
import { useSegments } from "expo-router";
import DrawerContent from "@/components/DrawerContent";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
const Layout = () => {
  const segments = useSegments();
  const isOnTabsScreen = segments[2] === "(tabs)";

  return (
    <Drawer
      drawerContent={DrawerContent}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFCFF",
// height: 120
        },
        // headerShadowVisible: false,
        drawerActiveBackgroundColor: "#F7F2F9",
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        overlayColor: "rgba(0, 0, 0, 0.2)",
        drawerItemStyle: { borderRadius: 12 },
        // drawerHideStatusBarOnOpen: true,
        // swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Home",

          drawerIcon: () => (
            <View style={[styles.item, { margin: 6 }]}>
              <AntDesign name="home" size={24} color={"#4e4e4e"} />
            </View>
          ),
          drawerItemStyle: isOnTabsScreen && { display: "none" },
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="offers"
        options={{
          title: "Offers",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/discount.png")}
                style={styles.btnImage}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="vouchers"
        options={{
          title: "Vouchers",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/voucher.png")}
                style={styles.btnImage}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="orders"
        options={{
          title: "Orders",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/order.png")}
                style={styles.btnImage}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="appointments"
        options={{
          title: "Appointments",
          drawerIcon: () => (
            <View style={[styles.item, { margin: 6, borderRadius: 0 }]}>
              <Ionicons
                name="calendar-number-outline"
                size={24}
                color="#383838"
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="address"
        options={{
          title: "Addresses",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/address.png")}
                style={styles.btnImage}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="helpCentre"
        options={{
          title: "Help Center",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/help.png")}
                style={styles.btnImage}
              />
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    marginHorizontal: 16,
    borderRadius: 10,
    height: 34,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE9F0",
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: "center",
    color: "#424242",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  roundImage: {
    width: 30,
    height: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },
  btnImage: {
    margin: 6,
    width: 24,
    height: 24,
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
});

export default Layout;
