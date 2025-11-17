import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface ProfileTabIconProps {
	size?: number;
	color?: string;
	active?: boolean;
}

export default function ProfileTabIcon({
	size = 24,
	color = "#0E1B2A",
	active = false,
}: ProfileTabIconProps) {
	const activeColor = active ? "#0369A1" : color;

	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={activeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={activeColor} strokeWidth="2" fill="none" />
			<Circle cx="12" cy="7" r="4" stroke={activeColor} strokeWidth="2" fill="none" />
		</Svg>
	);
}
