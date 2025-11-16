import Svg, { Path } from "react-native-svg";

interface ArrowBackIconProps {
	size?: number;
	color?: string;
}

export default function ArrowBackIcon({ size = 24, color = "#0E1B2A" }: ArrowBackIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M19 11H7.83L13.41 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H19V11Z"
				fill={color}
			/>
		</Svg>
	);
}
