<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="font-body-md text-on-surface antialiased bg-[#121212] min-h-screen flex flex-col">
    <!-- TopNavBar -->
    <nav class="flex justify-between items-center w-full px-6 md:px-12 h-20 sticky top-0 z-50 bg-[#181818]/95 backdrop-blur-sm border-b border-[#383838]">
      <div class="flex items-center gap-3">
        <router-link to="/" class="text-2xl font-extrabold text-primary tracking-tighter cursor-pointer active:scale-95 duration-200">
          MR.HANDSOME
        </router-link>
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a class="text-sm font-semibold text-on-secondary hover:text-primary transition-colors hover:bg-white/10 px-3 py-2 rounded-md" href="#services">บริการ</a>
        <a class="text-sm font-semibold text-on-secondary hover:text-primary transition-colors hover:bg-white/10 px-3 py-2 rounded-md" href="#pricing">ราคา</a>
        <router-link to="/schedule" class="text-sm font-semibold text-on-secondary hover:text-primary transition-colors hover:bg-white/10 px-3 py-2 rounded-md">จองเลน</router-link>
        <router-link to="/equipment" class="text-sm font-semibold text-on-secondary hover:text-primary transition-colors hover:bg-white/10 px-3 py-2 rounded-md">อุปกรณ์</router-link>
        <router-link to="/my-bookings" class="text-sm font-semibold text-on-secondary hover:text-primary transition-colors hover:bg-white/10 px-3 py-2 rounded-md">บัตรจอง</router-link>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative w-full h-[600px] flex items-center justify-start px-6 md:px-12 bg-tactical-charcoal overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGQE6uJZFyllvKU4bz4GWIVUTrn29WYMR4lpXx-2WrcEewvmvaBVOGmejncqPk-Wq5H7tHo_lEyxs69XkYAqEz5tYBFCjC1fakt8NMnCuOq7tDUDmSe-G3Gl98-jxBCPuDyLz-cH6qKW1tQRMkoGTHEmJiErjtdIfvs9qkp1XxPGtg5KN3YZvxOMkO0Rfxcyme8YNT-2BQ1mmb3mbO7ZA5ALb_mvko2UOPoQf7YmxoaTew1pgbKaVAdg')"
      ></div>
      <div class="relative z-10 max-w-2xl text-left">
        <div class="mb-4 inline-flex items-center gap-2 bg-tactical-mustard text-[#1a1a1a] px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">
          <span class="material-symbols-outlined text-[18px]">schedule</span>
          เปิดให้บริการทุกวัน 11:00 - 18:30 น. (ยกเว้นวันพุธ)
        </div>
        <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-3 uppercase tracking-tight">
          แม่นยำในทุกการยิง
        </h1>
        <p class="text-base md:text-lg text-[#bfbfbb] mb-8 leading-relaxed">
          เชี่ยวชาญศิลปะการยิงธนูด้วยอุปกรณ์ระดับมืออาชีพ การฝึกสอน และสิ่งอำนวยความสะดวกที่ออกแบบมาสำหรับผู้แข่งขันตัวจริง
        </p>
        <router-link 
          to="/schedule"
          class="bg-tactical-mustard text-[#1a1a1a] font-bold py-4 px-8 rounded-xl hover:scale-105 transition-all shadow-lg shadow-tactical-mustard/30 cursor-pointer inline-flex items-center gap-2"
        >
          <span>จองรอบ</span>
          <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
        </router-link>
      </div>
    </header>

    <!-- Services Section -->
    <section id="services" class="py-16 px-6 md:px-12 bg-[#121212]">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">สิ่งอำนวยความสะดวกชั้นยอด</h2>
          <div class="h-1 w-16 bg-tactical-mustard mx-auto mt-2 rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-[#181818] border border-[#383838] rounded-xl p-6 relative overflow-hidden group hover:border-primary transition-all">
            <span class="material-symbols-outlined text-4xl text-tactical-mustard mb-3 block">sports_martial_arts</span>
            <h3 class="text-lg font-bold text-white mb-2">การฝึกสอนระดับมืออาชีพ</h3>
            <p class="text-sm text-[#bfbfbb]">เซสชันแบบตัวต่อตัวกับผู้เชี่ยวชาญที่ได้รับการรับรองเพื่อขัดเกลาเทคนิคและสมาธิของคุณ</p>
          </div>
          <div class="bg-[#181818] border border-[#383838] rounded-xl p-6 relative overflow-hidden group hover:border-primary transition-all">
            <span class="material-symbols-outlined text-4xl text-tactical-mustard mb-3 block">my_location</span>
            <h3 class="text-lg font-bold text-white mb-2">เช่าสนามยิงธนู</h3>
            <p class="text-sm text-[#bfbfbb]">เข้าใช้สนามยิงธนูในร่มระยะ 18 เมตร และ 30 เมตรที่ควบคุมอุณหภูมิได้ เหมาะสำหรับการฝึกซ้อม</p>
          </div>
          <div class="bg-[#181818] border border-[#383838] rounded-xl p-6 relative overflow-hidden group hover:border-primary transition-all">
            <span class="material-symbols-outlined text-4xl text-tactical-mustard mb-3 block">storefront</span>
            <h3 class="text-lg font-bold text-white mb-2">โปรช็อป</h3>
            <p class="text-sm text-[#bfbfbb]">บริการปรับแต่ง บำรุงรักษาแบบครบวงจร และตัวเลือกอุปกรณ์ระดับพรีเมียมจากแบรนด์ชั้นนำ</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-16 px-6 md:px-12 bg-[#181818]">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">ประเภทธนูและอัตราค่าบริการ</h2>
          <div class="h-1 w-16 bg-tactical-mustard mx-auto mt-2 rounded-full"></div>
          <p class="text-sm text-[#bfbfbb] mt-2">ทุกเซสชันรวมอุปกรณ์และมีเจ้าหน้าที่ผู้เชี่ยวชาญดูแลสอนเทคนิค</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-[#262626] border border-[#383838] rounded-xl p-6 shadow-sm">
            <h3 class="text-xl font-bold text-white mb-2">Olympic Recurve</h3>
            <p class="text-sm text-[#bfbfbb] mb-4">มีศูนย์เล็งในการยิง (พัฒนาต่อเป็นนักกีฬาได้)</p>
            <ul class="text-sm text-stone-200 space-y-2">
              <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">check</span> ครั้งแรก: 350 + 20 (ค่าเป้า) บาท / ชม. / คน</li>
              <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">check</span> ครั้งต่อไป: 300 + 20 (ค่าเป้า) บาท / ชม. / คน</li>
            </ul>
          </div>
          <div class="bg-[#262626] border border-[#383838] rounded-xl p-6 shadow-sm">
            <h3 class="text-xl font-bold text-white mb-2">Bare Bow</h3>
            <p class="text-sm text-[#bfbfbb] mb-4">ไม่มีศูนย์เล็งในการยิง เน้นสัญชาตญาณและความแม่นยำ</p>
            <ul class="text-sm text-stone-200 space-y-2">
              <li class="flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">check</span> ราคาเดียว: 300 + 20 (ค่าเป้า) บาท / ชม. / คน</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="w-full py-8 px-6 md:px-12 bg-[#121212] border-t border-[#383838] mt-auto">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#bfbfbb]">
        <div>© 2026 MR.HANDSOME Archery Club. Precision & Power. All rights reserved.</div>
        <button 
          @click="router.push('/pos')"
          class="text-[#555] hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>🔒</span>
          <span>Staff Portal</span>
        </button>
      </div>
    </footer>
  </div>
</template>