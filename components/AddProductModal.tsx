import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	Modal,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import CalendarIcon from "./icons/CalendarIcon";
import CameraIcon from "./icons/CameraIcon";
import LocationPinIcon from "./icons/LocationPinIcon";

interface FormData {
	commodity: string;
	weight: string;
	date: string;
	price: string;
	condition: string;
    image: string | null;
    location: string;
    latitude: number | null;
    longitude: number | null;
}

interface AddProductModalProps {
	visible: boolean;
	onClose: () => void;
	onSubmit: () => void;
	formData: FormData;
	setFormData: (data: FormData) => void;
	commodities: string[];
	conditions: string[];
}

export default function AddProductModal({
	visible,
	onClose,
	onSubmit,
	formData,
	setFormData,
	commodities,
	conditions,
}: AddProductModalProps) {
	const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Filter commodities based on search text
    const filteredCommodities = commodities.filter(c => 
        c.toLowerCase().includes(searchText.toLowerCase()) && c !== "Pilih komoditas"
    );

    const handleSelectCommodity = (commodity: string) => {
        setFormData({ ...formData, commodity });
        setSearchText(commodity);
        setIsDropdownOpen(false);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData({ ...formData, image: result.assets[0].uri });
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, image: null });
    };

    const getCurrentLocation = async () => {
        setIsLoadingLocation(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Izin Ditolak", "Izin lokasi diperlukan untuk mencatat lokasi panen.");
                setIsLoadingLocation(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let address = "Lokasi Terpilih";
            
            try {
                let reverseGeocode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
                
                if (reverseGeocode.length > 0) {
                    const item = reverseGeocode[0];
                    address = `${item.street || ''} ${item.district || ''}, ${item.city || ''}`;
                }
            } catch (e) {
                console.log("Reverse geocoding failed", e);
            }

            setFormData({
                ...formData,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                location: address.trim() || "Lokasi Koordinat"
            });

        } catch (error) {
            Alert.alert("Error", "Gagal mengambil lokasi. Pastikan GPS aktif.");
        } finally {
            setIsLoadingLocation(false);
        }
    };

	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<View className="flex-1 bg-black/40">
				<View className="flex-1 items-center justify-center p-5">
					<View
						className="w-full bg-white rounded-3xl p-6"
						style={{ maxHeight: "90%" }}
					>
						<ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
							{/* Modal Header */}
							<View className="mb-6">
								<Text
									className="text-[18px] text-[#0E1B2A]"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Tambah Produk
								</Text>
								<Text
									className="text-[11px] text-[#94A3B8] mt-1"
									style={{ fontFamily: "Montserrat-Medium" }}
								>
									Isi data produk Anda untuk dicatat di blockchain
								</Text>
							</View>

							{/* Commodity Dropdown (Searchable) */}
							<View className="mb-4 z-50">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Pilih Komoditas
								</Text>
                                <View className="relative">
                                    <TextInput
                                        placeholder="Ketik nama komoditas..."
                                        placeholderTextColor="rgba(14, 27, 42, 0.4)"
                                        value={searchText}
                                        onChangeText={(text) => {
                                            setSearchText(text);
                                            setIsDropdownOpen(true);
                                            setFormData({ ...formData, commodity: "" });
                                        }}
                                        onFocus={() => setIsDropdownOpen(true)}
                                        className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px] bg-white"
                                        style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
                                    />
                                    
                                    {isDropdownOpen && filteredCommodities.length > 0 && (
                                        <View className="absolute top-full left-0 right-0 bg-white border border-[#E4E7EC] rounded-xl mt-1 max-h-40 z-50 shadow-sm">
                                            <ScrollView nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                                                {filteredCommodities.map((item, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => handleSelectCommodity(item)}
                                                        className={`px-4 py-3 border-b border-[#F1F5F9] ${index === filteredCommodities.length - 1 ? 'border-b-0' : ''}`}
                                                    >
                                                        <Text className="text-[11px] text-[#0E1B2A]" style={{ fontFamily: "Montserrat-Medium" }}>
                                                            {item}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </ScrollView>
                                        </View>
                                    )}
                                </View>
								
								{formData.commodity && formData.commodity !== "Pilih komoditas" && !isDropdownOpen && (
									<View className="mt-2 bg-[#f0fdf4] px-3 py-2 rounded-lg border border-[#10b981]">
										<Text
											className="text-[10px] text-[#10b981]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											Terpilih: {formData.commodity}
										</Text>
									</View>
								)}
							</View>

							{/* Weight Input */}
							<View className="mb-4">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Berat/Jumlah (kg)
								</Text>
								<TextInput
									placeholder="Contoh: 50"
									placeholderTextColor="rgba(14, 27, 42, 0.4)"
									value={formData.weight}
									onChangeText={(text) =>
										setFormData({ ...formData, weight: text })
									}
									keyboardType="decimal-pad"
									className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px]"
									style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
								/>
							</View>

							{/* Date Input */}
							<View className="mb-4">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Tanggal Panen
								</Text>
								<TouchableOpacity
									onPress={() => setShowDatePicker(true)}
									className="border border-[#E4E7EC] rounded-xl px-4 py-3 flex-row items-center justify-between"
								>
									<Text
										className="text-[12px]"
										style={{ 
											fontFamily: "Montserrat-Medium", 
											color: formData.date ? "#0E1B2A" : "rgba(14, 27, 42, 0.4)" 
										}}
									>
										{formData.date || "Pilih tanggal panen"}
									</Text>
									<CalendarIcon size={16} color="#94A3B8" />
								</TouchableOpacity>
								{showDatePicker && (
									<DateTimePicker
										value={selectedDate}
										mode="date"
										display="default"
										onChange={(event, date) => {
											setShowDatePicker(false);
											if (date) {
												setSelectedDate(date);
												const formattedDate = date.toLocaleDateString("id-ID", {
													day: "2-digit",
													month: "short",
													year: "numeric",
												});
												setFormData({ ...formData, date: formattedDate });
											}
										}}
										maximumDate={new Date()}
									/>
								)}
							</View>

                            {/* Location Input */}
                            <View className="mb-4">
                                <Text
                                    className="text-[12px] text-[#0E1B2A] mb-2"
                                    style={{ fontFamily: "Montserrat-SemiBold" }}
                                >
                                    Lokasi Panen
                                </Text>
                                <View className="flex-row gap-2">
                                    <TouchableOpacity
                                        onPress={getCurrentLocation}
                                        disabled={isLoadingLocation}
                                        className="flex-1 border border-[#10b981] bg-[#f0fdf4] rounded-xl px-4 py-3 flex-row items-center justify-center gap-2"
                                    >
                                        {isLoadingLocation ? (
                                            <ActivityIndicator size="small" color="#10b981" />
                                        ) : (
                                            <LocationPinIcon size={16} color="#10b981" />
                                        )}
                                        <Text className="text-[11px] text-[#10b981]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                                            {isLoadingLocation ? "Mengambil..." : "Ambil Lokasi"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {!!formData.latitude && !!formData.longitude && (
                                    <View className="mt-2 bg-[#f0fdf4] px-3 py-2 rounded-lg border border-[#10b981]">
                                        <View className="flex-row items-center gap-1">
                                            <LocationPinIcon size={12} color="#10b981" />
                                            <Text className="text-[10px] text-[#10b981]" style={{ fontFamily: "Montserrat-SemiBold" }}>
                                                {formData.location}
                                            </Text>
                                        </View>
                                        <Text className="text-[9px] text-[#10b981] mt-1" style={{ fontFamily: "Montserrat-Medium" }}>
                                            Koordinat: {formData.latitude?.toFixed(6)}, {formData.longitude?.toFixed(6)}
                                        </Text>
                                    </View>
                                )}
                            </View>

							{/* Price Input */}
							<View className="mb-4">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Harga per kg (Rp)
								</Text>
								<TextInput
									placeholder="Contoh: 50000"
									placeholderTextColor="rgba(14, 27, 42, 0.4)"
									value={formData.price}
									onChangeText={(text) =>
										setFormData({ ...formData, price: text })
									}
									keyboardType="numeric"
									className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px]"
									style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
								/>
							</View>

							{/* Condition Selector */}
							<View className="mb-4">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Kondisi Produk
								</Text>
								<View className="flex-row gap-2">
									{conditions.map((cond, index) => (
										<TouchableOpacity
											key={index}
											onPress={() =>
												setFormData({ ...formData, condition: cond })
											}
											className={`flex-1 py-3 rounded-xl border ${
												formData.condition === cond
													? "border-[#10b981] bg-[#f0fdf4]"
													: "border-[#E4E7EC] bg-white"
											}`}
										>
											<Text
												className={`text-[11px] text-center ${
													formData.condition === cond
														? "text-[#10b981]"
														: "text-[#64748B]"
												}`}
												style={{ fontFamily: "Montserrat-SemiBold" }}
											>
												{cond}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

                            {/* Image Upload */}
                            <View className="mb-6">
                                <Text
                                    className="text-[12px] text-[#0E1B2A] mb-2"
                                    style={{ fontFamily: "Montserrat-SemiBold" }}
                                >
                                    Foto Produk
                                </Text>
                                {formData.image ? (
                                    <View className="relative">
                                        <Image source={{ uri: formData.image }} style={{ width: '100%', height: 200, borderRadius: 12 }} />
                                        <TouchableOpacity
                                            onPress={removeImage}
                                            className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
                                        >
                                            <Text className="text-white text-[10px]" style={{ fontFamily: "Montserrat-Bold" }}>✕</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        className="border-2 border-dashed border-[#E4E7EC] rounded-xl py-8 items-center"
                                    >
                                        <View className="items-center gap-2">
                                            <CameraIcon size={32} color="#94A3B8" />
                                            <Text className="text-[11px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>
                                                Tap untuk upload foto
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>

							{/* Action Buttons */}
							<View className="flex-row gap-3">
								<TouchableOpacity
									onPress={onClose}
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
									onPress={onSubmit}
									className="flex-1 py-3 rounded-xl bg-[#10b981]"
								>
									<Text
										className="text-[12px] text-white text-center"
										style={{ fontFamily: "Montserrat-SemiBold" }}
									>
										Catat & Kunci Blockchain
									</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>
				</View>
			</View>
		</Modal>
	);
}
