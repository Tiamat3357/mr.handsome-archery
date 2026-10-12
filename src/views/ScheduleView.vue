<!--
  src/views/ScheduleView.vue
  หน้าเลือกรอบและปฏิทินการจอง (ScheduleView)
  - ลบ Navbar ที่ซ้อนออก (ใช้ Navbar กลางตัวเดียว)
  - แก้กล่องสรุปบิล ไม่คิดเงินมั่ว รอให้ไปเลือกอุปกรณ์ในหน้าถัดไป
  - คุมโทน Tactical Dark & Gold (#121212) เข้าเซ็ตกับทั้งเว็บ
-->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ชื่อเดือนภาษาไทย
const TH_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
]

const TH_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
]

const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())
const selectedDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()))
const selectedSlot = ref('11:00')
const selectedDuration = ref(1)

// รอบเวลามาตรฐานของสนาม MR.HANDSOME
const timeSlots = ['11:00', '13:00', '14:30', '16:00', '17:00']

// ตัวเลือกปี
const yearOptions = computed(() => {
  const cur = today.getFullYear()
  const years = []
  for (let y = cur - 1; y <= cur + 3; y++) {
    years.push(y)
  }
  return years
})

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
  return n < 10 ? '0' + n : String(n)
}

function calculateEndTime(t, hours) {
  if (!t) return ''
  const parts = t.split(':')
  const m = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10) + (Number(hours) || 1) * 60
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`
}

// ช่องว่างของวันเดือนก่อนหน้า
const prevMonthPadding = computed(() => {
  const offset = (new Date(viewYear.value, viewMonth.value, 1).getDay() + 6) % 7
  const prevTotal = new Date(viewYear.value, viewMonth.value, 0).getDate()
  const pads = []
  for (let i = 0; i < offset; i++) {
    pads.push(prevTotal - offset + 1 + i)
  }
  return pads
})

// วันที่ในเดือนปัจจุบัน
const monthDays = computed(() => {
  const total = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const todayTS = toDateOnly(today)
  const selTS = selectedDate.value ? toDateOnly(selectedDate.value) : null
  const list = []

  for (let d = 1; d <= total; d++) {
    const dt = new Date(viewYear.value, viewMonth.value, d)
    const dtTS = toDateOnly(dt)

    // สนามปิดทุกวันพุธ (getDay === 3) หรือวันที่ผ่านมาแล้ว
    const isWed = dt.getDay() === 3
    const isPast = dtTS < todayTS
    const disabled = isWed || isPast
    const selected = selTS !== null && selTS === dtTS

    list.push({
      day: d,
      date: dt,
      timestamp: dtTS,
      disabled,
      selected
    })
  }
  return list
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

function goToday() {
  viewYear.value = today.getFullYear()
  viewMonth.value = today.getMonth()
  selectedDate.value = new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

function selectDate(dt) {
  selectedDate.value = dt
}

function isSlotPast(slot) {
  if (!selectedDate.value) return false
  const isToday = toDateOnly(selectedDate.value) === toDateOnly(today)
  return isToday && minuteOf(slot) <= nowMin()
}

// ฟอร์แมตวันที่แสดงผล
const formattedShortDate = computed(() => {
  if (!selectedDate.value) return ''
  return `${selectedDate.value.getDate()} ${TH_MONTHS_SHORT[selectedDate.value.getMonth()]}`
})

const formattedFullDate = computed(() => {
  if (!selectedDate.value) return ''
  return `${selectedDate.value.getDate()} ${TH_MONTHS_SHORT[selectedDate.value.getMonth()]} ${selectedDate.value.getFullYear()}`
})

// กดยืนยันเพื่อไปหน้าเลือกคันธนูและกรอกข้อมูลผู้จอง (/booking)
function handleConfirmBooking() {
  const cur = nowMin()
  const todayTS = toDateOnly(today)
  const isTodayBook = selectedDate.value && toDateOnly(selectedDate.value) === todayTS
  const closeMin = 18 * 60 + 30 // เวลาปิดสนาม 18:30 น.

  const slotM = minuteOf(selectedSlot.value)
  if (isTodayBook && slotM <= cur) {
    alert(`รอบเวลา ${selectedSlot.value} น. ผ่านไปแล้ว กรุณาเลือกรอบเวลาถัดไป`)
    return
  }

  if (slotM + selectedDuration.value * 60 > closeMin) {
    alert('เวลาจบรอบเกินเวลาปิดสนาม (18:30 น.) กรุณาลดชั่วโมงหรือเลือกรอบที่เร็วขึ้น')
    return
  }

  // เช็คคิวชนกับ localStorage
  try {
    const bl = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]')
    if (Array.isArray(bl)) {
      for (const bk of bl) {
        if (bk.status === 'cancelled' || bk.date !== formattedFullDate.value) continue
        const bs = bk.time ? minuteOf(String(bk.time).replace(/น\./g, '').split('-')[0]) : -1
        if (bs < 0) continue
        const be = bs + (bk.duration || 1) * 60
        if (slotM < be && bs < slotM + selectedDuration.value * 60) {
          alert(`รอบเวลา ${selectedSlot.value} น. ในวันที่นี้ถูกจองไว้แล้ว กรุณาเลือกรอบอื่น`)
          return
        }
      }
    }
  } catch (e) {}

  // ส่งข้อมูลรอบเวลาไปที่หน้าเลือกอุปกรณ์ (/booking)
  router.push({
    path: '/booking',
    query: {
      date: formattedFullDate.value,
      time: `${selectedSlot.value} - ${calculateEndTime(selectedSlot.value, selectedDuration.value)} น.`,
      duration: selectedDuration.value
    }
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#121212] text-stone-100 font-sans antialiased flex flex-col pt-20" lang="th">
    
    <!-- Main Content Canvas (ไม่มี Navbar ซ้อนแล้ว) -->
    <main class="flex-grow w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
      
      <!-- Page Header -->
      <div class="mb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#222] border border-[#ffd700]/30 text-[#ffd700] text-xs font-mono font-bold mb-3">
          <span class="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse"></span>
          <span>STEP 01: เลือกรอบเวลาเข้าใช้บริการ</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
          จองลานยิงธนูของคุณ
        </h1>
        <p class="text-xs sm:text-sm text-stone-400 mt-1">
          รักษาช่องยิงของคุณล่วงหน้า ความแม่นยำรอคุณอยู่
        </p>
        <p class="text-xs font-mono text-[#ffd700] mt-2 font-semibold">
          เปิดให้บริการทุกวัน: 11:00 - 18:30 น. (หยุดทุกวันพุธ)
        </p>
      </div>

      <!-- Booking Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Sidebar ซ้าย: ข้อมูลสนาม (Span 3) -->
        <aside class="lg:col-span-3 space-y-4">
          <div class="card-level-1 p-5 relative overflow-hidden">
            <span class="material-symbols-outlined absolute -bottom-3 -right-3 text-[100px] text-white opacity-5 pointer-events-none transform -rotate-12">
              sports_score
            </span>
            <h2 class="text-base font-bold text-white mb-2">ประเภทสนาม</h2>
            <p class="text-xs text-stone-400 mb-4 leading-relaxed">
              สนามยิงธนูในร่มระยะ 18 เมตร มาตรฐานสากล พร้อมสิ่งอำนวยความสะดวกครบครัน
            </p>
            <div class="p-3.5 bg-[#181818] rounded-xl border-2 border-[#ffd700] shadow-sm">
              <span class="block text-xs font-bold text-white">สนามมาตรฐาน (Standard Lane)</span>
              <span class="block text-[11px] text-stone-400 mt-1">ระยะ 18 เมตร • รองรับ 1-2 คน/เลน</span>
            </div>
          </div>
        </aside>

        <!-- Main Canvas: Calendar & Time Slots (Span 6) -->
        <section class="lg:col-span-6 space-y-5">
          
          <!-- Calendar Card -->
          <div class="card-level-1 p-5 sm:p-6 bg-pattern">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-base sm:text-lg font-bold text-white">
                {{ TH_MONTHS[viewMonth] }} {{ viewYear }}
              </h2>
              <div class="flex gap-1.5">
                <button
                  type="button"
                  @click="prevMonth"
                  class="p-2 border border-[#383838] bg-[#181818] rounded-lg hover:border-[#ffd700] text-stone-300 transition-colors cursor-pointer"
                  title="เดือนก่อนหน้า"
                >
                  <span class="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  @click="nextMonth"
                  class="p-2 border border-[#383838] bg-[#181818] rounded-lg hover:border-[#ffd700] text-stone-300 transition-colors cursor-pointer"
                  title="เดือนถัดไป"
                >
                  <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            <!-- Month/Year Selectors -->
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <select
                v-model="viewMonth"
                class="bg-[#181818] border border-[#383838] rounded-lg text-xs py-1.5 px-3 focus:border-[#ffd700] text-white outline-none cursor-pointer"
              >
                <option v-for="(m, idx) in TH_MONTHS" :key="idx" :value="idx">{{ m }}</option>
              </select>

              <select
                v-model="viewYear"
                class="bg-[#181818] border border-[#383838] rounded-lg text-xs py-1.5 px-3 focus:border-[#ffd700] text-white outline-none cursor-pointer"
              >
                <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
              </select>

              <button
                type="button"
                @click="goToday"
                class="text-xs px-3 py-1.5 rounded-lg bg-[#262626] border border-[#383838] text-[#ffd700] font-bold hover:bg-[#333] transition-colors cursor-pointer"
              >
                วันนี้
              </button>
            </div>

            <!-- Days Header (จ. - อา.) -->
            <div class="grid grid-cols-7 gap-1.5 mb-2 text-center text-xs font-bold text-stone-400">
              <div>จ.</div>
              <div>อ.</div>
              <div class="text-rose-400">พ.*</div>
              <div>พฤ.</div>
              <div>ศ.</div>
              <div>ส.</div>
              <div>อา.</div>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1.5 text-center text-xs">
              <!-- วันของเดือนก่อนหน้า (ช่องว่าง) -->
              <div
                v-for="pad in prevMonthPadding"
                :key="'pad-' + pad"
                class="p-2.5 text-stone-600 opacity-30 select-none cursor-not-allowed"
              >
                {{ pad }}
              </div>

              <!-- วันในเดือนปัจจุบัน -->
              <div
                v-for="dayItem in monthDays"
                :key="dayItem.timestamp"
                :class="[
                  'p-2.5 rounded-lg transition-all text-center select-none cursor-pointer font-medium',
                  dayItem.disabled
                    ? 'text-stone-600 opacity-30 cursor-not-allowed line-through'
                    : dayItem.selected
                    ? 'bg-[#ffd700] text-black font-extrabold shadow-md scale-105'
                    : 'text-stone-200 hover:bg-[#262626] hover:text-[#ffd700]'
                ]"
                @click="!dayItem.disabled && selectDate(dayItem.date)"
              >
                {{ dayItem.day }}
              </div>
            </div>
            <p class="text-[10px] text-stone-500 mt-3 text-right">* วันพุธสนามปิดให้บริการ</p>
          </div>

          <!-- Time Slots Card -->
          <div class="card-level-1 p-5 sm:p-6">
            <div class="flex justify-between items-center mb-4 border-b border-[#2c2c2c] pb-3">
              <h2 class="text-base font-bold text-white">เลือกรอบเวลาที่ต้องการ</h2>
              <span class="bg-[#222] text-[#ffd700] text-xs font-mono px-2.5 py-1 rounded-md border border-[#ffd700]/30 font-bold">
                {{ formattedShortDate }}
              </span>
            </div>

            <div class="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              <button
                v-for="slot in timeSlots"
                :key="slot"
                type="button"
                :disabled="isSlotPast(slot)"
                :class="[
                  'py-3 px-2 rounded-xl text-xs font-mono font-bold flex flex-col items-center transition-all cursor-pointer border',
                  isSlotPast(slot)
                    ? 'border-[#262626] text-stone-600 opacity-40 cursor-not-allowed line-through'
                    : slot === selectedSlot
                    ? 'border-[#ffd700] bg-[#ffd700] text-black shadow-md'
                    : 'border-[#383838] bg-[#181818] text-stone-200 hover:border-[#ffd700]'
                ]"
                @click="selectedSlot = slot"
              >
                <span>{{ slot }} น.</span>
              </button>
            </div>

            <!-- Duration Selector -->
            <div class="mt-5 border-t border-[#2c2c2c] pt-4">
              <span class="text-xs text-stone-400 block mb-2 font-bold uppercase tracking-wider">
                ระยะเวลาเข้าใช้บริการ
              </span>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  v-for="h in [1, 2, 3]"
                  :key="h"
                  @click="selectedDuration = h"
                  :class="[
                    'px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer',
                    selectedDuration === h
                      ? 'bg-[#ffd700] text-black border-[#ffd700] shadow-sm'
                      : 'bg-[#181818] text-stone-400 border-[#383838] hover:text-white'
                  ]"
                >
                  {{ h }} ชั่วโมง
                </button>
                <span class="text-[11px] text-stone-500 ml-2">(สูงสุด 3 ชม./รอบ)</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Summary Sidebar (Span 3) แก้ไม่ให้คิดเงินมั่ว -->
        <aside class="lg:col-span-3">
          <div class="card-level-1 p-5 sticky top-24 space-y-4">
            <h2 class="text-base font-bold text-white border-b border-[#2c2c2c] pb-3 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#ffd700] text-[20px]">calendar_today</span>
              ข้อมูลรอบที่เลือก
            </h2>

            <ul class="space-y-3 text-xs divide-y divide-[#262626]">
              <li class="flex justify-between pt-2">
                <span class="text-stone-400">ประเภทสนาม:</span>
                <span class="font-bold text-white">ลานมาตรฐาน 18 ม.</span>
              </li>
              <li class="flex justify-between pt-2">
                <span class="text-stone-400">วันที่:</span>
                <span class="font-bold text-[#ffd700] font-mono">{{ formattedFullDate }}</span>
              </li>
              <li class="flex justify-between pt-2">
                <span class="text-stone-400">รอบเวลา:</span>
                <span class="font-bold text-white font-mono">
                  {{ selectedSlot }} - {{ calculateEndTime(selectedSlot, selectedDuration) }} น.
                </span>
              </li>
              <li class="flex justify-between pt-2">
                <span class="text-stone-400">ระยะเวลา:</span>
                <span class="font-bold text-white font-mono">{{ selectedDuration }} ชั่วโมง</span>
              </li>
            </ul>

            <!-- แจ้งว่าคิดราคาในขั้นตอนถัดไป ไม่ฮาร์ดโค้ด 370 บาทแล้ว -->
            <div class="bg-[#181818] p-3 rounded-xl border border-[#2c2c2c] space-y-1">
              <span class="text-[11px] font-bold text-stone-400 block uppercase tracking-wider">
                อัตราค่าบริการ
              </span>
              <span class="text-xs font-bold text-[#ffd700] block">
                คำนวณในขั้นตอนถัดไป
              </span>
              <span class="text-[10px] text-stone-500 block">
                (เริ่มต้น 100 ฿ สำหรับอุปกรณ์ส่วนตัว หรือ 300-350 ฿ สำหรับคันธนูสนาม)
              </span>
            </div>

            <!-- ปุ่มไปหน้าเลือกอุปกรณ์ -->
            <button
              type="button"
              @click="handleConfirmBooking"
              class="w-full py-3.5 bg-[#ffd700] text-black font-extrabold text-xs rounded-xl hover:bg-yellow-400 transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#ffd700]/15 cursor-pointer active:scale-95"
            >
              <span>ต่อไป: เลือกอุปกรณ์ & กรอกข้อมูล</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </aside>

      </div>
    </main>

    <!-- Footer แบบมินิมอล -->
    <footer class="w-full py-6 px-4 bg-[#101010] border-t border-[#262626] mt-auto">
      <div class="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <span class="font-bold text-[#ffd700]">MR.HANDSOME ARCHERY CLUB</span>
        <span>© 2026 MR.HANDSOME. All rights reserved.</span>
      </div>
    </footer>

  </div>
</template>

<style scoped>
.card-level-1 {
  background-color: #1a1a1a;
  border: 1px solid #2c2c2c;
  border-radius: 16px;
}

.bg-pattern {
  background-image: radial-gradient(circle at 100% 100%, rgba(255, 215, 0, 0.03) 0%, rgba(255, 215, 0, 0.03) 10px, transparent 10px, transparent 20px);
  background-size: 20px 20px;
}
</style>