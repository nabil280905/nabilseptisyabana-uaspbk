<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-blue-600">🚗 Car Wash App</h1>
      <router-link to="/transaksi" class="relative">
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
          🧺 Keranjang
          <span
            v-if="keranjangCount > 0"
            class="ml-2 bg-white text-blue-600 text-xs font-bold rounded-full px-2 py-0.5"
          >
            {{ keranjangCount }}
          </span>
        </button>
      </router-link>
    </div>

    <!-- Content -->
    <div class="pt-24 pb-10 px-6 max-w-6xl mx-auto space-y-12">
      <div
        v-for="menu in menuStore.daftarMenu"
        :key="menu.id"
        class="bg-white rounded-xl shadow-md border border-gray-200 p-6"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ menu.kategori }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="item in menu.variasi"
            :key="item.id"
            class="p-4 rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition"
          >
            <h3 class="font-semibold text-gray-700">{{ item.nama }}</h3>
            <p class="text-gray-500 text-sm mb-2">Rp {{ item.harga.toLocaleString() }}</p>
            <button
              @click="tambahKeKeranjang(item)"
              class="mt-auto bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import { useTransaksiStore } from '@/stores/transaksiStore'
import { computed } from 'vue'

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
/* Optional: scrollbar for better mobile support */
</style>
