import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMenuStore } from '@/stores/menuStore'
import axios from 'axios'

vi.mock('axios')

describe('menuStore', () => {
  let menuStore

  beforeEach(() => {
    setActivePinia(createPinia())
    menuStore = useMenuStore()
  })

  it('initial state is correct', () => {
    expect(menuStore.daftarMenu).toEqual([])
    expect(menuStore.loading).toBe(false)
    expect(menuStore.error).toBe(null)
  })

  it('fetchMenu success updates daftarMenu', async () => {
    const mockData = [
      {
        id: 1,
        kategori: 'Cuci Mobil',
        variasi: [{ id: 101, nama: 'Reguler', harga: 30000 }]
      }
    ]

    axios.get.mockResolvedValue({ data: mockData })

    await menuStore.fetchMenu()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/menu')
    expect(menuStore.daftarMenu).toEqual(mockData)
    expect(menuStore.error).toBe(null)
    expect(menuStore.loading).toBe(false)
  })

  it('fetchMenu error sets error message', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    await menuStore.fetchMenu()

    expect(menuStore.daftarMenu).toEqual([])
    expect(menuStore.error).toBe('Gagal memuat data menu.')
    expect(menuStore.loading).toBe(false)
  })

  it('menuByKategori returns correct variasi', () => {
    menuStore.daftarMenu = [
      {
        kategori: 'Cuci Motor',
        variasi: [
          { id: 1, nama: 'Cepat', harga: 15000 },
          { id: 2, nama: 'Detailing', harga: 20000 }
        ]
      }
    ]

    const result = menuStore.menuByKategori('Cuci Motor')
    expect(result).toHaveLength(2)
    expect(result[0].nama).toBe('Cepat')
  })

  it('semuaVariasi returns flattened array of all variasi', () => {
    menuStore.daftarMenu = [
      {
        kategori: 'A',
        variasi: [{ id: 1, nama: 'X', harga: 100 }]
      },
      {
        kategori: 'B',
        variasi: [{ id: 2, nama: 'Y', harga: 200 }]
      }
    ]

    const result = menuStore.semuaVariasi
    expect(result).toHaveLength(2)
    expect(result.map((v) => v.nama)).toEqual(['X', 'Y'])
  })
})
