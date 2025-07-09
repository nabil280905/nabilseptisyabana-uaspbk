import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    keranjang: [],
    transaksiList: []
  }),

  getters: {
    totalHarga: (state) =>
      state.keranjang.reduce((total, item) => total + item.harga * item.jumlah, 0),

    transaksiBelumSelesai: (state) =>
      state.transaksiList.filter(t => !t.selesai),

    transaksiSelesai: (state) =>
      state.transaksiList.filter(t => t.selesai)
  },

  actions: {
    tambahKeKeranjang(item) {
      const existing = this.keranjang.find(i => i.id === item.id)
      if (!existing) {
        this.keranjang.push({ ...item, jumlah: 1 })
      }
    },

    hapusDariKeranjang(index) {
      this.keranjang.splice(index, 1)
    },

    async fetchTransaksi() {
      try {
        const res = await axios.get('https://b8d4efda-ed90-4968-af5a-3b033b45fbb6-00-3vr5kpl0ig6w4.sisko.replit.dev/transaksi')
        this.transaksiList = res.data
      } catch (err) {
        console.error('❌ Gagal fetch transaksi:', err)
      }
    },

    async simpanTransaksi(namaPelanggan, jenisKendaraan) {
      if (!this.keranjang.length) return

      const newData = {
        id: Date.now().toString(),
        pelanggan: namaPelanggan,
        kendaraan: jenisKendaraan,
        items: this.keranjang,
        total: this.totalHarga,
        waktu: new Date().toISOString(),
        selesai: false
      }

      try {
        await axios.post('https://b8d4efda-ed90-4968-af5a-3b033b45fbb6-00-3vr5kpl0ig6w4.sisko.replit.dev/transaksi', newData)
        this.keranjang = []
        await this.fetchTransaksi()
      } catch (err) {
        console.error('❌ Gagal simpan transaksi:', err)
      }
    },

    async tandaiSelesai(id) {
      try {
        await axios.patch(`https://b8d4efda-ed90-4968-af5a-3b033b45fbb6-00-3vr5kpl0ig6w4.sisko.replit.dev/transaksi/${id}`, {
          selesai: true
        })
        await this.fetchTransaksi()
      } catch (err) {
        console.error('❌ Gagal update selesai:', err)
      }
    }
  }
})
