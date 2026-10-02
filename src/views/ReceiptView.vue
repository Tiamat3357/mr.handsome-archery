<!--
  ถูกแยกออกมาจาก src/views/CustomerView.vue (หน้า 6/8)
  ต้นฉบับเดิม: receipt.html   |   e-Ticket / Tactical Pass
  เนื้อหาใน <body> ถูกย้ายเข้า <template> แบบ verbatim (ไม่จัดรูปแบบใหม่)
-->
<template>
  <div class="bg-surface font-body-md text-body-md text-on-surface antialiased" lang="th">
<header class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 w-full px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-base"><div class="flex items-center gap-sm"><a href="/"><span class="font-headline-md text-headline-md text-on-surface uppercase tracking-wider inline-block">MR.HANDSOME</span></a></div><nav class="hidden md:flex items-center gap-md" data-active-classes="bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg px-sm py-xs"><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" data-path="services" href="/#services">บริการ</a><a aria-current="page" class="uppercase tracking-wider transition-colors bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg px-sm py-xs" data-path="booking" href="/schedule">การจอง</a><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" data-path="gear" href="/equipment">อุปกรณ์</a><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" href="/my-bookings">บัตรจอง</a></nav></div></header><main class="w-full pt-16 bg-surface min-h-[calc(100vh-16rem)]"><div class="flex flex-col w-full">
<!-- Interactive & Print Notification Toast -->
<div class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none" id="actionToast">
<div class="bg-inverse-surface text-inverse-on-surface px-md py-sm rounded-xl shadow-xl flex items-center gap-sm">
<span class="material-symbols-outlined text-primary-container" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="font-label-md text-label-md" id="actionToastText">กำลังเตรียมไฟล์...</span>
</div>
</div><section class="w-full bg-surface-container-lowest shadow-sm py-sm md:py-md border-b border-surface-container"><div class="w-full px-margin-mobile md:px-margin-desktop"><div class="max-w-5xl mx-auto"><div class="grid grid-cols-2 md:grid-cols-4 gap-sm items-center relative"><div class="flex items-center gap-sm group"><div class="w-10 h-10 rounded-full bg-inverse-surface text-inverse-on-surface flex items-center justify-center font-label-md text-label-md shrink-0 shadow-sm"><span class="material-symbols-outlined text-[20px]">check</span></div><div class="flex flex-col min-w-0"><span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">ขั้นตอนที่ 1</span><span class="font-label-md text-label-md text-on-surface truncate">เลือกวันและรอบเวลา</span></div></div><div class="flex items-center gap-sm group"><div class="w-10 h-10 rounded-full bg-inverse-surface text-inverse-on-surface flex items-center justify-center font-label-md text-label-md shrink-0 shadow-sm"><span class="material-symbols-outlined text-[20px]">check</span></div><div class="flex flex-col min-w-0"><span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">ขั้นตอนที่ 2</span><span class="font-label-md text-label-md text-on-surface truncate">ข้อมูลผู้จอง &amp; อุปกรณ์</span></div></div><div class="flex items-center gap-sm group"><div class="w-10 h-10 rounded-full bg-inverse-surface text-inverse-on-surface flex items-center justify-center font-label-md text-label-md shrink-0 shadow-sm"><span class="material-symbols-outlined text-[20px]">check</span></div><div class="flex flex-col min-w-0"><span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">ขั้นตอนที่ 3</span><span class="font-label-md text-label-md text-on-surface truncate">3. ยืนยันการจอง</span></div></div><div class="flex items-center gap-sm p-xs rounded-xl bg-primary-container/15"><div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-headline-md shrink-0 shadow-sm ring-4 ring-primary-container/20"><span class="material-symbols-outlined text-[20px] font-bold">confirmation_number</span></div><div class="flex flex-col min-w-0"><span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">กำลังดำเนินการ</span><span class="font-label-md text-label-md text-on-surface font-bold truncate">4. บันทึก E-Ticket</span></div></div></div></div></div></section>
<div class="w-full px-margin-mobile md:px-margin-desktop py-lg">
<!-- Breadcrumb & Top Utility -->
<div class="flex flex-col gap-base pb-md">

<!-- Action Strip Header -->
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-md">
<div>
<div class="flex items-center gap-sm">
<span class="px-base py-xs bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded uppercase tracking-wider font-bold">Booking Pass Calibrated</span>
<span class="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-xs">
<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ระบบลงทะเบียนพร้อมใช้งาน
            </span>
</div>
<h1 class="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mt-xs">
            บัตรเข้าสนามยิงธนู (e-Ticket &amp; Tactical Pass)
          </h1>
</div>
<!-- Utility Action Buttons -->
<div class="flex flex-wrap items-center gap-sm">
<button class="px-md py-sm bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-all rounded-lg font-label-md text-label-md flex items-center gap-xs cursor-pointer active:scale-95" onclick="downloadTicketPdf()">
<span class="material-symbols-outlined text-[20px]">download</span>
            ดาวน์โหลด PDF
          </button>
<button class="px-md py-sm bg-surface-container hover:bg-surface-container-high text-on-surface transition-all rounded-lg font-label-md text-label-md flex items-center gap-xs cursor-pointer active:scale-95" onclick="downloadTicketImage()">
<span class="material-symbols-outlined text-[20px]">photo_camera</span>
            บันทึกเป็นรูปภาพ
          </button>
</div>
</div>
</div>
<!-- MAIN PRINTABLE BOARDING PASS CARD -->
<div class="w-full max-w-5xl mx-auto my-base">
<div class="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden relative" id="printablePass">
<!-- Tactical Calibration Banner Header -->
<div class="bg-inverse-surface text-inverse-on-surface px-md py-sm flex flex-wrap items-center justify-between gap-base">
<div class="flex items-center gap-sm">
<div class="w-7 h-7 rounded bg-primary-container flex items-center justify-center text-on-primary-container">
<span class="material-symbols-outlined text-[18px]">crisis_alert</span>
</div>
<div class="flex flex-col">
<span class="font-label-md text-label-md text-primary-container uppercase tracking-widest leading-none font-bold">MR.HANDSOME ARCHERY CLUB</span>
<span class="font-label-sm text-label-sm text-secondary-fixed-dim tracking-wider">OFFICIAL ADMISSION TICKET // INDOOR SHOOTING ZONE</span>
</div>
</div>
<div class="flex items-center gap-base">
<div class="text-right hidden sm:block">
<span class="font-label-sm text-label-sm text-secondary-fixed-dim uppercase tracking-wider block leading-none">Booking ID</span>
<span class="font-headline-md text-headline-md text-primary-container font-bold" id="bookingId">#MH-2024-889</span>
</div>
<span class="px-sm py-xs bg-emerald-700/80 text-white rounded font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-xs">
<span class="material-symbols-outlined text-[16px]">verified</span> ยืนยันแล้ว (CONFIRMED)
            </span>
</div>
</div>
<!-- Body Pass: Split Ticket Main & Stub -->
<div class="grid grid-cols-1 lg:grid-cols-12 relative">
<!-- Tactical Left Strip Accent (Visual Metaphor) -->
<div class="hidden lg:flex lg:col-span-1 bg-surface-container-high flex-col items-center justify-between py-md">
<span class="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
              TARGET RANGE // LANE 04
            </span>
<div class="w-2 h-16 bg-primary-container rounded-full"></div>
<span class="font-label-sm text-label-sm text-primary font-bold">18M</span>
</div>
<!-- Main Core Information Block -->
<div class="col-span-1 lg:col-span-8 p-md lg:p-lg flex flex-col justify-between relative">
<!-- Target Watermark Subtle Graphic -->
<div class="absolute right-4 bottom-4 pointer-events-none opacity-[0.03]">
<svg fill="none" height="240" stroke="currentColor" viewBox="0 0 100 100" width="240">
<circle cx="50" cy="50" r="46" stroke-width="2"></circle>
<circle cx="50" cy="50" r="36" stroke-width="2"></circle>
<circle cx="50" cy="50" r="26" stroke-width="2"></circle>
<circle cx="50" cy="50" r="16" stroke-width="2"></circle>
<circle cx="50" cy="50" r="6" stroke-width="2"></circle>
<line stroke-width="1" x1="50" x2="50" y1="0" y2="100"></line>
<line stroke-width="1" x1="0" x2="100" y1="50" y2="50"></line>
</svg>
</div>
<div class="flex flex-col gap-md relative z-10">
<!-- Primary Target & Range Hero Metric -->
<div class="bg-surface-container-low p-md rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md">
<div>
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider block">สนามที่กำหนด / Designated Facility</span>
<h2 class="font-headline-lg text-headline-lg text-on-surface font-bold">ลานมาตรฐาน 18 ม. (Standard Lane 18m)</h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-xs">เลนที่ 04 (Lane 04) - แสงสว่างมาตรฐานแข่งขันสากล ระบบระบายอากาศปิดกันเสียงสะท้อน</p>
</div>
<div class="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto bg-surface-container-lowest sm:bg-transparent p-sm sm:p-0 rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">เวลาฝึกซ้อม</span>
<span class="font-headline-md text-headline-md text-primary font-bold">60 นาที</span>
</div>
</div>
<!-- Data Matrix (Key Specifications) -->
<div class="grid grid-cols-2 sm:grid-cols-3 gap-base sm:gap-md">
<div class="bg-surface-container-lowest p-sm rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase block">วันที่เข้าใช้บริการ</span>
<div class="flex items-center gap-xs mt-xs text-on-surface font-bold">
<span class="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
<span class="font-label-md text-label-md">12 ต.ค. 2024</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">วันเสาร์</span>
</div>
<div class="bg-surface-container-lowest p-sm rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase block">รอบเวลายิงธนู</span>
<div class="flex items-center gap-xs mt-xs text-on-surface font-bold">
<span class="material-symbols-outlined text-primary text-[18px]">schedule</span>
<span class="font-label-md text-label-md" id="eticketTime">11:00 - 12:00 น.</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">รอบช่วงเช้า (Morning Slot)</span>
</div>
<div class="bg-surface-container-lowest p-sm rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase block">จำนวนนักกีฬา</span>
<div class="flex items-center gap-xs mt-xs text-on-surface font-bold">
<span class="material-symbols-outlined text-primary text-[18px]">groups</span>
<span class="font-label-md text-label-md">1 - 2 ท่าน</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">คันธนูพร้อมเป้าตามจำนวนต</span>
</div>
<div class="bg-surface-container-lowest p-sm rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase block">ชื่อผู้จอง / Contact</span>
<div class="flex items-center gap-xs mt-xs text-on-surface font-bold">
<span class="material-symbols-outlined text-primary text-[18px]">badge</span>
<span class="font-label-md text-label-md truncate" id="eticketName">—</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">—</span>
</div>
<div class="bg-surface-container-lowest p-sm rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase block">อุปกรณ์ในแพ็กเกจ</span>
<div class="flex items-center gap-xs mt-xs text-on-surface font-bold">
<span class="material-symbols-outlined text-primary text-[18px]">sports_martial_arts</span>
<span class="font-label-md text-label-md">Full Recurve Gear</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant">พร้อมโค้ชบรีฟเทคนิค</span>
</div>
<div class="bg-surface-container-lowest p-sm rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase block">ยอดชำระสุทธิ</span>
<div class="flex items-center gap-xs mt-xs text-emerald-700 font-bold">
<span class="material-symbols-outlined text-[18px]">payments</span>
<span class="font-label-md text-label-md" id="eticketTotal">370 ฿</span>
</div>
<span class="font-label-sm text-label-sm text-on-surface-variant font-semibold" id="paymentMeta">QR PromptPay (ชำระแล้ว)</span>
</div>
</div>
<!-- Tactical Rules & Readiness Box -->
<div class="bg-surface-container p-sm rounded-xl">
<div class="flex items-center gap-xs text-on-surface font-label-md text-label-md font-bold mb-xs">
<span class="material-symbols-outlined text-primary text-[20px]">shield</span>
                  ข้อปฏิบัติและคำแนะนำสำคัญก่อนเข้ายิง (Safety Briefing Protocol)
                </div>
<ul class="grid grid-cols-1 sm:grid-cols-3 gap-sm font-label-sm text-label-sm text-on-surface-variant">
<li class="flex items-start gap-xs">
<span class="font-bold text-primary">01.</span>
<span class="">กรุณามาถึงก่อนเวลา <strong>10-15 นาที</strong> เพื่อตรวจเช็กคันธนูและรับฟังบรีฟความปลอดภัย</span>
</li>
<li class="flex items-start gap-xs">
<span class="font-bold text-primary">02.</span>
<span class="">สวมใส่<strong>ชุดทะมัดทะแมง</strong>และ<strong>รองเท้าผ้าใบหุ้มส้น</strong>เท่านั้นเพื่อความปลอดภัย</span>
</li>
<li class="flex items-start gap-xs">
<span class="font-bold text-primary">03.</span>
<span class="">แสดงบัตรนี้ แก่เจ้าหน้าที่ต้อนรับบริเวณหน้าเคาน์เตอร์ก่อนก้าวเข้าลานยิง</span>
</li>
</ul>
</div>
</div>
<!-- Operational Meta Footnote -->
<div class="pt-md mt-md flex flex-wrap items-center justify-between gap-sm text-on-surface-variant font-label-sm text-label-sm">
<span class="font-mono">SYS.VER: TAC-v4.8 // AUTH: PASS-APPROVED // EXP: 12-OCT-2024 12:00</span>
<span class="text-primary font-semibold">MR.HANDSOME ARCHERY SYSTEM</span>
</div>
</div>
<!-- TICKET STUB / QR PASS SECTION (Right Column) -->
<div class="lg:col-span-3 bg-surface-container-high flex flex-col items-center justify-center gap-sm p-md print:col-span-3" id="qrStub">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold tracking-widest">SCAN TO CHECK-IN</span>
<div class="bg-white rounded-lg p-sm shadow-lg">
<img id="qrPassImg" alt="QR Code สำหรับเช็คอินเข้าสนาม MR.HANDSOME" class="w-36 h-36 md:w-44 md:h-44 object-contain"/>
<div id="qrPassFallback" class="hidden w-36 h-36 md:w-44 md:h-44 flex-col items-center justify-center text-center">
<span class="material-symbols-outlined text-[28px]" style="color:#1a1a1a">qr_code_2</span>
<span class="text-[10px] font-mono p-xs rounded mt-xs" style="color:#1a1a1a">QR PASS</span>
</div>
</div>
<span class="font-label-md text-label-md text-on-surface font-bold">รหัส Pass: <span id="qrPassCode">#MH-2024-889</span></span>
<span class="font-label-sm text-label-sm text-on-surface-variant text-center">สแกนบัตรนี้ที่เคาน์เตอร์<br/>เพื่อยืนยันการเข้าใช้สนาม</span>
</div>

</div>
<!-- Perforated Cut Guide for Paper Printouts -->
<div class="hidden print:block w-full text-center py-xs font-mono text-[10px] text-on-surface-variant">
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ตัดตามรอยประหรือพับเพื่อพกพาเข้าสนาม - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        </div>
</div>
</div>
<!-- BOTTOM HELPER CARDS (Range Rules & Navigation) -->
<div class="w-full max-w-5xl mx-auto mt-lg grid grid-cols-1 md:grid-cols-2 gap-md">
<!-- Equipment Checklist & Support -->
<div class="bg-surface-container-low p-md rounded-xl flex flex-col justify-between">
<div>
<div class="flex items-center gap-xs text-primary font-bold mb-xs">
<span class="material-symbols-outlined text-[20px]">inventory_2</span>
<span class="font-label-md text-label-md uppercase">สิทธิประโยชน์ในแพ็กเกจ</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold">อุปกรณ์ที่เตรียมไว้ให้</h3>
<div class="mt-base flex flex-col gap-sm">
<div class="flex items-start gap-xs">
<span class="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
<span class="font-label-md text-label-md text-on-surface">คันธนู Recurve มาตรฐาน พร้อมสายวัดแรงดึง (Poundage Setup)</span>
</div>
<div class="flex items-start gap-xs">
<span class="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
<span class="font-label-md text-label-md text-on-surface">ลูกธนูคาร์บอน 12 ลูก พร้อมซองใส่ลูกธนู (Quiver)</span>
</div>
<div class="flex items-start gap-xs">
<span class="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
<span class="font-label-md text-label-md text-on-surface">อุปกรณ์เซฟตี้: ที่สวมป้องกันแขน (Armguard) และ Finger Tab</span>
</div>
<div class="flex items-start gap-xs">
<span class="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
<span class="font-label-md text-label-md text-on-surface">ครูฝึกดูแลความปลอดภัยและปรับท่าทางเบื้องต้น 15 นาที</span>
</div>
</div>
</div>
<div class="mt-md p-sm bg-surface-container-lowest rounded-lg">
<span class="font-label-sm text-label-sm text-on-surface-variant block">ต้องการนำคันธนูส่วนตัวมาเอง?</span>
<span class="font-label-sm text-label-sm text-primary font-semibold">สามารถนำมาได้ โปรดแจ้งโค้ชเพื่อตรวจวัด Poundage ก่อนขึ้นสาย</span>
</div>
</div>
<!-- Real-time Status & Navigation Actions -->
<div class="bg-surface-container-low p-md rounded-xl flex flex-col justify-between">
<div>
<div class="flex items-center gap-xs text-primary font-bold mb-xs">
<span class="material-symbols-outlined text-[20px]">sync_alt</span>
<span class="font-label-md text-label-md uppercase">การดำเนินการต่อ</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold">บันทึกหรือเปลี่ยนรอบ</h3>
<p class="font-body-md text-body-md text-on-surface-variant mt-xs">
            หากต้องการเลื่อนรอบเวลา กรุณาแจ้งล่วงหน้าอย่างน้อย 4 ชั่วโมงก่อนเวลาเริ่มการฝึกซ้อม
          </p>
<div class="mt-base p-sm bg-surface-container rounded-lg flex items-center gap-sm">
<span class="material-symbols-outlined text-primary text-[24px]">notifications_active</span>
<div class="flex flex-col">
<span class="font-label-sm text-label-sm font-bold text-on-surface">การแจ้งเตือนทาง SMS</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">ส่งรหัส Pass ทาง SMS เรียบร้อยแล้ว</span>
</div>
</div>
</div>
<div class="mt-md flex flex-col gap-sm">
<a class="w-full py-sm px-md bg-primary hover:bg-primary-fixed-dim text-on-primary font-bold font-label-md text-label-md rounded-lg text-center transition-colors flex items-center justify-center gap-xs shadow-md active:scale-95 cursor-pointer" href="/">
<span class="material-symbols-outlined text-[18px]">home</span>
            กลับหน้าหลัก (Home)
          </a>
</div>
</div>
</div>
<!-- Additional Tactical Visual Showcase Strip -->
<div class="w-full max-w-5xl mx-auto mt-lg pt-md">
<div class="flex items-center justify-between mb-sm">
<span class="font-label-md text-label-md uppercase text-on-surface-variant font-bold tracking-wider">
          ภาพบรรยากาศลานยิงธนูในร่ม // Tactical Range Atmosphere
        </span>
<span class="font-label-sm text-label-sm text-primary font-bold">18-METER CALIBRATED</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-base">
<div class="relative rounded-xl overflow-hidden shadow-sm h-48 group">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Modern indoor archery range with bright illumination, sleek wooden shooting dividers, crisp target butts positioned at 18 meters, tactical mustard yellow and charcoal black interior accents, clean athletic atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuwfHJPznMy_1b8M1f0uhEKq9ni_cUOjCVX_BJIJ2fO2Px_19tu3NOvhj-r3wPhYooFrYNt_Z94pXLdOU7eWk5GHJXQM0MBp7d3saXXevfzr2IkgCoxDD7p-4TCUqGX0Jl8YF8VCmToE8vsNbkN_W8AFlngdqqYUihptVo-EhJViQbEmfwH1zsHSTL3YwwEEOyKPeKpMOuILVqf4KaDVb1uwy7z41TGuKmSporK7noIuqKNtD0qo-HgA">
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-sm">
<span class="font-label-sm text-label-sm text-white font-bold">Lane 04 - High Focus Indoor Setup</span>
</div>
</div>
<div class="relative rounded-xl overflow-hidden shadow-sm h-48 group">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Close up shot of premium recurve archery equipment, carbon arrows with yellow fletchings resting on a tactical gear stand, warm moody professional sports lighting, sharp focus on string and riser" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMGIHzZjqJlWD2zSonb60bTcTkGc74VW6qW1jKeZLopEdm6ZTIDNqtE1sqhAfRY2dC0Nmp_GLf_UF4GCExzWvl4Vzyr2Hja15NTRMQpPtj07lVty_8PTR02pKCE3AVp065oJm1oD_eA5U7GIR9EfaOAUq5LXKABjh-LtlodGnP7WXytVewd2aE572K1GJ2h1hlGiC6RLSqJUpIX4m8geh8QAEAmeXRLpkbZsWvywGUJRO8lzSzmA3_Pg">
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-sm">
<span class="font-label-sm text-label-sm text-white font-bold">Pro Calibrated Recurve &amp; Arrows</span>
</div>
</div>
<div class="relative rounded-xl overflow-hidden shadow-sm h-48 group hidden sm:block">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Professional archery coach instructing an athlete at the shooting line, wearing sporty dark apparel with mustard yellow insignia, holding bow with proper form, archery club target faces in background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIP4eh2YUYVuW6bzl0d7qQNGcpGfAGBfTMG2EJBwedhBE7aOMCCWotdtiQohEkiD2jeTpBAnV5mA0FSVFrf3o3s12yUZ-m3GehLm6NLfKNS0zLsQbJl_lOF4QnFr2uzYWtcbbVBAR4UVLAmVJJkE6kS6qMkh12eexPQkL8VGvaWboCBYF0-XRYlL_DF8B56yPj8egD6SC4vK07XBqrU1T70a_5TKW6JNJrX3LHN7aaAA1ekiLfG_pwdA">
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-sm">
<span class="font-label-sm text-label-sm text-white font-bold">Coach Safety &amp; Form Briefing</span>
</div>
</div>
</div>
</div>
</div>
<!-- Inline Script for Interactive Feedback & PDF Emulation -->







</div></main><footer class="w-full bg-inverse-surface text-inverse-on-surface py-lg"><div class="w-full px-margin-mobile md:px-margin-desktop"><div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-md pb-md"><div class="flex flex-col gap-xs"><div class="flex items-center gap-sm"><span class="font-headline-md text-headline-md text-primary-container uppercase tracking-wider">MR.HANDSOME</span><span class="font-label-sm text-label-sm px-base py-xs rounded bg-surface-container text-on-surface-variant uppercase tracking-wider">Tactical Range</span></div><p class="font-body-md text-body-md text-secondary-fixed-dim max-w-sm">ศูนย์ฝึกและสนามยิงธนูสไตล์ Modern Tactical สำหรับนักกีฬาระดับมืออาชีพและผู้ฝึกซ้อมเพื่อความแม่นยำสูงสุด</p></div><div class="flex flex-wrap gap-md font-label-md text-label-md"><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/#rules">กฎสนามและความปลอดภัย</a><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/#pricing">แพ็กเกจสมาชิก</a><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/">ติดต่อเรา</a></div></div><div class="mt-md pt-md flex flex-col sm:flex-row justify-between items-center gap-base font-label-sm text-label-sm text-secondary-fixed-dim"><p class="">© 2025 MR.HANDSOME Archery Club. Precision &amp; Power. All rights reserved.</p><div class="flex gap-md"><span class="uppercase tracking-widest text-primary-container">Precision Calibrated</span></div></div></div></footer>
  </div>
</template>

<!-- <style> เดิมจาก <head> (ไม่ scoped ตามที่สั่ง) -->
<style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style>

<!--
  ==== <script> เดิมทั้งหมดของหน้านี้ (เก็บไว้ก่อน ยังไม่ได้แปลงเป็น Vue) ====
  รวมทั้ง tailwind CDN, tailwind.config, js/*.js และ inline script

  [1] (จาก <head>)
<script src="https://cdn.tailwindcss.com"></script>

  [2] (จาก <head>)
<script id="tailwind-config">tailwind.config={darkMode:"class",theme:{extend:{"colors":{"on-primary":"#1a1a1a","error-container":"#5c2b2b","primary-fixed-dim":"#c9a227","on-primary-fixed-variant":"#fff3b8","outline":"#5a5a5a","on-tertiary-container":"#fff3b8","on-error":"#2b0000","secondary-fixed":"#262626","on-surface":"#f5f5f0","on-primary-fixed":"#1a1a1a","on-secondary-container":"#e8e8e2","surface-variant":"#2c2c2c","error":"#ff8a80","surface":"#1a1a1a","secondary-fixed-dim":"#333333","on-surface-variant":"#bfbfbb","tertiary-fixed":"#2e2e2e","surface-container-highest":"#343434","on-background":"#f5f5f0","primary":"#ffd700","on-secondary":"#f5f5f0","surface-bright":"#2a2a2a","surface-container-lowest":"#262626","on-tertiary-fixed":"#fff3b8","surface-container-low":"#262626","secondary":"#181818","on-secondary-fixed-variant":"#d0d0ca","outline-variant":"#383838","inverse-on-surface":"#f5f5f0","on-primary-container":"#fff3b8","tertiary":"#ffe066","primary-container":"#ffd700","surface-container":"#262626","on-error-container":"#ffdad6","background":"#121212","surface-dim":"#121212","tertiary-container":"#3a3a3a","primary-fixed":"#ffd700","on-tertiary":"#1a1a1a","surface-tint":"#ffd700","on-secondary-fixed":"#f5f5f0","surface-container-high":"#2e2e2e","inverse-primary":"#ffd700","tertiary-fixed-dim":"#3a3a3a","on-tertiary-fixed-variant":"#e8e0c0","inverse-surface":"#181818","secondary-container":"#262626"},"borderRadius":{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"},"spacing":{"gutter":"24px","xs":"4px","sm":"12px","lg":"48px","margin-desktop":"48px","xl":"80px","base":"8px","md":"24px","margin-mobile":"16px"},"fontFamily":{"body-md":["Be Vietnam Pro"],"label-sm":["Be Vietnam Pro"],"headline-lg":["Be Vietnam Pro"],"headline-xl":["Be Vietnam Pro"],"body-lg":["Be Vietnam Pro"],"label-md":["Be Vietnam Pro"],"headline-lg-mobile":["Be Vietnam Pro"],"headline-md":["Be Vietnam Pro"]},"fontSize":{"body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],"label-sm":["12px",{"lineHeight":"16px","fontWeight":"700"}],"headline-lg":["32px",{"lineHeight":"40px","letterSpacing":"-0.01em","fontWeight":"700"}],"headline-xl":["48px",{"lineHeight":"56px","letterSpacing":"-0.02em","fontWeight":"800"}],"body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],"label-md":["14px",{"lineHeight":"20px","letterSpacing":"0.05em","fontWeight":"600"}],"headline-lg-mobile":["24px",{"lineHeight":"32px","fontWeight":"700"}],"headline-md":["24px",{"lineHeight":"32px","fontWeight":"700"}]}}}}</script>

  [3] (จาก <body>)
<script>
    function simulateAction(message) {
      const toast = document.getElementById('actionToast');
      const toastText = document.getElementById('actionToastText');
      if (toast && toastText) {
        toastText.textContent = message;
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        
        setTimeout(() => {
          toast.classList.remove('translate-y-0', 'opacity-100');
          toast.classList.add('translate-y-20', 'opacity-0');
        }, 3200);
      }
    }

    function downloadTicketPdf() {
      if (!window.html2pdf) {
        simulateAction('ไม่พบเครื่องมือสร้าง PDF — กรุณาเปิดผ่านอินเทอร์เน็ตแล้วลองใหม่');
        return;
      }
      try {
        var el = document.getElementById('printablePass');
        simulateAction('กำลังสร้างไฟล์ PDF...');
        html2pdf().set({
          margin: 12,
          filename: 'MR-HANDSOME-Eticket.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, backgroundColor: '#262626', useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from(el).save().then(function () {
          simulateAction('ดาวน์โหลดไฟล์ PDF เรียบร้อยแล้ว');
        });
      } catch (err) {
        simulateAction('ดาวน์โหลด PDF ไม่สำเร็จ');
      }
    }

    function downloadTicketImage() {
      if (!window.html2canvas) {
        simulateAction('ไม่พบเครื่องมือสร้างรูปภาพ — กรุณาเปิดผ่านอินเทอร์เน็ตแล้วลองใหม่');
        return;
      }
      var el = document.getElementById('printablePass');
      if (!el) return;
      simulateAction('กำลังสร้างรูปภาพ...');
      html2canvas(el, { scale: 2, backgroundColor: '#262626', useCORS: true }).then(function (canvas) {
        var a = document.createElement('a');
        a.download = 'MR-HANDSOME-Eticket.png';
        a.href = canvas.toDataURL('image/png');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        simulateAction('บันทึกรูปภาพบัตร e-Ticket (PNG) ลงในเครื่องแล้ว');
      }).catch(function () {
        simulateAction('บันทึกเป็นรูปภาพไม่สำเร็จ');
      });
    }
  </script>

  [4] (จาก <body>)
<script>
    (function () {
      var params = new URLSearchParams(window.location.search);
      var dur = parseInt(params.get('duration') || '1', 10);
      if (isNaN(dur) || dur < 1 || dur > 5) dur = 1;
      var start = (params.get('time') || '11:00').trim().replace(/ น\./g, '').split(' - ')[0];
      var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
      var p = start.split(':');
      var totalMin = (+p[0]) * 60 + (+p[1]) + dur * 60;
      var endH = pad2(Math.floor((totalMin / 60) % 24)) + ':' + pad2(totalMin % 60);
      var timeEl = document.getElementById('eticketTime');
      var totalEl = document.getElementById('eticketTotal');
      if (timeEl) timeEl.textContent = start + ' - ' + endH + ' น.';
      if (totalEl) totalEl.textContent = (370 * dur) + ' ฿';
      if (params.get('name')) {
        var nameEl = document.getElementById('eticketName');
        if (nameEl) nameEl.textContent = params.get('name');
      }
    })();
  </script>

  [5] (จาก <body>)
<script>
    (function () {
      var params = new URLSearchParams(window.location.search);
      var pm = params.get('payment') || '';
      if (!pm && params.get('id')) {
        try {
          var list = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]');
          for (var i = 0; i < list.length; i++) {
            if (list[i].id === params.get('id')) { pm = list[i].payment || ''; break; }
          }
        } catch (e) {}
      }
      var stub = document.getElementById('qrStub');
      var meta = document.getElementById('paymentMeta');
      if (pm && pm !== 'promptpay' && stub) {
        stub.innerHTML =
          '<span class="material-symbols-outlined text-[44px] text-primary">storefront</span>' +
          '<span class="font-label-md text-label-md text-on-surface font-bold text-center">ชำระเงินสด / บัตร<br/>ที่เคาน์เตอร์สนาม</span>' +
          '<span class="font-label-sm text-label-sm text-on-surface-variant text-center max-w-[220px]">บัตรนี้ไม่มี QR Code — แสดงบัตร ณ จุดประชาสัมพันธ์สนามเพื่อเข้ายิง</span>';
      }
      if (meta) meta.textContent = (pm && pm !== 'promptpay') ? 'ชำระเงินสด / บัตร ที่เคาน์เตอร์สนาม (ชำระแล้ว)' : 'QR PromptPay (ชำระแล้ว)';
    })();
  </script>

  [6] (จาก <body>)
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

  [7] (จาก <body>)
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

  [8] (จาก <body>)
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

  [9] (จาก <body>)
<script>
    (function () {
      try {
        if (sessionStorage.getItem('__mrhs_new_ticket') !== '1') return;
        sessionStorage.removeItem('__mrhs_new_ticket');
        var params = new URLSearchParams(window.location.search);
        var dateText = params.get('date') || '';
        var timeText = (params.get('time') || '11:00').replace(/ น\./g, '');
        var start = timeText.split(' - ')[0];
        var dur = parseInt(params.get('duration') || '1', 10);
        if (isNaN(dur) || dur < 1 || dur > 5) dur = 1;

        var counter = parseInt(localStorage.getItem('mrhs_booking_counter') || '0', 10) + 1;
        localStorage.setItem('mrhs_booking_counter', String(counter));
        var id = 'MH-' + (241000 + counter);
        window.__bookingId = id;
        var idEl = document.getElementById('bookingId');
        if (idEl) idEl.textContent = '#' + id;

        var MON = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
        var dParts = dateText.split(' ');
        var startTs = null;
        if (dParts.length >= 3) {
          var mIdx = MON.indexOf(dParts[1]);
          var y = parseInt(dParts[2], 10);
          var dd = parseInt(dParts[0], 10);
          var hm = start.split(':');
          if (mIdx >= 0 && !isNaN(y) && !isNaN(dd)) {
            startTs = new Date(y, mIdx, dd, parseInt(hm[0], 10) || 0, parseInt(hm[1], 10) || 0).getTime();
          }
        }

        var rec = {
          id: id,
          date: dateText,
          time: timeText,
          duration: dur,
          name: params.get('name') || '',
          phone: params.get('phone') || '',
          payment: params.get('payment') || 'promptpay',
          startTs: startTs,
          createdTs: Date.now(),
          status: 'active',
          cancelReason: ''
        };
        var list = [];
        try { list = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]'); } catch (err) { list = []; }
        if (!Array.isArray(list)) list = [];
        function tMin(x) { var p = String(x).split(':'); return (+p[0]) * 60 + (+p[1]); }
        var conflict = false;
        for (var d = 0; d < list.length; d++) {
          var bk = list[d];
          if (bk.status === 'cancelled' || bk.date !== rec.date) continue;
          var bs0 = bk.time ? tMin(String(bk.time).replace(/ น\./g, '').split(' - ')[0]) : -1;
          if (bs0 < 0) continue;
          var be0 = bs0 + (bk.duration || 1) * 60;
          var st0 = tMin(String(rec.time).split(' - ')[0]);
          var se0 = st0 + dur * 60;
          if (st0 < be0 && bs0 < se0) { conflict = true; break; }
        }
        if (!conflict) {
          list.unshift(rec);
          localStorage.setItem('mrhs_bookings', JSON.stringify(list));
        }
      } catch (err) {}
    })();
  </script>

  [10] (จาก <body>)
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

  [11] (จาก <body>)
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

  [12] (จาก <body>)
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

  [13] (จาก <body>)
<script>
    (function () {
      var params = new URLSearchParams(window.location.search);
      var code = params.get('id') || window.__bookingId || 'MH-2024-889';
      var pass = code + '|' + (params.get('time') || '11:00') + '|' + (params.get('date') || '');
      var codeEl = document.getElementById('qrPassCode');
      if (codeEl) codeEl.textContent = code;
      var idEl = document.getElementById('bookingId');
      if (idEl && params.get('id')) idEl.textContent = '#' + code;
      var img = document.getElementById('qrPassImg');
      var fb = document.getElementById('qrPassFallback');
      if (window.QRCode && img) {
        try {
          new QRCode(img, { text: pass, width: 176, height: 176, correctLevel: QRCode.CorrectLevel.M, colorDark: '#1a1a1a', colorLight: '#ffffff' });
          return;
        } catch (err) {}
      }
      if (img && fb) {
        img.classList.add('hidden');
        fb.classList.remove('hidden');
        fb.classList.add('flex');
      }
    })();
  </script>

  [14] (จาก <body>)
<script src="js/app.js"></script>

  [15] (จาก <body>)
<script src="js/calculator.js"></script>

  [16] (จาก <body>)
<script src="js/points.js"></script>

  [17] (จาก <body>)
<script>try{sessionStorage.removeItem('mrhs_booking_form');}catch(e){}</script>

==== จบ <script> เดิม ====
-->
