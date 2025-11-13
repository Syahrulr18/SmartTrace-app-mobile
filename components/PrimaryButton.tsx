import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { shadows } from "../design/shadows";

type PrimaryButtonProps = {
	title: string;
	onPress?: () => void;
	disabled?: boolean;
	style?: ViewStyle;
};

export default function PrimaryButton({
	title,
	onPress,
	disabled,
	style,
}: PrimaryButtonProps) {
	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			style={[shadows.soft, style]}
			className={`w-full rounded-xl bg-[#0F2B46] ${disabled ? "opacity-60" : ""}`}
		>
			<Text
				className="text-white text-base text-[10px] text-center py-4"
				style={{ fontFamily: "Montserrat-SemiBold" }}
			>
				{title}
			</Text>
		</Pressable>
	);
}


