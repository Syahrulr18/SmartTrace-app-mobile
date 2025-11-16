import React from "react";
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import CameraIcon from "./icons/CameraIcon";

interface FormData {
	commodity: string;
	weight: string;
	date: string;
	price: string;
	condition: string;
}

interface AddProductModalProps {
	visible: boolean;
	onClose: () => void;
	onSubmit: () => void;
	formData: FormData;
	setFormData: (data: FormData) => void;
	commodities: string[];
	conditions: string[];
}

export default function AddProductModal({
	visible,
	onClose,
	onSubmit,
	formData,
	setFormData,
	commodities,
	conditions,
}: AddProductModalProps) {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<View className="flex-1 bg-black/40">
				<View className="flex-1 items-center justify-center p-5">
					<View
						className="w-full bg-white rounded-3xl p-6"
						style={{ maxHeight: "80%" }}
					>
						<ScrollView showsVerticalScrollIndicator={false}>
							{/* Modal Header */}
							<View className="mb-6">
								<Text
									className="text-[18px] text-[#0E1B2A]"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Tambah Produk
								</Text>
								<Text
									className="text-[11px] text-[#94A3B8] mt-1"
									style={{ fontFamily: "Montserrat-Medium" }}
								>
									Isi data produk Anda untuk dicatat di blockchain
								</Text>
							</View>

							{/* Commodity Dropdown */}
							<View className="mb-4">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Pilih Komoditas
								</Text>
								<View className="border border-[#E4E7EC] rounded-xl overflow-hidden">
									<ScrollView
										horizontal
										showsHorizontalScrollIndicator={false}
									>
										{commodities.map((commodity) => (
											<TouchableOpacity
												key={commodity}
												onPress={() =>
													setFormData({
														...formData,
														commodity,
													})
												}
												className={`px-4 py-3 border-r border-[#E4E7EC] ${
													formData.commodity === commodity
														? "bg-[#10b981]"
														: "bg-white"
												}`}
											>
												<Text
													className={`text-[11px] ${
														formData.commodity === commodity
															? "text-white"
															: "text-[#0E1B2A]"
													}`}
													style={{
														fontFamily:
															formData.commodity ===
															commodity
																? "Montserrat-SemiBold"
																: "Montserrat-Medium",
													}}
												>
													{commodity}
												</Text>
											</TouchableOpacity>
										))}
									</ScrollView>
								</View>
								{formData.commodity && formData.commodity !== "Pilih komoditas" && (
									<View className="mt-2 bg-[#f0fdf4] px-3 py-2 rounded-lg border border-[#10b981]">
										<Text
											className="text-[10px] text-[#10b981]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											Terpilih: {formData.commodity}
										</Text>
									</View>
								)}
							</View>

							{/* Weight/Jumlah Input */}
							<View className="mb-4">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Berat/Jumlah (kg)
								</Text>
								<TextInput
									placeholder="Contoh: 50"
									placeholderTextColor="rgba(14, 27, 42, 0.4)"
									value={formData.weight}
									onChangeText={(text) =>
										setFormData({ ...formData, weight: text })
									}
									keyboardType="decimal-pad"
									className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px]"
									style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
								/>
							</View>

							{/* Date Input */}
							<View className="mb-4">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Tanggal
								</Text>
								<TextInput
									placeholder="mm/dd/yyyy"
									placeholderTextColor="rgba(14, 27, 42, 0.4)"
									value={formData.date}
									onChangeText={(text) =>
										setFormData({ ...formData, date: text })
									}
									className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px]"
									style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
								/>
							</View>

							{/* Price Input */}
							<View className="mb-4">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Harga per Satuan (Rp)
								</Text>
								<TextInput
									placeholder="Contoh: 45000"
									placeholderTextColor="rgba(14, 27, 42, 0.4)"
									value={formData.price}
									onChangeText={(text) =>
										setFormData({ ...formData, price: text })
									}
									keyboardType="decimal-pad"
									className="border border-[#E4E7EC] rounded-xl px-4 py-3 text-[12px]"
									style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
								/>
							</View>

							{/* Condition Dropdown */}
							<View className="mb-6">
								<Text
									className="text-[12px] text-[#0E1B2A] mb-2"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Kondisi
								</Text>
								<View className="flex-row gap-2">
									{conditions.map((condition) => (
										<TouchableOpacity
											key={condition}
											onPress={() =>
												setFormData({
													...formData,
													condition,
												})
											}
											className={`flex-1 py-3 rounded-xl border ${
												formData.condition === condition
													? "bg-[#10b981] border-[#10b981]"
													: "bg-white border-[#E4E7EC]"
											}`}
										>
											<Text
												className={`text-center text-[11px] ${
													formData.condition === condition
														? "text-white"
														: "text-[#0E1B2A]"
												}`}
												style={{
													fontFamily:
														formData.condition === condition
															? "Montserrat-SemiBold"
															: "Montserrat-Medium",
												}}
											>
												{condition}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>

							{/* Photo Upload */}
							<TouchableOpacity className="border-2 border-dashed border-[#E4E7EC] rounded-xl py-6 mb-6 items-center justify-center">
								<View className="flex-row items-center gap-2">
									<CameraIcon size={16} color="#94A3B8" />
									<Text
										className="text-[12px] text-[#94A3B8]"
										style={{ fontFamily: "Montserrat-Medium" }}
									>
										Unggah Foto
									</Text>
								</View>
							</TouchableOpacity>

							{/* Submit Button */}
							<TouchableOpacity
								onPress={onSubmit}
								className="bg-[#10b981] rounded-xl py-4 mb-3"
							>
								<Text
									className="text-center text-[13px] text-white"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Catat & Kunci di Blockchain
								</Text>
							</TouchableOpacity>

							{/* Cancel Button */}
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
						</ScrollView>
					</View>
				</View>
			</View>
		</Modal>
	);
}
