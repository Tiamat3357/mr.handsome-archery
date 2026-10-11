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
import HomeView from '../views/HomeView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import BookingView from '../views/BookingView.vue'
import BookingConfirmView from '../views/BookingConfirmView.vue'
import ReceiptView from '../views/ReceiptView.vue'
import MyBookingsView from '../views/MyBookingsView.vue'
import EquipmentView from '../views/EquipmentView.vue'

const routes = [
{ path: '/', name: 'home', component: HomeView, alias: ['/index.html'] },
  { path: '/schedule', name: 'schedule', component: ScheduleView, alias: ['/schedule.html'] },
  { path: '/booking', name: 'booking', component: BookingView, alias: ['/booking.html'] },
  { path: '/booking-confirm', name: 'booking-confirm', component: BookingConfirmView, alias: ['/booking-confirm.html'] },
  { path: '/receipt', name: 'receipt', component: ReceiptView, alias: ['/receipt.html'] },
  { path: '/my-bookings', name: 'my-bookings', component: MyBookingsView, alias: ['/my-bookings.html'] },
  { path: '/equipment', name: 'equipment', component: EquipmentView, alias: ['/equipment.html'] },
  { path: '/pos', name: 'pos', component: PosView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/customers', redirect: '/' }
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
