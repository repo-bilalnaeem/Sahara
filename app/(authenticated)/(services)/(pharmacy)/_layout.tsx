// import { Drawer } from "expo-router/drawer";
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from "@react-navigation/drawer";
// import { Link, useNavigation, useRouter } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import {
//   Image,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   useWindowDimensions,
//   TextInput,
//   Keyboard,
//   useColorScheme,
// } from "react-native";
// import { useEffect } from "react";
// import { useDrawerStatus } from "@react-navigation/drawer";
// import React from "react";
// import { Ionicons } from "@expo/vector-icons";
// import PharmacyHeader from "@/components/PharmacyHeader";

// export const CustomDrawerContent = (props: any) => {
//   const { bottom, top } = useSafeAreaInsets();
//   const isDrawerOpen = useDrawerStatus() === "open";
//   const router = useRouter();

//   useEffect(() => {
//     Keyboard.dismiss();
//   }, [isDrawerOpen]);

//   return (
//     <View style={{ flex: 1, marginTop: top }}>
//       <View style={{ backgroundColor: "#fff", paddingBottom: 10 }}>
//         <View style={styles.searchSection}>
//           <Ionicons
//             style={styles.searchIcon}
//             name="search"
//             size={20}
//             color={"#B8B3BA"}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Search"
//             underlineColorAndroid="transparent"
//           />
//         </View>
//       </View>

//       <DrawerContentScrollView
//         {...props}
//         contentContainerStyle={{ backgroundColor: "#fff", paddingTop: 0 }}
//       >
//         <DrawerItemList {...props} />
//       </DrawerContentScrollView>

//       <View
//         style={{
//           padding: 16,
//           paddingBottom: 10 + bottom,
//           backgroundColor: "#FFFCFF",
//         }}
//       >
//         <Link href="/" asChild>
//           <TouchableOpacity style={styles.footer}>
//             <Image
//               source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
//               style={styles.avatar}
//             />
//             <Text style={styles.userName}>Mika Meerkat</Text>
//             <Ionicons name="ellipsis-horizontal" size={24} color={"#B8B3BA"} />
//           </TouchableOpacity>
//         </Link>
//       </View>
//     </View>
//   );
// };

// const Layout = () => {
//   const dimensions = useWindowDimensions();

//   return (
//     <Drawer
//       drawerContent={CustomDrawerContent}
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#FFFCFF",
//         },
//         headerShadowVisible: false,
//         drawerActiveBackgroundColor: "#F7F2F9",
//         drawerActiveTintColor: "#000",
//         drawerInactiveTintColor: "#000",
//         overlayColor: "rgba(0, 0, 0, 0.2)",
//         drawerItemStyle: { borderRadius: 12 },
//         drawerLabelStyle: { marginLeft: -20 },
//         drawerStyle: { width: dimensions.width * 0.86 },
//       }}
//     >
//       <Drawer.Screen
//         name="index"
//         getId={() => Math.random().toString()}
//         options={{
//           title: "Pharmacy",
//           drawerIcon: () => (
//             <View style={[styles.item]}>
//               <Image
//                 source={require("@/assets/images/Medicine-PNG.png")}
//                 style={styles.btnImage}
//               />
//             </View>
//           ),
//           header: () => <PharmacyHeader />,
//         }}
//       />
//     </Drawer>
//   );
// };

// const styles = StyleSheet.create({
//   searchSection: {
//     marginHorizontal: 16,
//     borderRadius: 10,
//     height: 34,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#EEE9F0",
//   },
//   searchIcon: {
//     padding: 6,
//   },
//   input: {
//     flex: 1,
//     paddingTop: 8,
//     paddingRight: 8,
//     paddingBottom: 8,
//     paddingLeft: 0,
//     alignItems: "center",
//     color: "#424242",
//   },
//   footer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   roundImage: {
//     width: 30,
//     height: 30,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 10,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: "600",
//     flex: 1,
//   },
//   item: {
//     borderRadius: 15,
//     overflow: "hidden",
//   },
//   btnImage: {
//     margin: 6,
//     width: 16,
//     height: 16,
//   },
//   dallEImage: {
//     width: 28,
//     height: 28,
//     resizeMode: "cover",
//   },

//   lightBackButton: {
//     borderRadius: 24,
//     width: 42,
//     height: 42,
//     backgroundColor: "#D9D9D9",
//     alignItems: "center",
//     justifyContent: "center",
//     // marginVertical: 22,
//   },

//   darkBackButton: {
//     borderRadius: 24,
//     width: 42,
//     height: 42,
//     backgroundColor: "#1E1F22",
//     alignItems: "center",
//     justifyContent: "center",
//     // marginVertical: 22,
//   },
// });

// export default Layout;
export { default } from "@/components/Drawer";
