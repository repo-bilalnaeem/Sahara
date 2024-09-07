import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Href, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { RadioButton } from "react-native-paper";
import ImageView from "react-native-image-viewing";
import { blood_data } from "@/assets/data/PharmacyPageData";
import { formatTitle, RenderProductTileProps } from "../(pharmacy)";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;
const PRICE = 47.5;
const Product = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  // Log the product ID
  useEffect(() => {
    // console.log("Product ID:", id);
  }, [id]);

  const { top } = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === "dark";

  const snapPoints = useMemo(() => ["39.5%"], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState("first");
  const [visible, setIsVisible] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    setIsModalOpen(true);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    setIsModalOpen(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const selectedText =
    checked === "first" ? "Remove it from my order" : "Cancel the order";

  // Get the URI from the local image using Image.resolveAssetSource
  const localImage = require("@/assets/images/medicine_images/img7.jpeg");
  const imageSource = Image.resolveAssetSource(localImage).uri;

  const images = [
    {
      uri: imageSource,
    },
  ];

  const renderProductTile = ({ item, index }: RenderProductTileProps) => (
    <Pressable onPress={() => router.push(`/(product)/${item.key}` as Href)}>
      <View style={[index === 0 ? { marginLeft: 16 } : null]}>
        <View style={styles.productTile}>
          <Image
            source={item.imageSource}
            style={[{ resizeMode: "contain", width: 120, height: 120 }]}
          />
          <TouchableWithoutFeedback>
            <View style={styles.add_button}>
              <Ionicons name="add" size={20} color={"#494848"} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            marginBottom: 4,
            width: 120,
          }}
        >
          Rs. {item.price}
        </Text>
        <Text
          style={{ width: 120, fontSize: 14, fontWeight: "400", color: "gray" }}
        >
          {formatTitle(item.title)}
        </Text>
      </View>
    </Pressable>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <RootSiblingParent>
        <BottomSheetModalProvider>
          <ScrollView
            bounces={false}
            contentContainerStyle={{ paddingBottom: 48 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={isModalOpen === true ? false : true}
          >
            <TouchableOpacity
              onPress={router.back}
              style={[styles.closeButton, { marginTop: 52, marginLeft: 18 }]}
            >
              <Ionicons name="close" size={24} color={"#636363"} />
            </TouchableOpacity>
            {/* <Text>{id}</Text> */}

            {/* Product Image with Full-Screen Viewing */}
            <View style={[styles.profileImage, { paddingTop: top }]}>
              <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Image
                  source={require("@/assets/images/medicine_images/img7.jpeg")}
                  style={[styles.image, { paddingTop: top }]}
                />
              </TouchableOpacity>
            </View>

            <ImageView
              images={images}
              imageIndex={0}
              visible={ visible}
              onRequestClose={() => setIsVisible(false)}
            />

            <View
              style={{
                paddingHorizontal: 12,
                // marginTop: 24,
                borderBottomWidth: StyleSheet.hairlineWidth,
                // borderTopWidth: StyleSheet.hairlineWidth,
                paddingTop: 48,
                borderColor: "gray",
              }}
            >
              <Text style={styles.product_name}>
                Cerelac 3 Fruits & Wheat 350g
              </Text>
              <Text style={styles.product_price}>Rs. {PRICE.toFixed(2)}</Text>
              <TouchableWithoutFeedback disabled={isModalOpen}>
                <LinearGradient
                  colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0.0527, 0.9575]}
                  style={styles.linearGradient}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    Add to cart
                  </Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>

            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 20,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: "gray",
              }}
            >
              <Text
                style={{ fontWeight: "700", fontSize: 16, marginBottom: 16 }}
              >
                If this product is not available
              </Text>

              <Pressable onPress={handlePresentModalPress}>
                <View style={styles.removeButton}>
                  <Text style={{ fontWeight: "500", flex: 1 }}>
                    {selectedText}
                  </Text>
                  <AntDesign name="right" size={22} color="#394A65" />
                </View>
              </Pressable>
            </View>

            <View style={{ marginTop: 38 }}>
              <Text
                style={[
                  styles.flex_headings,
                  isDarkMode ? styles.lightHeading : styles.darkHeading,
                ]}
              >
                Recommended for you
              </Text>
              <Pressable>
                <FlatList
                  horizontal
                  data={blood_data}
                  renderItem={renderProductTile}
                  keyExtractor={(item) => item.key}
                  showsHorizontalScrollIndicator={false}
                  // scrollEnabled={isBottomSheetOpen === false}
                />
              </Pressable>
            </View>
          </ScrollView>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            index={0}
            containerStyle={{
              position: "absolute",
              backgroundColor: "#30303044",
              flex: 1,
            }}
            handleIndicatorStyle={{
              backgroundColor: "#d4d4d4",
              width: 50,
            }}
            backgroundStyle={{
              borderTopRightRadius: 22,
              borderTopLeftRadius: 22,
            }}
          >
            <View style={{ paddingHorizontal: 20, paddingVertical: 24 }}>
              <Text style={{ fontSize: 24, fontWeight: "600" }}>
                If this product is{"\n"}not available
              </Text>
              <View style={{ paddingTop: 16 }}>
                <TouchableOpacity
                  onPress={() => setChecked("first")}
                  style={styles.radioButtonContainer}
                >
                  <RadioButton
                    value="first"
                    status={checked === "first" ? "checked" : "unchecked"}
                    onPress={() => setChecked("first")}
                  />
                  <Text>Remove it from my order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setChecked("second")}
                  style={styles.radioButtonContainer}
                >
                  <RadioButton
                    value="second"
                    status={checked === "second" ? "checked" : "unchecked"}
                    onPress={() => setChecked("second")}
                  />
                  <Text>Cancel the order</Text>
                </TouchableOpacity>
              </View>
              <TouchableWithoutFeedback onPress={handleCloseModalPress}>
                <LinearGradient
                  colors={["#394A65", "rgba(0, 37, 58, 0.76)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0.0527, 0.9575]}
                  style={styles.linearGradient}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    Apply
                  </Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </RootSiblingParent>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    borderRadius: 24,
    width: 36,
    height: 36,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
  },

  image: {
    height: 200,
    objectFit: "contain",
  },

  profileImage: {
    height: IMG_HEIGHT,
    width,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  product_name: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 8,
    marginHorizontal: 8,
  },

  product_price: {
    fontSize: 15,
    fontWeight: "400",
    marginHorizontal: 8,
  },

  linearGradient: {
    // height: 210,
    // marginHorizontal: 12,
    marginTop: 24,
    borderRadius: 16,
    marginBottom: 24,
    paddingHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 18,
    // justifyContent: "center",
    // alignItems: "center",
  },

  removeButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: "#8b8b8b",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },

  darkHeading: {
    color: "#000",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22,
  },
  lightHeading: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22,
  },

  flex_headings: {
    marginHorizontal: 12,
    marginBottom: 26,
  },

  productTile: {
    width: 120,
    marginRight: 16,
    height: 120,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#a0a0a0",
    position: "relative",
    overflow: "hidden",
    marginBottom: 8,
  },

  add_button: {
    backgroundColor: "#fff",
    borderRadius: 200,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowRadius: 2,
    shadowColor: "#777777",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    position: "absolute",
    right: 12,
    bottom: 15,
  },
});
export default Product;
