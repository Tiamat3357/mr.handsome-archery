<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const bookingId = computed(() => String(route.query.id || 'BK-' + Date.now().toString().slice(-6)))
const customerName = computed(() => String(route.query.name || 'คุณลูกค้า'))
const customerPhone = computed(() => String(route.query.phone || '-'))
const bookingDate = computed(() => String(route.query.date || 'วันนี้'))
const bookingTime = computed(() => String(route.query.time || '11:00 - 12:00 น.'))

const duration = computed(() => {
  const d = parseInt(route.query.duration || '1', 10)
  return isNaN(d) || d < 1 ? 1 : d
})

const gear = computed(() => String(route.query.gear || 'rental'))
const bowType = computed(() => String(route.query.bow || 'Olympic Recurve'))
const hand = computed(() => String(route.query.hand || 'right'))

const isOwnGear = computed(() => gear.value === 'own' || bowType.value.includes('ส่วนตัว'))

const displayPackage = computed(() =>
  isOwnGear.value ? 'นำอุปกรณ์ส่วนตัวมาเอง' : bowType.value
)

const handLabel = computed(() =>
  hand.value === 'left' ? 'ถนัดซ้าย (Left-hand)' : 'ถนัดขวา (Right-hand)'
)

const totalPrice = computed(() => {
  if (route.query.total) return Number(route.query.total)
  return isOwnGear.value ? 100 * duration.value : 370 * duration.value
})

function handlePrint() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#121212] text-stone-100 antialiased" lang="th">

    <!-- Stepper (ซ่อนตอนพิมพ์) -->
    <section class="print:hidden w-full bg-[#181818] py-3 border-b border-[#2c2c2c]">
      <div class="w-full px-4 md:px-12">
        <div class="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 items-center">
          <div v-for="s in [
            { n: 1, t: 'เลือกรอบเวลา' },
            { n: 2, t: 'ข้อมูลผู้จอง' },
            { n: 3, t: 'ตรวจสอบ & ยืนยัน' }
          ]" :key="s.n" class="flex items-center gap-2 sm:gap-3">
            <div class="w-8 h-8 rounded-full bg-[#262626] text-[#ffd700] flex items-center justify-center shrink-0 border border-[#383838]">
              <span class="material-symbols-outlined text-[18px]">check</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[10px] text-stone-400">ขั้นตอน {{ s.n }}</span>
              <span class="text-xs text-stone-200 truncate">{{ s.t }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 sm:gap-3 p-1 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/30">
            <div class="w-8 h-8 rounded-full bg-[#ffd700] text-black flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[18px]">confirmation_number</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[10px] text-[#ffd700] font-bold">เสร็จสมบูรณ์</span>
              <span class="text-xs text-stone-100 font-bold truncate">4. บัตร E-Ticket</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="flex-1 w-full mx-auto px-4 sm:px-6 py-6 sm:py-8" style="max-width: 56rem">

      <!-- ข้อความเด่น: ให้แคปหน้าจอ -->
      <div class="print:hidden shot-notice">
        <div class="shot-icon">
          <span class="material-symbols-outlined" style="font-size: 30px">screenshot</span>
        </div>
        <div>
          <p class="shot-title">แคปหน้าจอนี้เก็บไว้ เพื่อยืนยันการจอง</p>
          <p class="shot-sub">แล้วแสดงภาพให้สตาฟดูที่หน้าร้านก่อนเข้าใช้บริการ ชำระเงินที่เคาน์เตอร์</p>
        </div>
      </div>

      <!-- หัวหน้า -->
      <div class="print:hidden mt-6 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span class="text-stone-400 text-xs flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ลงทะเบียนสำเร็จ พร้อมเข้าใช้งาน
          </span>
          <h1 class="text-xl sm:text-2xl font-extrabold text-stone-100 mt-1.5">บัตรเข้าสนามยิงธนู</h1>
        </div>
        <button
          type="button"
          @click="handlePrint"
          class="self-start px-4 py-2.5 bg-[#262626] hover:bg-[#333] text-stone-100 border border-[#383838] transition-all rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span class="material-symbols-outlined text-[18px] text-[#ffd700]">print</span>
          พิมพ์
        </button>
      </div>

      <!-- บัตร -->
      <div id="printablePass" class="bg-[#181818] border border-[#2c2c2c] rounded-2xl shadow-2xl overflow-hidden relative">
        <div class="bg-[#222222] border-b border-[#2e2e2e] px-5 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-[#ffd700] flex items-center justify-center text-black shrink-0">
              <span class="material-symbols-outlined text-[22px]">crisis_alert</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-[#ffd700] tracking-widest font-black leading-none">MR.HANDSOME ARCHERY</span>
              <span class="text-[11px] text-stone-400 mt-1">บัตรยืนยันการจอง</span>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="text-right">
              <span class="text-[10px] text-stone-400 block leading-none">Booking ID</span>
              <span class="font-mono text-base sm:text-lg text-[#ffd700] font-black">{{ bookingId }}</span>
            </div>
            <span class="px-2.5 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 rounded-full text-xs font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">verified</span> ยืนยันการจองแล้ว
            </span>
          </div>
        </div>

        <div class="p-5 sm:p-7 space-y-6">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div class="info-box">
              <span class="info-label">วันที่เข้าใช้บริการ</span>
              <div class="info-value">
                <span class="material-symbols-outlined info-icon">calendar_today</span>
                <span>{{ bookingDate }}</span>
              </div>
            </div>

            <div class="info-box">
              <span class="info-label">รอบเวลายิงธนู</span>
              <div class="info-value" style="color:#ffd700">
                <span class="material-symbols-outlined info-icon">schedule</span>
                <span>{{ bookingTime }}</span>
              </div>
            </div>

            <div class="info-box">
              <span class="info-label">ระยะเวลา</span>
              <div class="info-value">
                <span class="material-symbols-outlined info-icon">timer</span>
                <span>{{ duration * 60 }} นาที</span>
              </div>
            </div>

            <div class="info-box">
              <span class="info-label">ชื่อผู้จอง</span>
              <div class="info-value truncate">
                <span class="material-symbols-outlined info-icon">badge</span>
                <span class="truncate">{{ customerName }}</span>
              </div>
              <span class="text-[10px] text-stone-400 block mt-0.5 truncate">{{ customerPhone }}</span>
            </div>

            <div class="info-box">
              <span class="info-label">แพ็กเกจอุปกรณ์</span>
              <div class="info-value truncate">
                <span class="material-symbols-outlined info-icon">sports_martial_arts</span>
                <span class="truncate">{{ displayPackage }}</span>
              </div>
              <span class="text-[10px] text-[#ffd700] block mt-0.5">{{ handLabel }}</span>
            </div>

            <div class="info-box">
              <span class="info-label">ยอดชำระที่เคาน์เตอร์</span>
              <div class="info-value text-emerald-400 font-black" style="font-size:1rem">
                <span class="material-symbols-outlined info-icon">payments</span>
                <span>{{ totalPrice }} ฿</span>
              </div>
              <span class="text-[10px] text-[#ffd700] block mt-0.5">ชำระที่หน้าร้านก่อนเล่น</span>
            </div>
          </div>

          <div class="bg-[#222222] border border-[#2e2e2e] p-4 rounded-xl">
            <div class="flex items-center gap-1.5 text-stone-100 text-xs font-bold mb-2.5">
              <span class="material-symbols-outlined text-[#ffd700] text-[18px]">shield</span>
              ข้อปฏิบัติก่อนเข้าสนาม
            </div>
            <ul class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-stone-400">
              <li class="flex items-start gap-1.5">
                <span class="font-bold text-[#ffd700]">01.</span>
                <span>มาถึงก่อนเวลา <strong>10-15 นาที</strong> เพื่อรับฟังคำแนะนำความปลอดภัย</span>
              </li>
              <li class="flex items-start gap-1.5">
                <span class="font-bold text-[#ffd700]">02.</span>
                <span>แต่งกายสุภาพ <strong>เหมาะกับการออกกำลังกาย</strong></span>
              </li>
              <li class="flex items-start gap-1.5">
                <span class="font-bold text-[#ffd700]">03.</span>
                <span>แสดงรหัส <strong>Booking ID</strong> หรือภาพแคปหน้าจอนี้ให้สตาฟ</span>
              </li>
            </ul>
          </div>

          <div class="pt-3 border-t border-[#2c2c2c] flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-500 font-mono">
            <span>{{ bookingId }}</span>
            <span class="text-[#ffd700]">MR.HANDSOME ARCHERY</span>
          </div>
        </div>
      </div>

      <!-- ปุ่มนำทาง -->
      <div class="print:hidden mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <router-link
          to="/my-bookings"
          class="w-full sm:w-auto py-3 px-5 bg-[#262626] hover:bg-[#333] border border-[#383838] text-stone-300 hover:text-stone-100 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
        >
          <span class="material-symbols-outlined text-[16px]">history</span>
          ดูประวัติการจองทั้งหมด
        </router-link>
        <router-link
          to="/"
          class="w-full sm:w-auto py-3 px-6 bg-[#ffd700] hover:bg-yellow-400 text-black font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 active:scale-95"
        >
          <span class="material-symbols-outlined text-[16px]">home</span>
          กลับสู่หน้าหลัก
        </router-link>
      </div>
    </main>

    <footer class="print:hidden w-full bg-[#181818] border-t border-[#2c2c2c] py-6 text-center text-xs text-[#bfbfbb] mt-auto">
      <p>© {{ new Date().getFullYear() }} MR.HANDSOME Archery</p>
    </footer>
  </div>
</template>

<style scoped>
/* กล่องข้อความแคปหน้าจอ */
.shot-notice {
  display: flex; align-items: center; gap: 16px;
  background: #ffd700; color: #121212;
  border-radius: 16px; padding: 18px 20px;
  box-shadow: 0 10px 30px rgba(255, 215, 0, .18);
  animation: shot-pulse 2.4s ease-in-out infinite;
}
.shot-icon {
  width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
  background: #121212; color: #ffd700;
  display: flex; align-items: center; justify-content: center;
}
.shot-title { font-size: clamp(1.1rem, 3.5vw, 1.5rem); font-weight: 800; line-height: 1.4; }
.shot-sub { font-size: 14px; line-height: 1.6; margin-top: 2px; color: rgba(18, 18, 18, .75); }
@keyframes shot-pulse {
  0%, 100% { box-shadow: 0 10px 30px rgba(255, 215, 0, .18); }
  50% { box-shadow: 0 10px 40px rgba(255, 215, 0, .4); }
}

/* ช่องข้อมูลในบัตร */
.info-box { background: #222222; border: 1px solid #2e2e2e; padding: 14px; border-radius: 12px; }
.info-label { display: block; font-size: 10px; color: #a8a29e; font-weight: 500; }
.info-value {
  display: flex; align-items: center; gap: 6px; margin-top: 4px;
  font-size: 13px; font-weight: 700; color: #f5f5f4;
}
.info-icon { font-size: 16px; color: #ffd700; }

@media print {
  .shot-notice { display: none; }
  #printablePass { border: 1px solid #000 !important; box-shadow: none !important; }
}
@media (prefers-reduced-motion: reduce) {
  .shot-notice { animation: none; }
}
</style>