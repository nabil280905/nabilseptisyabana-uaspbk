import { createRouter, createWebHistory } from "vue-router";
import Laporan from "@/views/Laporan.vue";
import Transaksi from "@/views/Transaksi.vue";
import Home from "@/views/Home.vue";
import Riwayat from "@/views/Riwayat.vue";
import Pengerjaan from "@/views/Pengerjaan.vue";

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/pengerjaan', name:'pengerjaan', component: Pengerjaan},
    {path: '/riwayat', name:'riwayat', component: Riwayat},
    {path: '/transaksi', name:'transaksi', component: Transaksi},
    {path: '/laporan', name: 'laporan', component: Laporan}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;