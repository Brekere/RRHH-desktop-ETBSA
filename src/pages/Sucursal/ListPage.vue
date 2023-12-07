<template>
    <div class="q-pa-md">
      <q-btn class="boton" icon="add">Agregar Sucursal</q-btn>
      <q-table
        title="Sucursales"
        :rows="sucursales"
        :columns="columns"
        row-key="id"
      >
      <template v-slot:body-cell-show="props">
        <q-td :props="props">
          <q-btn icon="search" @click="SucursalStore.detalleSucursal(props.row.id)"/>
        </q-td>
      </template>

      <template v-slot:body-cell-encargado="props">
        <q-td :props="props">
          {{ props.row.encargado.nombre }}
        </q-td>
      </template>
      </q-table>
    </div>

  </template>

<script setup>
import { useEmpleadoStore } from '../../stores/EmpleadoStore'
import { useSucursalStore } from '../../stores/SucursalStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const EmpleadoStore = useEmpleadoStore()
const SucursalStore = useSucursalStore()
const sucursales = ref([])
const router = useRouter()

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'domicilio', label: 'Domicilio', align: 'left', field: 'domicilio', sortable: true },
  { name: 'encargado', label: 'Encargado', align: 'left', field: 'encargado', sortable: true },
  { name: 'show', align: 'left', field: 'id', sortable: false, 'q-table-col-auto-width': true, slot: 'show' }
]
onMounted(async () => {
  const token = EmpleadoStore.obtenerToken()

  if (token) {
    try {
      const data = await SucursalStore.cargarSucursales(token)
      sucursales.value = data
    } catch (error) {
      console.error('Error al cargar empleado:', error)
    }
  } else {
    router.push({ path: 'auth/login', replace: true })
  }
})
</script>

<style scoped>
  .boton {
    margin-bottom: 16px;
  }
</style>
