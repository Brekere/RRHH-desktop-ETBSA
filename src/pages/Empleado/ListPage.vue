<template>
  <div class="q-pa-md">
    <q-btn class="boton" icon="add">Agregar Empleado</q-btn>

    <q-input outlined class="boton" color="green-9" v-model="searchTerm" label="Buscar">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-table
      title="Empleados"
      :rows="filteredEmpleados"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-show="props">
        <q-td :props="props">
          <q-btn icon="search" @click="EmpleadoStore.detalleEmpleado(props.row.id)"/>
        </q-td>
      </template>

      <template v-slot:body-cell-cargo="props">
        <q-td :props="props">
          {{ props.row.cargo_id.nombre }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useEmpleadoStore } from '../../stores/EmpleadoStore'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const EmpleadoStore = useEmpleadoStore()
const empleados = ref([])
const searchTerm = ref('')
const router = useRouter()

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'apellido_paterno', label: 'Apellido Paterno', align: 'left', field: 'apellido_paterno', sortable: true },
  { name: 'apellido_materno', label: 'Apellido Materno', align: 'left', field: 'apellido_materno', sortable: true },
  { name: 'curp', label: 'CURP', align: 'left', field: 'curp', sortable: true },
  { name: 'rfc', label: 'RFC', align: 'left', field: 'rfc', sortable: true },
  { name: 'domicilio', label: 'Domicilio', align: 'left', field: 'domicilio', sortable: true },
  { name: 'cargo', label: 'Puesto', align: 'left', field: 'cargo_id', sortable: true },
  { name: 'show', align: 'left', field: 'id', sortable: false, slot: 'show' }
]

const filteredEmpleados = computed(() => {
  return empleados.value.filter(empleado => {
    return (
      empleado.nombre.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      empleado.apellido_paterno.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      empleado.apellido_materno.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      empleado.curp.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      empleado.rfc.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      empleado.domicilio.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      empleado.cargo_id.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })
})

onMounted(async () => {
  const token = EmpleadoStore.obtenerToken()

  if (token) {
    try {
      const data = await EmpleadoStore.cargarEmpleados(token)
      empleados.value = data
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
