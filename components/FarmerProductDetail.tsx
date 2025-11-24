import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
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

// Mock data with coordinates - in a real app this would come from an API or context
const productData = {
  cakalang: {
    id: "cakalang",
    name: "Ikan Cakalang",
    image: require("../assets/produk-images/images.jpeg"),
    quality: 98,
    price: "Rp 10.000/kg",
    weight: "50 kg",
    date: "13 Nov 2025",
    location: "TPI Paotere Makassar",
    latitude: -5.1167,
    longitude: 119.4167,
    status: "available",
    description: "Ikan Cakalang segar hasil tangkapan hari ini. Kualitas premium, cocok untuk ekspor.",
    history: [
      { stage: "Panen", location: "Laut Flores", date: "13 Nov 2025", temp: "28°C", icon: "harvest", lat: -6.5, lng: 120.5 },
      { stage: "Pendaratan", location: "TPI Paotere", date: "13 Nov 2025", temp: "26°C", icon: "package", lat: -5.1167, lng: 119.4167 },
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
    latitude: -6.0,
    longitude: 111.0,
    status: "shipping",
    description: "Cumi segar dalam perjalanan menuju Surabaya.",
    destination: { lat: -7.2575, lng: 112.7521, name: "Surabaya" }, // Surabaya
    history: [
      { stage: "Panen", location: "Selat Makassar", date: "12 Nov 2025", temp: "27°C", icon: "harvest", lat: -4.0, lng: 118.5 },
      { stage: "Pengemasan", location: "TPI Paotere", date: "12 Nov 2025", temp: "4°C", icon: "package", lat: -5.1167, lng: 119.4167 },
      { stage: "Pengiriman", location: "Laut Jawa", date: "13 Nov 2025", temp: "4°C", icon: "truck", lat: -6.0, lng: 111.0 },
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
    latitude: -7.2575,
    longitude: 112.7521,
    status: "sold",
    description: "Udang kecil kualitas ekspor, telah terjual.",
    history: [
      { stage: "Panen", location: "Tambak Maros", date: "10 Nov 2025", temp: "28°C", icon: "harvest", lat: -5.0000, lng: 119.5667 },
      { stage: "Pengemasan", location: "Gudang Makassar", date: "11 Nov 2025", temp: "4°C", icon: "package", lat: -5.1477, lng: 119.4327 },
      { stage: "Pengiriman", location: "Surabaya", date: "12 Nov 2025", temp: "4°C", icon: "truck", lat: -7.2575, lng: 112.7521 },
      { stage: "Terjual", location: "Pasar Modern", date: "13 Nov 2025", temp: "4°C", icon: "store", lat: -7.28, lng: 112.79 },
    ]
  }
};

type Props = {
  productId: string;
};

export default function FarmerProductDetail({ productId }: Props) {
  const router = useRouter();
  const product = productData[productId as keyof typeof productData] || productData["cakalang"];

  // Prepare data for the map - Unified logic for all statuses
  // Show markers for all history points to visualize "where the item has been"
  const historyPoints = product.history
    .filter(h => h.lat && h.lng)
    .map(h => ({ lat: h.lat, lng: h.lng, title: h.stage, location: h.location }));
  
  // Always include current location if not in history (though it usually is)
  const currentPos = { lat: product.latitude, lng: product.longitude, title: "Lokasi Terkini", location: product.location };
  
  // Combine and deduplicate based on lat/lng to avoid stacking markers
  const allPoints = [...historyPoints, currentPos].filter((v, i, a) => 
    a.findIndex(t => t.lat === v.lat && t.lng === v.lng) === i
  );

  const mapScript = `
    var map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    var points = ${JSON.stringify(allPoints)};
    var bounds = L.latLngBounds();

    points.forEach(function(p) {
        var latlng = [p.lat, p.lng];
        L.marker(latlng).addTo(map)
            .bindPopup("<b>" + p.title + "</b><br>" + p.location);
        bounds.extend(latlng);
    });

    if (bounds.isValid()) {
        map.fitBounds(bounds, {padding: [50, 50]});
    } else {
        map.setView([${product.latitude}, ${product.longitude}], 13);
        L.marker([${product.latitude}, ${product.longitude}]).addTo(map);
    }
  `.replace(/\n/g, " ").replace(/\s\s+/g, " ");

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
              source={product.image}
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

        {/* Map Section */}
        <View className="px-6 mt-2">
            <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0] overflow-hidden">
                <View className="flex-row items-center gap-2 mb-3">
                    <LocationPinIcon size={18} color="#0F172A" />
                    <Text className="text-[12px] text-[#0F172A]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                        {product.status === 'shipping' ? 'Rute Pengiriman' : product.status === 'sold' ? 'Riwayat Perjalanan' : 'Lokasi Terkini'}
                    </Text>
                </View>
                <View className="h-48 rounded-xl overflow-hidden border border-[#BAE6FD]">
                    <WebView
                        originWhitelist={['*']}
                        source={{
                            html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><style>body{margin:0}#map{width:100%;height:100vh}</style></head><body><div id="map"></div><script>${mapScript}</script></body></html>`
                        }}
                        style={{ flex: 1 }}
                        scrollEnabled={false}
                    />
                </View>
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

              {/* QR Code */}
              <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0] items-center">
                <Text className="text-[10px] text-[#94A3B8] mb-3" style={{ fontFamily: "Montserrat-Medium" }}>
                  QR Code Produk
                </Text>
                <Image
                  source={{ uri: `https://quickchart.io/qr?text=${encodeURIComponent(product.id)}&size=150` }}
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
                />
                <Text className="text-[9px] text-[#64748B] mt-2 text-center" style={{ fontFamily: "Montserrat-Medium" }}>
                  Scan untuk verifikasi
                </Text>
                <Text className="text-[8px] text-[#94A3B8] mt-1" style={{ fontFamily: "Montserrat-Medium" }}>
                  ID: {product.id}
                </Text>
              </View>

              {/* Journey Timeline */}
              <Text className="text-[15px] text-[#0E1B2A] mt-2" style={{ fontFamily: "Montserrat-Bold" }}>
                Riwayat Perjalanan
              </Text>

              <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                {product.history.map((step, idx) => {
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
                      {"Hash: 0x" + Math.random().toString(16).substr(2, 10) + "..."}
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
