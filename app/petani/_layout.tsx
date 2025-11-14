import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import FarmerTabIcon from "../../components/icons/FarmerTabIcon";

type TabConfig = {
	name: "home" | "produk" | "profil";
	label: string;
};

const TABS: TabConfig[] = [
	{ name: "home", label: "Beranda" },
	{ name: "produk", label: "Produk" },
	{ name: "profil", label: "Profil" },
];

function TabIcon({
	name,
	focused,
}: {
	name: TabConfig["name"];
	focused: boolean;
}) {
	return (
		<View className="items-center justify-center">
			<FarmerTabIcon name={name} active={focused} />
		</View>
	);
}

export default function FarmerTabsLayout() {
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					borderTopWidth: 0,
					height: 45,
					paddingBottom: 12,
					backgroundColor: "#ffffff",
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 50,
					elevation: 10,
				},
			}}
		>
			{TABS.map(({ name }) => (
				<Tabs.Screen
					key={name}
					name={name}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabIcon name={name} focused={focused} />
						),
					}}
				/>
			))}
		</Tabs>
	);
}


