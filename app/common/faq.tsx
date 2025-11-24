import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    LayoutAnimation,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

if (
	Platform.OS === "android" &&
	UIManager.setLayoutAnimationEnabledExperimental
) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
	{
		question: "Kenapa harga saya harus dicatat di Blockchain?",
		answer:
			"Agar harga jual awal Anda tidak bisa diutak-atik atau diubah oleh pihak mana pun (termasuk kami). Ini menjamin transparansi harga dan melindungi Anda dari penekanan harga yang tidak adil.",
	},
	{
		question:
			"Bagaimana jika Distributor mengklaim produk saya rusak padahal baru dipanen?",
		answer:
			"Anda memiliki Bukti Mutu Blockchain. Data dari panen Anda, termasuk kondisi awal, sudah dikunci. Bukti ini dapat dipakai untuk menolak klaim dan menuntut harga yang adil.",
	},
	{
		question: "Apakah saya perlu beli sensor mahal?",
		answer:
			"Tidak. Sensor SmartTrace disediakan oleh Distributor/Logistik. Tugas Anda hanya memastikan proses Input Data awal (Panen/Tangkap) dilakukan dengan jujur dan benar di aplikasi kami.",
	},
	{
		question: "Bagaimana cara memindai QR Code produk?",
		answer:
			"Untuk memindai QR Code, buka menu 'Scan QR' di halaman utama atau navigasi bawah. Arahkan kamera ponsel Anda ke QR Code yang terdapat pada kemasan produk. Informasi detail produk akan otomatis muncul.",
	},
	{
		question: "Apakah data pribadi saya aman?",
		answer:
			"Ya, keamanan data Anda adalah prioritas kami. Kami menggunakan enkripsi standar industri untuk melindungi informasi pribadi Anda. Data transaksi yang dicatat di Blockchain bersifat transparan namun anonim untuk melindungi identitas spesifik pengguna.",
	},
	{
		question: "Bagaimana jika saya lupa kata sandi akun?",
		answer:
			"Jika Anda lupa kata sandi, silakan hubungi admin atau support kami melalui email support@smarttrace.id. Kami akan membantu Anda untuk melakukan reset kata sandi setelah verifikasi identitas.",
	},
	{
		question: "Siapa yang harus saya hubungi jika ada masalah aplikasi?",
		answer:
			"Anda dapat menghubungi tim dukungan pelanggan kami melalui menu 'Bantuan' di aplikasi atau kirim email ke help@smarttrace.id. Layanan kami tersedia Senin-Jumat pukul 09.00 - 17.00 WIB.",
	},
];

export default function FAQScreen() {
	const router = useRouter();
	const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

	const toggleExpand = (index: number) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setExpandedIndex(expandedIndex === index ? null : index);
	};

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
					FAQ
				</Text>
			</View>

			<ScrollView
				className="flex-1 bg-[#F8FAFC]"
				contentContainerClassName="px-6 py-6"
				showsVerticalScrollIndicator={false}
			>
				<View className="gap-4">
					{faqs.map((faq, index) => (
						<View key={index} className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
							<TouchableOpacity
								className="p-4 flex-row items-start justify-between"
								onPress={() => toggleExpand(index)}
								activeOpacity={0.7}
							>
								<Text
									className="text-[13px] text-[#0E1B2A] flex-1 mr-2 leading-5"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									Q: {faq.question}
								</Text>
							</TouchableOpacity>
							
							{expandedIndex === index && (
								<View className="px-4 pb-4 pt-0 bg-gray-50/50">
									<View className="h-[1px] bg-gray-100 w-full mb-3" />
									<Text
										className="text-[12px] text-[#64748B] leading-5"
										style={{ fontFamily: "Montserrat-Medium" }}
									>
										A: {faq.answer}
									</Text>
								</View>
							)}
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
