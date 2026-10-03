<!--
  ถูกแยกออกมาจาก src/views/CustomerView.vue (หน้า 7/8)
  ต้นฉบับเดิม: schedule.html   |   ปฏิทินจองลาน
  เนื้อหาใน <body> ถูกย้ายเข้า <template> แบบ verbatim (ไม่จัดรูปแบบใหม่)
-->
<template>
  <div class="light bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col selection:bg-primary selection:text-on-surface" lang="en">
<!-- TopNavBar (Shared Component) -->
<header class="flex justify-between items-center w-full px-margin-desktop h-20 sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-outline-variant"><a href="/" class="font-headline-md text-headline-md font-extrabold tracking-tighter flex items-center gap-2 text-primary">MR.HANDSOME</a><nav class="hidden md:flex gap-gutter items-center h-full"><a class="text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md flex items-center h-full" href="/#services">บริการ</a><a class="text-on-surface font-bold border-b-2 border-primary pb-1 font-label-md text-label-md flex items-center h-full" href="/schedule">การจอง</a><a class="text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md flex items-center h-full" href="/equipment">อุปกรณ์</a><a class="text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md flex items-center h-full" href="/my-bookings">บัตรจอง</a></nav></header>
<!-- Main Content Canvas -->
<main class="flex-grow w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-lg">
<!-- Page Header -->
<div class="mb-lg">
<h1 class="font-headline-xl text-headline-xl text-on-surface mb-2">จองลานของคุณ</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant">รักษาที่ของคุณที่สนามยิงธนู ความแม่นยำรอคุณอยู่</p>
<p class="font-label-md text-label-md text-primary mt-2 font-bold">เปิดให้บริการทุกวัน: 11:00 - 17:00 น. (ยกเว้นวันพุธ)</p></div>
<!-- Booking Layout (Bento-style Grid) -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
<!-- Sidebar: Configuration (Span 3) -->
<aside class="lg:col-span-3 space-y-md">
<!-- Session Type Module -->
<div class="card-level-1 p-md relative overflow-hidden group"><span class="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] text-on-surface opacity-5 pointer-events-none transform -rotate-45 group-hover:scale-110 transition-transform duration-500">sports_score</span><h2 class="font-headline-md text-headline-md-mobile mb-sm">จองสนาม</h2><div class="space-y-sm relative z-10"><p class="font-body-md text-body-md text-on-surface-variant">เลือกจองสนามยิงธนูมาตรฐานพร้อมอุปกรณ์ครบครัน</p><div class="p-sm bg-surface-container-low rounded-md border border-outline-variant cursor-pointer transition-all border-2 border-primary interactive-shadow hover:scale-[1.02]"><span class="block font-label-md text-label-md text-on-surface font-bold">สนามมาตรฐาน (Standard Lane)</span><span class="block font-label-sm text-label-sm text-on-surface-variant mt-1">รองรับนักธนู 1-2 คน / ลาน</span></div></div></div>
<!-- Lane Selection Module -->
</aside>
<!-- Main Canvas: Calendar & Time Slots (Span 6) -->
<section class="lg:col-span-6 space-y-md">
<!-- Calendar Card -->
<div class="card-level-1 p-md bg-pattern">
<div class="flex justify-between items-center mb-md">
<h2 id="calTitle" class="font-headline-md text-headline-md-mobile">กันยายน 2026</h2>
<div class="flex gap-2">
<button id="prevMonth" type="button" class="p-2 border border-outline-variant rounded-md hover:bg-surface-container-low transition-colors" aria-label="เดือนก่อนหน้า">
<span class="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button id="nextMonth" type="button" class="p-2 border border-outline-variant rounded-md hover:bg-surface-container-low transition-colors" aria-label="เดือนถัดไป">
<span class="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
<div class="flex flex-wrap items-center gap-2 mb-md">
<select id="calMonth" class="bg-surface-container-lowest border border-outline-variant rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-primary focus:border-primary" aria-label="เลือกเดือน"></select>
<select id="calYear" class="bg-surface-container-lowest border border-outline-variant rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-primary focus:border-primary" aria-label="เลือกปี"></select>
<button id="todayBtn" type="button" class="font-label-md text-label-md px-3 py-1.5 rounded-md bg-secondary text-on-secondary hover:bg-primary hover:text-on-primary transition-colors">วันนี้</button>
</div>
<!-- Days Header -->
<div class="grid grid-cols-7 gap-2 mb-2 text-center">
<div class="font-label-sm text-label-sm text-on-surface-variant">จ.</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">อ.</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">พ.</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">พฤ.</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">ศ.</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">ส.</div>
<div class="font-label-sm text-label-sm text-on-surface-variant">อา.</div>
</div>
<!-- Calendar Grid -->
<div id="calGrid" class="grid grid-cols-7 gap-2 text-center font-body-md text-body-md"></div>
</div>
<!-- Time Slots Card -->
<div class="card-level-1 p-md">
<div class="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
<h2 class="font-headline-md text-headline-md-mobile">เวลาที่ว่าง</h2>
<span id="slotDate" class="bg-secondary text-on-secondary font-label-sm px-2 py-1 rounded-sm uppercase tracking-wider">7 ก.ย.</span>
</div>
<div class="grid grid-cols-3 sm:grid-cols-4 gap-sm"><button type="button" class="slot-btn py-3 px-2 border-2 border-primary bg-primary text-on-surface rounded-md font-label-md text-label-md font-bold flex flex-col items-center interactive-shadow" data-time="11:00" aria-pressed="true"><span class="">11:00</span></button><button type="button" class="slot-btn py-3 px-2 border border-outline-variant rounded-md font-label-md text-label-md text-on-surface hover:border-primary hover:bg-surface-container-lowest transition-all flex flex-col items-center" data-time="13:00"><span class="">13:00</span></button><button type="button" class="slot-btn py-3 px-2 border border-outline-variant rounded-md font-label-md text-label-md text-on-surface hover:border-primary hover:bg-surface-container-lowest transition-all flex flex-col items-center" data-time="14:30"><span class="">14:30</span></button><button type="button" class="slot-btn py-3 px-2 border border-outline-variant rounded-md font-label-md text-label-md text-on-surface hover:border-primary hover:bg-surface-container-lowest transition-all flex flex-col items-center" data-time="16:00"><span class="">16:00</span></button><button type="button" class="slot-btn py-3 px-2 border border-outline-variant rounded-md font-label-md text-label-md text-on-surface hover:border-primary hover:bg-surface-container-lowest transition-all flex flex-col items-center" data-time="17:00"><span class="">17:00</span></button></div><div class="mt-md border-t border-outline-variant pt-sm"><span class="font-label-sm text-label-sm text-on-surface-variant block mb-xs uppercase tracking-wider">ระยะเวลาการเล่น</span><div class="flex items-center gap-2 flex-wrap"><select id="durationSelect" class="bg-surface-container-lowest border border-outline-variant rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-primary focus:border-primary font-label-md text-label-md" aria-label="ระยะเวลาการเล่น"><option value="1" selected="">1 ชั่วโมง</option><option value="2">2 ชั่วโมง</option><option value="3">3 ชั่วโมง</option></select><span class="font-label-sm text-label-sm text-on-surface-variant">เลือกได้สูงสุด 3 ชั่วโมงต่อรอบ</span></div></div></div>
</section>
<!-- Summary Sidebar (Span 3) -->
<aside class="lg:col-span-3">
<div class="card-level-1 p-md sticky top-[100px]">
<h2 class="font-headline-md text-headline-md-mobile mb-md border-b border-outline-variant pb-sm flex items-center gap-2">
<span class="material-symbols-outlined text-primary">receipt_long</span>
                        สรุป
                    </h2>
<ul class="space-y-sm mb-md font-body-md text-body-md divide-y divide-outline-variant">
<li class="flex justify-between pt-sm">
<span class="text-on-surface-variant">เซสชัน</span>
<span class="font-bold text-on-surface">ลานส่วนตัว</span>
</li>
<li class="flex justify-between pt-sm">
<span class="text-on-surface-variant">ประเภทลาน</span>
<span class="font-bold text-on-surface">18 ม. โปร</span>
</li>
<li class="flex justify-between pt-sm">
<span class="text-on-surface-variant">วันที่</span>
<span id="summaryDate" class="font-bold text-on-surface">7 ก.ย. 2026</span>
</li>
<li class="flex justify-between pt-sm"><span class="text-on-surface-variant">เวลา</span><span id="summaryTime" class="font-bold text-on-surface">11:00 - 12:00</span></li>
<li class="flex justify-between pt-sm"><span class="text-on-surface-variant">ระยะเวลา</span><span id="summaryDuration" class="font-bold text-on-surface">1 ชม.</span></li>
</ul>
<div class="bg-surface-container p-sm rounded-md mb-md flex justify-between items-center">
<span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">รวม</span>
<span class="font-headline-lg text-headline-lg-mobile text-on-surface" id="summaryTotal">370 ฿</span>
</div>
<a href="/booking" class="w-full py-3 bg-secondary text-on-secondary font-label-md text-label-md font-bold rounded-md hover:bg-primary hover:text-on-primary transition-colors flex justify-center items-center gap-2">
                        ยืนยันการจอง
                        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</div>
</aside>
</div>
</main>
<!-- Footer (Shared Component) -->
<footer class="w-full py-lg px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter items-center bg-secondary text-on-secondary border-t border-secondary mt-auto">
<div class="font-headline-md text-headline-md font-bold text-on-secondary flex items-center gap-2">MR.HANDSOME</div>
<div class="flex flex-col md:items-end gap-2">
<nav class="flex flex-wrap gap-4 font-label-md text-label-md">
<a class="text-on-secondary/80 hover:text-on-secondary hover:underline transition-all" href="/#services">บริการ</a>
<a class="text-on-secondary/80 hover:text-on-secondary hover:underline transition-all" href="/#pricing">อัตราค่าบริการ</a>
<a class="text-on-secondary/80 hover:text-on-secondary hover:underline transition-all" href="/#rules">ความปลอดภัยของสนาม</a>
<a class="text-on-secondary/80 hover:text-on-secondary hover:underline transition-all" href="/">ติดต่อเรา</a>
</nav>
<p class="font-label-sm text-label-sm text-on-secondary/60">© 2024 MR.HANDSOME. สงวนลิขสิทธิ์ ความแม่นยำในทุกการยิง.</p>
</div>
</footer>
  </div>
</template>

<!-- <style> เดิมจาก <head> (ไม่ scoped ตามที่สั่ง) -->
<style>
        /* Custom Utilities for Design System */
        .card-level-1 {
            background-color: #262626;
            border: 1px solid #383838;
            border-radius: 16px;
        }
        .interactive-shadow {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .bg-pattern {
            background-image: radial-gradient(circle at 100% 100%, rgba(27, 27, 29, 0.03) 0%, rgba(27, 27, 29, 0.03) 10px, transparent 10px, transparent 20px);
            background-size: 20px 20px;
        }
    </style>

<!--
  ==== <script> เดิมทั้งหมดของหน้านี้ (เก็บไว้ก่อน ยังไม่ได้แปลงเป็น Vue) ====
  รวมทั้ง tailwind CDN, tailwind.config, js/*.js และ inline script

  [1] (จาก <head>)
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

  [2] (จาก <head>)
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors:{"on-primary":"#1a1a1a","error-container":"#5c2b2b","primary-fixed-dim":"#c9a227","on-primary-fixed-variant":"#fff3b8","outline":"#5a5a5a","on-tertiary-container":"#fff3b8","on-error":"#2b0000","secondary-fixed":"#262626","on-surface":"#f5f5f0","on-primary-fixed":"#1a1a1a","on-secondary-container":"#e8e8e2","surface-variant":"#2c2c2c","error":"#ff8a80","surface":"#1a1a1a","secondary-fixed-dim":"#333333","on-surface-variant":"#bfbfbb","tertiary-fixed":"#2e2e2e","surface-container-highest":"#343434","on-background":"#f5f5f0","primary":"#ffd700","on-secondary":"#f5f5f0","surface-bright":"#2a2a2a","surface-container-lowest":"#262626","on-tertiary-fixed":"#fff3b8","surface-container-low":"#262626","secondary":"#181818","on-secondary-fixed-variant":"#d0d0ca","outline-variant":"#383838","inverse-on-surface":"#f5f5f0","on-primary-container":"#fff3b8","tertiary":"#ffe066","primary-container":"#ffd700","surface-container":"#262626","on-error-container":"#ffdad6","background":"#121212","surface-dim":"#121212","tertiary-container":"#3a3a3a","primary-fixed":"#ffd700","on-tertiary":"#1a1a1a","surface-tint":"#ffd700","on-secondary-fixed":"#f5f5f0","surface-container-high":"#2e2e2e","inverse-primary":"#ffd700","tertiary-fixed-dim":"#3a3a3a","on-tertiary-fixed-variant":"#e8e0c0","inverse-surface":"#181818","secondary-container":"#262626"},
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "md": "0.5rem", // 8px
                        "lg": "0.75rem", // 12px
                        "xl": "1rem", // 16px
                        "full": "9999px"
                    },
                    spacing: {
                        "xs": "4px",
                        "base": "8px",
                        "gutter": "24px",
                        "margin-desktop": "48px",
                        "margin-mobile": "16px",
                        "md": "24px",
                        "sm": "12px",
                        "xl": "80px",
                        "lg": "48px"
                    },
                    fontFamily: {
                        "headline-xl": ["Be Vietnam Pro", "sans-serif"],
                        "headline-lg-mobile": ["Be Vietnam Pro", "sans-serif"],
                        "body-md": ["Be Vietnam Pro", "sans-serif"],
                        "headline-md": ["Be Vietnam Pro", "sans-serif"],
                        "body-lg": ["Be Vietnam Pro", "sans-serif"],
                        "headline-lg": ["Be Vietnam Pro", "sans-serif"],
                        "label-md": ["Be Vietnam Pro", "sans-serif"],
                        "label-sm": ["Be Vietnam Pro", "sans-serif"]
                    },
                    fontSize: {
                        "headline-xl": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
                        "headline-lg-mobile": ["24px", { "lineHeight": "32px", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "700" }]
                    }
                }
            }
        }
    </script>

  [3] (จาก <body>)
<script>
(function () {
  var TH_MONTHS = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  var TH_MONTHS_SHORT = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

  var today = new Date();
  var viewYear = today.getFullYear();
  var viewMonth = today.getMonth();
  var selectedDate = new Date(viewYear, viewMonth, today.getDate());
  var selectedSlot = '11:00';

  var OPEN_MIN = 11 * 60, CLOSE_MIN = 17 * 60, HALF_MIN = (OPEN_MIN + CLOSE_MIN) / 2;
  function nowMin() { var n = new Date(); return n.getHours() * 60 + n.getMinutes(); }
  function minuteOf(t) { if (!t) return 0; var p = String(t).split(':'); return (+p[0]) * 60 + (+p[1]); }

  var monthSel = document.getElementById('calMonth');
  var yearSel = document.getElementById('calYear');
  var calGrid = document.getElementById('calGrid');
  var calTitle = document.getElementById('calTitle');
  var slotDateEl = document.getElementById('slotDate');
  var summaryDateEl = document.getElementById('summaryDate');
  var summaryTimeEl = document.getElementById('summaryTime');
  var summaryDurationEl = document.getElementById('summaryDuration');
  var summaryTotalEl = document.getElementById('summaryTotal');
  var durationSelect = document.getElementById('durationSelect');
  var selectedDuration = parseInt(durationSelect ? durationSelect.value : '1', 10) || 1;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function toDateOnly(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); }
  function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }

  function renderCalendar() {
    calTitle.textContent = TH_MONTHS[viewMonth] + ' ' + viewYear;
    monthSel.value = String(viewMonth);
    yearSel.value = String(viewYear);

    var offset = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // week starts Monday
    var total = daysInMonth(viewYear, viewMonth);
    var prevTotal = daysInMonth(viewYear, viewMonth - 1);
    var todayTS = toDateOnly(today);
    var html = '';

    for (var i = 0; i < offset; i++) {
      html += '<div class="p-2 text-on-surface-variant opacity-40 cursor-not-allowed">' + (prevTotal - offset + 1 + i) + '</div>';
    }
    for (var d = 1; d <= total; d++) {
      var dt = new Date(viewYear, viewMonth, d);
      var disabled = (dt.getDay() === 3) || toDateOnly(dt) < todayTS || (toDateOnly(dt) === todayTS && nowMin() >= HALF_MIN); // closed Wed + past + same-day overflowed mid-cut
      var selected = selectedDate !== null && toDateOnly(selectedDate) === toDateOnly(dt);
      var cls;
      if (disabled) cls = 'p-2 text-on-surface-variant opacity-40 cursor-not-allowed line-through';
      else if (selected) cls = 'p-2 bg-secondary text-on-secondary rounded-md cursor-pointer font-bold relative interactive-shadow';
      else cls = 'p-2 text-on-surface hover:bg-surface-container-low rounded-md cursor-pointer';
      html += '<div class="' + cls + '" data-d="' + toDateOnly(dt) + '"' + (disabled ? ' data-disabled="1"' : '') + '>' + d + '</div>';
    }
    calGrid.innerHTML = html;
  }

  function updateSummary() {
    if (selectedDate) {
      var label = selectedDate.getDate() + ' ' + TH_MONTHS_SHORT[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear();
      slotDateEl.textContent = label;
      summaryDateEl.textContent = label;
    }
  }

  function updateTotal() {
    if (summaryDurationEl) summaryDurationEl.textContent = selectedDuration + ' ชม.';
    if (summaryTotalEl) summaryTotalEl.textContent = (370 * selectedDuration) + ' ฿';
  }

  TH_MONTHS.forEach(function (m, i) {
    var opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = m;
    if (i === viewMonth) opt.selected = true;
    monthSel.appendChild(opt);
  });
  for (var y = today.getFullYear() - 1; y <= today.getFullYear() + 3; y++) {
    var opt = document.createElement('option');
    opt.value = String(y);
    opt.textContent = y;
    if (y === viewYear) opt.selected = true;
    yearSel.appendChild(opt);
  }

  monthSel.addEventListener('change', function () { viewMonth = parseInt(monthSel.value, 10); renderCalendar(); });
  yearSel.addEventListener('change', function () { viewYear = parseInt(yearSel.value, 10); renderCalendar(); });
  document.getElementById('prevMonth').addEventListener('click', function () {
    viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } renderCalendar();
  });
  document.getElementById('nextMonth').addEventListener('click', function () {
    viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } renderCalendar();
  });
  document.getElementById('todayBtn').addEventListener('click', function () {
    viewYear = today.getFullYear(); viewMonth = today.getMonth(); renderCalendar();
  });
  calGrid.addEventListener('click', function (e) {
    var cell = e.target.closest('[data-d]');
    if (!cell || cell.dataset.disabled) return;
    selectedDate = new Date(parseInt(cell.dataset.d, 10));
    updateSummary();
    renderCalendar();
    refreshSlots();
    saveSchedState();
  });

  function endTime(t, hours) {
    var parts = t.split(':');
    var m = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10) + (hours || 1) * 60;
    return pad(Math.floor(m / 60)) + ':' + pad(m % 60);
  }
  function refreshSlots() {
    var todayFlag = selectedDate !== null && toDateOnly(selectedDate) === todayTS;
    var cur = nowMin();
    slotBtns.forEach(function (b) {
      var past = todayFlag && minuteOf(b.dataset.time) <= cur;
      if (past) {
        b.setAttribute('data-disabled', '1');
        b.removeAttribute('aria-pressed');
        b.className = 'py-3 px-2 border border-outline-variant rounded-md font-label-md text-label-md text-on-surface-variant opacity-40 cursor-not-allowed flex flex-col items-center';
      } else {
        b.removeAttribute('data-disabled');
        if (b.dataset.time === selectedSlot) {
          b.className = 'py-3 px-2 border-2 border-primary bg-primary text-on-surface rounded-md font-label-md text-label-md font-bold flex flex-col items-center interactive-shadow';
          b.setAttribute('aria-pressed', 'true');
        } else {
          b.className = 'py-3 px-2 border border-outline-variant rounded-md font-label-md text-label-md text-on-surface hover:border-primary hover:bg-surface-container-lowest transition-all flex flex-col items-center';
        }
      }
    });
  }
  var slotBtns = Array.prototype.slice.call(document.querySelectorAll('.slot-btn'));
  slotBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.dataset.disabled) return;
      selectedSlot = btn.dataset.time;
      slotBtns.forEach(function (b) {
        b.className = 'py-3 px-2 border border-outline-variant rounded-md font-label-md text-label-md text-on-surface hover:border-primary hover:bg-surface-container-lowest transition-all flex flex-col items-center';
        b.removeAttribute('aria-pressed');
      });
      btn.className = 'py-3 px-2 border-2 border-primary bg-primary text-on-surface rounded-md font-label-md text-label-md font-bold flex flex-col items-center interactive-shadow';
      btn.setAttribute('aria-pressed', 'true');
      summaryTimeEl.textContent = btn.dataset.time + ' - ' + endTime(btn.dataset.time, selectedDuration);
      updateTotal();
      saveSchedState();
    });
  });

  if (durationSelect) {
    durationSelect.addEventListener('change', function () {
      selectedDuration = parseInt(durationSelect.value, 10) || 1;
      if (selectedSlot) {
        summaryTimeEl.textContent = selectedSlot + ' - ' + endTime(selectedSlot, selectedDuration);
      }
      updateTotal();
      saveSchedState();
    });
  }

  var SCHED_KEY = 'mrhs_schedule_state';
  function saveSchedState() {
    try {
      sessionStorage.setItem(SCHED_KEY, JSON.stringify({
        date: selectedDate ? toDateOnly(selectedDate) : null,
        slot: selectedSlot,
        duration: selectedDuration
      }));
    } catch (err) {}
  }
  (function restoreSchedState() {
    var navType = '';
    try {
      var entries = performance.getEntriesByType('navigation');
      if (entries && entries[0]) navType = entries[0].type || '';
    } catch (err) {}
    var saved = null;
    try { saved = JSON.parse(sessionStorage.getItem(SCHED_KEY) || 'null'); } catch (err) {}
    if (!saved || navType !== 'back_forward') {
      sessionStorage.removeItem(SCHED_KEY);
      return;
    }
    if (saved.date) {
      selectedDate = new Date(parseInt(saved.date, 10));
      viewYear = selectedDate.getFullYear();
      viewMonth = selectedDate.getMonth();
    }
    if (saved.duration && durationSelect) {
      selectedDuration = parseInt(saved.duration, 10) || 1;
      durationSelect.value = String(selectedDuration);
    }
    if (saved.slot) selectedSlot = String(saved.slot);
  })();

  renderCalendar();
  updateSummary();
  updateTotal();
  refreshSlots();
  if (summaryTimeEl && selectedSlot) summaryTimeEl.textContent = selectedSlot + ' - ' + endTime(selectedSlot, selectedDuration);
  saveSchedState();

  var confirmBtn = document.querySelector('a[href="/booking"]');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var cur = nowMin();
      var isTodayBook = selectedDate !== null && toDateOnly(selectedDate) === todayTS;
      if (isTodayBook && cur >= HALF_MIN) {
        alert('เกินเวลากำหนดสำหรับการจองรอบในวันนี้ (หลัง 14:45 น.) แล้ว กรุณาเลือกรอบในวันอื่น');
        return;
      }
      var slotM = minuteOf(selectedSlot);
      if (isTodayBook && slotM <= cur) {
        alert('รอบเวลา' + selectedSlot + ' น. เริ่มไปแล้วหรือผ่านไปแล้ว กรุณาเลือกรอบเวลาที่เหลืออยู่');
        return;
      }
      if (slotM + selectedDuration * 60 > CLOSE_MIN) {
        alert('เวลาจบรอบเกินเวลาปิดสนาม 17:00 น. กรุณาเลือกรอบเวลาที่เร็วขึ้นหรือลดชั่วโมงเล่น');
        return;
      }
      if (selectedDate) {
        var lbl = selectedDate.getDate() + ' ' + TH_MONTHS_SHORT[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear();
        var bl = [];
        try { bl = JSON.parse(localStorage.getItem('mrhs_bookings') || '[]'); } catch (err) {}
        if (Array.isArray(bl)) {
          for (var k = 0; k < bl.length; k++) {
            var bk = bl[k];
            if (bk.status === 'cancelled' || bk.date !== lbl) continue;
            var bs = bk.time ? minuteOf(String(bk.time).replace(/ น\./g, '').split(' - ')[0]) : -1;
            if (bs < 0) continue;
            var be = bs + (bk.duration || 1) * 60;
            if (slotM < be && bs < slotM + selectedDuration * 60) {
              alert('รอบเวลา' + selectedSlot + ' น. ในวันที่นี้ถูกจองไว้แล้ว (' + bk.id + ') กรุณาเลือกรอบอื่นหรือวันอื่น');
              return;
            }
          }
        }
      }
      var params = new URLSearchParams();
      if (selectedDate) {
        var lbl = selectedDate.getDate() + ' ' + TH_MONTHS_SHORT[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear();
        params.set('date', lbl);
      }
      params.set('time', selectedSlot + ' - ' + endTime(selectedSlot, selectedDuration));
      params.set('duration', selectedDuration);
      saveSchedState();
      window.location.href = '/booking?' + params.toString();
    });
  }
})();
</script>

  [4] (จาก <body>)
<script src="js/app.js"></script>

  [5] (จาก <body>)
<script src="js/calculator.js"></script>

  [6] (จาก <body>)
<script src="js/points.js"></script>

==== จบ <script> เดิม ====
-->
