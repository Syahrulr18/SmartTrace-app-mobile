import Svg, { Path } from "react-native-svg";

interface TruckIconProps {
	size?: number;
	color?: string;
}

export default function TruckIcon({ size = 24, color = "#0E1B2A" }: TruckIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M18 18.5C18.8284 18.5 19.5 17.8284 19.5 17C19.5 16.1716 18.8284 15.5 18 15.5C17.1716 15.5 16.5 16.1716 16.5 17C16.5 17.8284 17.1716 18.5 18 18.5Z"
				fill={color}
			/>
			<Path
				d="M6 18.5C6.82843 18.5 7.5 17.8284 7.5 17C7.5 16.1716 6.82843 15.5 6 15.5C5.17157 15.5 4.5 16.1716 4.5 17C4.5 17.8284 5.17157 18.5 6 18.5Z"
				fill={color}
			/>
			<Path
				d="M20 8H3V14H20V8Z"
				fill={color}
				fillOpacity="0.5"
			/>
			<Path
				d="M20 3H3V8H20V3Z"
				fill={color}
			/>
		</Svg>
	);
}
