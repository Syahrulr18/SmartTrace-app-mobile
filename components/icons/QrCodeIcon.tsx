import Svg, { Path, Rect } from "react-native-svg";

interface QrCodeIconProps {
  color?: string;
  size?: number;
}

export default function QrCodeIcon({
  color = "#0E1B2A",
  size = 24,
}: QrCodeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 3H9V9H3V3ZM5 5V7H7V5H5ZM3 15H9V21H3V15ZM5 17V19H7V17H5ZM15 3H21V9H15V3ZM17 5V7H19V5H17ZM15 15H17V17H15V15ZM19 19H21V21H19V19ZM17 17H19V19H17V17ZM19 15H21V17H19V15ZM15 19H17V21H15V19ZM13 13H15V15H13V13ZM13 3H15V5H13V3ZM13 7H15V9H13V7ZM13 17H15V19H13V17ZM13 21H15V23H13V21ZM21 13H23V15H21V13ZM21 9H23V11H21V9ZM9 13H11V15H9V13ZM9 9H11V11H9V9ZM3 13H5V15H3V13ZM3 9H5V11H3V9Z"
        fill={color}
      />
      <Rect x="3" y="3" width="6" height="6" stroke={color} strokeWidth="2" />
      <Rect x="3" y="15" width="6" height="6" stroke={color} strokeWidth="2" />
      <Rect x="15" y="3" width="6" height="6" stroke={color} strokeWidth="2" />
      <Rect x="5" y="5" width="2" height="2" fill={color} />
      <Rect x="5" y="17" width="2" height="2" fill={color} />
      <Rect x="17" y="5" width="2" height="2" fill={color} />
    </Svg>
  );
}
