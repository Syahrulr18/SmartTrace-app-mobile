import { ImageSourcePropType } from "react-native";

export type DemoProduct = {
  id: string;
  name: string;
  type: string;
  image: ImageSourcePropType;
  price?: string;
};

export const demoProducts: DemoProduct[] = [
  { id: "A001", name: "Ikan Kembung", type: "Seafood", image: require("../../../assets/produk-images/Ikan-kembung.jpeg"), price: "Rp 45.000/kg" },
  { id: "A002", name: "Kangkung", type: "Vegetable", image: require("../../../assets/produk-images/images.jpeg"), price: "Rp 5.000/ikat" },
  { id: "A003", name: "Tomat", type: "Vegetable", image: require("../../../assets/produk-images/Tomat.jpeg"), price: "Rp 15.000/kg" },
  { id: "A004", name: "Bayam", type: "Vegetable", image: require("../../../assets/produk-images/bayam.jpeg"), price: "Rp 4.000/ikat" },
];