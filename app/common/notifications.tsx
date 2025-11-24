import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItem {
	id: string;
	title: string;
	subtitle: string;
	time: string;
	read: boolean;
	type: "system" | "transaction" | "alert";
	status?: "success" | "warning" | "info";
	statusText?: string;
}

export default function NotificationsScreen() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const role = (params.role as string) || "konsumen";

	// Mock data based on role
	const getNotifications = () => {
		const common: NotificationItem[] = [
			{
				id: "1",
				title: "Update Sistem",
				subtitle: "Versi aplikasi 2.1.0 telah tersedia",
				time: "Hari Ini, 09:00",
				read: false,
				type: "system",
				status: "info",
				statusText: "Info",
			},
		];

		if (role === "petani") {
			return [
				...common,
				{
					id: "p1",
					title: "Pembayaran Diterima",
					subtitle: "Pembayaran untuk Batch #B001 dari Distributor A",
					time: "Hari Ini, 14:30",
					read: false,
					type: "transaction",
					status: "success",
					statusText: "Masuk",
				},
				{
					id: "p2",
					title: "Peringatan Cuaca",
					subtitle: "Curah hujan tinggi diprediksi besok",
					time: "Kemarin, 18:00",
					read: true,
					type: "alert",
					status: "warning",
					statusText: "Penting",
				},
			];
		} else if (role === "distributor") {
			return [
				...common,
				{
					id: "d1",
					title: "Pengiriman Tiba",
					subtitle: "Batch #B001 dari Petani Budi telah sampai",
					time: "Hari Ini, 10:15",
					read: false,
					type: "transaction",
					status: "success",
					statusText: "Selesai",
				},
				{
					id: "d2",
					title: "Stok Menipis",
					subtitle: "Stok Ikan Kembung di Gudang A sisa 10kg",
					time: "Kemarin, 16:45",
					read: true,
					type: "alert",
					status: "warning",
					statusText: "Cek Stok",
				},
			];
		} else {
			// Konsumen
			return [
				...common,
				{
					id: "k1",
					title: "Pesanan Dikirim",
					subtitle: "Paket #ORD-123 sedang dalam perjalanan",
					time: "Hari Ini, 11:20",
					read: false,
					type: "transaction",
					status: "info",
					statusText: "Dikirim",
				},
				{
					id: "k2",
					title: "Promo Spesial",
					subtitle: "Diskon 20% untuk sayuran organik hari ini!",
					time: "Kemarin, 08:00",
					read: true,
					type: "system",
					status: "success",
					statusText: "Promo",
				},
			];
		}
	};

	const notifications = getNotifications();

	return (
		<SafeAreaView className="flex-1 bg-white">
			{/* Header */}
			<View className="flex-row items-center px-6 py-4 border-b border-gray-100">
				<TouchableOpacity onPress={() => router.back()} className="mr-4">
					<Ionicons name="chevron-back" size={24} color="#0E1B2A" />
				</TouchableOpacity>
				<Text
					className="text-[16px] flex-1 text-center mr-8 text-[#0E1B2A]"
					style={{ fontFamily: "Montserrat-Bold" }}
				>
					Notifikasi
				</Text>
			</View>

			<ScrollView
				className="flex-1"
				contentContainerClassName="pb-10"
				showsVerticalScrollIndicator={false}
			>
				<View className="px-6 pt-6">
					<Text
						className="text-[14px] text-[#94A3B8] mb-4"
						style={{ fontFamily: "Montserrat-Bold" }}
					>
						Terbaru
					</Text>

					<View className="gap-4">
						{notifications.map((item) => (
							<TouchableOpacity
								key={item.id}
								className={`flex-row p-4 rounded-2xl border ${
									item.read ? "bg-white border-gray-100" : "bg-[#F8FAFC] border-[#E2E8F0]"
								}`}
							>
								<View
									className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
										item.type === "transaction"
											? "bg-[#dcfce7]"
											: item.type === "alert"
											? "bg-[#fee2e2]"
											: "bg-[#e0f2fe]"
									}`}
								>
									<Ionicons
										name={
											item.type === "transaction"
												? "wallet-outline"
												: item.type === "alert"
												? "warning-outline"
												: "notifications-outline"
										}
										size={20}
										color={
											item.type === "transaction"
												? "#166534"
												: item.type === "alert"
												? "#991b1b"
												: "#0369a1"
										}
									/>
								</View>
								<View className="flex-1">
									<View className="flex-row justify-between items-start mb-1">
										<Text
											className="text-[14px] text-[#0E1B2A] flex-1 mr-2"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											{item.title}
										</Text>
										<Text
											className="text-[10px] text-[#94A3B8]"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											{item.time}
										</Text>
									</View>
									<Text
										className="text-[12px] text-[#64748B] mb-2"
										style={{ fontFamily: "Montserrat-Medium" }}
									>
										{item.subtitle}
									</Text>
									{item.statusText && (
										<View className="self-start">
											<View
												className={`px-2 py-1 rounded ${
													item.status === "success"
														? "bg-[#dcfce7]"
														: item.status === "warning"
														? "bg-[#fee2e2]"
														: "bg-[#e0f2fe]"
												}`}
											>
												<Text
													className={`text-[10px] ${
														item.status === "success"
															? "text-[#166534]"
															: item.status === "warning"
															? "text-[#991b1b]"
															: "text-[#0369a1]"
													}`}
													style={{ fontFamily: "Montserrat-Bold" }}
												>
													{item.statusText}
												</Text>
											</View>
										</View>
									)}
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
