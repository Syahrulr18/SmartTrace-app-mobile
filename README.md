# SmartTrace Mobile App

SmartTrace adalah aplikasi seluler komprehensif untuk keterlacakan rantai pasokan makanan (*food supply chain traceability*), yang dirancang untuk menciptakan transparansi, keamanan, dan efisiensi dari petani hingga konsumen. Aplikasi ini mengintegrasikan teknologi modern seperti pemetaan digital (Maps) dan QR Code untuk memantau perjalanan produk secara *real-time*.

## 🚀 Status Pengembangan & Fitur

Berikut adalah laporan progres pengembangan fitur aplikasi SmartTrace yang telah diselesaikan:

### 🔐 Autentikasi & Profil
- [x] **Login & Register:** Alur autentikasi lengkap untuk semua pengguna.
- [x] **Manajemen Profil:** Halaman profil yang dapat diedit untuk setiap role (Petani, Konsumen, Distributor).
- [x] **Informasi Umum:** Halaman Bantuan (FAQ), Tentang Aplikasi, dan Notifikasi.

### 🌾 Role Petani / Nelayan
- [x] **Dashboard:** Halaman utama khusus Petani/Nelayan.
- [x] **Manajemen Produk:** Halaman daftar produk dan detail produk.
- [x] **Input Produk:** Fitur tambah produk baru lengkap dengan upload gambar.

### 🚚 Role Distributor / Logistik
- [x] **Dashboard:** Halaman utama khusus Distributor.
- [x] **Tracking System:** Halaman pelacakan status pengiriman.
- [x] **Manajemen Pengiriman:** Fitur tambah pengiriman dengan pemilihan rute via Maps dan generate QR Code Induk.
- [x] **Detail Pengiriman:** Tampilan informasi detail pengiriman.
- [x] **Manajemen Armada:** Antarmuka untuk mengelola armada transportasi.
- [x] **Marketplace:** Halaman pasar digital untuk distributor.
- [x] **Pembayaran:** Antarmuka checkout dan pembayaran.

### 👤 Role Konsumen
- [x] **Dashboard:** Halaman utama khusus Konsumen.
- [x] **Scan QR Code:** Fitur pemindai QR Code untuk melacak asal-usul produk.
- [x] **Traceability:** Tampilan detail perjalanan produk dari hulu ke hilir.

### 🛠️ Integrasi Teknologi
- [x] **API Maps:** Visualisasi lokasi dan rute distribusi.
- [x] **QR Code System:** Generator QR Code (untuk Distributor dan Petani) dan Scanner (untuk Konsumen).

---

## 📱 Detail Fitur per Role

### 1. Petani / Nelayan (Hijau)
Fokus pada pencatatan awal rantai pasok.
*   **Pencatatan Hasil Panen:** Input data komoditas, tanggal panen, dan lokasi lahan.
*   **Transparansi Kualitas:** Menampilkan skor kualitas awal produk.
*   **Manajemen Stok:** Memantau produk yang siap dijual ke distributor.

### 2. Distributor / Logistik (Biru)
Fokus pada rantai distribusi dan logistik.
*   **Perencanaan Rute:** Memilih titik awal dan tujuan menggunakan peta interaktif.
*   **QR Code Aggregation:** Membuat "Master QR" untuk satu batch pengiriman yang membawahi banyak unit produk.
*   **Monitoring Armada:** Mengelola kendaraan dan status pengiriman aktif.
*   **Marketplace B2B:** Membeli komoditas langsung dari petani terverifikasi.

### 3. Konsumen (Kuning)
Fokus pada verifikasi dan informasi produk.
*   **Scan & Trace:** Memindai QR Code pada kemasan untuk melihat cerita lengkap produk.
*   **Informasi Detail:** Mengetahui siapa petani, kapan dipanen, dan rute perjalanan produk.
*   **Jaminan Keaslian:** Memastikan produk yang dibeli asli dan aman dikonsumsi.

---

## 💻 Teknologi yang Digunakan

*   **Framework:** React Native (Expo)
*   **Bahasa:** TypeScript
*   **Styling:** NativeWind (Tailwind CSS)
*   **Navigasi:** Expo Router
*   **Peta:** Expo Maps / Google Maps API
*   **Kamera:** Expo Camera (untuk QR Scan)
*   **Komponen UI:** Custom Components dengan desain modern dan responsif.

---

## 📦 Cara Menjalankan Aplikasi

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Jalankan Aplikasi:**
    ```bash
    npx expo start
    ```

3.  **Scan di Perangkat:**
    Gunakan aplikasi **Expo Go** di Android/iOS untuk memindai QR code yang muncul di terminal.
