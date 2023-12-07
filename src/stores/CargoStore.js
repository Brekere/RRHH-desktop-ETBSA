import { api } from '../boot/axios'
import { defineStore } from 'pinia'

export const useCargoStore = defineStore('cargo', {
  state: () => ({ authToken: null }),

  getters: {
    token: (state) => state.authToken
  },

  actions: {

    detalleCargo (cargoId) {
      this.router.push({ path: `/cargo/show/${cargoId}` })
    },

    async cargarCargo (cargoID, token) {
      try {
        const response = await api.get('/sucursal/' + cargoID, {
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

    async cargarCargos (token) {
      try {
        const response = await api.get('/cargo/all', {
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
