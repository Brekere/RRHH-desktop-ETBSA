<template>
    <q-card class="my-card">
      <q-item v-if="cargo">

        <q-item-section>
            <q-item-label caption><strong>ID del Puesto: </strong>{{ cargo.id }}</q-item-label>
          <q-item-label caption><strong>Nombre del Puesto: </strong>{{ cargo.nombre }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-else>
        <q-item-section>
          <q-item-label caption>Cargando...</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />

        <q-card-actions align="right">
          <q-btn class="bg-yellow-9" flat>Editar</q-btn>
          <q-btn class="bg-red-9" flat>Borrar</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEmpleadoStore } from '../../stores/EmpleadoStore'
import { useCargoStore } from '../../stores/CargoStore'

const route = useRoute()
const EmpleadoStore = useEmpleadoStore()
const CargoStore = useCargoStore()
const router = useRouter()
const cargo = ref('')

onMounted(async () => {
  const cargoID = route.params.id
  const token = EmpleadoStore.obtenerToken()

  if (token) {
    try {
      const data = await CargoStore.cargarCargo(cargoID, token)
      cargo.value = data
    } catch (error) {
      console.error('Error al cargar info:', error)
    }
  } else {
    router.push({ path: 'auth/login', replace: true })
  }
})
</script>
