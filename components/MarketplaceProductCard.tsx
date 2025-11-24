import { Image, Text, TouchableOpacity, View } from "react-native";

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
	image?: any;
	available: boolean;
	bankAccount: string;
}

interface MarketplaceProductCardProps {
	product: FarmerProduct;
	onBuyPress: (product: FarmerProduct) => void;
}

export default function MarketplaceProductCard({ product, onBuyPress }: MarketplaceProductCardProps) {
	return (
		<TouchableOpacity
			key={product.id}
			className="bg-white rounded-2xl p-4 border border-[#E2E8F0]"
			onPress={() => {}}
		>
			{product.image && (
				<Image
					source={product.image}
					style={{ width: "100%", height: 120, borderRadius: 12, resizeMode: "cover", marginBottom: 8 }}
				/>
			)}
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
					onPress={() => onBuyPress(product)}
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
	);
}
