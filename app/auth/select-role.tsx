import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../../components/PrimaryButton";
import RoleOption from "../../components/RoleOption";
import { useAuth, UserRole } from "../../context/AuthContext";

export default function SelectRoleScreen() {
	const router = useRouter();
	const { selectRole, isLoading } = useAuth();
	const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

	const handleContinue = async () => {
		if (!selectedRole) {
			return;
		}

		try {
			await selectRole(selectedRole);
			// Navigate to role-specific home screen
			router.replace(`../${selectedRole}/home` as any);
		} catch (error) {
			console.error("Role selection error:", error);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-[#ffffff]">
			<View className="flex-1 px-6 pt-12 pb-10">
				<View>
					<Text
						className="text-[20px] text-[#0E1B2A]"
						style={{ fontFamily: "Montserrat-Bold" }}
					>
						Pilih Peran Anda
					</Text>
					<Text
						className="text-[14px] text-[#64748B] mt-2"
						style={{ fontFamily: "Montserrat-Regular" }}
					>
						Anda dapat bergabung dengan berbagai peran dalam sistem SmartTrace
					</Text>
				</View>

				<View className="gap-4 mt-8 flex-row flex-wrap">
					<View className="w-1/3">
						<RoleOption
							label="Petani"
							icon={require("../../assets/icon-role/logo-petani-nelayan.png")}
							selected={selectedRole === "petani"}
							onPress={() => setSelectedRole("petani")}
							activeBackground="#dcfce7"
							activeBorder="#22c55e"
						/>
					</View>

					<View className="w-1/3">
						<RoleOption
							label="Distributor"
							icon={require("../../assets/icon-role/logo-distributor.png")}
							selected={selectedRole === "distributor"}
							onPress={() => setSelectedRole("distributor")}
							activeBackground="#bfdbfe"
							activeBorder="#3b82f6"
						/>
					</View>

					<View className="w-1/3">
						<RoleOption
							label="Konsumen"
							icon={require("../../assets/icon-role/logo-konsumen.png")}
							selected={selectedRole === "konsumen"}
							onPress={() => setSelectedRole("konsumen")}
							activeBackground="#fed7aa"
							activeBorder="#f59e0b"
						/>
					</View>
				</View>

				<View className="mt-auto">
					<PrimaryButton
						title={isLoading ? "" : "Lanjutkan"}
						onPress={handleContinue}
						disabled={!selectedRole || isLoading}
					/>

					{isLoading && (
						<View className="absolute top-5 left-0 right-0 items-center">
							<ActivityIndicator color="#ffffff" size="small" />
						</View>
					)}
				</View>
			</View>
		</SafeAreaView>
	);
}
