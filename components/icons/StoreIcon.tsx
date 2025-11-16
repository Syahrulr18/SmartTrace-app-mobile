import Svg, { Path } from "react-native-svg";

interface StoreIconProps {
	size?: number;
	color?: string;
}

export default function StoreIcon({ size = 24, color = "#0E1B2A" }: StoreIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M18 13H20V22H4V13H6V11H18V13ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
				fill={color}
			/>
			<Path
				d="M7 2H17L20 8H4L7 2Z"
				fill={color}
				fillOpacity="0.5"
			/>
		</Svg>
	);
}
