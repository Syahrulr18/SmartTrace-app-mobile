import Svg, { Path } from "react-native-svg";

interface LockIconProps {
	size?: number;
	color?: string;
}

export default function LockIcon({ size = 24, color = "#92400E" }: LockIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 1C6.48 1 2 5.48 2 11V23H22V11C22 5.48 17.52 1 12 1ZM12 4C14.76 4 17 6.24 17 9V11H7V9C7 6.24 9.24 4 12 4ZM9 17C8.45 17 8 16.55 8 16C8 15.45 8.45 15 9 15C9.55 15 10 15.45 10 16C10 16.55 9.55 17 9 17ZM15 17C14.45 17 14 16.55 14 16C14 15.45 14.45 15 15 15C15.55 15 16 15.45 16 16C16 16.55 15.55 17 15 17Z"
				fill={color}
			/>
		</Svg>
	);
}
