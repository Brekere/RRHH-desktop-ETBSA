import { api } from '../boot/axios'
import { defineStore } from 'pinia'

export const useEmpleadoStore = defineStore('empleado', {
  state: () => ({ authToken: null }),

  getters: {
    token: (state) => state.authToken
  },

  actions: {
    obtenerToken () {
      const token = localStorage.getItem('token')
      return token
    },

    obtenerUserID () {
      const userID = localStorage.getItem('userID')
      return userID
    },

    detalleEmpleado (empleadoId) {
      this.router.push({ path: `/empleado/show/${empleadoId}` })
    },

    formatfecha (fecha) {
      const dateObject = new Date(fecha)

      const year = dateObject.getFullYear()
      const month = String(dateObject.getMonth() + 1).padStart(2, '0')
      const day = String(dateObject.getDate()).padStart(2, '0')

      const formattedFecha = `${day}-${month}-${year}`

      return formattedFecha
    },

    async cargarEmpleado (userID, token) {
      try {
        const response = await api.get('/empleado/' + userID, {
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

    async editarEmpleado (userID, token, form) {
      try {
        const response = await api.patch('/empleado/' + userID, form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        return response.data
      } catch (error) {
        console.error('Error al actualizar datos del empleado:', error)
        throw error
      }
    },

    async cargarEmpleados (token) {
      try {
        const response = await api.get('/empleado/all', {
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
