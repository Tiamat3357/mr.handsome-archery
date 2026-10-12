import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import BookingView from '../views/BookingView.vue'
import BookingConfirmView from '../views/BookingConfirmView.vue'
import ReceiptView from '../views/ReceiptView.vue'
import MyBookingsView from '../views/MyBookingsView.vue'
import EquipmentView from '../views/EquipmentView.vue'
import PosView from '../views/PosView.vue'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, alias: ['/index.html'] },
  { path: '/schedule', name: 'schedule', component: ScheduleView, alias: ['/schedule.html'] },
  { path: '/booking', name: 'booking', component: BookingView, alias: ['/booking.html'] },
  { path: '/booking-confirm', name: 'booking-confirm', component: BookingConfirmView, alias: ['/booking-confirm.html'] },
  { path: '/receipt', name: 'receipt', component: ReceiptView, alias: ['/receipt.html'] },
  { path: '/my-bookings', name: 'my-bookings', component: MyBookingsView, alias: ['/my-bookings.html'] },
  { path: '/equipment', name: 'equipment', component: EquipmentView, alias: ['/equipment.html'] },

  // 3.1 กำหนด meta: { backoffice: true } ให้หน้าหลังบ้าน
  { path: '/pos', name: 'pos', component: PosView, meta: { backoffice: true } },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { backoffice: true } },
  { path: '/login', name: 'login', component: LoginView, meta: { backoffice: true } },

  // Redirects
  { path: '/customers', redirect: '/' },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

// 3.2 ตั้งค่า Router พร้อม ScrollBehavior เลื่อนสมูท & เว้นระยะ Navbar 72px
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (to.hash) {
      return { el: to.hash, top: 72, behavior: 'smooth' }
    }
    if (saved) {
      return saved
    }
    return { top: 0 }
  }
})

export default router