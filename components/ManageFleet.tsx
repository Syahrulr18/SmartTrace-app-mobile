import { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useFleet } from "../context/FleetContext";
import { shadows } from "../design/shadows";
import { colors, radius } from "../design/theme";
import CloseIcon from "./icons/CloseIcon";
import PlusIcon from "./icons/PlusIcon";
import TruckIcon from "./icons/TruckIcon";

const ManageFleet = () => {
  const { fleets, addFleet, deleteFleet } = useFleet();
  const [newFleetName, setNewFleetName] = useState("");
  const [newDriverName, setNewDriverName] = useState("");
  const [newDriverPhone, setNewDriverPhone] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddFleet = () => {
    if (newFleetName.trim() && newDriverName.trim() && newDriverPhone.trim()) {
      const newFleet = {
        id: Date.now().toString(),
        name: newFleetName,
        driverName: newDriverName,
        driverPhone: newDriverPhone,
        driverId: "driver-" + Date.now(),
        status: "Idle" as const,
      };
      addFleet(newFleet);
      setNewFleetName("");
      setNewDriverName("");
      setNewDriverPhone("");
      setIsModalVisible(false);
    }
  };

  const handleDeleteFleet = (id: string) => {
    deleteFleet(id);
  };

  return (
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
        <View className="flex-row items-center justify-between mb-4">
          <Text
            className="text-[15px] text-[#0E1B2A]"
            style={{ fontFamily: "Montserrat-Bold" }}
          >
            Kelola Armada
          </Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            className="bg-[#0C4A6E] px-3 py-1.5 rounded-lg flex-row items-center gap-1"
          >
            <PlusIcon width={14} height={14} color="#FFFFFF" />
            <Text
              className="text-[10px] text-white"
              style={{ fontFamily: "Montserrat-SemiBold" }}
            >
              Tambah
            </Text>
          </TouchableOpacity>
        </View>

        {/* Fleet List */}
        <View className="gap-3">
          {fleets.map((fleet) => (
            <View
              key={fleet.id}
              className="flex-row items-center justify-between bg-white p-3 rounded-xl border border-[#F1F5F9]"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 bg-[#F0F9FF] rounded-full items-center justify-center">
                  <TruckIcon size={20} color="#0369A1" />
                </View>
                <View>
                  <Text
                    className="text-[12px] text-[#0E1B2A]"
                    style={{ fontFamily: "Montserrat-SemiBold" }}
                  >
                    {fleet.name}
                  </Text>
                  <Text
                    className="text-[10px] text-[#64748B] mt-0.5"
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    {fleet.driverName} • {fleet.driverPhone}
                  </Text>
                  <Text
                    className={`text-[10px] mt-0.5 ${
                      fleet.status === "Aktif"
                        ? "text-[#10b981]"
                        : "text-[#94A3B8]"
                    }`}
                    style={{ fontFamily: "Montserrat-Medium" }}
                  >
                    {fleet.status}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity
                onPress={() => handleDeleteFleet(fleet.id)}
                className="w-8 h-8 items-center justify-center rounded-full bg-[#FEF2F2]"
              >
                <CloseIcon size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
          
          {fleets.length === 0 && (
            <Text
              className="text-[12px] text-[#94A3B8] text-center py-4"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Belum ada armada terdaftar
            </Text>
          )}
        </View>
      </View>

      {/* Add Fleet Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 items-center justify-center p-5">
          <View className="w-full bg-white rounded-3xl p-6">
            <Text
              className="text-[16px] text-[#0E1B2A] mb-1"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Tambah Armada Baru
            </Text>
            <Text
              className="text-[11px] text-[#94A3B8] mb-4"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Masukkan detail armada baru Anda
            </Text>

            <View className="mb-6">
              <Text
                className="text-[12px] text-[#0E1B2A] mb-2"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                Nama Armada / Plat Nomor
              </Text>
              <TextInput
                placeholder="Contoh: Truck A - B 1234 CD"
                value={newFleetName}
                onChangeText={setNewFleetName}
                className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px] text-[#0E1B2A]"
                style={{ fontFamily: "Montserrat-Medium" }}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View className="mb-6">
              <Text
                className="text-[12px] text-[#0E1B2A] mb-2"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                Nama Pengemudi
              </Text>
              <TextInput
                placeholder="Contoh: Budi Santoso"
                value={newDriverName}
                onChangeText={setNewDriverName}
                className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px] text-[#0E1B2A]"
                style={{ fontFamily: "Montserrat-Medium" }}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View className="mb-6">
              <Text
                className="text-[12px] text-[#0E1B2A] mb-2"
                style={{ fontFamily: "Montserrat-SemiBold" }}
              >
                No Telepon
              </Text>
              <TextInput
                placeholder="Contoh: 08123456789"
                value={newDriverPhone}
                onChangeText={setNewDriverPhone}
                keyboardType="phone-pad"
                className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px] text-[#0E1B2A]"
                style={{ fontFamily: "Montserrat-Medium" }}
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="flex-1 py-3 rounded-xl border border-[#E4E7EC]"
              >
                <Text
                  className="text-[12px] text-[#64748B] text-center"
                  style={{ fontFamily: "Montserrat-SemiBold" }}
                >
                  Batal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddFleet}
                className="flex-1 py-3 rounded-xl bg-[#0C4A6E]"
              >
                <Text
                  className="text-[12px] text-white text-center"
                  style={{ fontFamily: "Montserrat-SemiBold" }}
                >
                  Simpan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManageFleet;
