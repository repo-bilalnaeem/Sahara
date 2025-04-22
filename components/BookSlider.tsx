import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Animatable from "react-native-animatable";
const isAndroid = Platform.OS === "android";

const ThumbComponent = () => {
  return (
    <View style={styles.black_tick}>
      <Image
        source={require("../assets/images/checkmark.png")}
        style={styles.checkmark}
      />
    </View>
  );
};

interface SliderProps {
  name: String;
}

const BookSlider = ({ name }: SliderProps) => {
  const [value, setValue] = useState(0);
  const handleSlidingComplete = () => {
    if (value < 0.45) {
      setValue(0);
      return;
    }
    setValue(0);
    router.replace("/(authenticated)/(services)/(consultation)");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8b96ab", "rgba(71, 97, 110, 0.95)"]}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 0.6, y: 0.3 }}
        style={[styles.slide_btn_container]}
      >
        <Slider
          value={value}
          onValueChange={(newValue) => setValue(newValue[0])}
          renderThumbComponent={() => <ThumbComponent />}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          animateTransitions={true}
          onSlidingComplete={handleSlidingComplete}
          animationType="spring"
        />
        <Text
          style={[
            styles.book,
            isAndroid ? { fontSize: 14, lineHeight: 16 } : null,
          ]}
        >
          {name}
        </Text>
        <View style={styles.arrows}>
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            source={require("@/assets/images/arrow.png")}
            style={[styles.arrow, { tintColor: "rgba(255, 255, 255, 0.25)" }]}
          />
          <Animatable.Image
            source={require("@/assets/images/arrow.png")}
            animation="pulse"
            iterationCount="infinite"
            style={[
              styles.arrow,
              { tintColor: "rgba(255, 255, 255, 0.55)" },
              { marginLeft: -9 },
            ]}
          />
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            source={require("@/assets/images/arrow.png")}
            style={[
              styles.arrow,
              {
                tintColor: "rgba(255, 255, 255, 1)",
                marginLeft: -9,
              },
            ]}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  black_tick: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  checkmark: {
    tintColor: "#fff",
    width: 24,
    height: 24,
  },

  container: {
    flex: 1,
    // marginLeft: 10,
    // marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },

  slide_btn_container: {
    paddingVertical: 8,
    borderRadius: 40,
    padding: 4,
    alignItems: "stretch",
    flexGrow: 1,
  },

  book: {
    color: "#fff",
    textAlign: "center",
    // font-family: Lato;
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22 /* 110% */,
    marginHorizontal: 4,
    position: "absolute",
    // justifyContent:"center"
    top: 5,
    flexGrow: 1,
    width: "100%",
    height: "100%",
    paddingVertical: 12,
    padding: 4,
    zIndex: -1,
  },

  arrows: {
    transform: [{ rotate: "-180deg" }],
    flexDirection: "row",
    // marginRight: 10,
    gap: 3,
    position: "absolute",
    paddingVertical: 14,
    top: 7,
    right: 16,
    zIndex: -1,
  },

  arrow: {
    width: 16,
    height: 16,
  },
});

export default BookSlider;
