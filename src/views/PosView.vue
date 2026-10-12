<!--
  src/views/PosView.vue
  ระบบเคาน์เตอร์ POS & แคชเชียร์ (MR.HANDSOME Tactical POS)
  - เชื่อมโยงปุ่มเปิด-ปิดร้านกับ Supabase (store_settings) แบบ Real-time
  - ดึงข้อมูลมือที่ถนัด (ซ้าย/ขวา) และข้อความโน้ตถึงร้านมาแสดงในการ์ดคิวจองและแถบ Check-in ชัดเจน
  - บันทึกยอดขายและแต้มสะสมเข้าตาราง customers อัตโนมัติ
-->
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()

// Theme
const theme = ref('dark')
localStorage.setItem('mha-theme', 'dark')

// สถานะสนาม (เชื่อมต่อ Supabase store_settings)
const isStoreOpen = ref(true)

const fetchStoreStatus = async () => {
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .select('value')
      .eq('key', 'is_open')
      .maybeSingle()

    if (!error && data !== null) {
      isStoreOpen.value = data.value
      localStorage.setItem('mha-store-open', String(data.value))
    } else {
      isStoreOpen.value = localStorage.getItem('mha-store-open') !== 'false'
    }
  } catch (err) {
    isStoreOpen.value = localStorage.getItem('mha-store-open') !== 'false'
  }
}

const toggleStoreStatus = async () => {
  const nextState = !isStoreOpen.value
  isStoreOpen.value = nextState
  localStorage.setItem('mha-store-open', String(nextState))

  try {
    const { error } = await supabase
      .from('store_settings')
      .update({ value: nextState })
      .eq('key', 'is_open')

    if (error) {
      console.error('Update store status error:', error)
    }
  } catch (err) {
    console.error('Network error when updating store status:', err)
  }
}

// ออกจากระบบ
const handleLogout = async () => {
  if (confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
    try {
      await supabase.auth.signOut()
    } catch (e) {}
    router.push('/login')
  }
}

// รายการแพ็กเกจมาตรฐาน MR.HANDSOME (ราคาต่อ 1 ชั่วโมง)
const DEFAULT_PACKAGES = [
  {
    id: 'pkg-recurve-1st',
    name: 'Olympic Recurve (ยิงครั้งแรก)',
    price: 370,
    description: 'ค่าคัน 350 + เป้า 20 (รวมโค้ชบรีฟพื้นฐาน 15 นาที)'
  },
  {
    id: 'pkg-recurve-sub',
    name: 'Olympic Recurve (ครั้งต่อไป)',
    price: 320,
    description: 'สำหรับผู้มีประสบการณ์ ค่าคัน 300 + เป้า 20'
  },
  {
    id: 'pkg-barebow',
    name: 'Bare Bow (ราคาเดียว)',
    price: 320,
    description: 'ยิงสัญชาตญาณ ไม่มีศูนย์เล็ง ค่าคัน 300 + เป้า 20'
  },
  {
    id: 'pkg-own-gear',
    name: 'นำอุปกรณ์มาเอง',
    price: 100,
    description: 'ค่านำอุปกรณ์ส่วนตัวเข้าสนาม (ฟรีค่าเป้าและลานฝึก)'
  }
]

// Data States
const packages = ref(DEFAULT_PACKAGES)
const loading = ref(false)
const selectedPackage = ref(null)
const duration = ref(1)
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

// คลิกซ้ำเพื่อยกเลิก
const toggleRound = (time) => {
  selectedRound.value = selectedRound.value === time ? null : time
}

const togglePackage = (pkg) => {
  selectedPackage.value = selectedPackage.value?.id === pkg.id ? null : pkg
}

// เช็คสิทธิ์สมาชิกสะสมแต้ม
const availableReward = computed(() => {
  if (!currentCustomer.value) return null
  const pts = currentCustomer.value.points || 0
  if (pts >= 10) return { type: 'FREE', label: 'ยิงฟรี 1 รอบ (ใช้ 10 แต้ม)', rate: 1.0, cost: 10 }
  if (pts >= 7) return { type: 'DISCOUNT_50', label: 'ลด 50% (ใช้ 7 แต้ม)', rate: 0.5, cost: 7 }
  return null
})

watch(currentCustomer, () => {
  applyReward.value = false
})

// โหลดแพ็กเกจ
const fetchPackages = async () => {
  try {
    const { data, error } = await supabase.from('packages').select('*').order('id')
    if (!error && data && data.length > 0) {
      packages.value = data
    }
  } catch (err) {
    packages.value = DEFAULT_PACKAGES
  } finally {
    loading.value = false
  }
}

// ดึงคิวจองวันนี้ (รวมทั้ง localStorage และ Supabase พร้อมดึงข้อความโน้ต)
const fetchTodayBookings = async () => {
  const merged = []

  // 1. ดึงจาก localStorage
  try {
    const localList = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]')
    localList.forEach(item => {
      if (item.status !== 'cancelled' && item.status !== 'completed') {
        merged.push({
          id: item.id,
          customer_name: item.name,
          customer_phone: item.phone,
          round_time: item.time,
          booking_date: item.date,
          duration: item.duration || 1,
          package_name: item.bow || (item.gear === 'own' ? 'นำอุปกรณ์มาเอง' : 'Olympic Recurve'),
          hand: item.hand || 'right',
          note: item.note || item.specialRequest || item.request || item.remark || item.notes || '',
          total: item.total
        })
      }
    })
  } catch (e) {}

  // 2. ดึงจาก Supabase
  try {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('bookings')
      .select('*, packages(*)')
      .eq('booking_date', today)
      .eq('status', 'pending')
      .order('round_time')

    if (data && data.length > 0) {
      data.forEach(dbItem => {
        if (!merged.some(m => m.id === dbItem.id)) {
          merged.push({
            id: dbItem.id,
            customer_name: dbItem.customer_name,
            customer_phone: dbItem.customer_phone,
            round_time: dbItem.round_time,
            booking_date: dbItem.booking_date,
            duration: dbItem.duration || 1,
            package_name: dbItem.packages?.name || 'Olympic Recurve',
            hand: dbItem.hand || 'right',
            note: dbItem.note || dbItem.special_request || dbItem.remark || '',
            total: dbItem.total_amount
          })
        }
      })
    }
  } catch (err) {}

  todayBookings.value = merged
}

// ค้นหาลูกค้า
const searchCustomer = async () => {
  const query = searchPhone.value.trim()
  if (!query) return
  searchError.value = ''
  currentCustomer.value = null

  const matched = todayBookings.value.find(
    b => b.customer_phone === query || b.id.toLowerCase() === query.toLowerCase()
  )

  if (matched) {
    selectBookingItem(matched)
    return
  }

  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', query)
      .single()

    if (!error && data) {
      currentCustomer.value = data
      return
    }
  } catch (e) {}

  try {
    const localList = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]')
    const found = localList.find(b => b.phone === query)
    if (found) {
      currentCustomer.value = {
        name: found.name,
        phone: found.phone,
        points: 0
      }
      return
    }
  } catch (e) {}

  searchError.value = 'ไม่พบข้อมูลเบอร์หรือรหัสนี้ในระบบ'
}

// เช็คอินคิวจอง
const selectBookingItem = async (b) => {
  activeBooking.value = b
  selectedRound.value = b.round_time?.replace(' น.', '').trim()
  searchPhone.value = b.customer_phone
  duration.value = b.duration || 1

  try {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', b.customer_phone)
      .maybeSingle()

    if (data) {
      currentCustomer.value = data
    } else {
      currentCustomer.value = {
        name: b.customer_name,
        phone: b.customer_phone,
        points: 0
      }
    }
  } catch (e) {
    currentCustomer.value = {
      name: b.customer_name,
      phone: b.customer_phone,
      points: 0
    }
  }

  const pkgName = b.package_name || ''
  if (pkgName.includes('ส่วนตัว') || b.total == 100 * duration.value) {
    selectedPackage.value = packages.value.find(p => p.id === 'pkg-own-gear') || packages.value[3]
  } else if (pkgName.includes('Bare Bow') || b.total == 320 * duration.value) {
    selectedPackage.value = packages.value.find(p => p.id === 'pkg-barebow') || packages.value[2]
  } else if (b.total == 370 * duration.value) {
    selectedPackage.value = packages.value.find(p => p.id === 'pkg-recurve-1st') || packages.value[0]
  } else {
    selectedPackage.value = packages.value.find(p => p.id === 'pkg-recurve-sub') || packages.value[1]
  }

  showBookingModal.value = false
}

// สละสิทธิ์คิว
const handleNoShow = async (booking) => {
  const ok = confirm(`ยืนยันการตัดสิทธิ์คิวของคุณ "${booking.customer_name || 'ลูกค้า'}" รอบ ${booking.round_time} ใช่หรือไม่?`)
  if (!ok) return

  try {
    const localList = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]')
    const idx = localList.findIndex(item => item.id === booking.id)
    if (idx !== -1) {
      localList[idx].status = 'cancelled'
      localStorage.setItem('mrhs_bookings', JSON.stringify(localList))
    }
  } catch (e) {}

  try {
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', booking.id)
  } catch (e) {}

  todayBookings.value = todayBookings.value.filter(b => b.id !== booking.id)
  if (activeBooking.value?.id === booking.id) clearCustomer()
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
    const { data, error } = await supabase
      .from('customers')
      .insert([{ name, phone, points: 0 }])
      .select()
      .single()

    if (!error && data) {
      currentCustomer.value = data
    } else {
      currentCustomer.value = { name, phone, points: 0 }
    }
    searchPhone.value = phone
    showRegisterModal.value = false
  } catch (err) {
    currentCustomer.value = { name, phone, points: 0 }
    searchPhone.value = phone
    showRegisterModal.value = false
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
  duration.value = 1
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

// คำนวณราคา
const packageHourlyPrice = computed(() => Number(selectedPackage.value?.price || 0))
const packageSubtotal = computed(() => packageHourlyPrice.value * duration.value)
const discountAmount = computed(() => {
  if (!applyReward.value || !availableReward.value || !selectedPackage.value) return 0
  return packageHourlyPrice.value * availableReward.value.rate
})
const targetsPrice = computed(() => additionalTargets.value * 20)
const arrowsPrice = computed(() => lostArrows.value * 150)
const netTotal = computed(() => {
  const base = Math.max(0, packageSubtotal.value - discountAmount.value)
  return base + targetsPrice.value + arrowsPrice.value
})

const canCheckout = computed(() => {
  if (isSubmitting.value) return false
  if (netTotal.value <= 0 && !selectedPackage.value) return false
  if (selectedPackage.value && !selectedRound.value) return false
  return true
})

// บันทึกชำระเงินและบวกแต้ม
const handleCheckout = async () => {
  if (!canCheckout.value) return
  isSubmitting.value = true

  try {
    if (activeBooking.value) {
      try {
        const localList = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]')
        const idx = localList.findIndex(item => item.id === activeBooking.value.id)
        if (idx !== -1) {
          localList[idx].status = 'completed'
          localStorage.setItem('mrhs_bookings', JSON.stringify(localList))
        }
      } catch (e) {}

      try {
        await supabase.from('bookings').update({ status: 'completed' }).eq('id', activeBooking.value.id)
      } catch (e) {}
    }

    try {
      await supabase.from('service_logs').insert([{
        customer_id: currentCustomer.value?.id || null,
        package_id: selectedPackage.value?.id || null,
        round_time: selectedRound.value || 'บริการเสริม',
        duration: duration.value,
        additional_targets: additionalTargets.value,
        lost_arrows: lostArrows.value,
        total_amount: netTotal.value,
        payment_method: paymentMethod.value,
        staff_id: 'STAFF-01'
      }])
    } catch (e) {}

    const saleRecord = {
      id: 'INV-' + Date.now().toString().slice(-6),
      bookingId: activeBooking.value?.id || null,
      customerName: currentCustomer.value?.name || 'ลูกค้าทั่วไป (Walk-in)',
      customerPhone: currentCustomer.value?.phone || '-',
      packageName: selectedPackage.value?.name || 'บริการเสริม',
      duration: duration.value,
      roundTime: selectedRound.value || 'ไม่ระบุรอบ',
      hand: activeBooking.value?.hand || 'right',
      note: activeBooking.value?.note || '',
      additionalTargets: additionalTargets.value,
      lostArrows: lostArrows.value,
      totalAmount: netTotal.value,
      paymentMethod: paymentMethod.value,
      timestamp: new Date().toISOString(),
      dateText: new Date().toLocaleDateString('th-TH')
    }

    try {
      const salesList = JSON.parse(localStorage.getItem('mrhs_sales') || '[]')
      salesList.unshift(saleRecord)
      localStorage.setItem('mrhs_sales', JSON.stringify(salesList))
    } catch (e) {
      console.error('Save sale error:', e)
    }

    // บวกแต้มสะสม
    if (currentCustomer.value && selectedPackage.value) {
      try {
        const cleanPhone = String(currentCustomer.value.phone || '').replace(/\D/g, '')
        let currentPts = Number(currentCustomer.value.points) || 0
        let nextPts = currentPts

        if (applyReward.value && availableReward.value) {
          nextPts = Math.max(0, currentPts - availableReward.value.cost) + 1
        } else {
          nextPts = currentPts + 1
        }

        if (currentCustomer.value.id) {
          await supabase.from('customers').update({ points: nextPts }).eq('id', currentCustomer.value.id)
        } else if (cleanPhone) {
          const { data: existing } = await supabase.from('customers').select('id').eq('phone', cleanPhone).maybeSingle()
          if (existing) {
            await supabase.from('customers').update({ points: nextPts }).eq('id', existing.id)
          } else {
            await supabase.from('customers').insert([{
              name: currentCustomer.value.name || 'ลูกค้าทั่วไป',
              phone: cleanPhone,
              points: nextPts
            }])
          }
        }
      } catch (e) {
        console.error('Update points error:', e)
      }
    }

    showArrowFly.value = false
    requestAnimationFrame(() => { showArrowFly.value = true })
    setTimeout(() => { showArrowFly.value = false }, 900)

    alert(`บันทึกชำระเงินสำเร็จ!\nยอดรวม: ${netTotal.value} บาท (${paymentMethod.value})`)

    additionalTargets.value = 0
    lostArrows.value = 0
    selectedPackage.value = null
    selectedRound.value = null
    duration.value = 1
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
  fetchStoreStatus()
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
      <header class="min-h-14 py-2 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 header-surface gap-2">
        <div class="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          <!-- รูป Logo.jpg ตัดขอบกลม -->
          <img
            src="/Logo.jpg"
            @error="(e) => e.target.src = '/logo.jpg'"
            alt="MR.HANDSOME"
            class="w-8 h-8 rounded-full object-cover shrink-0 border border-[#ffd700]/40 shadow-sm"
          />
          <div class="min-w-0">
            <h1 class="text-xs sm:text-sm font-bold tracking-[0.06em] truncate" style="color: var(--text)">
              MR. HANDSOME
            </h1>
            <p class="text-[10px] sm:text-[11px] font-mono truncate hidden sm:block" style="color: var(--text-muted)">
              เคาน์เตอร์ POS
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <!-- ปุ่มเปิด/ปิดร้าน เชื่อมต่อกับ Supabase store_settings -->
          <button
            type="button"
            @click="toggleStoreStatus"
            class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] font-mono cursor-pointer border transition-colors shrink-0"
            :class="isStoreOpen ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold' : 'border-rose-500/40 bg-rose-500/10 text-rose-400 font-bold'"
            :title="isStoreOpen ? 'สนามเปิดบริการ (คลิกเพื่อปิดรับจอง)' : 'ปิดรับจอง (คลิกเพื่อเปิดสนาม)'"
          >
            <span class="w-2 h-2 rounded-full shrink-0" :class="isStoreOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'"></span>
            <span class="hidden sm:inline">{{ isStoreOpen ? 'สนามเปิดบริการ' : 'ปิดรับจอง' }}</span>
            <span class="sm:hidden">{{ isStoreOpen ? 'เปิด' : 'ปิด' }}</span>
          </button>

          <button
            type="button"
            @click="router.push('/dashboard')"
            class="btn-ghost flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold shrink-0"
            title="แดชบอร์ดสรุปยอด"
          >
            <span class="material-symbols-outlined text-[16px] text-[#ffd700]">dashboard</span>
            <span class="hidden sm:inline">แดชบอร์ด</span>
          </button>

          <button
            type="button"
            @click="showBookingModal = true"
            class="btn-ghost flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold shrink-0"
            title="คิวจองวันนี้"
          >
            <span class="material-symbols-outlined text-[16px] text-[#ffd700]">calendar_month</span>
            <span class="hidden sm:inline">คิวจอง</span>
            <span v-if="todayBookings.length > 0" class="badge-count">{{ todayBookings.length }}</span>
          </button>

          <button
            type="button"
            @click="handleLogout"
            class="btn-ghost px-2.5 sm:px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:border-rose-500/50 cursor-pointer shrink-0 font-bold"
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
          <div class="truncate mr-2 flex items-center gap-2 flex-wrap">
            <span class="font-bold">
              CHECK-IN: {{ activeBooking.customer_name }} ({{ activeBooking.round_time }}) {{ activeBooking.duration || 1 }} ชม. • {{ activeBooking.package_name }}
            </span>
            <span
              class="px-2 py-0.5 rounded text-[11px] font-bold font-sans"
              :class="activeBooking.hand === 'left' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'"
            >
              {{ activeBooking.hand === 'left' ? 'ถนัดซ้าย' : 'ถนัดขวา' }}
            </span>
            <!-- แสดงโน้ตในแถบ Check-in ด้านบน -->
            <span v-if="activeBooking.note" class="px-2.5 py-0.5 rounded bg-[#2a2a2a] text-[#ffd700] border border-[#ffd700]/30 text-[11px] font-sans truncate max-w-[320px]">
              💬 โน้ต: "{{ activeBooking.note }}"
            </span>
          </div>
          <button @click="clearCustomer" class="underline cursor-pointer shrink-0 font-bold" style="color: var(--gold-bright)">
            ยกเลิก
          </button>
        </div>
      </transition>

      <!-- Main Layout -->
      <main class="max-w-[1240px] mx-auto p-3 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
        <div class="lg:col-span-7 space-y-4 sm:space-y-5">
          
          <!-- 01 / ข้อมูลลูกค้า / ค้นหาคิวจอง -->
          <section class="panel p-4 sm:p-5">
            <div class="flex items-center justify-between mb-3">
              <span class="label-eyebrow">01 / ข้อมูลลูกค้า & ค้นหาคิวจอง</span>
              <button v-if="currentCustomer" @click="clearCustomer" class="text-xs underline cursor-pointer font-medium" style="color: var(--text-muted)">
                เปลี่ยนลูกค้า
              </button>
            </div>

            <div v-if="!currentCustomer" class="space-y-3">
              <div class="flex gap-2">
                <input
                  v-model="searchPhone"
                  @keyup.enter="searchCustomer"
                  type="text"
                  placeholder="ค้นหาด้วยเบอร์โทร (10 หลัก) หรือรหัส BK-XXXXXX..."
                  class="input-field flex-1 font-mono text-xs sm:text-sm"
                />
                <button @click="searchCustomer" class="btn-ghost px-3.5 sm:px-4 text-xs font-bold">ค้นหา</button>
              </div>

              <transition name="fade-slide">
                <div v-if="searchError" class="p-3 rounded-xl flex items-center justify-between inset-surface">
                  <span class="text-xs font-medium" style="color: var(--text-muted)">{{ searchError }}</span>
                  <button @click="newCustomerPhone = searchPhone; showRegisterModal = true" class="text-xs font-bold cursor-pointer" style="color: var(--gold-bright)">
                    + สมัครสมาชิกใหม่
                  </button>
                </div>
              </transition>
            </div>

            <div v-else class="p-3.5 sm:p-4 rounded-xl space-y-3 inset-surface" style="border-left: 3px solid var(--gold)">
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

          <!-- 02 / รอบเวลา & ระยะเวลา (ชั่วโมง) -->
          <section class="panel p-4 sm:p-5">
            <div class="flex justify-between items-center mb-3">
              <span class="label-eyebrow">02 / เลือกรอบเวลา & ระยะเวลา (ชั่วโมง)</span>
              <span v-if="selectedRound" @click="selectedRound = null" class="text-xs underline cursor-pointer font-bold" style="color: var(--gold-bright)">
                ปลดการเลือก
              </span>
            </div>

            <div class="mb-4 p-3 rounded-xl inset-surface flex items-center justify-between">
              <span class="text-xs font-bold text-stone-300">ระยะเวลาฝึกซ้อม:</span>
              <div class="flex gap-2">
                <button
                  type="button"
                  v-for="h in [1, 2, 3]"
                  :key="h"
                  @click="duration = h"
                  :class="[
                    'px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border cursor-pointer',
                    duration === h
                      ? 'bg-[#ffd700] text-black border-[#ffd700] shadow-sm'
                      : 'bg-[#222] text-stone-400 border-[#383838] hover:text-white'
                  ]"
                >
                  {{ h }} ชั่วโมง
                </button>
              </div>
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
              <span v-if="selectedPackage" @click="selectedPackage = null" class="text-xs underline cursor-pointer font-bold" style="color: var(--gold-bright)">
                ปลดการเลือก
              </span>
            </div>

            <div v-if="loading" class="text-xs py-4 text-center" style="color: var(--text-muted)">
              กำลังโหลดข้อมูลแพ็กเกจ...
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="pkg in packages"
                :key="pkg.id"
                @click="togglePackage(pkg)"
                :class="['pkg-card', selectedPackage?.id === pkg.id ? 'pkg-card-active' : '']"
              >
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <h4 class="text-sm font-bold" style="color: var(--text)">{{ pkg.name }}</h4>
                    <span v-if="selectedPackage?.id === pkg.id" class="pkg-check"></span>
                  </div>
                  <p class="text-xs leading-relaxed" style="color: var(--text-soft)">{{ pkg.description }}</p>
                </div>
                <div class="mt-4 pt-2.5 flex items-baseline justify-between" style="border-top: 1px solid var(--border)">
                  <span class="text-[11px] font-medium" style="color: var(--text-muted)">อัตราค่าบริการ / ชม.</span>
                  <span class="text-base font-black font-mono" style="color: var(--gold-bright)">
                    ฿{{ pkg.price }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- 04 / อุปกรณ์เสริม & ค่าปรับ -->
          <section class="panel p-4 sm:p-5">
            <span class="label-eyebrow block mb-3">04 / เป้ากระดาษเสริม & ค่าชดเชยอุปกรณ์</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div class="p-3.5 rounded-xl flex items-center justify-between inset-surface">
                <div>
                  <span class="text-xs font-bold block" style="color: var(--text)">เป้ากระดาษเพิ่ม</span>
                  <span class="text-[11px] font-medium" style="color: var(--text-muted)">+20 ฿/แผ่น</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <button @click="additionalTargets = Math.max(0, additionalTargets - 1)" class="stepper-btn">-</button>
                  <input
                    type="number"
                    v-model.number="additionalTargets"
                    @focus="$event.target.select()"
                    @blur="clampCount('targets')"
                    min="0"
                    class="stepper-input"
                  />
                  <button @click="additionalTargets++" class="stepper-btn">+</button>
                </div>
              </div>

              <div class="p-3.5 rounded-xl flex items-center justify-between inset-surface">
                <div>
                  <span class="text-xs font-bold block" style="color: var(--text)">ลูกธนูชำรุด / สูญหาย</span>
                  <span class="text-[11px] font-medium" style="color: var(--text-muted)">+150 ฿/ลูก</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <button @click="lostArrows = Math.max(0, lostArrows - 1)" class="stepper-btn">-</button>
                  <input
                    type="number"
                    v-model.number="lostArrows"
                    @focus="$event.target.select()"
                    @blur="clampCount('arrows')"
                    min="0"
                    class="stepper-input"
                  />
                  <button @click="lostArrows++" class="stepper-btn">+</button>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- ฝั่งขวา: สรุปบิล -->
        <div class="lg:col-span-5">
          <div class="panel panel-strong p-5 sm:p-6 lg:sticky lg:top-24 space-y-4 sm:space-y-5 relative">
            <span class="corner corner-tl"></span>
            <span class="corner corner-tr"></span>
            <span class="corner corner-bl"></span>
            <span class="corner corner-br"></span>

            <div class="flex items-center justify-between pb-3" style="border-bottom: 1px solid var(--border)">
              <h3 class="text-sm font-bold" style="color: var(--text)">สรุปรายการบริการ</h3>
              <span class="text-xs font-mono font-bold" style="color: var(--gold-bright)">
                {{ selectedRound || 'ไม่ระบุรอบ' }} ({{ duration }} ชม.)
              </span>
            </div>

            <!-- รายการคำนวณ -->
            <div class="space-y-3 text-xs">
              <div class="flex justify-between items-center" style="color: var(--text-soft)">
                <div>
                  <span class="font-medium block">{{ selectedPackage?.name || 'ไม่มีแพ็กเกจ (บริการเสริม)' }}</span>
                  <span v-if="selectedPackage" class="text-[10px] text-stone-500 font-mono">
                    {{ packageHourlyPrice }} ฿ × {{ duration }} ชม.
                  </span>
                </div>
                <span class="font-mono font-bold" style="color: var(--text)">฿{{ packageSubtotal }}</span>
              </div>

              <div v-if="discountAmount > 0" class="flex justify-between items-center" style="color: var(--gold-bright)">
                <span class="font-bold">ส่วนลดสิทธิสมาชิก (-{{ availableReward?.cost }} แต้ม)</span>
                <span class="font-mono font-bold">- ฿{{ discountAmount }}</span>
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
              <span class="text-[11px] block mb-2 font-bold" style="color: var(--text-muted)">
                ช่องทางการชำระเงินหน้าร้าน
              </span>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  @click="paymentMethod = 'PromptPay'"
                  :class="['pay-btn', paymentMethod === 'PromptPay' ? 'pay-btn-active' : '']"
                >
                  สแกน QR
                </button>
                <button
                  type="button"
                  @click="paymentMethod = 'Cash'"
                  :class="['pay-btn', paymentMethod === 'Cash' ? 'pay-btn-active' : '']"
                >
                  เงินสด
                </button>
              </div>
            </div>

            <!-- ยอดสุทธิ -->
            <div class="pt-4 flex items-baseline justify-between" style="border-top: 1px solid var(--border)">
              <span class="text-xs font-bold" style="color: var(--text-muted)">ยอดชำระสุทธิ</span>
              <span class="text-3xl font-black font-mono tracking-tight" style="color: var(--gold-bright)">
                ฿{{ netTotal }}
              </span>
            </div>

            <!-- ปุ่มบันทึก -->
            <div class="relative">
              <transition name="arrow-pop">
                <div v-if="showArrowFly" class="pointer-events-none absolute inset-x-0 -top-1 flex justify-center z-10">
                  <span class="arrow-fly text-2xl">🏹</span>
                </div>
              </transition>

              <button
                @click="handleCheckout"
                :disabled="!canCheckout"
                class="btn-primary w-full py-3.5 text-sm cursor-pointer shadow-lg shadow-[#FFD700]/15"
              >
                <span v-if="isSubmitting">กำลังบันทึก...</span>
                <span v-else-if="selectedPackage && !selectedRound">กรุณาเลือกรอบเวลา</span>
                <span v-else-if="netTotal === 0 && !selectedPackage">กรุณาเลือกบริการหรือสินค้า</span>
                <span v-else-if="!selectedPackage && netTotal > 0">บันทึกเฉพาะค่าบริการเสริม</span>
                <span v-else>บันทึกและตัดยอดชำระเงิน</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <!-- Modal: คิวจองวันนี้ -->
      <transition name="fade-slide">
        <div v-if="showBookingModal" class="fixed inset-0 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div class="panel panel-strong w-full rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl relative" style="max-width: 620px; width: 94%;">
            <div class="flex justify-between items-center pb-3" style="border-bottom: 1px solid var(--border)">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[20px] text-[#ffd700]">calendar_month</span>
                <h3 class="text-base font-bold" style="color: var(--text)">คิวจองที่รอเข้าใช้บริการวันนี้</h3>
              </div>
              <button @click="showBookingModal = false" class="text-base cursor-pointer p-1 font-bold text-stone-400 hover:text-white">×</button>
            </div>

            <div class="max-h-96 overflow-y-auto space-y-3 pr-1">
              <div v-if="todayBookings.length === 0" class="text-center py-8 text-xs" style="color: var(--text-muted)">
                ยังไม่มีรายการจองที่รอเข้าใช้บริการ
              </div>

              <div
                v-for="b in todayBookings"
                :key="b.id"
                class="p-4 rounded-xl flex flex-col sm:flex-row sm:items-start justify-between inset-surface gap-3"
              >
                <div class="min-w-0 flex-1 space-y-1.5">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-sm font-bold" style="color: var(--text)">
                      {{ b.customer_name }}
                    </span>
                    <span class="text-xs font-mono text-stone-400">({{ b.customer_phone }})</span>
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-bold font-sans tracking-wide"
                      :class="b.hand === 'left' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'"
                    >
                      {{ b.hand === 'left' ? '🏹 ถนัดซ้าย' : '🏹 ถนัดขวา' }}
                    </span>
                  </div>

                  <span class="text-xs block font-mono" style="color: var(--gold-bright)">
                    รอบ: {{ b.round_time }} • {{ b.duration || 1 }} ชม. • {{ b.package_name }}
                  </span>

                  <!-- แสดงโน้ตคำขอพิเศษของลูกค้าในการ์ดคิวจองอย่างชัดเจน -->
                  <div v-if="b.note" class="p-2.5 rounded-lg bg-[#222] border border-[#383838] text-[11px] text-[#ffd700] leading-relaxed">
                    <strong class="text-stone-300">💬 โน้ตถึงร้าน:</strong> "{{ b.note }}"
                  </div>

                  <span class="text-[10px] text-stone-400 font-mono block">
                    ID: {{ b.id }} • ยอดชำระ: ฿{{ b.total }}
                  </span>
                </div>

                <div class="flex items-center gap-2 shrink-0 pt-1 sm:pt-0 self-end sm:self-start">
                  <button
                    type="button"
                    @click="handleNoShow(b)"
                    class="px-2.5 py-1.5 rounded-lg text-xs font-mono border border-rose-900/40 text-rose-400 hover:bg-rose-950/40 cursor-pointer font-bold"
                  >
                    สละสิทธิ์
                  </button>
                  <button @click="selectBookingItem(b)" class="btn-primary text-xs font-bold px-3.5 py-1.5 rounded-lg">
                    เช็คอิน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Modal: ลงทะเบียนสมาชิก Walk-in -->
      <transition name="fade-slide">
        <div v-if="showRegisterModal" class="fixed inset-0 flex items-center justify-center z-50 p-4 modal-backdrop">
          <div class="panel panel-strong w-full rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl relative" style="max-width: 420px; width: 92%;">
            <div class="flex justify-between items-center pb-3" style="border-bottom: 1px solid var(--border)">
              <h3 class="text-base font-bold" style="color: var(--text)">ลงทะเบียนสมาชิกใหม่</h3>
              <button @click="showRegisterModal = false" class="text-base cursor-pointer p-1 font-bold text-stone-400 hover:text-white">×</button>
            </div>

            <form @submit.prevent="handleRegisterWalkIn" class="space-y-3.5 text-xs">
              <div v-if="registerError" class="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-medium">
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
              <button type="submit" :disabled="registerLoading" class="btn-primary w-full py-2.5 mt-2 text-xs font-bold rounded-lg">
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
.glow-layer { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.glow {
  position: absolute; border-radius: 9999px; filter: blur(90px);
  background: radial-gradient(circle, rgba(var(--glow-color), var(--glow-opacity)) 0%, rgba(var(--glow-color), 0) 70%);
}
.glow-a { width: 480px; height: 480px; top: -100px; left: -60px; }
.glow-b { width: 420px; height: 420px; bottom: -120px; right: -50px; }
.grain-layer {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.03; mix-blend-mode: overlay;
}
.panel {
  position: relative; z-index: 2; background: var(--panel-bg);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border); border-radius: 14px;
}
.panel-strong { background: var(--panel-bg-strong); }
.inset-surface { background: var(--inset-bg); border: 1px solid var(--border); border-radius: 10px; }
.header-surface { background: var(--panel-bg-strong); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); position: relative; z-index: 20; }
.strip-surface { background: var(--inset-bg); border-bottom: 1px solid var(--border); position: relative; z-index: 15; }
.modal-backdrop { background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px); }
.label-eyebrow { font-size: 11px; font-family: ui-monospace, monospace; color: var(--gold); letter-spacing: 0.1em; font-weight: 800; }
.btn-ghost {
  border-radius: 10px; border: 1px solid var(--border); color: var(--text-soft);
  background: var(--inset-bg); transition: all .2s; cursor: pointer;
}
.btn-ghost:hover { border-color: var(--gold); color: var(--gold-bright); }
.btn-primary {
  background: var(--gold-bright); color: #121212; font-weight: 800; border-radius: 10px;
  transition: transform .15s, filter .2s; cursor: pointer; border: none;
}
.btn-primary:hover:not(:disabled) { filter: brightness(1.08); }
.btn-primary:active:not(:disabled) { transform: scale(0.98); }
.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
.badge-count { background: var(--gold-bright); color: #121212; font-size: 10px; font-weight: 800; padding: 1px 6px; border-radius: 9999px; }
.input-field {
  background: var(--inset-bg); border: 1px solid var(--border); border-radius: 10px;
  padding: 10px 14px; color: var(--text); outline: none; transition: border-color .2s;
}
.input-field:focus { border-color: var(--gold); }
.input-field::placeholder { color: var(--text-muted); opacity: 0.8; }
.round-chip {
  padding: 9px 6px; border-radius: 10px; border: 1px solid var(--border); background: var(--inset-bg);
  color: #f5f5f0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
  cursor: pointer; transition: all .2s;
}
.round-chip span:first-child { font-weight: 800; color: #ffffff; }
.round-chip span:last-child { font-weight: 600; color: #a8a8a2; }
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
  padding: 14px; border-radius: 12px; border: 1px solid var(--border);
  background: var(--inset-bg); cursor: pointer; transition: all .2s;
  display: flex; flex-direction: column; justify-content: space-between;
}
.pkg-card:hover { border-color: var(--text-muted); background: #222222; }
.pkg-card-active {
  border-color: var(--gold-bright) !important;
  background: rgba(255, 215, 0, 0.08) !important;
}
.pkg-check {
  width: 16px; height: 16px; border-radius: 9999px; background: var(--gold-bright);
  color: #121212; font-size: 10px; font-weight: 900; display: flex; align-items: center; justify-content: center;
}
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
.stepper-input::-webkit-outer-spin-button, .stepper-input::-webkit-inner-spin-button {
  -webkit-appearance: none; margin: 0;
}
.pay-btn {
  padding: 11px; border-radius: 10px; font-size: 12px; font-weight: 700; border: 1px solid var(--border);
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