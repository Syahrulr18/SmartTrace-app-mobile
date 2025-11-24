import Svg, { Path } from "react-native-svg";

interface ArrowDownIconProps {
  color?: string;
  size?: number;
}

export default function ArrowDownIcon({
  color = "#94A3B8",
  size = 24,
}: ArrowDownIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 16L6 10H18L12 16Z"
        fill={color}
      />
    </Svg>
  );
}
