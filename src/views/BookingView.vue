<!--
  src/views/BookingView.vue
  ฟอร์มกรอกข้อมูลผู้จอง (นำอุปกรณ์มาเอง 100 ฿/ชม. ถ้วน + สรุปบิลแยกสัดส่วนชัดเจน)
  - นำช่องคำขอพิเศษออกเพื่อความกระชับและรวดเร็วในการจอง
-->
<template>
  <div class="min-h-screen flex flex-col bg-[#121212] text-stone-100 font-sans antialiased" lang="th">
    
    <!-- Header / Navbar -->
    <header class="fixed top-0 w-full z-50 bg-[#181818]/95 backdrop-blur-xl border-b border-[#383838]">
      <div class="h-14 sm:h-16 w-full px-4 md:px-12 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <router-link to="/" class="font-extrabold text-lg sm:text-xl text-[#ffd700] uppercase tracking-wider">
            MR.HANDSOME
          </router-link>
        </div>
        <nav class="hidden md:flex items-center gap-6">
          <a class="text-stone-400 hover:text-[#ffd700] font-semibold text-sm uppercase tracking-wider transition-colors" href="/#services">บริการ</a>
          <router-link class="uppercase tracking-wider transition-colors bg-[#ffd700] text-black font-bold text-sm rounded-lg px-3 py-1.5" to="/schedule">การจอง</router-link>
          <router-link class="text-stone-400 hover:text-[#ffd700] font-semibold text-sm uppercase tracking-wider transition-colors" to="/equipment">อุปกรณ์</router-link>
          <router-link class="text-stone-400 hover:text-[#ffd700] font-semibold text-sm uppercase tracking-wider transition-colors" to="/my-bookings">บัตรจอง</router-link>
        </nav>
      </div>
    </header>

    <!-- Stepper Breadcrumb -->
    <section class="w-full bg-[#181818] py-2.5 sm:py-3.5 mt-14 sm:mt-16 border-b border-[#2c2c2c]">
      <div class="w-full px-4 md:px-12">
        <div class="max-w-5xl mx-auto">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 items-center">
            
            <!-- Step 1 -->
            <div class="flex items-center gap-2 sm:gap-3">
              <router-link to="/schedule" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#262626] text-[#ffd700] flex items-center justify-center text-xs shrink-0 border border-[#383838] active:scale-95 transition">
                <span class="material-symbols-outlined text-[16px] sm:text-[18px]">check</span>
              </router-link>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] text-stone-400 uppercase tracking-wider">ขั้นตอน 1</span>
                <span class="text-xs text-stone-200 truncate">เลือกรอบเวลา</span>
              </div>
            </div>

            <!-- Step 2 (Active) -->
            <div class="flex items-center gap-2 sm:gap-3 p-1 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/30">
              <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffd700] text-black flex items-center justify-center font-bold shrink-0 shadow-sm text-xs">
                <span class="material-symbols-outlined text-[16px] sm:text-[18px]">verified</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] text-[#ffd700] font-bold uppercase tracking-wider">กำลังทำ</span>
                <span class="text-xs text-stone-100 font-bold truncate">2. ข้อมูล & ธนู</span>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="hidden sm:flex items-center gap-3 opacity-45">
              <div class="w-9 h-9 rounded-full bg-[#262626] text-stone-400 flex items-center justify-center text-xs shrink-0 border border-[#383838]">
                03
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] text-stone-400 uppercase tracking-widest">ขั้นตอนถัดไป</span>
                <span class="text-xs text-stone-400 truncate">3. ยืนยันการจอง</span>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="hidden sm:flex items-center gap-3 opacity-45">
              <div class="w-9 h-9 rounded-full bg-[#262626] text-stone-400 flex items-center justify-center text-xs shrink-0 border border-[#383838]">
                04
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-[10px] text-stone-400 uppercase tracking-widest">ขั้นตอนถัดไป</span>
                <span class="text-xs text-stone-400 truncate">บันทึก E-Ticket</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Main Container -->
    <main class="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
      <div class="mb-6 sm:mb-8">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-100 tracking-tight flex items-center gap-2">
          กรอกข้อมูลผู้จองและรายละเอียดการฝึกซ้อม
        </h1>
        <p class="text-stone-400 text-xs sm:text-sm mt-1">
          เลือกรูปแบบการใช้อุปกรณ์และระดับประสบการณ์ (แตะซ้ำเพื่อยกเลิกตัวเลือกได้)
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <!-- Form Section (8 cols) -->
        <div class="lg:col-span-8 space-y-5 sm:space-y-6">
          
          <!-- 1. ข้อมูลติดต่อหลัก -->
          <div class="bg-[#181818] rounded-2xl p-4 sm:p-6 md:p-8 border border-[#2c2c2c] shadow-sm">
            <div class="flex items-center gap-2.5 mb-4 sm:mb-6 pb-3 border-b border-[#2c2c2c]">
              <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#ffd700]/15 text-[#ffd700] flex items-center justify-center font-bold text-sm border border-[#ffd700]/30 shrink-0">
                <span class="material-symbols-outlined text-[18px] sm:text-[20px]">person</span>
              </div>
              <div>
                <h2 class="text-base sm:text-lg font-bold text-stone-100">ข้อมูลผู้ติดต่อหลัก</h2>
                <p class="text-[11px] sm:text-xs text-stone-400">ใช้สำหรับแจ้งเตือนและระบุตัวตนหน้าเคาน์เตอร์</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- ชื่อ - นามสกุล -->
              <div>
                <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  ชื่อ - นามสกุล <span class="text-red-400">*</span>
                </label>
                <input
                  v-model.trim="form.name"
                  type="text"
                  placeholder="ระบุชื่อและนามสกุลจริง"
                  :class="[
                    'w-full px-3.5 py-3 rounded-xl border bg-[#222222] text-stone-100 placeholder-stone-500 outline-none transition text-base sm:text-sm font-medium focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]',
                    errors.name ? 'border-red-500' : 'border-[#383838]'
                  ]"
                />
              </div>

              <!-- เบอร์โทรศัพท์ -->
              <div>
                <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  เบอร์โทรศัพท์ติดต่อ <span class="text-red-400">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-3.5 text-stone-500 flex items-center">
                    <span class="material-symbols-outlined text-[18px]">call</span>
                  </span>
                  <input
                    v-model.trim="form.phone"
                    type="tel"
                    inputmode="numeric"
                    maxlength="10"
                    placeholder="08XXXXXXXX"
                    :class="[
                      'w-full pl-10 pr-3.5 py-3 rounded-xl border bg-[#222222] text-stone-100 placeholder-stone-500 outline-none transition text-base sm:text-sm font-medium focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]',
                      errors.phone ? 'border-red-500' : 'border-[#383838]'
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 2. การจัดเตรียมอุปกรณ์ & คันธนู -->
          <div class="bg-[#181818] rounded-2xl p-4 sm:p-6 md:p-8 border border-[#2c2c2c] shadow-sm">
            <div class="flex items-center gap-2.5 mb-4 sm:mb-6 pb-3 border-b border-[#2c2c2c]">
              <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#ffd700]/15 text-[#ffd700] flex items-center justify-center font-bold text-sm border border-[#ffd700]/30 shrink-0">
                <span class="material-symbols-outlined text-[18px] sm:text-[20px]">sports_martial_arts</span>
              </div>
              <div>
                <h2 class="text-base sm:text-lg font-bold text-stone-100">การจัดเตรียมอุปกรณ์ & คันธนู</h2>
                <p class="text-[11px] sm:text-xs text-stone-400">เลือกรูปแบบอุปกรณ์ที่ต้องการใช้บริการ</p>
              </div>
            </div>

            <!-- เลือกอุปกรณ์สนาม หรือ นำมาเอง -->
            <div class="mb-5 sm:mb-6">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  รูปแบบอุปกรณ์ <span class="text-red-400">*</span>
                </label>
                <span v-if="form.gear" class="text-[11px] text-[#ffd700] cursor-pointer hover:underline" @click="handleToggleGear('')">
                  ยกเลิกเลือก
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <!-- ใช้อุปกรณ์สนาม -->
                <div
                  @click="handleToggleGear('rental')"
                  :class="[
                    'p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all border flex items-start gap-3 active:scale-[0.98] select-none',
                    form.gear === 'rental'
                      ? 'border-[#ffd700] bg-[#ffd700]/10 ring-1 ring-[#ffd700]'
                      : 'border-[#383838] bg-[#222222] hover:border-[#555]'
                  ]"
                >
                  <span :class="['w-4 h-4 rounded-full mt-0.5 flex items-center justify-center text-[10px] shrink-0', form.gear === 'rental' ? 'bg-[#ffd700] text-black font-black' : 'border border-stone-600']">
                    {{ form.gear === 'rental' ? '✓' : '' }}
                  </span>
                  <div>
                    <div class="font-bold text-xs sm:text-sm text-stone-100">ใช้อุปกรณ์ของสนาม (ครบชุด)</div>
                    <p class="text-[11px] text-stone-400 mt-1">คันธนู + ลูกธนู 12 ลูก + การ์ดนิ้วและแขน</p>
                    <span class="inline-block mt-2 text-[11px] font-bold text-[#ffd700] bg-[#ffd700]/20 px-2 py-0.5 rounded">
                      รวมค่าอุปกรณ์ในแพ็กเกจแล้ว
                    </span>
                  </div>
                </div>

                <!-- นำอุปกรณ์มาเอง -->
                <div
                  @click="handleToggleGear('own')"
                  :class="[
                    'p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all border flex items-start gap-3 active:scale-[0.98] select-none',
                    form.gear === 'own'
                      ? 'border-[#ffd700] bg-[#ffd700]/10 ring-1 ring-[#ffd700]'
                      : 'border-[#383838] bg-[#222222] hover:border-[#555]'
                  ]"
                >
                  <span :class="['w-4 h-4 rounded-full mt-0.5 flex items-center justify-center text-[10px] shrink-0', form.gear === 'own' ? 'bg-[#ffd700] text-black font-black' : 'border border-stone-600']">
                    {{ form.gear === 'own' ? '✓' : '' }}
                  </span>
                  <div>
                    <div class="font-bold text-xs sm:text-sm text-stone-100">นำอุปกรณ์ธนูส่วนตัวมาเอง</div>
                    <p class="text-[11px] text-stone-400 mt-1">มีค่านำอุปกรณ์เข้าใช้สนาม 100 ฿ /ชม.</p>
                    <span class="inline-block mt-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                      100 ฿ / ชม. (ฟรีค่าเป้าและลาน)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- กล่องเลือกประเภทคันธนู: แสดงเมื่อเลือกใช้อุปกรณ์สนาม -->
            <transition name="fade">
              <div v-if="form.gear === 'rental'" class="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-[#222222] border border-[#383838]">
                <div class="flex justify-between items-center mb-2.5">
                  <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    เลือกประเภทคันธนูของสนาม <span class="text-red-400">*</span>
                  </label>
                  <span v-if="form.bowType" class="text-[11px] text-[#ffd700] cursor-pointer hover:underline" @click="form.bowType = ''">
                    ยกเลิกเลือก
                  </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <!-- Olympic Recurve -->
                  <div
                    @click="toggle('bowType', 'Olympic Recurve')"
                    :class="[
                      'p-3.5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between active:scale-[0.98] select-none',
                      form.bowType === 'Olympic Recurve'
                        ? 'border-[#ffd700] bg-[#ffd700]/10 ring-1 ring-[#ffd700]'
                        : 'border-[#383838] bg-[#1a1a1a] hover:border-[#555]'
                    ]"
                  >
                    <div class="flex items-center justify-between font-bold text-sm text-stone-100">
                      <span>Olympic Recurve</span>
                      <span :class="['w-4 h-4 rounded-full flex items-center justify-center text-[10px]', form.bowType === 'Olympic Recurve' ? 'bg-[#ffd700] text-black font-black' : 'border border-stone-600']">
                        {{ form.bowType === 'Olympic Recurve' ? '✓' : '' }}
                      </span>
                    </div>
                    <p class="text-xs text-stone-400 mt-1">มีศูนย์เล็ง สไตล์นักกีฬาแข่งขัน</p>
                    <span class="text-xs font-bold text-[#ffd700] mt-2">350 ฿ (ครั้งแรก) / 300 ฿ (ครั้งต่อไป)</span>
                  </div>

                  <!-- Bare Bow -->
                  <div
                    @click="toggle('bowType', 'Bare Bow')"
                    :class="[
                      'p-3.5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between active:scale-[0.98] select-none',
                      form.bowType === 'Bare Bow'
                        ? 'border-[#ffd700] bg-[#ffd700]/10 ring-1 ring-[#ffd700]'
                        : 'border-[#383838] bg-[#1a1a1a] hover:border-[#555]'
                    ]"
                  >
                    <div class="flex items-center justify-between font-bold text-sm text-stone-100">
                      <span>Bare Bow</span>
                      <span :class="['w-4 h-4 rounded-full flex items-center justify-center text-[10px]', form.bowType === 'Bare Bow' ? 'bg-[#ffd700] text-black font-black' : 'border border-stone-600']">
                        {{ form.bowType === 'Bare Bow' ? '✓' : '' }}
                      </span>
                    </div>
                    <p class="text-xs text-stone-400 mt-1">ไม่มีศูนย์เล็ง เน้นสัญชาตญาณ</p>
                    <span class="text-xs font-bold text-emerald-400 mt-2">300 ฿ / ชม. (ราคาเดียว)</span>
                  </div>
                </div>
              </div>
            </transition>

            <!-- เลือกระดับประสบการณ์ -->
            <div class="mb-5 sm:mb-6">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  ระดับประสบการณ์ <span class="text-red-400">*</span>
                </label>
                <span v-if="form.experience" class="text-[11px] text-[#ffd700] cursor-pointer hover:underline" @click="form.experience = ''">
                  ยกเลิกเลือก
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <!-- Beginner -->
                <div
                  @click="toggle('experience', 'beginner')"
                  :class="[
                    'p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between active:scale-[0.98] select-none',
                    form.experience === 'beginner'
                      ? 'border-[#ffd700] bg-[#ffd700]/10 ring-1 ring-[#ffd700]'
                      : 'border-[#383838] bg-[#222222] hover:border-[#555]'
                  ]"
                >
                  <div class="flex items-center justify-between font-bold text-xs sm:text-sm text-stone-100">
                    <span>มือใหม่ / ครั้งแรก</span>
                    <span :class="['w-4 h-4 rounded-full flex items-center justify-center text-[10px]', form.experience === 'beginner' ? 'bg-[#ffd700] text-black font-black' : 'border border-stone-600']">
                      {{ form.experience === 'beginner' ? '✓' : '' }}
                    </span>
                  </div>
                  <span class="text-[11px] text-stone-400 mt-1">มีโค้ชแนะนำพื้นฐาน 15 นาที</span>
                </div>

                <!-- Intermediate -->
                <div
                  @click="toggle('experience', 'intermediate')"
                  :class="[
                    'p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between active:scale-[0.98] select-none',
                    form.experience === 'intermediate'
                      ? 'border-[#ffd700] bg-[#ffd700]/10 ring-1 ring-[#ffd700]'
                      : 'border-[#383838] bg-[#222222] hover:border-[#555]'
                  ]"
                >
                  <div class="flex items-center justify-between font-bold text-xs sm:text-sm text-stone-100">
                    <span>มีประสบการณ์บ้าง</span>
                    <span :class="['w-4 h-4 rounded-full flex items-center justify-center text-[10px]', form.experience === 'intermediate' ? 'bg-[#ffd700] text-black font-black' : 'border border-stone-600']">
                      {{ form.experience === 'intermediate' ? '✓' : '' }}
                    </span>
                  </div>
                  <span class="text-[11px] text-stone-400 mt-1">ยิงเป็นประจำ เข้าใจฟอร์ม</span>
                </div>

                <!-- Expert -->
                <div
                  @click="toggle('expert', 'expert')"
                  :class="[
                    'p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between active:scale-[0.98] select-none',
                    form.experience === 'expert'
                      ? 'border-[#ffd700] bg-[#ffd700]/10 ring-1 ring-[#ffd700]'
                      : 'border-[#383838] bg-[#222222] hover:border-[#555]'
                  ]"
                >
                  <div class="flex items-center justify-between font-bold text-xs sm:text-sm text-stone-100">
                    <span>นักกีฬา / ขั้นสูง</span>
                    <span :class="['w-4 h-4 rounded-full flex items-center justify-center text-[10px]', form.experience === 'expert' ? 'bg-[#ffd700] text-black font-black' : 'border border-stone-600']">
                      {{ form.experience === 'expert' ? '✓' : '' }}
                    </span>
                  </div>
                  <span class="text-[11px] text-stone-400 mt-1">ซ้อมแข่ง จัดจังหวะยิงเอง</span>
                </div>
              </div>
            </div>

            <!-- มือข้างที่ถนัดในการน้าวสาย -->
            <div class="pt-4 border-t border-[#2c2c2c]">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  มือข้างที่ถนัดในการน้าวสาย <span class="text-red-400">*</span>
                </label>
                <span v-if="form.dominantHand" class="text-[11px] text-[#ffd700] cursor-pointer hover:underline" @click="form.dominantHand = ''">
                  ยกเลิกเลือก
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="toggle('dominantHand', 'right')"
                  :class="[
                    'py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer active:scale-95 flex items-center justify-center gap-2 select-none',
                    form.dominantHand === 'right'
                      ? 'border-[#ffd700] bg-[#ffd700] text-black shadow-md shadow-[#ffd700]/20'
                      : 'border-[#383838] bg-[#222222] text-stone-300 hover:border-[#555]'
                  ]"
                >
                  <span>ถนัดขวา (Right-hand)</span>
                </button>
                <button
                  type="button"
                  @click="toggle('dominantHand', 'left')"
                  :class="[
                    'py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer active:scale-95 flex items-center justify-center gap-2 select-none',
                    form.dominantHand === 'left'
                      ? 'border-[#ffd700] bg-[#ffd700] text-black shadow-md shadow-[#ffd700]/20'
                      : 'border-[#383838] bg-[#222222] text-stone-300 hover:border-[#555]'
                  ]"
                >
                  <span>ถนัดซ้าย (Left-hand)</span>
                </button>
              </div>
            </div>

          </div>

          <!-- 3. ข้อตกลงความปลอดภัย -->
          <div class="bg-[#ffd700]/10 rounded-2xl p-4 sm:p-5 border border-[#ffd700]/30 flex items-start gap-3">
            <input
              v-model="form.agreeRules"
              type="checkbox"
              id="agree_rules"
              class="mt-1 w-4 h-4 accent-[#ffd700] cursor-pointer shrink-0"
            />
            <label for="agree_rules" class="text-xs text-stone-300 leading-relaxed cursor-pointer select-none">
              ข้าพเจ้ายินยอมปฏิบัติตาม <strong class="text-stone-100">กฎความปลอดภัยของ MR.HANDSOME</strong> โดยสวมรองเท้าหุ้มส้น และยินดีรับฟังบรีฟความปลอดภัยก่อนเข้ายิง
            </label>
          </div>
        </div>

        <!-- Right Summary Panel: Sticky Sidebar -->
        <aside class="lg:col-span-4 lg:sticky lg:top-24 space-y-4 w-full">
          <div class="bg-[#181818] rounded-2xl p-4 sm:p-6 border border-[#2c2c2c] shadow-xl relative overflow-hidden">
            <div class="h-1.5 w-full bg-[#ffd700] absolute top-0 left-0 right-0"></div>
            
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-[#2c2c2c]">
              <h3 class="font-extrabold text-sm sm:text-base text-stone-100">สรุปการจองของคุณ</h3>
              <span class="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-700/50">
                รอบที่เลือก
              </span>
            </div>

            <div class="py-2 space-y-2.5 text-xs sm:text-sm">
              <div class="flex justify-between items-center">
                <span class="text-stone-400">ประเภทสนาม</span>
                <span class="font-bold text-stone-100">ลานมาตรฐาน (18 ม.)</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-stone-400">วันที่</span>
                <span class="font-bold text-[#ffd700]">{{ bookingDate }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-stone-400">รอบเวลา</span>
                <span class="font-bold text-[#ffd700] bg-[#ffd700]/15 px-2 py-0.5 rounded text-xs">
                  {{ computedTimeSlot }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-stone-400">ระยะเวลา</span>
                <span class="font-bold text-stone-100">{{ duration }} ชั่วโมง</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-stone-400">แพ็กเกจ</span>
                <span :class="['font-medium', isReadyToCalculate ? 'text-[#ffd700]' : 'text-stone-500']">
                  {{ displayPackage }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-stone-400">มือข้างที่ถนัด</span>
                <span :class="['font-medium', form.dominantHand ? 'text-stone-200' : 'text-stone-500']">
                  {{ form.dominantHand === 'right' ? 'ถนัดขวา' : form.dominantHand === 'left' ? 'ถนัดซ้าย' : '-' }}
                </span>
              </div>
            </div>

            <!-- Price Breakdown Calculation -->
            <div class="pt-3 border-t border-[#2c2c2c] space-y-1.5 text-xs">
              <!-- กรณีนำอุปกรณ์มาเอง (100 ฿/ชม. ถ้วน) -->
              <template v-if="form.gear === 'own'">
                <div class="flex justify-between text-stone-400">
                  <span>ค่านำอุปกรณ์ส่วนตัวเข้าสนาม ({{ duration }} ชม.)</span>
                  <span class="font-semibold text-stone-200">{{ 100 * duration }} ฿</span>
                </div>
                <div class="flex justify-between text-stone-400">
                  <span>ค่าเป้าธนูและลานยิง</span>
                  <span class="text-emerald-400 font-semibold">ฟรีในสิทธิ์</span>
                </div>
              </template>

              <!-- กรณีใช้อุปกรณ์สนาม -->
              <template v-else>
                <div class="flex justify-between text-stone-400">
                  <span>ค่าฝึกซ้อม + อุปกรณ์ ({{ duration }} ชม.)</span>
                  <span class="font-semibold text-stone-200">
                    {{ isReadyToCalculate ? `${hourlyRate * duration} ฿` : '-' }}
                  </span>
                </div>
                <div class="flex justify-between text-stone-400">
                  <span>ค่าเป้าธนูมาตรฐาน (40 ซม.)</span>
                  <span class="font-semibold text-stone-200">{{ 20 * duration }} ฿</span>
                </div>
                <div class="flex justify-between text-stone-400">
                  <span>อุปกรณ์เซฟตี้ & โค้ช</span>
                  <span class="text-emerald-400 font-semibold">รวมในแพ็กเกจ</span>
                </div>
              </template>

              <!-- Total Row -->
              <div class="pt-2.5 border-t border-dashed border-[#383838] flex justify-between items-baseline">
                <span class="font-bold text-stone-100">ยอดรวมทั้งสิ้น</span>
                <div class="text-right">
                  <span class="text-2xl font-black text-[#ffd700]">
                    {{ isReadyToCalculate ? `${totalAmount} ฿` : '- ฿' }}
                  </span>
                  <span class="block text-[10px] text-stone-400 mt-0.5">(ชำระหน้าสนามหรือสแกน QR)</span>
                </div>
              </div>
            </div>

            <!-- กล่องแจ้งเตือน: ค่าบริการเพิ่มเติมที่อาจมีหน้าร้าน -->
            <div class="mt-4 p-3 rounded-xl bg-[#222222] border border-[#2e2e2e] text-[11px] space-y-1.5">
              <div class="flex items-center gap-1.5 text-[#ffd700] font-bold">
                <span class="material-symbols-outlined text-[16px]">info</span>
                <span>หมายเหตุค่าบริการเสริม (ชำระหน้าร้าน):</span>
              </div>
              <ul class="space-y-1 text-stone-400 pl-1">
                <li>• ซื้อ/เปลี่ยนเป้ากระดาษใหม่เพิ่ม: <strong class="text-stone-200">20 ฿</strong> / แผ่น</li>
                <li>• ลูกธนูสนามชำรุดหรือยิงหัก: <strong class="text-stone-200">150 ฿</strong> / ดอก</li>
                <li>• เครื่องดื่มและอุปกรณ์เสริม สามารถชำระเพิ่มได้ที่เคาน์เตอร์</li>
              </ul>
            </div>

            <!-- Error Banner -->
            <div v-if="errorMessage" class="mt-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] shrink-0">error</span>
              <span>{{ errorMessage }}</span>
            </div>

            <!-- Action Buttons -->
            <div class="mt-4 space-y-2">
              <button
                type="button"
                @click="handleProceed"
                class="w-full py-3.5 px-4 rounded-xl bg-[#ffd700] hover:bg-yellow-400 text-black flex flex-col items-center justify-center transition-all duration-200 shadow-lg shadow-[#ffd700]/20 active:scale-[0.98] cursor-pointer"
              >
                <span class="flex items-center gap-1.5 font-bold text-sm sm:text-base tracking-wide">
                  ดำเนินการต่อ
                  <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
                </span>
                <span class="text-[10px] sm:text-[11px] font-medium text-black/70">ยืนยันและชำระเงิน</span>
              </button>
              <router-link
                to="/schedule"
                class="w-full py-2.5 px-3 rounded-xl border border-[#383838] hover:bg-[#222] text-stone-400 font-medium text-xs flex items-center justify-center gap-1 transition text-center"
              >
                <span class="material-symbols-outlined text-[15px]">arrow_back</span>
                เปลี่ยนวันและรอบเวลา
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-[#181818] text-stone-400 py-6 sm:py-8 mt-12 border-t border-[#2c2c2c] text-center text-xs">
      <p>© 2026 MR.HANDSOME Archery Club. สงวนลิขสิทธิ์ ความแม่นยำในทุกการยิง</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = reactive({
  name: '',
  phone: '',
  bowType: '',
  experience: '',
  gear: '',
  dominantHand: '',
  agreeRules: true
})

const errors = reactive({
  name: false,
  phone: false
})

const errorMessage = ref('')
const bookingDate = ref('7 ก.ย. 2026')
const startTime = ref('11:00')
const duration = ref(1)

onMounted(() => {
  if (route.query.date) bookingDate.value = String(route.query.date)
  if (route.query.duration) duration.value = parseInt(route.query.duration, 10) || 1
  if (route.query.time) {
    startTime.value = String(route.query.time).trim().replace(/น\./g, '').split('-')[0].trim()
  } else {
    try {
      const saved = JSON.parse(sessionStorage.getItem('mrhs_schedule_state') || '{}')
      if (saved.slot) startTime.value = saved.slot
      if (saved.duration) duration.value = parseInt(saved.duration, 10) || 1
    } catch (e) {}
  }
})

// สลับการเลือกอุปกรณ์ (ถ้านำมาเอง ให้เคลียร์ bowType ร้านทันที)
function handleToggleGear(val) {
  if (form.gear === val) {
    form.gear = ''
  } else {
    form.gear = val
    if (val === 'own') {
      form.bowType = ''
    }
  }
}

// Toggle ฟิลด์ทั่วไป (แตะเลือก / แตะซ้ำเพื่อยกเลิก)
function toggle(field, val) {
  if (form[field] === val) {
    form[field] = ''
  } else {
    form[field] = val
  }
}

// คำนวณช่วงเวลาสิ้นสุด
const computedTimeSlot = computed(() => {
  const parts = startTime.value.split(':')
  const startMin = parseInt(parts[0], 10) * 60 + parseInt(parts[1] || '0', 10)
  const endMin = startMin + duration.value * 60
  const endHour = String(Math.floor(endMin / 60) % 24).padStart(2, '0')
  const endMinute = String(endMin % 60).padStart(2, '0')
  return `${startTime.value} - ${endHour}:${endMinute} น.`
})

// พร้อมคำนวณราคาหรือยัง
const isReadyToCalculate = computed(() => {
  if (form.gear === 'own') return true
  if (form.gear === 'rental' && form.bowType) return true
  return false
})

// ค่าบริการต่อชั่วโมง
const hourlyRate = computed(() => {
  if (form.gear === 'own') {
    return 100
  }
  if (form.bowType === 'Bare Bow') {
    return 300
  }
  if (form.bowType === 'Olympic Recurve') {
    return form.experience === 'beginner' ? 350 : 300
  }
  return 0
})

// ข้อความแสดงชื่อแพ็กเกจ
const displayPackage = computed(() => {
  if (form.gear === 'own') {
    return 'นำอุปกรณ์มาเอง (100 ฿/ชม.)'
  }
  if (form.bowType) {
    return `${form.bowType} (อุปกรณ์สนาม)`
  }
  return '-'
})

// ยอดรวมสุทธิ
const totalAmount = computed(() => {
  if (!isReadyToCalculate.value) return 0
  if (form.gear === 'own') {
    return 100 * duration.value
  }
  return (hourlyRate.value + 20) * duration.value
})

function handleProceed() {
  errors.name = false
  errors.phone = false
  errorMessage.value = ''

  if (!form.name) {
    errors.name = true
    errorMessage.value = 'กรุณาระบุชื่อ-นามสกุลจริง'
    return
  }

  const cleanPhone = form.phone.replace(/[^0-9]/g, '')
  if (!cleanPhone || cleanPhone.length < 9 || cleanPhone.length > 10 || !cleanPhone.startsWith('0')) {
    errors.phone = true
    errorMessage.value = 'กรุณาระบุเบอร์โทรศัพท์ติดต่อ 10 หลักที่ถูกต้อง (ขึ้นต้นด้วย 0)'
    return
  }

  if (!form.gear) {
    errorMessage.value = 'กรุณาเลือกรูปแบบอุปกรณ์ (ใช้อุปกรณ์สนาม หรือ นำมาเอง)'
    return
  }

  if (form.gear === 'rental' && !form.bowType) {
    errorMessage.value = 'กรุณาเลือกประเภทคันธนูของสนามที่ต้องการฝึกซ้อม'
    return
  }

  if (!form.experience) {
    errorMessage.value = 'กรุณาเลือกระดับประสบการณ์การยิงธนู'
    return
  }

  if (!form.dominantHand) {
    errorMessage.value = 'กรุณาเลือกมือข้างที่ถนัดในการน้าวสาย'
    return
  }

  if (!form.agreeRules) {
    errorMessage.value = 'กรุณากดยินยอมรับทราบกฎระเบียบของสนาม'
    return
  }

  // ส่งข้อมูลไปยัง BookingConfirmView
  router.push({
    path: '/booking-confirm',
    query: {
      date: bookingDate.value,
      time: computedTimeSlot.value,
      duration: duration.value,
      name: form.name,
      phone: cleanPhone,
      gear: form.gear,
      bow: form.gear === 'own' ? 'อุปกรณ์ส่วนตัว' : form.bowType,
      hand: form.dominantHand,
      total: totalAmount.value
    }
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>