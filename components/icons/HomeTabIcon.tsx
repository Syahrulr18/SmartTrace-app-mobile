import React from "react";
import Svg, { Path } from "react-native-svg";

interface HomeTabIconProps {
	size?: number;
	color?: string;
	active?: boolean;
}

export default function HomeTabIcon({
	size = 24,
	color = "#0E1B2A",
	active = false,
}: HomeTabIconProps) {
	const activeColor = active ? "#0369A1" : color;

	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={activeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={activeColor} strokeWidth="2" fill="none" />
			<Path d="M9 22v-10h6v10" stroke={activeColor} strokeWidth="2" fill="none" />
		</Svg>
	);
}
