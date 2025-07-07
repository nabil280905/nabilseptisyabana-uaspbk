<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-200">
      <h1 class="text-2xl font-bold text-blue-600">🧾 Transaksi</h1>

      <!-- Form Pelanggan -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-700">Nama Pelanggan</label>
          <input
            v-model="namaPelanggan"
            type="text"
            placeholder="Masukkan nama pelanggan"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700">Jenis Kendaraan</label>
          <select
            v-model="jenisKendaraan"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">-- Pilih Kendaraan --</option>
            <option value="Mobil">Mobil</option>
            <option value="Motor">Motor</option>
          </select>
        </div>
      </div>

      <!-- Keranjang -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-3">📦 Daftar Layanan</h2>

        <div v-if="keranjang.length === 0" class="text-gray-500 italic">
          Keranjang masih kosong.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="(item, index) in keranjang"
            :key="item.id"
            class="flex justify-between items-center bg-gray-100 rounded-lg p-3 border border-gray-200"
          >
            <div>
              <p class="font-semibold text-gray-700">{{ item.nama }}</p>
              <p class="text-sm text-gray-500">Rp {{ item.harga.toLocaleString() }}</p>
            </div>
            <button
              @click="hapusItem(index)"
              class="text-red-500 hover:text-red-700"
              title="Hapus"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Total & Checkout -->
      <div class="flex justify-between items-center pt-4 border-t border-gray-200">
        <p class="text-lg font-semibold text-gray-800">
          Total: <span class="text-blue-600">Rp {{ totalHarga.toLocaleString() }}</span>
        </p>
        <button
          @click="checkout"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()
const namaPelanggan = ref('')
const jenisKendaraan = ref('')

const keranjang = computed(() => transaksiStore.keranjang)
const totalHarga = computed(() => transaksiStore.totalHarga)

function hapusItem(index) {
  transaksiStore.hapusDariKeranjang(index)
}

async function checkout() {
  if (!namaPelanggan.value.trim() || !jenisKendaraan.value.trim()) {
    alert('Nama dan jenis kendaraan harus diisi.')
    return
  }

  await transaksiStore.simpanTransaksi(namaPelanggan.value, jenisKendaraan.value)
  namaPelanggan.value = ''
  jenisKendaraan.value = ''
  alert('Transaksi berhasil disimpan!')
}
</script>
