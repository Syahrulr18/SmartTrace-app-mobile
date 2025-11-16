import React, { useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowBackIcon from "../../components/icons/ArrowBackIcon";
import LocationPinIcon from "../../components/icons/LocationPinIcon";
import LockIcon from "../../components/icons/LockIcon";
import PackageIcon from "../../components/icons/PackageIcon";
import PhoneIcon from "../../components/icons/PhoneIcon";
import SparkleIcon from "../../components/icons/SparkleIcon";
import StoreIcon from "../../components/icons/StoreIcon";
import ThermometerIcon from "../../components/icons/ThermometerIcon";
import TruckIcon from "../../components/icons/TruckIcon";

const screenHeight = Dimensions.get("window").height;

interface DemoProduct {
  id: string;
  name: string;
  type: string;
}

const ConsumerQRScanScreen = () => {
	const [showScanMode, setShowScanMode] = useState(true);
	const [scannedProductId, setScannedProductId] = useState<string | null>(null);

	const demoProducts: DemoProduct[] = [
		{ id: "A001", name: "Ikan Kembung", type: "Seafood" },
		{ id: "A002", name: "Kangkung", type: "Vegetable" },
		{ id: "A003", name: "Tomat", type: "Vegetable" },
		{ id: "A004", name: "Bayam", type: "Vegetable" },
	];

	const handleScanProduct = (productId: string) => {
		setScannedProductId(productId);
		setShowScanMode(false);
	};

	if (!showScanMode && scannedProductId) {
		const product = demoProducts.find((p) => p.id === scannedProductId);

		return (
			<SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
				<ScrollView
					className="flex-1 bg-[#F5F6F9]"
					contentContainerClassName="pb-20"
					showsVerticalScrollIndicator={false}
				>
				{/* Header */}
				<View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between">
					<TouchableOpacity onPress={() => setShowScanMode(true)} className="w-10 h-10 items-center justify-center">
						<ArrowBackIcon size={24} color="#0E1B2A" />
					</TouchableOpacity>
					<Text
						className="text-[14px] text-[#0E1B2A]"
						style={{ fontFamily: "Montserrat-Bold" }}
					>
						Detail Produk
					</Text>
					<View style={{ width: 40 }} />
				</View>					{/* Product Quality Score */}
					<View className="px-5 pt-4">
						<View
							className="rounded-2xl p-6 mb-4 items-center"
							style={{ backgroundColor: "#FEFCE8" }}
						>
							<View className="mb-2">
								<SparkleIcon size={32} color="#FCD34D" />
							</View>
							<Text
								className="text-[13px] text-[#B45309]"
								style={{ fontFamily: "Montserrat-SemiBold" }}
							>
								Kualitas Produk
							</Text>
							<Text
								className="text-[32px] text-[#f59e0b] mt-2"
								style={{ fontFamily: "Montserrat-Bold" }}
							>
								94%
							</Text>
							<Text
								className="text-[11px] text-[#92400E] mt-2 text-center"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Produk dalam kondisi baik
							</Text>
						</View>
					</View>

					{/* Product Information */}
					<View className="px-5 gap-3">
						{/* ID & Name */}
						<View className="bg-white rounded-2xl p-4 border border-[#E4E7EC]">
							<Text
								className="text-[10px] text-[#94A3B8]"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								ID Produk
							</Text>
							<Text
								className="text-[12px] text-[#0E1B2A] mt-1"
								style={{ fontFamily: "Montserrat-SemiBold" }}
							>
								{scannedProductId}
							</Text>
							<Text
								className="text-[11px] text-[#94A3B8] mt-2"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								{product?.name}
							</Text>
						</View>

						{/* Fair Price */}
						<View className="bg-white rounded-2xl p-4 border border-[#E4E7EC]">
							<Text
								className="text-[10px] text-[#94A3B8] mb-2"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Harga Adil
							</Text>
							<Text
								className="text-[16px] text-[#10b981]"
								style={{ fontFamily: "Montserrat-Bold" }}
							>
								Rp 45.000/kg
							</Text>
							<Text
								className="text-[9px] text-[#94A3B8] mt-1"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Transparansi harga dari petani hingga konsumen
							</Text>
						</View>

						{/* Journey Timeline */}
						<Text
							className="text-[12px] text-[#0E1B2A] mt-2"
							style={{ fontFamily: "Montserrat-Bold" }}
						>
							Perjalanan Produk
						</Text>

						<View className="bg-white rounded-2xl p-4 border border-[#E4E7EC]">
							{[
								{
									icon: "harvest",
									stage: "Panen",
									location: "Surabaya",
									date: "10 Nov 2024",
									temp: "28°C",
								},
								{
									icon: "package",
									stage: "Pengemasan",
									location: "TPI Paotere",
									date: "10 Nov 2024",
									temp: "4°C",
								},
								{
									icon: "truck",
									stage: "Pengiriman",
									location: "Jakarta",
									date: "11 Nov 2024",
									temp: "4°C",
								},
								{
									icon: "store",
									stage: "Penjualan",
									location: "Pasar Modern",
									date: "12 Nov 2024",
									temp: "4°C",
								},
							].map((step, idx) => {
								const renderIcon = () => {
									switch (step.icon) {
										case "harvest":
											return <LocationPinIcon size={20} color="#10b981" />;
										case "package":
											return <PackageIcon size={20} color="#10b981" />;
										case "truck":
											return <TruckIcon size={20} color="#10b981" />;
										case "store":
											return <StoreIcon size={20} color="#10b981" />;
										default:
											return null;
									}
								};

								return (
									<View
										key={idx}
										className={`flex-row gap-3 py-3 ${
											idx < 3 ? "border-b border-[#E4E7EC]" : ""
										}`}
									>
										<View className="items-center w-8">
											{renderIcon()}
											{idx < 3 && (
												<View
													className="w-0.5 mt-2"
													style={{
														height: 32,
														backgroundColor: "#E4E7EC",
													}}
												/>
											)}
										</View>
										<View className="flex-1">
											<Text
												className="text-[11px] text-[#0E1B2A]"
												style={{ fontFamily: "Montserrat-SemiBold" }}
											>
												{step.stage}
											</Text>
											<View className="flex-row items-center gap-1 mt-1">
												<LocationPinIcon size={12} color="#94A3B8" />
												<Text
													className="text-[10px] text-[#94A3B8]"
													style={{ fontFamily: "Montserrat-Medium" }}
												>
													{step.location}
												</Text>
											</View>
											<Text
												className="text-[9px] text-[#C5CACE] mt-0.5"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												{step.date}
											</Text>
											<View className="flex-row items-center gap-1 mt-1">
												<ThermometerIcon size={12} color="#0369A1" />
												<Text
													className="text-[9px] text-[#0369A1]"
													style={{ fontFamily: "Montserrat-SemiBold" }}
												>
													{step.temp}
												</Text>
											</View>
										</View>
									</View>
								);
							})}
						</View>

						{/* Blockchain Verification */}
						<View
							className="rounded-2xl p-4 border border-[#FCD34D]"
							style={{ backgroundColor: "#FFFBEB" }}
						>
							<View className="flex-row items-start gap-3">
								<View>
									<LockIcon size={28} color="#92400E" />
								</View>
								<View className="flex-1">
									<Text
										className="text-[12px] text-[#92400E]"
										style={{ fontFamily: "Montserrat-Bold" }}
									>
										Verified by Blockchain
									</Text>
									<Text
										className="text-[10px] text-[#B45309] mt-1"
										style={{ fontFamily: "Montserrat-Medium" }}
									>
										Data tidak dapat dimanipulasi dan tersimpan permanen sebagai bukti
										autentik
									</Text>
									<Text
										className="text-[8px] text-[#92400E] mt-2 font-mono"
										style={{ fontFamily: "Montserrat-Medium" }}
									>
										Hash: 0x2f3a5c8d...
									</Text>
								</View>
							</View>
						</View>

						{/* Action Buttons */}
						<View className="gap-2 mt-2">
							<TouchableOpacity className="bg-[#f59e0b] rounded-xl py-3">
								<Text
									className="text-white text-center text-[12px]"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Bagikan Informasi Produk
								</Text>
							</TouchableOpacity>
							<TouchableOpacity className="bg-white border border-[#E4E7EC] rounded-xl py-3">
								<Text
									className="text-[#0E1B2A]  text-center text-[12px]"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Lihat Sertifikat
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View
				className="flex-1 justify-center items-center"
				style={{ backgroundColor: "#FFFBEB" }}
			>
				{/* Header */}
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

				{/* QR Scanner Area */}
				<View className="flex-1 items-center justify-center px-4">
					<View
						className="w-64 h-64 border-4 border-[#f59e0b] rounded-3xl items-center justify-center"
						style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
					>
						<View className="mb-4">
							<PhoneIcon size={48} color="#f59e0b" />
						</View>
						<Text
							className="text-[12px] text-[#0E1B2A] text-center px-4"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							Arahkan kamera ke QR Code
						</Text>
						<Text
							className="text-[10px] text-[#94A3B8] text-center mt-2"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							QR Code biasanya terdapat di kemasan produk
						</Text>
					</View>
				</View>

				{/* Demo Products */}
				<View className="w-full px-4 pb-8">
					<Text
						className="text-[11px] text-[#94A3B8] mb-3"
						style={{ fontFamily: "Montserrat-SemiBold" }}
					>
						atau pilih produk demo:
					</Text>

					<View className="gap-2">
						{demoProducts.map((product) => (
							<TouchableOpacity
								key={product.id}
								onPress={() => handleScanProduct(product.id)}
								className="bg-white border-2 border-[#FCD34D] rounded-xl p-4 flex-row items-center justify-between"
							>
								<View>
									<Text
										className="text-[9px] text-[#94A3B8]"
										style={{ fontFamily: "Montserrat-Medium" }}
									>
										ID: {product.id}
									</Text>
									<Text
										className="text-[12px] text-[#0E1B2A] mt-1"
										style={{ fontFamily: "Montserrat-Bold" }}
									>
										{product.name}
									</Text>
								</View>
								<Text className="text-lg">›</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ConsumerQRScanScreen;
