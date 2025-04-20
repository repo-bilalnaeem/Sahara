import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  useColorScheme,
  StyleSheet,
  KeyboardTypeOptions,
  PixelRatio,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { MaterialIcons } from "@expo/vector-icons";

const scaleFont = (size: number) => size * PixelRatio.getFontScale();

type Props = {
  label: string;
  placeHolder: string;
  value: string;
  secureTextEntry: boolean;
  onChangeText: (text: string) => void;
  imageSource: any;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

const LoginInput = ({
  label,
  placeHolder,
  secureTextEntry,
  value,
  onChangeText,
  imageSource,
  keyboardType,
  autoCapitalize,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.lightLabelTag}>{label}</Text>
      <View style={styles.passwordContainer}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <TextInput
          placeholder={placeHolder}
          value={value}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          placeholderTextColor="gray"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[
            styles.lightTextInput,
            isFocused ? styles.lightInputFocus : null,
            imageSource ? { paddingLeft: wp("18%") } : null,
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={22}
              color="#8E8E8E"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: hp("1%"),
    flexGrow:1
  },
  lightLabelTag: {
    fontSize: scaleFont(15),
    backgroundColor: "#fff",
    paddingHorizontal: wp("0.5%"),
    zIndex: 1,
    position: "absolute",
    top: -10,
    left: 30,
    color: "#3B3939",
  },

  passwordContainer: {
    position: "relative",
  },

  lightTextInput: {
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: hp("7%"),
    paddingHorizontal: wp("6%"),
    backgroundColor: "transparent",
    color: "#000",
    flexGrow: 1,
  },
  lightInputFocus: {
    borderColor: "#7593BD",
    borderWidth: 2,
    fontSize: scaleFont(16),
  },
  darkInputFocus: {
    borderColor: "#E2E2E2",
    borderWidth: 2,
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    top: 18,
    right: 20,
  },
  image: {
    width: wp("6%"),
    height: hp("7%"),
    objectFit: "contain",
    position: "absolute",
    top: 2,
    left: 28,
    tintColor: "#AEAEAE",
  },
});
