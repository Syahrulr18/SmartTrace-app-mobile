import Svg, { Path } from "react-native-svg";

interface PrinterIconProps {
  color?: string;
  size?: number;
}

export default function PrinterIcon({
  color = "#0369A1",
  size = 24,
}: PrinterIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V15H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z"
        fill={color}
      />
    </Svg>
  );
}
