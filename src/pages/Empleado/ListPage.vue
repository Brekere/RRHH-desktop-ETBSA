<template>
    <div class="q-pa-md">
      <q-table
        title="Empleados"
        :rows="empleados"
        :columns="columns"
        row-key="id"
      >

      </q-table>
    </div>
  </template>

<script setup>
import { useEmpleadoStore } from '../../stores/EmpleadoStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const EmpleadoStore = useEmpleadoStore()
const empleados = ref([])
const router = useRouter()

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id', sortable: true },
  { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre', sortable: true },
  { name: 'apellido_paterno', label: 'apellido_paterno', align: 'left', field: 'apellido_paterno', sortable: true },
  { name: 'apellido_materno', label: 'apellido_materno', align: 'left', field: 'apellido_materno', sortable: true },
  { name: 'curp', label: 'curp', align: 'left', field: 'curp', sortable: true },
  { name: 'rfc', label: 'rfc', align: 'left', field: 'rfc', sortable: true },
  { name: 'domicilio', label: 'domicilio', align: 'left', field: 'domicilio', sortable: true }
]

onMounted(async () => {
  const token = EmpleadoStore.obtenerToken()

  if (token) {
    try {
      const data = await EmpleadoStore.cargarEmpleados(token)
      empleados.value = data
      console.log(data)
    } catch (error) {
      console.error('Error al cargar empleado:', error)
    }
  } else {
    router.push({ path: 'auth/login', replace: true })
  }
})
</script>
