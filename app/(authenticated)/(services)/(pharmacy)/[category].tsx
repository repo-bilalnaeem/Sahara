import { View, Text, ActivityIndicator, Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetProductsByCategoryTagsQuery } from "@/slices/apiSlice";
import ProductOnCategory from "@/components/ProductOnCategory";

interface Product {
  id: string;
  name: string;
  SKU: number;
  category: string;
  description: string | null;
  discountPercentage: number;
  discountPrice: number;
  price: number;
  stock: number;
  tag: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const PharmaCategory = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [productsCategory, setProductsCategory] = useState<Product[]>([]);
  const [page, setPage] = useState(1); // Track the page number
  const [loadingMore, setLoadingMore] = useState(false); // Track loading state
  const router = useRouter();

  console.log("Category is:", category.toUpperCase());

  const {
    data: productData,
    isLoading: productLoading,
    error,
  } = useGetProductsByCategoryTagsQuery({
    limit: 50, // Limit the number of products per request
    category: category.toUpperCase(),
    tag: "",
    page: page, // Use the current page for pagination
  });

  useEffect(() => {
    if (productData && productData.products) {
      if (page === 1) {
        // If we're on the first page, replace the list
        console.log("Products data: ", productData?.products.length);
        setProductsCategory(productData.products);
      } else {
        // If not, append the new products to the existing list
        setProductsCategory((prev) => [...prev, ...productData.products]);
      }
    }
  }, [productData, page]);

  useEffect(() => {
    if (!category) return;
    console.log("Category is:", category);
  }, [category]);

  //   const loadMoreProducts = () => {
  //     if (loadingMore) return; // Avoid making multiple requests simultaneously
  //     setLoadingMore(true);
  //     setPage((prevPage) => prevPage + 1); // Increment the page to load more products
  //   };

  if (error) {
    Alert.alert("Unable to fetch products, please try later!");
    router.back();
  }

  if (productLoading && page === 1) {
    return (
      <ActivityIndicator
        size={"small"}
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={productsCategory}
        renderItem={({ item, index }) => <ProductOnCategory item={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          productLoading && page > 1 ? (
            <ActivityIndicator
              style={{ alignItems: "center", paddingVertical: 100 }}
              size={"small"}
            />
          ) : null
        }
        ListEmptyComponent={
          !productLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No products found in this category.
              </Text>
            </View>
          ) : null
        }
        // onEndReached={loadMoreProducts} // Trigger fetching more products
        // onEndReachedThreshold={0.5} // Trigger load more when 50% of the list is reached
      />
    </View>
  );
};

export default PharmaCategory;
