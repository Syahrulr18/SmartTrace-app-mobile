import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	Image,
	ImageSourcePropType,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBadge from "../../components/StatusBadge";
import { shadows } from "../../design/shadows";
import { colors, radius } from "../../design/theme";

type SummaryMetric = {
	label: string;
	value: string;
	icon: ImageSourcePropType;
	accentBg: string;
};

const summaryMetrics: SummaryMetric[] = [
	{
		label: "Total Produk",
		value: "3",
		icon: require("../../assets/icon-on-home-petani/total-produk.png"),
		accentBg: "#F0F9FF",
	},
	{
		label: "Tersedia",
		value: "2",
		icon: require("../../assets/icon-on-home-petani/tersedia.png"),
		accentBg: "#F3FBF7",
	},
	{
		label: "Dalam Pengiriman",
		value: "1",
		icon: require("../../assets/icon-on-home-petani/dalam pengiriman.png"),
		accentBg: "#FFF8EB",
	},
];

const todaysProducts = [
	{
		name: "Ikan Cakalang",
		detail: "1 pcs · Rp 10.000/pcs",
		status: "available" as const,
		location: "TPI Paotere Makassar",
	},
];

function SummaryCard({ label, value, icon, accentBg }: SummaryMetric) {
	return (
		<View
			style={[
				shadows.soft,
				{
					backgroundColor: colors.surface,
					borderRadius: radius.l,
				},
			]}
			className="flex-row items-center justify-between bg-white rounded-2xl px-5 py-4"
		>
			<View className="gap-1">
				<Text
					className="text-[12px]"
					style={{ color: "#667085", fontFamily: "Montserrat-Medium" }}
				>
					{label}
				</Text>
				<Text
					className="text-[22px]"
					style={{ color: "#0F2B46", fontFamily: "Montserrat-ExtraBold" }}
				>
					{value}
				</Text>
			</View>

			<View
				className="w-12 h-12 rounded-2xl items-center justify-center"
				style={{ backgroundColor: accentBg }}
			>
				<Image
					source={icon}
					style={{ width: 28, height: 28, resizeMode: "contain" }}
				/>
			</View>
		</View>
	);
}

export default function FarmerHomeScreen() {
	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
			<ScrollView
				className="flex-1 bg-[#F5F6F9]"
				contentContainerClassName="pb-20"
				showsVerticalScrollIndicator={false}
			>
				{/* Header Section */}
				<View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between">
					<View >
						<Image
							source={require("../../assets/logo-smarttrace/logo-dashbord.png")}
							style={{ width: 130, height: 46, resizeMode: "contain" }}
						/>
					</View>

					<View className="flex-row items-center gap-2">
						<View className="items-end ">
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
						<View className="w-10 h-10 rounded-full  items-center justify-center">
							<Image
								source={require("../../assets/icon-role/logo-petani-nelayan.png")}
								style={{ width: 40, height: 40, resizeMode: "contain" }}
							/>
						</View>
					</View>
				</View>

				{/* Gradient Section */}
				<LinearGradient
					colors={["#2D5652", "#0D2C48"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					className="px-6 pt-8 pb-10 rounded-b-[32px]"
				>
					<View className="mt-4">
						<Text
							className="text-white/80 text-[15px]"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							Total Pendapatan
						</Text>
						<Text
							className="text-white text-[32px] mt-1"
							style={{ fontFamily: "Montserrat-ExtraBold" }}
						>
							Rp 75.000
						</Text>
					</View>

					<View className="mt-6 gap-3">
						{summaryMetrics.map((item) => (
							<SummaryCard key={item.label} {...item} />
						))}
					</View>
				</LinearGradient>

				<View className="px-6 mt-6">
					<View
						style={[
							shadows.soft,
							{
								backgroundColor: colors.surface,
								borderRadius: radius.l,
							},
						]}
						className="bg-white rounded-2xl px-5 py-5"
					>
						<View className="flex-row items-center justify-between mb-4">
							<View>
								<Text
									className="text-[15px] text-[#0E1B2A]"
									style={{ fontFamily: "Montserrat-Bold" }}
								>
									Produk Saya Hari Ini
								</Text>
								<Text
									className="text-[12px] text-[#64748B] mt-1"
									style={{ fontFamily: "Montserrat-Medium" }}
								>
									Kelola hasil panen dan harga jual
								</Text>
							</View>

							<View className="w-11 h-11 items-center justify-center">
								<Image
									source={require("../../assets/icon-plus.png")}
									style={{ width: 30, height: 30, }}
								/>
							</View>
						</View>

						{todaysProducts.map((product) => (
							<View
								key={product.name}
								className="bg-white rounded-2xl border border-[#E2E8F0] p-4"
							>
								<View className="flex-row items-center justify-between">
									<View>
										<Text
											className="text-[16px] text-[#0E1B2A]"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											{product.name}
										</Text>
										<Text
											className="text-[12px] text-[#64748B] mt-1"
											style={{ fontFamily: "Montserrat-Medium" }}
										>
											{product.detail}
										</Text>
									</View>
									<StatusBadge
										label="Tersedia"
										variant={product.status}
									/>
								</View>

								<Text
									className="text-[12px] text-[#1D4ED8] mt-4"
									style={{ fontFamily: "Montserrat-SemiBold" }}
								>
									{product.location}
								</Text>
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}


