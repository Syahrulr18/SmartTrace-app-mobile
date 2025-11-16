import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddProductModal from "../../components/AddProductModal";
import BlockchainConfirmationModal from "../../components/BlockchainConfirmationModal";
import StatusBadge from "../../components/StatusBadge";
import PlusIcon from "../../components/icons/PlusIcon";
import { shadows } from "../../design/shadows";
import { colors, radius } from "../../design/theme";

const commodities = [
  "Pilih komoditas",
  "Ikan Kembung",
  "Ikan Cakalang",
  "Cumi",
  "Udang Kecil",
  "Udang Besar",
  "Tiram",
  "Kerang",
];

const conditions = ["Baik", "Cukup", "Kurang"];

const todaysProducts = [
  {
    name: "Ikan Cakalang",
    detail: "50 Kg   Rp 10.000/pcs",
    status: "available" as const,
    location: "TPI Paotere Makassar",
  },
];

export default function FarmerHomeScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBlockchainConfirm, setShowBlockchainConfirm] = useState(false);
  const [formData, setFormData] = useState({
    commodity: "",
    weight: "",
    date: "",
    price: "",
    condition: "Baik",
  });

  const handleAddProduct = () => {
    if (!formData.commodity || formData.commodity === "Pilih komoditas") {
      Alert.alert("Peringatan", "Silakan pilih komoditas");
      return;
    }
    if (!formData.weight) {
      Alert.alert("Peringatan", "Silakan masukkan berat/jumlah");
      return;
    }
    if (!formData.date) {
      Alert.alert("Peringatan", "Silakan pilih tanggal");
      return;
    }
    if (!formData.price) {
      Alert.alert("Peringatan", "Silakan masukkan harga per satuan");
      return;
    }

    setShowBlockchainConfirm(true);
  };

  const handleConfirmBlockchain = () => {
    setIsModalOpen(false);
    setShowBlockchainConfirm(false);
    setFormData({
      commodity: "",
      weight: "",
      date: "",
      price: "",
      condition: "Baik",
    });

    Alert.alert(
      "Berhasil",
      "Produk Anda telah berhasil dicatat dan dikunci di blockchain"
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
      <ScrollView
        className="flex-1 bg-[#F5F6F9]"
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between">
          <View>
            <Image
              source={require("../../assets/logo-smarttrace/logo-dashbord.png")}
              style={{ width: 130, height: 46, resizeMode: "contain" }}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <View className="items-end ">
              <Text
                className="text-[13px]"
                style={{ color: "#0E1B2A", fontFamily: "Montserrat-Bold" }}
              >
                Pak Budi
              </Text>
              <Text
                className="text-[11px]"
                style={{ color: "#94A3B8", fontFamily: "Montserrat-Medium" }}
              >
                Petani/Nelayan
              </Text>
            </View>
            <View className="w-10 h-10 rounded-full  items-center justify-center">
              <Image
                source={require("../../assets/icon-role/logo-petani-nelayan.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
          </View>
        </View>

        {/* Gradient Section */}
        <LinearGradient
          colors={["#2D5652", "#0D2C48"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-8 pb-10 rounded-full"
        >
          <View className="mt-4">
            <View>
              <Text
                className="text-white text-[20px]"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                Skor mutu Bulan ini
              </Text>
              <Text
                className="text-white text-[40px] mt-1 "
                style={{ fontFamily: "Montserrat-ExtraBold" }}
              >
                95%
              </Text>
              <View className="flex-row items-center gap-2">
                <StatusBadge label="High Quality" variant={"available"} />
              </View>
            </View>

            <View className="flex-1 items-end"></View>
          </View>
        </LinearGradient>

        <View className="px-6 mt-6">
          <View
            style={[
              shadows.soft,
              {
                backgroundColor: colors.surface,
                borderRadius: radius.l,
              },
            ]}
            className="bg-white rounded-2xl px-5 py-5"
          >
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text
                  className="text-[15px] text-[#0E1B2A]"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  Produk Saya Hari Ini
                </Text>
                <Text
                  className="text-[12px] text-[#64748B] mt-1"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  Kelola hasil panen dan harga jual
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setIsModalOpen(true)}
                className="w-12 h-12 rounded-full bg-[#10b981] items-center justify-center"
              >
                <PlusIcon />
              </TouchableOpacity>
            </View>

            {todaysProducts.map((product) => (
              <View
                key={product.name}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-4"
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text
                      className="text-[16px] text-[#0E1B2A]"
                      style={{ fontFamily: "Montserrat-SemiBold" }}
                    >
                      {product.name}
                    </Text>
                    <Text
                      className="text-[12px] text-[#64748B] mt-1"
                      style={{ fontFamily: "Montserrat-Medium" }}
                    >
                      {product.detail}
                    </Text>
                  </View>
                  <StatusBadge label="Tersedia" variant={product.status} />
                </View>

                <Text
                  className="text-[12px] text-[#1D4ED8] mt-4"
                  style={{ fontFamily: "Montserrat-SemiBold" }}
                >
                  {product.location}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Ringkasan Bulan Ini Section */}
        <View className="px-6 mt-6">
          <View
            style={[
              shadows.soft,
              {
                backgroundColor: colors.surface,
                borderRadius: radius.l,
              },
            ]}
            className="bg-white rounded-2xl px-5 py-5"
          >
            <Text
              className="text-[15px] text-[#0E1B2A] mb-4"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Ringkasan Bulan Ini
            </Text>

            {/* Stats Grid */}
            <View className="gap-4">
              {/* Row 1: Total Penjualan & Pendapatan */}
              <View className="flex-row gap-3">
                {/* Total Penjualan */}
                <View className="flex-1 bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                  <Text
                    className="text-[11px] text-[#94A3B8]"
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    Total Penjualan
                  </Text>
                  <Text
                    className="text-[22px] text-[#0E1B2A] mt-2"
                    style={{ fontFamily: "Montserrat-Bold" }}
                  >
                    195 kg
                  </Text>
                </View>

                {/* Pendapatan */}
                <View className="flex-1 bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                  <Text
                    className="text-[11px] text-[#94A3B8]"
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    Pendapatan
                  </Text>
                  <Text
                    className="text-[22px] text-[#0E1B2A] mt-2"
                    style={{ fontFamily: "Montserrat-Bold" }}
                  >
                    Rp 7.2 jt
                  </Text>
                </View>
              </View>

              {/* Row 2: Transaksi & Skor Rata-rata */}
              <View className="flex-row gap-3">
                {/* Transaksi */}
                <View className="flex-1 bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                  <Text
                    className="text-[11px] text-[#94A3B8]"
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    Transaksi
                  </Text>
                  <Text
                    className="text-[22px] text-[#0E1B2A] mt-2"
                    style={{ fontFamily: "Montserrat-Bold" }}
                  >
                    4
                  </Text>
                </View>

                {/* Skor Rata-rata */}
                <View className="flex-1 bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                  <Text
                    className="text-[11px] text-[#94A3B8]"
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    Skor Rata-rata
                  </Text>
                  <Text
                    className="text-[22px] text-[#10b981] mt-2"
                    style={{ fontFamily: "Montserrat-Bold" }}
                  >
                    96%
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Product Modal Component */}
      <AddProductModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
        formData={formData}
        setFormData={setFormData}
        commodities={commodities}
        conditions={conditions}
      />

      {/* Blockchain Confirmation Modal Component */}
      <BlockchainConfirmationModal
        visible={showBlockchainConfirm}
        onClose={() => setShowBlockchainConfirm(false)}
        onConfirm={handleConfirmBlockchain}
      />
    </SafeAreaView>
  );
}
