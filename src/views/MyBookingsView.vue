<!--
  src/views/MyBookingsView.vue
  หน้าตรวจสอบแต้มสะสมสมาชิก (MR.HANDSOME Loyalty Pass)
  - เริ่มต้นเป็นค่าว่าง ไม่ดึงเบอร์เก่าอัตโนมัติ
  - แสดงการ์ดแต้มสะสมเมื่อผู้ใช้กรอกเบอร์โทรศัพท์ 9-10 หลักเท่านั้น
  - บอร์ด Stamp 10 ดวง (7 ครั้งลด 50% / 10 ครั้งยิงฟรี 1 รอบ)
-->
<script setup>
import { ref, computed, watch } from 'vue'
import { supabase } from '../lib/supabase'

// เริ่มต้นเป็นค่าว่าง ไม่ดึงเบอร์จาก localStorage
const phoneQuery = ref('')
const memberInfo = ref(null)
const isSearchingMember = ref(false)

// ค้นหาแต้มสมาชิกจาก Supabase ด้วยเบอร์โทร
async function lookupMemberPoints(phone) {
  const cleanPhone = String(phone || '').replace(/\D/g, '')
  if (cleanPhone.length < 9) {
    memberInfo.value = null
    return
  }

  isSearchingMember.value = true
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('phone', cleanPhone)
      .maybeSingle()

    if (!error && data) {
      memberInfo.value = data
    } else {
      // ถ้าเป็นเบอร์ใหม่ที่ยังไม่มีแต้มในฐานข้อมูล
      memberInfo.value = {
        name: 'นักธนูใหม่',
        phone: cleanPhone,
        points: 0,
        isNew: true
      }
    }
  } catch (e) {
    memberInfo.value = null
  } finally {
    isSearchingMember.value = false
  }
}

// ค้นหาแต้มเมื่อกรอกเบอร์โทรครบ 9-10 หลัก
watch(phoneQuery, (newVal) => {
  const cleanPhone = String(newVal || '').replace(/\D/g, '')
  if (cleanPhone.length >= 9) {
    lookupMemberPoints(cleanPhone)
  } else {
    memberInfo.value = null
  }
})

// คำนวณแสตมป์ในรอบปัจจุบัน (1-10 แต้ม)
const currentStamps = computed(() => {
  if (!memberInfo.value) return 0
  const pts = Number(memberInfo.value.points) || 0
  return pts % 10 === 0 && pts > 0 ? 10 : pts % 10
})

// ข้อความแจ้งสิทธิ์ประโยชน์
const nextRewardText = computed(() => {
  const pts = currentStamps.value
  if (pts < 7) {
    return `สะสมอีก ${7 - pts} แต้ม เพื่อรับสิทธิ์ "ลด 50%"`
  } else if (pts < 10) {
    return `สะสมอีก ${10 - pts} แต้ม เพื่อรับสิทธิ์ "ยิงฟรี 1 รอบ"`
  } else {
    return 'ยินดีด้วย! คุณสะสมครบ 10 แต้ม ได้รับสิทธิ์ "ยิงฟรี 1 รอบ" แล้ว'
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#121212] text-stone-100 font-sans antialiased pt-20" lang="th">
    <main class="flex-1 w-full mx-auto px-4 sm:px-6 py-8" style="max-width: 900px;">
      
      <!-- Title Section -->
      <div class="w-full text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ffd700]/15 text-[#ffd700] border border-[#ffd700]/30 mb-3 shadow-md">
          <span class="material-symbols-outlined text-4xl">military_tech</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
          ตรวจสอบแต้มสะสมของฉัน
        </h1>
        <div class="h-1 w-16 bg-[#ffd700] mx-auto mt-2 rounded-full"></div>
        <p class="text-xs sm:text-sm text-stone-400 mt-2.5 mx-auto leading-relaxed" style="max-width: 520px; width: 100%;">
          ยิงยิ่งบ่อย ยิ่งคุ้ม! กรอกเบอร์โทรศัพท์เพื่อตรวจสอบแต้มสะสมและสิทธิประโยชน์ของคุณ
        </p>
      </div>

      <!-- ช่องกรอกเบอร์โทรศัพท์ -->
      <div class="w-full bg-[#181818] border border-[#2c2c2c] rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="w-full sm:flex-1 relative">
            <span class="absolute left-3.5 top-3 text-stone-500 flex items-center">
              <span class="material-symbols-outlined text-[20px]">dialpad</span>
            </span>
            <input
              v-model="phoneQuery"
              @input="phoneQuery = phoneQuery.replace(/\D/g, '').slice(0, 10)"
              type="tel"
              inputmode="numeric"
              maxlength="10"
              placeholder="กรอกเบอร์โทรศัพท์ 10 หลักของคุณ (เช่น 08XXXXXXXX)..."
              class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#383838] bg-[#222222] text-white placeholder-stone-500 outline-none text-xs sm:text-sm font-mono tracking-wider focus:border-[#ffd700]"
            />
          </div>

          <button
            v-if="phoneQuery"
            type="button"
            @click="phoneQuery = ''; memberInfo = null"
            class="px-4 py-2.5 rounded-xl bg-[#262626] hover:bg-[#333] text-stone-300 text-xs font-semibold transition border border-[#383838] cursor-pointer"
          >
            ล้างค่า
          </button>
        </div>
      </div>

      <!-- State 1: ยังไม่ได้กรอกเบอร์โทร (หน้าว่างเริ่มต้น สวย คลีน สบายตา) -->
      <div
        v-if="!phoneQuery || phoneQuery.length < 9"
        class="w-full bg-[#181818] border border-[#2c2c2c] rounded-3xl p-8 sm:p-12 text-center shadow-lg"
      >
        <div class="w-16 h-16 rounded-full bg-[#222222] text-[#ffd700] flex items-center justify-center mx-auto mb-4 border border-[#333]">
          <span class="material-symbols-outlined text-3xl">fingerprint</span>
        </div>
        <h3 class="text-base sm:text-lg font-bold text-white mb-2">
          กรุณากรอกเบอร์โทรศัพท์ของคุณ
        </h3>
        <p class="text-xs text-stone-400 mb-6 mx-auto leading-relaxed" style="max-width: 480px; width: 100%;">
          ระบุหมายเลขโทรศัพท์ที่เคยแจ้งไว้กับสตาฟหน้าร้าน เพื่อดึงข้อมูลแต้มสะสมและสิทธิ์ส่วนลด
        </p>
        <router-link
          to="/schedule"
          class="inline-flex items-center gap-2 bg-[#ffd700] hover:bg-yellow-400 text-black font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-md active:scale-95"
        >
          <span class="material-symbols-outlined text-[18px]">calendar_today</span>
          <span>จองรอบยิงธนู</span>
        </router-link>
      </div>

      <!-- State 2: แสดงบอร์ดแต้มสะสมและสแตมป์ 10 ดวง (แสดงเฉพาะเมื่อกรอกเบอร์ครบ) -->
      <div
        v-else-if="memberInfo"
        class="w-full bg-[#181818] border-2 border-[#ffd700] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        <!-- ลายน้ำเป้าธนู -->
        <svg class="absolute -right-12 -top-12 w-64 h-64 opacity-5 pointer-events-none" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="190" stroke="#FFD700" stroke-width="20"/>
          <circle cx="200" cy="200" r="130" stroke="#FFD700" stroke-width="20"/>
          <circle cx="200" cy="200" r="70" stroke="#FFD700" stroke-width="20"/>
        </svg>

        <div class="relative z-10">
          <!-- ข้อมูลสมาชิก -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2c2c2c]">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-[#ffd700] text-black font-black flex items-center justify-center text-2xl shadow-md">
                <span class="material-symbols-outlined text-4xl">crisis_alert</span>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono text-[#ffd700] font-bold uppercase tracking-wider">MR.HANDSOME MEMBER PASS</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">VERIFIED</span>
                </div>
                <h2 class="text-xl sm:text-2xl font-black text-white mt-0.5">
                  คุณ{{ memberInfo.name }}
                </h2>
                <p class="text-xs text-stone-400 font-mono mt-0.5">เบอร์โทรศัพท์: {{ memberInfo.phone }}</p>
              </div>
            </div>

            <div class="bg-[#222] border border-[#383838] px-5 py-3 rounded-2xl flex items-center gap-4">
              <div class="text-right">
                <span class="text-[11px] text-stone-400 font-semibold block">แต้มสะสมทั้งหมด</span>
                <span class="text-3xl font-black text-[#ffd700] font-mono leading-none">
                  {{ memberInfo.points || 0 }} <span class="text-xs text-stone-400 font-normal">แต้ม</span>
                </span>
              </div>
            </div>
          </div>

          <!-- บอร์ดดวงแสตมป์ 10 ดวง -->
          <div class="pt-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span class="text-xs font-mono text-[#ffd700] uppercase font-bold tracking-wider block">LOYALTY STAMP TRACKER</span>
                <p class="text-sm text-stone-200 font-semibold mt-0.5">{{ nextRewardText }}</p>
              </div>
              <span class="text-xs text-stone-400">รอบปัจจุบัน: {{ currentStamps }} / 10 แต้ม</span>
            </div>

            <!-- กล่อง Stamp 10 ช่อง -->
            <div class="grid grid-cols-5 sm:grid-cols-10 gap-2.5 sm:gap-3 py-3">
              <div
                v-for="n in 10"
                :key="n"
                class="flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all"
                :class="[
                  n <= currentStamps
                    ? 'bg-[#ffd700] border-[#ffd700] text-black shadow-md shadow-[#ffd700]/20'
                    : 'bg-[#222] border-[#383838] text-stone-500'
                ]"
              >
                <span class="material-symbols-outlined text-[20px] mb-1 font-bold">
                  {{ n <= currentStamps ? 'check_circle' : 'radio_button_unchecked' }}
                </span>
                <span class="font-mono text-xs font-bold">{{ n }}</span>

                <span
                  v-if="n === 7"
                  class="mt-1 text-[9px] font-black uppercase tracking-tighter px-1 rounded"
                  :class="n <= currentStamps ? 'bg-black text-[#ffd700]' : 'text-amber-400'"
                >
                  ลด 50%
                </span>
                <span
                  v-else-if="n === 10"
                  class="mt-1 text-[9px] font-black uppercase tracking-tighter px-1 rounded"
                  :class="n <= currentStamps ? 'bg-black text-[#ffd700]' : 'text-emerald-400'"
                >
                  ฟรี 1 รอบ
                </span>
                <span v-else class="text-[9px] opacity-0 mt-1">-</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-[#2c2c2c] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
              <p>• มาครบ 7 ครั้งลด 50% • มาครบ 10 ครั้งยิงฟรี 1 รอบ (ผูกกับเบอร์โทร)</p>
              <router-link
                to="/schedule"
                class="px-4 py-2 rounded-xl bg-[#262626] hover:bg-[#333] border border-[#383838] text-[#ffd700] font-bold transition"
              >
                + จองรอบยิงธนูเพิ่ม
              </router-link>
            </div>
          </div>
        </div>
      </div>

    </main>

    <!-- Footer -->
    <footer class="w-full py-6 px-4 bg-[#101010] border-t border-[#2c2c2c] mt-auto">
      <div class="mx-auto text-center text-xs text-stone-500" style="max-width: 900px;">
        <p>© 2026 MR.HANDSOME Archery Club. Precision & Power. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>