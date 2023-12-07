import { useEmpleadoStore } from 'src/stores/EmpleadoStore';
<template>
    <div class="q-pa-md">
    <q-btn class="boton" icon="add">Agregar Puesto</q-btn>
    <q-table
      title="Puestos"
      :rows="cargos"
      :columns="columns"
      row-key="id"
    >
    <template v-slot:body-cell-show="props">
      <q-td :props="props">
        <q-btn icon="search" @click="CargoStore.detalleCargo(props.row.id)"/>
      </q-td>
    </template>

    </q-table>
    </div>
</template>

<script setup>
import { useCargoStore } from '../../stores/CargoStore'
import { useEmpleadoStore } from '../../stores/EmpleadoStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const CargoStore = useCargoStore()
const EmpleadoStore = useEmpleadoStore()
const cargos = ref([])
const router = useRouter()

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'show', align: 'right', field: 'id', sortable: false, 'q-table-col-auto-width': true, slot: 'show' }
]

onMounted(async () => {
  const token = EmpleadoStore.obtenerToken()

  if (token) {
    try {
      const data = await CargoStore.cargarCargos(token)
      cargos.value = data
    } catch (error) {
      console.error('Error al cargar los puestos:', error)
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
