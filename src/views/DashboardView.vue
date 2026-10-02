<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const logs = ref([])
const loading = ref(true)

// วันที่ปัจจุบัน (Local YYYY-MM-DD)
const todayStr = new Date().toLocaleDateString('en-CA')
const selectedDate = ref(todayStr)
const dateFilter = ref('today') // 'today' | 'all'

const roundSlots = [
  { time: '11:00 - 12:00', label: 'รอบเช้า' },
  { time: '13:00 - 14:00', label: 'บ่าย 1' },
  { time: '14:30 - 15:30', label: 'บ่าย 2' },
  { time: '16:00 - 17:00', label: 'เย็น 1' },
  { time: '17:30 - 18:30', label: 'เย็น 2' }
]

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

// กรองข้อมูล
const filteredLogs = computed(() => {
  if (dateFilter.value === 'all') return logs.value
  return logs.value.filter(log => {
    if (!log.created_at) return false
    return new Date(log.created_at).toLocaleDateString('en-CA') === selectedDate.value
  })
})

// KPIs สรุปผล
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

// วิเคราะห์ Peak Hours (กราฟความหนาแน่นแต่ละรอบ)
const peakHourStats = computed(() => {
  const counts = {}
  roundSlots.forEach(s => { counts[s.time] = 0 })

  filteredLogs.value.forEach(log => {
    if (counts[log.round_time] !== undefined) {
      counts[log.round_time]++
    }
  })

  const maxVal = Math.max(...Object.values(counts), 1)

  return roundSlots.map(slot => {
    const count = counts[slot.time] || 0
    return {
      time: slot.time,
      label: slot.label,
      count,
      pct: Math.round((count / maxVal) * 100)
    }
  })
})

const peakSlot = computed(() => {
  const sorted = [...peakHourStats.value].sort((a, b) => b.count - a.count)
  return sorted[0]?.count > 0 ? sorted[0] : null
})

// Lane Occupancy (สมมติสนามมี 6 เลน x 5 รอบ = รองรับได้ 30 เซสชันต่อวัน)
const MAX_CAPACITY = 30
const occupancyRate = computed(() => {
  return Math.min(100, Math.round((totalSessions.value / MAX_CAPACITY) * 100))
})

// สัดส่วนแพ็กเกจ
const packageStats = computed(() => {
  const statsMap = {}
  filteredLogs.value.forEach(log => {
    const name = log.packages?.name || 'ทั่วไป'
    const price = Number(log.packages?.price || 0)
    if (!statsMap[name]) statsMap[name] = { name, count: 0, revenue: 0 }
    statsMap[name].count += 1
    statsMap[name].revenue += price
  })
  return Object.values(statsMap).sort((a, b) => b.count - a.count)
})

const formatTime = (iso) => {
  if (!iso) return '-'
  return new Date(iso).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (iso) => {
  if (!iso) return '-'
  return new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

onMounted(() => {
  fetchLogs()
})
</script>

<template>
  <div class="dash-root">
    <!-- Ambient Glow & Grain Background -->
    <div class="glow-layer" aria-hidden="true">
      <span class="glow glow-a"></span>
      <span class="glow glow-b"></span>
    </div>
    <div class="grain-layer" aria-hidden="true"></div>

    <div class="min-h-screen relative font-sans text-[#ececec]">
      
      <!-- Top Navigation -->
      <header class="h-16 px-6 flex items-center justify-between sticky top-0 z-30 header-surface">
        <div class="flex items-center gap-3">
          <svg viewBox="0 0 40 40" class="w-8 h-8 shrink-0">
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
            <circle cx="20" cy="20" r="11" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
            <circle cx="20" cy="20" r="3" fill="var(--gold-bright)"/>
          </svg>
          <div>
            <h1 class="text-sm font-bold tracking-[0.08em] text-[#ececec]">MR. HANDSOME ARCHERY</h1>
            <p class="text-[11px] font-mono text-[#9a9a9a]">ศูนย์วิเคราะห์ข้อมูลและสรุปยอดสนาม</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            @click="router.push('/pos')"
            class="btn-ghost flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium cursor-pointer"
          >
            <span>← กลับไปเคาน์เตอร์ POS</span>
          </button>

          <button
            @click="fetchLogs"
            :disabled="loading"
            class="btn-ghost px-3 py-1.5 text-xs font-mono cursor-pointer flex items-center gap-1.5"
            title="รีเฟรชข้อมูล"
          >
            <span :class="{ 'animate-spin': loading }">↻</span>
            <span class="hidden sm:inline">รีเฟรช</span>
          </button>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        <!-- Filter & Control Bar -->
        <div class="panel p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="label-eyebrow block mb-0.5">EXECUTIVE SUMMARY</span>
            <h2 class="text-base font-bold text-white tracking-wide">
              ภาพรวมผลประกอบการ
              <span class="text-xs font-mono font-normal text-[#9a9a9a] ml-2">
                ({{ dateFilter === 'today' ? `ประจำวันที่ ${selectedDate}` : 'ประวัติทั้งหมด' }})
              </span>
            </h2>
          </div>

          <div class="flex items-center gap-2.5">
            <div class="inline-flex rounded-sm border border-[var(--border)] bg-[var(--inset-bg)] p-0.5 text-xs">
              <button
                @click="dateFilter = 'today'"
                :class="dateFilter === 'today' ? 'bg-[var(--gold-bright)] text-black font-bold' : 'text-[#9a9a9a] hover:text-white'"
                class="px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer"
              >
                วันนี้
              </button>
              <button
                @click="dateFilter = 'all'"
                :class="dateFilter === 'all' ? 'bg-[var(--gold-bright)] text-black font-bold' : 'text-[#9a9a9a] hover:text-white'"
                class="px-3 py-1.5 rounded-sm transition-all duration-200 cursor-pointer"
              >
                ทั้งหมด
              </button>
            </div>

            <input
              v-if="dateFilter === 'today'"
              type="date"
              v-model="selectedDate"
              class="input-field text-xs py-1.5 px-3 font-mono cursor-pointer"
            >
          </div>
        </div>

        <!-- 1. KPI Cards Showcase -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Card 1: ยอดขายรวม (มี Corner Reticle สไตล์เป้าธนู) -->
          <div class="panel panel-strong p-5 relative overflow-hidden group">
            <span class="corner corner-tl"></span>
            <span class="corner corner-tr"></span>
            <div class="flex items-center justify-between">
              <span class="label-eyebrow">TOTAL REVENUE</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--gold-bright)]/10 text-[var(--gold-bright)]">สุทธิ</span>
            </div>
            <div class="mt-4 text-3xl font-black text-[var(--gold-bright)] font-mono tracking-tight">
              ฿{{ totalRevenue.toLocaleString('th-TH') }}
            </div>
            <p class="text-[11px] text-[#767676] font-mono mt-2 flex items-center justify-between">
              <span>เฉลี่ยต่อบิล:</span>
              <span class="text-[#cfcfcf]">฿{{ totalSessions > 0 ? Math.round(totalRevenue / totalSessions).toLocaleString('th-TH') : 0 }}</span>
            </p>
          </div>

          <!-- Card 2: จำนวนรอบให้บริการ -->
          <div class="panel p-5">
            <span class="label-eyebrow">TOTAL SESSIONS</span>
            <div class="mt-4 flex items-baseline gap-2">
              <span class="text-3xl font-black text-white font-mono tracking-tight">{{ totalSessions }}</span>
              <span class="text-xs text-[#767676]">รอบยิง</span>
            </div>
            <p class="text-[11px] text-[#767676] font-mono mt-2 flex items-center justify-between">
              <span>สถานะ:</span>
              <span class="text-emerald-400 font-semibold">Active Live</span>
            </p>
          </div>

          <!-- Card 3: รายได้อุปกรณ์ & ค่าปรับ -->
          <div class="panel p-5">
            <span class="label-eyebrow">TARGETS & ARROWS</span>
            <div class="mt-4 text-3xl font-black text-[#ececec] font-mono tracking-tight">
              ฿{{ extrasRevenue.toLocaleString('th-TH') }}
            </div>
            <p class="text-[11px] text-[#767676] font-mono mt-2 flex items-center justify-between">
              <span>เป้า +{{ totalAdditionalTargets }} แผ่น</span>
              <span class="text-[#d98a6b]">ลูกเสีย -{{ totalLostArrows }}</span>
            </p>
          </div>

          <!-- Card 4: สัดส่วนช่องทางชำระเงิน -->
          <div class="panel p-5 space-y-2">
            <span class="label-eyebrow">PAYMENT METHODS</span>
            <div class="space-y-1.5 pt-1 text-xs font-mono">
              <div class="flex justify-between items-center">
                <span class="text-[#9a9a9a] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-[var(--gold-bright)]"></span> PromptPay
                </span>
                <span class="font-bold text-white">฿{{ promptPayTotal.toLocaleString('th-TH') }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[#9a9a9a] flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-zinc-500"></span> เงินสด (Cash)
                </span>
                <span class="font-bold text-white">฿{{ cashTotal.toLocaleString('th-TH') }}</span>
              </div>
            </div>
          </div>

        </section>

        <!-- 2. Interactive Charts & Capacity Grid -->
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- กราฟแท่ง Peak Hours (7 Columns) -->
          <div class="lg:col-span-7 panel p-6 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div>
                <span class="label-eyebrow">ANALYTICS</span>
                <h3 class="text-sm font-semibold text-white">ความหนาแน่นตามช่วงเวลา (Peak Hours)</h3>
              </div>
              <span v-if="peakSlot" class="text-[11px] font-mono text-[var(--gold-bright)] bg-[var(--gold-bright)]/10 px-2.5 py-1 rounded-sm border border-[var(--gold-bright)]/30">
                พีคสุด: {{ peakSlot.label }} ({{ peakSlot.count }} บิล)
              </span>
            </div>

            <!-- กราฟแท่ง SVG / Flex Display -->
            <div class="h-44 flex items-end justify-between gap-3 pt-6 px-2">
              <div
                v-for="item in peakHourStats"
                :key="item.time"
                class="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
              >
                <div class="text-[11px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {{ item.count }}
                </div>
                
                <div class="w-full bg-[var(--inset-bg)] rounded-sm h-full flex items-end p-1 max-w-[48px]">
                  <div
                    class="w-full rounded-sm transition-all duration-500"
                    :class="item.count === peakSlot?.count && item.count > 0 ? 'bg-[var(--gold-bright)] shadow-lg shadow-[var(--gold-bright)]/20' : 'bg-[var(--gold)]/40 group-hover:bg-[var(--gold)]/70'"
                    :style="{ height: `${Math.max(8, item.pct)}%` }"
                  ></div>
                </div>

                <div class="text-center">
                  <span class="text-xs font-mono font-medium block text-[#ececec]">{{ item.label }}</span>
                  <span class="text-[10px] text-[#767676] font-mono block">{{ item.time.split(' - ')[0] }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Lane Occupancy & Package Distribution (5 Columns) -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Lane Occupancy Gauge -->
            <div class="panel p-5 space-y-3">
              <div class="flex justify-between items-center">
                <span class="label-eyebrow">LANE OCCUPANCY</span>
                <span class="text-xs font-mono font-bold text-[var(--gold-bright)]">{{ occupancyRate }}%</span>
              </div>
              <div class="flex items-baseline justify-between">
                <span class="text-xs text-[#cfcfcf]">อัตราการใช้งานสนามวันนี้</span>
                <span class="text-[11px] font-mono text-[#767676]">{{ totalSessions }} / {{ MAX_CAPACITY }} ช่องยิง</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: `${occupancyRate}%` }"></div>
              </div>
            </div>

            <!-- สัดส่วนแพ็กเกจยอดนิยม -->
            <div class="panel p-5 space-y-3">
              <span class="label-eyebrow block">POPULAR PACKAGES</span>
              <div v-if="packageStats.length === 0" class="text-xs text-[#767676] py-3 text-center">
                ยังไม่มีข้อมูลบริการ
              </div>
              <div v-else class="space-y-3">
                <div v-for="pkg in packageStats" :key="pkg.name" class="space-y-1">
                  <div class="flex justify-between text-xs font-mono">
                    <span class="text-white">{{ pkg.name }}</span>
                    <span class="text-[var(--gold-bright)]">{{ pkg.count }} ครั้ง</span>
                  </div>
                  <div class="w-full bg-[var(--inset-bg)] h-1.5 rounded-full overflow-hidden">
                    <div
                      class="bg-[var(--gold)] h-full rounded-full"
                      :style="{ width: `${totalSessions > 0 ? (pkg.count / totalSessions) * 100 : 0}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>

        <!-- 3. Recent Transactions Table -->
        <section class="panel panel-strong overflow-hidden">
          <div class="p-5 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <span class="label-eyebrow">ACTIVITY FEED</span>
              <h3 class="text-sm font-semibold text-white tracking-wide">ประวัติการทำรายการล่าสุด</h3>
            </div>
            <span class="text-xs font-mono text-[var(--gold-bright)]">{{ filteredLogs.length }} รายการ</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-[var(--inset-bg)] border-b border-[var(--border)] text-[#9a9a9a] font-mono">
                <tr>
                  <th class="py-3 px-4">เวลา</th>
                  <th class="py-3 px-4">ลูกค้า</th>
                  <th class="py-3 px-4">แพ็กเกจ</th>
                  <th class="py-3 px-4">รอบเวลา</th>
                  <th class="py-3 px-4 text-center">เป้า / ธนู</th>
                  <th class="py-3 px-4">ช่องทาง</th>
                  <th class="py-3 px-4 text-right">ยอดสุทธิ</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--border)]">
                <tr v-if="filteredLogs.length === 0">
                  <td colspan="7" class="text-center py-8 text-[#767676]">
                    ไม่พบรายการชำระเงินในช่วงเวลานี้
                  </td>
                </tr>
                <tr
                  v-for="log in filteredLogs"
                  :key="log.id"
                  class="hover:bg-[var(--inset-bg)] transition-colors duration-150"
                >
                  <td class="py-3 px-4 font-mono text-[#9a9a9a]">
                    {{ formatTime(log.created_at) }}
                    <span class="text-[10px] text-[#6a6a6a] block">{{ formatDate(log.created_at) }}</span>
                  </td>
                  <td class="py-3 px-4">
                    <div class="font-medium text-white">
                      {{ log.customers?.name || 'ลูกค้าทั่วไป (Walk-in)' }}
                    </div>
                    <div v-if="log.customers?.phone" class="text-[10px] text-[#767676] font-mono">
                      {{ log.customers.phone }}
                    </div>
                  </td>
                  <td class="py-3 px-4 text-[#cfcfcf]">
                    {{ log.packages?.name || 'แพ็กเกจทั่วไป' }}
                  </td>
                  <td class="py-3 px-4 font-mono text-[#9a9a9a]">
                    {{ log.round_time || '-' }}
                  </td>
                  <td class="py-3 px-4 text-center font-mono text-[11px]">
                    <span v-if="log.additional_targets > 0" class="text-[#ececec] mr-1.5">
                      +{{ log.additional_targets }}🎯
                    </span>
                    <span v-if="log.lost_arrows > 0" class="text-[#d98a6b]">
                      -{{ log.lost_arrows }}🏹
                    </span>
                    <span v-if="!log.additional_targets && !log.lost_arrows" class="text-[#6a6a6a]">-</span>
                  </td>
                  <td class="py-3 px-4">
                    <span
                      :class="log.payment_method === 'PromptPay' ? 'text-[var(--gold-bright)] border-[var(--gold-bright)]/40 bg-[var(--gold-bright)]/5' : 'text-[#9a9a9a] border-[var(--border)]'"
                      class="px-2 py-0.5 rounded-sm border text-[10px] font-mono"
                    >
                      {{ log.payment_method }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right font-mono font-bold text-white text-sm">
                    ฿{{ Number(log.total_amount).toLocaleString('th-TH') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

    </div>
  </div>
</template>

<style scoped>
/* ดีไซน์โทนเดียวกับ POS */
.dash-root {
  --bg: #0a0a0a;
  --panel-bg: rgba(24, 24, 24, 0.55);
  --panel-bg-strong: rgba(20, 20, 20, 0.7);
  --inset-bg: rgba(255, 255, 255, 0.03);
  --border: rgba(255, 255, 255, 0.09);
  --gold: #c9962b;
  --gold-bright: #ffc93c;
  --glow-color: 255, 201, 60;
  --glow-opacity: 0.14;
  background: var(--bg);
  min-height: 100vh;
  position: relative;
}

/* Ambient glow */
.glow-layer { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(90px);
  background: radial-gradient(circle, rgba(var(--glow-color), var(--glow-opacity)) 0%, rgba(var(--glow-color), 0) 70%);
  animation: drift 22s ease-in-out infinite;
}
.glow-a { width: 520px; height: 520px; top: -120px; left: -80px; }
.glow-b { width: 460px; height: 460px; bottom: -140px; right: -60px; animation-delay: -11s; }
@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, 15px) scale(1.06); }
}

/* Grain overlay */
.grain-layer {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  opacity: 0.035; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Glass Panels */
.panel {
  position: relative; z-index: 2;
  background: var(--panel-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 10px;
}
.panel-strong { background: var(--panel-bg-strong); }
.header-surface {
  background: var(--panel-bg-strong);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  position: relative; z-index: 20;
}

.label-eyebrow { font-size: 11px; font-family: ui-monospace, monospace; color: var(--gold); letter-spacing: 0.12em; }

.btn-ghost {
  border-radius: 6px; border: 1px solid var(--border); color: #cfcfcf;
  background: var(--inset-bg); transition: border-color .2s, color .2s;
}
.btn-ghost:hover { border-color: var(--gold); color: var(--gold-bright); }

.input-field {
  background: var(--inset-bg); border: 1px solid var(--border); border-radius: 6px;
  color: #ececec; outline: none; transition: border-color .2s;
}
.input-field:focus { border-color: var(--gold); }

.progress-track { width: 100%; background: var(--inset-bg); height: 6px; border-radius: 9999px; overflow: hidden; }
.progress-fill { background: var(--gold-bright); height: 100%; border-radius: 9999px; transition: width .5s ease-out; }

/* Reticle corners */
.corner { position: absolute; width: 10px; height: 10px; border-color: rgba(var(--glow-color), 0.5); }
.corner-tl { top: 8px; left: 8px; border-top: 1px solid; border-left: 1px solid; }
.corner-tr { top: 8px; right: 8px; border-top: 1px solid; border-right: 1px solid; }
</style>