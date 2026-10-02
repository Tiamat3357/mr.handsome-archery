<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()

// ---------- Theme ----------
const theme = ref('dark')
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('mha-theme', theme.value)
}

// ---------- Store Status (เปิด-ปิดสนาม) ----------
const isStoreOpen = ref(localStorage.getItem('mha-store-open') !== 'false')
const toggleStoreStatus = async () => {
  isStoreOpen.value = !isStoreOpen.value
  localStorage.setItem('mha-store-open', isStoreOpen.value ? 'true' : 'false')
}

// ✅ เปลี่ยนเป็นอันนี้ (ใส่ async แล้วสั่ง signOut จาก Supabase)
const handleLogout = async () => {
  if (confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
    await supabase.auth.signOut()
    router.push('/login')
  }
}

// ---------- Data States ----------
const packages = ref([])
const loading = ref(true)
const selectedPackage = ref(null) // เริ่มต้นเป็นค่าว่าง

const todayBookings = ref([])
const activeBooking = ref(null)
const showBookingModal = ref(false)
const selectedRound = ref(null) // เริ่มต้นเป็นค่าว่าง

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

// ลงทะเบียนสมาชิกใหม่ (ดัก 10 หลัก และเช็คเบอร์ซ้ำ)
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

// ตรวจสอบความพร้อมก่อนบันทึก
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

    // คำนวณแต้มสะสม: ให้แต้มเฉพาะเมื่อซื้อแพ็กเกจยิงธนูเท่านั้น
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

    // ล้างค่าเมื่อบันทึกสำเร็จ
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
      
<!-- Top Header -->
      <header class="h-16 px-6 flex items-center justify-between sticky top-0 z-30 header-surface">
        <!-- ฝั่งซ้าย: โลโก้และชื่อสนาม -->
        <div class="flex items-center gap-3">
          <svg viewBox="0 0 40 40" class="w-8 h-8 shrink-0">
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
            <circle cx="20" cy="20" r="11" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
            <circle cx="20" cy="20" r="3" fill="var(--gold-bright)"/>
          </svg>
          <div>
            <h1 class="text-sm font-bold tracking-[0.08em]" style="color: var(--text)">MR. HANDSOME ARCHERY</h1>
            <p class="text-[11px] font-mono" style="color: var(--text-muted)">จุดบริการเคาน์เตอร์แคชเชียร์</p>
          </div>
        </div>

        <!-- ฝั่งขวา: รวมปุ่มควบคุมทั้งหมดไว้ในกลุ่มเดียวกัน -->
        <div class="flex items-center gap-3">
          <!-- สวิตช์สถานะสนาม -->
          <button
            type="button"
            @click="toggleStoreStatus"
            class="flex items-center gap-2 px-3 py-1.5 rounded-sm text-[11px] font-mono cursor-pointer border transition-colors"
            :class="isStoreOpen ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'border-rose-500/40 bg-rose-500/10 text-rose-400'"
          >
            <span class="w-2 h-2 rounded-full" :class="isStoreOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'"></span>
            <span>{{ isStoreOpen ? 'สนามเปิดบริการ' : 'ปิดรับจอง' }}</span>
          </button>

          <!-- สลับธีม -->
          <button @click="toggleTheme" class="theme-toggle" :aria-label="theme === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'">
            <svg v-if="theme === 'dark'" viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>
            </svg>
          </button>

          <!-- ไป Dashboard -->
          <button @click="router.push('/dashboard')" class="btn-ghost flex items-center gap-2 px-3 py-1.5 text-xs font-medium">
            <span>📊 แดชบอร์ดสรุปยอด</span>
          </button>

          <!-- คิวจอง -->
          <button @click="showBookingModal = true" class="btn-ghost flex items-center gap-2 px-3 py-1.5 text-xs font-medium">
            <span>คิวจองวันนี้</span>
            <span v-if="todayBookings.length > 0" class="badge-count">{{ todayBookings.length }}</span>
          </button>

          <!-- ปุ่มออกจากระบบ (ย้ายเข้ามาอยู่ในกลุ่มนี้แล้ว) -->
          <button 
            type="button" 
            @click="handleLogout" 
            class="btn-ghost px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:border-rose-500/50 cursor-pointer"
            title="ออกจากระบบ"
          >
             ออกจากระบบ
          </button>
        </div>
      </header>

      <transition name="fade-slide">
        <div v-if="activeBooking" class="px-6 py-2.5 flex items-center justify-between text-xs font-mono strip-surface" style="color: var(--gold-bright)">
          <span>CHECK-IN: <strong>{{ activeBooking.customer_name }}</strong> · {{ activeBooking.round_time }}</span>
          <button @click="clearCustomer" class="underline cursor-pointer" style="color: var(--gold-bright)">ยกเลิก</button>
        </div>
      </transition>

      <main class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        <div class="lg:col-span-7 space-y-5">

          <!-- 01 / ข้อมูลสมาชิก -->
          <section class="panel p-5">
            <div class="flex items-center justify-between mb-3">
              <span class="label-eyebrow">01 / ข้อมูลสมาชิก</span>
              <button v-if="currentCustomer" @click="clearCustomer" class="text-xs underline cursor-pointer" style="color: var(--text-muted)">เปลี่ยนลูกค้า</button>
            </div>

            <div v-if="!currentCustomer" class="space-y-3">
              <div class="flex gap-2">
                <input v-model="searchPhone" @keyup.enter="searchCustomer" type="text" placeholder="กรอกเบอร์โทรศัพท์ลูกค้า 10 หลัก..." class="input-field flex-1 font-mono">
                <button @click="searchCustomer" class="btn-ghost px-4 text-xs font-medium">ค้นหา</button>
              </div>
              <transition name="fade-slide">
                <div v-if="searchError" class="p-3 rounded-sm flex items-center justify-between inset-surface">
                  <span class="text-xs" style="color: var(--text-muted)">{{ searchError }}</span>
                  <button @click="newCustomerPhone = searchPhone; showRegisterModal = true" class="text-xs font-semibold cursor-pointer" style="color: var(--gold-bright)">+ สมัครสมาชิกใหม่</button>
                </div>
              </transition>
            </div>

            <div v-else class="p-4 rounded-sm space-y-3 inset-surface" style="border-left: 2px solid var(--gold)">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-base font-semibold" style="color: var(--text)">{{ currentCustomer.name }}</h3>
                  <p class="text-xs mt-0.5 font-mono" style="color: var(--text-muted)">{{ currentCustomer.phone }}</p>
                </div>
                <div class="text-right">
                  <span class="text-xs" style="color: var(--text-muted)">แต้มสะสม</span>
                  <div class="text-lg font-bold font-mono" style="color: var(--gold-bright)">{{ currentCustomer.points || 0 }} <span class="text-xs font-normal" style="color: var(--text-muted)">/ 10</span></div>
                </div>
              </div>
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: `${Math.min(100, ((currentCustomer.points || 0) / 10) * 100)}%` }"></div>
              </div>
              <div v-if="availableReward && selectedPackage" class="pt-2 flex items-center justify-between" style="border-top: 1px solid var(--border)">
                <span class="text-xs font-medium" style="color: var(--gold-bright)">{{ availableReward.label }}</span>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" v-model="applyReward" class="w-4 h-4 cursor-pointer" style="accent-color: var(--gold)">
                  <span class="text-xs font-semibold" style="color: var(--text)">ใช้สิทธิ์ในบิลนี้</span>
                </label>
              </div>
            </div>
          </section>

          <!-- 02 / รอบเวลา -->
          <section class="panel p-5">
            <div class="flex justify-between items-center mb-3">
              <span class="label-eyebrow">02 / รอบเวลาเข้าใช้บริการ (กดซ้ำเพื่อยกเลิก)</span>
              <span v-if="selectedRound" @click="selectedRound = null" class="text-[11px] underline cursor-pointer" style="color: var(--text-muted)">ปลดการเลือก</span>
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
                <span class="text-[10px] opacity-70">{{ slot.label }}</span>
              </button>
            </div>
          </section>

          <!-- 03 / แพ็กเกจ -->
          <section class="panel p-5">
            <div class="flex justify-between items-center mb-3">
              <span class="label-eyebrow">03 / แพ็กเกจหลัก (กดซ้ำเพื่อยกเลิก)</span>
              <span v-if="selectedPackage" @click="selectedPackage = null" class="text-[11px] underline cursor-pointer" style="color: var(--text-muted)">ปลดการเลือก</span>
            </div>
            <div v-if="loading" class="text-xs py-4 text-center" style="color: var(--text-muted)">กำลังโหลด...</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                v-for="pkg in packages"
                :key="pkg.id"
                @click="togglePackage(pkg)"
                :class="['pkg-card', selectedPackage?.id === pkg.id ? 'pkg-card-active' : '']"
              >
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <h4 class="text-sm font-semibold" style="color: var(--text)">{{ pkg.name }}</h4>
                    <span v-if="selectedPackage?.id === pkg.id" class="pkg-check">✓</span>
                  </div>
                  <p class="text-xs leading-relaxed" style="color: var(--text-muted)">{{ pkg.description }}</p>
                </div>
                <div class="mt-4 pt-2.5 flex items-baseline justify-between" style="border-top: 1px solid var(--border)">
                  <span class="text-[11px]" style="color: var(--text-faint)">อัตราค่าบริการ</span>
                  <span class="text-base font-bold font-mono" style="color: var(--text)">฿{{ pkg.price }}</span>
                </div>
              </div>
            </div>
          </section>

          <!-- 04 / อุปกรณ์เสริม & ค่าปรับ -->
          <section class="panel p-5">
            <span class="label-eyebrow block mb-3">04 / เป้ากระดาษเสริม / ค่าชดเชยอุปกรณ์</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-3 rounded-sm flex items-center justify-between inset-surface">
                <div>
                  <span class="text-xs font-medium block" style="color: var(--text)">เป้ากระดาษเพิ่ม</span>
                  <span class="text-[11px]" style="color: var(--text-muted)">+20฿ / แผ่น</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <button @click="additionalTargets = Math.max(0, additionalTargets - 1)" class="stepper-btn">-</button>
                  <input type="number" v-model.number="additionalTargets" @focus="$event.target.select()" @blur="clampCount('targets')" min="0" class="stepper-input">
                  <button @click="additionalTargets++" class="stepper-btn">+</button>
                </div>
              </div>

              <div class="p-3 rounded-sm flex items-center justify-between inset-surface">
                <div>
                  <span class="text-xs font-medium block" style="color: var(--text)">ลูกธนูชำรุด / สูญหาย</span>
                  <span class="text-[11px]" style="color: var(--text-muted)">+150฿ / ลูก</span>
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
          <div class="panel panel-strong p-6 lg:sticky lg:top-24 space-y-5 relative">
            <span class="corner corner-tl"></span>
            <span class="corner corner-tr"></span>
            <span class="corner corner-bl"></span>
            <span class="corner corner-br"></span>

            <div class="flex items-center justify-between pb-3" style="border-bottom: 1px solid var(--border)">
              <h3 class="text-sm font-semibold" style="color: var(--text)">สรุปรายการบริการ</h3>
              <span class="text-xs font-mono" style="color: var(--text-muted)">{{ selectedRound || 'ไม่ระบุรอบ' }}</span>
            </div>

            <!-- รายการคำนวณ -->
            <div class="space-y-3 text-xs">
              <div class="flex justify-between items-center" style="color: var(--text-soft)">
                <span>{{ selectedPackage?.name || 'ไม่มีแพ็กเกจ (บริการเสริม)' }}</span>
                <span class="font-mono font-medium" style="color: var(--text)">฿{{ packagePrice }}</span>
              </div>
              <div v-if="discountAmount > 0" class="flex justify-between items-center" style="color: var(--gold-bright)">
                <span>ส่วนลดสิทธิ์สมาชิก (-{{ availableReward?.cost }} แต้ม)</span>
                <span class="font-mono font-medium">-฿{{ discountAmount }}</span>
              </div>
              <div v-if="additionalTargets > 0" class="flex justify-between items-center" style="color: var(--text-muted)">
                <span>เป้ากระดาษเสริม ({{ additionalTargets }} แผ่น)</span>
                <span class="font-mono" style="color: var(--text-soft)">+฿{{ targetsPrice }}</span>
              </div>
              <div v-if="lostArrows > 0" class="flex justify-between items-center" style="color: var(--danger)">
                <span>ค่าชดเชยลูกธนู ({{ lostArrows }} ลูก)</span>
                <span class="font-mono font-medium">+฿{{ arrowsPrice }}</span>
              </div>
            </div>

            <!-- ช่องทางการชำระเงิน (เรียบง่าย ไม่มีเงินทอน) -->
            <div class="pt-3" style="border-top: 1px solid var(--border)">
              <span class="text-[11px] block mb-2 font-medium" style="color: var(--text-muted)">ช่องทางการชำระเงิน</span>
              <div class="grid grid-cols-2 gap-2">
                <button type="button" @click="paymentMethod = 'PromptPay'" :class="['pay-btn', paymentMethod === 'PromptPay' ? 'pay-btn-active' : '']">สแกน QR (PromptPay)</button>
                <button type="button" @click="paymentMethod = 'Cash'" :class="['pay-btn', paymentMethod === 'Cash' ? 'pay-btn-active' : '']">เงินสด (Cash)</button>
              </div>
            </div>

            <!-- ยอดสุทธิ -->
            <div class="pt-4 flex items-baseline justify-between" style="border-top: 1px solid var(--border)">
              <span class="text-xs font-medium" style="color: var(--text-muted)">ยอดชำระสุทธิ</span>
              <span class="text-3xl font-black font-mono tracking-tight" style="color: var(--gold-bright)">฿{{ netTotal }}</span>
            </div>

            <!-- ปุ่มบันทึก -->
            <div class="relative">
              <transition name="arrow-pop">
                <div v-if="showArrowFly" class="pointer-events-none absolute inset-x-0 -top-1 flex justify-center z-10">
                  <span class="arrow-fly text-2xl">🎯</span>
                </div>
              </transition>
              <button @click="handleCheckout" :disabled="!canCheckout" class="btn-primary w-full py-3.5 text-sm">
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
              <h3 class="text-sm font-semibold" style="color: var(--text)">คิวจองประจำวันนี้</h3>
              <button @click="showBookingModal = false" class="text-sm cursor-pointer" style="color: var(--text-muted)">✕</button>
            </div>
            <div class="max-h-72 overflow-y-auto space-y-2.5 pr-1">
              <div v-if="todayBookings.length === 0" class="text-center py-8 text-xs" style="color: var(--text-faint)">
                ยังไม่มีรายการจองที่รอเข้าใช้บริการ
              </div>
              <div v-for="b in todayBookings" :key="b.id" class="p-3.5 rounded-sm flex items-center justify-between inset-surface">
                <div>
                  <span class="text-sm font-medium block" style="color: var(--text)">{{ b.customer_name }} ({{ b.customer_phone }})</span>
                  <span class="text-xs mt-0.5 block" style="color: var(--text-muted)">รอบ: {{ b.round_time }} • {{ b.packages?.name || 'ไม่ระบุแพ็กเกจ' }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button type="button" @click="handleNoShow(b)" class="px-2.5 py-1.5 rounded-sm text-xs font-mono border border-rose-900/40 text-rose-400 hover:bg-rose-950/40 cursor-pointer">
                    สละสิทธิ์ / ไม่มา
                  </button>
                  <button @click="selectBookingItem(b)" class="btn-primary text-xs font-semibold px-3 py-1.5">เช็คอิน</button>
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
              <h3 class="text-sm font-semibold" style="color: var(--text)">ลงทะเบียนสมาชิกใหม่</h3>
              <button @click="showRegisterModal = false" class="text-sm cursor-pointer" style="color: var(--text-muted)">✕</button>
            </div>
            
            <form @submit.prevent="handleRegisterWalkIn" class="space-y-3 text-xs">
              <div v-if="registerError" class="p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400">
                {{ registerError }}
              </div>
              <div>
                <label class="block mb-1" style="color: var(--text-muted)">เบอร์โทรศัพท์ (10 หลัก)</label>
                <input v-model="newCustomerPhone" type="tel" maxlength="10" placeholder="08xxxxxxxx" required class="input-field w-full font-mono">
              </div>
              <div>
                <label class="block mb-1" style="color: var(--text-muted)">ชื่อ-นามสกุล ลูกค้า</label>
                <input v-model="newCustomerName" type="text" placeholder="ระบุชื่อลูกค้า..." required class="input-field w-full">
              </div>
              <button type="submit" :disabled="registerLoading" class="btn-primary w-full py-2.5 mt-2 text-xs">
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
/* Theme tokens */
.app-root {
  --bg: #0a0a0a;
  --panel-bg: rgba(24, 24, 24, 0.55);
  --panel-bg-strong: rgba(20, 20, 20, 0.7);
  --inset-bg: rgba(255, 255, 255, 0.03);
  --border: rgba(255, 255, 255, 0.09);
  --text: #ececec;
  --text-soft: #cfcfcf;
  --text-muted: #9a9a9a;
  --text-faint: #6a6a6a;
  --gold: #c9962b;
  --gold-bright: #ffc93c;
  --danger: #d98a6b;
  --glow-color: 255, 201, 60;
  --glow-opacity: 0.14;
  background: var(--bg);
  min-height: 100vh;
  position: relative;
}
.app-root[data-theme="light"] {
  --bg: #faf8f4;
  --panel-bg: rgba(255, 255, 255, 0.55);
  --panel-bg-strong: rgba(255, 255, 255, 0.75);
  --inset-bg: rgba(0, 0, 0, 0.025);
  --border: rgba(0, 0, 0, 0.08);
  --text: #1c1a16;
  --text-soft: #3a362e;
  --text-muted: #7a7466;
  --text-faint: #a39c8a;
  --gold: #b8860b;
  --gold-bright: #a5700a;
  --danger: #b5533a;
  --glow-color: 184, 134, 11;
  --glow-opacity: 0.08;
}

.glow-layer { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.glow {
  position: absolute; border-radius: 9999px; filter: blur(90px);
  background: radial-gradient(circle, rgba(var(--glow-color), var(--glow-opacity)) 0%, rgba(var(--glow-color), 0) 70%);
  animation: drift 22s ease-in-out infinite;
}
.glow-a { width: 520px; height: 520px; top: -120px; left: -80px; }
.glow-b { width: 460px; height: 460px; bottom: -140px; right: -60px; animation-delay: -11s; }
@keyframes drift { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, 15px) scale(1.06); } }

.grain-layer {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.035; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.panel {
  position: relative; z-index: 2; background: var(--panel-bg);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border); border-radius: 10px;
}
.panel-strong { background: var(--panel-bg-strong); }
.inset-surface { background: var(--inset-bg); border: 1px solid var(--border); }
.header-surface { background: var(--panel-bg-strong); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); position: relative; z-index: 20; }
.strip-surface { background: var(--inset-bg); border-bottom: 1px solid var(--border); position: relative; z-index: 15; }
.modal-backdrop { background: rgba(0,0,0,0.55); backdrop-filter: blur(4px); }

.label-eyebrow { font-size: 11px; font-family: ui-monospace, monospace; color: var(--gold); letter-spacing: 0.12em; }

.btn-ghost {
  border-radius: 6px; border: 1px solid var(--border); color: var(--text-soft);
  background: var(--inset-bg); transition: border-color .2s, color .2s; cursor: pointer;
}
.btn-ghost:hover { border-color: var(--gold); color: var(--gold-bright); }
.btn-primary {
  background: var(--gold-bright); color: var(--bg); font-weight: 700; border-radius: 6px;
  transition: transform .15s, filter .2s; cursor: pointer; border: none;
}
.btn-primary:hover:not(:disabled) { filter: brightness(1.08); }
.btn-primary:active:not(:disabled) { transform: scale(0.98); }
.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }

.theme-toggle {
  width: 32px; height: 32px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--border); color: var(--text-muted); background: var(--inset-bg);
  transition: border-color .2s, color .2s; cursor: pointer;
}
.theme-toggle:hover { border-color: var(--gold); color: var(--gold-bright); }
.badge-count { background: var(--gold-bright); color: var(--bg); font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 9999px; }

.input-field {
  background: var(--inset-bg); border: 1px solid var(--border); border-radius: 6px;
  padding: 10px 14px; font-size: 14px; color: var(--text); outline: none; transition: border-color .2s;
}
.input-field:focus { border-color: var(--gold); }

.round-chip {
  padding: 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--inset-bg);
  color: var(--text-muted); display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; cursor: pointer; transition: all .2s; position: relative;
}
.round-chip:hover { border-color: var(--text-faint); }
.round-chip-active { border-color: var(--gold-bright); color: var(--gold-bright); background: rgba(var(--glow-color), 0.08); }
.round-chip-active::after { content: ''; position: absolute; left: 8px; right: 8px; bottom: -1px; height: 2px; background: var(--gold-bright); }

.pkg-card {
  padding: 16px; border-radius: 0 8px 8px 0; border: 1px solid var(--border); border-left: 3px solid transparent;
  background: var(--inset-bg); cursor: pointer; transition: all .2s; display: flex; flex-direction: column; justify-content: space-between;
}
.pkg-card:hover { background: var(--panel-bg); }
.pkg-card-active { border-left-color: var(--gold-bright); background: var(--panel-bg); }
.pkg-check { width: 16px; height: 16px; border-radius: 9999px; background: var(--gold-bright); color: var(--bg); font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; }

.stepper-btn {
  width: 32px; height: 32px; border-radius: 6px; border: 1px solid var(--border); color: var(--text);
  display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;
  background: transparent; cursor: pointer; transition: border-color .2s;
}
.stepper-btn:hover { border-color: var(--gold); }
.stepper-input {
  width: 48px; text-align: center; background: transparent; font-family: ui-monospace, monospace;
  font-size: 14px; font-weight: 700; color: var(--text); outline: none; border: none;
}
.stepper-input::-webkit-outer-spin-button, .stepper-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }

.pay-btn { padding: 10px; border-radius: 6px; font-size: 12px; border: 1px solid var(--border); color: var(--text-muted); background: transparent; cursor: pointer; transition: all .2s; }
.pay-btn-active { border-color: var(--gold-bright); color: var(--gold-bright); background: rgba(var(--glow-color), 0.08); }

.progress-track { width: 100%; background: var(--inset-bg); height: 4px; border-radius: 9999px; overflow: hidden; }
.progress-fill { background: var(--gold); height: 100%; border-radius: 9999px; transition: width .5s; }

.corner { position: absolute; width: 12px; height: 12px; border-color: rgba(var(--glow-color), 0.5); }
.corner-tl { top: 12px; left: 12px; border-top: 1px solid; border-left: 1px solid; }
.corner-tr { top: 12px; right: 12px; border-top: 1px solid; border-right: 1px solid; }
.corner-bl { bottom: 12px; left: 12px; border-bottom: 1px solid; border-left: 1px solid; }
.corner-br { bottom: 12px; right: 12px; border-bottom: 1px solid; border-right: 1px solid; }

.arrow-fly { display: inline-block; animation: arrow-arc 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
@keyframes arrow-arc { 0% { transform: translateY(0) rotate(-50deg); opacity: 0; } 15% { opacity: 1; } 50% { transform: translateY(-42px) rotate(0deg); } 100% { transform: translateY(6px) rotate(35deg); opacity: 0; } }
.fade-slide-enter-active, .fade-slide-leave-active { transition: opacity .2s ease, transform .2s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-4px); }
.arrow-pop-leave-active { transition: opacity .3s ease; }
.arrow-pop-leave-to { opacity: 0; }
</style>