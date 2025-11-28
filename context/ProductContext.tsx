import React, { createContext, useContext, useState } from "react";

export type ProductStatus = "available" | "shipping" | "sold";

export interface JourneyStep {
  stage: string;
  location: string;
  date: string;
  temperature?: number;
  icon?: string;
}

export interface Product {
  id: string;
  date: string;
  name: string;
  status: ProductStatus;
  quality: number;
  weight: string; // e.g., "50 kg"
  price: string; // e.g., "Rp 10.000/kg"
  quantity: number; // Jumlah untuk perhitungan
  image?: string; // Foto produk (URI)
  attributes: {
    label: string;
    value: string;
  }[];
  route?: string;
  currentLocation?: string;
  temperature?: number;
  tracingId?: string;
  latitude?: number;
  longitude?: number;
  journey?: JourneyStep[]; // Riwayat perjalanan produk
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getMonthlyStats: () => {
    totalWeight: number;
    totalRevenue: number;
    transactionCount: number;
    averageQuality: number;
  };
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "cakalang",
      date: "13 Nov 2025",
      name: "Ikan Cakalang",
      status: "available",
      quality: 98,
      weight: "50 kg",
      price: "Rp 10.000/kg",
      quantity: 50,
      attributes: [
        { label: "Jenis", value: "Hasil Laut" },
        { label: "Jumlah", value: "50 kg" },
        { label: "Harga per Satuan", value: "Rp 10.000/kg" },
        { label: "Lokasi", value: "TPI Paotere Makassar" },
      ],
    },
    {
      id: "cumi",
      date: "12 Nov 2025",
      name: "Cumi",
      status: "shipping",
      quality: 85,
      weight: "25 kg",
      price: "Rp 25.000/kg",
      quantity: 25,
      route: "Makassar → Surabaya",
      currentLocation: "Laut Jawa",
      temperature: 4,
      attributes: [
        { label: "Jenis", value: "Hasil Laut" },
        { label: "Jumlah", value: "25 kg" },
        { label: "Harga per Satuan", value: "Rp 25.000/kg" },
        { label: "Lokasi", value: "TPI Paotere Makassar" },
      ],
    },
    {
      id: "udang",
      date: "12 Nov 2025",
      name: "Udang Kecil",
      status: "sold",
      quality: 95,
      weight: "25 kg",
      price: "Rp 25.000/kg",
      quantity: 25,
      tracingId: "TRC-UDG-001",
      attributes: [
        { label: "Jenis", value: "Hasil Laut" },
        { label: "Jumlah", value: "25 kg" },
        { label: "Harga per Satuan", value: "Rp 25.000/kg" },
        { label: "Lokasi", value: "TPI Paotere Makassar" },
      ],
    },
  ]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const getMonthlyStats = () => {
    if (products.length === 0) {
      return {
        totalWeight: 0,
        totalRevenue: 0,
        transactionCount: 0,
        averageQuality: 0,
      };
    }

    // Parse weight dari format "50 kg" ke number
    const parseWeight = (weight: string): number => {
      const num = parseFloat(weight);
      return isNaN(num) ? 0 : num;
    };

    // Parse price dari format "Rp 10.000/kg" ke number
    const parsePrice = (price: string): number => {
      const num = parseInt(price.replace(/[^\d]/g, ""), 10);
      return isNaN(num) ? 0 : num;
    };

    // Total weight
    const totalWeight = products.reduce(
      (sum, p) => sum + parseWeight(p.weight),
      0
    );

    // Total revenue = (weight * price per unit)
    const totalRevenue = products.reduce((sum, p) => {
      const weight = parseWeight(p.weight);
      const price = parsePrice(p.price);
      return sum + weight * price;
    }, 0);

    // Transaction count
    const transactionCount = products.length;

    // Average quality
    const averageQuality =
      products.reduce((sum, p) => sum + p.quality, 0) / products.length;

    return {
      totalWeight,
      totalRevenue,
      transactionCount,
      averageQuality: Math.round(averageQuality),
    };
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getMonthlyStats,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts harus digunakan dalam ProductProvider");
  }
  return context;
};
