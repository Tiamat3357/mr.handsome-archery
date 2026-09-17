<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const logs = ref([])
const loading = ref(true)

// วันที่ปัจจุบันสำหรับกรองข้อมูล
const todayStr = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD ตามเวลาท้องถิ่น
const selectedDate = ref(todayStr)
const dateFilter = ref('today') // 'today' | 'all'

const fetchLogs = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('service_logs')
      .select('*, packages(*), customers(*)')
      .order('created_at', { ascending: false })

    if (error) throw error
    logs.value = data || []
  } catch (err) {
    console.error('Error loading service logs:', err.message)
  } finally {
    loading.value = false
  }
}

// กรองข้อมูลตามตัวเลือก (วันนี้ หรือ ทั้งหมด)
const filteredLogs = computed(() => {
  if (dateFilter.value === 'all') return logs.value

  return logs.value.filter(log => {
    if (!log.created_at) return false
    const logDate = new Date(log.created_at).toLocaleDateString('en-CA')
    return logDate === selectedDate.value
  })
})

// คำนวณ KPIs ประจำวัน
const totalRevenue = computed(() => {
  return filteredLogs.value.reduce((sum, item) => sum + Number(item.total_amount || 0), 0)
})

const totalSessions = computed(() => filteredLogs.value.length)

const totalAdditionalTargets = computed(() => {
  return filteredLogs.value.reduce((sum, item) => sum + Number(item.additional_targets || 0), 0)
})

const totalLostArrows = computed(() => {
  return filteredLogs.value.reduce((sum, item) => sum + Number(item.lost_arrows || 0), 0)
})

const extrasRevenue = computed(() => {
  return (totalAdditionalTargets.value * 20) + (totalLostArrows.value * 150)
})

// สัดส่วนช่องทางชำระเงิน
const promptPayTotal = computed(() => {
  return filteredLogs.value
    .filter(item => item.payment_method === 'PromptPay')
    .reduce((sum, item) => sum + Number(item.total_amount || 0), 0)
})

const cashTotal = computed(() => {
  return filteredLogs.value
    .filter(item => item.payment_method === 'Cash')
    .reduce((sum, item) => sum + Number(item.total_amount || 0), 0)
})

// สถิติแยกตามแพ็กเกจ
const packageStats = computed(() => {
  const statsMap = {}

  filteredLogs.value.forEach(log => {
    const pkgName = log.packages?.name || 'ไม่ระบุแพ็กเกจ'
    const price = Number(log.packages?.price || 0)

    if (!statsMap[pkgName]) {
      statsMap[pkgName] = { name: pkgName, count: 0, revenue: 0 }
    }
    statsMap[pkgName].count += 1
    statsMap[pkgName].revenue += price
  })

  return Object.values(statsMap).sort((a, b) => b.count - a.count)
})

const formatTime = (isoString) => {
  if (!isoString) return '-'
  const d = new Date(isoString)
  return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (isoString) => {
  if (!isoString) return '-'
  const d = new Date(isoString)
  return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

onMounted(() => {
  fetchLogs()
})
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-[#ececec] font-sans selection:bg-[#ffc93c] selection:text-black">
    
    <!-- Header -->
    <header class="h-16 border-b border-[#262626] px-6 flex items-center justify-between bg-[#0a0a0a] sticky top-0 z-30">
      <div class="flex items-center gap-3">
        <svg viewBox="0 0 40 40" class="w-8 h-8 shrink-0">
          <circle cx="20" cy="20" r="18" fill="none" stroke="#c9962b" stroke-width="1.5"/>
          <circle cx="20" cy="20" r="11" fill="none" stroke="#c9962b" stroke-width="1.5"/>
          <circle cx="20" cy="20" r="3" fill="#ffc93c"/>
        </svg>
        <div>
          <h1 class="text-sm font-bold text-[#ececec] tracking-[0.08em]">MR. HANDSOME ARCHERY</h1>
          <p class="text-[11px] text-[#767676] font-mono">ระบบรายงานสรุปยอดและสถิติสนาม</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <!-- ปุ่มสลับไปหน้า POS -->
        <button
          @click="router.push('/pos')"
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-medium border border-[#2e2e2e] text-[#c9c9c9] hover:border-[#c9962b] hover:text-[#ffc93c] transition-colors duration-200 cursor-pointer"
        >
          <span>← กลับไปเคาน์เตอร์ POS</span>
        </button>

        <button
          @click="fetchLogs"
          class="p-1.5 rounded-sm border border-[#2e2e2e] hover:border-[#c9962b] text-[#9a9a9a] hover:text-[#ffc93c] transition-colors duration-200 cursor-pointer text-xs font-mono"
          title="รีเฟรชข้อมูล"
        >
          ↻ รีเฟรช
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      
      <!-- แถบเลือกช่วงเวลา (Filter Bar) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1a1a1a]">
        <div>
          <h2 class="text-lg font-bold text-white tracking-wide">สถิติและผลประกอบการ</h2>
          <p class="text-xs text-[#767676] font-mono">
            แสดงผล: {{ dateFilter === 'today' ? `วันที่ ${selectedDate}` : 'ประวัติทั้งหมด' }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <div class="inline-flex rounded-sm border border-[#262626] bg-[#141414] p-0.5 text-xs">
            <button
              @click="dateFilter = 'today'"
              :class="dateFilter === 'today' ? 'bg-[#ffc93c] text-black font-bold' : 'text-[#9a9a9a] hover:text-white'"
              class="px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer"
            >
              วันนี้
            </button>
            <button
              @click="dateFilter = 'all'"
              :class="dateFilter === 'all' ? 'bg-[#ffc93c] text-black font-bold' : 'text-[#9a9a9a] hover:text-white'"
              class="px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer"
            >
              ประวัติทั้งหมด
            </button>
          </div>

          <input
            v-if="dateFilter === 'today'"
            type="date"
            v-model="selectedDate"
            class="bg-[#141414] border border-[#262626] text-xs text-[#c9c9c9] px-2.5 py-1.5 rounded-sm outline-none focus:border-[#c9962b] font-mono"
          >
        </div>
      </div>

      <!-- 1. KPI Cards (4 ใบหลัก) -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- ยอดขายรวม -->
        <div class="bg-[#0e0e0e] border border-[#262626] border-t-2 border-t-[#c9962b] p-5 rounded-sm relative">
          <span class="text-[11px] font-mono text-[#c9962b] tracking-wider block mb-1">TOTAL REVENUE</span>
          <span class="text-xs text-[#767676]">ยอดขายสุทธิ</span>
          <div class="mt-3 text-3xl font-black text-[#ffc93c] font-mono tracking-tight">
            ฿{{ totalRevenue.toLocaleString('th-TH') }}
          </div>
          <div class="mt-2 text-[10px] text-[#767676] font-mono">
            เฉลี่ย ฿{{ totalSessions > 0 ? Math.round(totalRevenue / totalSessions).toLocaleString('th-TH') : 0 }} / บิล
          </div>
        </div>

        <!-- จำนวนรอบยิง -->
        <div class="bg-[#0e0e0e] border border-[#262626] p-5 rounded-sm">
          <span class="text-[11px] font-mono text-[#9a9a9a] tracking-wider block mb-1">TOTAL SESSIONS</span>
          <span class="text-xs text-[#767676]">รอบให้บริการ</span>
          <div class="mt-3 text-3xl font-black text-white font-mono tracking-tight">
            {{ totalSessions }} <span class="text-sm font-normal text-[#767676]">รอบ</span>
          </div>
          <div class="mt-2 text-[10px] text-[#767676] font-mono">
            บันทึกแล้วในระบบ
          </div>
        </div>

        <!-- รายได้เสริม (เป้า+ลูกธนู) -->
        <div class="bg-[#0e0e0e] border border-[#262626] p-5 rounded-sm">
          <span class="text-[11px] font-mono text-[#9a9a9a] tracking-wider block mb-1">TARGETS & ARROWS</span>
          <span class="text-xs text-[#767676]">เป้าเพิ่ม / ปรับลูกธนู</span>
          <div class="mt-3 text-3xl font-black text-[#ececec] font-mono tracking-tight">
            ฿{{ extrasRevenue.toLocaleString('th-TH') }}
          </div>
          <div class="mt-2 text-[10px] text-[#767676] font-mono">
            เป้า {{ totalAdditionalTargets }} แผ่น · ลูกชำรุด {{ totalLostArrows }} ดอก
          </div>
        </div>

        <!-- สัดส่วนเงินสด / โอนจ่าย -->
        <div class="bg-[#0e0e0e] border border-[#262626] p-5 rounded-sm">
          <span class="text-[11px] font-mono text-[#9a9a9a] tracking-wider block mb-1">PAYMENT SPLIT</span>
          <span class="text-xs text-[#767676]">ช่องทางการรับเงิน</span>
          <div class="mt-3 space-y-1.5 text-xs font-mono">
            <div class="flex justify-between items-center">
              <span class="text-[#9a9a9a]">PromptPay:</span>
              <span class="font-bold text-white">฿{{ promptPayTotal.toLocaleString('th-TH') }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#9a9a9a]">Cash:</span>
              <span class="font-bold text-white">฿{{ cashTotal.toLocaleString('th-TH') }}</span>
            </div>
          </div>
        </div>

      </section>

      <!-- 2. แพ็กเกจยอดนิยม (Distribution) -->
      <section class="bg-[#0e0e0e] border border-[#262626] p-6 rounded-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-[#262626]">
          <h3 class="text-sm font-semibold text-white tracking-wide">สถิติแพ็กเกจที่ลูกค้าเลือก</h3>
          <span class="text-xs font-mono text-[#767676]">{{ packageStats.length }} รายการ</span>
        </div>

        <div v-if="loading" class="text-center py-6 text-xs text-[#5a5a5a]">กำลังโหลดข้อมูล...</div>
        <div v-else-if="packageStats.length === 0" class="text-center py-6 text-xs text-[#5a5a5a]">
          ยังไม่มีข้อมูลบริการในช่วงเวลานี้
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="stat in packageStats"
            :key="stat.name"
            class="bg-[#141414] border border-[#262626] p-4 rounded-sm space-y-3"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-sm font-medium text-white">{{ stat.name }}</h4>
                <p class="text-xs text-[#767676] font-mono mt-0.5">
                  {{ stat.count }} ครั้ง ({{ totalSessions > 0 ? Math.round((stat.count / totalSessions) * 100) : 0 }}%)
                </p>
              </div>
              <span class="text-sm font-mono font-bold text-[#ffc93c]">
                ฿{{ stat.revenue.toLocaleString('th-TH') }}
              </span>
            </div>

            <!-- Progress bar -->
            <div class="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
              <div
                class="bg-[#c9962b] h-full rounded-full transition-all duration-500"
                :style="{ width: `${totalSessions > 0 ? (stat.count / totalSessions) * 100 : 0}%` }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. ตารางประวัติรายการล่าสุด (Recent Transactions) -->
      <section class="bg-[#0e0e0e] border border-[#262626] rounded-sm overflow-hidden">
        <div class="p-5 border-b border-[#262626] flex items-center justify-between">
          <div>
            <h3 class="text-sm font-semibold text-white tracking-wide">ประวัติการทำรายการล่าสุด</h3>
            <p class="text-xs text-[#767676] font-mono">บันทึกเวลาจริงจากเคาน์เตอร์ POS</p>
          </div>
          <span class="text-xs font-mono text-[#c9962b]">{{ filteredLogs.length }} รายการ</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-[#141414] border-b border-[#262626] text-[#767676] font-mono">
              <tr>
                <th class="py-3 px-4">เวลา</th>
                <th class="py-3 px-4">ลูกค้า</th>
                <th class="py-3 px-4">แพ็กเกจ</th>
                <th class="py-3 px-4">รอบเวลา</th>
                <th class="py-3 px-4 text-center">เป้าเพิ่ม / ชำรุด</th>
                <th class="py-3 px-4">ช่องทาง</th>
                <th class="py-3 px-4 text-right">ยอดชำระ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#1f1f1f]">
              <tr v-if="filteredLogs.length === 0">
                <td colspan="7" class="text-center py-8 text-[#5a5a5a]">
                  ไม่พบข้อมูลรายการชำระเงิน
                </td>
              </tr>
              <tr
                v-for="log in filteredLogs"
                :key="log.id"
                class="hover:bg-[#141414] transition-colors duration-150"
              >
                <!-- เวลา -->
                <td class="py-3.5 px-4 font-mono text-[#9a9a9a]">
                  {{ formatTime(log.created_at) }}
                  <span class="text-[10px] text-[#5a5a5a] block">{{ formatDate(log.created_at) }}</span>
                </td>

                <!-- ลูกค้า -->
                <td class="py-3.5 px-4">
                  <div class="font-medium text-white">
                    {{ log.customers?.name || 'ลูกค้าทั่วไป (Walk-in)' }}
                  </div>
                  <div v-if="log.customers?.phone" class="text-[10px] text-[#767676] font-mono">
                    {{ log.customers.phone }}
                  </div>
                </td>

                <!-- แพ็กเกจ -->
                <td class="py-3.5 px-4 text-[#c9c9c9]">
                  {{ log.packages?.name || 'แพ็กเกจทั่วไป' }}
                </td>

                <!-- รอบเวลา -->
                <td class="py-3.5 px-4 font-mono text-[#9a9a9a]">
                  {{ log.round_time || '-' }}
                </td>

                <!-- เป้าเพิ่ม / ลูกธนูเสียหาย -->
                <td class="py-3.5 px-4 text-center font-mono">
                  <span v-if="log.additional_targets > 0" class="text-[#c9c9c9] mr-2">
                    เป้า +{{ log.additional_targets }}
                  </span>
                  <span v-if="log.lost_arrows > 0" class="text-[#c96a4a]">
                    ธนู -{{ log.lost_arrows }}
                  </span>
                  <span v-if="!log.additional_targets && !log.lost_arrows" class="text-[#5a5a5a]">
                    -
                  </span>
                </td>

                <!-- ช่องทางชำระเงิน -->
                <td class="py-3.5 px-4">
                  <span
                    :class="log.payment_method === 'PromptPay' ? 'text-[#ffc93c] border-[#ffc93c]/30' : 'text-[#c9c9c9] border-[#333]'"
                    class="px-2 py-0.5 rounded-sm border text-[10px] font-mono"
                  >
                    {{ log.payment_method }}
                  </span>
                </td>

                <!-- ยอดเงินสุทธิ -->
                <td class="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                  ฿{{ Number(log.total_amount).toLocaleString('th-TH') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </main>

  </div>
</template>