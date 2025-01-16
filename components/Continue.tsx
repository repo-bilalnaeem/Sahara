import {
    View,
    Text,
    Dimensions,
    useColorScheme,
    StyleSheet,
  } from "react-native";
  import React from "react";
  
  type Props = {
    children: React.ReactNode;
  };
  
  const Continue = ({ children }: Props) => {
    const { width } = Dimensions.get("window");
    const halfWidth = width / 3.5;
  
    const isDarkMode = useColorScheme() === "dark";
  
    return (
      <View style={styles.lines}>
        <View style={[styles.line, { width: halfWidth }]} />
        <Text style={isDarkMode ? styles.orLight : styles.orDark}>
          {children}
        </Text>
        <View style={[styles.line, { width: halfWidth }]} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    lines: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
  
    orDark: {
      marginHorizontal: 10,
      color: "#545454",
      fontSize: 14,
      fontWeight: "500",
    },
    orLight: {
      marginHorizontal: 10,
      color: "#CACACA",
      fontSize: 14,
      fontWeight: "500",
    },
  
    line: {
      // paddingHorizontal:'10%',
      backgroundColor: "#969696",
      height: 1,
    },
  });
  
  export default Continue;
  