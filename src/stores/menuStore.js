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
        const res = await axios.get('https://b8d4efda-ed90-4968-af5a-3b033b45fbb6-00-3vr5kpl0ig6w4.sisko.replit.dev/menu')
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
