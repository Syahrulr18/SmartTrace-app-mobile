import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowBackIcon from "../../components/icons/ArrowBackIcon";
import QrScanIcon from "../../components/icons/QrScanIcon";
import SearchIcon from "../../components/icons/SearchIcon";
import { shadows } from "../../design/shadows";
import { colors, radius } from "../../design/theme";
import { demoProducts } from "./data/demo-products";

const ConsumerQRScanScreen = () => {
  const navigation = useNavigation<any>(); // Hook navigasi
  const [manualProductId, setManualProductId] = useState<string>("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);

  // --- LOGIKA NAVIGASI KE PRODUCT DETAIL ---
  const handleScanProduct = (productId: string) => {
    setIsScannerOpen(false); // Tutup Modal Scanner
    setIsScanning(false);
    
    navigation.navigate("product-detail", { productId });
  };

  const handleManualSearch = () => {
    if (manualProductId) {
      const code = manualProductId.toUpperCase().trim();
      const validProduct = demoProducts.find((p) => p.id === code);

      if (validProduct) {
         handleScanProduct(code);
      } else {
         Alert.alert("Tidak Ditemukan", "ID Produk tidak valid atau tidak ditemukan dalam sistem.");
      }
    }
  };

  // --- LOGIKA BUKA SCANNER ---
  const openScanner = async () => {
    if (!permission) {
      Alert.alert("Memuat", "Sedang memeriksa status kamera...");
      return;
    }

    if (!permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert(
          "Izin Kamera Ditolak",
          "Aplikasi ini memerlukan akses kamera untuk memindai QR Code.",
          [
            { text: "Batal", style: "cancel" },
            { text: "Buka Pengaturan", onPress: () => Linking.openSettings() }
          ]
        );
        return;
      }
    }

    setIsScanning(false);
    setIsScannerOpen(true);
  };

  // --- LOGIKA TUTUP SCANNER ---
  const closeScanner = () => {
    setIsScannerOpen(false);
    setIsScanning(false);
  };

  const handleBarCodeScanned = ({ type, data }: any) => {
    if (isScanning) return;
    
    if (!data) {
      Alert.alert("Error", "QR Code tidak valid");
      return;
    }

    setIsScanning(true);
    const code: string = String(data).toUpperCase().trim();
    const validProduct = demoProducts.find((p) => p.id === code);
    
    if (validProduct) {
      handleScanProduct(code);
    } else {
      Alert.alert(
        "Produk Tidak Ditemukan",
        `QR Code: ${code}\n\nProduk ini tidak terdaftar dalam sistem demo.`,
        [
          { text: "Coba Lagi", onPress: () => setIsScanning(false) },
          { text: "Tutup", onPress: closeScanner },
        ]
      );
    }
  };

  // --- TAMPILAN UTAMA ---
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center bg-[#F5F6F9]">
        
        {/* Header Dashboard */}
        <View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between w-full">
          <View>
            <Image
              source={require("../../assets/logo-smarttrace/logo-dashbord.png")}
              style={{ width: 130, height: 46, resizeMode: "contain" }}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <View className="items-end">
              <Text className="text-[13px]" style={{ color: "#0E1B2A", fontFamily: "Montserrat-Bold" }}>
                Muh Nabil Qastary
              </Text>
              <Text className="text-[11px]" style={{ color: "#94A3B8", fontFamily: "Montserrat-Medium" }}>
                Konsumen
              </Text>
            </View>
            <View className="w-10 h-10 rounded-full items-center justify-center">
              <Image
                source={require("../../assets/icon-role/logo-konsumen.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
          </View>
        </View>

        <ScrollView
          className="flex-1 w-full"
          contentContainerClassName="pb-20 px-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full items-center justify-center mt-6">
            <Text className="text-[15px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Bold" }}>
              Pindai QR Code
            </Text>
          </View>

          {/* Tombol Buka Scanner */}
          <TouchableOpacity
            onPress={openScanner}
            style={[shadows.soft, { backgroundColor: colors.surface, borderRadius: radius.l }]}
            className="rounded-2xl items-center justify-center p-6 mt-6 w-full"
          >
            <View className="w-64 h-64 items-center justify-center">
              <QrScanIcon size={120} />
              <Text className="text-[12px] text-[#0E1B2A] text-center mt-4" style={{ fontFamily: "Montserrat-SemiBold" }}>
                Ketuk untuk Memindai
              </Text>
              <Text className="text-[10px] text-[#94A3B8] text-center mt-1" style={{ fontFamily: "Montserrat-Medium" }}>
                (Gunakan kamera untuk memindai QR)
              </Text>
            </View>
          </TouchableOpacity>

          {/* Input Manual */}
          <View style={[shadows.soft, { backgroundColor: colors.surface, borderRadius: radius.l }]} className="rounded-2xl p-5 mt-6">
            <Text className="text-[15px] text-[#0E1B2A] mb-4" style={{ fontFamily: "Montserrat-Bold" }}>
              Lacak produk dengan ID Manual
            </Text>
            <TextInput
              className="border border-[#E2E8F0] rounded-lg p-3 text-[12px] text-[#0E1B2A]"
              style={{ fontFamily: "Montserrat-Medium" }}
              placeholder="Contoh: A001"
              placeholderTextColor="#94A3B8"
              value={manualProductId}
              onChangeText={setManualProductId}
            />
            <TouchableOpacity
              onPress={handleManualSearch}
              className="bg-white border border-[#E2E8F0] rounded-xl py-3 flex-row items-center justify-center gap-2 mt-4"
            >
              <SearchIcon color="#0E1B2A" />
              <Text className="text-[#0E1B2A] text-center text-[12px]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                Lacak Sekarang
              </Text>
            </TouchableOpacity>
          </View>
          
           {/* List Produk Demo */}
           <View className="w-full mt-6">
            <Text className="text-[11px] text-[#94A3B8] mb-3" style={{ fontFamily: "Montserrat-SemiBold" }}>
              Contoh produk demo:
            </Text>
            <View className="gap-2">
              {demoProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => handleScanProduct(product.id)}
                  className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex-row items-center justify-between"
                >
                  <View>
                    <Text className="text-[9px] text-[#94A3B8]" style={{ fontFamily: "Montserrat-Medium" }}>ID: {product.id}</Text>
                    <Text className="text-[12px] text-[#0E1B2A] mt-1" style={{ fontFamily: "Montserrat-Bold" }}>{product.name}</Text>
                  </View>
                  <Text className="text-lg">›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* --- MODAL SCANNER --- */}
        <Modal
          visible={isScannerOpen && permission?.granted}
          animationType="slide"
          transparent={false}
          onRequestClose={closeScanner}
        >
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          >
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
              <View className="px-6 pt-4 w-full flex-row items-center justify-between z-50">
                <TouchableOpacity
                  onPress={closeScanner}
                  className="w-10 h-10 rounded-full bg-white/20 items-center justify-center backdrop-blur-md border border-white/10"
                >
                  <ArrowBackIcon size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-[16px]" style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 }}>
                  Scan QR Code
                </Text>
                <View className="w-10" /> 
              </View>

              <View className="flex-1 justify-center items-center">
                <View style={{ width: 280, height: 280, backgroundColor: "rgba(245, 158, 11, 0.05)", justifyContent: "center", alignItems: "center" }}>
                  {/* Frame Sudut */}
                  <View className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white -mt-1 -ml-1 rounded-tl-xl" />
                  <View className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white -mt-1 -mr-1 rounded-tr-xl" />
                  <View className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white -mb-1 -ml-1 rounded-bl-xl" />
                  <View className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white -mb-1 -mr-1 rounded-br-xl" />
                  
                  {isScanning && <ActivityIndicator size="large" color="#F59E0B" />}
                </View>
                <Text className="text-white mt-8 text-center bg-black/40 px-6 py-3 rounded-full overflow-hidden text-[13px]" style={{ fontFamily: "Montserrat-Medium" }}>
                  Arahkan kamera ke QR Code produk
                </Text>
              </View>
            </SafeAreaView>
          </CameraView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ConsumerQRScanScreen;