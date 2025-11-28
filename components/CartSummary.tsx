import { Alert, Text, TouchableOpacity, View } from "react-native";

interface FarmerProduct {
	id: string;
	price: number;
	// Add other properties if needed for calculation or display
}

interface CartSummaryProps {
	cartItems: { id: string; qty: number }[];
	farmerProducts: FarmerProduct[];
}

export default function CartSummary({ cartItems, farmerProducts }: CartSummaryProps) {
	const getTotalPrice = () => {
		return cartItems.reduce((total, item) => {
			const product = farmerProducts.find((p) => p.id === item.id);
			return total + (product?.price || 0) * item.qty;
		}, 0);
	};

	if (cartItems.length === 0) {
		return null;
	}

	return (
		<View className="px-6 pt-6">
			<View className="bg-white rounded-2xl p-4 border border-[#E2E8F0]">
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
					onPress={() =>
						Alert.alert(
							"Pembelian",
							`${cartItems.length} produk berhasil dipesan`
						)
					}
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
	);
}
