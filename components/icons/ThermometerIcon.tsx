import Svg, { Path } from "react-native-svg";

interface ThermometerIconProps {
	size?: number;
	color?: string;
}

export default function ThermometerIcon({ size = 24, color = "#0369A1" }: ThermometerIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 2C11.5 2 11 2.2 10.8 2.6C10.6 3 10.6 3.5 10.8 3.9L11 6V16C8.2 16 6 18.2 6 21C6 23.8 8.2 26 11 26C13.8 26 16 23.8 16 21V6L16.2 3.9C16.4 3.5 16.4 3 16.2 2.6C16 2.2 15.5 2 15 2H12ZM11 16H13V21C13 22.7 12.3 24.2 11 25C9.7 24.2 9 22.7 9 21C9 19.3 9.7 17.8 11 17V16Z"
				fill={color}
			/>
		</Svg>
	);
}
