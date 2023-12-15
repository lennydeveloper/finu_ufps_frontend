/* eslint-disable no-console */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Forms from './views/Forms.vue'
import Proyectos from './views/Proyectos.vue'
import UIElements from './views/UIElements.vue'
import Login from './views/Login.vue'
import Modal from './views/Modal.vue'
import Card from './views/Card.vue'
import Blank from './views/Blank.vue'
import Convocatorias from './views/Convocatorias.vue'
import Propuestas from './views/Propuestas.vue'
import NuevaConvocatoria from './views/NuevaConvocatoria.vue'
import NuevaPropuesta from './views/NuevaPropuesta.vue'
import RegistroUsuario from './views/RegistroUsuario.vue'
import Users from './views/Users.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Blank,
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms,
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card,
  },
  {
    path: '/proyectos',
    name: 'Proyectos',
    component: Proyectos,
  },
  {
    path: '/convocatorias',
    name: 'Convocatorias',
    component: Convocatorias,
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Modal,
    meta: { layout: 'empty' },
  },
  {
    path: '/blank',
    name: 'Blank',
    component: Dashboard,
  },
  {
    path: '/propuestas',
    name: 'Propuestas',
    component: Propuestas,
  },
  {
    path: '/registro-convocatoria',
    name: 'NuevaConvocatoria',
    component: NuevaConvocatoria,
  },
  {
    path: '/ui',
    name: 'UIElements',
    component: UIElements,
  },
  {
    path: '/usuarios',
    name: 'Users',
    component: Users,
  },
  {
    path: '/registro-propuesta',
    name: 'NuevaPropuesta',
    component: NuevaPropuesta,
  },
  {
    path: '/registro-usuario',
    name: 'RegistroUsuario',
    component: RegistroUsuario,
    meta: { layout: 'empty' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (to.path !== '/' && to.path !== '/registro-usuario') {
    const localuser = localStorage.getItem('user')
    if (localuser == null)
      return '/'
  }
  return true
})

export default router
