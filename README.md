# 🚘 Car Wash Dashboard App

Aplikasi dashboard kasir untuk layanan **cuci mobil & motor**, dibuat menggunakan **Vue 3 + Pinia + Tailwind CSS** dan JSON Server sebagai mock API.

---

## ✨ Fitur Utama

- ✅ Menampilkan daftar layanan cuci kendaraan (mobil & motor) berdasarkan kategori
- 🧺 Menambahkan layanan ke keranjang transaksi
- 🧾 Menyimpan transaksi beserta nama pelanggan
- 🔧 Menampilkan daftar transaksi yang sedang dikerjakan
- ✅ Menandai transaksi telah selesai
- 📜 Menampilkan riwayat transaksi yang sudah selesai
- 📊 Menampilkan laporan jumlah transaksi total, total mobil, total motor, dan pendapatan

---

## 🗂️ Struktur Folder (Bagian `views/`)

```bash
src/
├── views/
│   ├── Home.vue             # Halaman pemilihan layanan (tambah ke keranjang)
│   ├── Transaksi.vue        # Halaman checkout keranjang
│   ├── Pengerjaan.vue       # Daftar transaksi yang sedang dikerjakan
│   ├── Riwayat.vue          # Daftar transaksi yang sudah selesai
│   ├── Laporan.vue          # Ringkasan total transaksi dan pendapatan
├── stores/
│   ├── menuStore.js         # Store layanan cuci kendaraan
│   └── transaksiStore.js    # Store keranjang dan transaksi
├── router/
│   └── router.js             # Routing halaman
├── components/
│   └── Sidebar.vue          # Sidebar navigasi tetap

---

## 🚏 Routing Halaman
| Path          | Nama       | Deskripsi                                 |
| ------------- | ---------- | ----------------------------------------- |
| `/`           | Home       | Menampilkan daftar layanan                |
| `/transaksi`  | Transaksi  | Menampilkan isi keranjang dan konfirmasi  |
| `/pengerjaan` | Pengerjaan | Menampilkan transaksi yang belum selesai  |
| `/riwayat`    | Riwayat    | Menampilkan transaksi yang sudah selesai  |
| `/laporan`    | Laporan    | Menampilkan ringkasan total dan statistik |

---

## 🔌 API Endpoint (JSON Server)
### Menu
GET    /menu

### Transaksi
GET    /transaksi               # Ambil semua transaksi
POST   /transaksi               # Simpan transaksi baru
PATCH  /transaksi/:id          # Update status selesai





