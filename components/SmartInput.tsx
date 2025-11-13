import React from "react";
import {
    StyleProp,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";
import { shadows } from "../design/shadows";
import { colors, radius } from "../design/theme";

type SmartInputProps = TextInputProps & {
	secure?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
};

export default function SmartInput({
	secure,
	containerStyle,
	style,
	placeholderTextColor = "#9AA0A6",
	...rest
}: SmartInputProps) {
	return (
		<View
			style={[
				shadows.soft,
				{
					backgroundColor: colors.surface,
					borderRadius: radius.m,
				},
				containerStyle,
			]}
			className="w-full h-59"
		>
			<TextInput 
				placeholderTextColor={placeholderTextColor}
				secureTextEntry={secure}
				className="w-full rounded-xl bg-transparent px-4 py-3 text-[11px] text-[#0E1B2A] "
				style={[{ fontFamily: "Montserrat-Medium" }, style]}
				{...rest}
			/>
		</View>
	);
}


