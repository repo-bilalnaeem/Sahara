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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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

  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.inputContainer}>
      <Text style={isDarkMode ? styles.darkLabelTag : styles.lightLabelTag}>
        {label}
      </Text>
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
            isDarkMode ? styles.darkTextInput : styles.lightTextInput,
            isFocused
              ? isDarkMode
                ? styles.darkInputFocus
                : styles.lightInputFocus
              : null,
            imageSource ? { paddingLeft: 60 } : null,
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
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
    marginBottom: 20,
  },
  lightLabelTag: {
    fontSize: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    zIndex: 1,
    position: "absolute",
    top: -10,
    left: 30,
    color: "#3B3939",
  },
  darkLabelTag: {
    fontSize: 15,
    backgroundColor: "#1E1F22",
    paddingHorizontal: 5,
    zIndex: 1,
    position: "absolute",
    top: -10,
    left: 30,
    color: "#9A9A9A",
  },
  passwordContainer: {
    position: "relative",
  },
  darkTextInput: {
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: 60,
    paddingHorizontal: 26,
  },
  lightTextInput: {
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: 60,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
    color: "#000",
  },
  lightInputFocus: {
    borderColor: "#7593BD",
    borderWidth: 2,
    fontSize: 16,
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
    width: 20,
    height: 20,
    position: "absolute",
    top: 20,
    left: 24,
    tintColor: "#AEAEAE",
  },
});
