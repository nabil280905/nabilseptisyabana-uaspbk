<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="max-w-7xl mx-auto space-y-10">
      <h1 class="text-2xl font-bold text-blue-600">📊 Laporan Ringkasan Transaksi</h1>

      <!-- Kartu Ringkasan -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white shadow rounded-xl p-6 border-l-4 border-blue-500">
          <h2 class="text-sm text-gray-500">Total Transaksi</h2>
          <p class="text-3xl font-bold text-blue-600">{{ totalTransaksi }}</p>
        </div>
        <div class="bg-white shadow rounded-xl p-6 border-l-4 border-green-500">
          <h2 class="text-sm text-gray-500">Total Pendapatan</h2>
          <p class="text-3xl font-bold text-green-600">Rp {{ totalPendapatan.toLocaleString() }}</p>
        </div>
        <div class="bg-white shadow rounded-xl p-6 border-l-4 border-yellow-500">
          <h2 class="text-sm text-gray-500">Layanan Populer</h2>
          <p class="text-xl font-semibold text-yellow-600">{{ layananFavorit }}</p>
        </div>
        <div class="bg-white shadow rounded-xl p-6 border-l-4 border-purple-500">
          <h2 class="text-sm text-gray-500">Total Mobil</h2>
          <p class="text-3xl font-bold text-purple-600">{{ totalMobil }}</p>
        </div>
        <div class="bg-white shadow rounded-xl p-6 border-l-4 border-pink-500">
          <h2 class="text-sm text-gray-500">Total Motor</h2>
          <p class="text-3xl font-bold text-pink-600">{{ totalMotor }}</p>
        </div>
      </div>

      <!-- Tabel Transaksi -->
      <div class="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
        <table class="w-full table-auto min-w-[800px] text-left">
          <thead class="bg-blue-100 text-blue-800 text-sm uppercase">
            <tr>
              <th class="py-3 px-4">No</th>
              <th class="py-3 px-4">Pelanggan</th>
              <th class="py-3 px-4">Kendaraan</th>
              <th class="py-3 px-4">Layanan</th>
              <th class="py-3 px-4">Total</th>
              <th class="py-3 px-4">Waktu</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(t, i) in laporan"
              :key="t.id"
              class="border-b hover:bg-blue-50 transition"
            >
              <td class="py-3 px-4">{{ i + 1 }}</td>
              <td class="py-3 px-4 font-medium">{{ t.pelanggan }}</td>
              <td class="py-3 px-4 capitalize">{{ t.kendaraan || '-' }}</td>
              <td class="py-3 px-4">
                <ul class="list-disc pl-4 space-y-1 text-sm text-gray-700 max-h-32 overflow-y-auto">
                  <li v-for="item in t.items" :key="item.id">
                    {{ item.nama }}
                  </li>
                </ul>
              </td>
              <td class="py-3 px-4 text-green-600 font-semibold">Rp {{ t.total.toLocaleString() }}</td>
              <td class="py-3 px-4 text-gray-500 text-sm">{{ formatTanggal(t.waktu) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

const laporan = computed(() => transaksiStore.transaksiSelesai)

const totalTransaksi = computed(() => laporan.value.length)

const totalPendapatan = computed(() =>
  laporan.value.reduce((sum, t) => sum + t.total, 0)
)

const layananFavorit = computed(() => {
  const layananCount = {}
  laporan.value.forEach(t =>
    t.items.forEach(item => {
      layananCount[item.nama] = (layananCount[item.nama] || 0) + 1
    })
  )
  const sorted = Object.entries(layananCount).sort((a, b) => b[1] - a[1])
  return sorted.length ? sorted[0][0] : '-'
})

const totalMobil = computed(() =>
  laporan.value.filter((t) => t.kendaraan?.toLowerCase() === 'mobil').length
)

const totalMotor = computed(() =>
  laporan.value.filter((t) => t.kendaraan?.toLowerCase() === 'motor').length
)

function formatTanggal(date) {
  return new Date(date).toLocaleString('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
</script>
