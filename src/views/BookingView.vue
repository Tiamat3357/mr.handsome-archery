<!--
  ถูกแยกออกมาจาก src/views/CustomerView.vue (หน้า 3/8)
  ต้นฉบับเดิม: booking.html   |   ฟอร์มกรอกข้อมูลผู้จอง
  เนื้อหาใน <body> ถูกย้ายเข้า <template> แบบ verbatim (ไม่จัดรูปแบบใหม่)
-->
<template>
  <div class="min-h-screen flex flex-col bg-[#121212] text-stone-100" lang="th">
<!-- Header / Navbar -->
  <header class="fixed top-0 w-full z-50 bg-[#121212]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-stone-700"><div class="h-16 w-full px-4 md:px-12 flex items-center justify-between gap-2"><div class="flex items-center gap-3"><a href="/"><span class="font-bold text-2xl text-stone-100 uppercase tracking-wider inline-block">MR.HANDSOME</span></a></div><nav class="hidden md:flex items-center gap-6"><a class="text-stone-400 hover:text-stone-100 font-semibold text-sm uppercase tracking-wider transition-colors" href="/#services">บริการ</a><a aria-current="page" class="uppercase tracking-wider transition-colors bg-[#FFD700] text-[#1a1a1a] font-semibold text-sm rounded-lg px-3 py-1" href="/schedule">การจอง</a><a class="text-stone-400 hover:text-stone-100 font-semibold text-sm uppercase tracking-wider transition-colors" href="/equipment">อุปกรณ์</a><a class="text-stone-400 hover:text-stone-100 font-semibold text-sm uppercase tracking-wider transition-colors" href="/my-bookings">บัตรจอง</a></nav></div></header>

  <!-- Stepper Breadcrumb -->
  <section class="w-full bg-[#262626] shadow-sm py-3 md:py-4 mt-16 border-b border-stone-700"><div class="w-full px-4 md:px-12"><div class="max-w-5xl mx-auto"><div class="grid grid-cols-2 md:grid-cols-4 gap-3 items-center relative"><!-- Step 1: Completed --><div class="flex items-center gap-3 group"><div class="w-10 h-10 rounded-full bg-[#3a3a3a] text-white flex items-center justify-center font-semibold text-sm shrink-0 shadow-sm"><span class="material-symbols-outlined text-[20px]">check</span></div><div class="flex flex-col min-w-0"><span class="text-[12px] text-stone-400 uppercase tracking-widest font-semibold">ขั้นตอนที่ 1</span><span class="text-sm text-stone-100 truncate font-semibold">เลือกวันและรอบเวลา</span></div></div><!-- Step 2: Active Current Step --><div class="flex items-center gap-3 p-1 rounded-xl bg-[#FFD700]/15"><div class="w-10 h-10 rounded-full bg-[#FFD700] text-[#1a1a1a] flex items-center justify-center font-bold shrink-0 shadow-sm ring-4 ring-[#FFD700]/20"><span class="material-symbols-outlined text-[20px] font-bold">verified</span></div><div class="flex flex-col min-w-0"><span class="text-[12px] text-[#FFD700] font-bold uppercase tracking-wider">กำลังดำเนินการ</span><span class="text-sm text-stone-100 font-bold truncate">2. ข้อมูลผู้จอง &amp; อุปกรณ์</span></div></div><!-- Step 3: Upcoming Step --><div class="flex items-center gap-3 opacity-45"><div class="w-10 h-10 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center font-semibold text-sm shrink-0"><span class="text-sm font-semibold">03</span></div><div class="flex flex-col min-w-0"><span class="text-[12px] text-stone-400 uppercase tracking-widest">ขั้นตอนถัดไป</span><span class="text-sm text-stone-400 truncate">3. ยืนยันการจอง</span></div></div><!-- Step 4: Upcoming Step --><div class="flex items-center gap-3 opacity-45"><div class="w-10 h-10 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center font-semibold text-sm shrink-0"><span class="text-sm font-semibold">04</span></div><div class="flex flex-col min-w-0"><span class="text-[12px] text-stone-400 uppercase tracking-widest">ขั้นตอนถัดไป</span><span class="text-sm text-stone-400 truncate">บันทึก E-Ticket</span></div></div></div></div></div></section>

  <!-- Main Container -->
  <main class="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
    
    <!-- Header Title -->
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold text-stone-100 tracking-tight flex items-center gap-3">
        กรอกข้อมูลผู้จองและรายละเอียดการฝึกซ้อม
      </h1>
      <p class="text-stone-400 text-sm mt-1.5">
        กรุณากรอกข้อมูลจริงเพื่อใช้ในการออกบัตร E-Ticket และจัดเตรียมอุปกรณ์ที่เหมาะสมกับความถนัดของท่าน
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      <!-- Form Section (8 cols) -->
      <div class="lg:col-span-8 space-y-6">

        <!-- 1. ข้อมูลติดต่อหลัก -->
        <div class="bg-[#262626] rounded-2xl p-6 md:p-8 border border-stone-700 shadow-sm">
          <div class="flex items-center gap-3 mb-6 pb-3 border-b border-stone-800">
            <div class="w-9 h-9 rounded-xl bg-[#FFD700]/15 text-[#FFD700] flex items-center justify-center font-bold text-base">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-stone-100">ข้อมูลผู้ติดต่อ / ผู้จองหลัก</h2>
              <p class="text-xs text-stone-400">ใช้สำหรับส่งรหัสการจอง และการแจ้งเตือนทาง SMS</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- ชื่อ - นามสกุล -->
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                ชื่อ - นามสกุล <span class="text-red-400">*</span>
              </label>
              <input id="bookingName" type="text" placeholder="ระบุชื่อและนามสกุลจริง" class="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 outline-none transition text-sm font-medium">
            </div>

            <!-- เบอร์โทรศัพท์ -->
            <div class="md:col-span-2">
              <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                เบอร์โทรศัพท์ติดต่อ <span class="text-red-400">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-4 top-3.5 text-stone-400 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </span>
                <input id="bookingPhone" type="tel" placeholder="08x-xxx-xxxx" class="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 placeholder-stone-400 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 outline-none transition text-sm font-medium">
              </div>
              <span class="text-[11px] text-stone-400 mt-1 block">รับ SMS รหัสผ่านเข้าสนามและแจ้งเตือนรอบซ้อม</span>
            </div>
          </div>
        </div>

        <div class="md:col-span-2 mt-5">
            <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              ระยะเวลาการเล่น <span class="text-red-400">*</span>
            </label>
            <select id="bookingDuration" class="w-full px-4 py-3 rounded-xl border border-stone-700 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition text-sm font-medium text-stone-200 bg-[#262626]">
              <option value="1" selected="">1 ชั่วโมง</option>
              <option value="2">2 ชั่วโมง</option>
              <option value="3">3 ชั่วโมง</option>
            </select>
            <span class="text-[11px] text-stone-400 mt-1 block">เลือกระยะเวลาได้สูงสุด 3 ชั่วโมงต่อรอบ</span>
          </div>

        <!-- 2. ประสบการณ์และการใช้อุปกรณ์ -->
        <div class="bg-[#262626] rounded-2xl p-6 md:p-8 border border-stone-700 shadow-sm">
          <div class="flex items-center gap-3 mb-6 pb-3 border-b border-stone-800">
            <div class="w-9 h-9 rounded-xl bg-[#FFD700]/15 text-[#FFD700] flex items-center justify-center font-bold text-base">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-stone-100">ระดับประสบการณ์ &amp; การเลือกใช้อุปกรณ์</h2>
              <p class="text-xs text-stone-400">ช่วยให้โค้ชเตรียมเซตคันธนูและน้ำหนักสาย (Poundage) ให้เหมาะสม</p>
            </div>
          </div>

          <!-- ระดับประสบการณ์ -->
          <div class="mb-6">
            <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-3" id="expLabel">
              ระดับประสบการณ์การยิงธนูของผู้เข้าร่วม
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label class="relative flex flex-col p-4 rounded-xl border-2 border-[#FFD700] bg-[#FFD700]/20 cursor-pointer">
                <input type="radio" name="experience_level" value="beginner" class="hidden">
                <span class="font-bold text-sm text-stone-100 flex items-center justify-between">
                  มือใหม่ / ยิงครั้งแรก
                  <span class="w-4 h-4 rounded-full bg-[#FFD700] flex items-center justify-center text-white text-[10px]">✓</span>
                </span>
                <span class="text-xs text-stone-400 mt-1">ต้องการครูฝึกแนะนำพื้นฐานความปลอดภัย 15 นาที</span>
              </label>

              <label class="relative flex flex-col p-4 rounded-xl border border-stone-700 hover:border-[#FFD700]/60 bg-[#262626] cursor-pointer transition">
                <input type="radio" name="experience_level" value="intermediate" class="hidden">
                <span class="font-bold text-sm text-stone-100 flex items-center justify-between">
                  มีประสบการณ์บ้าง
                  <span class="w-4 h-4 rounded-full border border-stone-600"></span>
                </span>
                <span class="text-xs text-stone-400 mt-1">ยิงเป็นประจำ เข้าใจกฎและฟอร์มการยิงเบื้องต้น</span>
              </label>

              <label class="relative flex flex-col p-4 rounded-xl border border-stone-700 hover:border-[#FFD700]/60 bg-[#262626] cursor-pointer transition">
                <input type="radio" name="experience_level" value="expert" class="hidden">
                <span class="font-bold text-sm text-stone-100 flex items-center justify-between">
                  นักกีฬา / ขั้นสูง
                  <span class="w-4 h-4 rounded-full border border-stone-600"></span>
                </span>
                <span class="text-xs text-stone-400 mt-1">ซ้อมแข่งขัน เน้นระยะยิงและจังหวะฝึกสมาธิ</span>
              </label>
            </div>
          </div>

          <!-- เลือกอุปกรณ์ -->
          <div class="mb-6">
            <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-3" id="gearLabel">
              การจัดเตรียมอุปกรณ์
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label class="p-4 rounded-xl border-2 border-[#FFD700] bg-[#FFD700]/20 flex items-start gap-3 cursor-pointer">
                <input type="radio" name="gear_choice" value="rental" class="mt-1 text-[#FFD700] focus:ring-[#FFD700]">
                <div>
                  <div class="font-bold text-sm text-stone-100">ใช้อุปกรณ์ของทางสนาม (รวมในแพ็กเกจ)</div>
                  <p class="text-xs text-stone-400 mt-0.5">คันธนูมาตรฐาน + ลูกธนูคาร์บอน 12 ลูก + อุปกรณ์การ์ดนิ้วและแขน</p>
                  <span class="inline-block mt-2 text-[11px] font-semibold text-[#FFD700] bg-[#FFD700]/25 px-2 py-0.5 rounded">
                    ฟรี ไม่มีค่าใช้จ่ายเพิ่มเติม
                  </span>
                </div>
              </label>

              <label class="p-4 rounded-xl border border-stone-700 hover:border-[#FFD700]/60 flex items-start gap-3 cursor-pointer transition">
                <input type="radio" name="gear_choice" value="own_gear" class="mt-1 text-stone-400 focus:ring-stone-400">
                <div>
                  <div class="font-bold text-sm text-stone-100">นำอุปกรณ์ธนูส่วนตัวมาเอง</div>
                  <p class="text-xs text-stone-400 mt-0.5">มีค่าบริการนำอุปกรณ์เข้าสนามตามระเบียบ 100 บาท/ชม./ท่าน</p>
                  <span class="inline-block mt-2 text-[11px] font-medium text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                    โค้ชจะช่วยตรวจวัดแรงดึง (Poundage) ก่อนยิง
                  </span>
                </div>
              </label>
            </div>
          </div>

          <!-- ประเภทคันธนูที่ต้องการใช้และมือข้างที่ถนัด -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-stone-800">
            <div>
              <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                ประเภทคันธนูที่ต้องการ
              </label>
              <select id="bowType" class="w-full px-4 py-3 rounded-xl border border-stone-700 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition text-sm font-medium text-stone-200 bg-[#262626]">
                <option value="recurve" selected="">Olympic Recurve (มีศูนย์เล็ง สไตล์กีฬาแข่งขัน)</option>
                <option value="barebow">Barebow (ไม่มีศูนย์เล็ง เน้นสัญชาตญาณ)</option>
                <option value="traditional">Traditional Bow (ธนูเทรดิชันแนล)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                มือข้างที่ถนัดในการน้าวสาย
              </label>
              <div class="grid grid-cols-2 gap-2">
                <label class="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-[#FFD700] bg-[#FFD700]/15/50 font-bold text-xs text-stone-100 cursor-pointer">
                  <input type="radio" name="dominant_hand" value="right" checked="" class="hidden">
                  <span class="">ถนัดขวา (Right-hand)</span>
                </label>
                <label class="flex items-center justify-center gap-2 p-3 rounded-xl border border-stone-700 font-medium text-xs text-stone-300 hover:border-[#FFD700]/60 cursor-pointer transition">
                  <input type="radio" name="dominant_hand" value="left" class="hidden">
                  <span class="">ถนัดซ้าย (Left-hand)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- หมายเหตุเพิ่มเติม -->
          <div class="mt-5">
            <label class="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              คำขอพิเศษ / ข้อมูลเพิ่มเติมถึงโค้ชผู้ดูแล (ถ้ามี)
            </label>
            <textarea id="notes" rows="2" placeholder="เช่น สมาชิกมีเด็กอายุ 10 ขวบร่วมด้วย หรือต้องการให้เน้นการสอนท่าจับสาย..." class="w-full px-4 py-2.5 rounded-xl border border-stone-700 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 outline-none transition text-sm text-stone-200"></textarea>
          </div>
        </div>

        <!-- 3. ข้อตกลงความปลอดภัย -->
        <div class="bg-[#FFD700]/15/60 rounded-2xl p-5 border border-[#FFD700]/40 flex items-start gap-4">
          <input type="checkbox" id="agree_rules" checked="" class="mt-1 w-4 h-4 text-[#FFD700] border-[#FFD700]/50 rounded focus:ring-[#FFD700]">
          <label for="agree_rules" class="text-xs text-stone-300 leading-relaxed cursor-pointer">
            ข้าพเจ้ารับทราบและยินยอมปฏิบัติตาม <strong class="text-stone-100">กฎระเบียบและข้อควรทราบของสนาม MR.HANDSOME</strong> โดยสวมใส่ชุดทะมัดทะแมง รองเท้าหุ้มส้น และยินดีเข้ารับการบรีฟความปลอดภัย 10-15 นาทีก่อนเข้าลานยิงจริง
          </label>
        </div>

      </div>

      <!-- Right Summary Panel (4 cols) -->
      <div class="lg:col-span-4 sticky top-28 space-y-5">
        
        <div class="bg-[#262626] rounded-2xl p-6 border border-stone-700 shadow-sm">
          <div class="flex items-center justify-between pb-4 border-b border-stone-800">
            <h3 class="font-extrabold text-base text-stone-100">สรุปการจองของคุณ</h3>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-700">
              รอบที่เลือก
            </span>
          </div>

          <div class="py-4 space-y-3.5 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-stone-400">ประเภทสนาม</span>
              <span class="font-bold text-stone-100">ลานมาตรฐาน (18 ม.)</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-stone-400">วันที่</span>
              <span class="font-bold text-stone-100" id="bookingSummaryDate">—</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-stone-400">รอบเวลา</span>
              <span class="font-bold text-[#FFD700] bg-[#FFD700]/15 px-2 py-0.5 rounded" id="bookingSummaryTime">11:00 - 12:00 น.</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-stone-400">จำนวนนักกีฬา</span>
              <span class="font-bold text-stone-100">1 - 2 ท่าน (เลนเดี่ยว)</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-stone-400">แพ็กเกจ</span>
              <span class="font-medium text-stone-300">Olympic Recurve + Staff</span>
            </div>
          </div>

          <!-- Price Calculation -->
          <div class="pt-4 border-t border-stone-800 space-y-2">
            <div class="flex justify-between text-xs text-stone-400">
              <span class="" id="bookingHourLabel">ค่าชั่วโมงฝึกซ้อม (1 ชม.)</span>
              <span class="" id="bookingHourPrice">350 ฿</span>
            </div>
            <div class="flex justify-between text-xs text-stone-400">
              <span class="">ค่าเป้าธนูมาตรฐาน</span>
              <span class="" id="bookingTargetPrice">20 ฿</span>
            </div>
            <div class="flex justify-between text-xs text-stone-400">
              <span class="">อุปกรณ์เซฟตี้ &amp; โค้ชประกบ</span>
              <span class="text-emerald-400 font-semibold">รวมในแพ็กเกจ</span>
            </div>

            <div class="pt-3 border-t border-dashed border-stone-700 flex justify-between items-baseline">
              <span class="font-bold text-stone-100">ยอดรวมทั้งสิ้น</span>
              <div class="text-right">
                <span class="text-2xl font-black text-[#FFD700]" id="bookingTotal">370 ฿</span>
                <span class="block text-[10px] text-stone-400">(ชำระหน้าสนามหรือสแกน QR)</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div id="formErrorBox" class="hidden mb-3 rounded-xl bg-red-500/10 border border-red-800 px-4 py-3 flex items-start gap-2">
            <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div class="text-xs leading-relaxed text-red-300" id="formErrorText"></div>
          </div>

          <div class="mt-3 space-y-2.5">
            <a href="/booking-confirm" id="proceedBtn" class="group w-full py-4 px-4 rounded-xl bg-[#FFD700] hover:bg-[#E8C400] text-[#1a1a1a] flex flex-col items-center justify-center gap-0.5 transition-all duration-200 shadow-lg shadow-[#FFD700]/25 hover:shadow-[#FFD700]/40 active:scale-[0.98] cursor-pointer">
              <span class="flex items-center gap-2 font-bold text-base sm:text-lg tracking-wide">ดำเนินการต่อ
                <svg class="w-5 h-5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span class="text-[11px] font-medium text-[#1a1a1a]/80 tracking-wide">กดที่นี่เพื่อไปหน้าถัดไป — ยืนยันและรับบัตร E-Ticket</span>
            </a>

            <a href="/schedule" class="w-full py-2.5 px-4 rounded-xl border border-stone-700 hover:bg-stone-900 text-stone-400 font-medium text-xs flex items-center justify-center gap-1.5 transition">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span class="">ย้อนกลับไปเปลี่ยนวันและรอบเวลา</span>
            </a>
          </div>

        </div>

        <!-- Security Badge Card -->
        <div class="p-4 rounded-xl bg-stone-800 border border-stone-700 text-xs text-stone-400 flex items-start gap-3">
          <svg class="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <div class="">
            <span class="font-bold text-stone-200 block">ปลอดภัย &amp; ได้มาตรฐานสากล</span>
            ข้อมูลส่วนบุคคลของท่านจะถูกจัดเก็บตามนโยบายความเป็นส่วนตัว เพื่อความปลอดภัยและการบันทึกสถิตินักธนูเท่านั้น
          </div>
        </div>

      </div>

    </div>

  </main>

  <!-- Footer -->
  <footer class="bg-[#181818] text-stone-400 py-10 mt-16 border-t border-stone-800">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
      <div class="space-y-1 text-center md:text-left">
        <div class="text-white font-bold tracking-wider text-base">MR.HANDSOME</div>
        <p class="">© 2024 MR.HANDSOME Archery Club. สงวนลิขสิทธิ์ ความแม่นยำในทุกการยิง.</p>
      </div>
      <div class="flex flex-wrap gap-6 text-stone-400">
        <a href="/#rules" class="hover:text-white transition">เงื่อนไขการให้บริการ</a>
        <a href="/" class="hover:text-white transition">นโยบายความเป็นส่วนตัว</a>
        <a href="/#rules" class="hover:text-white transition">ความปลอดภัยของสนาม</a>
        <a href="/" class="hover:text-white transition">ติดต่อเรา</a>
      </div>
    </div>
  </footer>
  </div>
</template>

<!-- <style> เดิมจาก <head> (ไม่ scoped ตามที่สั่ง) -->
<style>
    body {
      font-family: 'Be Vietnam Pro', 'Prompt', sans-serif;
      background-color: #121212;
    }
  </style>

<!--
  ==== <script> เดิมทั้งหมดของหน้านี้ (เก็บไว้ก่อน ยังไม่ได้แปลงเป็น Vue) ====
  รวมทั้ง tailwind CDN, tailwind.config, js/*.js และ inline script

  [1] (จาก <head>)
<script src="https://cdn.tailwindcss.com"></script>

  [2] (จาก <head>)
<script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#FFD700',
            'primary-dark': '#D4B600',
            'primary-light': '#FFF3B8',
            charcoal: '#181818',
            'charcoal-light': '#3a3a3a',
            surface: '#121212',
            'surface-container': '#262626'
          },
          fontFamily: {
            sans: ['"Be Vietnam Pro"', '"Prompt"', 'sans-serif'],
            display: ['"Be Vietnam Pro"', '"Prompt"', 'sans-serif']
          }
        }
      }
    }
  </script>

  [3] (จาก <body>)
<script src="js/app.js"></script>

  [4] (จาก <body>)
<script src="js/calculator.js"></script>

  [5] (จาก <body>)
<script src="js/points.js"></script>

  [6] (จาก <body>)
<script>
    (function () {
      'use strict';

      var EXP_LABEL_ON = ['border-2', 'border-[#FFD700]', 'bg-[#FFD700]/20'];
      var EXP_LABEL_OFF = ['transition', 'border', 'border-stone-700', 'hover:border-[#FFD700]/60', 'bg-[#262626]'];
      var GEAR_LABEL_ON = ['border-2', 'border-[#FFD700]', 'bg-[#FFD700]/20'];
      var GEAR_LABEL_OFF = ['transition', 'border', 'border-stone-700', 'hover:border-[#FFD700]/60', 'bg-[#262626]'];
      var HAND_LABEL_ON = ['border-2', 'border-[#FFD700]', 'bg-[#FFD700]/15/50', 'font-bold', 'text-xs', 'text-stone-100'];
      var HAND_LABEL_OFF = ['transition', 'border', 'border-stone-700', 'font-medium', 'text-xs', 'text-stone-300', 'hover:border-[#FFD700]/60'];

      function syncExperience() {
        document.querySelectorAll('input[name="experience_level"]').forEach(function (radio) {
          var label = radio.closest('label');
          EXP_LABEL_ON.concat(EXP_LABEL_OFF).forEach(label.classList.remove.bind(label.classList));
          (radio.checked ? EXP_LABEL_ON : EXP_LABEL_OFF).forEach(label.classList.add.bind(label.classList));
          var dot = label.querySelector('span.w-4.h-4');
          if (dot) {
            dot.classList.toggle('bg-[#FFD700]', radio.checked);
            dot.classList.toggle('border', !radio.checked);
            dot.classList.toggle('border-stone-600', !radio.checked);
            dot.innerHTML = radio.checked ? '&#10003;' : '';
          }
        });
      }

      function syncGear() {
        document.querySelectorAll('input[name="gear_choice"]').forEach(function (radio) {
          var label = radio.closest('label');
          GEAR_LABEL_ON.concat(GEAR_LABEL_OFF).forEach(label.classList.remove.bind(label.classList));
          (radio.checked ? GEAR_LABEL_ON : GEAR_LABEL_OFF).forEach(label.classList.add.bind(label.classList));
        });
      }

      function syncHand() {
        document.querySelectorAll('input[name="dominant_hand"]').forEach(function (radio) {
          var label = radio.closest('label');
          HAND_LABEL_ON.concat(HAND_LABEL_OFF).forEach(label.classList.remove.bind(label.classList));
          (radio.checked ? HAND_LABEL_ON : HAND_LABEL_OFF).forEach(label.classList.add.bind(label.classList));
        });
      }

      ['experience_level', 'gear_choice', 'dominant_hand'].forEach(function (name) {
        document.querySelectorAll('input[name="' + name + '"]').forEach(function (radio) {
          radio.addEventListener('change', function () {
            syncExperience();
            syncGear();
            syncHand();
          });
        });
      });

      syncExperience();
      syncGear();
      syncHand();
      window.__syncFormStyling = function () { syncExperience(); syncGear(); syncHand(); };
    })();
  </script>

  [7] (จาก <body>)
<script>
    (function () {
      var params = new URLSearchParams(window.location.search);
      var dateEl = document.getElementById('bookingSummaryDate');
      var timeEl = document.getElementById('bookingSummaryTime');
      var hourLabelEl = document.getElementById('bookingHourLabel');
      var hourPriceEl = document.getElementById('bookingHourPrice');
      var targetPriceEl = document.getElementById('bookingTargetPrice');
      var totalEl = document.getElementById('bookingTotal');
      var durSel = document.getElementById('bookingDuration');
      var dateText = params.has('date') ? params.get('date') : '';
      var UB = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
      function schedState() {
        try { return JSON.parse(sessionStorage.getItem('mrhs_schedule_state') || 'null'); } catch (err) { return null; }
      }
      if (!dateText) {
        var s0 = schedState();
        if (s0 && s0.date) {
          var dd0 = new Date(parseInt(s0.date, 10));
          if (!isNaN(dd0.getTime())) dateText = dd0.getDate() + ' ' + UB[dd0.getMonth()] + ' ' + dd0.getFullYear();
        }
      }
      var startTime = '11:00';
      var dur = parseInt(params.get('duration') || '1', 10);
      if (isNaN(dur) || dur < 1 || dur > 5) dur = 1;

      function pad2(n) { return (n < 10 ? '0' : '') + n; }

      function recalc() {
        dur = parseInt(durSel.value, 10);
        if (isNaN(dur) || dur < 1 || dur > 5) dur = 1;
        var p = startTime.split(':');
        var totalMin = (+p[0]) * 60 + (+p[1]) + dur * 60;
        var endH = pad2(Math.floor((totalMin / 60) % 24)) + ':' + pad2(totalMin % 60);
        if (timeEl) timeEl.textContent = startTime + ' - ' + endH + ' น.';
        if (hourLabelEl) hourLabelEl.textContent = 'ค่าชั่วโมงฝึกซ้อม (' + dur + ' ชม.)';
        if (hourPriceEl) hourPriceEl.textContent = (350 * dur) + ' ฿';
        if (targetPriceEl) targetPriceEl.textContent = (20 * dur) + ' ฿';
        if (totalEl) totalEl.textContent = (370 * dur) + ' ฿';
      }

      if (dateEl && dateText) dateEl.textContent = dateText;
      if (params.has('time')) {
        startTime = params.get('time').trim().replace(/ น\./g, '').split(' - ')[0];
      } else {
        var s1 = schedState();
        if (s1 && s1.slot) {
          startTime = String(s1.slot);
        } else if (timeEl) {
          startTime = timeEl.textContent.replace(/ น\./g, '').split(' - ')[0];
        }
      }
      if (durSel) {
        durSel.value = String(dur);
        durSel.addEventListener('change', function () {
          window.__bookingDuration = parseInt(durSel.value, 10);
          recalc();
        });
      }
      recalc();

      var proceed = document.getElementById('proceedBtn');
      var errorBox = document.getElementById('formErrorBox');
      var errorText = document.getElementById('formErrorText');

      function markBad(el) {
        if (el) el.classList.add('!border-red-500');
      }
      function unmarkBad(el) {
        if (el) el.classList.remove('!border-red-500');
      }
      function labelErr(id) {
        var l = document.getElementById(id);
        if (l) l.classList.add('text-red-600');
      }
      function clearErr() {
        unmarkBad(document.getElementById('bookingName'));
        unmarkBad(document.getElementById('bookingPhone'));
        var el = document.getElementById('expLabel');
        if (el) el.classList.remove('text-red-600');
        el = document.getElementById('gearLabel');
        if (el) el.classList.remove('text-red-600');
      }

      if (proceed) {
        proceed.addEventListener('click', function (e) {
          e.preventDefault();
          var nameEl = document.getElementById('bookingName');
          var phoneEl = document.getElementById('bookingPhone');
          var nameVal = nameEl ? nameEl.value.trim() : '';
          var phoneRaw = phoneEl ? phoneEl.value.trim() : '';
          var phoneDigits = phoneRaw.replace(/[^0-9]/g, '');
          var expChecked = !!document.querySelector('input[name="experience_level"]:checked');
          var gearChecked = !!document.querySelector('input[name="gear_choice"]:checked');

          var missing = [];
          if (nameVal === '') missing.push('ชื่อ - นามสกุล');
          if (phoneRaw === '') missing.push('เบอร์โทรศัพท์ติดต่อ');
          else if (!/^0\d{8,9}$/.test(phoneDigits)) missing.push('เบอร์โทรศัพท์ยังไม่ถูกต้อง (กรอกตัวเลข 10 หลัก เริ่มต้น 0)');
          if (!expChecked) missing.push('ระดับประสบการณ์การยิงธนู');
          if (!gearChecked) missing.push('การจัดเตรียมอุปกรณ์');

          clearErr();
          if (missing.length > 0) {
            if (nameVal === '') markBad(nameEl);
            if (phoneRaw === '' || !/^0\d{8,9}$/.test(phoneDigits)) markBad(phoneEl);
            if (!expChecked) labelErr('expLabel');
            if (!gearChecked) labelErr('gearLabel');
            if (errorText) errorText.textContent = 'กรุณากรอกข้อมูลให้ครบทุกช่องก่อนไปหน้าถัดไป: ' + missing.join(', ') + '.';
            if (errorBox) errorBox.classList.remove('hidden');
            var target = nameVal === '' ? nameEl : (phoneRaw === '' || !/^0\d{8,9}$/.test(phoneDigits)) ? phoneEl : !expChecked ? document.getElementById('expLabel') : document.getElementById('gearLabel');
            if (target) {
              target.focus ? target.focus() : null;
              target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
          }

          if (errorBox) errorBox.classList.add('hidden');
          var q = new URLSearchParams();
          if (dateText) q.set('date', dateText);
          q.set('time', startTime);
          q.set('duration', durSel ? durSel.value : '1');
          q.set('name', nameVal);
          q.set('phone', phoneDigits);
          if (window.__saveBookingForm) window.__saveBookingForm();
          window.location.href = '/booking-confirm?' + q.toString();
        });
      }

      var bookingNameEl = document.getElementById('bookingName');
      var bookingPhoneEl = document.getElementById('bookingPhone');
      if (bookingNameEl) bookingNameEl.addEventListener('input', clearErr);
      if (bookingPhoneEl) bookingPhoneEl.addEventListener('input', clearErr);
    })();
  </script>

  [8] (จาก <body>)
<script>
    (function () {
      'use strict';
      var FORM_KEY = 'mrhs_booking_form';
      function saveForm() {
        try {
          var data = {
            name: (document.getElementById('bookingName') || {}).value || '',
            phone: (document.getElementById('bookingPhone') || {}).value || '',
            duration: (document.getElementById('bookingDuration') || {}).value || '1',
            experience_level: (document.querySelector('input[name="experience_level"]:checked') || {}).value || '',
            gear_choice: (document.querySelector('input[name="gear_choice"]:checked') || {}).value || '',
            dominant_hand: (document.querySelector('input[name="dominant_hand"]:checked') || {}).value || '',
            bow: (document.getElementById('bowType') || {}).value || '',
            notes: (document.getElementById('notes') || {}).value || '',
            agree: !!(document.getElementById('agree_rules') || {}).checked
          };
          sessionStorage.setItem(FORM_KEY, JSON.stringify(data));
        } catch (err) {}
      }
      window.__saveBookingForm = saveForm;

      var saved = null;
      try { saved = JSON.parse(sessionStorage.getItem(FORM_KEY) || 'null'); } catch (err) {}
      if (saved && typeof saved === 'object') {
        var nameEl = document.getElementById('bookingName');
        if (nameEl && saved.name) nameEl.value = saved.name;
        var phoneEl = document.getElementById('bookingPhone');
        if (phoneEl && saved.phone) phoneEl.value = saved.phone;
        var durEl = document.getElementById('bookingDuration');
        if (durEl && saved.duration) durEl.value = String(saved.duration);
        if (durEl) durEl.dispatchEvent(new Event('change', { bubbles: true }));
        ['experience_level', 'gear_choice', 'dominant_hand'].forEach(function (n) {
          if (!saved[n]) return;
          var r = document.querySelector('input[name="' + n + '"][value="' + saved[n] + '"]');
          if (r) r.checked = true;
        });
        var bowEl = document.getElementById('bowType');
        if (bowEl && saved.bow) bowEl.value = saved.bow;
        var notesEl = document.getElementById('notes');
        if (notesEl && saved.notes) notesEl.value = saved.notes;
        var agreeEl = document.getElementById('agree_rules');
        if (agreeEl) agreeEl.checked = !!saved.agree;
        if (window.__syncFormStyling) window.__syncFormStyling();
      }

      ['#bookingName', '#bookingPhone', '#bookingDuration', '#bowType', '#notes', '#agree_rules',
       'input[name="experience_level"]', 'input[name="gear_choice"]', 'input[name="dominant_hand"]'].forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          el.addEventListener('input', saveForm);
          el.addEventListener('change', saveForm);
        });
      });
    })();
  </script>

==== จบ <script> เดิม ====
-->
