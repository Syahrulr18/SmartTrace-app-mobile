import { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

interface FarmerProduct {
	id: string;
	productName: string;
	quantity: number;
	price: number;
	// Add other necessary properties
}

interface PurchaseModalProps {
	product: FarmerProduct | null;
	quantity: number;
	onQuantityChange: (qty: number) => void;
	onConfirm: () => void;
	onClose: () => void;
}

export default function PurchaseModal({
	product,
	quantity,
	onQuantityChange,
	onConfirm,
	onClose,
}: PurchaseModalProps) {
	const visible = !!product;
	const [localQty, setLocalQty] = useState(String(quantity));

	useEffect(() => {
		if (visible) {
			setLocalQty(String(quantity));
		}
	}, [visible]);

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View
				style={{
					flex: 1,
					backgroundColor: "rgba(0,0,0,0.5)",
					justifyContent: "flex-end",
				}}
			>
				<TouchableOpacity 
					style={{ flex: 1 }} 
					activeOpacity={1} 
					onPress={onClose}
				/>
				<View className="bg-white rounded-t-2xl p-4 border border-[#E2E8F0]">
					{product && (
						<>
							<Text
								className="text-[12px]"
								style={{ color: "#0E1B2A", fontFamily: "Montserrat-Bold" }}
							>
								Beli {product.productName}
							</Text>
							<Text
								className="text-[10px] mt-1"
								style={{ color: "#94A3B8", fontFamily: "Montserrat-Medium" }}
							>
								Tersedia: {product.quantity} kg • Harga/kg: Rp{" "}
								{product.price.toLocaleString("id-ID")}
							</Text>
							<View className="flex-row items-center mt-3 justify-between">
								<Text
									className="text-[11px]"
									style={{ color: "#0E1B2A", fontFamily: "Montserrat-SemiBold" }}
								>
									Jumlah (kg)
								</Text>
								<TextInput
									keyboardType="number-pad"
									value={localQty}
									onChangeText={(t) => {
										setLocalQty(t);
										const n = parseInt(t, 10);
										onQuantityChange(isNaN(n) ? 0 : n);
									}}
									className="border border-[#E2E8F0] rounded-lg px-3 py-2 w-24 text-[12px]"
									style={{ color: "#0E1B2A", fontFamily: "Montserrat-Medium" }}
								/>
							</View>
							<View className="flex-row mt-4" style={{ gap: 8 }}>
								<TouchableOpacity
									onPress={onClose}
									className="flex-1 bg-white border border-[#E2E8F0] rounded-lg py-2 items-center justify-center"
								>
									<Text
										className="text-[12px]"
										style={{ color: "#0E1B2A", fontFamily: "Montserrat-SemiBold" }}
									>
										Batal
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={onConfirm}
									className="flex-1 bg-[#0369A1] rounded-lg py-2 items-center justify-center"
								>
									<Text
										className="text-[12px]"
										style={{ color: "white", fontFamily: "Montserrat-SemiBold" }}
									>
										Tambah ke Keranjang
									</Text>
								</TouchableOpacity>
							</View>
						</>
					)}
				</View>
			</View>
		</Modal>
	);
}
