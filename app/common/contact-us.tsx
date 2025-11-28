import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    Image,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WhatsAppIcon from "../../components/icons/WhatsAppIcon";


export default function ContactUsScreen() {
  const router = useRouter();

  const handleWhatsAppPress = () => {
    Linking.openURL("https://wa.me/qr/GVMASZ5M776PM1");
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#2D5652", "#96D3CC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-5 pb-10 rounded-b-[32px]"
        >
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-4"
            >
              <Text className="text-white text-2xl">‹</Text>
            </TouchableOpacity>
            <Text
              className="text-white text-[20px]"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Hubungi Kami
            </Text>
          </View>
        </LinearGradient>

        <View className="px-6 mt-8">
          <View className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 items-center">
            <Text
              className="text-[16px] text-[#0E1B2A] text-center mb-2"
              style={{ fontFamily: "Montserrat-Bold" }}
            >
              Butuh Bantuan?
            </Text>
            <Text
              className="text-[14px] text-[#9B9898] text-center mb-6"
              style={{ fontFamily: "Montserrat-Medium" }}
            >
              Tim support kami siap membantu anda. Silahkan hubungi kami melalui WhatsApp.
            </Text>

            <TouchableOpacity
              onPress={handleWhatsAppPress}
              className="flex-row items-center justify-center bg-[#25D366] rounded-xl px-6 py-3 w-full shadow-md"
            >
              <WhatsAppIcon width={24} height={24} />
              <Text
                className="text-white text-[16px] ml-3"
                style={{ fontFamily: "Montserrat-Bold" }}
              >
                Chat WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
