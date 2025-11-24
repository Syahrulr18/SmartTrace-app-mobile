import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { shadows } from "../design/shadows";
import ArrowDownIcon from "./icons/ArrowDownIcon";
import CheckIcon from "./icons/CheckIcon";
import CloseIcon from "./icons/CloseIcon";
import LocationPinIcon from "./icons/LocationPinIcon";
import PrinterIcon from "./icons/PrinterIcon";
import LocationPickerModal from "./LocationPickerModal";

interface AddShipmentModalProps {
  visible: boolean;
  onClose: () => void;
}

// Mock purchased products
const PURCHASED_PRODUCTS = [
  { id: "PROD-001", name: "Ikan Kembung Segar", supplier: "Nelayan Bima", qty: "50 kg" },
  { id: "PROD-002", name: "Udang Vaname", supplier: "Tambak Sejahtera", qty: "100 kg" },
  { id: "PROD-003", name: "Cumi-Cumi", supplier: "Nelayan Bajo", qty: "30 kg" },
];

export default function AddShipmentModal({
  visible,
  onClose,
}: AddShipmentModalProps) {
  const [step, setStep] = useState(1); // 1: Details, 2: QR Generation
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [childQrQty, setChildQrQty] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  // Map Picker State
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState<'start' | 'end'>('start');

  const handleNext = () => {
    if (step === 1 && selectedProduct && startLocation && endLocation) {
      setStep(2);
    } else if (step === 2) {
      // Submit logic here
      onClose();
      // Reset state
      setStep(1);
      setSelectedProduct(null);
      setStartLocation("");
      setEndLocation("");
      setChildQrQty("");
      setIsGenerated(false);
    }
  };

  const handleGenerate = () => {
    if (childQrQty) {
      setIsGenerated(true);
    }
  };

  const openPicker = (mode: 'start' | 'end') => {
    setPickerMode(mode);
    setPickerVisible(true);
  };

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    if (pickerMode === 'start') {
      setStartLocation(location.address);
    } else {
      setEndLocation(location.address);
    }
    setPickerVisible(false);
  };

  const renderStep1 = () => (
    <View className="gap-4">
      {/* Product Selection */}
      <View>
        <Text className="text-[12px] text-[#0E1B2A] mb-2" style={{ fontFamily: "Montserrat-Bold" }}>
          Pilih Produk
        </Text>
        <View className="gap-2">
          {PURCHASED_PRODUCTS.map((prod) => (
            <TouchableOpacity
              key={prod.id}
              onPress={() => setSelectedProduct(prod.id)}
              className={`p-3 rounded-xl border flex-row items-center justify-between ${
                selectedProduct === prod.id
                  ? "bg-[#F0F9FF] border-[#0369A1]"
                  : "bg-white border-[#E2E8F0]"
              }`}
            >
              <View>
                <Text className="text-[12px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                  {prod.name}
                </Text>
                <Text className="text-[10px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>
                  {prod.supplier} • {prod.qty}
                </Text>
              </View>
              {selectedProduct === prod.id && (
                <View className="w-5 h-5 bg-[#0369A1] rounded-full items-center justify-center">
                  <CheckIcon size={12} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Route Input */}
      <View>
        <Text className="text-[12px] text-[#0E1B2A] mb-2" style={{ fontFamily: "Montserrat-Bold" }}>
          Rute Pengiriman
        </Text>
        <View className="gap-3">
          <TouchableOpacity 
            onPress={() => openPicker('start')}
            className="flex-row items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-3 py-3"
          >
            <View className="w-2 h-2 rounded-full bg-[#0369A1]" />
            <Text 
                className={`flex-1 text-[12px] ${startLocation ? "text-[#0E1B2A]" : "text-[#94A3B8]"}`}
                style={{ fontFamily: "Montserrat-Medium" }}
                numberOfLines={1}
            >
                {startLocation || "Pilih Lokasi Pemanenan (Asal)"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => openPicker('end')}
            className="flex-row items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-3 py-3"
          >
            <LocationPinIcon size={16} color="#DC2626" />
            <Text 
                className={`flex-1 text-[12px] ${endLocation ? "text-[#0E1B2A]" : "text-[#94A3B8]"}`}
                style={{ fontFamily: "Montserrat-Medium" }}
                numberOfLines={1}
            >
                {endLocation || "Pilih Lokasi Tujuan"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View className="gap-6">
      {/* Logic Explanation */}
      <View className="bg-[#F0F9FF] p-4 rounded-xl border border-[#E0F2FE]">
        <Text className="text-[11px] text-[#0369A1] leading-5" style={{ fontFamily: "Montserrat-Medium" }}>
          QR Code Induk (Master Batch) akan dipecah menjadi unit-unit kecil (QR Anak). 
          Data kualitas dan sensor dari Induk akan diwariskan ke setiap QR Anak.
        </Text>
      </View>

      {/* Parent QR Display */}
      <View className="items-center">
        <View className="w-24 h-24 bg-white border-2 border-[#0E1B2A] rounded-xl items-center justify-center mb-2 overflow-hidden">
           <Image 
             source={{ uri: `https://quickchart.io/qr?text=${selectedProduct || 'UNKNOWN'}&size=200` }}
             style={{ width: 80, height: 80 }}
             resizeMode="contain"
           />
        </View>
        <Text className="text-[12px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Bold" }}>
          QR INDUK (Dari Petani)
        </Text>
        <Text className="text-[10px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>
          ID: {selectedProduct}
        </Text>
      </View>

      {/* Arrow Down */}
      <View className="items-center -my-2">
        <ArrowDownIcon size={24} color="#94A3B8" />
      </View>

      {/* Child QR Generation */}
      <View className="bg-white p-4 pb-20 rounded-xl border border-[#E2E8F0]" style={shadows.soft}>
        <Text className="text-[12px] text-[#0E1B2A] mb-3" style={{ fontFamily: "Montserrat-Bold" }}>
          Pecah ke Unit Retail (QR Anak)
        </Text>
        
        <View className="flex-row items-end gap-3">
          <View className="flex-1">
            <Text className="text-[10px] text-[#64748B] mb-1" style={{ fontFamily: "Montserrat-Medium" }}>
              Jumlah Pecahan (Unit)
            </Text>
            <TextInput
              placeholder="Contoh: 50"
              keyboardType="numeric"
              value={childQrQty}
              onChangeText={setChildQrQty}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 py-2 text-[12px] text-[#0E1B2A]"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            />
          </View>
          <TouchableOpacity
            onPress={handleGenerate}
            disabled={!childQrQty}
            className={`px-4 py-2 rounded-lg ${
              childQrQty ? "bg-[#0E1B2A]" : "bg-[#E2E8F0]"
            }`}
          >
            <Text className={`text-[11px] ${childQrQty ? "text-white" : "text-[#94A3B8]"}`} style={{ fontFamily: "Montserrat-SemiBold" }}>
              Generate
            </Text>
          </TouchableOpacity>
        </View>

        {isGenerated && (
          <View className="mt-4 pt-4 border-t border-[#E2E8F0]">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-2">
                <CheckIcon size={16} color="#15803D" />
                <Text className="text-[11px] text-[#15803D]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                  {childQrQty} QR Anak Siap Dicetak
                </Text>
              </View>
            </View>
            
            <View className="flex-row gap-2 flex-wrap justify-center bg-[#F8FAFC] p-3 rounded-lg border border-dashed border-[#CBD5E1]">
               {/* Visual representation of multiple QRs */}
               {[1,2,3,4,5].map(i => (
                 <View key={i} className="w-10 h-10 bg-white border border-[#94A3B8] rounded items-center justify-center overflow-hidden">
                    <Image 
                      source={{ uri: `https://quickchart.io/qr?text=${selectedProduct}-CHILD-${i}&size=100` }}
                      style={{ width: 36, height: 36 }}
                      resizeMode="contain"
                    />
                 </View>
               ))}
               <Text className="self-center text-[10px] text-[#64748B] ml-1">+{parseInt(childQrQty || "0") - 5} lainnya</Text>
            </View>

            <TouchableOpacity className="mt-3 w-full bg-[#EFF6FF] border border-[#BFDBFE] py-2 rounded-lg items-center flex-row justify-center gap-2">
              <PrinterIcon size={16} color="#0369A1" />
              <Text className="text-[11px] text-[#0369A1]" style={{ fontFamily: "Montserrat-Bold" }}>
                Cetak Semua QR Anak
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl h-[85%] overflow-hidden">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-white z-10">
            <View>
              <Text
                className="text-[16px] text-[#0E1B2A]"
                style={{ fontFamily: "Montserrat-Bold" }}
              >
                {step === 1 ? "Tambah Pengiriman" : "Generate QR Retail"}
              </Text>
              <Text
                className="text-[11px] text-[#64748B]"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                Langkah {step} dari 2
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
            className="flex-1 bg-[#F5F6F9] px-6 py-6"
            showsVerticalScrollIndicator={false}
          >
            {step === 1 ? renderStep1() : renderStep2()}
          </ScrollView>

          {/* Footer Action */}
          <View className="p-6 bg-white border-t border-[#E2E8F0]">
            <TouchableOpacity
              onPress={handleNext}
              disabled={step === 1 && (!selectedProduct || !startLocation || !endLocation)}
              className={`w-full py-3.5 rounded-xl items-center ${
                (step === 1 && (!selectedProduct || !startLocation || !endLocation))
                  ? "bg-[#E2E8F0]"
                  : "bg-[#0E1B2A]"
              }`}
            >
              <Text className={`text-[14px] ${
                 (step === 1 && (!selectedProduct || !startLocation || !endLocation))
                 ? "text-[#94A3B8]"
                 : "text-white"
              }`} style={{ fontFamily: "Montserrat-Bold" }}>
                {step === 1 ? "Lanjut ke QR Code" : "Simpan & Selesai"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <LocationPickerModal
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSelectLocation={handleLocationSelect}
        title={pickerMode === 'start' ? "Pilih Lokasi Asal" : "Pilih Lokasi Tujuan"}
      />
    </Modal>
  );
}
