import React from "react";
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "../../components/icons/SearchIcon";

interface TracedProduct {
  id: string;
  name: string;
  quality: number;
  source: string;
  price: string;
  date: string;
  location: string;
}

const ConsumerTracingScreen = () => {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [activeFilter, setActiveFilter] = React.useState<"all" | "high" | "attention">("all");

	const tracedProducts: TracedProduct[] = [
		{
			id: "A001",
			name: "Ikan Kembung",
			quality: 98,
			source: "Toko Segar Jakarta",
			price: "Rp 45.000/kg",
			date: "12/11/2024",
			location: "Pasar Modern Bandung",
		},
		{
			id: "A002",
			name: "Kangkung",
			quality: 95,
			source: "Pasar Modern Bandung",
			price: "Rp 8.000/ikat",
			date: "13/11/2024",
			location: "Supermarket Jakarta",
		},
		{
			id: "A004",
			name: "Bayam",
			quality: 94,
			source: "Pasar Organik Jakarta",
			price: "Rp 12.000/ikat",
			date: "12/11/2024",
			location: "Pasar Organik Jakarta",
		},
		{
			id: "A003",
			name: "Tomat",
			quality: 75,
			source: "Supermarket Jakarta",
			price: "Rp 15.000/kg",
			date: "10/11/2024",
			location: "Supermarket Jakarta",
		},
	];

	const filteredProducts = tracedProducts
		.filter((p) => {
			// Search filter
			const matchesSearch =
				p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.id.toLowerCase().includes(searchQuery.toLowerCase());
			if (!matchesSearch) return false;

			// Quality filter
			if (activeFilter === "high") {
				return p.quality >= 90;
			}
			if (activeFilter === "attention") {
				return p.quality < 85;
			}

			return true; // "all" filter
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView
				showsVerticalScrollIndicator={false}
				className="flex-1 bg-[#F5F6F9]"
				contentContainerClassName="pb-20"
			>
				<View>
					<View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between w-full">
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
									Nama Pembeli
								  </Text>
								  <Text
									className="text-[11px]"
									style={{ color: "#94A3B8", fontFamily: "Montserrat-Medium" }}
								  >
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
				</View>
				{/* Header */}
				<View className="bg-[F5F6F9] px-6 pt-4 pb-1 flex-row items-center justify-between">
					<Text
						className="text-[16px] text-[#0E1B2A]"
						style={{ fontFamily: "Montserrat-Bold" }}
					>
						Riwayat Scan
					</Text>
					<View style={{ width: 40 }} />
				</View>

			{/* Search Bar */}
			<View className="px-6 pt-4 pb-2">
				<View className="bg-white rounded-full px-4 py-3 flex-row items-center border border-[#E4E7EC]">
					<SearchIcon color="#9B9898" width={14} height={14} />
					<TextInput
						placeholder="Cari produk atau ID..."
						placeholderTextColor="#94A3B8"
						value={searchQuery}
						onChangeText={setSearchQuery}
						className="flex-1 text-[13px] ml-2"
						style={{ fontFamily: "Montserrat-Medium" }}
					/>
				</View>
			</View>

			{/* Filter Tabs */}
			<View className="px-5 pt-4">
				<View className="flex-row bg-white rounded-full p-1 gap-2">
					{[
						{ key: "all", label: "Semua" },
						{ key: "high", label: "Berkualitas" },
						{ key: "attention", label: "Perlu Perhatian" },
					].map((tab) => (
						<TouchableOpacity
							key={tab.key}
							onPress={() => setActiveFilter(tab.key as "all" | "high" | "attention")}
							className={`flex-1 rounded-full py-2 px-2 ${
								activeFilter === tab.key ? "bg-[#FEF3C7]" : ""
							}`}
						>
							<Text
								className="text-center text-[9px]"
								style={{
									color: activeFilter === tab.key ? "#B45309" : "#94A3B8",
									fontFamily: activeFilter === tab.key
										? "Montserrat-SemiBold"
										: "Montserrat-Medium",
								}}
							>
								{tab.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Products List */}
			<View className="px-5 mt-6 gap-6">
				{filteredProducts.length > 0 ? (
					filteredProducts.map((product) => (
						<View key={product.id}>
							<Text
								className="text-[11px] text-[#94A3B8]"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								{product.date}
							</Text>

							<View className="bg-white rounded-2xl mt-2 p-4 border border-[#E2E8F0] gap-2">
								<View className="flex-row items-center justify-between">
									<View>
										<Text
											className="text-[14px] text-[#0E1B2A]"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											{product.name}
										</Text>
									</View>
									<View
										className={`px-3 py-1 rounded-full ${
											product.quality >= 90
												? "bg-[#DBEAFE]"
												: product.quality >= 80
													? "bg-[#FEF3C7]"
													: "bg-[#FEE2E2]"
										}`}
									>
										<Text
											className={`text-[10px] ${
												product.quality >= 90
													? "text-[#0369A1]"
													: product.quality >= 80
														? "text-[#B45309]"
														: "text-[#991B1B]"
											}`}
											style={{ fontFamily: "Montserrat-Bold" }}
										>
											{product.quality}%
										</Text>
									</View>
								</View>

								<View className="gap-3">
									<View className="flex-row justify-between border-b border-dashed border-[#E2E8F0] pb-2">
										<Text
											className="text-[11px] text-[#94A3B8]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											ID Produk
										</Text>
										<Text
											className="text-[11px] text-[#0F172A]"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											{product.id}
										</Text>
									</View>

									<View className="flex-row justify-between border-b border-dashed border-[#E2E8F0] pb-2">
										<Text
											className="text-[11px] text-[#94A3B8]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											Sumber
										</Text>
										<Text
											className="text-[11px] text-[#0F172A]"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											{product.source}
										</Text>
									</View>

									<View className="flex-row justify-between border-b border-dashed border-[#E2E8F0] pb-2">
										<Text
											className="text-[11px] text-[#94A3B8]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											Harga
										</Text>
										<Text
											className="text-[11px] text-[#f59e0b]"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											{product.price}
										</Text>
									</View>

									<View className="flex-row justify-between border-b border-dashed border-[#E2E8F0] pb-2">
										<Text
											className="text-[11px] text-[#94A3B8]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											Lokasi
										</Text>
										<TouchableOpacity>
											<Text
												className="text-[9px] text-[#1D4ED8] underline"
												style={{ fontFamily: "Montserrat-SemiBold" }}
											>
												{product.location}
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
					))
				) : (
					<View className="bg-white rounded-2xl p-8 items-center justify-center">
						<Text
							className="text-[14px] text-[#94A3B8]"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							Produk tidak ditemukan
						</Text>
					</View>
				)}
			</View>
		</ScrollView>
	</SafeAreaView>
);
};

export default ConsumerTracingScreen;
