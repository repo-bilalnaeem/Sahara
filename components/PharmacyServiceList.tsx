import { Href, useRouter } from "expo-router";
import React from "react";
import { View, Image, Pressable, StyleSheet, Text } from "react-native";

interface ServiceItem {
  screen: string;
  imageSource: any;
  text: string;
}

export interface RenderServicesItemProps {
  item: ServiceItem;
  index: number;
}

const PharmacyServiceList = ({ item, index }: RenderServicesItemProps) => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.navigate(item.screen as Href)}
      style={{ alignItems: "center" }}
      key={index}
    >
      <View
        style={[styles.serviceBtn, index === 0 ? { marginLeft: 16 } : null]}
      >
        <Image
          source={item.imageSource}
          style={[styles.service_icons, { resizeMode: "contain" }]}
        />
      </View>
      <Text
        style={[styles.service_text, index !== 0 ? { marginRight: 10 } : null]}
      >
        {item.text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  serviceBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
    marginRight: 10,
  },

  service_icons: {
    width: 42,
    height: 42,
    // marginLeft: 5,
  },

  service_text: {
    color: "#333",
    // font-family: Lato;
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 22 /* 157.143% */,
    marginTop: 5,
    textAlign: "center",
  },
});

export default PharmacyServiceList;
