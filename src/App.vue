<template>
  <div class="flex">
    <Sidebar />
    <main class="ml-64 w-full min-h-screen bg-gray-50">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>
