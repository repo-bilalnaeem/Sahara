import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  onDateChange: (date: Date) => void;
};

const DateOfBirthInput = ({ onDateChange }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const isDarkMode = useColorScheme() === "dark";

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(date);
    hideDatePicker();
    // Call the callback function to pass the selected date to the parent component
    onDateChange(date);
  };

  const formatDate = (date: any) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={isDarkMode ? styles.darkLabelTag : styles.lightLabelTag}>
        Date of Birth
      </Text>
      <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
        <TouchableOpacity
          onPress={showDatePicker}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 14,
          }}
        >
          <FontAwesome
            name="calendar"
            size={20}
            color={isDarkMode ? "gray" : "#000"}
            // style={styles.calendarIcon}
          />
          <Text
            style={[styles.dateText, selectedDate && styles.selectedDateText]}
          >
            {selectedDate ? formatDate(selectedDate) : "MM DD YY"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // your custom styles for the input container
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

  darkContainer: {
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: 60,
    paddingHorizontal: 26,
  },
  lightContainer: {
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#CCC",
    height: 60,
    paddingHorizontal: 26,
    backgroundColor: "transparent",
    color: "#fff",
  },

  dateText: {
    height: "100%",
    paddingVertical: 18,
    color: "gray",
  },

  selectedDateText: {
    color: "#fff",
  },
});

export default DateOfBirthInput;