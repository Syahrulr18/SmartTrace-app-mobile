import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		"Montserrat-Medium": require("../assets/font/Montserrat-Medium.ttf"),
		"Montserrat-SemiBold": require("../assets/font/Montserrat-SemiBold.ttf"),
		"Montserrat-ExtraBold": require("../assets/font/Montserrat-ExtraBold.ttf"),
	});

	useEffect(() => {
		(async () => {
			if (fontsLoaded) {
				await SplashScreen.hideAsync();
			} else {
				await SplashScreen.preventAutoHideAsync();
			}
		})();
	}, [fontsLoaded]);

	useEffect(() => {
		NavigationBar.setBackgroundColorAsync("#ffffff").catch(() => {});
		NavigationBar.setButtonStyleAsync("dark").catch(() => {});
	}, []);

	return (
		<>
			<StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />
			<Stack screenOptions={{ headerShown: false }} />
		</>
	);
}
