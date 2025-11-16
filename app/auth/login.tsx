import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLogo from "../../components/AppLogo";
import { EyeIcon } from "../../components/icons/EyeIcon";
import PrimaryButton from "../../components/PrimaryButton";
import SmartInput from "../../components/SmartInput";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../design/theme";

export default function LoginScreen() {
	const router = useRouter();
	const { login, isLoading } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = async () => {
		setError("");

		// Validation
		if (!email.trim()) {
			setError("Email/username tidak boleh kosong");
			return;
		}
		if (!password.trim()) {
			setError("Password tidak boleh kosong");
			return;
		}
		if (password.length < 6) {
			setError("Password minimal 6 karakter");
			return;
		}

		try {
			await login(email, password);
			// Navigate to role selection
			router.replace("/auth/select-role" as any);
		} catch (err) {
			setError("Login gagal. Silakan coba lagi.");
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-[#ffffff]">
			<View className="flex-1 px-6 pt-12 pb-10">
				<View className="items-center">
					<AppLogo />
				</View>

				<View className="mt-10">
					<Text
						className="text-[15px] text-[#0E1B2A]"
						style={{ fontFamily: "Montserrat-SemiBold" }}
					>
						Masuk ke Akun Anda
					</Text>
				</View>

				{error ? (
					<View className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
						<Text className="text-[12px] text-red-600 font-semibold">
							{error}
						</Text>
					</View>
				) : null}

				<View className="gap-4 mt-6">
					<View>
						<Text
							className="text-[12px] text-[#64748B] mb-2"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							Email / Username
						</Text>
						<SmartInput
							placeholder="Masukkan email atau username Anda"
							value={email}
							onChangeText={setEmail}
							editable={!isLoading}
							autoCapitalize="none"
							keyboardType="email-address"
						/>
					</View>

					<View>
						<Text
							className="text-[12px] text-[#64748B] mb-2"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							Password
						</Text>
						<View className="relative">
							<SmartInput
								placeholder="Masukkan kata sandi Anda"
								secure={!showPassword}
								value={password}
								onChangeText={setPassword}
								editable={!isLoading}
								autoCapitalize="none"
							/>
							<TouchableOpacity
								onPress={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-4"
								disabled={isLoading}
							>
								<EyeIcon open={showPassword} size={20} color="#94A3B8" />
							</TouchableOpacity>
						</View>
					</View>
				</View>

				{/* Forgot Password Link */}
				<View className="mt-4 flex-row justify-end">
					<TouchableOpacity disabled={isLoading}>
						<Text
							className="text-[12px]"
							style={{ color: "#F59E0B", fontFamily: "Montserrat-SemiBold" }}
						>
							Lupa Password?
						</Text>
					</TouchableOpacity>
				</View>

				<View className="mt-8">
					<PrimaryButton
						title={isLoading ? "" : "Masuk"}
						// onPress={handleLogin}
						onPress={() => router.replace("../petani/home" as any)}
						// onPress={() => router.replace("../konsumen/qr-scan" as any)}
						// onPress={() => router.replace("../distributor/home" as any)}
						disabled={isLoading}
					/>
					{isLoading && (
						<View className="absolute top-5 left-0 right-0 items-center">
							<ActivityIndicator color="#ffffff" size="small" />
						</View>
					)}
				</View>

				

				<View className="items-center mt-auto">
					<Text
						className="text-[12px]"
						style={{ color: colors.textSecondary, fontFamily: "Montserrat-Medium" }}
					>
						Belum punya akun?{" "}
						<Link
							className="text-[#F59E0B]"
							href={"/auth/register" as never}
						>
							Daftar di sini
						</Link>
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
