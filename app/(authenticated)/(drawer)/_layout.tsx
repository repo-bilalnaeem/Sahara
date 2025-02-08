import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Href, Link, useNavigation, useRouter, useSegments } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Alert,
  Keyboard,
  useColorScheme,
  Platform,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { useDrawerStatus } from "@react-navigation/drawer";
import { Chat } from "@/utils/Interfaces";
import * as ContextMenu from "zeego/context-menu";
import { getChats, renameChat } from "@/utils/Database";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { CustomDrawerContent, CustomHeader } from "@/components/Drawer";

const Layout = () => {
  const dimensions = useWindowDimensions();
  const segments = useSegments();
  const router = useRouter();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFCFF",
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: "#F7F2F9",
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        overlayColor: "rgba(0, 0, 0, 0.2)",
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -10 },
        drawerStyle: { width: dimensions.width * 0.86 },
        drawerHideStatusBarOnOpen: true,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: undefined,
          drawerIcon: () => null,
          drawerLabel: () => null,
          drawerItemStyle: { display: "none" },
          headerShown: false,
        }}
      />

<Drawer.Screen
        name="offers"
        // getId={() => Math.random().toString()}
        
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
          header: () => (
            <CustomHeader onPress={router.back} heading="Offers" />
          ),
        }}
      />

      <Drawer.Screen
        name="vouchers"
        // getId={() => Math.random().toString()}
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

          header: () => (
            <CustomHeader onPress={router.back} heading="Vouchers & offers" />
          ),
        }}
      />

      <Drawer.Screen
        name="orders"
        // getId={() => Math.random().toString()}
        options={{
          title: "Orders & reordering",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/order.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          header: () => <CustomHeader onPress={router.back} heading="Orders" />,
        }}
      />

      <Drawer.Screen
        name="address"
        // getId={() => Math.random().toString()}
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
          header: () => (
            <CustomHeader onPress={router.back} heading="Addresses" />
          ),
        }}
      />

      <Drawer.Screen
        name="helpCentre"
        // getId={() => Math.random().toString()}
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
          header: () => (
            <CustomHeader onPress={router.back} heading="Help Center" />
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
    width: 16,
    height: 16,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: "cover",
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
