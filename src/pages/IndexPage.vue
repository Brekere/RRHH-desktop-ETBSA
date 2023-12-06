<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="../assets/logo.png"
    >
  </q-page>
</template>

<script setup>

import { useEmpleadoStore } from '../stores/EmpleadoStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const EmpleadoStore = useEmpleadoStore()
const router = useRouter()

onMounted(async () => {
  const token = EmpleadoStore.obtenerToken()
  if (!token) {
    router.push({ path: 'auth/login', replace: true })
  }
})
</script>
