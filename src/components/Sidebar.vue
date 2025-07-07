<template>
  <aside class="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-600 to-blue-800 shadow-lg z-50">
    <div class="flex items-center justify-center h-20 text-white font-bold text-xl border-b border-blue-500">
      🚗 Car Wash App
    </div>

    <nav class="p-4 text-white space-y-2">
      <RouterLink
        to="/"
        class="sidebar-link"
        :class="{ 'bg-blue-700 font-semibold': $route.path === '/' }"
      >
        🏠 Beranda
      </RouterLink>

      <RouterLink
        to="/transaksi"
        class="sidebar-link"
        :class="{ 'bg-blue-700 font-semibold': $route.path === '/transaksi' }"
      >
        🧾 Transaksi
      </RouterLink>

      <RouterLink
        to="/pengerjaan"
        class="sidebar-link"
        :class="{ 'bg-blue-700 font-semibold': $route.path === '/pengerjaan' }"
      >
        🔧 Pengerjaan
      </RouterLink>

      <RouterLink
        to="/riwayat"
        class="sidebar-link"
        :class="{ 'bg-blue-700 font-semibold': $route.path === '/riwayat' }"
      >
        📋 Riwayat
      </RouterLink>

      <RouterLink
        to="/laporan"
        class="sidebar-link"
        :class="{ 'bg-blue-700 font-semibold': $route.path === '/laporan' }"
      >
        📊 Laporan
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
</script>

<style scoped>
.sidebar-link {
  display: block;
  padding: 12px 16px;
  border-radius: 8px;
  transition: background 0.2s;
}
.sidebar-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
