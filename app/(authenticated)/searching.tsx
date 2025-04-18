import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  PixelRatio,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSearchDoctorsQuery } from "@/slices/apiSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RenderRow } from "./(drawer)/(tabs)/search";
const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const searching = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const {
    data: doctors,
    isLoading,
    error,
  } = useSearchDoctorsQuery(
    {
      role: "CUSTOMER",
      name: search,
    },
    { skip: search.length < 2 }
  ); // Only search after 2+ characters

  useEffect(() => {
    console.log("Search input changed:", search);
  }, [search]);

  console.log(JSON.stringify(doctors, null, 2));

  const { top } = useSafeAreaInsets();
  const listRef = useRef<FlatList>(null);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          styles.meetDoctor,
          {
            paddingTop: top,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity
          onPressIn={router.back}
          style={[styles.darkBackButton]}
        >
          <Image
            style={[
              { width: wp("5%") },
              { height: hp("2%") },
              { tintColor: "#6e6e6e", objectFit: "contain" },
            ]}
            source={require("@/assets/images/arrow.png")}
          />
        </TouchableOpacity>
        <View style={styles.searchbarBox}>
          <AntDesign name="search1" size={scaleFont(20)} color="#000" />
          <TextInput
            style={styles.doctorSearch}
            placeholder="Search Doctor"
            placeholderTextColor={"#A9A9A9"}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: 13, flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            style={{ flex: 1, justifyContent: "center" }}
          />
        ) : error ? (
          <View style={styles.notFoundContainer}>
            <Image
              source={require("@/assets/images/Not Found Icon.png")}
              style={styles.image}
            />
            <Text style={styles.notFoundTextDark}>No doctor found!</Text>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={doctors?.doctors}
            renderItem={({ item, index }) => (
              <RenderRow item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listitems}
            showsVerticalScrollIndicator={false}
            initialNumToRender={2}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbarBox: {
    backgroundColor: "#fff",
    height: hp("5.75%"),
    borderRadius: 30,
    elevation: 5, // or use shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6.54,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    paddingLeft: 20,
  },

  doctorSearch: {
    fontSize: scaleFont(15),
    fontWeight: "400",
    justifyContent: "center",
    marginHorizontal: 16,
    color: "#a1a1a1",
    flexGrow: 1,
  },

  meetDoctor: {
    paddingHorizontal: 13,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },

  darkBackButton: {
    borderRadius: 24,
    width: wp("3%"),
    height: hp("4%"),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 22,
  },

  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },

  image: {
    height: 50,
    width: 50,
    objectFit: "contain",
  },

  listitems: {
    gap: 16,
    paddingBottom: 320,
    marginTop: 20,
  },

  notFoundTextDark: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "500",
  },
});

export default searching;
