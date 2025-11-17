import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchIcon from "../../components/icons/SearchIcon";

interface FarmerProduct {
	id: string;
	farmerName: string;
	farmerId: string;
	productName: string;
	type: "Hasil Laut" | "Sayuran" | "Buah-buahan";
	quantity: number;
	price: number;
	location: string;
	quality: number;
	image?: string;
	available: boolean;
}

// Data logis dari petani yang sedang menjual
const farmerProducts: FarmerProduct[] = [
	{
		id: "prod-001",
		farmerName: "Petani Laut Makassar",
		farmerId: "farmer-001",
		productName: "Ikan Cakalang",
		type: "Hasil Laut",
		quantity: 50,
		price: 10000,
		location: "TPI Paotere Makassar",
		quality: 98,
		available: true,
	},
	{
		id: "prod-002",
		farmerName: "Petani Laut Makassar",
		farmerId: "farmer-001",
		productName: "Cumi",
		type: "Hasil Laut",
		quantity: 25,
		price: 25000,
		location: "TPI Paotere Makassar",
		quality: 85,
		available: true,
	},
	{
		id: "prod-003",
		farmerName: "Petani Sayuran Bandung",
		farmerId: "farmer-002",
		productName: "Kangkung Segar",
		type: "Sayuran",
		quantity: 100,
		price: 5000,
		location: "Pasar Bandung",
		quality: 90,
		available: true,
	},
	{
		id: "prod-004",
		farmerName: "Petani Sayuran Bandung",
		farmerId: "farmer-002",
		productName: "Bayam Organik",
		type: "Sayuran",
		quantity: 80,
		price: 8000,
		location: "Pasar Bandung",
		quality: 92,
		available: true,
	},
	{
		id: "prod-005",
		farmerName: "Petani Laut Jakarta",
		farmerId: "farmer-003",
		productName: "Udang Kecil",
		type: "Hasil Laut",
		quantity: 30,
		price: 25000,
		location: "TPI Jakarta",
		quality: 95,
		available: true,
	},
	{
		id: "prod-006",
		farmerName: "Petani Buah Bogor",
		farmerId: "farmer-004",
		productName: "Apel Merah",
		type: "Buah-buahan",
		quantity: 150,
		price: 15000,
		location: "Kebun Bogor",
		quality: 88,
		available: true,
	},
];

const PRODUCT_TYPES = ["Semua", "Hasil Laut", "Sayuran", "Buah-buahan"];

const MarketplaceScreen = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedType, setSelectedType] = useState("Semua");
	const [cartItems, setCartItems] = useState<string[]>([]);

	// Filter products
	const filteredProducts = farmerProducts.filter(product => {
		const matchesSearch =
			product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesType = selectedType === "Semua" || product.type === selectedType;
		return matchesSearch && matchesType && product.available;
	});

	const handleBuyProduct = (productId: string) => {
		setCartItems([...cartItems, productId]);
		Alert.alert("Sukses", "Produk ditambahkan ke keranjang");
	};

	const getTotalPrice = () => {
		return cartItems.reduce((total, productId) => {
			const product = farmerProducts.find(p => p.id === productId);
			return total + (product?.price || 0);
		}, 0);
	};

	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
			<ScrollView
				className="flex-1 bg-[#F5F6F9]"
				contentContainerClassName="pb-24"
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

				{/* Title Section */}
				<View className="px-6 pt-4">
					<Text
						className="text-[16px]"
						style={{ color: "#0E1B2A", fontFamily: "Montserrat-Bold" }}
					>
						Marketplace
					</Text>
				</View>

				{/* Search Section */}
				<View className="px-6 pt-4">
					<View className="flex-row items-center bg-white rounded-full px-3 py-2 border border-[#E4E7EC] gap-2">
						<SearchIcon color="#9B9898" width={14} height={14} />
						<TextInput
							placeholder="Cari produk atau petani"
							placeholderTextColor="rgba(14, 27, 42, 0.4)"
							value={searchQuery}
							onChangeText={setSearchQuery}
							className="flex-1 text-[11px]"
							style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
						/>
					</View>
				</View>

				{/* Filter Section - Product Type */}
				<View className="px-6 pt-4">
					<Text
						className="text-[12px] mb-2"
						style={{ color: "#0E1B2A", fontFamily: "Montserrat-SemiBold" }}
					>
						Jenis Produk
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="gap-2"
					>
						{PRODUCT_TYPES.map((type) => (
							<TouchableOpacity
								key={type}
								onPress={() => setSelectedType(type)}
								className={`px-4 py-2 rounded-full border ${
									selectedType === type
										? "bg-[#0369A1] border-[#0369A1]"
										: "bg-white border-[#E4E7EC]"
								}`}
							>
								<Text
									className="text-[11px]"
									style={{
										color: selectedType === type ? "#ffffff" : "#0E1B2A",
										fontFamily: "Montserrat-SemiBold",
									}}
								>
									{type}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* Products Grid */}
				<View className="px-6 pt-5">
					{filteredProducts.length > 0 ? (
						<View className="gap-3">
							{filteredProducts.map((product) => (
								<TouchableOpacity
									key={product.id}
									className="bg-white rounded-2xl p-4 border border-[#E2E8F0]"
									onPress={() => {}}
								>
									{/* Product Header */}
									<View className="flex-row items-start justify-between mb-3">
										<View className="flex-1">
											<Text
												className="text-[10px] text-[#94A3B8]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												{product.farmerName}
											</Text>
											<Text
												className="text-[13px] text-[#0E1B2A] mt-1"
												style={{ fontFamily: "Montserrat-SemiBold" }}
											>
												{product.productName}
											</Text>
										</View>
										<View
											className="px-3 py-1 rounded-full"
											style={{ backgroundColor: "#F0FDF4" }}
										>
											<Text
												className="text-[10px] text-[#10b981]"
												style={{ fontFamily: "Montserrat-SemiBold" }}
											>
												Tersedia
											</Text>
										</View>
									</View>

									{/* Product Details */}
									<View className="flex-row gap-2 mb-3">
										<View className="flex-1 bg-[#F0FDF4] rounded-lg px-3 py-2">
											<Text
												className="text-[9px] text-[#15803D]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												Jumlah
											</Text>
											<Text
												className="text-[12px] text-[#15803D] mt-1"
												style={{ fontFamily: "Montserrat-Bold" }}
											>
												{product.quantity} kg
											</Text>
										</View>
										<View className="flex-1 bg-[#FEF3C7] rounded-lg px-3 py-2">
											<Text
												className="text-[9px] text-[#92400E]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												Mutu
											</Text>
											<Text
												className="text-[12px] text-[#92400E] mt-1"
												style={{ fontFamily: "Montserrat-Bold" }}
											>
												{product.quality}%
											</Text>
										</View>
										<View className="flex-1 bg-[#F0F9FF] rounded-lg px-3 py-2">
											<Text
												className="text-[9px] text-[#0369A1]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												Lokasi
											</Text>
											<Text
												className="text-[11px] text-[#0369A1] mt-1"
												style={{ fontFamily: "Montserrat-Bold" }}
											>
												{product.location.split(" ")[0]}
											</Text>
										</View>
									</View>

									{/* Type Badge */}
									<View className="mb-3 flex-row items-center gap-1">
										<View
											className="px-2 py-1 rounded-full"
											style={{ backgroundColor: "#EFF6FF" }}
										>
											<Text
												className="text-[9px] text-[#0369A1]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												{product.type}
											</Text>
										</View>
									</View>

									{/* Price and Action */}
									<View className="flex-row items-center justify-between border-t border-[#E2E8F0] pt-3">
										<View>
											<Text
												className="text-[10px] text-[#94A3B8]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												Harga per kg
											</Text>
											<Text
												className="text-[14px] text-[#0E1B2A] mt-0.5"
												style={{ fontFamily: "Montserrat-Bold" }}
											>
												Rp {product.price.toLocaleString("id-ID")}
											</Text>
										</View>
										<TouchableOpacity
											onPress={() => handleBuyProduct(product.id)}
											className="bg-[#0369A1] px-4 py-2 rounded-lg items-center justify-center"
										>
											<Text
												className="text-[11px] text-white"
												style={{ fontFamily: "Montserrat-SemiBold" }}
											>
												Beli
											</Text>
										</TouchableOpacity>
									</View>
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
								Produk tidak ditemukan
							</Text>
						</View>
					)}
				</View>

				{/* Cart Summary */}
				{cartItems.length > 0 && (
					<View className="px-6 pt-6">
						<View
							className="bg-white rounded-2xl p-4 border border-[#E2E8F0]"
						>
							<Text
								className="text-[12px] text-[#0E1B2A]"
								style={{ fontFamily: "Montserrat-Bold" }}
							>
								Ringkasan Keranjang
							</Text>
							<View className="flex-row items-center justify-between mt-2">
								<Text
									className="text-[11px] text-[#94A3B8]"
									style={{ fontFamily: "Montserrat-Medium" }}
								>
									{cartItems.length} Produk
								</Text>
								<Text
									className="text-[12px] text-[#0369A1]"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Total: Rp {getTotalPrice().toLocaleString("id-ID")}
								</Text>
							</View>
							<TouchableOpacity
								className="bg-[#0369A1] rounded-lg py-2 mt-3 items-center justify-center"
								onPress={() => Alert.alert("Pembelian", `${cartItems.length} produk berhasil dipesan`)}
							>
								<Text
									className="text-[12px] text-white"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Selesaikan Pembelian
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default MarketplaceScreen;
