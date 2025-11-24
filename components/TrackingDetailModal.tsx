import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebView } from "react-native-webview";
import { shadows } from "../design/shadows";
import CloseIcon from "./icons/CloseIcon";
import LocationPinIcon from "./icons/LocationPinIcon";
import ThermometerIcon from "./icons/ThermometerIcon";
import TruckIcon from "./icons/TruckIcon";

interface TrackingData {
  id: string;
  product: string;
  status: "Aktif" | "Tiba" | "Tertunda";
  quality: number;
  temperature: number;
  humidity?: number;
  location: string;
  startPoint: string;
  endPoint: string;
  driver: string;
  vehicle: string;
  lastUpdate: string;
}

interface TrackingDetailModalProps {
  visible: boolean;
  onClose: () => void;
  shipment: TrackingData | null;
}

export default function TrackingDetailModal({
  visible,
  onClose,
  shipment,
}: TrackingDetailModalProps) {
  if (!shipment) return null;

  // Mock coordinates for the map (Surabaya to Jakarta roughly)
  // In a real app, these would come from the shipment data
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100%; height: 100vh; }
          .custom-icon {
            background-color: #0369A1;
            border-radius: 50%;
            border: 2px solid white;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([-6.9175, 107.6191], 7); // Centered roughly on Java
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // Start Point (Surabaya)
          L.marker([-7.2575, 112.7521]).addTo(map)
            .bindPopup('Start: ${shipment.startPoint}');

          // End Point (Jakarta)
          L.marker([-6.2088, 106.8456]).addTo(map)
            .bindPopup('End: ${shipment.endPoint}');

          // Current Location (Mock dynamic based on status)
          var currentLat = -6.9175; // Bandung area
          var currentLng = 107.6191;
          
          var truckIcon = L.divIcon({
            className: 'custom-icon',
            iconSize: [12, 12]
          });

          L.marker([currentLat, currentLng], {icon: truckIcon}).addTo(map)
            .bindPopup('Current: ${shipment.location}<br>Status: ${shipment.status}')
            .openPopup();

          // Draw line
          var latlngs = [
            [-7.2575, 112.7521],
            [currentLat, currentLng],
            [-6.2088, 106.8456]
          ];
          var polyline = L.polyline(latlngs, {color: '#0369A1', weight: 3, opacity: 0.7, dashArray: '10, 10'}).addTo(map);
          
          // Fit bounds to show whole route
          map.fitBounds(polyline.getBounds(), {padding: [50, 50]});
        </script>
      </body>
    </html>
  `;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl h-[90%] overflow-hidden">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-white z-10">
            <View>
              <Text
                className="text-[16px] text-[#0E1B2A]"
                style={{ fontFamily: "Montserrat-Bold" }}
              >
                Detail Pengiriman
              </Text>
              <Text
                className="text-[11px] text-[#64748B]"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                ID: {shipment.id}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center bg-[#F1F5F9] rounded-full"
            >
              <CloseIcon size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1 bg-[#F5F6F9]"
            showsVerticalScrollIndicator={false}
          >
            {/* Map Section */}
            <View className="h-64 w-full bg-gray-200">
              <WebView
                originWhitelist={["*"]}
                source={{ html: mapHtml }}
                style={{ flex: 1 }}
                scrollEnabled={false}
              />
            </View>

            {/* Status Card */}
            <View className="px-6 -mt-6">
              <View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]" style={shadows.soft}>
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-[10px] text-[#94A3B8]" style={{ fontFamily: "Montserrat-Medium" }}>
                      Status Pengiriman
                    </Text>
                    <Text className="text-[14px] text-[#0E1B2A] mt-1" style={{ fontFamily: "Montserrat-Bold" }}>
                      {shipment.status}
                    </Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${
                    shipment.status === 'Aktif' ? 'bg-[#F0FDF4] border border-[#10b981]' : 
                    shipment.status === 'Tiba' ? 'bg-[#EFF6FF] border border-[#3b82f6]' : 
                    'bg-[#FFFBEB] border border-[#f59e0b]'
                  }`}>
                    <Text className={`text-[10px] ${
                      shipment.status === 'Aktif' ? 'text-[#10b981]' : 
                      shipment.status === 'Tiba' ? 'text-[#3b82f6]' : 
                      'text-[#f59e0b]'
                    }`} style={{ fontFamily: "Montserrat-SemiBold" }}>
                      {shipment.status}
                    </Text>
                  </View>
                </View>

                {/* Timeline Visual */}
                <View className="flex-row items-center justify-between px-2 relative">
                  {/* Line */}
                  <View className="absolute top-2.5 left-2 right-2 h-[2px] bg-[#E2E8F0] -z-10" />
                  
                  {/* Start */}
                  <View className="items-center gap-2 bg-white px-1">
                    <View className="w-5 h-5 rounded-full bg-[#0369A1] border-2 border-white shadow-sm" />
                    <Text className="text-[9px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>{shipment.startPoint}</Text>
                  </View>

                  {/* Current */}
                  <View className="items-center gap-2 bg-white px-1">
                    <View className="w-5 h-5 rounded-full bg-[#10B981] border-2 border-white shadow-sm items-center justify-center">
                       <View className="w-2 h-2 bg-white rounded-full" />
                    </View>
                    <Text className="text-[9px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Bold" }}>Sekarang</Text>
                  </View>

                  {/* End */}
                  <View className="items-center gap-2 bg-white px-1">
                    <View className="w-5 h-5 rounded-full bg-white border-2 border-[#CBD5E1]" />
                    <Text className="text-[9px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>{shipment.endPoint}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Details Grid */}
            <View className="px-6 py-6 gap-4">
              <Text className="text-[14px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Bold" }}>
                Informasi Detail
              </Text>

              <View className="flex-row gap-3">
                {/* Product Info */}
                <View className="flex-1 bg-white p-3 rounded-xl border border-[#E2E8F0]">
                  <Text className="text-[10px] text-[#94A3B8] mb-1" style={{ fontFamily: "Montserrat-Medium" }}>Produk</Text>
                  <Text className="text-[12px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>{shipment.product}</Text>
                </View>
                {/* Quality Info */}
                <View className="flex-1 bg-white p-3 rounded-xl border border-[#E2E8F0]">
                  <Text className="text-[10px] text-[#94A3B8] mb-1" style={{ fontFamily: "Montserrat-Medium" }}>Kualitas</Text>
                  <Text className="text-[12px] text-[#15803D]" style={{ fontFamily: "Montserrat-Bold" }}>{shipment.quality}%</Text>
                </View>
              </View>

              <View className="flex-row gap-3">
                {/* Temperature */}
                <View className="flex-1 bg-white p-3 rounded-xl border border-[#E2E8F0]">
                  <View className="flex-row items-center gap-1 mb-1">
                    <ThermometerIcon size={12} color="#94A3B8" />
                    <Text className="text-[10px] text-[#94A3B8]" style={{ fontFamily: "Montserrat-Medium" }}>Suhu</Text>
                  </View>
                  <Text className="text-[12px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>{shipment.temperature}°C</Text>
                </View>
                {/* Last Update */}
                <View className="flex-1 bg-white p-3 rounded-xl border border-[#E2E8F0]">
                  <Text className="text-[10px] text-[#94A3B8] mb-1" style={{ fontFamily: "Montserrat-Medium" }}>Update Terakhir</Text>
                  <Text className="text-[12px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>{shipment.lastUpdate}</Text>
                </View>
              </View>

              {/* Driver & Vehicle */}
              <View className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
                <Text className="text-[12px] text-[#0E1B2A] mb-3" style={{ fontFamily: "Montserrat-Bold" }}>Armada & Pengemudi</Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-[#F1F5F9] rounded-full items-center justify-center">
                      <TruckIcon size={20} color="#0E1B2A" />
                    </View>
                    <View>
                      <Text className="text-[12px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>{shipment.vehicle}</Text>
                      <Text className="text-[10px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>{shipment.driver}</Text>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-[#F0F9FF] px-3 py-1.5 rounded-lg border border-[#E0F2FE]">
                    <Text className="text-[10px] text-[#0369A1]" style={{ fontFamily: "Montserrat-SemiBold" }}>Hubungi</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Current Location Detail */}
              <View className="bg-white p-4 rounded-xl border border-[#E2E8F0]">
                <View className="flex-row items-center gap-2 mb-2">
                  <LocationPinIcon size={16} color="#0369A1" />
                  <Text className="text-[12px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Bold" }}>Lokasi Terkini</Text>
                </View>
                <Text className="text-[11px] text-[#64748B] leading-5" style={{ fontFamily: "Montserrat-Medium" }}>
                  {shipment.location}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
