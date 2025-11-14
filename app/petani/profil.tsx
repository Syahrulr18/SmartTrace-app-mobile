import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const menuItems = [
  {
    id: "profile",
    label: "Profil Saya",
    icon: require("../../assets/icon-on-profil/profil-settings.png"),
  },
  {
    id: "notification",
    label: "Notifikasi",
    icon: require("../../assets/icon-on-profil/notification.png"),
  },
  {
    id: "faq",
    label: "FAQ",
    icon: require("../../assets/icon-on-profil/faq-icon.png"),
  },
  {
    id: "about",
    label: "Tentang Aplikasi",
    icon: require("../../assets/icon-on-profil/about-icon.png"),
  },
];

function MenuItem({
  label,
  icon,
}: {
  label: string;
  icon: ImageSourcePropType;
}) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 mb-3">
      <View className="flex-row items-center gap-3">
        <Image
          source={icon}
          style={{ width: 20, height: 30, resizeMode: "contain" }}
        />
        <Text
          className="text-[12px] text-[#0E1B2A]"
          style={{ fontFamily: "Montserrat-SemiBold" }}
        >
          {label}
        </Text>
      </View>

      <Text
        className="text-[18px] text-[#CBD5F5]"
        style={{ fontFamily: "Montserrat-ExtraBold" }}
      >
        ›
      </Text>
    </TouchableOpacity>
  );
}

export default function FarmerProfileScreen() {
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
      <ScrollView
        className="flex-1 bg-[#F6F6F6]"
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#2D5652", "#96D3CC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-10  rounded-b-[32px]"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                className="text-white text-[16px]"
                style={{ fontFamily: "Montserrat-Bold" }}
              >
                Petani/Nelayan
              </Text>
            </View>
            <View>
              <Image
                source={require("../../assets/icon-role/logo-petani-nelayan.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
          </View>

          <View className="items-center mt-8">
            <View className="w-32 h-32 rounded-full overflow-hidden border-[4px] border-white/30">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        </LinearGradient>
        <View className="bg-[#F6F6F6] ">
          <View className="flex-1 justify-center items-center mb-10">
            <Text
              className="text-black text-[20px] mt-4"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Budi Santoso
            </Text>
            <Text
              className="text-[#9B9898] text-[13px] mt-1 mb-6"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              budisantoso76@gmail.com
            </Text>
          </View>

          <View className="px-6 -mt-10 ">
            {menuItems.map((item) => (
              <MenuItem key={item.id} label={item.label} icon={item.icon} />
            ))}

            <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-4 mt-2 border border-[#FECACA]">
              <View className="flex-row items-center gap-3">
                <Image
                  source={require("../../assets/icon-on-profil/logout.png")}
                  style={{ width: 20, height: 30, resizeMode: "contain" }}
                />
                <Text
                  className="text-[12px] ml-3"
                  style={{
                    color: "#DC2626",
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
