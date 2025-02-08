import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

// Define the props for the component
interface GenderInputProps {
  onGenderChange: (gender: string | null) => void;
}

const GenderInput: React.FC<GenderInputProps> = ({ onGenderChange }) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const isDarkMode = useColorScheme() === "dark";

  const handleGenderChange = (gender: string | null) => {
    setSelectedGender(gender);
    setShowOptions(false); // Close options after selecting
    onGenderChange(gender);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <View
      style={
        isDarkMode ? styles.darkInputContainer : styles.lightInputContainer
      }
    >
      <Text style={isDarkMode ? styles.darkLabelTag : styles.lightLabelTag}>
        Gender
      </Text>
      <TouchableOpacity onPress={toggleOptions} style={styles.selectContainer}>
        <Text style={selectedGender ? styles.selectText : styles.defaulttext}>
          {selectedGender
            ? selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)
            : "Select Gender"}
        </Text>
        <Ionicons
          name={showOptions ? undefined : "chevron-down"}
          size={20}
          color={isDarkMode ? "gray" : "black"}
        />
      </TouchableOpacity>
      {showOptions && (
        <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue) =>
            handleGenderChange(itemValue as string | null)
          }
          style={styles.picker}
          itemStyle={
            isDarkMode ? styles.darkPickerItem : styles.lightPickerItem
          }
        >
          <Picker.Item label="Select Gender" value={null} />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  darkInputContainer: {
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: 60,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
    color: "#fff",
  },
  lightInputContainer: {
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: 60,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
    color: "#000",
  },
  selectContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  defaulttext: {
    fontSize: 14,
    color: "grey",
  },
  picker: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    color: "#fff",
    // backgroundColor: "#fff",
  },
  pickerItem: {
    fontSize: 16,
    color: "#fff",
    // backgroundColor:"#fff"
  },

  selectText: {
    color: "#fff",
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

  darkPickerItem: {
    fontSize: 16,
    color: "#fff", // Change color to white in dark mode
  },
  lightPickerItem: {
    fontSize: 16,
    color: "#000", // Change color to black in light mode
  },
});

export default GenderInput;
