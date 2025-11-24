import Svg, { Line, Rect } from "react-native-svg";

interface CalendarIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  size = 24,
  color = "#3f4040ff",
  strokeWidth = 2,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Bingkai Kalender */}
      <Rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Garis Horizontal (Header) */}
      <Line
        x1="3"
        y1="10"
        x2="21"
        y2="10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Garis Vertikal Atas (Ring) */}
      <Line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Kotak-kotak Kecil (Tanggal) - Menggunakan Fill */}
      <Rect x="7" y="12" width="2" height="2" fill={color} />
      <Rect x="11" y="12" width="2" height="2" fill={color} />
      <Rect x="15" y="12" width="2" height="2" fill={color} />
      
      <Rect x="7" y="16" width="2" height="2" fill={color} />
      <Rect x="11" y="16" width="2" height="2" fill={color} />
      <Rect x="15" y="16" width="2" height="2" fill={color} />
    </Svg>
  );
};

export default CalendarIcon;