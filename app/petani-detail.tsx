import { useLocalSearchParams } from "expo-router";
import React from "react";
import FarmerProductDetail from "../components/FarmerProductDetail";

export default function FarmerProductDetailScreen() {
  const params = useLocalSearchParams<{ productId?: string }>();
  const productId = params.productId ?? "cakalang";
  
  return <FarmerProductDetail productId={productId} />;
}
