<!--
  ถูกแยกออกมาจาก src/views/CustomerView.vue (หน้า 2/8)
  ต้นฉบับเดิม: booking-confirm.html   |   ตรวจสอบและยืนยันการจอง
  เนื้อหาใน <body> ถูกย้ายเข้า <template> แบบ verbatim (ไม่จัดรูปแบบใหม่)
-->
<template>
  <div class="bg-surface font-body-md text-body-md text-on-surface antialiased" lang="th">
<header class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 w-full px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-base"><div class="flex items-center gap-sm"><a href="/"><span class="font-headline-md text-headline-md text-on-surface uppercase tracking-wider inline-block">MR.HANDSOME</span></a></div><nav class="hidden md:flex items-center gap-md" data-active-classes="bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg px-sm py-xs"><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" data-path="services" href="/#services">บริการ</a><a aria-current="page" class="uppercase tracking-wider transition-colors bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg px-sm py-xs" data-path="booking" href="/schedule">การจอง</a><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" data-path="gear" href="/equipment">อุปกรณ์</a><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" href="/my-bookings">บัตรจอง</a></nav></div></header><main class="w-full pt-16 bg-surface min-h-[calc(100vh-16rem)]"><div class="flex flex-col w-full">
<!-- Top Stepper / Process Navigation Bar -->
<section class="w-full bg-surface-container-lowest shadow-sm py-sm md:py-md">
<div class="w-full px-margin-mobile md:px-margin-desktop">
<div class="max-w-5xl mx-auto">
<!-- Responsive Grid for Steps -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-sm items-center relative">
<!-- Step 1: Completed -->
<div class="flex items-center gap-sm group">
<div class="w-10 h-10 rounded-full bg-inverse-surface text-inverse-on-surface flex items-center justify-center font-label-md text-label-md shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[20px]">check</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">ขั้นตอนที่ 1</span>
<span class="font-label-md text-label-md text-on-surface truncate">เลือกวันและรอบเวลา</span>
</div>
</div>
<!-- Step 2: Completed -->
<div class="flex items-center gap-sm group">
<a class="flex items-center gap-sm min-w-0 hover:opacity-80 transition-opacity" href="/booking">
<div class="w-10 h-10 rounded-full bg-inverse-surface text-inverse-on-surface flex items-center justify-center font-label-md text-label-md shrink-0 shadow-sm">
<span class="material-symbols-outlined text-[20px]">check</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">ขั้นตอนที่ 2</span>
<span class="font-label-md text-label-md text-on-surface truncate">ข้อมูลผู้จอง &amp; อุปกรณ์</span>
</div>
</a>
</div>
<!-- Step 3: Active Current Step -->
<div class="flex items-center gap-sm p-xs rounded-xl bg-primary-container/15">
<div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-headline-md shrink-0 shadow-sm ring-4 ring-primary-container/20">
<span class="material-symbols-outlined text-[20px] font-bold">verified</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">กำลังดำเนินการ</span>
<span class="font-label-md text-label-md text-on-surface font-bold truncate">3. ยืนยันการจอง</span>
</div>
</div>
<!-- Step 4: Upcoming Step -->
<div class="flex items-center gap-sm opacity-45">
<div class="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md shrink-0">
<span class="font-label-md text-label-md">04</span>
</div>
<div class="flex flex-col min-w-0">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">ขั้นตอนถัดไป</span>
<span class="font-label-md text-label-md text-on-surface-variant truncate">บันทึก E-Ticket</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Main Booking Review Workspace -->
<section class="w-full px-margin-mobile md:px-margin-desktop py-md md:py-lg">
<div class="max-w-6xl mx-auto">
<!-- Page Header & Tactical Visual Badge -->
<div class="mb-md md:mb-lg flex flex-col md:flex-row md:items-end justify-between gap-base">
<div class="space-y-xs max-w-2xl">
<div class="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm tracking-wider">
<span class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span>TACTICAL RANGE RESERVATION • FINAL STEP</span>
</div>
<h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight">ตรวจสอบและยืนยันการจอง</h1>
<p class="font-body-md text-body-md text-on-surface-variant">กรุณาตรวจสอบข้อมูลการจอง รายละเอียดอุปกรณ์ และยอดชำระเงินให้ถูกต้องก่อนกดยืนยันการเข้าใช้บริการ</p>
</div>
<div class="hidden md:flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-sm py-base rounded-lg">
<span class="material-symbols-outlined text-[18px] text-primary">encrypted</span>
<span>ระบบรักษาความปลอดภัยความเร็วสูง 256-bit SSL</span>
</div>
</div>
<!-- Content Split Grid (8 cols Review vs 4 cols Sticky Summary) -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-md md:gap-gutter items-start">
<!-- Left Column: Detailed Modules (7 Cols) -->
<div class="lg:col-span-7 flex flex-col gap-md">
<!-- Card 1: User & Equipment Profile -->
<div class="bg-surface-container-lowest rounded-2xl p-md md:p-lg shadow-sm relative overflow-hidden">
<!-- Background Target Watermark Accent -->
<svg class="absolute -right-12 -bottom-12 w-48 h-48 opacity-[0.03] text-on-surface pointer-events-none" fill="none" stroke="currentColor" stroke-width="3" viewbox="0 0 100 100">
<circle cx="50" cy="50" r="45"></circle>
<circle cx="50" cy="50" r="32"></circle>
<circle cx="50" cy="50" r="18"></circle>
<circle cx="50" cy="50" fill="currentColor" r="6"></circle>
<line x1="0" x2="100" y1="50" y2="50"></line>
<line x1="50" x2="50" y1="0" y2="100"></line>
</svg>
<!-- Card Header -->
<div class="flex items-center justify-between pb-sm mb-md bg-surface-container-low -mx-md -mt-md md:-mx-lg md:-mt-lg p-md md:px-lg rounded-t-2xl">
<div class="flex items-center gap-sm">
<div class="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-[20px] text-primary">badge</span>
</div>
<div>
<h2 class="font-headline-md text-headline-md text-on-surface">ข้อมูลผู้ใช้บริการ &amp; อุปกรณ์</h2>
<p class="font-label-sm text-label-sm text-on-surface-variant">ข้อมูลได้รับการยืนยันความถูกต้องเรียบร้อยแล้ว</p>
</div>
</div>
<a class="inline-flex items-center gap-xs font-label-md text-label-md text-primary hover:text-on-primary-container px-sm py-xs rounded-lg hover:bg-surface-container transition-colors" href="/booking">
<span class="material-symbols-outlined text-[16px]">edit_note</span>
<span>แก้ไขข้อมูล</span>
</a>
</div>
<!-- Profile Details Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-base md:gap-md">
<div class="p-sm rounded-xl bg-surface-container-low flex flex-col justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">ชื่อ-นามสกุล ผู้จอง</span>
<span class="font-body-lg text-body-lg text-on-surface font-semibold mt-xs" id="reviewName">—</span>
</div>
<div class="p-sm rounded-xl bg-surface-container-low flex flex-col justify-between">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">เบอร์โทรศัพท์ติดต่อ</span>
<div class="flex items-center gap-xs mt-xs">
<span class="font-body-lg text-body-lg text-on-surface font-semibold" id="reviewPhone">—</span>
<span class="inline-flex items-center gap-xs px-xs py-0.5 rounded-full bg-primary-container/20 text-on-primary-container font-label-sm text-label-sm font-semibold">
<span class="material-symbols-outlined text-[14px]">check_circle</span>
<span>ยืนยันแล้ว</span>
</span>
</div>
</div>
<div class="p-sm rounded-xl bg-surface-container-low sm:col-span-2 flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">ระดับทักษะ &amp; โค้ช</span>
<div class="flex items-center gap-xs mt-xs">
<span class="material-symbols-outlined text-[18px] text-primary">sports_score</span>
<span class="font-body-md text-body-md text-on-surface font-semibold">มือใหม่ / ครั้งแรก (โค้ช 15 นาที)</span>
</div>
</div>
<div class="p-sm rounded-xl bg-surface-container-low sm:col-span-2 flex flex-col">
<div class="flex items-center justify-between mb-xs">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">ชุดอุปกรณ์ที่จัดเตรียม</span>
<span class="font-label-sm text-label-sm font-semibold text-primary bg-primary-container/15 px-sm py-xs rounded">มือขวา (Right-Hand)</span>
</div>
<div class="flex items-start gap-sm mt-xs">
<span class="material-symbols-outlined text-[24px] text-on-surface-variant shrink-0 mt-0.5">stream_apps</span>
<div>
<span class="font-body-md text-body-md font-semibold text-on-surface">อุปกรณ์มาตรฐานสนาม: Olympic Recurve พร้อมศูนย์เล็ง</span>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-0.5">รวมลูกธนูคาร์บอน 12 ลูก, Finger Tab รองนิ้ว, Arm Guard ป้องกันแขน และขาตั้งคันธนูครบชุด</p>
</div>
</div>
</div>
<div class="p-sm rounded-xl bg-surface-container-low sm:col-span-2 flex items-start gap-sm">
<span class="material-symbols-outlined text-[20px] text-on-surface-variant shrink-0 mt-0.5">chat</span>
<div>
<span class="font-label-sm text-label-sm text-on-surface-variant block">หมายเหตุและคำขอเพิ่มเติม:</span>
<p class="font-body-md text-body-md text-on-surface italic mt-0.5">“ต้องการให้เน้นการสอนท่าจับสายและท่ายืนที่ถูกต้องสำหรับผู้เริ่มต้น เพื่อความปลอดภัยสูงสุด”</p>
</div>
</div>
</div>
</div>
<!-- Card 2: Payment Selector -->
<div class="bg-surface-container-lowest rounded-2xl p-md md:p-lg shadow-sm">
<div class="flex items-center gap-sm pb-sm mb-md bg-surface-container-low -mx-md -mt-md md:-mx-lg md:-mt-lg p-md md:px-lg rounded-t-2xl">
<div class="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-[20px] text-primary">payments</span>
</div>
<div>
<h2 class="font-headline-md text-headline-md text-on-surface">เลือกช่องทางชำระเงิน</h2>
<p class="font-label-sm text-label-sm text-on-surface-variant">กรุณาเลือกช่องทางที่คุณสะดวกทำรายการเพื่อรับสิทธิการเข้ายิง</p>
</div>
</div>
<!-- Payment Options -->
<div class="flex flex-col gap-sm" id="paymentSelector">
<!-- Option 1: QR PromptPay (Selected Active State) -->
<label class="relative flex items-center justify-between p-md rounded-xl bg-surface-container-low cursor-pointer shadow-sm ring-2 ring-primary-container transition-all hover:bg-surface-container">
<div class="flex items-center gap-md">
<input checked="" class="w-5 h-5 accent-primary-container text-on-primary-container cursor-pointer" name="payment_method" type="radio" value="promptpay"/>
<div class="w-12 h-12 rounded-xl bg-surface-container-lowest p-xs flex items-center justify-center shadow-sm shrink-0">
<span class="material-symbols-outlined text-[28px] text-primary">qr_code_scanner</span>
</div>
<div>
<div class="flex items-center gap-xs">
<span class="font-body-lg text-body-lg font-bold text-on-surface">สแกน QR PromptPay / Mobile Banking</span>
<span class="font-label-sm text-label-sm px-xs py-0.5 rounded bg-primary-container text-on-primary-container font-bold">แนะนำ</span>
</div>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-xs">ออก QR Code ทันที อัปเดตสถานะอัตโนมัติ ไม่ต้องส่งสลิป</p>
</div>
</div>
<div class="hidden sm:flex flex-col items-end">
<span class="font-label-sm text-label-sm text-primary font-bold">ฟรีค่าธรรมเนียม</span>
<span class="font-label-sm text-label-sm text-on-surface-variant">ปลอดภัย 100%</span>
</div>
</label>
<!-- Option 2: Pay at Counter -->
<label class="relative flex items-center justify-between p-md rounded-xl bg-surface-container-low cursor-pointer transition-all hover:bg-surface-container">
<div class="flex items-center gap-md">
<input class="w-5 h-5 accent-primary-container text-on-primary-container cursor-pointer" name="payment_method" type="radio" value="counter"/>
<div class="w-12 h-12 rounded-xl bg-surface-container-lowest p-xs flex items-center justify-center shadow-sm shrink-0">
<span class="material-symbols-outlined text-[28px] text-on-surface-variant">storefront</span>
</div>
<div>
<span class="font-body-lg text-body-lg font-bold text-on-surface">ชำระเงินสดหรือบัตรเครดิตที่เคาน์เตอร์สนาม</span>
<p class="font-label-sm text-label-sm text-on-surface-variant mt-xs">ชำระเงินจริงก่อนเวลาเริ่มยิง 15 นาที ณ ประชาสัมพันธ์สนามยิงธนู</p>
</div>
</div>
<div class="hidden sm:flex flex-col items-end">
<span class="font-label-sm text-label-sm text-on-surface-variant">เงินสด / บัตรเครดิต</span>
</div>
</label>
</div>
<!-- Policy Assurance Notice -->
<div class="mt-md p-sm rounded-xl bg-surface-container-low flex items-center gap-sm">
<span class="material-symbols-outlined text-[22px] text-primary shrink-0">shield_lock</span>
<p class="font-label-sm text-label-sm text-on-surface-variant">
<strong class="text-on-surface">การันตีความยืดหยุ่น:</strong> ท่านสามารถยกเลิก เลื่อนวัน หรือเปลี่ยนแปลงเวลาฝึกซ้อมได้ฟรีล่วงหน้า 24 ชั่วโมง โดยติดต่อเจ้าหน้าที่สนามที่ประชาสัมพันธ์
              </p>
</div>
</div>
</div>
<!-- Right Column: Order Summary & Confirmation Action (5 Cols) -->
<div class="lg:col-span-5 flex flex-col gap-md lg:sticky lg:top-20">
<div class="bg-surface-container-lowest rounded-2xl p-md md:p-lg shadow-md relative overflow-hidden">
<!-- Tactical Top Indicator -->
<div class="h-2 w-full bg-primary-container absolute top-0 left-0 right-0"></div>
<!-- Card Heading & Tag -->
<div class="flex items-center justify-between pb-sm mb-md">
<div class="flex flex-col">
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">BOOKING SUMMARY</span>
<h3 class="font-headline-md text-headline-md text-on-surface">สรุปรายละเอียดการจอง</h3>
</div>
<span class="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold shadow-sm">
<span class="w-2 h-2 rounded-full bg-primary-container"></span>
<span>รอยืนยันการจอง</span>
</span>
</div>
<!-- Target Range Snapshot Visual -->
<div class="relative rounded-xl overflow-hidden mb-md aspect-[16/9] shadow-sm">
<img class="w-full h-full object-cover" data-alt="Modern indoor archery range with high contrast warm lights, Olympic recurve targets with yellow bullseye circles at 18 meters distance, clean tactical architecture, charcoal grey walls and athletic sports vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuARIjzsihuBdBnyabS6HFwPLbhuGNECtgNfsFjPaDJpkBIWmU70RuNf2JQJbH5dniOf0CphUfO8AJPprx2kdCb00uqMlK2K5PDyFRgglJ6oQG-6543UW9uYmzeR2NcBqcnpLyF3C8_31NDcpAuQxByVIK303jzmD1XlwczPBZ1irPo_MJywGgPXRS6i7yq0uSNLm88S6EGVUfTpjq5pCXeWskjwy0BvslEu9uedjNOc5I7Uo9Ma7zHPiA"/>
<div class="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/30 to-transparent flex flex-col justify-end p-sm">
<span class="font-label-sm text-label-sm text-primary-container uppercase font-bold tracking-widest">TACTICAL RANGE ZONE A</span>
<span class="font-headline-md text-headline-md text-inverse-on-surface">สนามมาตรฐานในร่ม 18 ม. (ลานเดี่ยว)</span>
</div>
</div>
<!-- Booking Time & Date Metas -->
<div class="space-y-sm bg-surface-container-low p-sm rounded-xl mb-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-xs text-on-surface-variant font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]">calendar_today</span>
<span>วันที่เข้ายิง</span>
</div>
<span class="font-body-md text-body-md font-bold text-on-surface" id="reviewDate">กรุณาเลือกวันที่</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-xs text-on-surface-variant font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]">schedule</span>
<span>รอบเวลา</span>
</div>
<span class="font-body-md text-body-md font-bold text-primary" id="reviewTime">11:00 - 12:00 น. (1 ชม.)</span>
</div>
<div class="flex items-center justify-between">
<div class="flex items-center gap-xs text-on-surface-variant font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]">group</span>
<span>จำนวนผู้เล่น</span>
</div>
<span class="font-body-md text-body-md font-semibold text-on-surface">1 ท่าน (ลู่ยิงหมายเลข 04)</span>
</div>
</div>
<!-- Price Breakdown Calculation -->
<div class="space-y-xs pb-md">
<div class="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
<span id="reviewHourLabel">ค่าชั่วโมงฝึกซ้อม (1 ชั่วโมง)</span>
<span class="font-semibold text-on-surface" id="reviewHourPrice">350 ฿</span>
</div>
<div class="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
<span>ค่าเป้าธนูแข่งขัน 40cm WA Standard</span>
<span class="font-semibold text-on-surface" id="reviewTargetPrice">20 ฿</span>
</div>
<div class="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
<span>ชุดอุปกรณ์นิรภัย &amp; โค้ชประกบ 15 นาที</span>
<span class="font-bold text-primary">ฟรี (ในแพ็กเกจ)</span>
</div>
<div class="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
<span>ภาษีมูลค่าเพิ่ม VAT 7%</span>
<span class="text-on-surface-variant font-medium">รวมแล้ว</span>
</div>
</div>
<!-- Segmented Visual Dotted Line -->
<div class="w-full flex items-center gap-xs mb-md">
<div class="flex-1 h-[2px] bg-surface-variant border-dashed"></div>
<span class="material-symbols-outlined text-on-surface-variant text-[16px]">south</span>
<div class="flex-1 h-[2px] bg-surface-variant border-dashed"></div>
</div>
<!-- Total Price Row -->
<div class="flex items-end justify-between mb-lg">
<div>
<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">ยอดรวมสุทธิ</span>
<p class="font-label-sm text-label-sm text-on-surface-variant">Net Amount Due</p>
</div>
<div class="text-right">
<span class="font-headline-xl text-headline-xl font-bold text-on-surface" id="reviewTotal">370</span>
<span class="font-body-lg text-body-lg text-on-surface-variant font-bold ml-xs">THB</span>
</div>
</div>
<!-- CTA Primary & Secondary Buttons -->
<div class="flex flex-col gap-sm">
<button class="w-full py-base md:py-sm px-md rounded-xl bg-inverse-surface hover:bg-primary text-inverse-on-surface hover:text-on-primary font-headline-md text-headline-md flex items-center justify-center gap-sm transition-all duration-200 shadow-md group" id="confirmBookingBtn" type="button">
<span>ยืนยันการจองและรับบัตร E-Ticket</span>
<span class="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
<a class="w-full py-base px-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-xs transition-colors text-center" href="/booking">
<span class="material-symbols-outlined text-[16px]">arrow_back</span>
<span>ย้อนกลับไปแก้ไขข้อมูลผู้จอง</span>
</a>
</div>
<!-- Club Guarantee Badge -->
<div class="mt-md pt-sm flex items-center justify-center gap-sm text-on-surface-variant font-label-sm text-label-sm">
<span class="material-symbols-outlined text-primary text-[18px]">verified_user</span>
<span>MR.HANDSOME Calibrated Precision Standard</span>
</div>
</div>
<!-- Quick Range Rules Info Card -->
<div class="bg-surface-container-low rounded-xl p-md flex items-start gap-sm">
<span class="material-symbols-outlined text-[24px] text-primary shrink-0">info</span>
<div class="space-y-xs">
<span class="font-label-md text-label-md font-bold text-on-surface">ข้อแนะนำก่อนเข้าสนาม</span>
<p class="font-label-sm text-label-sm text-on-surface-variant">กรุณาสวมรองเท้าหุ้มส้นและเสื้อผ้าทะมัดทะแมง และควรเดินทางมาถึงสนามก่อนเวลาเริ่มรอบฝึกซ้อมประมาณ 10-15 นาที เพื่อรับฟังคำแนะนำด้านความปลอดภัย</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Simple Interaction Logic for Payment Toggle & Button Feedback -->

  
</div></main><footer class="w-full bg-inverse-surface text-inverse-on-surface py-lg"><div class="w-full px-margin-mobile md:px-margin-desktop"><div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-md pb-md"><div class="flex flex-col gap-xs"><div class="flex items-center gap-sm"><span class="font-headline-md text-headline-md text-primary-container uppercase tracking-wider">MR.HANDSOME</span><span class="font-label-sm text-label-sm px-base py-xs rounded bg-surface-container text-on-surface-variant uppercase tracking-wider">Tactical Range</span></div><p class="font-body-md text-body-md text-secondary-fixed-dim max-w-sm">ศูนย์ฝึกและสนามยิงธนูสไตล์ Modern Tactical สำหรับนักกีฬาระดับมืออาชีพและผู้ฝึกซ้อมเพื่อความแม่นยำสูงสุด</p></div><div class="flex flex-wrap gap-md font-label-md text-label-md"><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/#rules">กฎสนามและความปลอดภัย</a><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/#pricing">แพ็กเกจสมาชิก</a><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/">ติดต่อเรา</a></div></div><div class="mt-md pt-md flex flex-col sm:flex-row justify-between items-center gap-base font-label-sm text-label-sm text-secondary-fixed-dim"><p>© 2025 MR.HANDSOME Archery Club. Precision &amp; Power. All rights reserved.</p><div class="flex gap-md"><span class="uppercase tracking-widest text-primary-container">Precision Calibrated</span></div></div></div></footer>
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
    (function() {
      const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
      paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
          document.querySelectorAll('#paymentSelector label').forEach(lbl => {
            lbl.classList.remove('ring-2', 'ring-primary-container');
          });
          if (this.checked) {
            this.closest('label').classList.add('ring-2', 'ring-primary-container');
          }
        });
      });

      const confirmBtn = document.getElementById('confirmBookingBtn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
          var f = window.__bookingFlow || {};
          var dtf = f.date || '';
          var stf = (f.time || '11:00');
          var duf = f.duration || 1;
          function tMin(x) { var p = String(x).split(':'); return (+p[0]) * 60 + (+p[1]); }
          if (f.date && f.time) {
            var bl = [];
            try { bl = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]'); } catch (err) {}
            if (Array.isArray(bl)) {
              for (var k2 = 0; k2 < bl.length; k2++) {
                var bk2 = bl[k2];
                if (bk2.status === 'cancelled' || bk2.date !== dtf) continue;
                var bs2 = bk2.time ? tMin(String(bk2.time).replace(/ น\./g, '').split(' - ')[0]) : -1;
                if (bs2 < 0) continue;
                var be2 = bs2 + (bk2.duration || 1) * 60;
                var se2 = tMin(stf) + duf * 60;
                if (tMin(stf) < be2 && bs2 < se2) {
                  alert('รอบเวลา' + stf + ' น. ในวันที่นี้ถูกจองไว้แล้ว (' + bk2.id + ') กรุณาเลือกข้อมูลจากหน้าแรกหรือจองรอบอื่น');
                  return;
                }
              }
            }
          }
          const originalText = confirmBtn.innerHTML;
          confirmBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[20px]">progress_activity</span><span>กำลังออกบัตร E-Ticket...</span>';
          confirmBtn.disabled = true;
          setTimeout(() => {
            var f = window.__bookingFlow || {};
            var q = new URLSearchParams();
            if (f.date) q.set('date', f.date);
            if (f.time) q.set('time', f.time);
            q.set('duration', f.duration || 1);
            if (f.name) q.set('name', f.name);
            if (f.phone) q.set('phone', f.phone);
            var pm = (document.querySelector('input[name="payment_method"]:checked') || {}).value || 'promptpay';
            q.set('payment', pm);
            sessionStorage.setItem('__mrhs_new_ticket', '1');
            window.location.href = '/receipt?' + q.toString();
          }, 900);
        });
      }
    })();
  </script>

  [4] (จาก <body>)
<script>
    (function () {
      var params = new URLSearchParams(window.location.search);
      var dur = parseInt(params.get('duration') || '1', 10);
      if (isNaN(dur) || dur < 1 || dur > 5) dur = 1;
      var start = (params.get('time') || '11:00').trim().replace(/ น\./g, '').split(' - ')[0];
      window.__bookingFlow = { date: params.get('date') || '', time: start, duration: dur };
      var fName = params.get('name') || '';
      var fPhone = params.get('phone') || '';
      window.__bookingFlow.name = fName;
      window.__bookingFlow.phone = fPhone;
      if (fName) {
        var reviewNameEl = document.getElementById('reviewName');
        if (reviewNameEl) reviewNameEl.textContent = fName;
      }
      if (fPhone) {
        var reviewPhoneEl = document.getElementById('reviewPhone');
        if (reviewPhoneEl) reviewPhoneEl.textContent = fPhone;
      }

      var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
      var p = start.split(':');
      var totalMin = (+p[0]) * 60 + (+p[1]) + dur * 60;
      var endH = pad2(Math.floor((totalMin / 60) % 24)) + ':' + pad2(totalMin % 60);

      var timeEl = document.getElementById('reviewTime');
      var dateEl = document.getElementById('reviewDate');
      var hourLabelEl = document.getElementById('reviewHourLabel');
      var hourPriceEl = document.getElementById('reviewHourPrice');
      var targetPriceEl = document.getElementById('reviewTargetPrice');
      var totalEl = document.getElementById('reviewTotal');

      if (dateEl) dateEl.textContent = params.get('date') || '';
      if (timeEl) timeEl.textContent = start + ' - ' + endH + ' น. (' + dur + ' ชม.)';
      if (hourLabelEl) hourLabelEl.textContent = 'ค่าชั่วโมงฝึกซ้อม (' + dur + ' ชั่วโมง)';
      if (hourPriceEl) hourPriceEl.textContent = (350 * dur) + ' ฿';
      if (targetPriceEl) targetPriceEl.textContent = (20 * dur) + ' ฿';
      if (totalEl) totalEl.textContent = String(370 * dur);
    })();
  </script>

  [5] (จาก <body>)
<script src="js/app.js"></script>

  [6] (จาก <body>)
<script src="js/calculator.js"></script>

  [7] (จาก <body>)
<script src="js/points.js"></script>

  [8] (จาก <body>)
<script>(function(){if(!window.location.search)return;var href='/booking'+window.location.search;document.querySelectorAll('a[href="/booking"]').forEach(function(a){a.setAttribute('href',href);});})();</script>

==== จบ <script> เดิม ====
-->
