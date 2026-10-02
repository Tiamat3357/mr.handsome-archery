import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import LoginView from '../views/LoginView.vue'
import PosView from '../views/PosView.vue'
import DashboardView from '../views/DashboardView.vue'


const routes = [
  {
    
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/pos',
    name: 'pos',
    component: PosView,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    redirect: '/pos'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// ตรวจสอบสถานะการล็อกอินจริงจาก Supabase
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    // ถ้าหน้านั้นต้องล็อกอิน แต่ยังไม่มี session -> ส่งไปหน้า login
    next('/login')
  } else if (to.path === '/login' && session) {
    // ถ้าล็อกอินอยู่แล้ว แต่อยากเปิดหน้า login -> ส่งไปหน้า pos ทันที
    next('/pos')
  } else {
    next()
  }
})

export default router