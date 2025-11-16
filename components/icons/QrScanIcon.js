// components/icons/QrScanIcon.js
import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const QrScanIcon = ({ size = 200, color = "#E2A44D" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
      {/* Corner kiri atas */}
      <Path
        d="M161.333 0H48C21.49 0 0 21.49 0 48v113.333c0 17.673 14.327 32 32 32s32-14.327 32-32V64h97.333c17.673 0 32-14.327 32-32S179.006 0 161.333 0z"
        fill={color}
      />
      
      {/* Corner kanan atas */}
      <Path
        d="M464 0H350.667c-17.673 0-32 14.327-32 32s14.327 32 32 32H448v97.333c0 17.673 14.327 32 32 32s32-14.327 32-32V48c0-26.51-21.49-48-48-48z"
        fill={color}
      />
      
      {/* Corner kiri bawah */}
      <Path
        d="M32 318.667c-17.673 0-32 14.327-32 32V464c0 26.51 21.49 48 48 48h113.333c17.673 0 32-14.327 32-32s-14.327-32-32-32H64v-97.333c0-17.673-14.327-32-32-32z"
        fill={color}
      />
      
      {/* Corner kanan bawah */}
      <Path
        d="M480 318.667c-17.673 0-32 14.327-32 32V448h-97.333c-17.673 0-32 14.327-32 32s14.327 32 32 32H464c26.51 0 48-21.49 48-48V350.667c0-17.673-14.327-32-32-32z"
        fill={color}
      />
      
      {/* QR box kiri atas */}
      <Rect
        x="93.867"
        y="93.867"
        width="138.667"
        height="138.667"
        rx="20"
        fill={color}
      />
      <Rect
        x="139.733"
        y="139.733"
        width="46.933"
        height="46.933"
        fill="white"
      />
      
      {/* QR box kanan atas */}
      <Rect
        x="279.467"
        y="93.867"
        width="138.667"
        height="138.667"
        rx="20"
        fill={color}
      />
      <Rect
        x="325.333"
        y="139.733"
        width="46.933"
        height="46.933"
        fill="white"
      />
      
      {/* QR box kiri bawah */}
      <Rect
        x="93.867"
        y="279.467"
        width="138.667"
        height="138.667"
        rx="20"
        fill={color}
      />
      <Rect
        x="139.733"
        y="325.333"
        width="46.933"
        height="46.933"
        fill="white"
      />
      
      {/* Titik-titik kanan bawah */}
      <Rect
        x="279.467"
        y="279.467"
        width="46.933"
        height="46.933"
        rx="23.467"
        fill={color}
      />
      
      <Rect
        x="349.867"
        y="279.467"
        width="68.267"
        height="46.933"
        rx="23.467"
        fill={color}
      />
      
      <Rect
        x="302.933"
        y="372.533"
        width="115.2"
        height="45.6"
        rx="22.8"
        fill={color}
      />
    </Svg>
  );
};

export default QrScanIcon;