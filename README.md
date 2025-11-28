# SmartTrace Mobile App

SmartTrace adalah aplikasi seluler komprehensif untuk keterlacakan rantai pasokan makanan (*food supply chain traceability*), yang dirancang untuk menciptakan transparansi, keamanan, dan efisiensi dari petani hingga konsumen. Aplikasi ini mengintegrasikan teknologi modern seperti pemetaan digital (Maps) dan QR Code untuk memantau perjalanan produk secara *real-time*.

## � Arsitektur Sistem & Alur Kerja

Sistem SmartTrace dirancang untuk menciptakan rantai kepercayaan digital dari hulu ke hilir. Berikut adalah alur kerja lengkap sistem:

### 1. Produsen (Petani/Nelayan) - *The Origin*
Segala sesuatu dimulai dari Produsen.
*   **Pencatatan Lot Stok:** Produsen mencatat hasil panen dengan detail (jenis, berat, harga yang adil).
*   **Blockchain ID Cryptonesse:** Saat data disimpan, sistem mengunci data ini dan menghasilkan **Blockchain ID Cryptonesse**. Ini adalah bukti digital *immutable* (tidak dapat diubah) atas kualitas dan harga awal, melindungi produsen dari manipulasi harga.

### 2. Distributor - *The Bridge*
Distributor menghubungkan produk berkualitas ke pasar.
*   **Marketplace & Pembelian:** Distributor membeli Lot Stok yang terverifikasi langsung dari Produsen.
*   **Pembuatan Shipment:** Dalam proses pengiriman, Distributor menentukan produk, asal/tujuan, dan rute.
*   **QR Satuan:** Sistem menghasilkan **QR Satuan** yang dicetak dan ditempel pada setiap kemasan retail. Ini adalah kunci pelacakan unit per item.
*   **Real-time Tracking & IoT:** Selama perjalanan, Distributor memantau lokasi truk secara *real-time*.
*   **AI Critical Alerts:** Sensor IoT memantau kondisi lingkungan (suhu/kelembaban). Jika terjadi anomali (misal: AC truk mati), **AI SmartTrace** langsung mengirim notifikasi **Alert Kritis**. Distributor dapat segera bertindak untuk mencegah kerusakan produk (potensi kerugian besar).

### 3. Konsumen - *The Verification*
Konsumen memegang kendali atas informasi produk yang mereka beli.
*   **Scan QR Code:** Konsumen memindai QR Satuan pada kemasan menggunakan aplikasi.
*   **Transparansi Total:** Hasil scan menampilkan riwayat lengkap produk:
    *   **Asal-usul:** Siapa petaninya dan kapan dipanen.
    *   **Riwayat Perjalanan:** Rekaman suhu dan kondisi selama distribusi.
    *   **Status Mutu:** Jaminan kualitas terakhir produk.
*   **Trust:** Konsumen membeli dengan kepercayaan penuh karena data divalidasi oleh Blockchain.

---

## 💻 Teknologi yang Digunakan

### Frontend
*   **Framework:** React Native (Expo)
*   **Bahasa:** TypeScript
*   **Styling:** NativeWind (Tailwind CSS)
*   **Navigasi:** Expo Router
*   **Peta:** Expo Maps / Google Maps API
*   **Kamera:** Expo Camera (untuk QR Scan)
*   **Komponen UI:** Custom Components dengan desain modern dan responsif.

### Backend & Infrastruktur 
Untuk mendukung data dinamis dan skala besar, arsitektur backend dirancang menggunakan:
*   **API Server:** Node.js (NestJS/Express) - Menangani logika bisnis dan RESTful API.
*   **Database:**
    *   **MySQL:** Penyimpanan data relasional (user, produk, transaksi).
*   **Blockchain:** Hyperledger / Ethereum - Jaringan privat untuk mencatat **Blockchain ID Cryptonesse** (immutable ledger).
*   **IoT Integration:** MQTT Protocol - Komunikasi ringan untuk sensor suhu/kelembaban di truk.
*   **AI/ML Engine:** Python (TensorFlow/PyTorch) - Analisis data sensor untuk deteksi anomali dan prediksi kualitas.

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
