import { useState } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import CloseIcon from './icons/CloseIcon';

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (location: { lat: number; lng: number; address: string }) => void;
  title?: string;
}

export default function LocationPickerModal({
  visible,
  onClose,
  onSelectLocation,
  title = "Pilih Lokasi"
}: LocationPickerModalProps) {
  const [loading, setLoading] = useState(true);

  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100%; height: 100vh; }
          .leaflet-control-container .leaflet-routing-container-hide {
            display: none;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([-6.2088, 106.8456], 13); // Default Jakarta
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          var marker;

          map.on('click', function(e) {
            if (marker) {
              map.removeLayer(marker);
            }
            marker = L.marker(e.latlng).addTo(map);
            
            // Reverse geocoding using Nominatim
            fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng)
              .then(response => response.json())
              .then(data => {
                var address = data.display_name || "Lokasi Terpilih";
                // Send data back to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'selection',
                  lat: e.latlng.lat,
                  lng: e.latlng.lng,
                  address: address
                }));
              })
              .catch(err => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'selection',
                  lat: e.latlng.lat,
                  lng: e.latlng.lng,
                  address: "Koordinat: " + e.latlng.lat.toFixed(4) + ", " + e.latlng.lng.toFixed(4)
                }));
              });
          });
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'selection') {
        onSelectLocation({
          lat: data.lat,
          lng: data.lng,
          address: data.address
        });
      }
    } catch (error) {
      console.error("Error parsing map message", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-4 border-b border-[#E2E8F0] bg-white z-10" style={{ paddingTop: 50 }}>
            <View>
                <Text className="text-[16px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Bold" }}>
                    {title}
                </Text>
                <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>
                    Ketuk peta untuk memilih lokasi
                </Text>
            </View>
            <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 items-center justify-center bg-[#F1F5F9] rounded-full"
            >
                <CloseIcon size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* Map */}
        <View className="flex-1 relative">
            <WebView
                originWhitelist={["*"]}
                source={{ html: mapHtml }}
                style={{ flex: 1 }}
                onMessage={handleMessage}
                onLoadEnd={() => setLoading(false)}
            />
            {loading && (
                <View className="absolute inset-0 items-center justify-center bg-white">
                    <ActivityIndicator size="large" color="#0E1B2A" />
                </View>
            )}
        </View>
      </View>
    </Modal>
  );
}
