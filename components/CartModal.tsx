import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { shadows } from "../design/shadows";
import CloseIcon from "./icons/CloseIcon";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number; // Quantity purchased
  seller: string;
  image: any;
  date: string;
  bankAccount: string;
}

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onCheckout: () => void;
}

export default function CartModal({ visible, onClose, cartItems, onCheckout }: CartModalProps) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [paymentProof, setPaymentProof] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPaymentProof(result.assets[0].uri);
    }
  };

  const handleCheckout = () => {
    if (!paymentProof) {
      Alert.alert("Peringatan", "Mohon upload bukti transfer terlebih dahulu");
      return;
    }
    onCheckout();
    setPaymentProof(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl h-[85%]">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
            <Text
              className="text-[16px] text-[#0E1B2A]"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Keranjang Belanja
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center bg-[#F1F5F9] rounded-full"
            >
              <CloseIcon size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1 px-6 pt-4"
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-24"
          >
            {cartItems.length === 0 ? (
              <View className="items-center justify-center py-10">
                <Text
                  className="text-[12px] text-[#94A3B8]"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  Keranjang belanja kosong
                </Text>
              </View>
            ) : (
              <>
                <Text
                  className="text-[12px] text-[#64748B] mb-4"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  Daftar barang yang telah dibeli dari Petani/Nelayan
                </Text>

                <View className="gap-4">
                  {cartItems.map((item, index) => (
                    <View
                      key={`${item.id}-${index}`}
                      className="bg-white rounded-2xl p-3 border border-[#E2E8F0] flex-row gap-3"
                      style={shadows.soft}
                    >
                      {item.image && (
                        <Image
                          source={item.image}
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 12,
                            resizeMode: "cover",
                          }}
                        />
                      )}
                      <View className="flex-1 justify-between py-1">
                        <View>
                          <Text
                            className="text-[13px] text-[#0E1B2A]"
                            style={{ fontFamily: "Montserrat-SemiBold" }}
                            numberOfLines={1}
                          >
                            {item.name}
                          </Text>
                          <Text
                            className="text-[10px] text-[#64748B] mt-0.5"
                            style={{ fontFamily: "Montserrat-Medium" }}
                          >
                            {item.seller}
                          </Text>
                          <Text
                            className="text-[10px] text-[#0369A1] mt-1"
                            style={{ fontFamily: "Montserrat-Medium" }}
                          >
                            Transfer ke: {item.bankAccount}
                          </Text>
                        </View>
                        
                        <View className="flex-row items-end justify-between">
                          <View>
                            <Text
                              className="text-[10px] text-[#94A3B8]"
                              style={{ fontFamily: "Montserrat-Medium" }}
                            >
                              {item.quantity} kg x Rp {item.price.toLocaleString("id-ID")}
                            </Text>
                            <Text
                              className="text-[12px] text-[#0369A1] mt-0.5"
                              style={{ fontFamily: "Montserrat-Bold" }}
                            >
                              Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                            </Text>
                          </View>
                          <Text
                             className="text-[9px] text-[#94A3B8]"
                             style={{ fontFamily: "Montserrat-Medium" }}
                          >
                            {item.date}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Payment Proof Upload */}
                <View className="mt-6 bg-white rounded-2xl p-4 border border-[#E2E8F0]">
                  <Text
                    className="text-[13px] text-[#0E1B2A] mb-3"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    Bukti Transfer
                  </Text>
                  
                  {paymentProof ? (
                    <View>
                      <Image 
                        source={{ uri: paymentProof }} 
                        className="w-full h-40 rounded-xl mb-3"
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        onPress={() => setPaymentProof(null)}
                        className="bg-[#FEF2F2] py-2 rounded-lg items-center border border-[#EF4444]"
                      >
                        <Text className="text-[#EF4444] text-[12px]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                          Hapus Foto
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={pickImage}
                      className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-6 items-center justify-center bg-[#F8FAFC]"
                    >
                      <View className="w-10 h-10 bg-[#E0F2FE] rounded-full items-center justify-center mb-2">
                        <CloseIcon size={20} color="#0369A1" /> 
                      </View>
                      <Text
                        className="text-[12px] text-[#64748B]"
                        style={{ fontFamily: "Montserrat-Medium" }}
                      >
                        Tap untuk upload bukti transfer
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </ScrollView>

          {/* Footer Total */}
          <View
            className="px-6 py-4 border-t border-[#E2E8F0] bg-white"
            style={{ paddingBottom: 30 }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text
                className="text-[13px] text-[#64748B]"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                Total Pembelian
              </Text>
              <Text
                className="text-[18px] text-[#0E1B2A]"
                style={{ fontFamily: "Montserrat-Bold" }}
              >
                Rp {totalAmount.toLocaleString("id-ID")}
              </Text>
            </View>
            <TouchableOpacity
              className={`py-3.5 rounded-xl items-center ${cartItems.length === 0 ? 'bg-[#94A3B8]' : 'bg-[#0369A1]'}`}
              onPress={handleCheckout}
              disabled={cartItems.length === 0}
            >
              <Text
                className="text-white text-[14px]"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
