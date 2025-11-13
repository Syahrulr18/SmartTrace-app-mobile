import React from "react";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    Text,
    ViewStyle,
} from "react-native";
import { shadows } from "../design/shadows";
import { colors } from "../design/theme";

type RoleOptionProps = {
	label: string;
	icon: ImageSourcePropType;
	selected?: boolean;
	onPress?: () => void;
	activeBackground: string;
	activeBorder: string;
	style?: ViewStyle;
};

export default function RoleOption({
	label,
	icon,
	selected,
	onPress,
	activeBackground,
	activeBorder,
	style,
}: RoleOptionProps) {
	return (
		<Pressable
			onPress={onPress}
			style={[
				shadows.soft,
				{
					backgroundColor: selected ? activeBackground : colors.surface,
					borderColor: selected ? activeBorder : colors.border,
					borderWidth: 1,
				},
				style,
			]}
			className="flex-1 items-center justify-center rounded-2xl py-5 px-3"
		>
			<Image
				source={icon}
				style={{ width: 36, height: 36, resizeMode: "contain" }}
			/>
			<Text
				className="mt-3 text-center text-sm text-[10px] text-[#0E1B2A]"
				style={{ fontFamily: "Montserrat-SemiBold" }}
			>
				{label}
			</Text>
		</Pressable>
	);
}


