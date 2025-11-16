import Svg, { Path } from "react-native-svg";

interface LocationPinIconProps {
	size?: number;
	color?: string;
}

export default function LocationPinIcon({ size = 24, color = "#0E1B2A" }: LocationPinIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 2C7.59 2 4 5.59 4 10C4 16.5 12 22 12 22S20 16.5 20 10C20 5.59 16.41 2 12 2ZM12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13Z"
				fill={color}
			/>
		</Svg>
	);
}
