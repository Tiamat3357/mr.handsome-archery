<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { supabase } from '../lib/supabase'

const packages = ref([])
const loading = ref(true)
const cart = ref([])

// รายการจองประจำวัน
const todayBookings = ref([])
const activeBookingId = ref(null)
const showBookingModal = ref(false)

// สมาชิก
const searchPhone = ref('')
const currentCustomer = ref(null)
const searchError = ref('')

// ฟอร์มการให้บริการ
const selectedRound = ref('11:00-12:00')
const roundSlots = [
  '11:00-12:00',
  '13:00-14:00',
  '14:30-15:30',
  '16:00-17:00',
  '17:30-18:30'
]
const paymentMethod = ref('Cash')
const additionalTargets = ref(0)
const lostArrows = ref(0)

// ระบบแต้มสะสมและสิทธิ์รางวัล (Milestone Rewards)
const applyReward = ref(false)

const availableReward = computed(() => {
  if (!currentCustomer.value) return null
  const pts = currentCustomer.value.points || 0

  if (pts >= 10) {
    return {
      type: 'FREE',
      label: 'สิทธิ์ยิงฟรี 1 ครั้ง (ครบ 10 แต้ม)',
      rate: 1.0
    }
  } else if (pts >= 7) {
    return {
      type: 'DISCOUNT_50',
      label: 'สิทธิ์ส่วนลด 50% (ครบ 7 แต้ม)',
      rate: 0.5
    }
  }
  return null
})

watch(currentCustomer, () => {
  applyReward.value = false
})

const fetchPackages = async () => {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('id')

    if (error) throw error
    packages.value = data
  } catch (err) {
    console.error('Error loading packages:', err.message)
  } finally {
    loading.value = false
  }
}

// ดึงรายการจองของวันนี้ที่สถานะยังเป็น pending
const fetchTodayBookings = async () => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('bookings')
      .select('*, packages(name, price)')
      .eq('booking_date', today)
      .eq('status', 'pending')
      .order('round_time')

    if (error) throw error
    todayBookings.value = data || []
  } catch (err) {
    console.error('Error loading bookings:', err.message)
  }
}

// เมื่อพนักงานกดเลือกคิวจอง
const selectBooking = async (booking) => {
  activeBookingId.value = booking.id
  selectedRound.value = booking.round_time

  // 1. ใส่แพ็กเกจที่จองลงตะกร้า
  const matchedPkg = packages.value.find(p => p.id === booking.package_id)
  if (matchedPkg) {
    cart.value = [{ ...matchedPkg, cartId: Date.now() }]
  }

  // 2. ดึงข้อมูลสมาชิกด้วยเบอร์โทรที่จองไว้
  searchPhone.value = booking.customer_phone
  await searchCustomer()

  showBookingModal.value = false
}

const searchCustomer = async () => {
  if (!searchPhone.value) return
  searchError.value = ''
  currentCustomer.value = null

  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', searchPhone.value)
      .single()

    if (error) throw error
    if (data) currentCustomer.value = data
  } catch (err) {
    searchError.value = 'ไม่พบข้อมูลสมาชิกจากเบอร์นี้'
  }
}

const clearCustomer = () => {
  currentCustomer.value = null
  searchPhone.value = ''
  searchError.value = ''
  applyReward.value = false
  activeBookingId.value = null
}

const addToCart = (pkg) => {
  cart.value.push({ ...pkg, cartId: Date.now() })
}

const removeFromCart = (index) => {
  cart.value.splice(index, 1)
}

const packageTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + Number(item.price), 0)
})

const discountAmount = computed(() => {
  if (!applyReward.value || !availableReward.value) return 0
  return packageTotal.value * availableReward.value.rate
})

const totalAmount = computed(() => {
  const targetTotal = Number(additionalTargets.value) * 20
  const arrowTotal = Number(lostArrows.value) * 150
  const netPackageTotal = Math.max(0, packageTotal.value - discountAmount.value)
  return netPackageTotal + targetTotal + arrowTotal
})

const handleCheckout = async () => {
  if (cart.value.length === 0) return

  try {
    // 1. บันทึกประวัติการใช้บริการ
    const logsToInsert = cart.value.map(item => ({
      customer_id: currentCustomer.value ? currentCustomer.value.id : null,
      package_id: item.id,
      round_time: selectedRound.value,
      additional_targets: Number(additionalTargets.value),
      lost_arrows: Number(lostArrows.value),
      total_amount: totalAmount.value,
      payment_method: paymentMethod.value,
      staff_id: 'STAFF-01'
    }))

    const { error: logError } = await supabase
      .from('service_logs')
      .insert(logsToInsert)

    if (logError) throw logError

    // 2. ถ้าเป็นการเช็คอินจากการจอง ปรับสถานะเป็น completed
    if (activeBookingId.value) {
      await supabase
        .from('bookings')
        .update({ status: 'completed' })
        .eq('id', activeBookingId.value)
    }

    // 3. ปรับปรุงแต้มสะสม
    if (currentCustomer.value) {
      const currentPts = currentCustomer.value.points || 0
      let nextPts = currentPts + 1

      if (applyReward.value && availableReward.value?.type === 'FREE') {
        nextPts = 0
      }

      const { error: updateError } = await supabase
        .from('customers')
        .update({ points: nextPts })
        .eq('id', currentCustomer.value.id)

      if (updateError) throw updateError
    }

    alert('✅ บันทึกข้อมูลและชำระเงินเรียบร้อย!')
    cart.value = []
    additionalTargets.value = 0
    lostArrows.value = 0
    clearCustomer()
    fetchTodayBookings()

  } catch (err) {
    console.error('Checkout error:', err.message)
    alert('❌ บันทึกไม่สำเร็จ: ' + err.message)
  }
}

onMounted(() => {
  fetchPackages()
  fetchTodayBookings()
})
</script>

<template>
  <div class="h-screen p-6 flex flex-col bg-[#0F1115] text-white overflow-hidden font-sans">
    <!-- แถบ Header -->
    <header class="mb-4 border-b border-[#2C2D30] pb-3 flex justify-between items-center shrink-0">
      <div>
        <h1 class="text-2xl font-black text-amber-500 tracking-wider">MR. HANDSOME ARCHERY</h1>
        <p class="text-xs text-gray-400">Backyard Archery Service Management POS</p>
      </div>
      <div class="flex items-center gap-4">
        <!-- ปุ่มเปิดดูรายการจองวันนี้ -->
        <button 
          @click="showBookingModal = true"
          class="relative bg-[#1C1E22] hover:bg-[#25282E] border border-[#2C2D30] px-3.5 py-1.5 rounded-lg text-xs font-bold text-gray-200 flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>📅 คิวจองวันนี้</span>
          <span 
            v-if="todayBookings.length > 0"
            class="bg-amber-500 text-black text-[10px] font-black px-1.5 py-0.2 rounded-full"
          >
            {{ todayBookings.length }}
          </span>
        </button>
        <div class="text-right text-xs text-emerald-400 font-mono">● LIVE DATABASE</div>
      </div>
    </header>

    <!-- ป้ายแจ้งเตือนเมื่อกำลังจัดการบิลจากการจอง -->
    <div v-if="activeBookingId" class="mb-3 bg-blue-500/15 border border-blue-500/40 px-4 py-2 rounded-xl flex justify-between items-center shrink-0">
      <div class="text-xs text-blue-300">
        📌 กำลังเช็คอินจากรายการจอง (รหัส: #{{ activeBookingId }})
      </div>
      <button @click="clearCustomer" class="text-xs text-gray-400 hover:text-white underline cursor-pointer">
        ยกเลิกการผูกคิวจอง
      </button>
    </div>

    <div class="flex-1 flex gap-6 overflow-hidden">
      <!-- ฝั่งซ้าย: เมนูแพ็กเกจ -->
      <div class="flex-1 overflow-y-auto pr-2 pb-10">
        <h2 class="text-lg font-bold mb-3 text-white">เลือกแพ็กเกจบริการ</h2>
        <div v-if="loading" class="text-gray-400 text-sm">กำลังโหลดข้อมูล...</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div 
            v-for="pkg in packages" 
            :key="pkg.id" 
            @click="addToCart(pkg)"
            class="bg-[#1C1E22] border border-[#2C2D30] p-5 rounded-xl hover:border-amber-500 hover:bg-[#25282E] transition-all cursor-pointer flex flex-col justify-between active:scale-95"
          >
            <div>
              <h3 class="text-base font-bold text-white mb-1">{{ pkg.name }}</h3>
              <p class="text-xs text-gray-400 mb-4 leading-relaxed">{{ pkg.description }}</p>
            </div>
            <div class="pt-3 border-t border-[#2C2D30] flex justify-between items-center">
              <span class="text-xs text-gray-400">ราคา</span>
              <span class="text-lg font-bold text-amber-400">฿{{ pkg.price }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ฝั่งขวา: คิดเงินและข้อมูลลูกค้า -->
      <div class="w-[430px] bg-[#1C1E22] border border-[#2C2D30] rounded-xl flex flex-col shrink-0">
        <!-- ช่องค้นหาสมาชิก -->
        <div class="p-4 border-b border-[#2C2D30] bg-[#15171A] rounded-t-xl space-y-3">
          <div v-if="!currentCustomer" class="flex gap-2">
            <input 
              v-model="searchPhone"
              @keyup.enter="searchCustomer"
              type="text" 
              placeholder="ค้นหาเบอร์สมาชิก..." 
              class="flex-1 bg-[#0F1115] border border-[#2C2D30] text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
            >
            <button @click="searchCustomer" class="bg-amber-500 text-black px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-amber-400 cursor-pointer">ค้นหา</button>
          </div>
          <div v-if="searchError" class="text-red-400 text-xs">{{ searchError }}</div>

          <div v-if="currentCustomer" class="space-y-2">
            <div class="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg">
              <div>
                <div class="text-emerald-400 font-bold text-sm">คุณ {{ currentCustomer.name }}</div>
                <div class="text-gray-400 text-xs">แต้มสะสม: <span class="text-white font-bold text-sm">{{ currentCustomer.points || 0 }}</span> ครั้ง</div>
              </div>
              <button @click="clearCustomer" class="text-gray-400 hover:text-white text-xs underline cursor-pointer">เปลี่ยน</button>
            </div>

            <!-- กล่องแจ้งสิทธิ์ส่วนลด -->
            <div v-if="availableReward" class="bg-amber-500/10 border border-amber-500/40 p-3 rounded-lg flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-amber-400">🎉 ปลดล็อกสิทธิ์พิเศษ!</div>
                <div class="text-xs text-gray-300">{{ availableReward.label }}</div>
              </div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  v-model="applyReward"
                  class="w-4 h-4 accent-amber-500 cursor-pointer rounded"
                >
                <span class="text-xs font-bold text-amber-300">ใช้สิทธิ์</span>
              </label>
            </div>
          </div>
        </div>

        <!-- รายการสินค้าและฟอร์มบริการ -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">รายการที่เลือก ({{ cart.length }})</span>
            <div v-if="cart.length === 0" class="text-center text-gray-500 py-6 text-sm">ยังไม่มีรายการที่เลือก</div>
            <div v-else class="space-y-2 mt-2">
              <div 
                v-for="(item, index) in cart" 
                :key="item.cartId"
                class="flex justify-between items-center bg-[#0F1115] p-2.5 rounded-lg border border-[#2C2D30]"
              >
                <div>
                  <div class="font-medium text-sm text-white">{{ item.name }}</div>
                  <div class="text-xs text-amber-400">฿{{ item.price }}</div>
                </div>
                <button @click="removeFromCart(index)" class="text-red-400 hover:text-red-300 text-xs font-semibold px-2 py-1 cursor-pointer">ลบ</button>
              </div>
            </div>
          </div>

          <!-- ฟอร์มสนาม -->
          <div class="space-y-3 pt-3 border-t border-[#2C2D30] text-sm">
            <div>
              <label class="block text-xs font-bold text-gray-400 mb-1">รอบเวลายิงธนู</label>
              <select v-model="selectedRound" class="w-full bg-[#0F1115] border border-[#2C2D30] text-white p-2 rounded-lg text-xs focus:border-amber-500 outline-none">
                <option v-for="slot in roundSlots" :key="slot" :value="slot">{{ slot }}</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs font-bold text-gray-400 mb-1">เป้าเพิ่ม (+20฿/เป้า)</label>
                <input v-model.number="additionalTargets" type="number" min="0" class="w-full bg-[#0F1115] border border-[#2C2D30] text-white p-2 rounded-lg text-xs focus:border-amber-500 outline-none">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 mb-1">ลูกธนูชำรุด (+150฿/ลูก)</label>
                <input v-model.number="lostArrows" type="number" min="0" class="w-full bg-[#0F1115] border border-[#2C2D30] text-white p-2 rounded-lg text-xs focus:border-amber-500 outline-none">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-400 mb-1">ช่องทางชำระเงิน</label>
              <div class="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  @click="paymentMethod = 'Cash'"
                  :class="paymentMethod === 'Cash' ? 'bg-amber-500 text-black font-bold' : 'bg-[#0F1115] text-gray-300 border border-[#2C2D30]'"
                  class="py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  เงินสด (Cash)
                </button>
                <button 
                  type="button"
                  @click="paymentMethod = 'PromptPay'"
                  :class="paymentMethod === 'PromptPay' ? 'bg-amber-500 text-black font-bold' : 'bg-[#0F1115] text-gray-300 border border-[#2C2D30]'"
                  class="py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  สแกนจ่าย (QR Code)
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- แผงสรุปยอดเงิน -->
        <div class="p-4 border-t border-[#2C2D30] bg-[#15171A] rounded-b-xl space-y-2">
          <div class="space-y-1 text-xs text-gray-400">
            <div class="flex justify-between">
              <span>ค่าบริการแพ็กเกจ</span>
              <span>฿{{ packageTotal.toLocaleString('th-TH') }}</span>
            </div>
            <div v-if="discountAmount > 0" class="flex justify-between text-emerald-400 font-medium">
              <span>ส่วนลดสิทธิ์พิเศษ</span>
              <span>-฿{{ discountAmount.toLocaleString('th-TH') }}</span>
            </div>
            <div v-if="additionalTargets > 0" class="flex justify-between">
              <span>เป้ากระดาษ ({{ additionalTargets }} แผ่น)</span>
              <span>+฿{{ (additionalTargets * 20).toLocaleString('th-TH') }}</span>
            </div>
            <div v-if="lostArrows > 0" class="flex justify-between text-red-400">
              <span>ค่าปรับลูกธนู ({{ lostArrows }} ลูก)</span>
              <span>+฿{{ (lostArrows * 150).toLocaleString('th-TH') }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center pt-2 border-t border-[#2C2D30]">
            <span class="text-xs text-gray-300 font-medium">ยอดชำระสุทธิ</span>
            <span class="text-2xl font-black text-amber-500">฿{{ totalAmount.toLocaleString('th-TH') }}</span>
          </div>

          <button 
            @click="handleCheckout"
            :disabled="cart.length === 0"
            class="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-md active:scale-95 cursor-pointer"
          >
            บันทึกและชำระเงิน
          </button>
        </div>
      </div>
    </div>

    <!-- Modal หน้าต่างแสดงคิวจองประจำวัน -->
    <div 
      v-if="showBookingModal" 
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-[#1C1E22] border border-[#2C2D30] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
        <div class="p-4 border-b border-[#2C2D30] flex justify-between items-center bg-[#15171A]">
          <div>
            <h3 class="font-bold text-white text-base">📅 คิวจองประจำวันนี้</h3>
            <p class="text-xs text-gray-400">เลือกลูกค้าเพื่อดึงข้อมูลเข้าสู่การชำระเงิน</p>
          </div>
          <button @click="showBookingModal = false" class="text-gray-400 hover:text-white text-sm cursor-pointer">✕</button>
        </div>

        <div class="p-4 overflow-y-auto space-y-3 flex-1">
          <div v-if="todayBookings.length === 0" class="text-center py-8 text-gray-500 text-xs">
            ไม่มีรายการจองที่รอการเช็คอินในวันนี้
          </div>
          <div 
            v-for="b in todayBookings" 
            :key="b.id"
            class="bg-[#0F1115] border border-[#2C2D30] p-3.5 rounded-xl flex justify-between items-center hover:border-amber-500/60 transition-all"
          >
            <div>
              <div class="font-bold text-sm text-amber-400">{{ b.customer_name }}</div>
              <div class="text-xs text-gray-400">เบอร์: {{ b.customer_phone }}</div>
              <div class="text-xs text-gray-300 mt-1">
                รอบเวลา: <span class="text-white font-medium">{{ b.round_time }}</span> 
                • แพ็กเกจ: <span class="text-emerald-400">{{ b.packages?.name || 'ไม่ได้ระบุ' }}</span>
              </div>
            </div>
            <button 
              @click="selectBooking(b)"
              class="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-3 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
            >
              เช็คอินบิลนี้
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>