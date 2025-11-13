import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLogo from "../../components/AppLogo";
import PrimaryButton from "../../components/PrimaryButton";
import SmartInput from "../../components/SmartInput";
import { colors } from "../../design/theme";

export default function LoginScreen() {
	return (
		<SafeAreaView className="flex-1 bg-[#ffffff]">
			<View className="flex-1 px-6 pt-12 pb-10">
				<View className="items-center">
					<AppLogo  />
				</View>

				<View className="mt-10">
					<Text
						className="text-[15px] text-[#0E1B2A]"
						style={{ fontFamily: "Montserrat-SemiBold" }}
					>
						Masuk ke Akun Anda
					</Text>
				</View>

				<View className="gap-4 mt-6">
					<SmartInput placeholder="Masukkan nama pengguna / email Anda" />
					<SmartInput secure placeholder="Masukkan kata sandi Anda" />
				</View>

				<View className="mt-20">
					<PrimaryButton title="Masuk" onPress={() => {}} />
				</View>

				<View className="items-center mt-auto">
					<Text
						className="text-[12px]"
						style={{ color: colors.textSecondary, fontFamily: "Montserrat-Medium" }}
					>
						Belum punya akun?{" "}
						<Link className="text-[#F59E0B]" href={"/auth/register" as never}>
							Daftar di sini
						</Link>
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}


