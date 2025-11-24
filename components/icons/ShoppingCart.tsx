import Svg, { Path } from "react-native-svg";

interface ProductIconProps {
    size?: number;
    color?: string;
}

export default function ProductIcon({ size = 25, color = "#000000" }: ProductIconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 25 23" fill="none">
            <Path
                d="M25 0H0V7.26316H1.25V20.5789C1.25 21.2211 1.51339 21.8369 1.98223 22.2909C2.45107 22.7449 3.08696 23 3.75 23H21.25C21.913 23 22.5489 22.7449 23.0178 22.2909C23.4866 21.8369 23.75 21.2211 23.75 20.5789V7.26316H25V0ZM2.5 2.42105H22.5V4.84211H2.5V2.42105ZM21.25 20.5789H3.75V7.26316H21.25V20.5789ZM8.75 9.68421H16.25C16.25 10.3263 15.9866 10.9421 15.5178 11.3962C15.0489 11.8502 14.413 12.1053 13.75 12.1053H11.25C10.587 12.1053 9.95107 11.8502 9.48223 11.3962C9.01339 10.9421 8.75 10.3263 8.75 9.68421Z"
                fill={color}
            />
        </Svg>
    );
}