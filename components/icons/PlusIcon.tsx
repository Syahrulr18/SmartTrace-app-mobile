import Svg, { Path } from "react-native-svg";

interface PlusIconProps {
	color?: string;
	width?: number;
	height?: number;
}

export default function PlusIcon({
	color = "white",
	width = 24,
	height = 24,
}: PlusIconProps) {
	return (
		<Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"
				fill={color}
			/>
		</Svg>
	);
}
