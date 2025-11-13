import { Platform } from "react-native";

// Cross-platform soft shadow based on the requested CSS box-shadow
export const shadows = {
	soft: Platform.select({
		ios: {
			shadowColor: "rgba(0,0,0,0.56)",
			shadowOpacity: 0.56,
			shadowRadius: 70,
			shadowOffset: { width: 0, height: 22 },
		},
		android: {
			elevation: 5,
			shadowColor: "rgba(0,0,0,0.90)",
		},
		default: {
			elevation: 14,
			shadowColor: "rgba(0,0,0,0.35)",
		},
	}),
    
};


