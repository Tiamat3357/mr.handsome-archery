<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- ข้อมูลเดือนและเวลา ---
const TH_MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
const TH_MONTHS_SHORT = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
const TIME_SLOTS = ['11:00', '13:00', '14:30', '16:00', '17:00']

const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())
const selectedDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
const selectedSlot = ref('11:00')
const selectedDuration = ref(1)

const OPEN_MIN = 11 * 60
const CLOSE_MIN = 17 * 60
const HALF_MIN = (OPEN_MIN + CLOSE_MIN) / 2

function toDateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

function nowMin() {
  const n = new Date()
  return n.getHours() * 60 + n.getMinutes()
}

function minuteOf(t) {
  if (!t) return 0
  const p = String(t).split(':')
  return (+p[0]) * 60 + (+p[1])
}

function pad(n) {
  return n < 10 ? '0' + n : '' + n
}

function endTime(t, hours) {
  const parts = t.split(':')
  const m = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10) + (hours || 1) * 60
  return pad(Math.floor(m / 60)) + ':' + pad(m % 60)
}

// คำนวณตารางปฏิทิน
const calendarDays = computed(() => {
  const year = viewYear.value
  const month = viewMonth.value
  const offset = (new Date(year, month, 1).getDay() + 6) % 7 // เริ่มนับวันจันทร์
  const total = new Date(year, month + 1, 0).getDate()
  const prevTotal = new Date(year, month, 0).getDate()
  const todayTS = toDateOnly(today)

  const days = []

  // วันของเดือนก่อนหน้า (Disabled)
  for (let i = 0; i < offset; i++) {
    days.push({
      day: prevTotal - offset + 1 + i,
      disabled: true,
      isCurrentMonth: false
    })
  }

  // วันของเดือนปัจจุบัน
  for (let d = 1; d <= total; d++) {
    const dt = new Date(year, month, d)
    const isWed = dt.getDay() === 3
    const isPast = toDateOnly(dt) < todayTS
    const isTodayOverflow = toDateOnly(dt) === todayTS && nowMin() >= HALF_MIN
    const disabled = isWed || isPast || isTodayOverflow
    const isSelected = selectedDate.value && toDateOnly(selectedDate.value) === toDateOnly(dt)

    days.push({
      day: d,
      dateObj: dt,
      disabled,
      isSelected,
      isCurrentMonth: true
    })
  }

  return days
})

function prevMonth() {
  viewMonth.value--
  if (viewMonth.value < 0) {
    viewMonth.value = 11
    viewYear.value--
  }
}

function nextMonth() {
  viewMonth.value++
  if (viewMonth.value > 11) {
    viewMonth.value = 0
    viewYear.value++
  }
}

function setToday() {
  viewYear.value = today.getFullYear()
  viewMonth.value = today.getMonth()
  selectedDate.value = new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

function selectDay(cell) {
  if (cell.disabled || !cell.isCurrentMonth) return
  selectedDate.value = cell.dateObj
}

// ตรวจสอบสถานะรอบเวลา
function isSlotDisabled(time) {
  if (!selectedDate.value) return false
  const isToday = toDateOnly(selectedDate.value) === toDateOnly(today)
  return isToday && minuteOf(time) <= nowMin()
}

// ข้อความสรุป
const summaryDateLabel = computed(() => {
  if (!selectedDate.value) return '-'
  return `${selectedDate.value.getDate()} ${TH_MONTHS_SHORT[selectedDate.value.getMonth()]} ${selectedDate.value.getFullYear()}`
})

const summaryTimeLabel = computed(() => {
  return `${selectedSlot.value} - ${endTime(selectedSlot.value, selectedDuration.value)}`
})

const summaryTotal = computed(() => {
  return 370 * selectedDuration.value
})

// ยืนยันการจองและส่งค่าไปยังหน้าถัดไป
function handleConfirm() {
  const cur = nowMin()
  const isTodayBook = selectedDate.value && toDateOnly(selectedDate.value) === toDateOnly(today)

  if (isTodayBook && cur >= HALF_MIN) {
    alert('เกินเวลากำหนดสำหรับการจองรอบในวันนี้ (หลัง 14:45 น.) แล้ว กรุณาเลือกรอบในวันอื่น')
    return
  }

  const slotM = minuteOf(selectedSlot.value)
  if (isTodayBook && slotM <= cur) {
    alert(`รอบเวลา ${selectedSlot.value} น. เริ่มไปแล้วหรือผ่านไปแล้ว กรุณาเลือกรอบเวลาที่เหลืออยู่`)
    return
  }

  if (slotM + selectedDuration.value * 60 > CLOSE_MIN) {
    alert('เวลาจบรอบเกินเวลาปิดสนาม 17:00 น. กรุณาเลือกรอบเวลาที่เร็วขึ้นหรือลดชั่วโมงเล่น')
    return
  }

  // ตรวจสอบการจองซ้ำจาก LocalStorage
  let bookings = []
  try {
    bookings = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]')
  } catch (err) {}

  if (Array.isArray(bookings)) {
    for (const bk of bookings) {
      if (bk.status === 'cancelled' || bk.date !== summaryDateLabel.value) continue
      const bs = bk.time ? minuteOf(String(bk.time).replace(/ น\./g, '').split(' - ')[0]) : -1
      if (bs < 0) continue
      const be = bs + (bk.duration || 1) * 60
      if (slotM < be && bs < slotM + selectedDuration.value * 60) {
        alert(`รอบเวลา ${selectedSlot.value} น. ในวันที่นี้ถูกจองไว้แล้ว (${bk.id}) กรุณาเลือกรอบอื่นหรือวันอื่น`)
        return
      }
    }
  }

  // บันทึก State ลง SessionStorage
  try {
    sessionStorage.setItem('mrhs_schedule_state', JSON.stringify({
      date: toDateOnly(selectedDate.value),
      slot: selectedSlot.value,
      duration: selectedDuration.value
    }))
  } catch (e) {}

  // นำทางไปยังหน้า Booking พร้อม Query Parameters
  router.push({
    path: '/booking',
    query: {
      date: summaryDateLabel.value,
      time: summaryTimeLabel.value,
      duration: selectedDuration.value
    }
  })
}
</script>

<template>
  <div class="bg-[#121212] text-[#f5f5f0] font-body-md antialiased min-h-screen flex flex-col">
    <!-- TopNavBar -->
    <header class="flex justify-between items-center w-full px-6 md:px-12 h-20 sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-sm border-b border-[#383838]">
      <router-link to="/" class="text-2xl font-extrabold tracking-tighter flex items-center gap-2 text-[#FFD700]">
        MR.HANDSOME
      </router-link>
      <nav class="hidden md:flex gap-6 items-center h-full text-sm font-semibold">
        <router-link to="/#services" class="text-[#bfbfbb] hover:text-[#f5f5f0] transition-colors">บริการ</router-link>
        <router-link to="/schedule" class="text-[#f5f5f0] font-bold border-b-2 border-[#FFD700] pb-1">การจอง</router-link>
        <router-link to="/equipment" class="text-[#bfbfbb] hover:text-[#f5f5f0] transition-colors">อุปกรณ์</router-link>
        <router-link to="/my-bookings" class="text-[#bfbfbb] hover:text-[#f5f5f0] transition-colors">บัตรจอง</router-link>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-[#f5f5f0] mb-2">จองลานของคุณ</h1>
        <p class="text-base text-[#bfbfbb]">รักษาที่ของคุณที่สนามยิงธนู ความแม่นยำรอคุณอยู่</p>
        <p class="text-sm text-[#FFD700] mt-2 font-bold">เปิดให้บริการทุกวัน: 11:00 - 17:00 น. (ยกเว้นวันพุธ)</p>
      </div>

      <!-- Bento-style Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Sidebar Configuration (3 Cols) -->
        <aside class="lg:col-span-3 space-y-6">
          <div class="bg-[#262626] border border-[#383838] rounded-2xl p-6 relative overflow-hidden group">
            <span class="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] text-[#f5f5f0] opacity-5 pointer-events-none transform -rotate-45">
              sports_score
            </span>
            <h2 class="text-xl font-bold mb-3">จองสนาม</h2>
            <div class="space-y-3 relative z-10">
              <p class="text-sm text-[#bfbfbb]">เลือกจองสนามยิงธนูมาตรฐานพร้อมอุปกรณ์ครบครัน</p>
              <div class="p-4 bg-[#1c1c1c] rounded-xl border-2 border-[#FFD700] shadow-sm">
                <span class="block text-sm font-bold text-[#f5f5f0]">สนามมาตรฐาน (Standard Lane)</span>
                <span class="block text-xs text-[#bfbfbb] mt-1">รองรับนักธนู 1-2 คน / เลน</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Calendar & Time Slots (6 Cols) -->
        <section class="lg:col-span-6 space-y-6">
          <!-- Calendar Card -->
          <div class="bg-[#262626] border border-[#383838] rounded-2xl p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold">
                {{ TH_MONTHS[viewMonth] }} {{ viewYear }}
              </h2>
              <div class="flex gap-2">
                <button @click="prevMonth" type="button" class="p-2 border border-[#383838] rounded-lg hover:bg-[#1c1c1c] transition-colors" aria-label="เดือนก่อนหน้า">
                  <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button @click="nextMonth" type="button" class="p-2 border border-[#383838] rounded-lg hover:bg-[#1c1c1c] transition-colors" aria-label="เดือนถัดไป">
                  <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            <div class="flex items-center gap-3 mb-6">
              <select v-model="viewMonth" class="bg-[#181818] border border-[#383838] text-[#f5f5f0] rounded-lg text-sm py-1.5 px-3 focus:border-[#FFD700] outline-none">
                <option v-for="(m, i) in TH_MONTHS" :key="i" :value="i">{{ m }}</option>
              </select>
              <select v-model="viewYear" class="bg-[#181818] border border-[#383838] text-[#f5f5f0] rounded-lg text-sm py-1.5 px-3 focus:border-[#FFD700] outline-none">
                <option v-for="y in [viewYear - 1, viewYear, viewYear + 1]" :key="y" :value="y">{{ y }}</option>
              </select>
              <button @click="setToday" type="button" class="text-xs px-3 py-1.5 rounded-lg bg-[#181818] border border-[#383838] hover:bg-[#FFD700] hover:text-[#1a1a1a] transition-colors font-bold">
                วันนี้
              </button>
            </div>

            <!-- Days Header -->
            <div class="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-[#bfbfbb]">
              <div>จ.</div><div>อ.</div><div>พ.</div><div>พฤ.</div><div>ศ.</div><div>ส.</div><div>อา.</div>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-2 text-center text-sm">
              <div
                v-for="(cell, idx) in calendarDays"
                :key="idx"
                @click="selectDay(cell)"
                :class="[
                  'py-2.5 rounded-lg transition-all',
                  !cell.isCurrentMonth || cell.disabled
                    ? 'text-[#bfbfbb] opacity-30 cursor-not-allowed line-through'
                    : cell.isSelected
                    ? 'bg-[#FFD700] text-[#1a1a1a] font-bold shadow-md shadow-[#FFD700]/20 cursor-pointer'
                    : 'text-[#f5f5f0] hover:bg-[#181818] cursor-pointer'
                ]"
              >
                {{ cell.day }}
              </div>
            </div>
          </div>

          <!-- Time Slots Card -->
          <div class="bg-[#262626] border border-[#383838] rounded-2xl p-6">
            <div class="flex justify-between items-center mb-6 border-b border-[#383838] pb-3">
              <h2 class="text-xl font-bold">เวลาที่ว่าง</h2>
              <span class="bg-[#181818] text-[#FFD700] text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                {{ summaryDateLabel }}
              </span>
            </div>

            <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
              <button
                v-for="time in TIME_SLOTS"
                :key="time"
                type="button"
                :disabled="isSlotDisabled(time)"
                @click="selectedSlot = time"
                :class="[
                  'py-3 px-2 rounded-xl text-sm font-bold flex flex-col items-center transition-all',
                  isSlotDisabled(time)
                    ? 'border border-[#383838] text-[#bfbfbb] opacity-30 cursor-not-allowed'
                    : selectedSlot === time
                    ? 'border-2 border-[#FFD700] bg-[#FFD700] text-[#1a1a1a] shadow-md shadow-[#FFD700]/20'
                    : 'border border-[#383838] text-[#f5f5f0] hover:border-[#FFD700] hover:bg-[#181818]'
                ]"
              >
                {{ time }}
              </button>
            </div>

            <!-- Duration Select -->
            <div class="mt-6 border-t border-[#383838] pt-4">
              <span class="text-xs text-[#bfbfbb] block mb-2 uppercase tracking-wider">ระยะเวลาการเล่น</span>
              <div class="flex items-center gap-3">
                <select v-model.number="selectedDuration" class="bg-[#181818] border border-[#383838] text-[#f5f5f0] rounded-xl text-sm py-2 px-4 focus:border-[#FFD700] outline-none font-bold">
                  <option :value="1">1 ชั่วโมง</option>
                  <option :value="2">2 ชั่วโมง</option>
                  <option :value="3">3 ชั่วโมง</option>
                </select>
                <span class="text-xs text-[#bfbfbb]">เลือกได้สูงสุด 3 ชั่วโมงต่อรอบ</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Summary Sidebar (3 Cols) -->
        <aside class="lg:col-span-3">
          <div class="bg-[#262626] border border-[#383838] rounded-2xl p-6 sticky top-28 space-y-4">
            <h2 class="text-lg font-bold border-b border-[#383838] pb-3 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#FFD700]">receipt_long</span>
              สรุปการจอง
            </h2>

            <ul class="space-y-3 text-sm divide-y divide-[#383838]/60">
              <li class="flex justify-between pt-2">
                <span class="text-[#bfbfbb]">เซสชัน</span>
                <span class="font-bold">ลานเดี่ยว</span>
              </li>
              <li class="flex justify-between pt-2">
                <span class="text-[#bfbfbb]">ประเภทลาน</span>
                <span class="font-bold">18 ม. โปร</span>
              </li>
              <li class="flex justify-between pt-2">
                <span class="text-[#bfbfbb]">วันที่</span>
                <span class="font-bold text-[#FFD700]">{{ summaryDateLabel }}</span>
              </li>
              <li class="flex justify-between pt-2">
                <span class="text-[#bfbfbb]">เวลา</span>
                <span class="font-bold text-[#FFD700]">{{ summaryTimeLabel }}</span>
              </li>
              <li class="flex justify-between pt-2">
                <span class="text-[#bfbfbb]">ระยะเวลา</span>
                <span class="font-bold">{{ selectedDuration }} ชม.</span>
              </li>
            </ul>

            <div class="bg-[#1c1c1c] p-4 rounded-xl flex justify-between items-center border border-[#383838]">
              <span class="text-xs uppercase tracking-wider text-[#bfbfbb]">รวมทั้งสิ้น</span>
              <span class="text-2xl font-black text-[#FFD700]">{{ summaryTotal }} ฿</span>
            </div>

            <button
              @click="handleConfirm"
              type="button"
              class="w-full py-4 bg-[#FFD700] text-[#1a1a1a] font-bold text-base rounded-xl hover:bg-[#e6be00] transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#FFD700]/25 cursor-pointer active:scale-95"
            >
              <span>ยืนยันการเลือกรอบ</span>
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-6 px-6 md:px-12 bg-[#121212] border-t border-[#383838] mt-auto text-xs text-[#bfbfbb] flex flex-col md:flex-row justify-between items-center gap-4">
      <div>MR.HANDSOME Tactical Range © 2026 สงวนลิขสิทธิ์</div>
      <router-link to="/pos" class="hover:text-[#FFD700] transition-colors flex items-center gap-1">
        <span>🔒</span>
        <span>Staff & Owner POS</span>
      </router-link>
    </footer>
  </div>
</template>