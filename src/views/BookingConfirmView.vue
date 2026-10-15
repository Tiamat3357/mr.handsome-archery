<!--
  src/views/BookingConfirmView.vue
  ขั้นตอนที่ 3: ตรวจสอบและยืนยันการจอง (MR.HANDSOME Tactical Reservation)
  - ลบ Navbar ที่ซ้อนออก (ใช้ Navbar กลางตัวเดียว)
  - บันทึกข้อมูลมือที่ถนัด (ซ้าย/ขวา) และคำขอพิเศษ (Note) ลงระบบส่งต่อไปยังเคาน์เตอร์ POS
  - บันทึกเบอร์โทรล่าสุดลง localStorage เพื่อให้หน้าบัตรจองเปิดดูได้อัตโนมัติ
-->
<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()
const router = useRouter()

// ข้อมูลที่ส่งต่อมาจากขั้นตอนที่ 1 และ 2
const bookingDate = computed(() => String(route.query.date || 'วันนี้'))
const bookingTime = computed(() => String(route.query.time || '11:00 - 12:00 น.'))
const duration = computed(() => {
  const d = parseInt(route.query.duration || '1', 10)
  return isNaN(d) || d < 1 ? 1 : d
})

const customerName = computed(() => String(route.query.name || 'คุณลูกค้า'))
const customerPhone = computed(() => String(route.query.phone || '08X-XXX-XXXX'))
const gear = computed(() => String(route.query.gear || 'rental'))
const bowType = computed(() => String(route.query.bow || 'Olympic Recurve'))
const hand = computed(() => String(route.query.hand || 'right'))
const note = computed(() => String(route.query.note || route.query.specialRequest || route.query.request || ''))

const isOwnGear = computed(() => gear.value === 'own' || bowType.value.includes('ส่วนตัว'))

const equipmentBadge = computed(() => {
  if (isOwnGear.value) return 'อุปกรณ์ส่วนตัว'
  return bowType.value === 'Bare Bow' ? 'Bare Bow Range Set' : 'Olympic Recurve Set'
})

const equipmentTitle = computed(() => {
  if (isOwnGear.value) return 'นำอุปกรณ์ธนูส่วนตัวมาเอง (เช่าเฉพาะลานฝึกซ้อม)'
  return `${bowType.value} พร้อมอุปกรณ์มาตรฐานสนาม`
})

const equipmentDescription = computed(() => {
  if (isOwnGear.value) {
    return 'บริการนำอุปกรณ์ส่วนตัวเข้าสนาม พร้อมบริการโค้ชช่วยตรวจวัดแรงดึง (Poundage) และปรับแต่งอุปกรณ์ฟรี'
  }
  return 'รวมลูกธนูคาร์บอน 12 ลูก, Finger Tab รองนิ้ว, Arm Guard ป้องกันแขน และโค้ชแนะนำเบื้องต้น 15 นาที'
})

const handLabel = computed(() => {
  return hand.value === 'left' ? 'ถนัดซ้าย (Left-hand)' : 'ถนัดขวา (Right-hand)'
})

const totalPrice = computed(() => {
  if (route.query.total) {
    return Number(route.query.total)
  }
  if (isOwnGear.value) {
    return 100 * duration.value
  }
  const rate = bowType.value === 'Bare Bow' ? 300 : 350
  return (rate + 20) * duration.value
})

const trainingFee = computed(() => {
  return totalPrice.value - (20 * duration.value)
})

const isSubmitting = ref(false)

// ยืนยันการจอง บันทึกลง Supabase และ localStorage
async function handleConfirmBooking() {
  if (isSubmitting.value) return
  isSubmitting.value = true

  const bookingRecord = {
    id: 'BK-' + Date.now().toString().slice(-6),
    customer_name: customerName.value,
    customer_phone: customerPhone.value,
    booking_date: bookingDate.value,
    round_time: bookingTime.value,
    duration: duration.value,
    package_name: bowType.value,
    hand: hand.value,
    note: note.value || '',
    total_amount: totalPrice.value,
    status: 'pending'
  }

  try {
    // 1. บันทึกเข้า Supabase เพื่อให้ข้อมูลวิ่งข้ามเครื่องไปปรากฏที่หน้า POS ทันที
    const { error: dbError } = await supabase
      .from('bookings')
      .insert([bookingRecord])

    if (dbError) {
      console.error('Supabase insert error:', dbError.message)
    }

    // 2. สำรองเก็บบันทึกลง localStorage ของเครื่องไว้ด้วย
    const localList = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]')
    localList.push({
      id: bookingRecord.id,
      name: customerName.value,
      phone: customerPhone.value,
      date: bookingDate.value,
      time: bookingTime.value,
      duration: duration.value,
      gear: gear.value,
      bow: bowType.value,
      hand: hand.value,
      note: note.value,
      total: totalPrice.value,
      status: 'pending_payment',
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('mrhs_bookings', JSON.stringify(localList))
    sessionStorage.setItem('_mrhs_new_ticket', '1')

    const cleanPhone = customerPhone.value.replace(/\D/g, '')
    if (cleanPhone) {
      localStorage.setItem('mrhs_last_phone', cleanPhone)
    }
  } catch (err) {
    console.error('Booking submission error:', err)
  }

  setTimeout(() => {
    isSubmitting.value = false
    router.push({
      path: '/receipt',
      query: {
        id: bookingRecord.id,
        date: bookingDate.value,
        time: bookingTime.value,
        duration: duration.value,
        name: customerName.value,
        phone: customerPhone.value,
        gear: gear.value,
        bow: bowType.value,
        hand: hand.value,
        note: note.value,
        payment: 'counter',
        total: totalPrice.value
      }
    })
  }, 400)
}
</script>

<template>
  <div class="bg-[#121212] font-sans text-[#f5f5f0] antialiased min-h-screen flex flex-col" lang="th">
    
    <!-- Main Content Canvas (ลบ Navbar ที่ซ้อนออกเรียบร้อย) -->
    <main class="w-full flex-grow">
      
      <!-- Stepper Header -->
      <section class="w-full bg-[#181818] border-b border-[#2c2c2c] py-3.5">
        <div class="max-w-5xl mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
            <!-- Step 1 -->
            <div class="flex items-center gap-2.5">
              <router-link to="/schedule" class="w-8 h-8 rounded-full bg-[#262626] text-[#ffd700] flex items-center justify-center shrink-0 border border-[#383838]">
                <span class="material-symbols-outlined text-[16px]">check</span>
              </router-link>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] text-stone-400 uppercase tracking-wider">ขั้นตอน 1</span>
                <span class="text-xs text-stone-200 truncate">เลือกรอบเวลา</span>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-center gap-2.5">
              <router-link to="/booking" class="w-8 h-8 rounded-full bg-[#262626] text-[#ffd700] flex items-center justify-center shrink-0 border border-[#383838]">
                <span class="material-symbols-outlined text-[16px]">check</span>
              </router-link>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] text-stone-400 uppercase tracking-wider">ขั้นตอน 2</span>
                <span class="text-xs text-stone-200 truncate">ข้อมูลผู้จอง</span>
              </div>
            </div>

            <!-- Step 3 (Active) -->
            <div class="flex items-center gap-2.5 p-1 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/30">
              <div class="w-8 h-8 rounded-full bg-[#ffd700] text-black flex items-center justify-center shrink-0 font-bold shadow-sm">
                <span class="material-symbols-outlined text-[16px]">verified</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] text-[#ffd700] font-bold uppercase tracking-wider">กำลังทำรายการ</span>
                <span class="text-xs text-[#f5f5f0] font-bold truncate">3. ตรวจสอบ & ยืนยัน</span>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex items-center gap-2.5 opacity-40">
              <div class="w-8 h-8 rounded-full bg-[#262626] text-stone-400 flex items-center justify-center text-xs shrink-0 border border-[#383838] font-mono">
                04
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] text-stone-400 uppercase tracking-wider">ขั้นตอนสุดท้าย</span>
                <span class="text-xs text-stone-400 truncate">รับ E-Ticket</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Review Workspace -->
      <section class="max-w-6xl mx-auto px-4 py-8">
        <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262626] text-[#ffd700] text-xs font-semibold mb-2 border border-[#383838]">
              <span class="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse"></span>
              TACTICAL RANGE RESERVATION
            </div>
            <h1 class="text-2xl md:text-3xl font-extrabold text-[#f5f5f0]">ตรวจสอบและยืนยันการจอง</h1>
            <p class="text-sm text-stone-400 mt-1">กรุณาตรวจสอบข้อมูลการจอง โดยท่านสามารถชำระเงินจริงได้ที่เคาน์เตอร์สนาม</p>
          </div>

          <div class="hidden md:flex items-center gap-2 text-stone-400 text-xs bg-[#181818] border border-[#2c2c2c] px-3.5 py-2 rounded-xl">
            <span class="material-symbols-outlined text-[18px] text-[#ffd700]">encrypted</span>
            <span>ระบบบันทึกความปลอดภัย 256-bit SSL</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- ฝั่งซ้าย: ข้อมูลผู้ใช้บริการและอุปกรณ์ (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col gap-6">
            
            <!-- Card 1: ผู้ใช้บริการ & อุปกรณ์ -->
            <div class="bg-[#181818] border border-[#2c2c2c] rounded-2xl p-5 md:p-6 shadow-sm">
              <div class="flex items-center justify-between pb-4 mb-5 border-b border-[#2c2c2c]">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-[#262626] text-[#ffd700] flex items-center justify-center border border-[#383838]">
                    <span class="material-symbols-outlined text-[20px]">badge</span>
                  </div>
                  <div>
                    <h2 class="font-bold text-[#f5f5f0]">ข้อมูลผู้ใช้บริการ & อุปกรณ์</h2>
                    <p class="text-xs text-stone-400">ตรวจสอบความถูกต้องก่อนยืนยันคิว</p>
                  </div>
                </div>
                <router-link to="/booking" class="inline-flex items-center gap-1 text-xs text-[#ffd700] hover:underline font-bold">
                  <span class="material-symbols-outlined text-[16px]">edit_note</span>
                  แก้ไขข้อมูล
                </router-link>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-3.5 rounded-xl bg-[#222222] border border-[#2e2e2e]">
                  <span class="text-xs text-stone-400 block">ชื่อ-นามสกุล ผู้จอง</span>
                  <span class="font-semibold text-white text-base mt-1 block">{{ customerName }}</span>
                </div>
                <div class="p-3.5 rounded-xl bg-[#222222] border border-[#2e2e2e]">
                  <span class="text-xs text-stone-400 block">เบอร์โทรศัพท์ติดต่อ</span>
                  <span class="font-semibold text-[#ffd700] text-base mt-1 block font-mono">{{ customerPhone }}</span>
                </div>

                <!-- ชุดอุปกรณ์ที่จัดเตรียม & มือที่ถนัด -->
                <div class="p-4 rounded-xl bg-[#222222] border border-[#2e2e2e] sm:col-span-2">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs text-stone-400">ชุดอุปกรณ์ที่จัดเตรียม</span>
                    <span class="text-xs text-[#ffd700] bg-[#ffd700]/10 px-2 py-0.5 rounded font-bold border border-[#ffd700]/20">
                      {{ equipmentBadge }}
                    </span>
                  </div>
                  <p class="text-sm text-white font-semibold">{{ equipmentTitle }}</p>
                  <p class="text-xs text-stone-400 mt-1 leading-relaxed">{{ equipmentDescription }}</p>
                  
                  <div class="mt-3 pt-2.5 border-t border-[#333] flex items-center justify-between text-xs">
                    <span class="text-stone-400">มือข้างที่ถนัดในการน้าวสาย:</span>
                    <span class="text-[#ffd700] font-bold">{{ handLabel }}</span>
                  </div>
                </div>

                <!-- คำขอพิเศษถึงโค้ช / ข้อความถึงร้าน (ถ้ามี) -->
                <div v-if="note" class="p-3.5 rounded-xl bg-[#222222] border border-[#2e2e2e] sm:col-span-2">
                  <span class="text-xs text-stone-400 block mb-1">คำขอพิเศษถึงโค้ช / ข้อความถึงร้าน:</span>
                  <p class="text-xs text-[#ffd700] font-medium leading-relaxed">
                    "{{ note }}"
                  </p>
                </div>
              </div>
            </div>

            <!-- Card 2: ชำระเงินหน้าเคาน์เตอร์ -->
            <div class="bg-[#181818] border border-[#2c2c2c] rounded-2xl p-5 md:p-6 shadow-sm">
              <div class="flex items-center gap-3 pb-4 mb-5 border-b border-[#2c2c2c]">
                <div class="w-9 h-9 rounded-xl bg-[#262626] text-[#ffd700] flex items-center justify-center border border-[#383838]">
                  <span class="material-symbols-outlined text-[20px]">storefront</span>
                </div>
                <div>
                  <h2 class="font-bold text-white">การชำระเงิน (Pay at Counter)</h2>
                  <p class="text-xs text-stone-400">ไม่ต้องโอนเงินล่วงหน้า ชำระจริงเมื่อมาถึงสนาม</p>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-[#222222] border border-[#383838] flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-[#ffd700]/15 text-[#ffd700] flex items-center justify-center shrink-0 border border-[#ffd700]/30">
                  <span class="material-symbols-outlined text-3xl">point_of_sale</span>
                </div>
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-bold text-white">ชำระเงิน ณ จุดประชาสัมพันธ์สนาม</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">สะดวก ปลอดภัย</span>
                  </div>
                  <p class="text-xs text-stone-400 leading-relaxed">
                    กรุณาเดินทางมาถึงก่อนรอบฝึกซ้อมประมาณ <strong class="text-stone-200">10-15 นาที</strong> เพื่อแสดงรหัส E-Ticket และชำระเงินตามยอดรวม
                  </p>
                  <div class="pt-2 flex flex-wrap gap-2 text-[11px] text-[#ffd700]">
                    <span class="bg-[#181818] px-2.5 py-0.5 rounded border border-[#383838]">• เงินสด</span>
                    <span class="bg-[#181818] px-2.5 py-0.5 rounded border border-[#383838]">• สแกน QR หน้าร้าน</span>
                    <span class="bg-[#181818] px-2.5 py-0.5 rounded border border-[#383838]">• บัตรเครดิต / เดบิต</span>
                  </div>
                </div>
              </div>

              <div class="mt-4 p-3 rounded-xl bg-[#141414] border border-[#2c2c2c] flex items-center gap-2.5 text-xs text-stone-400">
                <span class="material-symbols-outlined text-[18px] text-[#ffd700] shrink-0">info</span>
                <span>หากติดธุระไม่สามารถมาตามนัด สามารถกดยกเลิกหรือแจ้งเลื่อนวันล่วงหน้าได้ฟรี</span>
              </div>
            </div>

          </div>

          <!-- ฝั่งขวา: สรุปบิลและปุ่มกดยืนยัน (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-20">
            <div class="bg-[#181818] border border-[#2c2c2c] rounded-2xl p-5 md:p-6 shadow-lg relative overflow-hidden">
              <div class="h-1.5 w-full bg-[#ffd700] absolute top-0 left-0 right-0"></div>

              <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#2c2c2c]">
                <div>
                  <span class="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">BOOKING SUMMARY</span>
                  <h3 class="font-bold text-lg text-white">สรุปรายละเอียด</h3>
                </div>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#262626] text-xs font-semibold text-[#ffd700] border border-[#383838]">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-pulse"></span>
                  รอยืนยัน
                </span>
              </div>

              <!-- รายละเอียดรอบ -->
              <div class="space-y-2.5 bg-[#222222] border border-[#2e2e2e] p-3.5 rounded-xl mb-4 text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-stone-400 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px]">calendar_today</span>
                    วันที่เข้ายิง
                  </span>
                  <span class="font-bold text-white">{{ bookingDate }}</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-stone-400 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px]">schedule</span>
                    รอบเวลา
                  </span>
                  <span class="font-bold text-[#ffd700] font-mono">{{ bookingTime }} ({{ duration }} ชม.)</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-stone-400 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px]">sports_score</span>
                    สนาม
                  </span>
                  <span class="font-bold text-white">18 ม. มาตรฐาน (ลานเดี่ยว)</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-stone-400 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px]">military_tech</span>
                    แพ็กเกจ
                  </span>
                  <span class="font-bold text-[#ffd700]">{{ bowType }}</span>
                </div>
              </div>

              <!-- รายละเอียดราคา -->
              <div class="space-y-2 pb-3 text-xs border-b border-[#2c2c2c]">
                <template v-if="isOwnGear">
                  <div class="flex justify-between text-stone-400">
                    <span>ค่านำอุปกรณ์ส่วนตัวเข้าสนาม ({{ duration }} ชม.)</span>
                    <span class="font-semibold text-white font-mono">{{ 100 * duration }} ฿</span>
                  </div>
                  <div class="flex justify-between text-stone-400">
                    <span>ค่าเป้าธนูและลานฝึกซ้อม</span>
                    <span class="text-emerald-400 font-semibold">ฟรีในสิทธิ์</span>
                  </div>
                </template>
                <template v-else>
                  <div class="flex justify-between text-stone-400">
                    <span>ค่าชั่วโมงฝึกซ้อม ({{ duration }} ชม.)</span>
                    <span class="font-semibold text-white font-mono">{{ trainingFee }} ฿</span>
                  </div>
                  <div class="flex justify-between text-stone-400">
                    <span>ค่าเป้าธนูมาตรฐาน (40 ซม.)</span>
                    <span class="font-semibold text-white font-mono">{{ 20 * duration }} ฿</span>
                  </div>
                  <div class="flex justify-between text-stone-400">
                    <span>ชุดอุปกรณ์ & โค้ชประกบ 15 นาที</span>
                    <span class="font-bold text-[#ffd700]">รวมในแพ็กเกจ</span>
                  </div>
                </template>
              </div>

              <!-- ยอดรวมสุทธิ -->
              <div class="flex items-end justify-between py-4">
                <div>
                  <span class="text-xs text-stone-400 uppercase tracking-wider block font-semibold">ยอดชำระที่เคาน์เตอร์</span>
                  <span class="text-[10px] text-stone-500 font-mono">Due at Counter</span>
                </div>
                <div class="text-right">
                  <span class="text-3xl font-black text-[#ffd700] font-mono">{{ totalPrice }}</span>
                  <span class="text-xs text-stone-400 font-bold ml-1.5">THB</span>
                </div>
              </div>

              <!-- ปุ่มยืนยัน -->
              <div class="flex flex-col gap-2.5">
                <button
                  type="button"
                  :disabled="isSubmitting"
                  @click="handleConfirmBooking"
                  class="w-full py-3.5 px-4 rounded-xl bg-[#ffd700] hover:bg-yellow-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#ffd700]/15 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <span v-if="isSubmitting" class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  <span>{{ isSubmitting ? 'กำลังออกบัตร...' : 'ยืนยันการจองและรับบัตร E-Ticket' }}</span>
                  <span v-if="!isSubmitting" class="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <router-link
                  to="/booking"
                  class="w-full py-2.5 px-4 rounded-xl bg-[#262626] hover:bg-[#333] text-stone-300 hover:text-white text-xs flex items-center justify-center gap-1 transition-colors text-center border border-[#383838]"
                >
                  <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>ย้อนกลับไปแก้ไขข้อมูลผู้จอง</span>
                </router-link>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="w-full bg-[#101010] border-t border-[#262626] py-6 text-center text-xs text-stone-500 mt-auto">
      <p>© 2026 MR.HANDSOME Archery Club. Precision & Power. All rights reserved.</p>
    </footer>

  </div>
</template>