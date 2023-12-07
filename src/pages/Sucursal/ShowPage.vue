<template>
    <q-card class="my-card">
      <q-item v-if="sucursal">

        <q-item-section>
            <q-item-label caption><strong>ID de la sucursal: </strong>{{ sucursal.id }}</q-item-label>
            <q-item-label caption><strong>Nombre de la sucursal: </strong>{{ sucursal.nombre }}</q-item-label>
            <q-item-label caption><strong>Domicilio de la sucursal: </strong>{{ sucursal.domicilio }}</q-item-label>
            <q-item-label caption><strong>Encargado de la sucursal: </strong>{{ sucursal.encargado.nombre }}</q-item-label>
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
import { useSucursalStore } from '../../stores/SucursalStore'

const route = useRoute()
const EmpleadoStore = useEmpleadoStore()
const SucursalStore = useSucursalStore()
const router = useRouter()
const sucursal = ref('')

onMounted(async () => {
  const sucursalID = route.params.id
  const token = EmpleadoStore.obtenerToken()

  if (token) {
    try {
      const data = await SucursalStore.cargarSucursal(sucursalID, token)
      sucursal.value = data
    } catch (error) {
      console.error('Error al cargar info:', error)
    }
  } else {
    router.push({ path: 'auth/login', replace: true })
  }
})
</script>
