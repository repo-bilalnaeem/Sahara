import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  PixelRatio,
} from "react-native";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const notification = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          source={require("@/assets/images/notification.png")}
          style={styles.notification_img}
        />
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            fontWeight: "600",
            marginVertical: 36,
          }}
        >
          No new notifications yet
        </Text>
        <Text style={{ textAlign: "center", lineHeight: 24 }}>
          Seems like you don't have any notifications{"\n"}at the moment
        </Text>
        <Button title="Go back" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  notification_img: {
    width: wp("35%"),
    height: hp("25"),
    objectFit: "contain",
  },
});

export default notification;
