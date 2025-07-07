<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold text-green-600 mb-6">📋 Riwayat Transaksi Selesai</h1>

      <div v-if="riwayat.length === 0" class="text-gray-500 text-center mt-10">
        Tidak ada transaksi yang selesai.
      </div>

      <div v-else class="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table class="w-full text-left table-auto min-w-[800px]">
          <thead class="bg-green-100 text-green-800 text-sm uppercase tracking-wider">
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
              v-for="(transaksi, index) in riwayat"
              :key="transaksi.id"
              class="border-b hover:bg-green-50 transition"
            >
              <td class="py-3 px-4">{{ index + 1 }}</td>
              <td class="py-3 px-4 font-medium">{{ transaksi.pelanggan }}</td>
              <td class="py-3 px-4">{{ transaksi.kendaraan || '-' }}</td>
              <td class="py-3 px-4">
                <ul class="list-disc pl-4 space-y-1 text-sm text-gray-700 max-h-32 overflow-y-auto">
                  <li v-for="item in transaksi.items" :key="item.id">
                    {{ item.nama }} - Rp {{ item.harga.toLocaleString() }}
                  </li>
                </ul>
              </td>
              <td class="py-3 px-4 font-semibold text-green-600">
                Rp {{ transaksi.total.toLocaleString() }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-500">
                {{ formatWaktu(transaksi.waktu) }}
              </td>
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

const riwayat = computed(() => transaksiStore.transaksiSelesai)

function formatWaktu(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
</script>
