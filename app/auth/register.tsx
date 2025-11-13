import { Link } from "expo-router";
import React, { useState } from "react";
import { ImageSourcePropType, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLogo from "../../components/AppLogo";
import PrimaryButton from "../../components/PrimaryButton";
import RoleOption from "../../components/RoleOption";
import SmartInput from "../../components/SmartInput";
import { colors } from "../../design/theme";

type RoleKey = "farmer" | "distributor" | "consumer";

type RoleConfig = {
	label: string;
	icon: ImageSourcePropType;
	activeBackground: string;
	activeBorder: string;
};

const ROLE_OPTIONS: Record<RoleKey, RoleConfig> = {
	farmer: {
		label: "Petani/Nelayan",
		icon: require("../../assets/icon-role/logo-petani-nelayan.png"),
		activeBackground: "#E6F6EF",
		activeBorder: "#6AC4B5",
	},
	distributor: {
		label: "Distributor",
		icon: require("../../assets/icon-role/logo-distrbutor.png"),
		activeBackground: "#E9F0FF",
		activeBorder: "#385A9D",
	},
	consumer: {
		label: "Konsumen",
		icon: require("../../assets/icon-role/logo-konsumen.png"),
		activeBackground: "#FFF3E2",
		activeBorder: "#F1A545",
	},
};

export default function RegisterScreen() {
	const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);

	const roleEntries = Object.entries(ROLE_OPTIONS) as [RoleKey, RoleConfig][];

	return (
		<SafeAreaView className="flex-1 bg-[#ffffff]">
			<View className="flex-1 px-6 pt-12 pb-10">
				<View className="items-center">
					<AppLogo  />
				</View>

				<View>
					<Text
						className="text-[15px] text-[#0E1B2A]"
						style={{ fontFamily: "Montserrat-SemiBold" }}
					>
						Buat Akun Anda
					</Text>
				</View>

				<View className="gap-4 mt-2.5">
					<SmartInput placeholder="Masukkan nama pengguna/email Anda" />
					<SmartInput secure placeholder="Masukkan kata sandi Anda" />
					<SmartInput secure placeholder="Konfirmasikan kata sandi Anda" />
				</View>

				<View className="mt-4">
					<Text
						className="text-[15px] text-[#0E1B2A]"
						style={{ fontFamily: "Montserrat-SemiBold" }}
					>
						Pilih Peran
					</Text>

					<View className="flex-row gap-3 mt-2.5">
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

				<View className="mt-8">
					<PrimaryButton title="Daftar" onPress={() => {}} />
				</View>

				<View className="items-center mt-auto">
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
		</SafeAreaView>
	);
}


