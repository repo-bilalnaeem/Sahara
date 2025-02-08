import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  useColorScheme,
  Text,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Ionicons } from "@expo/vector-icons";

const PhoneNumberInput = ({ value, onPhoneNumberChange, onCountryChange }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    cca2: "PK",
    callingCode: "92",
  });
  const [isFocused, setIsFocused] = useState(false);
  const isDarkMode = useColorScheme() === "dark";

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // Pass both country code and country name to the parent component
    onCountryChange({ countryCode: country.cca2, countryName: country.name });
  };

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  return (
    <View
      style={[
        isDarkMode ? styles.lightTextInput : styles.darkTextInput,
        isFocused
          ? isDarkMode
            ? styles.darkInputFocus
            : styles.lightInputFocus
          : null,
      ]}
    >
      <Text style={isDarkMode ? styles.darkLabelTag : styles.lightLabelTag}>
        Phone Number
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          alignItems: "center",
        }}
      >
        <CountryPicker
          countryCode={selectedCountry.cca2}
          withFlagButton={true}
          withFilter={true}
          withFlag={true}
          onSelect={handleCountryChange}
        />
        <Text
          style={[{ marginRight: 5 }, isDarkMode ? styles.countryCode : ""]}
        >
          +{selectedCountry.callingCode}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={isDarkMode ? "gray" : "black"}
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Enter phone number"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={onPhoneNumberChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          style={isDarkMode ? styles.inputColor : ""}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },

  inputContainer: {
    // your custom styles for the input container
  },
  lightLabelTag: {
    // your custom styles for the label
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
    // your custom styles for the label
    fontSize: 15,
    backgroundColor: "#1E1F22",
    paddingHorizontal: 5,
    zIndex: 1,
    position: "absolute",
    top: -10,
    left: 30,
    color: "#9A9A9A",
  },

  darkTextInput: {
    // your custom styles for the text input
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: 60,
    paddingHorizontal: 26,
    // marginBottom: 20,
  },
  lightTextInput: {
    // your custom styles for the text input
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: 60,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
    color: "#fff",

    // marginBottom: 20,
  },
  lightInputFocus: {
    // your custom styles for the focused input
    borderColor: "#7593BD",
    borderWidth: 2,
    fontSize: 16,
  },
  darkInputFocus: {
    // your custom styles for the focused input
    borderColor: "#E2E2E2",
    borderWidth: 2,
    fontSize: 16,
  },

  inputColor: {
    color: "#fff",
    flexGrow: 1,
    height: 60,
  },

  countryCode: {
    color: "#fff",
  },
});

export default PhoneNumberInput;
