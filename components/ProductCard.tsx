import React from "react";
import { Image as RNImage, Text, TouchableOpacity, View } from "react-native";
import StatusBadge from "./StatusBadge";

type ProductStatus = "available" | "shipping" | "sold";

type ProductAttribute = {
	label: string;
	value: string;
};

type Product = {
	id: string;
	date: string;
	name: string;
	status: ProductStatus;
	attributes: ProductAttribute[];
};

interface ProductCardProps {
	product: Product;
}

const STATUS_LABEL: Record<ProductStatus, string> = {
	available: "Tersedia",
	shipping: "Dalam Pengiriman",
	sold: "Terjual",
};

const getProductImage = (name: string) => {
	if (name.toLowerCase().includes("kembung")) return require("../assets/produk-images/Ikan-kembung.jpeg");
	if (name.toLowerCase().includes("tomat")) return require("../assets/produk-images/Tomat.jpeg");
	if (name.toLowerCase().includes("bayam")) return require("../assets/produk-images/bayam.jpeg");
	return require("../assets/produk-images/images.jpeg");
};

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<View>
			<Text
				className="text-[11px] text-[#94A3B8]"
				style={{ fontFamily: "Montserrat-Medium" }}
			>
				{product.date}
			</Text>

			<View className="bg-white rounded-2xl mt-2 p-4 border border-[#E2E8F0] gap-2">
				<RNImage
					source={getProductImage(product.name)}
					style={{ width: "100%", height: 120, borderRadius: 12, resizeMode: "cover" }}
				/>
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
	);
}
