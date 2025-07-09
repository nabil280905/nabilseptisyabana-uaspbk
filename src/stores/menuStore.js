import { defineStore } from 'pinia'
import axios from 'axios'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    daftarMenu: [],
    loading: false,
    error: null
  }),

  getters: {
    menuByKategori: (state) => {
      return (kategori) => {
        const item = state.daftarMenu.find((m) => m.kategori === kategori)
        return item ? item.variasi : []
      }
    },

    semuaVariasi: (state) => {
      return state.daftarMenu.flatMap(menu => menu.variasi)
    }
  },

  actions: {
    async fetchMenu() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('https://uas-server-production-acdc.up.railway.app//menu')
        this.daftarMenu = res.data
      } catch (err) {
        this.error = 'Gagal memuat data menu.'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})
