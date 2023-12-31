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
      },
      {
        path: 'empleado/show/:id',
        component: () => import('src/pages/Empleado/ShowPage.vue')
      },

      {
        path: 'cargo',
        component: () => import('../pages/Cargo/ListPage.vue')
      },
      {
        path: 'cargo/show/:id',
        component: () => import('../pages/Cargo/ShowPage.vue')
      },
      {
        path: 'sucursal',
        component: () => import('../pages/Sucursal/ListPage.vue')
      },
      {
        path: 'sucursal/show/:id',
        component: () => import('../pages/Sucursal/ShowPage.vue')
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
