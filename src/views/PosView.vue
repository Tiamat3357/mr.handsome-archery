<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'

const packages = ref([])
const loading = ref(true)
const cart = ref([])

// สมาชิก
const searchPhone = ref('')
const currentCustomer = ref(null)
const searchError = ref('')

// ฟอร์มข้อมูลการให้บริการจริงหน้าร้าน
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
}

const addToCart = (pkg) => {
  cart.value.push({ ...pkg, cartId: Date.now() })
}

const removeFromCart = (index) => {
  cart.value.splice(index, 1)
}

// คำนวณยอดรวม: ค่าแพ็กเกจ + ค่าเป้าเพิ่ม (20฿) + ค่าปรับลูกธนู (150฿)
const totalAmount = computed(() => {
  const packageTotal = cart.value.reduce((sum, item) => sum + Number(item.price), 0)
  const targetTotal = Number(additionalTargets.value) * 20
  const arrowTotal = Number(lostArrows.value) * 150
  return packageTotal + targetTotal + arrowTotal
})

const handleCheckout = async () => {
  if (cart.value.length === 0) return

  try {
    // บันทึกข้อมูลจริงทุกช่องที่พนักงานเลือก
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

    // อัปเดตแต้มสมาชิก (+1 แต้มต่อการใช้บริการตาม Business Rule)
    if (currentCustomer.value) {
      const newPoints = (currentCustomer.value.points || 0) + 1
      const { error: updateError } = await supabase
        .from('customers')
        .update({ points: newPoints })
        .eq('id', currentCustomer.value.id)

      if (updateError) throw updateError
    }

    alert('✅ บันทึกข้อมูลและชำระเงินเรียบร้อย!')
    cart.value = []
    additionalTargets.value = 0
    lostArrows.value = 0
    clearCustomer()

  } catch (err) {
    console.error('Checkout error:', err.message)
    alert('❌ บันทึกไม่สำเร็จ: ' + err.message)
  }
}

onMounted(() => {
  fetchPackages()
})
</script>

<template>
  <div class="h-screen p-6 flex flex-col bg-[#0F1115] text-white overflow-hidden font-sans">
    <header class="mb-4 border-b border-[#2C2D30] pb-3 flex justify-between items-center shrink-0">
      <div>
        <h1 class="text-2xl font-black text-amber-500 tracking-wider">MR. HANDSOME ARCHERY</h1>
        <p class="text-xs text-gray-400">Backyard Archery Service Management POS</p>
      </div>
      <div class="text-right text-xs text-emerald-400 font-mono">● LIVE DATABASE</div>
    </header>

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

      <!-- ฝั่งขวา: รายละเอียดรอบและการคำนวณเงิน -->
      <div class="w-[420px] bg-[#1C1E22] border border-[#2C2D30] rounded-xl flex flex-col shrink-0">
        <!-- ข้อมูลสมาชิก -->
        <div class="p-4 border-b border-[#2C2D30] bg-[#15171A] rounded-t-xl">
          <div v-if="!currentCustomer" class="flex gap-2">
            <input 
              v-model="searchPhone"
              @keyup.enter="searchCustomer"
              type="text" 
              placeholder="ค้นหาเบอร์สมาชิก..." 
              class="flex-1 bg-[#0F1115] border border-[#2C2D30] text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-500 text-sm"
            >
            <button @click="searchCustomer" class="bg-amber-500 text-black px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-amber-400">ค้นหา</button>
          </div>
          <div v-if="searchError" class="text-red-400 text-xs mt-1">{{ searchError }}</div>
          <div v-if="currentCustomer" class="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg">
            <div>
              <div class="text-emerald-400 font-bold text-sm">คุณ {{ currentCustomer.name }}</div>
              <div class="text-gray-400 text-xs">แต้มสะสม: <span class="text-white font-bold">{{ currentCustomer.points || 0 }} pt</span></div>
            </div>
            <button @click="clearCustomer" class="text-gray-400 hover:text-white text-xs underline">เปลี่ยน</button>
          </div>
        </div>

        <!-- รายการสินค้าและฟอร์มบริการ -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <!-- ตะกร้า -->
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
                <button @click="removeFromCart(index)" class="text-red-400 hover:text-red-300 text-xs font-semibold px-2 py-1">ลบ</button>
              </div>
            </div>
          </div>

          <!-- ฟอร์มระบุข้อมูลสนามจริง -->
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
                  class="py-2 rounded-lg text-xs transition-colors"
                >
                  เงินสด (Cash)
                </button>
                <button 
                  type="button"
                  @click="paymentMethod = 'PromptPay'"
                  :class="paymentMethod === 'PromptPay' ? 'bg-amber-500 text-black font-bold' : 'bg-[#0F1115] text-gray-300 border border-[#2C2D30]'"
                  class="py-2 rounded-lg text-xs transition-colors"
                >
                  สแกนจ่าย (QR Code)
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- แผงยอดรวมและปุ่มคิดเงิน -->
        <div class="p-4 border-t border-[#2C2D30] bg-[#15171A] rounded-b-xl">
          <div class="flex justify-between items-center mb-3">
            <span class="text-xs text-gray-400 font-medium">ยอดชำระสุทธิ</span>
            <span class="text-2xl font-black text-amber-500">฿{{ totalAmount.toLocaleString('th-TH') }}</span>
          </div>
          <button 
            @click="handleCheckout"
            :disabled="cart.length === 0"
            class="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm shadow-md active:scale-95"
          >
            บันทึกและชำระเงิน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>