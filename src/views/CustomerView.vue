<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

// ข้อมูลบริการและรอบเวลา
const packages = ref([])
const scheduleSlots = ref([])
const loading = ref(true)

// ตรวจสอบแต้มสะสม
const checkPhone = ref('')
const customerPoints = ref(null)
const pointError = ref('')
const pointLoading = ref(false)

// ฟอร์มจองคิว
const bookingForm = ref({
  name: '',
  phone: '',
  package_id: '',
  round_time: '',
  booking_date: new Date().toISOString().split('T')[0]
})
const bookingSuccess = ref(false)
const bookingError = ref('')
const bookingLoading = ref(false)

// โหลดข้อมูลแพ็กเกจและรอบเวลา
const loadData = async () => {
  try {
    const [pkgRes, slotRes] = await Promise.all([
      supabase.from('packages').select('*').order('id'),
      supabase.from('schedule_slot').select('*').order('slot_id')
    ])

    if (pkgRes.data) packages.value = pkgRes.data
    if (slotRes.data) {
      scheduleSlots.value = slotRes.data
      if (slotRes.data.length > 0) {
        bookingForm.value.round_time = `${slotRes.data[0].start_time.slice(0, 5)}-${slotRes.data[0].end_time.slice(0, 5)}`
      }
    }
    if (packages.value.length > 0) {
      bookingForm.value.package_id = packages.value[0].id
    }
  } catch (err) {
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

// ตรวจสอบแต้มสมาชิก
const handleCheckPoints = async () => {
  if (!checkPhone.value.trim()) return
  pointLoading.value = true
  pointError.value = ''
  customerPoints.value = null

  try {
    const { data, error } = await supabase
      .from('customers')
      .select('name, points')
      .eq('phone', checkPhone.value.trim())
      .single()

    if (error || !data) {
      pointError.value = 'ไม่พบข้อมูลสมาชิกจากเบอร์นี้'
    } else {
      customerPoints.value = data
    }
  } catch (err) {
    pointError.value = 'เกิดข้อผิดพลาดในการตรวจสอบ'
  } finally {
    pointLoading.value = false
  }
}

// ส่งคำขอจองคิว
// ส่งคำขอจองคิว พร้อมสมัครสมาชิกใหม่อัตโนมัติทันที
const handleBooking = async () => {
  bookingError.value = ''
  bookingSuccess.value = false

  if (!bookingForm.value.name.trim() || !bookingForm.value.phone.trim()) {
    bookingError.value = 'กรุณากรอกชื่อและเบอร์โทรศัพท์'
    return
  }

  bookingLoading.value = true

  try {
    const cleanPhone = bookingForm.value.phone.trim()
    const cleanName = bookingForm.value.name.trim()

    // 1. ตรวจสอบว่าเบอร์นี้เคยเป็นสมาชิกแล้วหรือไม่
    let customerId = null
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('phone', cleanPhone)
      .maybeSingle()

    if (existingCustomer) {
      customerId = existingCustomer.id
    } else {
      // ถ้ายังไม่เคยมี ให้สมัครสมาชิกใหม่ทันที (ตั้งต้น 0 แต้ม)
      const { data: newCustomer, error: createCustError } = await supabase
        .from('customers')
        .insert([
          {
            name: cleanName,
            phone: cleanPhone,
            points: 0
          }
        ])
        .select()
        .single()

      if (createCustError) throw createCustError
      customerId = newCustomer.id
    }

    // 2. บันทึกข้อมูลการจอง โดยผูก customer_id เข้าไปด้วยทันที
    const { error: bookingErr } = await supabase.from('bookings').insert([
      {
        customer_id: customerId,
        customer_name: cleanName,
        customer_phone: cleanPhone,
        package_id: bookingForm.value.package_id,
        round_time: bookingForm.value.round_time,
        booking_date: bookingForm.value.booking_date,
        status: 'pending'
      }
    ])

    if (bookingErr) throw bookingErr

    bookingSuccess.value = true
    bookingForm.value.name = ''
    bookingForm.value.phone = ''
  } catch (err) {
    bookingError.value = 'เกิดข้อผิดพลาด: ' + err.message
  } finally {
    bookingLoading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="min-h-screen bg-[#0F1115] text-white font-sans selection:bg-amber-500 selection:text-black">
    <!-- Hero Section -->
    <header class="border-b border-[#2C2D30] bg-[#15171A]/80 backdrop-blur sticky top-0 z-40">
      <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 class="text-xl font-black text-amber-500 tracking-wider">MR. HANDSOME ARCHERY</h1>
          <p class="text-xs text-gray-400">สนามยิงธนูและระบบตรวจสอบสิทธิ์สมาชิก</p>
        </div>
        <a href="#booking" class="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-md">
          จองรอบเวลา
        </a>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <!-- 1. บัตรสะสมแต้มดิจิทัล (Loyalty Check) -->
      <section class="bg-[#1C1E22] border border-[#2C2D30] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div class="relative z-10 max-w-xl">
          <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">MEMBERSHIP PRIVILEGE</span>
          <h2 class="text-xl font-black text-white mt-1 mb-2">ตรวจสอบแต้มสะสมและสิทธิ์ยิงฟรี</h2>
          <p class="text-xs text-gray-400 mb-4 leading-relaxed">
            ยิงครบ 7 ครั้ง รับส่วนลดทันที 50% | ยิงครบ 10 ครั้ง รับสิทธิ์ยิงฟรี 1 รอบ
          </p>

          <div class="flex gap-2">
            <input 
              v-model="checkPhone"
              @keyup.enter="handleCheckPoints"
              type="text" 
              placeholder="กรอกเบอร์โทรศัพท์ของคุณ..." 
              class="flex-1 bg-[#0F1115] border border-[#2C2D30] text-white px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-amber-500 transition-all"
            >
            <button 
              @click="handleCheckPoints" 
              :disabled="pointLoading"
              class="bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-2.5 rounded-xl text-xs transition-all disabled:opacity-50"
            >
              {{ pointLoading ? 'ค้นหา...' : 'เช็คแต้ม' }}
            </button>
          </div>

          <div v-if="pointError" class="mt-3 text-red-400 text-xs font-medium">{{ pointError }}</div>

          <!-- กล่องแสดงผลข้อมูลแต้ม -->
          <div v-if="customerPoints" class="mt-5 p-4 rounded-xl bg-[#0F1115] border border-[#2C2D30] space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm font-bold text-white">คุณ {{ customerPoints.name }}</span>
              <span class="text-amber-400 font-bold text-sm">{{ customerPoints.points || 0 }} / 10 แต้ม</span>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-[#25282E] h-2.5 rounded-full overflow-hidden">
              <div 
                class="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500"
                :style="{ width: `${Math.min(100, ((customerPoints.points || 0) / 10) * 100)}%` }"
              ></div>
            </div>

            <div class="text-xs text-gray-300">
              <span v-if="(customerPoints.points || 0) >= 10" class="text-emerald-400 font-bold">
                🎉 คุณได้รับสิทธิ์ยิงฟรี 1 ครั้งแล้ว! (แจ้งเบอร์ที่เคาน์เตอร์ตอนเช็คอิน)
              </span>
              <span v-else-if="(customerPoints.points || 0) >= 7" class="text-amber-400 font-bold">
                🎯 คุณได้รับสิทธิ์ส่วนลด 50% แล้ว!
              </span>
              <span v-else>
                อีก {{ 7 - (customerPoints.points || 0) }} ครั้งเพื่อปลดล็อกส่วนลด 50%
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. แพ็กเกจและราคา -->
      <section>
        <h2 class="text-lg font-black mb-4 flex items-center gap-2">
          <span>🎯 แพ็กเกจและอัตราค่าบริการ</span>
        </h2>
        <div v-if="loading" class="text-gray-400 text-xs">กำลังโหลดข้อมูล...</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="pkg in packages" 
            :key="pkg.id"
            class="bg-[#1C1E22] border border-[#2C2D30] p-5 rounded-xl flex flex-col justify-between"
          >
            <div>
              <h3 class="font-bold text-base text-white mb-2">{{ pkg.name }}</h3>
              <p class="text-xs text-gray-400 leading-relaxed mb-4">{{ pkg.description }}</p>
            </div>
            <div class="pt-3 border-t border-[#2C2D30] flex justify-between items-center">
              <span class="text-xs text-gray-400">อัตราค่าบริการ</span>
              <span class="text-xl font-black text-amber-500">฿{{ pkg.price }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. ฟอร์มจองคิวออนไลน์ (Booking) -->
      <section id="booking" class="bg-[#1C1E22] border border-[#2C2D30] rounded-2xl p-6">
        <h2 class="text-lg font-black mb-1">📅 จองรอบเวลายิงธนูล่วงหน้า</h2>
        <p class="text-xs text-gray-400 mb-6">กรอกข้อมูลเพื่อสำรองช่องยิง ชำระเงินเมื่อเดินทางมาถึงสนาม</p>

        <form @submit.prevent="handleBooking" class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-bold text-gray-400 mb-1.5">ชื่อ-นามสกุล ผู้จอง</label>
            <input 
              v-model="bookingForm.name"
              type="text" 
              placeholder="ระบุชื่อของคุณ" 
              class="w-full bg-[#0F1115] border border-[#2C2D30] text-white p-3 rounded-xl focus:border-amber-500 outline-none"
              required
            >
          </div>

          <div>
            <label class="block font-bold text-gray-400 mb-1.5">เบอร์โทรศัพท์ติดต่อ</label>
            <input 
              v-model="bookingForm.phone"
              type="tel" 
              placeholder="เช่น 0812345678" 
              class="w-full bg-[#0F1115] border border-[#2C2D30] text-white p-3 rounded-xl focus:border-amber-500 outline-none"
              required
            >
          </div>

          <div>
            <label class="block font-bold text-gray-400 mb-1.5">วันที่ต้องการใช้บริการ</label>
            <input 
              v-model="bookingForm.booking_date"
              type="date" 
              class="w-full bg-[#0F1115] border border-[#2C2D30] text-white p-3 rounded-xl focus:border-amber-500 outline-none"
              required
            >
          </div>

          <div>
            <label class="block font-bold text-gray-400 mb-1.5">รอบเวลา (จำกัด 5 รอบ/วัน)</label>
            <select 
              v-model="bookingForm.round_time"
              class="w-full bg-[#0F1115] border border-[#2C2D30] text-white p-3 rounded-xl focus:border-amber-500 outline-none"
            >
              <option 
                v-for="slot in scheduleSlots" 
                :key="slot.slot_id" 
                :value="`${slot.start_time.slice(0, 5)}-${slot.end_time.slice(0, 5)}`"
              >
                {{ slot.slot_name }} ({{ slot.start_time.slice(0, 5) }} - {{ slot.end_time.slice(0, 5) }})
              </option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="block font-bold text-gray-400 mb-1.5">แพ็กเกจธนูที่ต้องการ</label>
            <select 
              v-model="bookingForm.package_id"
              class="w-full bg-[#0F1115] border border-[#2C2D30] text-white p-3 rounded-xl focus:border-amber-500 outline-none"
            >
              <option v-for="pkg in packages" :key="pkg.id" :value="pkg.id">
                {{ pkg.name }} - ฿{{ pkg.price }} ({{ pkg.description }})
              </option>
            </select>
          </div>

          <div class="md:col-span-2 pt-2">
            <button 
              type="submit" 
              :disabled="bookingLoading"
              class="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3 rounded-xl transition-all disabled:opacity-50 text-sm shadow-md"
            >
              {{ bookingLoading ? 'กำลังบันทึกการจอง...' : 'ยืนยันการจองคิว' }}
            </button>
          </div>
        </form>

        <div v-if="bookingSuccess" class="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs text-center font-bold">
          ✅ บันทึกการจองสำเร็จ! กรุณาแสดงเบอร์โทรศัพท์ต่อพนักงานเมื่อเดินทางมาถึงสนาม
        </div>
        <div v-if="bookingError" class="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center">
          {{ bookingError }}
        </div>
      </section>

      <!-- 4. กฎระเบียบความปลอดภัยในสนาม -->
      <section class="border-t border-[#2C2D30] pt-6 pb-12 text-xs text-gray-400 space-y-2">
        <h4 class="font-bold text-gray-300 uppercase tracking-wider">ข้อควรระวังความปลอดภัย (Safety Etiquette)</h4>
        <ul class="list-disc list-inside space-y-1">
          <li>ห้ามปล่อยสายธนูโดยไม่มีลูกธนู (Dry Fire) โดยเด็ดขาด เพราะอาจทำให้อุปกรณ์เสียหาย</li>
          <li>ห้ามหันคันธนูไปในทิศทางที่มีผู้อื่น ไม่ว่าจะง้างสายหรือไม่ก็ตาม</li>
          <li>เข้าเก็บลูกธนูพร้อมกันเมื่อทุกคนวางคันธนูเรียบร้อยแล้วเท่านั้น</li>
        </ul>
      </section>
    </main>
  </div>
</template>