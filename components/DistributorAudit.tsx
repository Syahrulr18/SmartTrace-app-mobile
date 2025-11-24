import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { demoProducts } from "../app/konsumen/data/demo-products";
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

type Props = {
  visible: boolean;
  onClose: () => void;
  auditId: string | null;
};

export default function DistributorAudit({ visible, onClose, auditId }: Props) {
  // In a real app, we might fetch data based on auditId. 
  // For now, we'll map auditId to a demo product or just use a default.
  // We can use the auditId to find a product if the IDs match, or just pick the first one.
  const product = demoProducts.find((p) => p.id === auditId) || demoProducts[0];

  // Journey data with coordinates
  const journeySteps = [
    { icon: "harvest", stage: "Panen", location: "Surabaya", date: "10 Nov 2024", temp: "28°C", lat: -7.2575, lng: 112.7521 },
    { icon: "package", stage: "Pengemasan", location: "TPI Paotere", date: "10 Nov 2024", temp: "4°C", lat: -5.1167, lng: 119.4167 },
    { icon: "truck", stage: "Pengiriman", location: "Jakarta", date: "11 Nov 2024", temp: "4°C", lat: -6.2088, lng: 106.8456 },
    { icon: "store", stage: "Penjualan", location: "Pasar Modern", date: "12 Nov 2024", temp: "4°C", lat: -6.2297, lng: 106.8467 },
  ];

  // Prepare map data
  const historyPoints = journeySteps
    .filter(h => h.lat && h.lng)
    .map(h => ({ lat: h.lat, lng: h.lng, title: h.stage, location: h.location }));

  const mapScript = `
    var map = L.map('map');
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    var points = ${JSON.stringify(historyPoints)};
    var bounds = L.latLngBounds();

    points.forEach(function(p) {
        var latlng = [p.lat, p.lng];
        L.marker(latlng).addTo(map)
            .bindPopup("<b>" + p.title + "</b><br>" + p.location);
        bounds.extend(latlng);
    });

    if (bounds.isValid()) {
        map.fitBounds(bounds, {padding: [50, 50]});
    }
  `.replace(/\n/g, " ").replace(/\s\s+/g, " ");

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView className="flex-1" style={{ backgroundColor: "#F5F6F9" }}>
        <ScrollView
          className="flex-1 bg-[#F5F6F9]"
          contentContainerClassName="pb-20"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between">
            <TouchableOpacity onPress={onClose} className="w-10 h-10 items-center justify-center">
              <ArrowBackIcon size={24} color="#0E1B2A" />
            </TouchableOpacity>
            <Text className="text-[14px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Bold" }}>
              Detail Audit: {auditId}
            </Text>
            <View style={{ width: 40 }} />
          </View>

          <View className="px-6 pt-6">
            <View className="rounded-2xl p-6 mb-4 items-center" style={{ backgroundColor: "#FEFCE8" }}>
              <View className="mb-2">
                <SparkleIcon size={32} color="#FCD34D" />
              </View>
              <Image
                source={product?.image ?? require("../assets/produk-images/images.jpeg")}
                style={{ width: 180, height: 120, resizeMode: "cover", borderRadius: 12, marginTop: 8 }}
              />
              <Text className="text-[13px] text-[#B45309] mt-3" style={{ fontFamily: "Montserrat-SemiBold" }}>
                Kualitas Produk
              </Text>
              <Text className="text-[32px] text-[#f59e0b] mt-1" style={{ fontFamily: "Montserrat-Bold" }}>
                94%
              </Text>
              <Text className="text-[11px] text-[#92400E] mt-2 text-center" style={{ fontFamily: "Montserrat-Medium" }}>
                Produk dalam kondisi baik
              </Text>
            </View>
          </View>

          <View className="px-6 mt-6">
            <View
              style={[
                shadows.soft,
                { backgroundColor: colors.surface, borderRadius: radius.l },
              ]}
              className="rounded-2xl px-5 py-5"
            >
              <View className="gap-3">
                <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                  <Text className="text-[10px] text-[#94A3B8]" style={{ fontFamily: "Montserrat-Medium" }}>
                    Informasi Produk
                  </Text>
                  <View className="mt-3 gap-2">
                    <View className="flex-row justify-between">
                      <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>Komoditas</Text>
                      <Text className="text-[11px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>{product?.name ?? "Udang Vannamei"}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>Berat Total</Text>
                      <Text className="text-[11px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>25 kg</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>Tanggal Panen</Text>
                      <Text className="text-[11px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>10 Nov 2024</Text>
                    </View>
                  </View>
                </View>

                {/* QR Code */}
                <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0] items-center">
                  <Text className="text-[10px] text-[#94A3B8] mb-3" style={{ fontFamily: "Montserrat-Medium" }}>
                    QR Code Produk
                  </Text>
                  <Image
                    source={{ uri: `https://quickchart.io/qr?text=${encodeURIComponent(auditId || "unknown")}&size=150` }}
                    style={{ width: 150, height: 150 }}
                    resizeMode="contain"
                  />
                  <Text className="text-[9px] text-[#64748B] mt-2 text-center" style={{ fontFamily: "Montserrat-Medium" }}>
                    Scan untuk verifikasi
                  </Text>
                  <Text className="text-[8px] text-[#94A3B8] mt-1" style={{ fontFamily: "Montserrat-Medium" }}>
                    ID: {auditId}
                  </Text>
                </View>

                <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                  <Text className="text-[10px] text-[#94A3B8] mb-2" style={{ fontFamily: "Montserrat-Medium" }}>
                    Harga Adil
                  </Text>
                  <Text className="text-[16px] text-[#10b981]" style={{ fontFamily: "Montserrat-Bold" }}>
                    {product?.price ?? "Rp 45.000/kg"}
                  </Text>
                  <Text className="text-[9px] text-[#94A3B8] mt-1" style={{ fontFamily: "Montserrat-Medium" }}>
                    Transparansi harga dari petani hingga konsumen
                  </Text>
                </View>

                <Text className="text-[15px] text-[#0E1B2A] mt-2" style={{ fontFamily: "Montserrat-Bold" }}>
                  Peta Perjalanan Produk
                </Text>

                <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0] overflow-hidden">
                  <View className="flex-row items-center gap-2 mb-3">
                    <LocationPinIcon size={18} color="#0F172A" />
                    <Text className="text-[12px] text-[#0F172A]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                      Riwayat Lokasi
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
                </View>

                <Text className="text-[15px] text-[#0E1B2A] mt-4" style={{ fontFamily: "Montserrat-Bold" }}>
                  Detail Perjalanan Produk
                </Text>

                <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                  {journeySteps.map((step, idx) => {
                    const renderIcon = () => {
                      switch (step.icon) {
                        case "harvest":
                          return <LocationPinIcon size={20} color="#10b981" />;
                        case "package":
                          return <PackageIcon size={20} color="#10b981" />;
                        case "truck":
                          return <TruckIcon size={20} color="#10b981" />;
                        case "store":
                          return <StoreIcon size={20} color="#10b981" />;
                        default:
                          return null;
                      }
                    };

                    return (
                      <View key={idx} className={`flex-row gap-3 py-3 ${idx < 3 ? "border-b border-[#E4E7EC]" : ""}`}>
                        <View className="items-center w-8">
                          {renderIcon()}
                          {idx < 3 && <View className="w-0.5 mt-2" style={{ height: 32, backgroundColor: "#E4E7EC" }} />}
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
                        Data tidak dapat dimanipulasi dan tersimpan permanen sebagai bukti autentik
                      </Text>
                      <Text className="text-[8px] text-[#92400E] mt-2" style={{ fontFamily: "Montserrat-Medium" }}>
                        Hash: 0x2f3a5c8d...
                      </Text>
                    </View>
                  </View>
                </View>   
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
