import Svg, { Path } from "react-native-svg";

interface CameraIconProps {
	size?: number;
	color?: string;
}

export default function CameraIcon({ size = 24, color = "#94A3B8" }: CameraIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5C7.12 13.5 6 12.38 6 11C6 9.62 7.12 8.5 8.5 8.5C9.88 8.5 11 9.62 11 11C11 12.38 9.88 13.5 8.5 13.5ZM18 13.5C18 14.33 17.34 15 16.5 15H7.5C6.66 15 6 14.33 6 13.5V5H18V13.5Z"
				fill={color}
			/>
		</Svg>
	);
}
