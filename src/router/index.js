import { createRouter, createWebHistory } from 'vue-router'
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
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/pos', component: PosView },
  { path: '/customers', redirect: '/' }, // หรือลบบรรทัดนี้ออกได้เลย
  { path: '/dashboard', component: DashboardView },

  // --- หน้าที่แยกออกจาก CustomerView.vue (เดิมเป็นไฟล์ .html แยกกัน) ---
  { path: '/schedule', component: ScheduleView },
  { path: '/booking', component: BookingView },
  { path: '/booking-confirm', component: BookingConfirmView },
  { path: '/receipt', component: ReceiptView },
  { path: '/my-bookings', component: MyBookingsView },
  { path: '/equipment', component: EquipmentView },
  // ShopQrView.vue ยังไม่ใส่ route (หน้า QR Draft)
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
