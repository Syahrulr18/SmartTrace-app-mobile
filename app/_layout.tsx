import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "./global.css";

function RootLayoutNavigation() {
	const { isSignedIn, isLoading, user } = useAuth();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>
				<ActivityIndicator size="large" color="#3b82f6" />
			</View>
		);
	}

	return (
		<>
			<StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />
			<Stack screenOptions={{ headerShown: false }}>
				{!isSignedIn ? (
					// Auth Stack - unauthenticated users
					<Stack.Screen
						name="auth"
						options={{
							headerShown: false,
						}}
					/>
				) : (
					// App Stack - authenticated with role selected
					<>
						<Stack.Screen
							name="petani"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="distributor"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="konsumen"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="product-detail"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="petani-detail"
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="common"
							options={{
								headerShown: false,
							}}
						/>
					</>
				)}
			</Stack>
		</>
	);
}

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		"Montserrat-Medium": require("../assets/font/Montserrat-Medium.ttf"),
		"Montserrat-SemiBold": require("../assets/font/Montserrat-SemiBold.ttf"),
		"Montserrat-ExtraBold": require("../assets/font/Montserrat-ExtraBold.ttf"),
		"Montserrat-Bold": require("../assets/font/Montserrat-Bold.ttf"),
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

	if (!fontsLoaded) {
		return null;
	}

	return (
		<AuthProvider>
			<RootLayoutNavigation />
		</AuthProvider>
	);
}
