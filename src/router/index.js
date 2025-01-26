import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Patient from '@/views/Patient.vue'
import Test from '@/views/Test.vue'
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
      path: '/patient/:id',
      name: 'Patient',
      component: Patient
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ],
})

export default router
