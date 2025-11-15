import React from "react";
import {
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import StatusBadge from "../../components/StatusBadge";

type ProductStatus = "available" | "shipping" | "sold";

const filterTabs = [
	{ label: "Semuanya", active: true },
	{ label: "Tersedia", active: false },
	{ label: "Pengiriman", active: false },
	{ label: "Terjual", active: false },
];

const productHistory = [
	{
		id: "cakalang",
		date: "13 Nov 2025",
		name: "Ikan Cakalang",
		status: "available" as ProductStatus,
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "50 kg" },
			{ label: "Harga per Satuan", value: "10.000" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
	{
		id: "cumi",
		date: "12 Nov 2025",
		name: "Cumi",
		status: "shipping" as ProductStatus,
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "25 kg" },
			{ label: "Harga per Satuan", value: "25.000" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
	{
		id: "udang",
		date: "12 Nov 2025",
		name: "Udang Kecil",
		status: "sold" as ProductStatus,
		attributes: [
			{ label: "Jenis", value: "Hasil Laut" },
			{ label: "Jumlah", value: "25 kg" },
			{ label: "Harga per Satuan", value: "25.000" },
			{ label: "Lokasi", value: "TPI Paotere Makassar" },
		],
	},
];

const STATUS_LABEL: Record<ProductStatus, string> = {
	available: "Tersedia",
	shipping: "Dalam Pengiriman",
	sold: "Terjual",
};

function SearchIcon() {
	return (
		<Svg width={14} height={14} viewBox="0 0 15 15" fill="none">
			<Path
				d="M10.3846 6.34615C10.3846 5.23438 9.98948 4.28335 9.19922 3.49309C8.40895 2.70282 7.45793 2.30769 6.34615 2.30769C5.23438 2.30769 4.28335 2.70282 3.49309 3.49309C2.70282 4.28335 2.30769 5.23438 2.30769 6.34615C2.30769 7.45793 2.70282 8.40895 3.49309 9.19922C4.28335 9.98948 5.23438 10.3846 6.34615 10.3846C7.45793 10.3846 8.40895 9.98948 9.19922 9.19922C9.98948 8.40895 10.3846 7.45793 10.3846 6.34615ZM15 13.8462C15 14.1587 14.8858 14.4291 14.6575 14.6575C14.4291 14.8858 14.1587 15 13.8462 15C13.5216 15 13.2512 14.8858 13.0349 14.6575L9.94291 11.5745C8.86719 12.3197 7.66827 12.6923 6.34615 12.6923C5.48678 12.6923 4.66496 12.5255 3.88071 12.192C3.09645 11.8585 2.42037 11.4078 1.85246 10.8398C1.28456 10.2719 0.833834 9.59585 0.5003 8.8116C0.166767 8.02734 0 7.20553 0 6.34615C0 5.48678 0.166767 4.66496 0.5003 3.88071C0.833834 3.09645 1.28456 2.42037 1.85246 1.85246C2.42037 1.28456 3.09645 0.833834 3.88071 0.5003C4.66496 0.166767 5.48678 0 6.34615 0C7.20553 0 8.02734 0.166767 8.8116 0.5003C9.59585 0.833834 10.2719 1.28456 10.8398 1.85246C11.4078 2.42037 11.8585 3.09645 12.192 3.88071C12.5255 4.66496 12.6923 5.48678 12.6923 6.34615C12.6923 7.66827 12.3197 8.86719 11.5745 9.94291L14.6665 13.0349C14.8888 13.2572 15 13.5276 15 13.8462Z"
				fill="#9B9898"
			/>
		</Svg>
	);
}

function FilterIcon() {
	return (
		<Svg width={16} height={16} viewBox="0 0 19 19" fill="none">
			<Path
				d="M14.7289 1.58329C14.8864 1.58329 15.0374 1.64585 15.1488 1.7572C15.2601 1.86855 15.3227 2.01957 15.3227 2.17704L15.3227 6.21454C15.8158 6.34679 16.2515 6.63802 16.5622 7.04308C16.873 7.44815 17.0414 7.94443 17.0414 8.45496C17.0414 8.96549 16.873 9.46177 16.5622 9.86684C16.2515 10.2719 15.8158 10.5631 15.3227 10.6954V16.8229C15.3227 16.9803 15.2601 17.1314 15.1488 17.2427C15.0374 17.3541 14.8864 17.4166 14.7289 17.4166C14.5714 17.4166 14.4204 17.3541 14.3091 17.2427C14.1977 17.1314 14.1352 16.9803 14.1352 16.8229V10.6954C13.6421 10.5631 13.2063 10.2719 12.8956 9.86684C12.5848 9.46177 12.4164 8.96549 12.4164 8.45496C12.4164 7.94443 12.5848 7.44815 12.8956 7.04308C13.2063 6.63802 13.6421 6.34679 14.1352 6.21454L14.1352 2.17704C14.1352 2.01957 14.1977 1.86855 14.3091 1.7572C14.4204 1.64585 14.5714 1.58329 14.7289 1.58329ZM4.271 1.58329C4.42847 1.58329 4.57949 1.64585 4.69084 1.7572C4.80219 1.86855 4.86475 2.01957 4.86475 2.17704V4.11663C5.35786 4.24887 5.79356 4.5401 6.10431 4.94517C6.41506 5.35023 6.5835 5.84651 6.5835 6.35704C6.5835 6.86758 6.41506 7.36385 6.10431 7.76892C5.79356 8.17399 5.35786 8.46522 4.86475 8.59746V16.8229C4.86475 16.9008 4.84939 16.9781 4.81955 17.0501C4.78971 17.1221 4.74598 17.1876 4.69084 17.2427C4.63571 17.2979 4.57025 17.3416 4.49821 17.3714C4.42618 17.4013 4.34897 17.4166 4.271 17.4166C4.19302 17.4166 4.11582 17.4013 4.04378 17.3714C3.97174 17.3416 3.90629 17.2979 3.85115 17.2427C3.79602 17.1876 3.75228 17.1221 3.72244 17.0501C3.6926 16.9781 3.67725 16.9008 3.67725 16.8229L3.67725 8.59746C3.18414 8.46522 2.74843 8.17399 2.43768 7.76892C2.12693 7.36385 1.9585 6.86758 1.9585 6.35704C1.9585 5.84651 2.12693 5.35023 2.43768 4.94517C2.74843 4.5401 3.18414 4.24887 3.67725 4.11663V2.17704C3.67618 2.09878 3.69081 2.02109 3.72027 1.94857C3.74974 1.87605 3.79343 1.81017 3.84878 1.75483C3.90413 1.69948 3.97001 1.65578 4.04252 1.62632C4.11504 1.59686 4.19273 1.58223 4.271 1.58329ZM9.496 1.58329C9.57426 1.58223 9.65195 1.59686 9.72447 1.62632C9.79699 1.65578 9.86287 1.69948 9.91821 1.75483C9.97356 1.81017 10.0173 1.87605 10.0467 1.94857C10.0762 2.02109 10.0908 2.09878 10.0897 2.17704L10.0897 11.4395C10.5829 11.5718 11.0186 11.863 11.3293 12.2681C11.6401 12.6732 11.8085 13.1694 11.8085 13.68C11.8085 14.1905 11.6401 14.6868 11.3293 15.0918C11.0186 15.4969 10.5829 15.7881 10.0897 15.9204V16.8229C10.0897 16.9803 10.0272 17.1314 9.91584 17.2427C9.80449 17.3541 9.65347 17.4166 9.496 17.4166C9.33852 17.4166 9.1875 17.3541 9.07615 17.2427C8.9648 17.1314 8.90225 16.9803 8.90225 16.8229V15.9204C8.40914 15.7881 7.97343 15.4969 7.66268 15.0918C7.35193 14.6868 7.1835 14.1905 7.1835 13.68C7.1835 13.1694 7.35193 12.6732 7.66268 12.2681C7.97343 11.863 8.40914 11.5718 8.90225 11.4395V2.17704C8.90225 2.01957 8.9648 1.86855 9.07615 1.7572C9.1875 1.64585 9.33852 1.58329 9.496 1.58329Z"
				fill="#9B9898"
			/>
		</Svg>
	);
}

export default function FarmerProductsScreen() {
	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
			<ScrollView
				className="flex-1 bg-[#F5F6F9]"
				contentContainerClassName="pb-20"
				showsVerticalScrollIndicator={false}
			>
				{/* Header Section */}
				<View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between">
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
								Pak Budi
							</Text>
							<Text
								className="text-[11px]"
								style={{ color: "#94A3B8", fontFamily: "Montserrat-Medium" }}
							>
								Petani/Nelayan
							</Text>
						</View>
						<View className="w-10 h-10 rounded-full items-center justify-center">
							<Image
								source={require("../../assets/icon-role/logo-petani-nelayan.png")}
								style={{ width: 40, height: 40, resizeMode: "contain" }}
							/>
						</View>
					</View>
				</View>

				<View className="px-5 pt-4">

					<View className="flex-row items-center gap-3 mt-2">
						<View className="flex-1 flex-row items-center bg-white rounded-full px-3 py-1 border border-[#E4E7EC] gap-2">
							<SearchIcon 
							/>
							<TextInput
								placeholder="Cari produk Anda"
								placeholderTextColor="rgba(14, 27, 42, 0.4)"
								className="flex-1 text-[11px]"
								style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
							/>
						</View>

						<TouchableOpacity className="w-12 h-12 rounded-full bg-white border border-[#E4E7EC] items-center justify-center">
							<FilterIcon />
						</TouchableOpacity>
					</View>

					<View className="flex-row bg-white rounded-full p-1 mt-5">
						{filterTabs.map((tab) => (
							<View
								key={tab.label}
								className={`flex-1 rounded-full py-2 px-1 ${
									tab.active ? "bg-[#F4F7FE]" : ""
								}`}
							>
								<Text
									className="text-center text-[9px]"
									style={{
										color: tab.active ? "#0F2B46" : "#94A3B8",
										fontFamily: tab.active
											? "Montserrat-SemiBold"
											: "Montserrat-Medium",
									}}
								>
									{tab.label}
								</Text>
							</View>
						))}
					</View>
				</View>

				<View className="px-5 mt-6 gap-6">
					{productHistory.map((product) => (
						<View key={product.id}>
							<Text
								className="text-[11px] text-[#94A3B8]"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								{product.date}
							</Text>

							<View className="bg-white rounded-2xl mt-2 p-4 border border-[#E2E8F0] gap-2">
								<View className="flex-row items-center justify-between">
									<View>
										<Text
											className="text-[14px] text-[#0E1B2A]"
											style={{ fontFamily: "Montserrat-SemiBold" }}
										>
											{product.name}
										</Text>
									</View>
									<StatusBadge
										label={STATUS_LABEL[product.status]}
										variant={product.status}
									/>
								</View>

								<View className="gap-3">
									{product.attributes.map((attribute) => (
										<View
											key={attribute.label}
											className="flex-row justify-between border-b border-dashed border-[#E2E8F0] pb-2"
										>
											<Text
												className="text-[11px] text-[#94A3B8]"
												style={{ fontFamily: "Montserrat-Medium" }}
											>
												{attribute.label}
											</Text>
											{attribute.label === "Lokasi" ? (
												<TouchableOpacity>
													<Text
														className="text-[9px] text-[#1D4ED8] underline"
														style={{ fontFamily: "Montserrat-SemiBold" }}
													>
														{attribute.value}
													</Text>
												</TouchableOpacity>
											) : (
												<Text
													className="text-[11px] text-[#0F172A]"
													style={{ fontFamily: "Montserrat-SemiBold" }}
												>
													{attribute.value}
												</Text>
											)}
										</View>
									))}
								</View>
							</View>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}


