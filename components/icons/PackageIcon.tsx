import Svg, { Path } from "react-native-svg";

interface PackageIconProps {
	size?: number;
	color?: string;
}

export default function PackageIcon({ size = 24, color = "#0E1B2A" }: PackageIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 2L2 7V12C2 18.6 7 23 12 23C17 23 22 18.6 22 12V7L12 2ZM9 17H15V15H9V17Z"
				fill={color}
			/>
		</Svg>
	);
}
