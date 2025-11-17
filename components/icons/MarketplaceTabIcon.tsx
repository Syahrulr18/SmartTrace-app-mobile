import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface MarketplaceTabIconProps {
	size?: number;
	color?: string;
	active?: boolean;
}

export default function MarketplaceTabIcon({
	size = 24,
	color = "#0E1B2A",
	active = false,
}: MarketplaceTabIconProps) {
	const activeColor = active ? "#0369A1" : color;

	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={activeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<Circle cx="9" cy="21" r="1" stroke={activeColor} strokeWidth="2" fill="none" />
			<Circle cx="20" cy="21" r="1" stroke={activeColor} strokeWidth="2" fill="none" />
			<Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke={activeColor} strokeWidth="2" fill="none" />
		</Svg>
	);
}
