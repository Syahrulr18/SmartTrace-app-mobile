import { useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartModal, { CartItem } from "../../components/CartModal";
import CartSummary from "../../components/CartSummary";
import MarketplaceProductCard from "../../components/MarketplaceProductCard";
import PurchaseModal from "../../components/PurchaseModal";
import SearchIcon from "../../components/icons/SearchIcon";
import ShoppingCartIcon from "../../components/icons/ShoppingCart";

interface FarmerProduct {
	id: string;
	farmerName: string;
	farmerId: string;
	productName: string;
	type: "Hasil Laut" | "Sayuran" | "Buah-buahan";
	quantity: number;
	price: number;
	location: string;
	quality: number;
	image?: any;
	available: boolean;
	bankAccount: string;
}

// Data logis dari petani yang sedang menjual
const farmerProducts: FarmerProduct[] = [
	{
		id: "prod-001",
		farmerName: "Petani Laut Makassar",
		farmerId: "farmer-001",
		productName: "Ikan Cakalang",
		type: "Hasil Laut",
		quantity: 50,
		price: 10000,
		location: "TPI Paotere Makassar",
		quality: 98,
		image: require("../../assets/produk-images/Ikan-kembung.jpeg"),
		available: true,
		bankAccount: "BCA 1234567890 a.n Petani Laut Makassar",
	},
	{
		id: "prod-002",
		farmerName: "Petani Laut Makassar",
		farmerId: "farmer-001",
		productName: "Cumi",
		type: "Hasil Laut",
		quantity: 25,
		price: 25000,
		location: "TPI Paotere Makassar",
		quality: 85,
		available: true,
		bankAccount: "BCA 1234567890 a.n Petani Laut Makassar",
	},
	{
		id: "prod-003",
		farmerName: "Petani Sayuran Bandung",
		farmerId: "farmer-002",
		productName: "Kangkung Segar",
		type: "Sayuran",
		quantity: 100,
		price: 5000,
		location: "Pasar Bandung",
		quality: 90,
		image: require("../../assets/produk-images/bayam.jpeg"),
		available: true,
		bankAccount: "BRI 0987654321 a.n Petani Sayuran Bandung",
	},
	{
		id: "prod-004",
		farmerName: "Petani Sayuran Bandung",
		farmerId: "farmer-002",
		productName: "Bayam Organik",
		type: "Sayuran",
		quantity: 80,
		price: 8000,
		location: "Pasar Bandung",
		quality: 92,
		image: require("../../assets/produk-images/bayam.jpeg"),
		available: true,
		bankAccount: "BRI 0987654321 a.n Petani Sayuran Bandung",
	},
	{
		id: "prod-005",
		farmerName: "Petani Laut Jakarta",
		farmerId: "farmer-003",
		productName: "Udang Kecil",
		type: "Hasil Laut",
		quantity: 30,
		price: 25000,
		location: "TPI Jakarta",
		quality: 95,
		available: true,
		bankAccount: "Mandiri 1122334455 a.n Petani Laut Jakarta",
	},
	{
		id: "prod-006",
		farmerName: "Petani Buah Bogor",
		farmerId: "farmer-004",
		productName: "Apel Merah",
		type: "Buah-buahan",
		quantity: 150,
		price: 15000,
		location: "Kebun Bogor",
		quality: 88,
		image: require("../../assets/produk-images/images.jpeg"),
		available: true,
		bankAccount: "BNI 5566778899 a.n Petani Buah Bogor",
	},
];

const PRODUCT_TYPES = ["Semua", "Hasil Laut", "Sayuran", "Buah-buahan"];

const MarketplaceScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("Semua");
    const [products, setProducts] = useState<FarmerProduct[]>(farmerProducts);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [purchase, setPurchase] = useState<{ product: FarmerProduct | null; qty: number }>({ product: null, qty: 1 });
    const [cartModalVisible, setCartModalVisible] = useState(false);

	// Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === "Semua" || product.type === selectedType;
        return matchesSearch && matchesType && product.available;
    });

    const openPurchase = (product: FarmerProduct) => {
        setPurchase({ product, qty: 1 });
    };

    const confirmPurchase = () => {
        if (!purchase.product) return;
        const maxQty = purchase.product.quantity;
        if (purchase.qty < 1 || purchase.qty > maxQty) {
            Alert.alert("Jumlah tidak valid", `Masukkan jumlah 1–${maxQty} kg`);
            return;
        }

        const newItem: CartItem = {
            id: purchase.product.id,
            name: purchase.product.productName,
            price: purchase.product.price,
            quantity: purchase.qty,
            seller: purchase.product.farmerName,
            image: purchase.product.image,
            date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }),
            bankAccount: purchase.product.bankAccount
        };

        setCartItems([...cartItems, newItem]);
        setProducts(prev => prev.map(p => p.id === purchase.product!.id ? { ...p, quantity: p.quantity - purchase.qty, available: p.quantity - purchase.qty > 0 } : p));
        setPurchase({ product: null, qty: 1 });
        Alert.alert("Sukses", "Produk ditambahkan ke keranjang");
    };

    const handleCheckout = () => {
        Alert.alert(
            "Konfirmasi Checkout",
            "Apakah Anda yakin ingin memproses pembelian ini?",
            [
                { text: "Batal", style: "cancel" },
                { 
                    text: "Ya, Proses", 
                    onPress: () => {
                        setCartItems([]);
                        setCartModalVisible(false);
                        Alert.alert("Berhasil", "Pembelian berhasil diproses!");
                    }
                }
            ]
        );
    };

	return (
		<SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
			<ScrollView
				className="flex-1 bg-[#F5F6F9]"
				contentContainerClassName="pb-24"
				showsVerticalScrollIndicator={false}
			>
				{/* Header Section */}
				<View className="bg-white px-6 pt-4 pb-4 flex-row items-center justify-between">
					<View>
						<Image
							source={require("../../assets/logo-smarttrace/logo-dashbord.png")}
							style={{ width: 130, height: 46, resizeMode: "contain" }}
						/>
					</View>

					<View className="flex-row items-center gap-2">
						<View className="items-end">
							<Text
								className="text-[13px]"
								style={{ color: "#0E1B2A", fontFamily: "Montserrat-Bold" }}
							>
								PT Logistik Segar
							</Text>
							<Text
								className="text-[11px]"
								style={{ color: "#94A3B8", fontFamily: "Montserrat-Medium" }}
							>
								Distributor/Logistik
							</Text>
						</View>
						<View className="w-10 h-10 rounded-full items-center justify-center">
							<Image
								source={require("../../assets/icon-role/logo-distributor.png")}
								style={{ width: 40, height: 40, resizeMode: "contain" }}
							/>
						</View>
					</View>
				</View>

				{/* Title Section */}
				<View className="px-6 pt-4">
					<Text
						className="text-[16px]"
						style={{ color: "#0E1B2A", fontFamily: "Montserrat-Bold" }}
					>
						Marketplace
					</Text>
				</View>

				{/* Search Section */}
				<View className="px-6 pt-4 flex-row items-center gap-3">
					<View className="flex-1 flex-row items-center bg-white rounded-full px-3 py-0.4 border border-[#E4E7EC] gap-2">
						<SearchIcon color="#9B9898" width={14} height={14} />
						<TextInput
							placeholder="Cari produk atau petani"
							placeholderTextColor="rgba(14, 27, 42, 0.4)"
							value={searchQuery}
							onChangeText={setSearchQuery}
							className="flex-1 text-[11px]"
							style={{ fontFamily: "Montserrat-Medium", color: "#0E1B2A" }}
						/>
					</View>
                    <TouchableOpacity 
                        onPress={() => setCartModalVisible(true)}
                        className="w-10 h-10 rounded-full bg-[#F0F9FF] items-center justify-center border border-[#E0F2FE]"
                    >
                        <View className="relative">
                            <ShoppingCartIcon size={20} color="#0369A1" />
                            {cartItems.length > 0 && (
                                <View className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full items-center justify-center">
                                    <Text className="text-[8px] text-white font-bold">{cartItems.length}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
				</View>

				{/* Filter Section - Product Type */}
				<View className="px-6 pt-4">
					<Text
						className="text-[12px] mb-2"
						style={{ color: "#0E1B2A", fontFamily: "Montserrat-SemiBold" }}
					>
						Jenis Produk
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="gap-2"
					>
						{PRODUCT_TYPES.map((type) => (
							<TouchableOpacity
								key={type}
								onPress={() => setSelectedType(type)}
								className={`px-4 py-2 rounded-full border ${
									selectedType === type
										? "bg-[#0369A1] border-[#0369A1]"
										: "bg-white border-[#E4E7EC]"
								}`}
							>
								<Text
									className="text-[11px]"
									style={{
										color: selectedType === type ? "#ffffff" : "#0E1B2A",
										fontFamily: "Montserrat-SemiBold",
									}}
								>
									{type}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* Products Grid */}
				<View className="px-6 pt-5">
					{filteredProducts.length > 0 ? (
						<View className="gap-3">
							{filteredProducts.map((product) => (
								<MarketplaceProductCard
									key={product.id}
									product={product}
									onBuyPress={openPurchase}
								/>
							))}
						</View>
					) : (
						<View
							className="bg-white rounded-2xl p-8 items-center justify-center border border-[#E2E8F0]"
							style={{ minHeight: 200 }}
						>
							<Text
								className="text-[12px] text-[#94A3B8]"
								style={{ fontFamily: "Montserrat-Medium" }}
							>
								Produk tidak ditemukan
							</Text>
						</View>
					)}
				</View>

				{/* Cart Summary - Optional, keeping it if it doesn't break, but CartModal is primary now */}
				<CartSummary cartItems={cartItems.map(i => ({ id: i.id, qty: i.quantity }))} farmerProducts={farmerProducts} />

				<PurchaseModal
					product={purchase.product}
					quantity={purchase.qty}
					onQuantityChange={(qty) => setPurchase((prev) => ({ ...prev, qty }))}
					onConfirm={confirmPurchase}
					onClose={() => setPurchase({ product: null, qty: 1 })}
				/>

                <CartModal 
                    visible={cartModalVisible}
                    onClose={() => setCartModalVisible(false)}
                    cartItems={cartItems}
                    onCheckout={handleCheckout}
                />
			</ScrollView>
        </SafeAreaView>
    );
};

export default MarketplaceScreen;
