import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useProducts } from "../context/ProductContext";
import { shadows } from "../design/shadows";
import { colors, radius } from "../design/theme";
import ArrowBackIcon from "./icons/ArrowBackIcon";
import LocationPinIcon from "./icons/LocationPinIcon";
import LockIcon from "./icons/LockIcon";
import PackageIcon from "./icons/PackageIcon";
import SparkleIcon from "./icons/SparkleIcon";
import StoreIcon from "./icons/StoreIcon";
import ThermometerIcon from "./icons/ThermometerIcon";
import TruckIcon from "./icons/TruckIcon";

// Fallback mock data untuk display jika product tidak ditemukan
const fallbackProductData: Record<string, any> = {
  cakalang: {
    id: "cakalang",
    name: "Ikan Cakalang",
    image: require("../assets/produk-images/images.jpeg"),
    quality: 98,
    price: "Rp 10.000/kg",
    weight: "50 kg",
    date: "13 Nov 2025",
    location: "TPI Paotere Makassar",
    latitude: -5.1477,
    longitude: 119.4327,
    status: "available",
    description: "Ikan Cakalang segar hasil tangkapan hari ini. Kualitas premium, cocok untuk ekspor.",
    tracingId: "TRACE-CAKALANG-001",
    history: [
      { stage: "Panen", location: "Laut Flores", date: "13 Nov 2025", temp: "28°C", icon: "harvest" },
      { stage: "Pendaratan", location: "TPI Paotere", date: "13 Nov 2025", temp: "26°C", icon: "package" },
    ]
  },
  cumi: {
    id: "cumi",
    name: "Cumi",
    image: require("../assets/produk-images/images.jpeg"),
    quality: 85,
    price: "Rp 25.000/kg",
    weight: "25 kg",
    date: "12 Nov 2025",
    location: "Laut Jawa",
    latitude: -5.5,
    longitude: 118.0,
    status: "shipping",
    description: "Cumi segar dalam perjalanan menuju Surabaya.",
    tracingId: "TRACE-CUMI-002",
    history: [
      { stage: "Panen", location: "Selat Makassar", date: "12 Nov 2025", temp: "27°C", icon: "harvest" },
      { stage: "Pengemasan", location: "TPI Paotere", date: "12 Nov 2025", temp: "4°C", icon: "package" },
      { stage: "Pengiriman", location: "Laut Jawa", date: "13 Nov 2025", temp: "4°C", icon: "truck" },
    ]
  },
  udang: {
    id: "udang",
    name: "Udang Kecil",
    image: require("../assets/produk-images/images.jpeg"),
    quality: 95,
    price: "Rp 25.000/kg",
    weight: "25 kg",
    date: "12 Nov 2025",
    location: "Pasar Modern Surabaya",
    latitude: -7.2504,
    longitude: 112.7567,
    status: "sold",
    description: "Udang kecil kualitas ekspor, telah terjual.",
    tracingId: "TRACE-UDANG-003",
    history: [
      { stage: "Panen", location: "Tambak Maros", date: "10 Nov 2025", temp: "28°C", icon: "harvest" },
      { stage: "Pengemasan", location: "Gudang Makassar", date: "11 Nov 2025", temp: "4°C", icon: "package" },
      { stage: "Pengiriman", location: "Surabaya", date: "12 Nov 2025", temp: "4°C", icon: "truck" },
      { stage: "Terjual", location: "Pasar Modern", date: "13 Nov 2025", temp: "4°C", icon: "store" },
    ]
  }
};

type Props = {
  productId: string;
};

export default function FarmerProductDetail({ productId }: Props) {
  const router = useRouter();
  const { products } = useProducts();
  
  // Cari product dari context berdasarkan ID
  const contextProduct = products.find(p => p.id === productId);
  
  // Gunakan product dari context atau fallback ke mock data
  const product = contextProduct ? convertContextProductToDisplay(contextProduct) : fallbackProductData[productId as keyof typeof fallbackProductData] || fallbackProductData["cakalang"];

  // Helper function untuk convert product context ke display format
  function convertContextProductToDisplay(contextProd: any) {
    return {
      id: contextProd.id,
      name: contextProd.name,
      image: contextProd.image || require("../assets/produk-images/images.jpeg"),
      quality: contextProd.quality,
      price: contextProd.price,
      weight: contextProd.weight,
      date: contextProd.date,
      location: contextProd.currentLocation || "Lokasi Tidak Tersedia",
      latitude: contextProd.latitude || -5.1477,
      longitude: contextProd.longitude || 119.4327,
      status: contextProd.status,
      description: `${contextProd.name} - Status: ${contextProd.status}`,
      history: contextProd.route ? [{ stage: contextProd.route, location: contextProd.currentLocation || "TPI", date: contextProd.date, temp: `${contextProd.temperature || 26}°C`, icon: "package" }] : [],
      tracingId: contextProd.tracingId || "TRACE-" + contextProd.id,
    };
  }

  // Generate QR Code using QuickChart API
  const generateQRCodeURL = (text: string) => {
    return `https://quickchart.io/qr?text=${encodeURIComponent(text)}&size=200`;
  };

  // Generate Leaflet map HTML
  const generateMapHTML = (latitude: number, longitude: number, locationName: string) => {
    return `
      <html>
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
          <style>
            body { margin: 0; padding: 0; }
            #map { width: 100%; height: 100vh; }
            .info { padding: 10px; background: white; border-radius: 5px; box-shadow: 0 0 15px rgba(0,0,0,0.2); }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            const map = L.map('map').setView([${latitude}, ${longitude}], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors',
              maxZoom: 19
            }).addTo(map);
            L.marker([${latitude}, ${longitude}]).addTo(map)
              .bindPopup('<b>${locationName}</b><br/>Lat: ${latitude.toFixed(4)}<br/>Lon: ${longitude.toFixed(4)}')
              .openPopup();
          </script>
        </body>
      </html>
    `;
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
      <ScrollView
        className="flex-1 bg-[#F5F6F9]"
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <ArrowBackIcon size={24} color="#0E1B2A" />
          </TouchableOpacity>
          <Text className="text-[14px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Bold" }}>
            Detail Produk Petani
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Product Image & Quality */}
        <View className="px-6 pt-6">
          <View className="rounded-2xl p-6 mb-4 items-center" style={{ backgroundColor: "#FEFCE8" }}>
            <View className="mb-2">
              <SparkleIcon size={32} color="#FCD34D" />
            </View>
            <Image
              source={
                typeof product.image === "string" && product.image.startsWith("file://")
                  ? { uri: product.image }
                  : product.image
              }
              style={{ width: 180, height: 120, resizeMode: "cover", borderRadius: 12, marginTop: 8 }}
            />
            <Text className="text-[13px] text-[#B45309] mt-3" style={{ fontFamily: "Montserrat-SemiBold" }}>
              Kualitas Produk
            </Text>
            <Text className="text-[32px] text-[#f59e0b] mt-1" style={{ fontFamily: "Montserrat-Bold" }}>
              {product.quality}%
            </Text>
            <Text className="text-[11px] text-[#92400E] mt-2 text-center" style={{ fontFamily: "Montserrat-Medium" }}>
              {product.description}
            </Text>
          </View>
        </View>

        {/* QR Code Section */}
        <View className="px-6 mt-2">
          <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0] items-center">
            <Text className="text-[10px] text-[#94A3B8] mb-3" style={{ fontFamily: "Montserrat-Medium" }}>
              QR Code Produk
            </Text>
            <Image
              source={{ uri: generateQRCodeURL(product.tracingId) }}
              style={{ width: 150, height: 150}}
              resizeMode="contain"
            />
            <Text className="text-[9px] text-[#64748B] mt-2 text-center" style={{ fontFamily: "Montserrat-Medium" }}>
              Scan untuk verifikasi
            </Text>
            <Text className="text-[8px] text-[#94A3B8] mt-1" style={{ fontFamily: "Montserrat-Medium" }}>
              ID: {product.tracingId}
            </Text>
          </View>
        </View>

        {/* Map Section */}
        <View className="px-6 mt-2">
            <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0] overflow-hidden">
                <View className="flex-row items-center gap-2 mb-3">
                    <LocationPinIcon size={18} color="#0F172A" />
                    <Text className="text-[12px] text-[#0F172A]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                        Lokasi Terkini 
                    </Text>
                </View>
                <WebView
                    source={{ html: generateMapHTML(product.latitude, product.longitude, product.location) }}
                    style={{ height: 300, borderRadius: 12 }}
                    scrollEnabled={true}
                    javaScriptEnabled={true}
                />
                <View className="mt-3 flex-row items-center gap-2">
                    <View className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>
                        {product.location}
                    </Text>
                </View>
            </View>
        </View>

        {/* Details Section */}
        <View className="px-6 mt-6">
          <View
            style={[
              shadows.soft,
              { backgroundColor: colors.surface, borderRadius: radius.l },
            ]}
            className="rounded-2xl px-5 py-5"
          >
            <View className="gap-3">
              {/* Basic Info */}
              <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                <Text className="text-[10px] text-[#94A3B8]" style={{ fontFamily: "Montserrat-Medium" }}>
                  Informasi Produk
                </Text>
                <View className="mt-3 gap-2">
                    <View className="flex-row justify-between">
                        <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>Komoditas</Text>
                        <Text className="text-[11px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>{product.name}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>Berat Total</Text>
                        <Text className="text-[11px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>{product.weight}</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>Tanggal Panen</Text>
                        <Text className="text-[11px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>{product.date}</Text>
                    </View>
                </View>
              </View>

              {/* Price Info */}
              <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                <Text className="text-[10px] text-[#94A3B8] mb-2" style={{ fontFamily: "Montserrat-Medium" }}>
                  Harga Jual
                </Text>
                <Text className="text-[16px] text-[#10b981]" style={{ fontFamily: "Montserrat-Bold" }}>
                  {product.price}
                </Text>
              </View>

              {/* Journey Timeline */}
              <Text className="text-[15px] text-[#0E1B2A] mt-2" style={{ fontFamily: "Montserrat-Bold" }}>
                Riwayat Perjalanan
              </Text>

              {product.history && product.history.length > 0 ? (
                <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                  {product.history.map((step: any, idx: number) => {
                    const renderIcon = () => {
                      switch (step.icon) {
                        case "harvest": return <LocationPinIcon size={20} color="#10b981" />;
                        case "package": return <PackageIcon size={20} color="#10b981" />;
                        case "truck": return <TruckIcon size={20} color="#10b981" />;
                        case "store": return <StoreIcon size={20} color="#10b981" />;
                        default: return null;
                      }
                    };

                    return (
                      <View key={idx} className={`flex-row gap-3 py-3 ${idx < product.history.length - 1 ? "border-b border-[#E4E7EC]" : ""}`}>
                        <View className="items-center w-8">
                          {renderIcon()}
                          {idx < product.history.length - 1 && <View className="w-0.5 mt-2" style={{ height: 32, backgroundColor: "#E4E7EC" }} />}
                        </View>
                        <View className="flex-1">
                          <Text className="text-[11px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                            {step.stage}
                          </Text>
                          <View className="flex-row items-center gap-1 mt-1">
                            <LocationPinIcon size={12} color="#94A3B8" />
                            <Text className="text-[10px] text-[#94A3B8]" style={{ fontFamily: "Montserrat-Medium" }}>
                              {step.location}
                            </Text>
                          </View>
                          <Text className="text-[9px] text-[#C5CACE] mt-0.5" style={{ fontFamily: "Montserrat-Medium" }}>
                            {step.date}
                          </Text>
                          <View className="flex-row items-center gap-1 mt-1">
                            <ThermometerIcon size={12} color="#0369A1" />
                            <Text className="text-[9px] text-[#0369A1]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                              {step.temp}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                  <Text className="text-[11px] text-[#94A3B8] text-center" style={{ fontFamily: "Montserrat-Medium" }}>
                    Belum ada data perjalanan produk
                  </Text>
                </View>
              )}

              {/* Blockchain Verification */}
              <View className="rounded-2xl p-4 border border-[#FCD34D]" style={{ backgroundColor: "#FFFBEB" }}>
                <View className="flex-row items-start gap-3">
                  <View>
                    <LockIcon size={28} color="#92400E" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[12px] text-[#92400E]" style={{ fontFamily: "Montserrat-Bold" }}>
                      Verified by Blockchain
                    </Text>
                    <Text className="text-[10px] text-[#B45309] mt-1" style={{ fontFamily: "Montserrat-Medium" }}>
                      Data valid dan tercatat di jaringan blockchain SmartTrace
                    </Text>
                    <Text className="text-[8px] text-[#92400E] mt-2" style={{ fontFamily: "Montserrat-Medium" }}>
                      {"Hash: " + (product.tracingId || "0x" + Math.random().toString(16).substr(2, 10) + "...")}
                    </Text>
                  </View>
                </View>
              </View>   
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
