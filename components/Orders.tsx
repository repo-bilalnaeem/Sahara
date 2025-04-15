// import { View, Text, Image, TouchableOpacity } from "react-native";
// import React from "react";
// import { StatusBar } from "expo-status-bar";
// import { Divider } from "react-native-paper";
// import { Stack, useNavigation } from "expo-router";
// import { DrawerActions } from "@react-navigation/native";
// import Colors from "@/constants/Colors";
// import { FontAwesome6 } from "@expo/vector-icons";
// import { useGetAllOrdersQuery } from "@/slices/apiSlice";

// const Orders = () => {
//   const navigation = useNavigation();
//   const { data: orders, isLoading } = useGetAllOrdersQuery({});
//   console.log(orders);
//   return (
//     <View style={{ backgroundColor: "#fff", flex: 1 }}>
//       <Stack.Screen
//         options={{
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
//               style={{ marginLeft: 16 }}
//             >
//               <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Divider />
//       <StatusBar style="dark" />
//       <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
//         <Image
//           source={require("@/assets/images/orders.png")}
//           style={{
//             width: 150,
//             height: 150,
//             resizeMode: "contain",
//             // opacity: 0.7,
//             marginBottom: 40,
//           }}
//         />
//         <Text
//           style={{
//             marginBottom: 20,
//             fontSize: 24,
//             fontWeight: "700",
//             textAlign: "center",
//             lineHeight: 24,
//           }}
//         >
//           You don't have any{"\n"}orders yet.
//         </Text>
//         <Text
//           style={{
//             marginBottom: 20,
//             fontSize: 15,
//             fontWeight: "400",
//             textAlign: "center",
//             lineHeight: 24,
//           }}
//         >
//           It seems you have no orders yet.
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default Orders;
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Divider } from "react-native-paper";
import { Stack, useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useGetAllOrdersQuery } from "@/slices/apiSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Orders = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const { data, isLoading } = useGetAllOrdersQuery({});
  const orders = data?.orders || [];

  // 🧠 Get today's date (normalized)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 📦 Grouping Function
  const groupOrdersByDate = (orders: any[]) => {
    return orders.reduce((acc: any, order: any) => {
      const createdDate = new Date(order.createdAt);
      createdDate.setHours(0, 0, 0, 0);

      const formattedDate =
        createdDate.getTime() === today.getTime()
          ? "Today"
          : createdDate.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            });

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      acc[formattedDate].push(order);
      return acc;
    }, {});
  };

  const groupedOrders = groupOrdersByDate(orders);
  const groupedEntries = Object.entries(groupedOrders); // [ [date, order[]], ... ]

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                style={{ marginLeft: 16 }}
              >
                <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
              </Pressable>
            ),
          }}
        />
        <Divider />
        <StatusBar style="dark" />
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Image
            source={require("@/assets/images/orders.png")}
            style={{
              width: 150,
              height: 150,
              resizeMode: "contain",
              marginBottom: 40,
            }}
          />
          <Text
            style={{
              marginBottom: 20,
              fontSize: 24,
              fontWeight: "700",
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            You don't have any{"\n"}orders yet.
          </Text>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 15,
              fontWeight: "400",
              textAlign: "center",
              lineHeight: 24,
            }}
          >
            It seems you have no orders yet.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              style={{ marginLeft: 16 }}
            >
              <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
            </Pressable>
          ),
        }}
      />
      <Divider />
      <StatusBar style="dark" />

      <FlatList
        data={groupedEntries}
        keyExtractor={([date]) => date}
        bounces={false}
        renderItem={({ item: [date, orders] }) => (
          <View>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                marginBottom: 12,
                marginTop: 16,
                marginHorizontal: 16,
              }}
            >
              {date}
            </Text>

            {orders.map((order: any) => (
              <Pressable
                key={order.id}
                onPress={() => {
                  // Navigate to order details if needed
                  // router.push(`/order/${order.id}`);
                }}
                style={{
                  backgroundColor: "#f3f2f2",
                  marginHorizontal: 16,
                  marginBottom: 12,
                  borderRadius: 12,
                  padding: 12,
                  paddingHorizontal: 20,
                  // paddingRight: "15%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  // justifyContent:"space-between",
                  alignItems:"center"
                }}
              >
                <Image
                  source={require("@/assets/images/orders.png")}
                  style={{
                    width: 80,
                    height: 70,
                    resizeMode: "contain",
                    // marginBottom: 40,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 16,
                      flexShrink: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    Order #{order.orderNumber}
                  </Text>

                  <Text
                    style={{ fontSize: 14, color: Colors.grey, marginTop: 8 }}
                  >
                    {order.products.length} items · USD. {order.totalAmount}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
        contentContainerStyle={{
          paddingTop: top / 1.5,
          paddingBottom: 20,
        }}
      />
    </View>
  );
};

export default Orders;
