import { Href, useRouter } from "expo-router";
import React from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";

interface ServiceItem {
  key: string;
  screen: string;
  imageSource: any;
  category: string;
}

interface Props {
  listData: ServiceItem[]; // Update to array of ServiceItem
}

export interface RenderServicesItemProps {
  item: ServiceItem;
  index: number;
}

const PharmacyServiceList = ({ listData }: Props) => {
  const router = useRouter();

  const PharmacyList = ({ item, index }: RenderServicesItemProps) => (
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
        {item.category}
      </Text>
    </Pressable>
  );

  return (
    <FlatList
      horizontal
      data={listData}
      renderItem={PharmacyList}
      keyExtractor={(item) => item.key}
      showsHorizontalScrollIndicator={false}
    />
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
  },

  service_text: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
    marginTop: 5,
    textAlign: "center",
  },
});

export default PharmacyServiceList;
