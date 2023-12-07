<template>
  <q-card class="my-card">
    <q-item v-if="empleado">
      <q-item-section avatar>
        <q-avatar>
          <img src="../../assets/user.png">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ empleado.nombre }} {{ empleado.apellido_paterno }} {{ empleado.apellido_materno }}</q-item-label>
        <q-item-label caption><strong>Sucursal: </strong>{{ empleado.sucursal_id.nombre }}</q-item-label>
        <q-item-label caption><strong>Departamento: </strong>{{ empleado.departamento_id.nombre }}</q-item-label>
        <q-item-label caption><strong>Linea: </strong>{{ empleado.linea_id.nombre }}</q-item-label>
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

const route = useRoute()
const EmpleadoStore = useEmpleadoStore()
const empleado = ref(null)
const router = useRouter()

onMounted(async () => {
  const userID = route.params.id
  const token = EmpleadoStore.obtenerToken()

  if (token) {
    try {
      const data = await EmpleadoStore.cargarEmpleado(userID, token)
      empleado.value = data
    } catch (error) {
      console.error('Error al cargar empleado:', error)
    }
  } else {
    router.push({ path: 'auth/login', replace: true })
  }
})
</script>
