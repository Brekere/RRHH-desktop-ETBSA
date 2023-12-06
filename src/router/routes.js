import MainLayout from '../layouts/MainLayout.vue'
import IndexPage from '../pages/IndexPage.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import LoginPage from '../pages/Auth/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      {
        path: 'empleado',
        component: () => import('src/pages/Empleado/ListPage.vue')
      }
    ]
  },
  {
    path: '/auth/',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
