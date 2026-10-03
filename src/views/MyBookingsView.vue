<!--
  ถูกแยกออกมาจาก src/views/CustomerView.vue (หน้า 5/8)
  ต้นฉบับเดิม: my-bookings.html   |   บัตรจองของฉัน
  เนื้อหาใน <body> ถูกย้ายเข้า <template> แบบ verbatim (ไม่จัดรูปแบบใหม่)
-->
<template>
  <div class="bg-surface font-body-md text-body-md text-on-surface antialiased" lang="th">
<header class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-16 w-full px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-base"><div class="flex items-center gap-sm"><a href="/"><span class="font-headline-md text-headline-md text-on-surface uppercase tracking-wider inline-block">MR.HANDSOME</span></a></div><nav class="hidden md:flex items-center gap-md" data-active-classes="bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg px-sm py-xs"><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" data-path="services" href="/#services">บริการ</a><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" data-path="booking" href="/schedule">การจอง</a><a class="text-on-surface-variant hover:text-on-surface font-label-md text-label-md uppercase tracking-wider transition-colors" data-path="gear" href="/equipment">อุปกรณ์</a><a aria-current="page" class="uppercase tracking-wider transition-colors bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg px-sm py-xs" href="/my-bookings">บัตรจอง</a></nav></div></header><main class="w-full pt-16 bg-surface min-h-[calc(100vh-16rem)]"><div class="flex flex-col w-full">
<div class="w-full px-margin-mobile md:px-margin-desktop py-lg md:py-xl">
<div class="max-w-5xl mx-auto">
<div class="text-center mb-lg">
<span class="material-symbols-outlined text-5xl text-primary-container">confirmation_number</span>
<h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface uppercase tracking-tight mt-sm">บัตรจองของฉัน</h1>
<div class="h-1 w-16 bg-primary-container mx-auto mt-2"></div>
<p class="font-body-lg text-body-lg text-on-surface-variant mt-2">ดูบัตรจองของคุณและยกเลิกได้ก่อนถึงเวลานัด — ระบบบันทึกบัตรไว้ในเครื่องนี้</p>
</div>
<div id="myBookingsEmpty" class="hidden max-w-xl mx-auto bg-surface-container-low border border-outline-variant rounded-xl p-lg text-center">
<div class="mb-sm"><span class="material-symbols-outlined text-5xl text-on-surface-variant">ticket</span></div>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold mb-xs">ยังไม่มีการจอง</h3>
<p class="font-body-md text-body-md text-on-surface-variant mb-md">จองรอบยิงธนูของคุณ แล้วบัตรจองจะแสดงที่นี่</p>
<a href="/schedule" class="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-label-md text-label-md font-bold px-6 py-3 rounded-lg hover:opacity-90 transition">จองรอบตอนนี้</a>
</div>
<div id="myBookingsList" class="grid grid-cols-1 md:grid-cols-2 gap-gutter"></div>
<div class="mt-lg bg-surface-container-low border border-outline-variant rounded-xl p-md flex items-start gap-sm">
<span class="material-symbols-outlined text-[24px] text-primary shrink-0">info</span>
<div class="space-y-xs">
<span class="font-label-md text-label-md font-bold text-on-surface">บัตรจองเก็บไว้ในเครื่องนี้</span>
<p class="font-label-sm text-label-sm text-on-surface-variant">บัตรจองถูกบันทึกไว้ในเบราว์เซอร์ของอุปกรณ์นี้ หากล้างข้อมูลหรือท่องเว็บแบบไม่ระบุตัวตน บัตรจะหายไป</p>
</div>
</div>
</div>
</div>
</div>
</main><footer class="w-full bg-inverse-surface text-inverse-on-surface py-lg"><div class="w-full px-margin-mobile md:px-margin-desktop"><div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-md pb-md"><div class="flex flex-col gap-xs"><div class="flex items-center gap-sm"><span class="font-headline-md text-headline-md text-primary-container uppercase tracking-wider">MR.HANDSOME</span><span class="font-label-sm text-label-sm px-base py-xs rounded bg-surface-container text-on-surface-variant uppercase tracking-wider">Tactical Range</span></div><p class="font-body-md text-body-md text-secondary-fixed-dim max-w-sm">ศูนย์ฝึกและสนามยิงธนูสไตล์ Modern Tactical สำหรับนักกีฬาระดับมืออาชีพและผู้ฝึกซ้อมเพื่อความแม่นยำสูงสุด</p></div><div class="flex flex-wrap gap-md font-label-md text-label-md"><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/#rules">กฎสนามและความปลอดภัย</a><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/#pricing">แพ็กเกจสมาชิก</a><a class="text-secondary-fixed-dim hover:text-primary-container transition-colors" href="/">ติดต่อเรา</a></div></div><div class="mt-md pt-md flex flex-col sm:flex-row justify-between items-center gap-base font-label-sm text-label-sm text-secondary-fixed-dim"><p>© 2025 MR.HANDSOME Archery Club. Precision &amp; Power. All rights reserved.</p><div class="flex gap-md"><span class="uppercase tracking-widest text-primary-container">Precision Calibrated</span></div></div></div></footer>
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
(function () {
  'use strict';
  var KEY = 'mrhs_bookings';
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function read() {
    try { var l = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(l) ? l : []; } catch (e) { return []; }
  }
  function write(l) { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} }
  function ticketUrl(b) {
    var q = new URLSearchParams();
    if (b.date) q.set('date', b.date);
    q.set('time', b.time);
    q.set('duration', b.duration || 1);
    if (b.name) q.set('name', b.name);
    if (b.phone) q.set('phone', b.phone);
    if (b.id) q.set('id', b.id);
    if (b.payment) q.set('payment', b.payment);
    return '/receipt?' + q.toString();
  }
  function started(b) { return b.startTs ? Date.now() > b.startTs : false; }
  function cancelBooking(id) {
    var list = read();
    var idx = -1, b = null;
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) { idx = i; b = list[i]; break; } }
    if (!b) return;
    if (started(b)) { alert('เลยเวลานัดของรอบนี้แล้ว ไม่สามารถยกเลิกได้'); return; }
    var reason = prompt('เหตุผลที่ยกเลิก (' + b.id + ' · ' + b.date + ' ' + b.time + '):') || '';
    if (!window.confirm('ยืนยันยกเลิกการจองนี้ใช่หรือไม่?' + (reason ? '\nเหตุผล: ' + reason : ''))) return;
    list.splice(idx, 1);
    write(list);
    render();
  }
  function payLabel(b) {
    return (b.payment && b.payment !== 'promptpay') ? 'ชำระที่เคาน์เตอร์' : 'QR PromptPay';
  }
  function render() {
    var list = read();
    var empty = document.getElementById('myBookingsEmpty');
    var wrap = document.getElementById('myBookingsList');
    if (empty) empty.classList.toggle('hidden', list.length > 0);
    if (wrap) {
      wrap.innerHTML = list.map(function (b) {
        var isPast = started(b);
        var btns = '<a href="' + ticketUrl(b) + '" class="inline-flex items-center gap-xs px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold hover:opacity-90 transition">ดูบัตร E-Ticket</a>';
        if (isPast) {
          btns += '<span class="font-label-sm text-label-sm text-on-surface-variant">เลยเวลานัดแล้ว</span>';
        } else {
          btns += '<button type="button" data-cancel-id="' + esc(b.id) + '" class="px-4 py-2 rounded-lg border border-error text-error font-label-md text-label-md font-bold hover:bg-error hover:text-on-error transition cursor-pointer">ยกเลิกการจอง</button>';
        }
        return '<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md relative overflow-hidden hover:shadow-lg transition-shadow">' +
          '<div class="flex items-center justify-between gap-sm mb-sm">' +
            '<span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Booking ID: <span class="text-on-surface font-bold">' + esc(b.id) + '</span></span>' +
            '<span class="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-container/15 text-on-primary border border-primary-container/40 font-bold">ACTIVE</span>' +
          '</div>' +
          '<div class="space-y-1.5 font-body-md text-body-md">' +
            '<p><span class="material-symbols-outlined text-[16px] text-primary align-middle mr-1">calendar_today</span>' + esc(b.date) + '</p>' +
            '<p><span class="material-symbols-outlined text-[16px] text-primary align-middle mr-1">schedule</span>' + esc(b.time) + ' (' + (b.duration || 1) + ' ชม.)</p>' +
            '<p><span class="material-symbols-outlined text-[16px] text-primary align-middle mr-1">badge</span>' + esc(b.name || '-') + '</p>' +
            '<p><span class="material-symbols-outlined text-[16px] text-primary align-middle mr-1">payments</span>' + payLabel(b) + '</p>' +
          '</div>' +
          '<div class="flex items-center justify-between gap-sm mt-md pt-md border-t border-outline-variant/60">' + btns + '</div>' +
        '</div>';
      }).join('');
    }
  }
  window.__myBk = cancelBooking;
  var wrap = document.getElementById('myBookingsList');
  if (wrap) {
    wrap.addEventListener('click', function (ev) {
      var btn = ev.target.closest ? ev.target.closest('[data-cancel-id]') : null;
      if (!btn) return;
      cancelBooking(btn.getAttribute('data-cancel-id'));
    });
  }
  render();
})();
</script>

  [4] (จาก <body>)
<script src="js/app.js"></script>

  [5] (จาก <body>)
<script src="js/calculator.js"></script>

  [6] (จาก <body>)
<script src="js/points.js"></script>

  [7] (จาก <body>)
<script>(function(){if(!window.location.search)return;var href='/booking'+window.location.search;document.querySelectorAll('a[href="/booking"]').forEach(function(a){a.setAttribute('href',href);});})();</script>

==== จบ <script> เดิม ====
-->
