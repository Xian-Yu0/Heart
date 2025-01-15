import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Patient from '@/views/Patient.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/patient',
      name: 'Patient',
      component: Patient
    }
  ],
})

export default router
