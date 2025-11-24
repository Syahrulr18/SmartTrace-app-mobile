import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton";
import SmartInput from "../../components/SmartInput";
import CalendarIcon from "../../components/icons/CalendarIcon";
import LocationPinIcon from "../../components/icons/LocationPinIcon";

export default function ProfileEditScreen() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const role = params.role as string;

	// Mock initial data based on role
	const getInitialData = () => {
		if (role === "petani") {
			return {
				name: "Budi Santoso",
				dob: "1 Januari 1976",
				gender: "Pria",
				location: "Lokasi",
				phone: "+62 812 3456 7890",
				email: "budisantoso76@gmail.com",
			};
		} else if (role === "distributor") {
			return {
				name: "Pak Rian",
				dob: "12 Mei 1980",
				gender: "Pria",
				location: "Makassar, Sulawesi Selatan",
				phone: "+62 813 4455 6677",
				email: "rian.logistik@gmail.com",
			};
		} else {
			return {
				name: "Nama Pembeli",
				dob: "20 Agustus 1990",
				gender: "Wanita",
				location: "Jakarta Selatan",
				phone: "+62 811 2233 4455",
				email: "pembeli@email.com",
			};
		}
	};

	const [formData, setFormData] = useState(getInitialData());
	const [isLoadingLocation, setIsLoadingLocation] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const getCurrentLocation = async () => {
		setIsLoadingLocation(true);
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				Alert.alert("Izin Ditolak", "Izin lokasi diperlukan untuk mencatat lokasi.");
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
					address = `${item.city || item.district || ''}, ${item.region || ''}`;
				}
			} catch (e) {
				console.log("Reverse geocoding failed", e);
			}

			setFormData({ ...formData, location: address.trim() || "Lokasi Terpilih" });
		} catch (error) {
			Alert.alert("Error", "Gagal mengambil lokasi. Pastikan GPS aktif.");
		} finally {
			setIsLoadingLocation(false);
		}
	};

	const pickProfileImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
		}
	};

	const handleSave = () => {
		Alert.alert("Sukses", "Profil berhasil diperbarui", [
			{ text: "OK", onPress: () => router.back() },
		]);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="flex-row items-center px-6 py-4 border-b border-gray-100">
				<TouchableOpacity onPress={() => router.back()} className="mr-4">
					<Ionicons name="chevron-back" size={24} color="#0E1B2A" />
				</TouchableOpacity>
				<Text
					className="text-[16px] flex-1 text-center mr-8 text-[#0E1B2A]"
					style={{ fontFamily: "Montserrat-Bold" }}
				>
					Profil Saya
				</Text>
			</View>

			<ScrollView
				className="flex-1 px-6"
				showsVerticalScrollIndicator={false}
				contentContainerClassName="pb-10"
			>
				{/* Profile Image */}
				<View className="items-center mt-6 mb-8">
					<View className="relative">
						<View className="w-24 h-24 rounded-full overflow-hidden">
							<Image
								source={{
									uri: profileImage || "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
								}}
								style={{ width: "100%", height: "100%" }}
							/>
						</View>
						<TouchableOpacity onPress={pickProfileImage} className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
							<Ionicons name="camera-outline" size={16} color="#3b82f6" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Form Fields */}
				<View className="gap-5">
					<View>
						<Text
							className="text-[14px] text-[#0E1B2A] mb-4"
							style={{ fontFamily: "Montserrat-Bold" }}
						>
							Detail Profil
						</Text>

						<View className="gap-4">
							<View>
								<Text
									className="text-[12px] text-[#94A3B8] mb-2"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Nama Lengkap
								</Text>
								<SmartInput
									value={formData.name}
									onChangeText={(text) =>
										setFormData({ ...formData, name: text })
									}
								/>
							</View>

							<View>
								<Text
									className="text-[12px] text-[#94A3B8] mb-2"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Tanggal Lahir
								</Text>
								<TouchableOpacity 
									onPress={() => setShowDatePicker(true)}
									className="flex-row items-center justify-between border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white"
								>
									<Text
										className="text-[12px] text-[#0E1B2A]"
										style={{ fontFamily: "Montserrat-Medium" }}
									>
										{formData.dob}
									</Text>
									<Text style={{ fontSize: 16 }}><CalendarIcon size={16} color="#94A3B8" /></Text>
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
													day: "numeric",
													month: "long",
													year: "numeric",
												});
												setFormData({ ...formData, dob: formattedDate });
											}
										}}
										maximumDate={new Date()}
									/>
								)}
							</View>

							<View>
								<Text
									className="text-[12px] text-[#94A3B8] mb-2"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Jenis Kelamin
								</Text>
								<View className="flex-row gap-4">
									<TouchableOpacity
										onPress={() => setFormData({ ...formData, gender: "Pria" })}
										className="flex-1 flex-row items-center gap-3 border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white"
									>
										<View
											className={`w-4 h-4 rounded-full border items-center justify-center ${
												formData.gender === "Pria"
													? "border-[#3b82f6]"
													: "border-[#94A3B8]"
											}`}
										>
											{formData.gender === "Pria" && (
												<View className="w-2 h-2 rounded-full bg-[#3b82f6]" />
											)}
										</View>
										<Text
											className="text-[14px] text-[#0E1B2A]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											Pria
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setFormData({ ...formData, gender: "Wanita" })}
										className="flex-1 flex-row items-center gap-3 border border-[#E2E8F0] rounded-xl px-4 py-3 bg-white"
									>
										<View
											className={`w-4 h-4 rounded-full border items-center justify-center ${
												formData.gender === "Wanita"
													? "border-[#3b82f6]"
													: "border-[#94A3B8]"
											}`}
										>
											{formData.gender === "Wanita" && (
												<View className="w-2 h-2 rounded-full bg-[#3b82f6]" />
											)}
										</View>
										<Text
											className="text-[14px] text-[#0E1B2A]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											Wanita
										</Text>
									</TouchableOpacity>
								</View>
							</View>

							<View>
								<Text
									className="text-[12px] text-[#94A3B8] mb-2"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Lokasi
								</Text>
								<TouchableOpacity
									onPress={getCurrentLocation}
									disabled={isLoadingLocation}
									className="border border-[#10b981] bg-[#f0fdf4] rounded-xl px-4 py-3 flex-row items-center justify-center gap-2"
								>
									{isLoadingLocation ? (
										<ActivityIndicator size="small" color="#10b981" />
									) : (
										<LocationPinIcon size={16} color="#10b981" />
									)}
									<Text className="text-[11px] text-[#10b981]" style={{ fontFamily: "Montserrat-SemiBold" }}>
										{isLoadingLocation ? "Mengambil Lokasi..." : formData.location || "Ambil Lokasi Terkini"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View>
						<Text
							className="text-[14px] text-[#0E1B2A] mb-4 mt-2"
							style={{ fontFamily: "Montserrat-Bold" }}
						>
							Detail Akun
						</Text>

						<View className="gap-4">
							<View>
								<Text
									className="text-[12px] text-[#94A3B8] mb-2"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Nomor Ponsel
								</Text>
								<SmartInput
									value={formData.phone}
									onChangeText={(text) =>
										setFormData({ ...formData, phone: text })
									}
									keyboardType="phone-pad"
								/>
							</View>

							<View>
								<Text
									className="text-[12px] text-[#94A3B8] mb-2"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Email
								</Text>
								<View className="relative">
									<SmartInput
										value={formData.email}
										onChangeText={(text) =>
											setFormData({ ...formData, email: text })
										}
										keyboardType="email-address"
									/>
									<View className="absolute right-0 top-0 bottom-0 justify-center pr-3">
										<View className="bg-[#dcfce7] px-2 py-1 rounded">
											<Text className="text-[10px] text-[#166534] font-medium">
												Terverifikasi
											</Text>
										</View>
									</View>
								</View>
							</View>

							<View>
								<Text
									className="text-[12px] text-[#94A3B8] mb-2"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Password
								</Text>
								<View className="relative">
									<SmartInput
										value="******"
										editable={false}
										secure={true}
									/>
									<TouchableOpacity className="absolute right-0 top-0 bottom-0 justify-center pr-3">
										<View className="bg-[#f1f5f9] px-2 py-1 rounded border border-gray-200">
											<Text className="text-[10px] text-[#475569] font-medium">
												Ubah Password
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>

					<View className="mt-4">
						<PrimaryButton title="Simpan" onPress={handleSave} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
