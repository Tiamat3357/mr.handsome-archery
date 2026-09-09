import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PosView from '../views/PosView.vue'
import CustomerView from '../views/CustomerView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', component: CustomerView },
  { path: '/login', component: LoginView },
  { path: '/pos', component: PosView },
  { path: '/customers', redirect: '/' }, // หรือลบบรรทัดนี้ออกได้เลย
  { path: '/dashboard', component: DashboardView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router