<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-green-9 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo2.png">
          </q-avatar>
          ETBSA Departamento de recursos humanos
        </q-toolbar-title>

        <q-btn
          flat
          label="logout"
          icon="delete"
          @click = "auth.Logout()"
        />

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>

      <q-item-label header>
          Opciones
        </q-item-label>

      <q-item active-class="tab-active" to="/" class="q-ma-sm navigation-item" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="home" />
                </q-item-section>
                <q-item-section>
                  Home
                </q-item-section>
              </q-item>

      <q-item active-class="tab-active" to="/empleado" class="q-ma-sm navigation-item" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="people" />
                </q-item-section>
                <q-item-section>
                  Empleados
                </q-item-section>
              </q-item>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/AuthStore'

const auth = useAuthStore()
const leftDrawerOpen = ref(true)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
