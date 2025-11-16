import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import LockIcon from "./icons/LockIcon";

interface BlockchainConfirmationModalProps {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export default function BlockchainConfirmationModal({
	visible,
	onClose,
	onConfirm,
}: BlockchainConfirmationModalProps) {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View className="flex-1 bg-black/40 items-center justify-center p-5">
				<View className="bg-white rounded-3xl p-6 items-center w-full">
					<View className="w-16 h-16 rounded-full bg-[#f0fdf4] items-center justify-center mb-4">
						<LockIcon size={28} color="#10b981" />
					</View>
					<Text
						className="text-[16px] text-[#0E1B2A]"
						style={{ fontFamily: "Montserrat-Bold" }}
					>
						Konfirmasi Blockchain
					</Text>
					<Text
						className="text-[12px] text-[#94A3B8] text-center mt-2"
						style={{ fontFamily: "Montserrat-Medium" }}
					>
						Produk Anda akan dikunci di blockchain dan tidak dapat diubah
					</Text>

					<View className="mt-6 w-full gap-3">
						<TouchableOpacity
							onPress={onClose}
							className="border border-[#E4E7EC] rounded-xl py-4"
						>
							<Text
								className="text-center text-[13px] text-[#0E1B2A]"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Batal
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={onConfirm}
							className="bg-[#10b981] rounded-xl py-4"
						>
							<Text
								className="text-center text-[13px] text-white"
								style={{ fontFamily: "Montserrat-SemiBold" }}
							>
								Konfirmasi & Catat
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}
