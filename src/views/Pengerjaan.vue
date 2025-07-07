<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold text-blue-600 mb-6">🔧 Pengerjaan Sedang Berlangsung</h1>

      <div v-if="belumSelesai.length === 0" class="text-center text-gray-500">
        Tidak ada transaksi yang sedang dikerjakan.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="transaksi in belumSelesai"
          :key="transaksi.id"
          class="bg-white border border-gray-200 rounded-xl shadow-md p-5 space-y-4 flex flex-col justify-between"
        >
          <div>
            <h2 class="text-lg font-semibold text-gray-800">👤 {{ transaksi.pelanggan }}</h2>
            <p class="text-sm text-gray-500">🚗 Kendaraan: {{ transaksi.kendaraan || 'Tidak diketahui' }}</p>
            <p class="text-sm text-gray-400">🕒 {{ formatWaktu(transaksi.waktu) }}</p>

            <div class="mt-4">
              <h3 class="font-semibold text-gray-700 mb-2">🧼 Layanan:</h3>
              <ul class="max-h-40 overflow-y-auto space-y-1">
                <li
                  v-for="item in transaksi.items"
                  :key="item.id"
                  class="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded border border-gray-100"
                >
                  {{ item.nama }} - Rp {{ item.harga.toLocaleString() }}
                </li>
              </ul>
            </div>
          </div>

          <div class="flex justify-between items-center mt-4">
            <p class="font-bold text-blue-600">Total: Rp {{ transaksi.total.toLocaleString() }}</p>
            <button
              @click="tandaiSelesai(transaksi.id)"
              class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
            >
              Tandai Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTransaksiStore } from '@/stores/transaksiStore'
import { onMounted, computed } from 'vue'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

const belumSelesai = computed(() => transaksiStore.transaksiBelumSelesai)

function formatWaktu(isoString) {
  const date = new Date(isoString)
  return date.toLocaleString('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

function tandaiSelesai(id) {
  transaksiStore.tandaiSelesai(id)
}
</script>
