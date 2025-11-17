import React from "react";
import HomeTabIcon from "./HomeTabIcon";
import MarketplaceTabIcon from "./MarketplaceTabIcon";
import ProfileTabIcon from "./ProfileTabIcon";
import TrackingTabIcon from "./TrackingTabIcon";

type DistributorTabIconName = "home" | "marketplace" | "tracking" | "profil";

type DistributorTabIconProps = {
	name: DistributorTabIconName;
	active?: boolean;
};

const ACTIVE_COLOR = "#0369A1";
const INACTIVE_COLOR = "rgba(14,27,42,0.5)";

export default function DistributorTabIcon({ name, active = false }: DistributorTabIconProps) {
	const color = active ? ACTIVE_COLOR : INACTIVE_COLOR;

	switch (name) {
		case "home":
			return <HomeTabIcon size={24} color={color} active={active} />;
		case "marketplace":
			return <MarketplaceTabIcon size={24} color={color} active={active} />;
		case "tracking":
			return <TrackingTabIcon size={24} color={color} active={active} />;
		case "profil":
			return <ProfileTabIcon size={24} color={color} active={active} />;
		default:
			return null;
	}
}
