<!--
  ถูกแยกออกมาจาก src/views/CustomerView.vue (หน้า 1/8)
  ต้นฉบับเดิม: index.html   |   หน้าแรก / Landing
  เนื้อหาใน <body> ถูกย้ายเข้า <template> แบบ verbatim (ไม่จัดรูปแบบใหม่)
-->
<template>
  <div class="light font-body-md text-on-surface antialiased" lang="th">
<!-- TopNavBar -->
<nav class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 sticky top-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-outline-variant dark:border-outline flat no shadows docked full-width top-0">
<div class="flex items-center gap-sm">
<a href="/" class="font-headline-md text-headline-md font-extrabold text-primary tracking-tighter cursor-pointer active:scale-95 duration-200">MR.HANDSOME</a>
</div>
<div class="hidden md:flex items-center gap-gutter">
<a class="font-label-md text-label-md text-on-secondary hover:text-primary transition-colors hover:bg-white/10 transition-all px-3 py-2 rounded-md cursor-pointer active:scale-95 duration-200" href="/#services">บริการ</a>
<a class="font-label-md text-label-md text-on-secondary hover:text-primary transition-colors hover:bg-white/10 transition-all px-3 py-2 rounded-md cursor-pointer active:scale-95 duration-200" href="/#pricing">ราคา</a>
<a class="font-label-md text-label-md text-on-secondary hover:text-primary transition-colors hover:bg-white/10 transition-all px-3 py-2 rounded-md cursor-pointer active:scale-95 duration-200" href="/schedule">จองเลน</a>
<a class="font-label-md text-label-md text-on-secondary hover:text-primary transition-colors hover:bg-white/10 transition-all px-3 py-2 rounded-md cursor-pointer active:scale-95 duration-200" href="/equipment">อุปกรณ์</a>
<a class="font-label-md text-label-md text-on-secondary hover:text-primary transition-colors hover:bg-white/10 transition-all px-3 py-2 rounded-md cursor-pointer active:scale-95 duration-200" href="/my-bookings">บัตรจอง</a>
</div>

</nav>
<!-- Hero Section -->
<header class="relative w-full h-[600px] flex items-center justify-start px-margin-mobile md:px-margin-desktop bg-tactical-charcoal overflow-hidden">
<div class="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay" data-alt="A high-contrast, dynamic action shot of a professional archer at full draw in an indoor range. The lighting is dramatic, with deep shadows and strong spotlights highlighting the tension in the bowstring and the archer's focus. The mood is intense, athletic, and precise, fitting a modern tactical sports brand. The color palette features deep charcoal blacks and vibrant mustard yellow accents." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGQE6uJZFyIIvKU4bz4GWIVUTrn29WYMR4lpXx-2WrcEewvmvaBVOGmejncqPk-Wq5H7tHo_lEyxs69XkYAqEz5tYBFCjC1fakt8NMnCuOq7tDUDmSe-G3Gl98-jxBCPuDyLz-cH6qKW1tQRMkoGTHEmJiErjtdIfvs9qkp1XxPGtg5KN3YZvxOMkO0Rfxcyme8YNT-2BQ1mmb3mbO7ZA5ALb_mvko2UOPoQf7YmxoaTew1pgbKaVAdg')"></div>
<div class="relative z-10 max-w-2xl text-left"><div class="mb-4 inline-flex items-center gap-2 bg-tactical-mustard text-on-surface px-3 py-1.5 rounded-lg font-label-md text-label-md font-bold shadow-sm"><span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">schedule</span>เปิดให้บริการทุกวัน 11:00 - 18:30 น. (ยกเว้นวันพุธ)</div>
<h1 class="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-inverse-on-surface mb-sm uppercase tracking-tight">แม่นยำในทุกการยิง</h1>
<p class="font-body-lg text-body-lg text-surface-variant mb-gutter">เชี่ยวชาญศิลปะการยิงธนูด้วยอุปกรณ์ระดับมืออาชีพ การฝึกสอน และสิ่งอำนวยความสะดวกที่ออกแบบมาสำหรับผู้แข่งขันตัวจริง</p>
<a href="/schedule" class="bg-tactical-mustard text-on-surface font-headline-md text-headline-md font-bold py-4 px-8 rounded-xl hover:bg-primary-container hover:scale-105 transition-all shadow-lg shadow-tactical-mustard/50 cursor-pointer active:scale-95 duration-200 inline-flex items-center gap-2 animate-bounce">จองรอบ<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">arrow_forward</span></a>
</div>
</header>
<!-- Services Section -->
<section id="services" class="py-xl px-margin-mobile md:px-margin-desktop bg-surface">
<div class="max-w-7xl mx-auto">
<div class="text-center mb-lg">
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface uppercase tracking-tight">สิ่งอำนวยความสะดวกชั้นยอด</h2>
<div class="h-1 w-16 bg-tactical-mustard mx-auto mt-2"></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<!-- Card 1 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md relative overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
<div class="mb-sm">
<span class="material-symbols-outlined text-4xl text-tactical-mustard" data-icon="sports_martial_arts">sports_martial_arts</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">การฝึกสอนระดับมืออาชีพ</h3>
<p class="font-body-md text-body-md text-secondary">เซสชันแบบตัวต่อตัวกับผู้เชี่ยวชาญที่ได้รับการรับรองเพื่อขัดเกลาเทคนิคและสมาธิของคุณ</p>
<span class="material-symbols-outlined absolute bottom-4 right-4 text-outline-variant opacity-20 text-6xl group-hover:text-tactical-mustard group-hover:opacity-10 transition-colors" data-icon="arrow_outward">arrow_outward</span>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md relative overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
<div class="mb-sm">
<span class="material-symbols-outlined text-4xl text-tactical-mustard" data-icon="target">my_location</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">เช่าสนามยิงธนู</h3>
<p class="font-body-md text-body-md text-secondary">เข้าใช้สนามยิงธนูในร่มระยะ 18 เมตรและ 30 เมตรที่ควบคุมอุณหภูมิได้ ซึ่งเหมาะสำหรับการฝึกซ้อมเพื่อการแข่งขัน</p>
<span class="material-symbols-outlined absolute bottom-4 right-4 text-outline-variant opacity-20 text-6xl group-hover:text-tactical-mustard group-hover:opacity-10 transition-colors" data-icon="arrow_outward">arrow_outward</span>
</div>
<!-- Card 3 -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md relative overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer">
<div class="mb-sm">
<span class="material-symbols-outlined text-4xl text-tactical-mustard" data-icon="storefront">storefront</span>
</div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-xs">โปรช็อป</h3>
<p class="font-body-md text-body-md text-secondary">บริการปรับแต่ง บำรุงรักษาแบบครบวงจร และตัวเลือกอุปกรณ์ระดับพรีเมียมจากแบรนด์ยุทธวิธีและการแข่งขันชั้นนำ</p>
<span class="material-symbols-outlined absolute bottom-4 right-4 text-outline-variant opacity-20 text-6xl group-hover:text-tactical-mustard group-hover:opacity-10 transition-colors" data-icon="arrow_outward">arrow_outward</span>
</div>
</div>
</div>
</section><section id="pricing" class="py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-low"><div class="max-w-7xl mx-auto"><div class="text-center mb-lg"><h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface uppercase tracking-tight">ประเภทธนูและอัตราค่าบริการ</h2><div class="h-1 w-16 bg-tactical-mustard mx-auto mt-2"></div><p class="font-body-lg text-body-lg text-secondary mt-2">ทุกเซสชันรวมอุปกรณ์และมีเจ้าหน้าที่ผู้เชี่ยวชาญดูแลและสอนเทคนิคการยิงที่ถูกต้อง</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-gutter"><div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between shadow-sm"><div><div class="h-[300px] rounded-lg overflow-hidden mb-md relative bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZJstAFCyGnerEAk8nLARkD4yGeSP_4qvHF3un3pufSYwoWVo9SM-VYrmXO5NrYQMWejf0cuREOSwHl1IjnIXEKLG8QhL3oCiwMjc1iTDrD3V7s4o44AarzlNRiJV82EmjWLb_vrMNJJWwcIOekyNIboRMbxgaG1_kxKajTR1quoOt7ejIXC8EgS4VK8_7VAHr77j8j7M3MU0cgs98BVkYMFsatHzmcQtPyJVoqyIBt7IKxFk3BLpuDg')"></div><h3 class="font-headline-md text-headline-md text-on-surface mb-xs">Olympic Recurve</h3><p class="font-body-md text-body-md text-secondary mb-md">มีศูนย์เล็งในการยิง (พัฒนาต่อเป็นนักกีฬาได้)</p><ul class="font-body-md text-body-md text-on-surface space-y-2 mb-md"><li class="flex items-center gap-2"><span class="material-symbols-outlined text-tactical-mustard">check</span> ครั้งแรก: 350 + 20 (ค่าเป้า) บาท / ชม. / คน</li><li class="flex items-center gap-2"><span class="material-symbols-outlined text-tactical-mustard">check</span> ครั้งต่อไป: 300 + 20 (ค่าเป้า) บาท / ชม. / คน</li></ul></div></div><div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between shadow-sm"><div><div class="h-[300px] rounded-lg overflow-hidden mb-md relative bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCufZ3ut3fGvjBaDS_R7AX8xNFvcHBEz6r4JNBHUTyWDutoUoC3hNrkcqUMDPQafTqoJVIqPNxlpJNIbQxagSavq6ZHXB9de9pj5Ol-wn5smV8xfbMuAAaEjKsxlENW_Ys0wiS_2qzQwliJW4cLNFxYU-KOhCwqtOvxSj44mpKBlIVZ7og2IxBXIV0JUzr3Tg8jA1fuV_oD8cXAV8Y3cDe6J4Ym6B5NHCOczPiQXcJwp6MCUSWVqKWT_Q')"></div><h3 class="font-headline-md text-headline-md text-on-surface mb-xs">Bare Bow</h3><p class="font-body-md text-body-md text-secondary mb-md">ไม่มีศูนย์เล็งในการยิง เน้นสัญชาตญาณและความแม่นยำ</p><ul class="font-body-md text-body-md text-on-surface space-y-2 mb-md"><li class="flex items-center gap-2"><span class="material-symbols-outlined text-tactical-mustard">check</span> ราคาเดียว: 300 + 20 (ค่าเป้า) บาท / ชม. / คน</li></ul></div></div></div></div></section>
<!-- Benefits Section -->
<section id="equipment" class="py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-lowest text-on-surface relative overflow-hidden">
<!-- Abstract Target Motif -->
<div class="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
<svg fill="none" height="400" viewBox="0 0 400 400" width="400" xmlns="http://www.w3.org/2000/svg">
<circle cx="200" cy="200" r="190" stroke="white" stroke-width="20"></circle>
<circle cx="200" cy="200" r="130" stroke="white" stroke-width="20"></circle>
<circle cx="200" cy="200" r="70" stroke="white" stroke-width="20"></circle>
</svg>
</div>
<div class="max-w-7xl mx-auto relative z-10">
<div class="flex flex-col md:flex-row items-center justify-between gap-lg">
<div class="md:w-1/2">
<h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-sm uppercase tracking-tight">ทำไมต้องเลือก MR.HANDSOME</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-md">สัมผัสประสบการณ์ยิงธนูระดับมืออาชีพ พร้อมสิ่งอำนวยความสะดวกครบครัน เพื่อความแม่นยำและพัฒนาการขั้นสูงสุดของคุณ</p>
<div class="flex flex-col gap-4">
<div class="flex items-center gap-3"><span class="bg-tactical-mustard text-on-surface px-2 py-1 rounded-md font-label-sm text-label-sm uppercase font-bold tracking-wider">ผู้ฝึกสอน</span><span class="font-label-md text-label-md text-on-primary uppercase">โค้ชผู้เชี่ยวชาญผ่านการรับรอง พร้อมดูแลและเทรนส่วนตัว</span></div>
<div class="w-full h-px bg-outline-variant"></div>
<div class="flex items-center gap-3"><span class="bg-tactical-mustard text-on-surface px-2 py-1 rounded-md font-label-sm text-label-sm uppercase font-bold tracking-wider">อุปกรณ์</span><span class="font-label-md text-label-md text-on-primary uppercase">คันธนูและอุปกรณ์เกรดแข่งขันคุณภาพสูงระดับสากล</span></div>
<div class="w-full h-px bg-outline-variant"></div>
<div class="flex items-center gap-3"><span class="bg-tactical-mustard text-on-surface px-2 py-1 rounded-md font-label-sm text-label-sm uppercase font-bold tracking-wider">บริการ</span><span class="font-label-md text-label-md text-on-primary uppercase">สนามยิงธนูในร่ม พร้อมสิ่งอำนวยความสะดวกครบครัน</span></div>
</div>
</div>
<div class="md:w-1/2 w-full h-[400px] relative rounded-xl overflow-hidden border border-outline-variant/30 tactical-card-shadow">
<div class="absolute inset-0 bg-cover bg-center" data-alt="A close-up macro shot of a modern compound bow's cam and string system resting on a tactical workbench. The lighting is cool and technical, emphasizing the precision engineering and carbon fiber textures of the equipment. The background is a dark, slightly blurred armory setting, reinforcing a professional, high-performance tactical aesthetic." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQY38h31KOTaKNmIAsuuGLw57IrUXnGl3-1KGL7F6-JMsno5us63SMPtqf0sRGfAHuHTgzpfCpRqxSmbOFoHmc3EXpCsjFd2DRmXpQB2miUcOfOQ0ER_p9xqpysa-0y6jHZhWiI04aRfAH2eWNFcOmWWRqZCE4PlcAAX86PMO66nmSDg9g-6KcRmHYHj-fiDZkGntPmK4htzTukTO9uro5dTdThb9QctVCSdEC19OLKZbLI40OWF95yw')"></div>
</div>
</div>
</div>
</section><section id="rules" class="py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-low border-t-2 border-b-2 border-error shadows relative overflow-hidden text-on-surface"><div class="absolute -left-20 -top-20 opacity-10 pointer-events-none"><span class="material-symbols-outlined text-[200px] text-error">warning</span></div><div class="max-w-7xl mx-auto relative z-10"><div class="text-center mb-lg"><h2 class="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-primary uppercase tracking-tight">กฎระเบียบและข้อควรทราบ</h2><div class="h-1.5 w-32 bg-error mx-auto mt-2 rounded-full"></div><p class="font-body-lg text-body-lg text-on-surface-variant mt-2">โปรดศึกษาและปฏิบัติตามกฎระเบียบของสนามอย่างเคร่งครัดเพื่อความปลอดภัยและความเรียบร้อย</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-gutter"><div class="bg-surface-container-lowest text-on-surface border-2 border-error rounded-xl p-md relative overflow-hidden shadows hover:shadow-lg transition-shadow"><div class="mb-sm inline-flex p-3 bg-error text-on-error rounded-lg"><span class="material-symbols-outlined text-4xl">rule</span></div><h3 class="font-headline-md text-headline-md text-on-surface mb-xs font-bold">การใช้อุปกรณ์</h3><p class="font-body-md text-body-md text-secondary">ไม่ใช้อุปกรณ์ของทางสนามมีค่าบริการเพิ่มเติม 100 บาท / ชั่วโมง / ท่าน</p></div><div class="bg-surface-container-lowest text-on-surface border-2 border-error rounded-xl p-md relative overflow-hidden shadows hover:shadow-lg transition-shadow"><div class="mb-sm inline-flex p-3 bg-error text-on-error rounded-lg"><span class="material-symbols-outlined text-4xl">warning</span></div><h3 class="font-headline-md text-headline-md text-on-surface mb-xs font-bold">ค่าปรับอุปกรณ์เสียหาย</h3><p class="font-body-md text-body-md text-secondary">กรณีลูกธนูเสียหายหรือสูญหาย ปรับ 150 บาท / ลูก</p></div><div class="bg-surface-container-lowest text-on-surface border-2 border-error rounded-xl p-md relative overflow-hidden shadows hover:shadow-lg transition-shadow"><div class="mb-sm inline-flex p-3 bg-error text-on-error rounded-lg"><span class="material-symbols-outlined text-4xl">checkroom</span></div><h3 class="font-headline-md text-headline-md text-on-surface mb-xs font-bold">การแต่งกาย</h3><p class="font-body-md text-body-md text-secondary">โปรดแต่งกายให้สุภาพเรียบร้อย และเหมาะสมกับการออกกำลังกายเพื่อความปลอดภัยของตัวท่านเอง</p></div></div></div></section>
<!-- Footer -->
<footer class="w-full py-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter items-center bg-secondary dark:bg-surface-dim full-width bg-secondary dark:bg-surface-dim flat no shadows">
<div>
<div class="font-headline-md text-headline-md font-bold text-on-secondary dark:text-on-surface mb-2">MR.HANDSOME</div>
<p class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80">© 2024 MR.HANDSOME Archery สงวนลิขสิทธิ์ แม่นยำในทุกการยิง</p>
</div>
<div class="flex flex-wrap gap-4 md:justify-end">
<a class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80 hover:text-on-secondary dark:hover:text-on-surface hover:underline transition-all opacity-90 hover:opacity-100 transition-opacity" href="/#services">บริการ</a>
<a class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80 hover:text-on-secondary dark:hover:text-on-surface hover:underline transition-all opacity-90 hover:opacity-100 transition-opacity" href="/#pricing">อัตราค่าบริการ</a>
<a class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80 hover:text-on-secondary dark:hover:text-on-surface hover:underline transition-all opacity-90 hover:opacity-100 transition-opacity" href="/#rules">ความปลอดภัยในสนามยิงธนู</a>
<a class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80 hover:text-on-secondary dark:hover:text-on-surface hover:underline transition-all opacity-90 hover:opacity-100 transition-opacity" href="/schedule">ติดต่อเรา</a>
</div>
</footer>
  </div>
</template>

<!-- <style> เดิมจาก <head> (ไม่ scoped ตามที่สั่ง) -->
<style>
        body { background-color: #F9F8F6; }
        .bg-tactical-charcoal { background-color: #121212; }
        .text-tactical-mustard { color: #FFD700; }
        .bg-tactical-mustard { background-color: #FFD700; }
        .border-tactical-mustard { border-color: #FFD700; }
        .tactical-card-shadow { box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
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
                    "colors":{"on-primary":"#1a1a1a","error-container":"#fde2e2","primary-fixed-dim":"#e6be00","on-primary-fixed-variant":"#6b5500","outline":"#b9b5ad","on-tertiary-container":"#5c4a00","on-error":"#ffffff","secondary-fixed":"#e8e5df","on-surface":"#1c1b1a","on-primary-fixed":"#1a1a1a","on-secondary-container":"#1c1b1a","surface-variant":"#e8e5df","error":"#c62828","surface":"#f9f8f6","secondary-fixed-dim":"#d9d5cd","on-surface-variant":"#6b6a65","tertiary-fixed":"#e8e5df","surface-container-highest":"#ffffff","on-background":"#1c1b1a","primary":"#ffd700","on-secondary":"#f5f5f0","surface-bright":"#ffffff","surface-container-lowest":"#ffffff","on-tertiary-fixed":"#1c1b1a","surface-container-low":"#f2f0ec","secondary":"#181818","on-secondary-fixed-variant":"#55524d","outline-variant":"#e3e0da","inverse-on-surface":"#f5f5f0","on-primary-container":"#5c4a00","tertiary":"#c9a227","primary-container":"#ffd700","surface-container":"#f9f8f6","on-error-container":"#7f1010","background":"#f9f8f6","surface-dim":"#f9f8f6","tertiary-container":"#f2e6c5","primary-fixed":"#ffd700","on-tertiary":"#ffffff","surface-tint":"#ffd700","on-secondary-fixed":"#1c1b1a","surface-container-high":"#ffffff","inverse-primary":"#ffd700","tertiary-fixed-dim":"#e8d9a8","on-tertiary-fixed-variant":"#6b5500","inverse-surface":"#181818","secondary-container":"#e8e5df"},
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
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
                    "fontFamily": {
                        "headline-xl": ["Be Vietnam Pro"],
                        "headline-lg-mobile": ["Be Vietnam Pro"],
                        "body-md": ["Be Vietnam Pro"],
                        "headline-md": ["Be Vietnam Pro"],
                        "body-lg": ["Be Vietnam Pro"],
                        "headline-lg": ["Be Vietnam Pro"],
                        "label-md": ["Be Vietnam Pro"],
                        "label-sm": ["Be Vietnam Pro"]
                    },
                    "fontSize": {
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
<script src="js/app.js"></script>

  [4] (จาก <body>)
<script src="js/calculator.js"></script>

  [5] (จาก <body>)
<script src="js/points.js"></script>

==== จบ <script> เดิม ====
-->
