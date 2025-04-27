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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Href, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ImageView from "react-native-image-viewing";
import * as Haptics from "expo-haptics";

import { useCart } from "@/store/cartStore";
import { StatusBar } from "expo-status-bar";
import {
  // useGetGeneralProductsQuery,
  useGetProductsByCategoryTagsQuery,
  useGetProductByIdQuery,
  useGetProductsByTagsQuery,
} from "@/slices/apiSlice";
import ProductTile from "@/components/ProductTile";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  discountPrecentage: number | null;
  tag: string;
  stock: number;
  imageUrl: string;
  category: string;
  createdAt: string;
};

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;
const Product = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useGetProductByIdQuery(id);

  const [product, setProduct] = useState<Product>();
  const [productList, setProductList] = useState([]);
  const [recommendedProductsTag, setRecommendedProductsTag] = useState([]);

  useEffect(() => {
    if (data && data?.product) {
      setProduct(data.product);
    }
  }, [data]);

  const { data: products, isLoading: loading_products } =
    useGetProductsByCategoryTagsQuery({
      category: "GENERAL",
      tag: "POPULAR_PRODUCT",
      limit: 8,
      page: 1,
    });

  const { data: recommendedData, isLoading: recommendedLoading } =
    useGetProductsByTagsQuery({
      limit: 8,
      tag: "RECOMMENDED",
    });

  useEffect(() => {
    if (recommendedData && recommendedData?.products) {
      setRecommendedProductsTag(recommendedData?.products);
    }
  }, [recommendedData]);
  // console.log("data", products);

  useEffect(() => {
    if (products && products?.products) {
      setProductList(products.products);
    }
  }, [data]);
  // console.log(JSON.stringify(product, null, 2));

  const addProduct = useCart((state: any) => state.addProduct);
  const cartItems = useCart((state: any) => state.items);
  // //   console.log(JSON.stringify(cartItems, null, 2))

  const router = useRouter();

  const { top } = useSafeAreaInsets();

  const [visible, setIsVisible] = useState(false);

  const addToCart = () => {
    console.log("pressed");
    addProduct(product);
  };

  if (!id || loading_products)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} />
      </View>
    );
  if (error) return <Text>Error fetching product</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar />

        <View style={[styles.profileImage, { paddingTop: top }]}>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Image
              source={{
                uri: product?.imageUrl,
              }}
              style={{
                height: 180,
                width: 180,
                objectFit: "contain",
              }}
            />
          </TouchableOpacity>
        </View>

        <ImageView
          images={[{ uri: product?.imageUrl }]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />

        <View
          style={{
            paddingHorizontal: 12,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingTop: 48,
            borderColor: "gray",
          }}
        >
          <Text style={styles.product_name}>{product?.name}</Text>
          <Text style={styles.product_price}>
            Rs. {product?.price.toFixed(2)}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              addToCart();
            }}
          >
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
          <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 16 }}>
            If this product is not available
          </Text>

          <Pressable>
            <View style={styles.removeButton}>
              <Text style={{ fontWeight: "500", flex: 1 }}>Remove Order</Text>
              <AntDesign name="right" size={22} color="#394A65" />
            </View>
          </Pressable>
        </View>

        <View style={{ marginTop: 38 }}>
          <Text style={[styles.flex_headings, styles.darkHeading]}>
            Recommended for you
          </Text>
          <Pressable>
            <FlatList
              horizontal
              data={recommendedProductsTag}
              renderItem={({ item, index }) => (
                <ProductTile item={item} index={index} />
              )}
              contentContainerStyle={{
                gap: 10,
                paddingRight: 16,
              }}
              showsHorizontalScrollIndicator={false}
              // scrollEnabled={isBottomSheetOpen === false}
            />
          </Pressable>
        </View>
      </ScrollView>
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
