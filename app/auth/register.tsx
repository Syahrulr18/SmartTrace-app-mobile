import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EyeIcon } from "../../components/icons/EyeIcon";
import PrimaryButton from "../../components/PrimaryButton";
import RoleOption from "../../components/RoleOption";
import SmartInput from "../../components/SmartInput";
import { useAuth, UserRole } from "../../context/AuthContext";
import { colors } from "../../design/theme";

type RoleKey = "petani" | "distributor" | "konsumen";

type RoleConfig = {
	label: string;
	icon: ImageSourcePropType;
	activeBackground: string;
	activeBorder: string;
	role: UserRole;
};

const ROLE_OPTIONS: Record<RoleKey, RoleConfig> = {
	petani: {
		label: "Petani/Nelayan",
		icon: require("../../assets/icon-role/logo-petani-nelayan.png"),
		activeBackground: "#E6F6EF",
		activeBorder: "#10b981",
		role: "petani",
	},
	distributor: {
		label: "Distributor",
		icon: require("../../assets/icon-role/logo-distributor.png"),
		activeBackground: "#E9F0FF",
		activeBorder: "#3b82f6",
		role: "distributor",
	},
	konsumen: {
		label: "Konsumen",
		icon: require("../../assets/icon-role/logo-konsumen.png"),
		activeBackground: "#FFF3E2",
		activeBorder: "#f59e0b",
		role: "konsumen",
	},
};

export default function RegisterScreen() {
	const router = useRouter();
	const { register, selectRole, isLoading } = useAuth();

	const roleEntries = Object.entries(ROLE_OPTIONS) as [RoleKey, RoleConfig][];

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [agreeTerms, setAgreeTerms] = useState(false);

	const handleRegister = async () => {
		setError("");

		// Validation
		if (!name.trim()) {
			setError("Nama tidak boleh kosong");
			return;
		}
		if (name.length < 3) {
			setError("Nama minimal 3 karakter");
			return;
		}
		if (!email.trim()) {
			setError("Email tidak boleh kosong");
			return;
		}
		if (!email.includes("@")) {
			setError("Format email tidak valid");
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
		if (password !== confirmPassword) {
			setError("Password tidak sesuai");
			return;
		}
		if (!selectedRole) {
			setError("Pilih peran terlebih dahulu");
			return;
		}
		if (!agreeTerms) {
			setError("Anda harus menyetujui Syarat & Ketentuan");
			return;
		}

		try {
			await register(email, password, name);
			// Select role after registration
			const roleConfig = ROLE_OPTIONS[selectedRole];
			await selectRole(roleConfig.role);
			// Navigate to role-specific home
			const routes = {
				petani: "/petani/home",
				distributor: "/distributor/home",
				konsumen: "/konsumen/qr-scan",
			};
			router.replace(routes[selectedRole] as any);
		} catch (err) {
			setError("Registrasi gagal. Silakan coba lagi.");
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			>
				<View className="px-6 pt-8 pb-10">

					<View className="mb-3">
						<Text
							className="text-[18px] text-[#0E1B2A]"
							style={{ fontFamily: "Montserrat-Bold" }}
						>
							Buat Akun Anda
						</Text>
					</View>

					{error ? (
						<View className="mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
							<Text className="text-[12px] text-red-600 font-semibold">
								{error}
							</Text>
						</View>
					) : null}

					<View className="gap-4">
						{/* Nama */}
						<View>
							<Text
								className="text-[12px] text-[#64748B] mb-2"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Nama Lengkap
							</Text>
							<SmartInput
								placeholder="Masukkan nama lengkap Anda"
								value={name}
								onChangeText={setName}
								editable={!isLoading}
								autoCapitalize="words"
							/>
						</View>

						{/* Email */}
						<View>
							<Text
								className="text-[12px] text-[#64748B] mb-2"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Email
							</Text>
							<SmartInput
								placeholder="Masukkan email Anda"
								value={email}
								onChangeText={setEmail}
								editable={!isLoading}
								autoCapitalize="none"
								keyboardType="email-address"
							/>
						</View>

					{/* Password */}
					<View>
						<Text
							className="text-[12px] text-[#64748B] mb-2"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							Password
						</Text>
						<View className="relative">
							<SmartInput
								placeholder="Minimal 6 karakter"
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

					{/* Confirm Password */}
					<View>
						<Text
							className="text-[12px] text-[#64748B] mb-2"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							Konfirmasi Password
						</Text>
						<SmartInput
							placeholder="Masukkan kembali password Anda"
							secure={!showPassword}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							editable={!isLoading}
							autoCapitalize="none"
						/>
					</View>
				</View>

				{/* Role Selection */}
					<View className="mt-6">
						<Text
							className="text-[15px] text-[#0E1B2A] mb-3"
							style={{ fontFamily: "Montserrat-SemiBold" }}
						>
							Pilih Peran
						</Text>

						<View className="flex-row gap-3">
							{roleEntries.map(([key, config]) => (
								<RoleOption
									key={key}
									label={config.label}
									icon={config.icon}
									activeBackground={config.activeBackground}
									activeBorder={config.activeBorder}
									selected={selectedRole === key}
									onPress={() => setSelectedRole(key)}
								/>
							))}
						</View>
					</View>

					{/* Terms Checkbox */}
					<View className="flex-row items-center mt-6 mb-6">
						<TouchableOpacity
							onPress={() => setAgreeTerms(!agreeTerms)}
							disabled={isLoading}
							className={`w-5 h-5 rounded border-2 items-center justify-center ${
								agreeTerms
									? "bg-blue-600 border-blue-600"
									: "border-gray-300"
							}`}
						>
							{agreeTerms && <Text className="text-white text-[12px]">✓</Text>}
						</TouchableOpacity>
						<Text
							className="text-[11px] text-gray-600 ml-3 flex-1"
							style={{ fontFamily: "Montserrat-Medium" }}
						>
							Saya setuju dengan{" "}
							<Text className="text-blue-600 font-semibold">
								Syarat & Ketentuan
							</Text>{" "}
							dan{" "}
							<Text className="text-blue-600 font-semibold">
								Kebijakan Privasi
							</Text>
						</Text>
					</View>

					<View className="relative">
						<PrimaryButton
							title={isLoading ? "" : "Daftar"}
							onPress={handleRegister}
							disabled={isLoading}
						/>
						{isLoading && (
							<View className="absolute top-5 left-0 right-0 items-center">
								<ActivityIndicator color="#ffffff" size="small" />
							</View>
						)}
					</View>

					<View className="items-center mt-6">
						<Text
							className="text-[12px]"
							style={{ color: colors.textSecondary, fontFamily: "Montserrat-Medium" }}
						>
							Sudah punya akun?{" "}
							<Link className="text-[#F59E0B]" href={"/auth/login" as never}>
								Masuk di sini
							</Link>
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}


