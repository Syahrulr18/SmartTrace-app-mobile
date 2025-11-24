import { useRouter } from "expo-router";
import { useState } from "react";
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
import AddProductModal from "../../components/AddProductModal";
import BlockchainConfirmationModal from "../../components/BlockchainConfirmationModal";
import AlertWarningIcon from "../../components/icons/AlertWarningIcon";
import CheckIcon from "../../components/icons/CheckIcon";
import LocationPinIcon from "../../components/icons/LocationPinIcon";
import PlusIcon from "../../components/icons/PlusIcon";
import SearchIcon from "../../components/icons/SearchIcon";
import ThermometerIcon from "../../components/icons/ThermometerIcon";
import ProductCard from "../../components/ProductCard";

type ProductStatus = "available" | "shipping" | "sold";

const filterTabs = [
	{ label: "Semuanya", active: true },
	{ label: "Tersedia", active: false },
	{ label: "Pengiriman", active: false },
	{ label: "Terjual", active: false },
];

const productHistory = [
	{
		id: "cakalang",
		date: "13 Nov 2025",
		name: "Ikan Cakalang",
		status: "available" as ProductStatus,
		quality: 98,
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "50 kg" },
			{ label: "Harga per Satuan", value: "Rp 10.000/kg" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
	{
		id: "cumi",
		date: "12 Nov 2025",
		name: "Cumi",
		status: "shipping" as ProductStatus,
		quality: 85, // Temporary quality
		route: "Makassar → Surabaya",
		currentLocation: "Laut Jawa",
		temperature: 4,
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "25 kg" },
			{ label: "Harga per Satuan", value: "Rp 25.000/kg" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
	{
		id: "udang",
		date: "12 Nov 2025",
		name: "Udang Kecil",
		status: "sold" as ProductStatus,
		quality: 95, // Final quality
		tracingId: "TRC-UDG-001",
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "25 kg" },
			{ label: "Harga per Satuan", value: "Rp 25.000/kg" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
];

export default function FarmerProductsScreen() {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showBlockchainConfirm, setShowBlockchainConfirm] = useState(false);
	const [activeFilter, setActiveFilter] = useState<
		"all" | "available" | "shipping" | "sold"
	>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [formData, setFormData] = useState({
		commodity: "",
		weight: "",
		date: "",
		price: "",
		condition: "Baik",
        image: null as string | null,
        location: "",
        latitude: null as number | null,
        longitude: null as number | null,
	});
	const [products, setProducts] = useState(productHistory);

	const commodities = [
		"Pilih komoditas",
		// Ikan Laut
		"Ikan Kembung",
		"Ikan Cakalang",
		"Ikan Tuna",
		"Ikan Tongkol",
		"Ikan Tenggiri",
		"Ikan Kakap Merah",
		"Ikan Kakap Putih",
		"Ikan Baronang",
		"Ikan Kuwe",
		"Ikan Kerapu",
		"Ikan Salmon",
		"Ikan Bandeng",
		// Seafood Lainnya
		"Cumi-Cumi",
		"Gurita",
		"Udang Windu",
		"Udang Vaname",
		"Udang Galah",
		"Udang Kecil",
		"Udang Besar",
		"Kepiting",
		"Rajungan",
		"Tiram",
		"Kerang Hijau",
		"Kerang Darah",
		"Lobster",
		"Sotong",
		// Sayuran Hijau
		"Bayam",
		"Kangkung",
		"Sawi Hijau",
		"Sawi Putih",
		"Kailan",
		"Pakcoy",
		"Selada",
		"Brokoli",
		"Kembang Kol",
		// Sayuran Umbi & Akar
		"Wortel",
		"Kentang",
		"Ubi Jalar",
		"Lobak",
		"Bit",
		"Singkong",
		// Sayuran Buah
		"Tomat",
		"Terong",
		"Cabai Merah",
		"Cabai Rawit",
		"Paprika",
		"Timun",
		"Labu Siam",
		"Pare",
		"Oyong",
		// Sayuran Lainnya
		"Bawang Merah",
		"Bawang Putih",
		"Bawang Bombay",
		"Jahe",
		"Kunyit",
		"Kencur",
		"Lengkuas",
	];

	const conditions = ["Baik", "Cukup", "Kurang"];

	const handleAddProduct = () => {
		if (!formData.commodity || formData.commodity === "Pilih komoditas") {
			Alert.alert("Peringatan", "Silakan pilih komoditas");
			return;
		}
		if (!formData.weight) {
			Alert.alert("Peringatan", "Silakan masukkan berat/jumlah");
			return;
		}
		if (!formData.date) {
			Alert.alert("Peringatan", "Silakan pilih tanggal");
			return;
		}
		if (!formData.price) {
			Alert.alert("Peringatan", "Silakan masukkan harga per satuan");
			return;
		}

		setShowBlockchainConfirm(true);
	};

	const handleConfirmBlockchain = () => {
		// Generate unique product ID
		const productId = `STRACE-${Date.now()}`;
		
		// Generate QR code URL using QuickChart API
		const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(productId)}&size=300`;
		
		const newProduct = {
			id: productId,
			date: new Date().toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			}),
			name: formData.commodity,
			status: "available" as ProductStatus,
			quality: 100, // Default new product quality
            latitude: formData.latitude || -5.1477, // Default to Makassar if null
            longitude: formData.longitude || 119.4327,
			qrCodeUrl: qrCodeUrl, // Add QR code URL
			attributes: [
				{ label: "Jenis", value: "Hasil Laut" },
				{ label: "Jumlah", value: `${formData.weight} kg` },
				{ label: "Harga per Satuan", value: `Rp ${formData.price}/kg` },
				{ label: "Lokasi", value: formData.location || "TPI Paotere Makassar" },
				{ label: "Kondisi", value: formData.condition },
			],
		};

		setProducts([newProduct, ...products]);
		setIsModalOpen(false);
		setShowBlockchainConfirm(false);
		setFormData({
			commodity: "",
			weight: "",
			date: "",
			price: "",
			condition: "Baik",
            image: null,
            location: "",
            latitude: null,
            longitude: null,
		});

		Alert.alert(
			"Berhasil Dicatat!",
			`Produk "${formData.commodity}" telah berhasil dicatat dan dikunci di blockchain.\n\nID Produk: ${productId}\n\nQR Code telah dibuat dan siap untuk di-scan.`,
			[{ text: "OK", style: "default" }]
		);
	};

	// Filter products based on status and search query
	const getFilteredProducts = () => {
		let filtered = products;

		// Filter by status
		if (activeFilter !== "all") {
			filtered = filtered.filter((product) => product.status === activeFilter);
		}

		// Filter by search query
		if (searchQuery) {
			filtered = filtered.filter((product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		return filtered;
	};

	const filteredProducts = getFilteredProducts();

	const renderProductItem = (product: any) => {
		return (
			<TouchableOpacity
				key={product.id}
				onPress={() =>
					router.push({
						pathname: "/petani-detail",
						params: { productId: product.id }
					} as any)
				}
				activeOpacity={0.8}
			>
				<View className="relative">
					<ProductCard product={product} />
					
					{/* Additional Info Row based on Status */}
					{product.status === "available" && (
						<View className="mx-4 mb-4 mt-[-10px] bg-[#F0FDF4] rounded-b-xl border-x border-b border-[#E2E8F0] p-3 flex-row items-center justify-between">
							<View className="flex-row items-center gap-2">
								<CheckIcon size={14} color="#15803D" />
								<Text className="text-[11px] text-[#15803D]" style={{ fontFamily: "Montserrat-SemiBold" }}>
									Siap Dijual
								</Text>
							</View>
							<Text className="text-[11px] text-[#15803D]" style={{ fontFamily: "Montserrat-Bold" }}>
								Mutu: {product.quality}%
							</Text>
						</View>
					)}


				{product.status === "shipping" && (
					<View className="mx-4 mb-4 mt-[-10px] bg-[#F0F9FF] rounded-b-xl border-x border-b border-[#E2E8F0] p-3">
						<View className="flex-row items-center justify-between mb-2">
							<View className="flex-row items-center gap-2">
								<LocationPinIcon size={14} color="#0369A1" />
								<Text className="text-[11px] text-[#0369A1]" style={{ fontFamily: "Montserrat-SemiBold" }}>
									Sedang Dikirim
								</Text>
							</View>
							<Text className="text-[11px] text-[#0369A1]" style={{ fontFamily: "Montserrat-Bold" }}>
								{product.currentLocation}
							</Text>
						</View>
						<View className="flex-row items-center justify-between border-t border-[#BAE6FD] pt-2">
							<View className="flex-row items-center gap-1">
								<ThermometerIcon size={12} color="#0369A1" />
								<Text className="text-[10px] text-[#0369A1]" style={{ fontFamily: "Montserrat-Medium" }}>
									{product.temperature}°C
								</Text>
							</View>
							<View className="flex-row items-center gap-1">
								<AlertWarningIcon size={12} color="#B45309" />
								<Text className="text-[10px] text-[#B45309]" style={{ fontFamily: "Montserrat-Medium" }}>
									Mutu: {product.quality}%
								</Text>
							</View>
						</View>
					</View>
				)}
                
                {product.status === "sold" && (
						<View className="mx-4 mb-4 mt-[-10px] bg-[#F8FAFC] rounded-b-xl border-x border-b border-[#E2E8F0] p-3 flex-row items-center justify-between">
							<View>
								<Text className="text-[10px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>ID Tracing</Text>
								<Text className="text-[11px] text-[#0F172A]" style={{ fontFamily: "Montserrat-Bold" }}>
									{product.tracingId}
								</Text>
							</View>
							<View className="bg-[#F0FDF4] px-2 py-1 rounded-full border border-[#10b981]">
								<Text className="text-[10px] text-[#15803D]" style={{ fontFamily: "Montserrat-Bold" }}>
									Terjual
								</Text>
							</View>
						</View>
					)}
				</View>
			</TouchableOpacity>
		);
	};

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
								Pak Budi
							</Text>
							<Text
								className="text-[11px]"
								style={{ color: "#94A3B8", fontFamily: "Montserrat-Medium" }}
							>
								Petani/Nelayan
							</Text>
						</View>
						<View className="w-10 h-10 rounded-full items-center justify-center">
							<Image
								source={require("../../assets/icon-role/logo-petani-nelayan.png")}
								style={{ width: 40, height: 40, resizeMode: "contain" }}
							/>
						</View>
					</View>
				</View>

				<View className="px-5 pt-4">
					<View className="flex-row items-center gap-3">
						<View className="flex-1 flex-row items-center bg-white rounded-full px-3 py-0.4 border border-[#E4E7EC] gap-2">
							<SearchIcon />
							<TextInput
								placeholder="Cari produk Anda"
								placeholderTextColor="rgba(14, 27, 42, 0.4)"
								className="flex-1 text-[11px]"
								style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
								value={searchQuery}
								onChangeText={setSearchQuery}
							/>
						</View>

						<TouchableOpacity
							onPress={() => setIsModalOpen(true)}
							className="w-12 h-12 rounded-full bg-[#10b981] items-center justify-center"
						>
							<PlusIcon />
						</TouchableOpacity>
					</View>

					<View className="flex-row bg-white rounded-full p-1 mt-5">
						{[
							{ label: "Semuanya", value: "all" as const },
							{ label: "Tersedia", value: "available" as const },
							{ label: "Pengiriman", value: "shipping" as const },
							{ label: "Terjual", value: "sold" as const },
						].map((tab) => (
							<TouchableOpacity
								key={tab.value}
								onPress={() => setActiveFilter(tab.value)}
								className={`flex-1 rounded-full py-2 px-1 ${
									activeFilter === tab.value ? "bg-[#F4F7FE]" : ""
								}`}
							>
								<Text
									className="text-center text-[9px]"
									style={{
										color: activeFilter === tab.value ? "#0F2B46" : "#94A3B8",
										fontFamily:
											activeFilter === tab.value
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

				<View className="px-5 mt-6 gap-6">
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product) => renderProductItem(product))
					) : (
						<View className="bg-white rounded-2xl p-8 items-center justify-center">
							<Text
								className="text-[14px] text-[#94A3B8]"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Tidak ada produk yang cocok
							</Text>
						</View>
					)}
				</View>
			</ScrollView>

			{/* Add Product Modal Component */}
			<AddProductModal
				visible={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleAddProduct}
				formData={formData}
				setFormData={setFormData}
				commodities={commodities}
				conditions={conditions}
			/>

			{/* Blockchain Confirmation Modal Component */}
			<BlockchainConfirmationModal
				visible={showBlockchainConfirm}
				onClose={() => setShowBlockchainConfirm(false)}
				onConfirm={handleConfirmBlockchain}
			/>
		</SafeAreaView>
	);
}
