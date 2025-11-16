import React from "react";
import { Text, View } from "react-native";

type StatusBadgeVariant = "available" | "shipping" | "sold";

type StatusBadgeProps = {
	label: string;
	variant?: StatusBadgeVariant;
};

const VARIANT_STYLES: Record<StatusBadgeVariant, { bg: string; border: string; text: string }> = {
	available: { bg: "#E6F6EF", border: "#94D5C6", text: "#1E9D7A" },
	shipping: { bg: "#FFF5E9", border: "#F5C08B", text: "#C77800" },
	sold: { bg: "#F4F4F5", border: "#E4E4E7", text: "#6B7280" },
};

export default function StatusBadge({ label, variant = "available" }: StatusBadgeProps) {
	const palette = VARIANT_STYLES[variant];

	return (
		<View
			className="px-3 py-1 rounded-xl border"
			style={{ backgroundColor: palette.bg, borderColor: palette.border, borderWidth: 2 }}
		>
			<Text
				className="text-[10px]"
				style={{ color: palette.text, fontFamily: "Montserrat-SemiBold" }}
			>
				{label}
			</Text>
		</View>
	);
}


