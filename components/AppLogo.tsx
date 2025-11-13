import React from "react";
import { Image, View } from "react-native";

type AppLogoProps = {
	size?: number;
};

export function AppLogo({ size = 160 }: AppLogoProps) {
	return (
		<View className="items-center justify-center">
			<Image
				source={require("../assets/logo-smarttrace/logo.png")}
				style={{ width: size, height: size, resizeMode: "contain" }}
			/>
		</View>
	);
}

export default AppLogo;


