<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 to-white">
    <!-- Tombol Keranjang -->
    <button
      @click="router.push('/transaksi')"
      class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 fixed top-5 right-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200">
      🧺 Keranjang
      <span v-if="keranjangCount > 0"
        class="bg-white text-blue-600 text-xs font-bold rounded-full px-2 py-0.5 shadow">
        {{ keranjangCount }}
      </span>
    </button>

    <!-- Konten -->
    <div class="pt-10 pb-16 px-6 max-w-6xl mx-auto space-y-14">
      <!-- Judul Halaman -->
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          🚗 Menu Layanan Cuci Kendaraan
        </h1>
        <p class="text-gray-600 mt-2">Pilih layanan terbaik untuk pelanggan Anda</p>
      </div>

      <!-- List Kategori Menu -->
      <div
        v-for="menu in menuStore.daftarMenu"
        :key="menu.id"
        class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-4"
      >
        <!-- Judul Kategori -->
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6H21V8H3V6ZM3 10H21V12H3V10ZM3 14H21V16H3V14ZM3 18H21V20H3V18Z" />
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-blue-700">{{ menu.kategori }}</h2>
        </div>

        <!-- List Variasi -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="item in menu.variasi"
            :key="item.id"
            class="bg-gradient-to-tr from-white via-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow hover:shadow-md transition-transform duration-200 hover:scale-105"
          >
            <h3 class="text-lg font-semibold text-gray-700 mb-1">{{ item.nama }}</h3>
            <p class="text-sm text-gray-500 mb-4">Rp {{ item.harga.toLocaleString() }}</p>
            <button
              @click="tambahKeKeranjang(item)"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition">
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menuStore'
import { useTransaksiStore } from '@/stores/transaksiStore'

const router = useRouter()

const menuStore = useMenuStore()
const transaksiStore = useTransaksiStore()

onMounted(() => {
  menuStore.fetchMenu()
})

const tambahKeKeranjang = (item) => {
  transaksiStore.tambahKeKeranjang(item)
}

const keranjangCount = computed(() => transaksiStore.keranjang.length)
</script>

<style scoped>
</style>
