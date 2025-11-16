import React, { useState } from "react";
import {
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationPinIcon from "../../components/icons/LocationPinIcon";
import SearchIcon from "../../components/icons/SearchIcon";

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

const DistributorTrackingScreen = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "completed">("all");

	const trackingList: TrackingData[] = [
		{
			id: "TRK-001",
			product: "Ikan Kembung",
			status: "Aktif",
			quality: 98,
			temperature: 4,
			location: "KM 120 Tol Surabaya-Jakarta",
			startPoint: "Surabaya",
			endPoint: "Jakarta",
			driver: "Budi",
			vehicle: "Box FG-001",
			lastUpdate: "5 menit lalu",
		},
		{
			id: "TRK-002",
			product: "Kangkung",
			status: "Aktif",
			quality: 85,
			temperature: 12,
			location: "Kota Malang",
			startPoint: "Malang",
			endPoint: "Bandung",
			driver: "Doni",
			vehicle: "Box FG-002",
			lastUpdate: "10 menit lalu",
		},
		{
			id: "TRK-003",
			product: "Bayam",
			status: "Tiba",
			quality: 97,
			temperature: 8,
			location: "Bandara Soekarno-Hatta",
			startPoint: "Jakarta",
			endPoint: "Bogor",
			driver: "Eko",
			vehicle: "Box FG-003",
			lastUpdate: "30 menit lalu",
		},
	];

	const filteredTracking =
		selectedFilter === "all"
			? trackingList
			: selectedFilter === "active"
				? trackingList.filter((t) => t.status === "Aktif")
				: trackingList.filter((t) => t.status !== "Aktif");

	const searchFiltered = filteredTracking.filter((t) =>
		t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
		t.product.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
			<ScrollView
				className="flex-1 bg-[#F5F6F9]"
				contentContainerClassName="pb-20"
				showsVerticalScrollIndicator={false}
			>
				{/* Header Section */}
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

				{/* Search and Filter */}
				<View className="px-5 pt-4">
					<View className="flex-row items-center gap-3">
					<View className="flex-1 flex-row items-center bg-white rounded-full px-3 py-1 border border-[#E4E7EC] gap-2">
						<SearchIcon color="#9B9898" width={14} height={14} />
						<TextInput
							placeholder="Cari Tracking ID atau Produk"
							placeholderTextColor="rgba(14, 27, 42, 0.4)"
							value={searchQuery}
							onChangeText={setSearchQuery}
							className="flex-1 text-[11px]"
							style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
						/>
					</View>
					</View>

					{/* Filter Tabs */}
					<View className="flex-row bg-white rounded-full p-1 mt-5 gap-2">
						{[
							{ key: "all", label: "Semua", count: trackingList.length },
							{
								key: "active",
								label: "Aktif",
								count: trackingList.filter((t) => t.status === "Aktif").length,
							},
							{
								key: "completed",
								label: "Selesai",
								count: trackingList.filter((t) => t.status !== "Aktif").length,
							},
						].map((filter) => (
							<TouchableOpacity
								key={filter.key}
								onPress={() => setSelectedFilter(filter.key as "all" | "active" | "completed")}
								className={`flex-1 rounded-full py-2 px-2 ${
									selectedFilter === filter.key ? "bg-[#F4F7FE]" : ""
								}`}
							>
								<Text
									className="text-center text-[9px]"
									style={{
										color: selectedFilter === filter.key ? "#0F2B46" : "#94A3B8",
										fontFamily: selectedFilter === filter.key
											? "Montserrat-SemiBold"
											: "Montserrat-Medium",
									}}
								>
									{filter.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* Tracking List */}
				<View className="px-5 mt-6">
					{searchFiltered.length > 0 ? (
						<View className="gap-4">
							{searchFiltered.map((tracking) => (
								<TouchableOpacity
									key={tracking.id}
									className="bg-white rounded-2xl p-4 border border-[#E2E8F0]"
								>
									{/* Header with Status */}
									<View className="flex-row items-start justify-between mb-3">
										<View>
											<Text
												className="text-[10px] text-[#94A3B8]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												{tracking.id}
											</Text>
											<Text
												className="text-[13px] text-[#0E1B2A] mt-1"
												style={{ fontFamily: "Montserrat-SemiBold" }}
											>
												{tracking.product}
											</Text>
										</View>
										<View
											className={`px-3 py-1 rounded-full border ${
												tracking.status === "Aktif"
													? "bg-[#F0FDF4] border-[#10b981]"
													: tracking.status === "Tiba"
														? "bg-[#EFF6FF] border-[#3b82f6]"
														: "bg-[#FFFBEB] border-[#f59e0b]"
											}`}
										>
											<Text
												className={`text-[10px] ${
													tracking.status === "Aktif"
														? "text-[#10b981]"
														: tracking.status === "Tiba"
															? "text-[#3b82f6]"
															: "text-[#f59e0b]"
												}`}
												style={{ fontFamily: "Montserrat-SemiBold" }}
											>
												{tracking.status === "Aktif"
													? "Aktif"
													: tracking.status === "Tiba"
														? "Tiba"
														: "Tertunda"}
											</Text>
										</View>
									</View>

									{/* Quality & Temperature */}
									<View className="flex-row gap-2 mb-3">
										<View className="flex-1 bg-[#F0FDF4] rounded-lg px-3 py-2">
											<Text
												className="text-[9px] text-[#15803D]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												Mutu
											</Text>
											<Text
												className="text-[12px] text-[#15803D] mt-1"
												style={{ fontFamily: "Montserrat-Bold" }}
											>
												{tracking.quality}%
											</Text>
										</View>
										<View className="flex-1 bg-[#F0F9FF] rounded-lg px-3 py-2">
											<Text
												className="text-[9px] text-[#0369A1]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												Suhu
											</Text>
											<Text
												className="text-[12px] text-[#0369A1] mt-1"
												style={{ fontFamily: "Montserrat-Bold" }}
											>
												{tracking.temperature}°C
											</Text>
										</View>
									</View>

									{/* Route Information */}
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
												{tracking.startPoint} → {tracking.endPoint}
											</Text>
										</View>

									{/* Current Location */}
									<View className="bg-[#F5F6F9] rounded-lg px-3 py-2">
										<View className="flex-row items-center gap-1">
											<LocationPinIcon size={14} color="#94A3B8" />
											<Text
												className="text-[9px] text-[#94A3B8]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												Lokasi Sekarang
											</Text>
										</View>
										<Text
											className="text-[11px] text-[#0E1B2A] mt-1"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											{tracking.location}
										</Text>
									</View>										{/* Driver & Vehicle */}
										<View className="flex-row gap-2 mt-2">
											<View className="flex-1">
												<Text
													className="text-[8px] text-[#94A3B8]"
													style={{ fontFamily: "Montserrat-Medium" }}
												>
													Driver
												</Text>
												<Text
													className="text-[10px] text-[#0F172A] mt-0.5"
													style={{ fontFamily: "Montserrat-SemiBold" }}
												>
													{tracking.driver}
												</Text>
											</View>
											<View className="flex-1">
												<Text
													className="text-[8px] text-[#94A3B8]"
													style={{ fontFamily: "Montserrat-Medium" }}
												>
													Kendaraan
												</Text>
												<Text
													className="text-[10px] text-[#0F172A] mt-0.5"
													style={{ fontFamily: "Montserrat-SemiBold" }}
												>
													{tracking.vehicle}
												</Text>
											</View>
											<View className="flex-1">
												<Text
													className="text-[8px] text-[#94A3B8]"
													style={{ fontFamily: "Montserrat-Medium" }}
												>
													Update Terbaru
												</Text>
												<Text
													className="text-[10px] text-[#0F172A] mt-0.5"
													style={{ fontFamily: "Montserrat-SemiBold" }}
												>
													{tracking.lastUpdate}
												</Text>
											</View>
										</View>
									</View>

									{/* Action Button */}
									<TouchableOpacity className="mt-3 bg-[#EFF6FF] rounded-lg py-2">
										<Text
											className="text-center text-[11px] text-[#0369A1]"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											Lihat Detail Lengkap →
										</Text>
									</TouchableOpacity>
								</TouchableOpacity>
							))}
						</View>
					) : (
						<View
							className="bg-white rounded-2xl p-8 items-center justify-center border border-[#E2E8F0]"
							style={{ minHeight: 200 }}
						>
							<Text
								className="text-[12px] text-[#94A3B8]"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Data tracking tidak ditemukan
							</Text>
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default DistributorTrackingScreen;
