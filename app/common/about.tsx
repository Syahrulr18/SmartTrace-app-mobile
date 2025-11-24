import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
	const router = useRouter();

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
					Tentang Aplikasi
				</Text>
			</View>

			<ScrollView
				className="flex-1 bg-white"
				contentContainerClassName="px-6 py-10 items-center"
				showsVerticalScrollIndicator={false}
			>
				<Image
					source={require("../../assets/logo-smarttrace/logo-dashbord.png")}
					style={{ width: 200, height: 70, resizeMode: "contain" }}
					className="mb-6"
				/>

				<Text
					className="text-[18px] text-[#0E1B2A] mb-2"
					style={{ fontFamily: "Montserrat-Bold" }}
				>
					SmartTrace
				</Text>
				<Text
					className="text-[14px] text-[#64748B] mb-8"
					style={{ fontFamily: "Montserrat-Medium" }}
				>
					Versi 1.0.0
				</Text>

				<Text
					className="text-[14px] text-[#0E1B2A] text-center leading-6 mb-6"
					style={{ fontFamily: "Montserrat-Medium" }}
				>
					SmartTrace adalah platform jejak rantai pasok pangan berbasis blockchain yang transparan dan terpercaya. Kami menghubungkan petani, distributor, dan konsumen untuk memastikan kualitas dan keadilan harga.
				</Text>

				<View className="w-full bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] mb-6">
					<Text
						className="text-[14px] text-[#0E1B2A] mb-2"
						style={{ fontFamily: "Montserrat-Bold" }}
					>
						Fitur Utama
					</Text>
					<View className="gap-2">
						<Text className="text-[13px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>• Pencatatan Panen & Kualitas</Text>
						<Text className="text-[13px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>• Pelacakan Distribusi Real-time</Text>
						<Text className="text-[13px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>• Transparansi Harga & Keadilan</Text>
						<Text className="text-[13px] text-[#64748B]" style={{ fontFamily: "Montserrat-Medium" }}>• Verifikasi Blockchain</Text>
					</View>
				</View>

				<Text
					className="text-[12px] text-[#94A3B8] text-center"
					style={{ fontFamily: "Montserrat-Medium" }}
				>
					© 2025 SmartTrace. All rights reserved.
				</Text>
			</ScrollView>
		</SafeAreaView>
	);
}
