import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import ConsumerTabIcon from "../../components/icons/ConsumerTabIcon";

type TabConfig = {
	name: "qr-scan" | "tracing" | "profil";
	label: string;
};

const TABS: TabConfig[] = [
	{ name: "qr-scan", label: "Scan" },
	{ name: "tracing", label: "Tracing" },
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
			<ConsumerTabIcon name={name} active={focused} />
		</View>
	);
}

export default function ConsumerTabsLayout() {
	return (
		<Tabs
			initialRouteName="qr-scan"
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
