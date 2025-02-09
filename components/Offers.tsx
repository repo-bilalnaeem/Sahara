import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import { Stack, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import PharmacySponserAd from "./PharmacySponserAd";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const offers = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.background]}>
      <Divider />

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
      <View
        style={{
          paddingTop: top / 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PharmacySponserAd
          height={180}
          title={`Mastercard weekdays`}
          description={`Use Master30 on checkout${"\n"}and get 30% off!`}
          imageSource={require("@/assets/images/Mastercard.jpg")}
          width={150}
        />

        <View style={{ marginTop: -20 }}>
          <PharmacySponserAd
            height={200}
            width={160}
            title={`Enjoy muft ka${"\n"}easyload!`}
            description={`Easyload ab bilkul free`}
            imageSource={require("@/assets/images/easypaisa_ad.jpg")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default offers;
