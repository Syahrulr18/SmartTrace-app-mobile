import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AlertWarningIcon from "../../components/icons/AlertWarningIcon";
import CheckIcon from "../../components/icons/CheckIcon";
import CloseIcon from "../../components/icons/CloseIcon";
import LocationPinIcon from "../../components/icons/LocationPinIcon";
import ThermometerIcon from "../../components/icons/ThermometerIcon";
import { shadows } from "../../design/shadows";
import { colors, radius } from "../../design/theme";

interface CriticalAlert {
  id: string;
  type: "warning" | "error";
  shipmentId: string;
  product: string;
  risk: string;
  riskLevel: number;
  location: string;
  temperature?: number;
}

interface Shipment {
  id: string;
  status: "Hijau" | "Kuning" | "Merah";
  product: string;
  temperature: number;
  route: string;
  quality: number;
  date: string;
}

const DistributorHomeScreen = () => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  // Mock data
  const criticalAlerts: CriticalAlert[] = [
    {
      id: "ALERT-001",
      type: "error",
      shipmentId: "TRK-001",
      product: "Ikan Kembung",
      risk: "1 Pengiriman Berisiko",
      riskLevel: 1,
      location: "Jakarta - Bogor",
    },
  ];

  const realtimeShipments: Shipment[] = [
    {
      id: "TRK-001",
      status: "Hijau",
      product: "Ikan Kembung",
      quality: 98,
      temperature: 4,
      route: "Surabaya → Jakarta",
      date: "KM 120 Tol Surabaya-Jakarta",
    },
    {
      id: "TRK-002",
      status: "Kuning",
      product: "Kangkung",
      quality: 85,
      temperature: 12,
      route: "Malang → Bandung",
      date: "Kota Malang",
    },
  ];

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
      <ScrollView
        className="flex-1 bg-[#F5F6F9]"
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between">
          <View>
            <Image
              source={require("../../assets/logo-smarttrace/logo-dashbord.png")}
              style={{ width: 130, height: 46, resizeMode: "contain" }}
            />
          </View>

          <View className="flex-row items-center gap-2">
            <View className="items-end">
              <Text
                className="text-[13px]"
                style={{ color: "#0E1B2A", fontFamily: "Montserrat-Bold" }}
              >
                PT Logistik Segar
              </Text>
              <Text
                className="text-[11px]"
                style={{ color: "#94A3B8", fontFamily: "Montserrat-Medium" }}
              >
                Distributor/Logistik
              </Text>
            </View>
            <View className="w-10 h-10 rounded-full items-center justify-center">
              <Image
                source={require("../../assets/icon-role/logo-distributor.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
          </View>
        </View>

        {criticalAlerts.length > 0 && (
          <View className="px-6 pt-4 pb-2">
            <View
              className="rounded-2xl p-5 border-l-4"
              style={{
                backgroundColor: "#FEF2F2",
                borderLeftColor: "#EF4444",
              }}
            >
              <View className="flex-row items-start gap-3">
                <View>
                  <AlertWarningIcon size={28} color="#EF4444" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[13px] text-[#7F1D1D]"
                    style={{ fontFamily: "Montserrat-Bold" }}
                  >
                    Alert Kritis - Pengiriman Berisiko
                  </Text>
                  <Text
                    className="text-[11px] text-[#991B1B] mt-1"
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    {criticalAlerts[0].riskLevel} pengiriman memerlukan perhatian
                    segera. Suhu atau lokasi tidak sesuai parameter.
                  </Text>

                  <TouchableOpacity
                    className="mt-3 bg-[#EF4444] px-4 py-2 rounded-lg flex-row items-center"
                    style={{ width: "auto", alignSelf: "flex-start" }} 
                  >
                    <Text
                      className="text-white text-[11px]"
                      style={{ fontFamily: "Montserrat-SemiBold" }}
                    >
                      Lihat Detail →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        <View className="px-6 mt-6">
          <View
            style={[
              shadows.soft,
              {
                backgroundColor: colors.surface,
                borderRadius: radius.l,
              },
            ]}
            className="rounded-2xl px-5 py-5"
          >
            <Text
              className="text-[15px] text-[#0E1B2A] mb-4"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Monitoring Real-time
            </Text>
            <View
              className="rounded-2xl p-6 items-center justify-center border border-[#E4E7EC]"
              style={{ backgroundColor: "#F5F6F9", minHeight: 120 }}
            >
              <View className="mb-2">
                <LocationPinIcon size={32} color="#94A3B8" />
              </View>
              <Text
                className="text-[12px] text-[#94A3B8] text-center"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                Peta Interaktif GPS
              </Text>
              <Text
                className="text-[10px] text-[#C5CACE] text-center mt-1"
                style={{ fontFamily: "Montserrat-Medium" }}
              >
                Menampilkan lokasi semua armada secara real-time
              </Text>
            </View>
          </View>
        </View>


        <View className="px-6 mt-6">
          <View
            style={[
              shadows.soft,
              {
                backgroundColor: colors.surface,
                borderRadius: radius.l,
              },
            ]}
            className="rounded-2xl px-5 py-5"
          >
            <Text
              className="text-[15px] text-[#0E1B2A] mb-4"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Status Mutu Pengiriman
            </Text>

            <View className="gap-4">
              {realtimeShipments.map((shipment) => (
                <View
                  key={shipment.id}
                  className="bg-white rounded-2xl p-4 border border-[#E2E8F0]"
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View>
                      <Text
                        className="text-[10px] text-[#94A3B8]"
                        style={{ fontFamily: "Montserrat-Medium" }}
                      >
                        {shipment.id}
                      </Text>
                      <Text
                        className="text-[13px] text-[#0E1B2A] mt-1"
                        style={{ fontFamily: "Montserrat-SemiBold" }}
                      >
                        {shipment.product}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full border ${
                        shipment.status === "Hijau"
                          ? "bg-[#F0FDF4] border-[#10b981]"
                          : shipment.status === "Kuning"
                          ? "bg-[#FFFBEB] border-[#f59e0b]"
                          : "bg-[#FEF2F2] border-[#EF4444]"
                      }`}
                    >
                      <View 
                        className={`flex-row items-center gap-1`}
                      >
                        {shipment.status === "Hijau" ? (
                          <>
                            <CheckIcon size={12} color="#10b981" />
                            <Text
                              className={`text-[10px] text-[#10b981]`}
                              style={{ fontFamily: "Montserrat-SemiBold" }}
                            >
                              Aman
                            </Text>
                          </>
                        ) : shipment.status === "Kuning" ? (
                          <>
                            <AlertWarningIcon size={12} color="#f59e0b" />
                            <Text
                              className={`text-[10px] text-[#f59e0b]`}
                              style={{ fontFamily: "Montserrat-SemiBold" }}
                            >
							  Peringatan
                            </Text>
                          </>
                        ) : (
                          <>
                            <CloseIcon size={12} color="#EF4444" />
                            <Text
                              className={`text-[10px] text-[#EF4444]`}
                              style={{ fontFamily: "Montserrat-SemiBold" }}
                            >
                              Merah
                            </Text>
                          </>
                        )}
                      </View>
                    </View>
                  </View>

                  <View className="border-t border-[#E2E8F0] pt-3 gap-2">
                    <View className="flex-row justify-between">
                      <Text
                        className="text-[10px] text-[#94A3B8]"
                        style={{ fontFamily: "Montserrat-Medium" }}
                      >
                        Rute
                      </Text>
                      <Text
                        className="text-[10px] text-[#0F172A]"
                        style={{ fontFamily: "Montserrat-SemiBold" }}
                      >
                        {shipment.route}
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text
                        className="text-[10px] text-[#94A3B8]"
                        style={{ fontFamily: "Montserrat-Medium" }}
                      >
                        Lokasi Sekarang
                      </Text>
                      <View className="flex-row items-center gap-1">
                        <LocationPinIcon size={12} color="#0F172A" />
                        <Text
                          className="text-[10px] text-[#0F172A]"
                          style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                          {shipment.date}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row gap-2 mt-2">
                      <View className="flex-1 bg-[#F0F9FF] rounded-lg px-2 py-1 flex-row items-center gap-1">
                        <ThermometerIcon size={12} color="#0369A1" />
                        <Text
                          className="text-[9px] text-[#0369A1]"
                          style={{ fontFamily: "Montserrat-Medium" }}
                        >
                          {shipment.temperature}°C
                        </Text>
                      </View>
                      <View className="flex-1 bg-[#F0FDF4] rounded-lg px-2 py-1 flex-row items-center gap-1">
                        <CheckIcon size={12} color="#15803D" />
                        <Text
                          className="text-[9px] text-[#15803D]"
                          style={{ fontFamily: "Montserrat-Medium" }}
                        >
                          {shipment.quality}% Mutu
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="px-6 mt-6">
          <View
            style={[
              shadows.soft,
              {
                backgroundColor: colors.surface,
                borderRadius: radius.l,
              },
            ]}
            className="rounded-2xl px-5 py-5"
          >
            <Text
              className="text-[15px] text-[#0E1B2A] mb-4"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Metrik Performa
            </Text>

            <View className="gap-3">
              <View
                className="flex-row items-center justify-between rounded-2xl p-4 border border-[#E4E7EC]"
                style={{ backgroundColor: "#EFF6FF" }}
              >
                <Text
                  className="text-[12px] text-[#0369A1]"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  FLW Prevention
                </Text>
                <Text
                  className="text-[16px] text-[#0369A1]"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  92%
                </Text>
              </View>

              <View
                className="flex-row items-center justify-between rounded-2xl p-4 border border-[#E4E7EC]"
                style={{ backgroundColor: "#F0F9FF" }}
              >
                <Text
                  className="text-[12px] text-[#0C4A6E]"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  Total Pengiriman
                </Text>
                <Text
                  className="text-[16px] text-[#0C4A6E]"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  156
                </Text>
              </View>

              <View
                className="flex-row items-center justify-between rounded-2xl p-4 border border-[#E4E7EC]"
                style={{ backgroundColor: "#EFF6FF" }}
              >
                <Text
                  className="text-[12px] text-[#0369A1]"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  Armada Aktif
                </Text>
                <Text
                  className="text-[16px] text-[#0369A1]"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  12 Unit
                </Text>
              </View>

              <View
                className="flex-row items-center justify-between rounded-2xl p-4 border border-[#E4E7EC]"
                style={{ backgroundColor: "#F0F9FF" }}
              >
                <Text
                  className="text-[12px] text-[#0C4A6E]"
                  style={{ fontFamily: "Montserrat-Medium" }}
                >
                  Rata-rata Quality Score
                </Text>
                <Text
                  className="text-[16px] text-[#0C4A6E]"
                  style={{ fontFamily: "Montserrat-Bold" }}
                >
                  94%
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-6 mt-6">
          <View
            style={[
              shadows.soft,
              {
                backgroundColor: colors.surface,
                borderRadius: radius.l,
              },
            ]}
            className="rounded-2xl px-5 py-5"
          >
            <Text
              className="text-[15px] text-[#0E1B2A] mb-4"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Riwayat & Audit Blockchain
            </Text>

            <View className="gap-3">
              {[
                {
                  id: "A001",
                  status: "Sukses",
                  product: "Ikan Kembung",
                  quality: "98%",
                  date: "10/11/2024",
                },
                {
                  id: "A002",
                  status: "Warning",
                  product: "Tomat",
                  quality: "75%",
                  date: "8/11/2024",
                },
              ].map((audit) => (
                <TouchableOpacity
                  key={audit.id}
                  className="bg-white rounded-2xl p-4 border border-[#E2E8F0]"
                >
                  <View className="flex-row items-start justify-between">
                    <View>
                      <Text
                        className="text-[10px] text-[#94A3B8]"
                        style={{ fontFamily: "Montserrat-Medium" }}
                      >
                        ID: {audit.id}
                      </Text>
                      <Text
                        className="text-[12px] text-[#0E1B2A] mt-2"
                        style={{ fontFamily: "Montserrat-SemiBold" }}
                      >
                        {audit.product}
                      </Text>
                      <View
                        className="mt-2 px-2 py-1 rounded-lg flex-row items-center gap-1"
                        style={{
                          alignSelf: "flex-start",
                          backgroundColor:
                            audit.status === "Sukses"
                              ? "#F0FDF4"
                              : "#FFFBEB",
                        }}
                      >
                        {audit.status === "Sukses" ? (
                          <CheckIcon size={12} color="#15803D" />
                        ) : (
                          <AlertWarningIcon size={12} color="#B45309" />
                        )}
                        <Text
                          className={`text-[9px] ${
                            audit.status === "Sukses"
                              ? "text-[#15803D]"
                              : "text-[#B45309]"
                          }`}
                          style={{ fontFamily: "Montserrat-SemiBold" }}
                        >
                          {audit.status}
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text
                        className="text-[12px] text-[#10b981]"
                        style={{ fontFamily: "Montserrat-Bold" }}
                      >
                        {audit.quality}
                      </Text>
                      <Text
                        className="text-[9px] text-[#C5CACE] mt-2"
                        style={{ fontFamily: "Montserrat-Medium" }}
                      >
                        {audit.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DistributorHomeScreen;