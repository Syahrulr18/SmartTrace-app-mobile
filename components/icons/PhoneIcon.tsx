import Svg, { Path } from "react-native-svg";

interface PhoneIconProps {
	size?: number;
	color?: string;
}

export default function PhoneIcon({ size = 24, color = "#0E1B2A" }: PhoneIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2ZM17 20H7V4H17V20ZM12 21C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21Z"
				fill={color}
			/>
		</Svg>
	);
}
