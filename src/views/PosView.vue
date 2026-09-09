<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { supabase } from '../lib/supabase'

const packages = ref([])
const loading = ref(true)
const selectedPackage = ref(null)

const todayBookings = ref([])
const activeBooking = ref(null)
const showBookingModal = ref(false)
const selectedRound = ref('13:00 - 14:00')
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
const registerLoading = ref(false)
const applyReward = ref(false)

const additionalTargets = ref(0)
const lostArrows = ref(0)
const paymentMethod = ref('PromptPay')
const isSubmitting = ref(false)
const showArrowFly = ref(false) // trigger animation ตอนบันทึกสำเร็จ

const availableReward = computed(() => {
  if (!currentCustomer.value) return null
  const pts = currentCustomer.value.points || 0
  if (pts >= 10) return { type: 'FREE', label: 'ยิงฟรี 1 รอบ (ครบ 10 แต้ม)', rate: 1.0 }
  if (pts >= 7) return { type: 'DISCOUNT_50', label: 'ลด 50% (ครบ 7 แต้ม)', rate: 0.5 }
  return null
})

watch(currentCustomer, () => { applyReward.value = false })

const fetchPackages = async () => {
  try {
    const { data, error } = await supabase.from('packages').select('*').order('id')
    if (error) throw error
    packages.value = data || []
    if (packages.value.length > 0) selectedPackage.value = packages.value[0]
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
  if (!searchPhone.value.trim()) return
  searchError.value = ''
  currentCustomer.value = null
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', searchPhone.value.trim())
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

const handleRegisterWalkIn = async () => {
  if (!newCustomerName.value.trim() || !newCustomerPhone.value.trim()) return
  registerLoading.value = true
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert([{ name: newCustomerName.value.trim(), phone: newCustomerPhone.value.trim(), points: 0 }])
      .select()
      .single()
    if (error) throw error
    currentCustomer.value = data
    searchPhone.value = data.phone
    searchError.value = ''
    showRegisterModal.value = false
  } catch (err) {
    alert('ลงทะเบียนไม่สำเร็จ: ' + err.message)
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

// clamp ค่าที่พิมพ์เอง ไม่ให้ติดลบ/NaN
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
  if (!applyReward.value || !availableReward.value) return 0
  return packagePrice.value * availableReward.value.rate
})
const targetsPrice = computed(() => additionalTargets.value * 20)
const arrowsPrice = computed(() => lostArrows.value * 150)
const netTotal = computed(() => Math.max(0, packagePrice.value - discountAmount.value) + targetsPrice.value + arrowsPrice.value)

const handleCheckout = async () => {
  if (!selectedPackage.value || isSubmitting.value) return
  isSubmitting.value = true

  try {
    const { error: logErr } = await supabase.from('service_logs').insert([{
      customer_id: currentCustomer.value ? currentCustomer.value.id : null,
      package_id: selectedPackage.value.id,
      round_time: selectedRound.value,
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

    if (currentCustomer.value) {
      let nextPts = (currentCustomer.value.points || 0) + 1
      if (applyReward.value && availableReward.value?.type === 'FREE') nextPts = 0
      await supabase.from('customers').update({ points: nextPts }).eq('id', currentCustomer.value.id)
    }

    // เล่นแอนิเมชันลูกธนูเด้ง
    showArrowFly.value = false
    requestAnimationFrame(() => { showArrowFly.value = true })
    setTimeout(() => { showArrowFly.value = false }, 900)

    additionalTargets.value = 0
    lostArrows.value = 0
    clearCustomer()
    fetchTodayBookings()
  } catch (err) {
    alert('เกิดข้อผิดพลาด: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchPackages()
  fetchTodayBookings()
})
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-[#ececec] font-sans selection:bg-[#ffc93c] selection:text-black">
    <header class="h-16 border-b border-[#262626] px-6 flex items-center justify-between bg-[#0a0a0a] sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <svg viewBox="0 0 40 40" class="w-8 h-8 shrink-0">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#c9962b" stroke-width="1.5"/>
          <circle cx="20" cy="20" r="11" fill="none" stroke="#c9962b" stroke-width="1.5"/>
          <circle cx="20" cy="20" r="3" fill="#ffc93c"/>
        </svg>
        <div>
          <h1 class="text-sm font-bold text-[#ececec] tracking-[0.08em]">MR. HANDSOME ARCHERY</h1>
          <p class="text-[11px] text-[#767676] font-mono">จุดบริการเคาน์เตอร์แคชเชียร์</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="showBookingModal = true"
          class="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-medium border border-[#2e2e2e] text-[#c9c9c9] hover:border-[#c9962b] hover:text-[#ffc93c] transition-colors duration-200 cursor-pointer"
        >
          <span>คิวจองวันนี้</span>
          <span v-if="todayBookings.length > 0" class="bg-[#ffc93c] text-[#0a0a0a] text-[10px] font-bold px-1.5 rounded-full">
            {{ todayBookings.length }}
          </span>
        </button>
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#2e2e2e] text-[11px] text-[#767676] font-mono">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>ONLINE</span>
        </div>
      </div>
    </header>

    <transition name="fade-slide">
      <div v-if="activeBooking" class="border-b border-[#262626] px-6 py-2.5 flex items-center justify-between text-xs text-[#ffc93c] font-mono">
        <span>CHECK-IN: <strong>{{ activeBooking.customer_name }}</strong> · {{ activeBooking.round_time }}</span>
        <button @click="clearCustomer" class="underline hover:text-white cursor-pointer">ยกเลิก</button>
      </div>
    </transition>

    <main class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

      <div class="lg:col-span-7 space-y-0">

        <!-- STEP 1 -->
        <section class="border-t-2 border-[#c9962b] px-5 py-5">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-mono text-[#c9962b] tracking-widest">01 / ข้อมูลสมาชิก</span>
            <button v-if="currentCustomer" @click="clearCustomer" class="text-xs text-[#767676] hover:text-white underline cursor-pointer">เปลี่ยนลูกค้า</button>
          </div>

          <div v-if="!currentCustomer" class="space-y-3">
            <div class="flex gap-2">
              <input
                v-model="searchPhone"
                @keyup.enter="searchCustomer"
                type="text"
                placeholder="กรอกเบอร์โทรศัพท์ลูกค้า..."
                class="flex-1 bg-[#161616] border border-[#333333] focus:border-[#c9962b] focus:ring-2 focus:ring-[#c9962b]/20 rounded-sm px-3.5 py-2.5 text-sm text-white placeholder-[#5a5a5a] outline-none transition-all duration-200"
              >
              <button @click="searchCustomer" class="bg-[#1a1a1a] hover:bg-[#222] border border-[#333333] hover:border-[#4a4a4a] text-white font-medium text-xs px-4 rounded-sm transition-colors duration-200 cursor-pointer">ค้นหา</button>
            </div>
            <transition name="fade-slide">
              <div v-if="searchError" class="p-3 bg-[#161616] border border-[#333333] rounded-sm flex items-center justify-between">
                <span class="text-xs text-[#9a9a9a]">{{ searchError }}</span>
                <button @click="newCustomerPhone = searchPhone; showRegisterModal = true" class="text-xs font-semibold text-[#ffc93c] hover:text-white transition cursor-pointer">+ สมัครสมาชิกใหม่</button>
              </div>
            </transition>
          </div>

          <div v-else class="p-4 bg-[#161616] border border-[#333333] border-l-2 border-l-[#c9962b] rounded-sm space-y-3">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-base font-semibold text-white">{{ currentCustomer.name }}</h3>
                <p class="text-xs text-[#9a9a9a] mt-0.5 font-mono">{{ currentCustomer.phone }}</p>
              </div>
              <div class="text-right">
                <span class="text-xs text-[#9a9a9a]">แต้มสะสม</span>
                <div class="text-lg font-bold text-[#ffc93c] font-mono">{{ currentCustomer.points || 0 }} <span class="text-xs text-[#9a9a9a] font-normal">/ 10</span></div>
              </div>
            </div>
            <div class="w-full bg-[#2a2a2a] h-1 rounded-full overflow-hidden">
              <div class="bg-[#c9962b] h-full rounded-full transition-all duration-500" :style="{ width: `${Math.min(100, ((currentCustomer.points || 0) / 10) * 100)}%` }"></div>
            </div>
            <div v-if="availableReward" class="pt-2 border-t border-[#333333] flex items-center justify-between">
              <span class="text-xs text-[#ffc93c] font-medium">{{ availableReward.label }}</span>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" v-model="applyReward" class="accent-[#c9962b] w-4 h-4 cursor-pointer">
                <span class="text-xs font-semibold text-white">ใช้สิทธิ์ในบิลนี้</span>
              </label>
            </div>
          </div>
        </section>

        <!-- STEP 2 -->
        <section class="border-t border-[#1a1a1a] px-5 py-5">
          <span class="text-[11px] font-mono text-[#c9962b] tracking-widest block mb-3">02 / รอบเวลาเข้าใช้บริการ</span>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            <button v-for="slot in roundSlots" :key="slot.time" type="button" @click="selectedRound = slot.time"
              :class="selectedRound === slot.time
                ? 'border-[#ffc93c] text-[#ffc93c] bg-[#1a1509]'
                : 'border-[#333333] bg-[#141414] text-[#9a9a9a] hover:border-[#4a4a4a] hover:bg-[#181818]'"
              class="p-2.5 rounded-sm border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1 relative">
              <span v-if="selectedRound === slot.time" class="absolute -bottom-px left-2 right-2 h-[2px] bg-[#ffc93c]"></span>
              <span class="text-xs font-mono tracking-tight">{{ slot.time }}</span>
              <span class="text-[10px] opacity-70">{{ slot.label }}</span>
            </button>
          </div>
        </section>

        <!-- STEP 3 -->
        <section class="border-t border-[#1a1a1a] px-5 py-5">
          <span class="text-[11px] font-mono text-[#c9962b] tracking-widest block mb-3">03 / แพ็กเกจหลัก (เลือกได้ 1 แบบ)</span>
          <div v-if="loading" class="text-xs text-[#4a4a4a] py-4 text-center">กำลังโหลดรายการแพ็กเกจ...</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div v-for="pkg in packages" :key="pkg.id" @click="selectedPackage = pkg"
              :class="selectedPackage?.id === pkg.id ? 'border-l-[3px] border-[#ffc93c] bg-[#161616]' : 'border-l-[3px] border-transparent bg-[#0e0e0e] hover:bg-[#141414]'"
              class="p-4 border-t border-r border-b border-[#262626] rounded-r-sm cursor-pointer transition-all duration-200 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <h4 class="text-sm font-semibold text-white">{{ pkg.name }}</h4>
                  <span v-if="selectedPackage?.id === pkg.id" class="w-4 h-4 rounded-full bg-[#ffc93c] flex items-center justify-center text-[9px] text-black font-bold">✓</span>
                </div>
                <p class="text-xs text-[#9a9a9a] leading-relaxed">{{ pkg.description }}</p>
              </div>
              <div class="mt-4 pt-2.5 border-t border-[#262626] flex items-baseline justify-between">
                <span class="text-[11px] text-[#5a5a5a]">อัตราค่าบริการ</span>
                <span class="text-base font-bold text-white font-mono">฿{{ pkg.price }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- STEP 4: เพิ่มช่องพิมพ์ตัวเลขได้ -->
        <section class="border-t border-[#1a1a1a] px-5 py-5">
          <span class="text-[11px] font-mono text-[#c9962b] tracking-widest block mb-3">04 / เป้ากระดาษเสริม / ค่าอุปกรณ์</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="p-3 bg-[#161616] border border-[#333333] rounded-sm flex items-center justify-between">
              <div>
                <span class="text-xs font-medium text-white block">เป้ากระดาษเพิ่ม</span>
                <span class="text-[11px] text-[#9a9a9a]">+20฿ / แผ่น</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button @click="additionalTargets = Math.max(0, additionalTargets - 1)" class="w-8 h-8 rounded-sm border border-[#333333] hover:border-[#c9962b] text-white flex items-center justify-center font-bold text-sm transition-colors duration-200 cursor-pointer">-</button>
                <input
                  type="number"
                  v-model.number="additionalTargets"
                  @blur="clampCount('targets')"
                  min="0"
                  class="w-12 text-center bg-transparent font-mono text-sm font-bold text-white outline-none focus:text-[#ffc93c] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                >
                <button @click="additionalTargets++" class="w-8 h-8 rounded-sm border border-[#333333] hover:border-[#c9962b] text-white flex items-center justify-center font-bold text-sm transition-colors duration-200 cursor-pointer">+</button>
              </div>
            </div>

            <div class="p-3 bg-[#161616] border border-[#333333] rounded-sm flex items-center justify-between">
              <div>
                <span class="text-xs font-medium text-white block">ลูกธนูชำรุด / สูญหาย</span>
                <span class="text-[11px] text-[#9a9a9a]">+150฿ / ลูก</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button @click="lostArrows = Math.max(0, lostArrows - 1)" class="w-8 h-8 rounded-sm border border-[#333333] hover:border-[#c9962b] text-white flex items-center justify-center font-bold text-sm transition-colors duration-200 cursor-pointer">-</button>
                <input
                  type="number"
                  v-model.number="lostArrows"
                  @blur="clampCount('arrows')"
                  min="0"
                  class="w-12 text-center bg-transparent font-mono text-sm font-bold text-white outline-none focus:text-[#ffc93c] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                >
                <button @click="lostArrows++" class="w-8 h-8 rounded-sm border border-[#333333] hover:border-[#c9962b] text-white flex items-center justify-center font-bold text-sm transition-colors duration-200 cursor-pointer">+</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- สรุปบิล -->
      <div class="lg:col-span-5">
        <div class="bg-[#0e0e0e] border border-[#262626] rounded-sm p-6 lg:sticky lg:top-24 space-y-5 relative">
          <span class="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#c9962b]/50"></span>
          <span class="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#c9962b]/50"></span>
          <span class="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#c9962b]/50"></span>
          <span class="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#c9962b]/50"></span>

          <div class="flex items-center justify-between pb-3 border-b border-[#262626]">
            <h3 class="text-sm font-semibold text-white">สรุปรายการบริการ</h3>
            <span class="text-xs text-[#767676] font-mono">{{ selectedRound }}</span>
          </div>

          <div class="space-y-3 text-xs">
            <div class="flex justify-between items-center text-[#c9c9c9]">
              <span>{{ selectedPackage?.name || 'ยังไม่ได้เลือกแพ็กเกจ' }}</span>
              <span class="font-mono font-medium text-white">฿{{ packagePrice }}</span>
            </div>
            <div v-if="discountAmount > 0" class="flex justify-between items-center text-[#ffc93c]">
              <span>ส่วนลดสิทธิ์สมาชิก</span>
              <span class="font-mono font-medium">-฿{{ discountAmount }}</span>
            </div>
            <div v-if="additionalTargets > 0" class="flex justify-between items-center text-[#9a9a9a]">
              <span>เป้ากระดาษเสริม ({{ additionalTargets }} แผ่น)</span>
              <span class="font-mono text-[#c9c9c9]">+฿{{ targetsPrice }}</span>
            </div>
            <div v-if="lostArrows > 0" class="flex justify-between items-center text-[#c96a4a]">
              <span>ค่าชดเชยลูกธนู ({{ lostArrows }} ลูก)</span>
              <span class="font-mono font-medium">+฿{{ arrowsPrice }}</span>
            </div>
          </div>

          <div class="pt-3 border-t border-[#262626]">
            <span class="text-[11px] text-[#767676] block mb-2 font-medium">ช่องทางการชำระเงิน</span>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" @click="paymentMethod = 'PromptPay'"
                :class="paymentMethod === 'PromptPay' ? 'border-[#ffc93c] text-[#ffc93c] bg-[#1a1509]' : 'border-[#333333] text-[#9a9a9a] hover:border-[#4a4a4a]'"
                class="py-2.5 rounded-sm text-xs border transition-all duration-200 cursor-pointer">สแกน QR (PromptPay)</button>
              <button type="button" @click="paymentMethod = 'Cash'"
                :class="paymentMethod === 'Cash' ? 'border-[#ffc93c] text-[#ffc93c] bg-[#1a1509]' : 'border-[#333333] text-[#9a9a9a] hover:border-[#4a4a4a]'"
                class="py-2.5 rounded-sm text-xs border transition-all duration-200 cursor-pointer">เงินสด (Cash)</button>
            </div>
          </div>

          <div class="pt-4 border-t border-[#262626] flex items-baseline justify-between">
            <span class="text-xs text-[#767676] font-medium">ยอดชำระสุทธิ</span>
            <span class="text-3xl font-black text-[#ffc93c] font-mono tracking-tight">฿{{ netTotal }}</span>
          </div>

          <!-- ปุ่มชำระเงิน + จุดเกิดแอนิเมชันลูกธนู -->
          <div class="relative">
            <transition name="arrow-pop">
              <div v-if="showArrowFly" class="pointer-events-none absolute inset-x-0 -top-1 flex justify-center z-10">
                <span class="arrow-fly text-2xl">🏹</span>
              </div>
            </transition>
            <button
              @click="handleCheckout"
              :disabled="!selectedPackage || isSubmitting"
              class="w-full bg-[#ffc93c] hover:bg-[#ffd75e] text-[#0a0a0a] font-bold py-3.5 rounded-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm"
            >
              {{ isSubmitting ? 'กำลังบันทึก...' : 'บันทึกและชำระเงิน' }}
            </button>
          </div>
        </div>
      </div>

    </main>

    <!-- Modal: คิวจองวันนี้ -->
    <transition name="fade-slide">
      <div v-if="showBookingModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-[#0e0e0e] border border-[#262626] w-full max-w-lg rounded-sm p-5 space-y-4">
          <div class="flex justify-between items-center pb-2 border-b border-[#262626]">
            <h3 class="text-sm font-semibold text-white">คิวจองประจำวันนี้</h3>
            <button @click="showBookingModal = false" class="text-[#767676] hover:text-white text-sm cursor-pointer">✕</button>
          </div>
          <div class="max-h-72 overflow-y-auto space-y-2.5 pr-1">
            <div v-if="todayBookings.length === 0" class="text-center py-8 text-xs text-[#5a5a5a]">
              ยังไม่มีรายการจองที่รอเข้าใช้บริการ
            </div>
            <div v-for="b in todayBookings" :key="b.id"
              class="p-3.5 rounded-sm bg-[#161616] border border-[#333333] flex items-center justify-between hover:border-[#4a4a4a] transition-colors duration-200">
              <div>
                <span class="text-sm font-medium text-white block">{{ b.customer_name }} ({{ b.customer_phone }})</span>
                <span class="text-xs text-[#9a9a9a] mt-0.5 block">รอบ: {{ b.round_time }} • {{ b.packages?.name || 'ไม่ระบุแพ็กเกจ' }}</span>
              </div>
              <button @click="selectBookingItem(b)" class="bg-[#ffc93c] hover:bg-[#ffd75e] text-[#0a0a0a] text-xs font-semibold px-3 py-1.5 rounded-sm cursor-pointer transition-colors duration-200">เช็คอิน</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal: ลงทะเบียน Walk-in -->
    <transition name="fade-slide">
      <div v-if="showRegisterModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-[#0e0e0e] border border-[#262626] w-full max-w-sm rounded-sm p-5 space-y-4">
          <div class="flex justify-between items-center pb-2 border-b border-[#262626]">
            <h3 class="text-sm font-semibold text-white">ลงทะเบียนสมาชิกใหม่</h3>
            <button @click="showRegisterModal = false" class="text-[#767676] hover:text-white text-sm cursor-pointer">✕</button>
          </div>
          <form @submit.prevent="handleRegisterWalkIn" class="space-y-3 text-xs">
            <div>
              <label class="block text-[#9a9a9a] mb-1">เบอร์โทรศัพท์</label>
              <input v-model="newCustomerPhone" type="tel" required class="w-full bg-[#161616] border border-[#333333] focus:border-[#c9962b] focus:ring-2 focus:ring-[#c9962b]/20 text-white p-2.5 rounded-sm outline-none transition-all duration-200">
            </div>
            <div>
              <label class="block text-[#9a9a9a] mb-1">ชื่อลูกค้า</label>
              <input v-model="newCustomerName" type="text" placeholder="ระบุชื่อลูกค้า..." required class="w-full bg-[#161616] border border-[#333333] focus:border-[#c9962b] focus:ring-2 focus:ring-[#c9962b]/20 text-white p-2.5 rounded-sm outline-none transition-all duration-200">
            </div>
            <button type="submit" :disabled="registerLoading" class="w-full bg-[#ffc93c] hover:bg-[#ffd75e] text-[#0a0a0a] font-bold py-2.5 rounded-sm transition-colors duration-200 cursor-pointer mt-2 text-xs">
              {{ registerLoading ? 'กำลังบันทึก...' : 'ยืนยันลงทะเบียน' }}
            </button>
          </form>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
.arrow-fly {
  display: inline-block;
  animation: arrow-arc 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes arrow-arc {
  0%   { transform: translateY(0) rotate(-50deg); opacity: 0; }
  15%  { opacity: 1; }
  50%  { transform: translateY(-42px) rotate(0deg); }
  100% { transform: translateY(6px) rotate(35deg); opacity: 0; }
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.arrow-pop-enter-active { transition: none; }
.arrow-pop-leave-active { transition: opacity 0.3s ease; }
.arrow-pop-leave-to { opacity: 0; }
</style>