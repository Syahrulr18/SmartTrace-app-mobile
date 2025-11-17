import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface TrackingTabIconProps {
	size?: number;
	color?: string;
	active?: boolean;
}

export default function TrackingTabIcon({
	size = 24,
	color = "#0E1B2A",
	active = false,
}: TrackingTabIconProps) {
	const activeColor = active ? "#0369A1" : color;

	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={activeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={activeColor} strokeWidth="2" fill="none" />
			<Circle cx="12" cy="10" r="3" stroke={activeColor} strokeWidth="2" fill="none" />
		</Svg>
	);
}
