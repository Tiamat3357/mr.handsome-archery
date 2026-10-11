<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()

// ---------- Theme ----------
const theme = ref('dark')
localStorage.setItem('mha-theme', 'dark')


// ---------- Store Status (เปิด-ปิดสนาม) ----------
const isStoreOpen = ref(localStorage.getItem('mha-store-open') !== 'false')
const toggleStoreStatus = async () => {
  isStoreOpen.value = !isStoreOpen.value
  localStorage.setItem('mha-store-open', isStoreOpen.value ? 'true' : 'false')
}

// ---------- ออกจากระบบ ----------
const handleLogout = async () => {
  if (confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
    await supabase.auth.signOut()
    router.push('/login')
  }
}

// ---------- Data States ----------
const packages = ref([])
const loading = ref(true)
const selectedPackage = ref(null)
const todayBookings = ref([])
const activeBooking = ref(null)
const showBookingModal = ref(false)
const selectedRound = ref(null)

const roundSlots = [
  { time: '11:00 - 12:00', label: 'รอบเช้า' },
  { time: '13:00 - 14:00', label: 'บ่าย 1' },
  { time: '14:30 - 15:30', label: 'บ่าย 2' },
  { time: '16:00 - 17:00', label: 'เย็น 1' },
  { time: '17:30 - 18:30', label: 'เย็น 2' }
]

const searchPhone = ref('')
const currentCustomer = ref(null)
const searchError = ref('')

const showRegisterModal = ref(false)
const newCustomerName = ref('')
const newCustomerPhone = ref('')
const registerError = ref('')
const registerLoading = ref(false)

const applyReward = ref(false)
const additionalTargets = ref(0)
const lostArrows = ref(0)
const paymentMethod = ref('PromptPay')
const isSubmitting = ref(false)
const showArrowFly = ref(false)

// คลิกซ้ำเพื่อยกเลิก (Deselect)
const toggleRound = (time) => {
  selectedRound.value = selectedRound.value === time ? null : time
}

const togglePackage = (pkg) => {
  selectedPackage.value = selectedPackage.value?.id === pkg.id ? null : pkg
}

// เช็คสิทธิ์สมาชิก
const availableReward = computed(() => {
  if (!currentCustomer.value) return null
  const pts = currentCustomer.value.points || 0
  if (pts >= 10) return { type: 'FREE', label: 'ยิงฟรี 1 รอบ (ใช้ 10 แต้ม)', rate: 1.0, cost: 10 }
  if (pts >= 7) return { type: 'DISCOUNT_50', label: 'ลด 50% (ใช้ 7 แต้ม)', rate: 0.5, cost: 7 }
  return null
})

watch(currentCustomer, () => { applyReward.value = false })

const fetchPackages = async () => {
  try {
    const { data, error } = await supabase.from('packages').select('*').order('id')
    if (error) throw error
    packages.value = data || []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const fetchTodayBookings = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('bookings')
      .select('*, packages(*)')
      .eq('booking_date', today)
      .eq('status', 'pending')
      .order('round_time')
    todayBookings.value = data || []
  } catch (err) {
    console.error(err)
  }
}

const searchCustomer = async () => {
  const cleanPhone = searchPhone.value.trim()
  if (!cleanPhone) return
  searchError.value = ''
  currentCustomer.value = null
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', cleanPhone)
      .single()
    if (error || !data) {
      searchError.value = 'ไม่พบเบอร์นี้ในระบบ'
    } else {
      currentCustomer.value = data
    }
  } catch {
    searchError.value = 'ไม่พบเบอร์นี้ในระบบ'
  }
}

const selectBookingItem = async (b) => {
  activeBooking.value = b
  selectedRound.value = b.round_time
  const matched = packages.value.find(p => p.id === b.package_id)
  if (matched) selectedPackage.value = matched
  searchPhone.value = b.customer_phone
  await searchCustomer()
  showBookingModal.value = false
}

// ตัดสิทธิ์ No-Show
const handleNoShow = async (booking) => {
  const ok = confirm(`ยืนยันการตัดสิทธิ์คิวของคุณ "${booking.customer_name || 'ลูกค้า'}" รอบ ${booking.round_time} ใช่หรือไม่?`)
  if (!ok) return
  try {
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', booking.id)
    if (error) throw error
    todayBookings.value = todayBookings.value.filter(b => b.id !== booking.id)
    if (activeBooking.value?.id === booking.id) clearCustomer()
  } catch (err) {
    alert('เกิดข้อผิดพลาดในการตัดสิทธิ์: ' + err.message)
  }
}

// ลงทะเบียนสมาชิกใหม่
const handleRegisterWalkIn = async () => {
  registerError.value = ''
  const phone = newCustomerPhone.value.trim()
  const name = newCustomerName.value.trim()

  if (!/^0[0-9]{9}$/.test(phone)) {
    registerError.value = 'เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 และมีครบ 10 หลัก'
    return
  }
  if (!name) {
    registerError.value = 'กรุณาระบุชื่อลูกค้า'
    return
  }

  registerLoading.value = true
  try {
    const { data: existing } = await supabase.from('customers').select('id').eq('phone', phone).maybeSingle()
    if (existing) {
      registerError.value = 'เบอร์โทรนี้ลงทะเบียนในระบบแล้ว'
      registerLoading.value = false
      return
    }
    const { data, error } = await supabase
      .from('customers')
      .insert([{ name, phone, points: 0 }])
      .select()
      .single()
    if (error) throw error

    currentCustomer.value = data
    searchPhone.value = data.phone
    searchError.value = ''
    showRegisterModal.value = false
  } catch (err) {
    registerError.value = 'ลงทะเบียนไม่สำเร็จ: ' + err.message
  } finally {
    registerLoading.value = false
  }
}

const clearCustomer = () => {
  currentCustomer.value = null
  searchPhone.value = ''
  searchError.value = ''
  activeBooking.value = null
  applyReward.value = false
}

const clampCount = (target) => {
  if (target === 'targets') {
    const val = Number(additionalTargets.value)
    additionalTargets.value = isNaN(val) || val < 0 ? 0 : Math.floor(val)
  } else {
    const val = Number(lostArrows.value)
    lostArrows.value = isNaN(val) || val < 0 ? 0 : Math.floor(val)
  }
}

const packagePrice = computed(() => Number(selectedPackage.value?.price || 0))
const discountAmount = computed(() => {
  if (!applyReward.value || !availableReward.value || !selectedPackage.value) return 0
  return packagePrice.value * availableReward.value.rate
})
const targetsPrice = computed(() => additionalTargets.value * 20)
const arrowsPrice = computed(() => lostArrows.value * 150)
const netTotal = computed(() => Math.max(0, packagePrice.value - discountAmount.value) + targetsPrice.value + arrowsPrice.value)

const canCheckout = computed(() => {
  if (isSubmitting.value) return false
  if (netTotal.value <= 0 && !selectedPackage.value) return false
  if (selectedPackage.value && !selectedRound.value) return false
  return true
})

const handleCheckout = async () => {
  if (!canCheckout.value) return
  isSubmitting.value = true

  try {
    const { error: logErr } = await supabase.from('service_logs').insert([{
      customer_id: currentCustomer.value ? currentCustomer.value.id : null,
      package_id: selectedPackage.value ? selectedPackage.value.id : null,
      round_time: selectedRound.value || 'บริการเสริม',
      additional_targets: additionalTargets.value,
      lost_arrows: lostArrows.value,
      total_amount: netTotal.value,
      payment_method: paymentMethod.value,
      staff_id: 'STAFF-01'
    }])

    if (logErr) throw logErr

    if (activeBooking.value) {
      await supabase.from('bookings').update({ status: 'completed' }).eq('id', activeBooking.value.id)
    }

    if (currentCustomer.value && selectedPackage.value) {
      let currentPts = currentCustomer.value.points || 0
      let nextPts = currentPts
      if (applyReward.value && availableReward.value) {
        nextPts = Math.max(0, currentPts - availableReward.value.cost) + 1
      } else {
        nextPts = currentPts + 1
      }
      await supabase.from('customers').update({ points: nextPts }).eq('id', currentCustomer.value.id)
    }

    showArrowFly.value = false
    requestAnimationFrame(() => { showArrowFly.value = true })
    setTimeout(() => { showArrowFly.value = false }, 900)

    additionalTargets.value = 0
    lostArrows.value = 0
    selectedPackage.value = null
    selectedRound.value = null
    clearCustomer()
    fetchTodayBookings()
  } catch (err) {
    alert('เกิดข้อผิดพลาด: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  theme.value = localStorage.getItem('mha-theme') || 'dark'
  fetchPackages()
  fetchTodayBookings()
})
</script>

<template>
  <div class="app-root" :data-theme="theme">
    <div class="glow-layer" aria-hidden="true">
      <span class="glow glow-a"></span>
      <span class="glow glow-b"></span>
    </div>
    <div class="grain-layer" aria-hidden="true"></div>

    <div class="min-h-screen relative font-sans" style="color: var(--text)">
      <!-- Top Header (Responsive Mobile-First) -->
      <header class="min-h-14 py-2 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 header-surface gap-2">
        <!-- ฝั่งซ้าย: โลโก้และชื่อสนาม -->
        <div class="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          <svg viewBox="0 0 40 40" class="w-7 h-7 sm:w-8 sm:h-8 shrink-0">
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
            <circle cx="20" cy="20" r="11" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
            <circle cx="20" cy="20" r="3" fill="var(--gold-bright)"/>
          </svg>
          <div class="min-w-0">
            <h1 class="text-xs sm:text-sm font-bold tracking-[0.06em] truncate" style="color: var(--text)">
              MR. HANDSOME
            </h1>
            <p class="text-[10px] sm:text-[11px] font-mono truncate hidden xs:block sm:block" style="color: var(--text-muted)">
              เคาน์เตอร์ POS
            </p>
          </div>
        </div>

        <!-- ฝั่งขวา: กลุ่มปุ่มควบคุม -->
        <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <!-- สวิตช์สถานะสนาม -->
          <button
            type="button"
            @click="toggleStoreStatus"
            class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-sm text-[11px] font-mono cursor-pointer border transition-colors shrink-0"
            :class="isStoreOpen ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold' : 'border-rose-500/40 bg-rose-500/10 text-rose-400 font-bold'"
            :title="isStoreOpen ? 'สนามเปิดบริการ' : 'ปิดรับจอง'"
          >
            <span class="w-2 h-2 rounded-full shrink-0" :class="isStoreOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'"></span>
            <span class="hidden sm:inline">{{ isStoreOpen ? 'สนามเปิดบริการ' : 'ปิดรับจอง' }}</span>
            <span class="sm:hidden">{{ isStoreOpen ? 'เปิด' : 'ปิด' }}</span>
          </button>

          

          <!-- ไป Dashboard -->
          <button @click="router.push('/dashboard')" class="btn-ghost flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-semibold shrink-0" title="แดชบอร์ดสรุปยอด">
            <span class="material-symbols-outlined text-[16px]">dashboard</span>
            <span class="hidden md:inline">แดชบอร์ด</span>
          </button>

          <!-- คิวจอง -->
          <button @click="showBookingModal = true" class="btn-ghost flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-semibold shrink-0" title="คิวจองวันนี้">
            <span class="material-symbols-outlined text-[16px]">calendar_month</span>
            <span class="hidden md:inline">คิวจอง</span>
            <span v-if="todayBookings.length > 0" class="badge-count">{{ todayBookings.length }}</span>
          </button>

          <!-- ปุ่มออกจากระบบ -->
          <button
            type="button"
            @click="handleLogout"
            class="btn-ghost px-2 sm:px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:border-rose-500/50 cursor-pointer shrink-0 font-bold"
            title="ออกจากระบบ"
          >
            <span class="material-symbols-outlined text-[16px] sm:hidden">logout</span>
            <span class="hidden sm:inline">ออกจากระบบ</span>
          </button>
        </div>
      </header>

      <!-- แถบ Check-in สด -->
      <transition name="fade-slide">
        <div v-if="activeBooking" class="px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs font-mono strip-surface" style="color: var(--gold-bright)">
          <span class="truncate mr-2 font-bold">CHECK-IN: <strong>{{ activeBooking.customer_name }}</strong> {{ activeBooking.round_time }}</span>
          <button @click="clearCustomer" class="underline cursor-pointer shrink-0 font-bold" style="color: var(--gold-bright)">ยกเลิก</button>
        </div>
      </transition>

      <!-- Main Layout -->
      <main class="max-w-7xl mx-auto p-3 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
        <div class="lg:col-span-7 space-y-4 sm:space-y-5">
          <!-- 01 / ข้อมูลสมาชิก -->
          <section class="panel p-4 sm:p-5">
            <div class="flex items-center justify-between mb-3">
              <span class="label-eyebrow">01 / ข้อมูลสมาชิก</span>
              <button v-if="currentCustomer" @click="clearCustomer" class="text-xs underline cursor-pointer font-medium" style="color: var(--text-muted)">เปลี่ยนลูกค้า</button>
            </div>

            <div v-if="!currentCustomer" class="space-y-3">
              <div class="flex gap-2">
                <input v-model="searchPhone" @keyup.enter="searchCustomer" type="text" placeholder="กรอกเบอร์โทรศัพท์ลูกค้า 10 หลัก..." class="input-field flex-1 font-mono">
                <button @click="searchCustomer" class="btn-ghost px-3.5 sm:px-4 text-xs font-bold">ค้นหา</button>
              </div>
              <transition name="fade-slide">
                <div v-if="searchError" class="p-3 rounded-sm flex items-center justify-between inset-surface">
                  <span class="text-xs font-medium" style="color: var(--text-muted)">{{ searchError }}</span>
                  <button @click="newCustomerPhone = searchPhone; showRegisterModal = true" class="text-xs font-bold cursor-pointer" style="color: var(--gold-bright)">+ สมัครสมาชิกใหม่</button>
                </div>
              </transition>
            </div>

            <div v-else class="p-3.5 sm:p-4 rounded-sm space-y-3 inset-surface" style="border-left: 3px solid var(--gold)">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-base font-bold" style="color: var(--text)">{{ currentCustomer.name }}</h3>
                  <p class="text-xs mt-0.5 font-mono" style="color: var(--text-muted)">{{ currentCustomer.phone }}</p>
                </div>
                <div class="text-right">
                  <span class="text-xs font-medium" style="color: var(--text-muted)">แต้มสะสม</span>
                  <div class="text-xl font-black font-mono" style="color: var(--gold-bright)">
                    {{ currentCustomer.points || 0 }} <span class="text-xs font-normal" style="color: var(--text-muted)">/ 10</span>
                  </div>
                </div>
              </div>

              <div class="progress-track">
                <div class="progress-fill" :style="{ width: `${Math.min(100, ((currentCustomer.points || 0) / 10) * 100)}%` }"></div>
              </div>

              <div v-if="availableReward && selectedPackage" class="pt-2 flex items-center justify-between" style="border-top: 1px solid var(--border)">
                <span class="text-xs font-bold" style="color: var(--gold-bright)">{{ availableReward.label }}</span>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="applyReward" class="w-4 h-4 cursor-pointer" style="accent-color: var(--gold)">
                  <span class="text-xs font-bold" style="color: var(--text)">ใช้สิทธิ์ในบิลนี้</span>
                </label>
              </div>
            </div>
          </section>

          <!-- 02 / รอบเวลา -->
          <section class="panel p-4 sm:p-5">
            <div class="flex justify-between items-center mb-3">
              <span class="label-eyebrow">02 / รอบเวลาเข้าใช้บริการ (กดซ้ำเพื่อยกเลิก)</span>
              <span v-if="selectedRound" @click="selectedRound = null" class="text-xs underline cursor-pointer font-bold" style="color: var(--gold-bright)">ปลดการเลือก</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              <button
                v-for="slot in roundSlots"
                :key="slot.time"
                type="button"
                @click="toggleRound(slot.time)"
                :class="['round-chip', selectedRound === slot.time ? 'round-chip-active' : '']"
              >
                <span class="text-xs font-mono tracking-tight">{{ slot.time }}</span>
                <span class="text-[11px]">{{ slot.label }}</span>
              </button>
            </div>
          </section>

          <!-- 03 / แพ็กเกจ -->
          <section class="panel p-4 sm:p-5">
            <div class="flex justify-between items-center mb-3">
              <span class="label-eyebrow">03 / แพ็กเกจหลัก (กดซ้ำเพื่อยกเลิก)</span>
              <span v-if="selectedPackage" @click="selectedPackage = null" class="text-xs underline cursor-pointer font-bold" style="color: var(--gold-bright)">ปลดการเลือก</span>
            </div>
            <div v-if="loading" class="text-xs py-4 text-center" style="color: var(--text-muted)">กำลังโหลดข้อมูลแพ็กเกจ...</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                v-for="pkg in packages"
                :key="pkg.id"
                @click="togglePackage(pkg)"
                :class="['pkg-card', selectedPackage?.id === pkg.id ? 'pkg-card-active' : '']"
              >
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <h4 class="text-sm font-bold" style="color: var(--text)">{{ pkg.name }}</h4>
                    <span v-if="selectedPackage?.id === pkg.id" class="pkg-check">✓</span>
                  </div>
                  <p class="text-xs leading-relaxed" style="color: var(--text-soft)">{{ pkg.description }}</p>
                </div>
                <div class="mt-4 pt-2.5 flex items-baseline justify-between" style="border-top: 1px solid var(--border)">
                  <span class="text-[11px] font-medium" style="color: var(--text-muted)">อัตราค่าบริการ</span>
                  <span class="text-base font-black font-mono" style="color: var(--gold-bright)">฿{{ pkg.price }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- 04 / อุปกรณ์เสริม & ค่าปรับ -->
          <section class="panel p-4 sm:p-5">
            <span class="label-eyebrow block mb-3">04 / เป้ากระดาษเสริม / ค่าชดเชยอุปกรณ์</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div class="p-3.5 rounded-sm flex items-center justify-between inset-surface">
                <div>
                  <span class="text-xs font-bold block" style="color: var(--text)">เป้ากระดาษเพิ่ม</span>
                  <span class="text-[11px] font-medium" style="color: var(--text-muted)">+20 / แผ่น</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <button @click="additionalTargets = Math.max(0, additionalTargets - 1)" class="stepper-btn">-</button>
                  <input type="number" v-model.number="additionalTargets" @focus="$event.target.select()" @blur="clampCount('targets')" min="0" class="stepper-input">
                  <button @click="additionalTargets++" class="stepper-btn">+</button>
                </div>
              </div>

              <div class="p-3.5 rounded-sm flex items-center justify-between inset-surface">
                <div>
                  <span class="text-xs font-bold block" style="color: var(--text)">ลูกธนูชำรุด / สูญหาย</span>
                  <span class="text-[11px] font-medium" style="color: var(--text-muted)">+150 / ลูก</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <button @click="lostArrows = Math.max(0, lostArrows - 1)" class="stepper-btn">-</button>
                  <input type="number" v-model.number="lostArrows" @focus="$event.target.select()" @blur="clampCount('arrows')" min="0" class="stepper-input">
                  <button @click="lostArrows++" class="stepper-btn">+</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- ฝั่งสรุปบิล (แคชเชียร์) -->
        <div class="lg:col-span-5">
          <div class="panel panel-strong p-5 sm:p-6 lg:sticky lg:top-24 space-y-4 sm:space-y-5 relative">
            <span class="corner corner-tl"></span>
            <span class="corner corner-tr"></span>
            <span class="corner corner-bl"></span>
            <span class="corner corner-br"></span>

            <div class="flex items-center justify-between pb-3" style="border-bottom: 1px solid var(--border)">
              <h3 class="text-sm font-bold" style="color: var(--text)">สรุปรายการบริการ</h3>
              <span class="text-xs font-mono font-bold" style="color: var(--gold-bright)">{{ selectedRound || 'ไม่ระบุรอบ' }}</span>
            </div>

            <!-- รายการคำนวณ -->
            <div class="space-y-3 text-xs">
              <div class="flex justify-between items-center" style="color: var(--text-soft)">
                <span class="font-medium">{{ selectedPackage?.name || 'ไม่มีแพ็กเกจ (บริการเสริม)' }}</span>
                <span class="font-mono font-bold" style="color: var(--text)">฿{{ packagePrice }}</span>
              </div>
              <div v-if="discountAmount > 0" class="flex justify-between items-center" style="color: var(--gold-bright)">
                <span class="font-bold">ส่วนลดสิทธิ์สมาชิก (-{{ availableReward?.cost }} แต้ม)</span>
                <span class="font-mono font-bold">-฿{{ discountAmount }}</span>
              </div>
              <div v-if="additionalTargets > 0" class="flex justify-between items-center" style="color: var(--text-muted)">
                <span>เป้ากระดาษเสริม ({{ additionalTargets }} แผ่น)</span>
                <span class="font-mono font-semibold" style="color: var(--text-soft)">+฿{{ targetsPrice }}</span>
              </div>
              <div v-if="lostArrows > 0" class="flex justify-between items-center" style="color: var(--danger)">
                <span class="font-bold">ค่าชดเชยลูกธนู ({{ lostArrows }} ลูก)</span>
                <span class="font-mono font-bold">+฿{{ arrowsPrice }}</span>
              </div>
            </div>

            <!-- ช่องทางการชำระเงิน -->
            <div class="pt-3" style="border-top: 1px solid var(--border)">
              <span class="text-[11px] block mb-2 font-bold" style="color: var(--text-muted)">ช่องทางการชำระเงิน</span>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" @click="paymentMethod = 'PromptPay'" :class="['pay-btn', paymentMethod === 'PromptPay' ? 'pay-btn-active' : '']">สแกน QR</button>
                <button type="button" @click="paymentMethod = 'Cash'" :class="['pay-btn', paymentMethod === 'Cash' ? 'pay-btn-active' : '']">เงินสด</button>
              </div>
            </div>

            <!-- ยอดสุทธิ -->
            <div class="pt-4 flex items-baseline justify-between" style="border-top: 1px solid var(--border)">
              <span class="text-xs font-bold" style="color: var(--text-muted)">ยอดชำระสุทธิ</span>
              <span class="text-3xl font-black font-mono tracking-tight" style="color: var(--gold-bright)">฿{{ netTotal }}</span>
            </div>

            <!-- ปุ่มบันทึก -->
            <div class="relative">
              <transition name="arrow-pop">
                <div v-if="showArrowFly" class="pointer-events-none absolute inset-x-0 -top-1 flex justify-center z-10">
                  <span class="arrow-fly text-2xl">🎯</span>
                </div>
              </transition>
              <button @click="handleCheckout" :disabled="!canCheckout" class="btn-primary w-full py-3.5 text-sm cursor-pointer shadow-lg shadow-[#FFD700]/15">
                <span v-if="isSubmitting">กำลังบันทึก...</span>
                <span v-else-if="selectedPackage && !selectedRound">กรุณาเลือกรอบเวลา</span>
                <span v-else-if="netTotal === 0 && !selectedPackage">กรุณาเลือกบริการหรือสินค้า</span>
                <span v-else-if="!selectedPackage && netTotal > 0">บันทึกเฉพาะค่าบริการเสริม (ไม่เพิ่มแต้ม)</span>
                <span v-else>บันทึกและชำระเงิน</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <!-- Modal: คิวจองวันนี้ -->
      <transition name="fade-slide">
        <div v-if="showBookingModal" class="fixed inset-0 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div class="panel panel-strong w-full max-w-lg p-5 space-y-4">
            <div class="flex justify-between items-center pb-2" style="border-bottom: 1px solid var(--border)">
              <h3 class="text-sm font-bold" style="color: var(--text)">คิวจองประจำวันนี้</h3>
              <button @click="showBookingModal = false" class="text-sm cursor-pointer p-1 font-bold" style="color: var(--text-muted)">✕</button>
            </div>
            <div class="max-h-72 overflow-y-auto space-y-2.5 pr-1">
              <div v-if="todayBookings.length === 0" class="text-center py-8 text-xs" style="color: var(--text-muted)">
                ยังไม่มีรายการจองที่รอเข้าใช้บริการ
              </div>
              <div v-for="b in todayBookings" :key="b.id" class="p-3.5 rounded-sm flex items-center justify-between inset-surface">
                <div>
                  <span class="text-sm font-bold block" style="color: var(--text)">{{ b.customer_name }} ({{ b.customer_phone }})</span>
                  <span class="text-xs mt-0.5 block font-mono" style="color: var(--gold-bright)">รอบ: {{ b.round_time }} {{ b.packages?.name || 'ไม่ระบุแพ็กเกจ' }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button type="button" @click="handleNoShow(b)" class="px-2.5 py-1.5 rounded-sm text-xs font-mono border border-rose-900/40 text-rose-400 hover:bg-rose-950/40 cursor-pointer font-bold">
                    สละสิทธิ์
                  </button>
                  <button @click="selectBookingItem(b)" class="btn-primary text-xs font-bold px-3 py-1.5">เช็คอิน</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Modal: ลงทะเบียนสมาชิก Walk-in -->
      <transition name="fade-slide">
        <div v-if="showRegisterModal" class="fixed inset-0 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div class="panel panel-strong w-full max-w-sm p-5 space-y-4">
            <div class="flex justify-between items-center pb-2" style="border-bottom: 1px solid var(--border)">
              <h3 class="text-sm font-bold" style="color: var(--text)">ลงทะเบียนสมาชิกใหม่</h3>
              <button @click="showRegisterModal = false" class="text-sm cursor-pointer p-1 font-bold" style="color: var(--text-muted)">✕</button>
            </div>
            <form @submit.prevent="handleRegisterWalkIn" class="space-y-3 text-xs">
              <div v-if="registerError" class="p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-medium">
                {{ registerError }}
              </div>
              <div>
                <label class="block mb-1 font-medium" style="color: var(--text-soft)">เบอร์โทรศัพท์ (10 หลัก)</label>
                <input v-model="newCustomerPhone" type="tel" maxlength="10" placeholder="08xxxxxxxx" required class="input-field w-full font-mono">
              </div>
              <div>
                <label class="block mb-1 font-medium" style="color: var(--text-soft)">ชื่อ-นามสกุล ลูกค้า</label>
                <input v-model="newCustomerName" type="text" placeholder="ระบุชื่อลูกค้า..." required class="input-field w-full">
              </div>
              <button type="submit" :disabled="registerLoading" class="btn-primary w-full py-2.5 mt-2 text-xs font-bold">
                {{ registerLoading ? 'กำลังตรวจสอบ...' : 'ยืนยันลงทะเบียน' }}
              </button>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Tactical High-Contrast Tokens */
.app-root {
  --bg: #121212;
  --panel-bg: rgba(26, 26, 26, 0.95);
  --panel-bg-strong: #1e1e1e;
  --inset-bg: #181818;
  --border: #383838;
  --text: #f5f5f0;
  --text-soft: #e2e2dc;
  --text-muted: #b5b5af;
  --text-faint: #787872;
  --gold: #FFD700;
  --gold-bright: #FFD700;
  --danger: #ff5252;
  --glow-color: 255, 215, 0;
  --glow-opacity: 0.08;
  background: var(--bg);
  min-height: 100vh;
  position: relative;
}

.app-root[data-theme="light"] {
  --bg: #f9f8f6;
  --panel-bg: rgba(255, 255, 255, 0.95);
  --panel-bg-strong: #ffffff;
  --inset-bg: #f2f0ec;
  --border: #dedad4;
  --text: #1c1b1a;
  --text-soft: #2e2b26;
  --text-muted: #5e5a52;
  --text-faint: #8f8a80;
  --gold: #d4a000;
  --gold-bright: #b8860b;
  --danger: #c62828;
  --glow-color: 212, 160, 0;
  --glow-opacity: 0.05;
}

.glow-layer { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.glow {
  position: absolute; border-radius: 9999px; filter: blur(90px);
  background: radial-gradient(circle, rgba(var(--glow-color), var(--glow-opacity)) 0%, rgba(var(--glow-color), 0) 70%);
  animation: drift 22s ease-in-out infinite;
}
.glow-a { width: 480px; height: 480px; top: -100px; left: -60px; }
.glow-b { width: 420px; height: 420px; bottom: -120px; right: -50px; animation-delay: -11s; }
@keyframes drift { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, 15px) scale(1.06); } }

.grain-layer {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.03; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.panel {
  position: relative; z-index: 2; background: var(--panel-bg);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border); border-radius: 12px;
}
.panel-strong { background: var(--panel-bg-strong); }
.inset-surface { background: var(--inset-bg); border: 1px solid var(--border); }
.header-surface { background: var(--panel-bg-strong); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); position: relative; z-index: 20; }
.strip-surface { background: var(--inset-bg); border-bottom: 1px solid var(--border); position: relative; z-index: 15; }
.modal-backdrop { background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); }
.label-eyebrow { font-size: 11px; font-family: ui-monospace, monospace; color: var(--gold); letter-spacing: 0.1em; font-weight: 800; }

.btn-ghost {
  border-radius: 8px; border: 1px solid var(--border); color: var(--text-soft);
  background: var(--inset-bg); transition: all .2s; cursor: pointer;
}
.btn-ghost:hover { border-color: var(--gold); color: var(--gold-bright); }

.btn-primary {
  background: var(--gold-bright); color: #121212; font-weight: 800; border-radius: 8px;
  transition: transform .15s, filter .2s; cursor: pointer; border: none;
}
.btn-primary:hover:not(:disabled) { filter: brightness(1.08); }
.btn-primary:active:not(:disabled) { transform: scale(0.98); }
.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }

.theme-toggle {
  width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--border); color: var(--text-muted); background: var(--inset-bg);
  transition: all .2s; cursor: pointer;
}
.theme-toggle:hover { border-color: var(--gold); color: var(--gold-bright); }

.badge-count { background: var(--gold-bright); color: #121212; font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 9999px; }

.input-field {
  background: var(--inset-bg); border: 1px solid var(--border); border-radius: 8px;
  padding: 10px 14px; font-size: 14px; color: var(--text); outline: none; transition: border-color .2s;
}
.input-field:focus { border-color: var(--gold); }
.input-field::placeholder { color: var(--text-muted); opacity: 0.8; }

/* 02: ตัวเลือกเวลา - ชัดเจน เด่น คม */
.round-chip {
  padding: 9px 6px; border-radius: 8px; border: 1px solid var(--border); background: var(--inset-bg);
  color: #f5f5f0; display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 2px; cursor: pointer; transition: all .2s; position: relative;
}
.round-chip span:first-child {
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
}
.round-chip span:last-child {
  font-weight: 600;
  color: #a8a8a2;
}
.round-chip:hover { border-color: var(--gold); background: #222222; }
.round-chip-active {
  border-color: var(--gold-bright) !important;
  background: var(--gold-bright) !important;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.25);
}
.round-chip-active span:first-child,
.round-chip-active span:last-child {
  color: #121212 !important;
  font-weight: 900 !important;
}

.pkg-card {
  padding: 14px; border-radius: 10px; border: 1px solid var(--border);
  background: var(--inset-bg); cursor: pointer; transition: all .2s; display: flex;
  flex-direction: column; justify-content: space-between;
}
.pkg-card:hover { border-color: var(--text-muted); background: #222222; }
.pkg-card-active { 
  border-color: var(--gold-bright) !important; 
  background: rgba(255, 215, 0, 0.08) !important; 
}
.pkg-card-active h4,
.pkg-card-active p,
.pkg-card-active span {
  color: #f5f5f0 !important; /* บังคับให้ตัวหนังสือในการ์ดที่เลือกสว่างชัดเสมอ */
}

.pkg-check { width: 16px; height: 16px; border-radius: 9999px; background: var(--gold-bright); color: #121212; font-size: 10px; font-weight: 900; display: flex; align-items: center; justify-content: center; }

.stepper-btn {
  width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); color: var(--text);
  display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px;
  background: transparent; cursor: pointer; transition: border-color .2s;
}
.stepper-btn:hover { border-color: var(--gold); }

.stepper-input {
  width: 44px; text-align: center; background: transparent; font-family: ui-monospace, monospace;
  font-size: 14px; font-weight: 800; color: var(--text); outline: none; border: none;
}
.stepper-input::-webkit-outer-spin-button, .stepper-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

/* ช่องทางชำระเงิน - ชัด ไม่จม */
.pay-btn {
  padding: 11px; border-radius: 8px; font-size: 12px; font-weight: 700; border: 1px solid var(--border);
  color: #e2e2dc; background: var(--inset-bg); cursor: pointer; transition: all .2s;
}
.pay-btn:hover { border-color: var(--text-soft); }
.pay-btn-active {
  border-color: var(--gold-bright) !important;
  color: #121212 !important;
  font-weight: 900 !important;
  background: var(--gold-bright) !important;
}

.progress-track { width: 100%; background: var(--border); height: 5px; border-radius: 9999px; overflow: hidden; }
.progress-fill { background: var(--gold); height: 100%; border-radius: 9999px; transition: width .5s; }

.corner { position: absolute; width: 10px; height: 10px; border-color: var(--gold); opacity: 0.6; }
.corner-tl { top: 10px; left: 10px; border-top: 1px solid; border-left: 1px solid; }
.corner-tr { top: 10px; right: 10px; border-top: 1px solid; border-right: 1px solid; }
.corner-bl { bottom: 10px; left: 10px; border-bottom: 1px solid; border-left: 1px solid; }
.corner-br { bottom: 10px; right: 10px; border-bottom: 1px solid; border-right: 1px solid; }

.arrow-fly { display: inline-block; animation: arrow-arc 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes arrow-arc {
  0% { transform: translateY(0) rotate(-50deg); opacity: 0; }
  15% { opacity: 1; }
  50% { transform: translateY(-42px) rotate(0deg); }
  100% { transform: translateY(6px) rotate(35deg); opacity: 0; }
}

.fade-slide-enter-active, .fade-slide-leave-active { transition: opacity .2s ease, transform .2s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-4px); }
.arrow-pop-leave-active { transition: opacity .3s ease; }
.arrow-pop-leave-to { opacity: 0; }
</style>