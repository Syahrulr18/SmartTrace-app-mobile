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
import AddProductModal from "../../components/AddProductModal";
import BlockchainConfirmationModal from "../../components/BlockchainConfirmationModal";
import StatusBadge from "../../components/StatusBadge";
import PlusIcon from "../../components/icons/PlusIcon";
import SearchIcon from "../../components/icons/SearchIcon";

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
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "50 kg" },
			{ label: "Harga per Satuan", value: "10.000" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
	{
		id: "cumi",
		date: "12 Nov 2025",
		name: "Cumi",
		status: "shipping" as ProductStatus,
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "25 kg" },
			{ label: "Harga per Satuan", value: "25.000" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
	{
		id: "udang",
		date: "12 Nov 2025",
		name: "Udang Kecil",
		status: "sold" as ProductStatus,
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "25 kg" },
			{ label: "Harga per Satuan", value: "25.000" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
];

const STATUS_LABEL: Record<ProductStatus, string> = {
	available: "Tersedia",
	shipping: "Dalam Pengiriman",
	sold: "Terjual",
};

export default function FarmerProductsScreen() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showBlockchainConfirm, setShowBlockchainConfirm] = useState(false);
	const [activeFilter, setActiveFilter] = useState<"all" | "available" | "shipping" | "sold">("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [formData, setFormData] = useState({
		commodity: "",
		weight: "",
		date: "",
		price: "",
		condition: "Baik",
	});
	const [products, setProducts] = useState(productHistory);

	const commodities = [
		"Pilih komoditas",
		"Ikan Kembung",
		"Ikan Cakalang",
		"Cumi",
		"Udang Kecil",
		"Udang Besar",
		"Tiram",
		"Kerang",
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
		const newProduct = {
			id: Date.now().toString(),
			date: new Date().toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			}),
			name: formData.commodity,
			status: "available" as ProductStatus,
			attributes: [
				{ label: "Jenis", value: "Hasil Laut" },
				{ label: "Jumlah", value: `${formData.weight} kg` },
				{ label: "Harga per Satuan", value: formData.price },
				{ label: "Lokasi", value: "TPI Paotere Makassar" },
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
		});

		Alert.alert(
			"Berhasil",
			"Produk Anda telah berhasil dicatat dan dikunci di blockchain"
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
						<View className="flex-1 flex-row items-center bg-white rounded-full px-3 py-1 border border-[#E4E7EC] gap-2">
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
										fontFamily: activeFilter === tab.value
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
									<StatusBadge
										label={STATUS_LABEL[product.status]}
										variant={product.status}
									/>
								</View>

								<View className="gap-3">
									{product.attributes.map((attribute) => (
										<View
											key={attribute.label}
											className="flex-row justify-between border-b border-dashed border-[#E2E8F0] pb-2"
										>
											<Text
												className="text-[11px] text-[#94A3B8]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												{attribute.label}
											</Text>
											{attribute.label === "Lokasi" ? (
												<TouchableOpacity>
													<Text
														className="text-[9px] text-[#1D4ED8] underline"
														style={{ fontFamily: "Montserrat-SemiBold" }}
													>
														{attribute.value}
													</Text>
												</TouchableOpacity>
											) : (
												<Text
													className="text-[11px] text-[#0F172A]"
													style={{ fontFamily: "Montserrat-SemiBold" }}
												>
													{attribute.value}
												</Text>
											)}
										</View>
									))}
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
