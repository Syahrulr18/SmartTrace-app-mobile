import React from "react";
import { useLocalSearchParams } from "expo-router";
import ProductDetail from "../components/ProductDetail";

export default function ProductDetailRoute() {
  const params = useLocalSearchParams<{ productId?: string }>();
  const productId = params.productId ?? "";
  return <ProductDetail productId={productId} />;
}