import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

import HomeView from '../views/HomeView.vue'
import BookingView from '../views/BookingView.vue'
import BookingConfirmView from '../views/BookingConfirmView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import EquipmentView from '../views/EquipmentView.vue'
import ShopQrView from '../views/ShopQrView.vue'
import ReceiptView from '../views/ReceiptView.vue'
import MyBookingsView from '../views/MyBookingsView.vue'
import LoginView from '../views/LoginView.vue'
import PosView from '../views/PosView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  // 🎯 ดักจับทั้ง path ปกติ และ path .html ของเพื่อน
  { path: '/', alias: ['/index.html'], name: 'home', component: HomeView },
  { path: '/schedule', alias: ['/schedule.html'], name: 'schedule', component: ScheduleView },
  { path: '/booking', alias: ['/booking.html'], name: 'booking', component: BookingView },
  { path: '/booking-confirm', alias: ['/booking-confirm.html'], name: 'booking-confirm', component: BookingConfirmView },
  { path: '/equipment', alias: ['/equipment.html'], name: 'equipment', component: EquipmentView },
  { path: '/my-bookings', alias: ['/my-bookings.html'], name: 'my-bookings', component: MyBookingsView },
  { path: '/receipt', alias: ['/receipt.html'], name: 'receipt', component: ReceiptView },
  { path: '/shop-qr', alias: ['/shop-qr.html'], name: 'shop-qr', component: ShopQrView },

  // 🔒 ฝั่งหลังบ้าน POS
  { path: '/login', name: 'login', component: LoginView },
  { path: '/pos', name: 'pos', component: PosView, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (to.meta.requiresAuth && !session) {
    next('/login')
  } else if (to.path === '/login' && session) {
    next('/pos')
  } else {
    next()
  }
})

export default router