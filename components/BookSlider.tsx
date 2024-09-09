import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  LayoutChangeEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

interface BookSliderProps {
  name: string;
  data: any;
}

const BookSlider: React.FC<BookSliderProps> = ({ name, data }) => {
  const isComponentReady = useRef(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<Record<string, object | undefined>, string>>();

  const componentWidthRef = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isComponentReady.current,
      onMoveShouldSetPanResponder: () => isComponentReady.current,
      onPanResponderMove: (_, gestureState) => {
        const newTranslateX = gestureState.dx;
        const minLimit = 0;
        const maxLimit = componentWidthRef.current - 64;

        // Ensure newTranslateX is within the limits
        translateX.setValue(
          Math.max(minLimit, Math.min(newTranslateX, maxLimit))
        );
      },

      onPanResponderRelease: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    componentWidthRef.current = width;
    isComponentReady.current = true;
  };

  useEffect(() => {
    return () => {
      isComponentReady.current = false;
    };
  }, []);

  const commonContainerStyle = {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingRight: 4,
    paddingLeft: 4,
    paddingVertical: 4,
    borderRadius: 40,
    justifyContent: "space-between" as const,
  };

  return (
    <View style={styles.book_and_nav} onLayout={onLayout}>
      <LinearGradient
        colors={["#768CB0", "rgba(7, 56, 83, 0.95)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.slide_btn_container, commonContainerStyle]}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateX }],
            zIndex: 3,
          }}
        >
          <View style={styles.black_tick}>
            <Image
              source={require("../assets/images/checkmark.png")}
              style={styles.checkmark}
            />
          </View>
        </Animated.View>
        <Text style={styles.book}>{name}</Text>
        <View style={styles.arrows}>
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            source={require("../assets/images/arrow.png")}
            style={[styles.arrow, { tintColor: "rgba(255, 255, 255, 0.25)" }]}
          />
          <Animatable.Image
            source={require("../assets/images/arrow.png")}
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
            source={require("../assets/images/arrow.png")}
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
  book_and_nav: {
    // width:"100%"
    flexGrow: 1,
  },

  flex: {
    justifyContent: "space-between",
    // width: "20%",
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "row",
    // marginRight: 15,
  },

  slide_btn_container: {
    // width: "100%",
    height: 66,
    borderRadius: 40,
    // backgroundColor: "#fff",
    padding: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
    // paddingHorizontal:6,
  },

  black_tick: {
    width: 54,
    height: 54,
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
    width: 30,
    height: 30,
  },
  book: {
    color: "#fff",
    textAlign: "center",
    // font-family: Lato;
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22 /* 110% */,
    marginHorizontal: 4,
  },

  arrows: {
    transform: [{ rotate: "-180deg" }],
    flexDirection: "row",
    marginRight: 10,
  },
  arrow: {
    width: 20,
    height: 20,
  },
});

export default BookSlider;
