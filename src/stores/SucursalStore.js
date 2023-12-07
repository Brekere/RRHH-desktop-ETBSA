import { api } from '../boot/axios'
import { defineStore } from 'pinia'

export const useSucursalStore = defineStore('sucursal', {
  state: () => ({ authToken: null }),

  getters: {
    token: (state) => state.authToken
  },

  actions: {

    detalleSucursal (sucursalId) {
      this.router.push({ path: `/sucursal/show/${sucursalId}` })
    },

    async cargarSucursal (SucursalID, token) {
      try {
        const response = await api.get('/sucursal/' + SucursalID, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        return response.data
      } catch (error) {
        console.error('Error al obtener datos de la API:', error)
        throw error
      }
    },

    async cargarSucursales (token) {
      try {
        const response = await api.get('/sucursal/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        return response.data
      } catch (error) {
        console.error('Error al obtener datos de la API:', error)
        throw error
      }
    }
  }
})
