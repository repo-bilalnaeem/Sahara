import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import { useEffect } from "react";
import { useDrawerStatus } from "@react-navigation/drawer";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PharmacyHeader from "@/components/PharmacyHeader";
import { Divider } from "react-native-paper";

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const isDrawerOpen = useDrawerStatus() === "open";

  useEffect(() => {
    Keyboard.dismiss();
  }, [isDrawerOpen]);

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: "#fff", paddingBottom: 16 }}>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Image
            source={require("@/assets/images/Vector.png")}
            style={{ width: 36, height: 36, resizeMode: "contain" }}
          />
          <Text style={{ fontWeight: "600", fontSize: 17 }}>Sahara</Text>
        </View>
        <Divider theme={{ colors: { primary: "#000" } }} />
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#fff", paddingTop: 0 }}
      >
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View>
        <Divider />
        <View
          style={{
            padding: 16,
            paddingBottom: 10 + bottom,
            backgroundColor: "#FFFCFF",
          }}
        >
          <Link href="/" asChild>
            <TouchableOpacity style={styles.footer}>
              <Image
                source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
                style={styles.avatar}
              />
              <Text style={styles.userName}>Bilal Naeem</Text>
              <Ionicons
                name="ellipsis-horizontal"
                size={24}
                color={"#B8B3BA"}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export interface CustomHeaderProps {
  onPress: () => void;
  heading: string;
}

export const CustomHeader = ({ onPress, heading }: CustomHeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 52,
        paddingLeft: 18,
        gap: 18,
        alignItems: "center",
        backgroundColor: "#fff",
        paddingBottom: 16,
      }}
    >
      <TouchableOpacity onPress={onPress} style={styles.closeButton}>
        <Ionicons name="close" size={24} color={"#000000"} />
      </TouchableOpacity>
      <Text style={{ fontWeight: "600", fontSize: 16 }}>{heading}</Text>
    </View>
  );
};

const CutsomDrawer = () => {
  const dimensions = useWindowDimensions();
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
        name="index"
        options={{
          title: undefined,
          drawerIcon: () => null,
          drawerLabel: () => null,
          drawerItemStyle: { display: "none" },
          header: () => <PharmacyHeader />,
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
          header: () => <PharmacyHeader />,
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
        name="viewProfile"
        // getId={() => Math.random().toString()}
        options={{
          title: "View Profile",
          drawerIcon: () => (
            <View style={[styles.item]}>
              <Image
                source={require("@/assets/images/profile.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          header: () => (
            <CustomHeader onPress={router.back} heading="Profile" />
          ),
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
        name="helpCenter"
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
  closeButton: {
    borderRadius: 24,
    width: 36,
    height: 36,
    // backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    zIndex: 2,
  },
});

export default CutsomDrawer;
