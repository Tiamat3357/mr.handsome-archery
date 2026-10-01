<!--
  ถูกแยกออกมาจาก src/views/CustomerView.vue (หน้า 4/8)
  ต้นฉบับเดิม: equipment.html   |   ร้านขายอุปกรณ์
  เนื้อหาใน <body> ถูกย้ายเข้า <template> แบบ verbatim (ไม่จัดรูปแบบใหม่)
-->
<template>
  <div class="light bg-[#121212] text-on-surface min-h-screen flex flex-col font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container" lang="th">
<!-- TopNavBar -->
<header class="bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline flat no shadows flex justify-between items-center w-full px-margin-desktop h-20 sticky top-0 z-50 bg-surface/95 backdrop-blur-sm">
<div class="flex items-center gap-4">
<a href="/" class="font-headline-md text-headline-md font-extrabold text-primary dark:text-primary-fixed-dim tracking-tighter cursor-pointer active:scale-95 duration-200">MR.HANDSOME</a>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/#services">บริการ</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/schedule">การจอง</a>

<a class="font-body-md text-body-md text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary dark:border-primary-fixed-dim pb-1" href="/equipment">อุปกรณ์</a>
<a class="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="/my-bookings">บัตรจอง</a></nav>

</header><div class="bg-primary text-on-primary-fixed py-3 px-margin-desktop text-center font-label-md uppercase tracking-wider text-sm flex items-center justify-center gap-2"><span class="material-symbols-outlined">visibility</span>แคตตาล็อกสำหรับศึกษาข้อมูลและชมอุปกรณ์ ณ สนาม MR.HANDSOME เท่านั้น (View-Only Catalog)</div>
<!-- Main Content -->
<main class="flex-grow w-full px-margin-mobile md:px-margin-desktop py-lg md:py-xl mx-auto max-w-7xl flex flex-col md:flex-row gap-gutter">
<!-- Sidebar Filters -->
<aside class="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0 space-y-8">
<div>
<h3 class="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface mb-6 border-b border-outline-variant pb-2">กรองอุปกรณ์</h3>
<!-- Category Filter -->
<div class="mb-6">
<h4 class="font-label-md text-label-md text-on-surface uppercase mb-3 tracking-wider">หมวดหมู่</h4>
<div class="space-y-3">
<label class="flex items-center gap-3 cursor-pointer group">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 bg-surface-container-lowest" type="checkbox" data-group="cat" data-value="compound">
<span class="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">ธนูทดกำลัง</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 bg-surface-container-lowest" type="checkbox" data-group="cat" data-value="recurve">
<span class="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">ธนูรีเคิร์ฟ</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 bg-surface-container-lowest" type="checkbox" data-group="cat" data-value="arrow">
<span class="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">ลูกธนูคาร์บอน</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 bg-surface-container-lowest" type="checkbox" data-group="cat" data-value="accessory">
<span class="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">ศูนย์เล็งและออปติก</span>
</label>
</div>
</div>
<!-- Brand Filter -->
<div class="mb-6">
<h4 class="font-label-md text-label-md text-on-surface uppercase mb-3 tracking-wider">แบรนด์</h4>
<div class="space-y-3">
<label class="flex items-center gap-3 cursor-pointer group">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 bg-surface-container-lowest" type="checkbox" data-group="brand" data-value="mathews">
<span class="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Mathews</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 bg-surface-container-lowest" type="checkbox" data-group="brand" data-value="hoyt">
<span class="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Hoyt</span>
</label>
<label class="flex items-center gap-3 cursor-pointer group">
<input class="rounded border-outline-variant text-primary focus:ring-primary w-5 h-5 bg-surface-container-lowest" type="checkbox" data-group="brand" data-value="pse">
<span class="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">PSE</span>
</label>
</div>
</div>
<!-- Draw Weight Filter (Chips) -->
<div>
<h4 class="font-label-md text-label-md text-on-surface uppercase mb-3 tracking-wider">น้ำหนักดึง</h4>
<div class="flex flex-wrap gap-2">
<button type="button" class="bg-[#181818] text-white font-label-sm text-label-sm uppercase px-3 py-1.5 rounded-sm hover:bg-primary hover:text-[#1a1a1a] transition-colors" data-group="weight" data-value="40-50" aria-pressed="false">40-50 ปอนด์</button>
<button type="button" class="bg-primary text-[#1a1a1a] font-label-sm text-label-sm uppercase px-3 py-1.5 rounded-sm hover:bg-[#181818] hover:text-white transition-colors" data-group="weight" data-value="50-60" aria-pressed="false">50-60 ปอนด์</button>
<button type="button" class="bg-[#181818] text-white font-label-sm text-label-sm uppercase px-3 py-1.5 rounded-sm hover:bg-primary hover:text-[#1a1a1a] transition-colors" data-group="weight" data-value="60-70" aria-pressed="false">60-70 ปอนด์</button>
<button type="button" class="bg-[#181818] text-white font-label-sm text-label-sm uppercase px-3 py-1.5 rounded-sm hover:bg-primary hover:text-[#1a1a1a] transition-colors" data-group="weight" data-value="70+" aria-pressed="false">70+ ปอนด์</button>
</div>
</div>
</div>
<!-- Tactical Promo Module -->
</aside>
<!-- Product Grid Area -->
<div class="flex-1">
<!-- Active Filters & Sort -->
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
<div class="flex items-center gap-2 flex-wrap"><span class="font-body-md text-on-surface-variant text-sm">หมวดหมู่:</span><button type="button" data-setcat="compound" class="bg-primary text-on-primary-fixed px-4 py-1.5 rounded-full font-label-sm text-xs">คันธนูทดกำลัง</button><button type="button" data-setcat="recurve" class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant px-4 py-1.5 rounded-full font-label-sm text-xs transition-colors">คันธนูรีเคิร์ฟโอลิมปิก</button><button type="button" data-setcat="barebow" class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant px-4 py-1.5 rounded-full font-label-sm text-xs transition-colors">คันธนูแบร์โบว์</button><button type="button" data-setcat="arrow" class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant px-4 py-1.5 rounded-full font-label-sm text-xs transition-colors">ลูกธนูคาร์บอนเกรดแข่งขัน</button><button type="button" data-setcat="accessory" class="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant px-4 py-1.5 rounded-full font-label-sm text-xs transition-colors">อุปกรณ์เสริมและศูนย์เล็ง</button></div>
<div class="flex items-center gap-2">
<span class="font-body-md text-on-surface-variant text-sm">เรียงตาม:</span>
<select class="bg-surface-container-lowest border border-outline-variant rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-primary focus:border-primary">
<option>แนะนำ</option>
<option>ราคา: ต่ำไปสูง</option>
<option>ราคา: สูงไปต่ำ</option>
<option>มาใหม่ล่าสุด</option>
</select>
</div>
</div>
<!-- The Grid -->
<div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- Product Card 1 (Best Seller) -->
<div class="bg-surface-container-lowest border border-[#3a3a3a] rounded-2xl overflow-hidden group hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 relative flex flex-col h-full" data-cat="compound" data-brand="mathews" data-weight="50-60"><div class="absolute top-4 left-4 z-10"><span class="bg-primary text-on-primary-fixed font-label-sm text-[10px] uppercase font-black px-2 py-1 rounded-sm tracking-widest shadow-sm">ชมที่สนามเท่านั้น</span></div><div class="aspect-square bg-[#efeae0] flex items-center justify-center p-6 relative overflow-hidden"><img alt="Compound Bow Phase4" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuHIT_W-1rui376l1QtNGHbAl-XS0Eh-T9kzI6MwGMOY0btc9KGJYW6msuwxy9jVZMtb3gbdxGoajdOfxoNW51EiEdpoU8WvPBcq_rirM-2Zu_KzDX-l-5VGrlL3DvIx2etaiOswvNn5EmEmxSyUXjwfe--RjGS0rWl6RhwlbI8cdvHaBr_IC9fy_x2MQ6CrPNDAy5oZxgL_bPbW29ZBJ3Gmm6kG8KdTluMdkq47EkkhRXG2hBCR6NxIB1-meBU9lbIwfRy5Tm-DiqykQ"></div><div class="p-5 flex flex-col flex-grow relative"><p class="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Mathews</p><h3 class="font-headline-md text-lg leading-tight mb-2 text-on-surface font-bold group-hover:text-primary transition-colors">ธนูทดกำลัง Phase4 29"</h3><p class="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-4">ประสิทธิภาพเงียบพิเศษ ลดแรงกระแทก ออกแบบสำหรับนักยิงธนูเชิงยุทธวิธีและนักล่า</p><div class="space-y-1 mb-4 text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg"><div class=""><strong>น้ำหนักดึง:</strong> 50-60 ปอนด์</div><div class=""><strong>วัสดุ:</strong> คาร์บอนไฟเบอร์และอะลูมิเนียม CNC</div><div class=""><strong>การใช้งาน:</strong> ยิงเป้าและล่าสัตว์</div></div><div class="mt-auto flex items-center justify-between"><span class="font-label-sm text-xs px-3 py-1.5 rounded bg-surface-container-high text-on-surface-variant font-medium">สำหรับทดลองและชมที่สนามเท่านั้น</span></div></div></div>
<!-- Product Card 2 (New Arrival) -->
<div class="bg-surface-container-lowest border border-[#3a3a3a] rounded-2xl overflow-hidden group hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 relative flex flex-col h-full" data-cat="arrow" data-brand="easton" data-weight=""><div class="absolute top-4 left-4 z-10"><span class="bg-[#181818] text-white font-label-sm text-[10px] uppercase font-black px-2 py-1 rounded-sm tracking-widest shadow-sm border border-[#504535]">ชมที่สนามเท่านั้น</span></div><div class="aspect-square bg-[#efeae0] flex items-center justify-center p-6 relative overflow-hidden"><img alt="Carbon Arrows Axis Pro" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9hBSbLxlKbOLcNEIEdcLEz3XiqByD1nU-aDdBOOc02Q3CgMBcGZSP_ZitUTbEu98GHyLZMYzTA5cOfsWl9wmNAj73PFeJo7sy-b6EcYPJQYA-bHo3GL3j0zBIifdZ2bIpWXw8IqFNTJJN3Mgm7vMyCSD0wVgDWozviQ1ibElI6_KgFoScAdJkQ-nw7mOTewyu5vDiFh6vgLd0ZRzMQmP6hv6vzfZXKlWNr7vPJvwvgnZS3OZBKy_lxNHzjM_SJxJrICYKX6I29s3r_c8"></div><div class="p-5 flex flex-col flex-grow relative"><p class="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Easton</p><h3 class="font-headline-md text-lg leading-tight mb-2 text-on-surface font-bold group-hover:text-primary transition-colors">Axis Pro คาร์บอน 5 มม.</h3><p class="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-4">ก้านลูกธนูเส้นผ่านศูนย์กลางเล็ก เจาะทะลุได้ลึก แม่นยำสูงแม้ในสภาวะลมแรง</p><div class="space-y-1 mb-4 text-xs text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg"><div class=""><strong>ขนาด:</strong> 5 มม. ไมโครไดอาเมเตอร์</div><div class=""><strong>วัสดุ:</strong> High-Strength Carbon</div><div class=""><strong>การใช้งาน:</strong> แข่งขันและล่าสัตว์ระยะไกล</div></div><div class="mt-auto flex items-center justify-between"><span class="font-label-sm text-xs px-3 py-1.5 rounded bg-surface-container-high text-on-surface-variant font-medium">สำหรับทดลองและชมที่สนามเท่านั้น</span></div></div></div>
<!-- Product Card 3 -->
<div class="bg-surface-container-lowest border border-[#3a3a3a] rounded-2xl overflow-hidden group hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 relative flex flex-col h-full" data-cat="recurve" data-brand="hoyt" data-weight="">
<!-- Image -->
<div class="aspect-square bg-[#efeae0] flex items-center justify-center p-6 relative overflow-hidden">
<img class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A sophisticated Olympic-style recurve bow riser made of precision-machined aluminum with a matte dark grey finish. It features complex cutouts and tactical geometry, presented on an immaculate white studio backdrop. Crisp lighting emphasizes the metallic edges and modern design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlvUvYvC8N7SqBuVo6Oa0Zo_N1-U4RW4LwfX5tU2E-NvsbLZ2K_5sQ6QPYtwj-SEBvpLtSeToyuXPoUXTXZsXJYODONGSY_SThBZ_DoK7FkIZjMcPOEmcQ-DBq_D0Bcdv9noEiCDtydTN32oWliEnMDUcmcvJiH2nJDDnr3gCnvtXpsEQgrFGPelJAJpFkYQurXM3eMfJyMOc51W08VtaruKgN_B60KyQ3omAKLRmulZaW51PhwAxKdg">
</div>
<!-- Content -->
<div class="p-5 flex flex-col flex-grow relative">
<div class="absolute bottom-4 right-4 opacity-5 pointer-events-none">
<span class="material-symbols-outlined text-6xl">arrow_forward</span>
</div>
<p class="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Hoyt</p>
<h3 class="font-headline-md text-lg leading-tight mb-2 text-on-surface font-bold group-hover:text-primary transition-colors">คันธนูรีเคิร์ฟ Xceed 25"</h3>
<p class="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-4">รูปทรงระดับการแข่งขันให้ความมั่นคงสูงสุดและให้ความรู้สึกในการยิงที่เฉียบคมและตอบสนองได้ดี</p>
<div class="mt-auto flex items-center justify-between">
<span class="font-label-sm text-xs px-3 py-1.5 rounded bg-surface-container-high text-on-surface-variant font-medium">สำหรับดูข้อมูลเท่านั้น</span>
</div>
</div>
</div>
<!-- Product Card 4 -->
<div class="bg-surface-container-lowest border border-[#3a3a3a] rounded-2xl overflow-hidden group hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 relative flex flex-col h-full" data-cat="accessory" data-brand="carter" data-weight="">
<!-- Image -->
<div class="aspect-square bg-[#efeae0] flex items-center justify-center p-6 relative overflow-hidden">
<img class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A high-tech mechanical archery release aid constructed from dark anodized metal and brass accents. Shown in a close-up macro shot on a bright white studio table, emphasizing the intricate machined parts and tactical ruggedness of the gear." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgI8Lz2fyI0MT6kjkah4sNCsrxxbydo6ir5bpPUH2RhmcPi_Y9IRiyr0yAGB6s1CxLtmRffCmklJ1mPxI9qydeyGHAupiXTdERK30ZknuA8RUFjfvO91eQevQkKChW7158Z-8vfWBk_GXFqNr1vrk5UkWp4Hd93zaOqV5o3_-nvNb3SitsyxTX4MgpJCrcSg5F_P8Wd2QqgnHq7IFRlekGwxRncPMqe2-ha6pj5XZN6SYmsXZ-b5LWPQ">
</div>
<!-- Content -->
<div class="p-5 flex flex-col flex-grow relative">
<div class="absolute bottom-4 right-4 opacity-5 pointer-events-none">
<span class="material-symbols-outlined text-6xl">arrow_forward</span>
</div>
<p class="font-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Carter</p>
<h3 class="font-headline-md text-lg leading-tight mb-2 text-on-surface font-bold group-hover:text-primary transition-colors">อุปกรณ์ช่วยยิง Target 4</h3>
<p class="font-body-md text-sm text-on-surface-variant line-clamp-2 mb-4">อุปกรณ์ช่วยยิงแบบไกนิ้วหัวแม่มือสี่นิ้วให้ความแม่นยำระดับศัลยกรรมสำหรับนักกีฬายิงเป้า</p>
<div class="mt-auto flex items-center justify-between">
<span class="font-label-sm text-xs px-3 py-1.5 rounded bg-surface-container-high text-on-surface-variant font-medium">สำหรับดูข้อมูลเท่านั้น</span>
</div>
</div>
</div>
</div>
<!-- Pagination -->
<div id="noResults" class="hidden text-center py-16">
<span class="material-symbols-outlined text-6xl text-primary opacity-40 block mb-4">search_off</span>
<p class="font-headline-md text-headline-md text-on-surface mb-2">ไม่พบอุปกรณ์ที่ตรงกับเงื่อนไข</p>
<p class="font-body-md text-body-md text-on-surface-variant">ลองปรับหรือยกเลิกตัวกรองเพื่อดูสินค้าอื่นๆ</p>
</div>
</div>
</main>
<!-- Footer -->
<footer class="bg-secondary dark:bg-surface-dim text-on-secondary dark:text-on-surface w-full py-lg px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter items-center mt-auto">
<div>
<div class="font-headline-md text-headline-md font-bold text-on-secondary dark:text-on-surface mb-2">MR.HANDSOME</div>
<p class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80">© 2024 MR.HANDSOME Archery สงวนลิขสิทธิ์ แม่นยำในทุกการยิง</p>
</div>
<div class="flex flex-wrap gap-4 md:justify-end">
<a class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80 hover:text-on-secondary dark:hover:text-on-surface hover:underline transition-all" href="/equipment">อุปกรณ์</a>
<a class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80 hover:text-on-secondary dark:hover:text-on-surface hover:underline transition-all" href="/schedule">จองลาน</a>

<a class="font-label-md text-label-md text-on-secondary/80 dark:text-on-surface/80 hover:text-on-secondary dark:hover:text-on-surface hover:underline transition-all" href="/">ติดต่อเรา</a>
</div>
</footer>
  </div>
</template>

<!-- <style> เดิมจาก <head> (ไม่ scoped ตามที่สั่ง) -->
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .filled-icon {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        /* Custom scrollbar for a cleaner look */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #121212; 
        }
        ::-webkit-scrollbar-thumb {
            background: #3a3a3a; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #555555; 
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
            "colors":{"on-primary":"#1a1a1a","error-container":"#5c2b2b","primary-fixed-dim":"#c9a227","on-primary-fixed-variant":"#fff3b8","outline":"#5a5a5a","on-tertiary-container":"#fff3b8","on-error":"#2b0000","secondary-fixed":"#262626","on-surface":"#f5f5f0","on-primary-fixed":"#1a1a1a","on-secondary-container":"#e8e8e2","surface-variant":"#2c2c2c","error":"#ff8a80","surface":"#1a1a1a","secondary-fixed-dim":"#333333","on-surface-variant":"#bfbfbb","tertiary-fixed":"#2e2e2e","surface-container-highest":"#343434","on-background":"#f5f5f0","primary":"#ffd700","on-secondary":"#f5f5f0","surface-bright":"#2a2a2a","surface-container-lowest":"#262626","on-tertiary-fixed":"#fff3b8","surface-container-low":"#262626","secondary":"#181818","on-secondary-fixed-variant":"#d0d0ca","outline-variant":"#383838","inverse-on-surface":"#f5f5f0","on-primary-container":"#fff3b8","tertiary":"#ffe066","primary-container":"#ffd700","surface-container":"#262626","on-error-container":"#ffdad6","background":"#121212","surface-dim":"#121212","tertiary-container":"#3a3a3a","primary-fixed":"#ffd700","on-tertiary":"#1a1a1a","surface-tint":"#ffd700","on-secondary-fixed":"#f5f5f0","surface-container-high":"#2e2e2e","inverse-primary":"#ffd700","tertiary-fixed-dim":"#3a3a3a","on-tertiary-fixed-variant":"#e8e0c0","inverse-surface":"#181818","secondary-container":"#262626"},
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px",
                    "2xl": "16px"
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
                    "headline-xl": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800"}],
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "700"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
                    "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "700"}]
            }
          }
        }
      }
    </script>

  [3] (จาก <body>)
<script>
(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll('#productGrid [data-cat]'));
  var grid = document.getElementById('productGrid');
  var noResults = document.getElementById('noResults');

  function currentSelections(group) {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-group="' + group + '"]'));
    var out = [];
    els.forEach(function (el) {
      if (group === 'weight') {
        if (el.classList.contains('bg-primary')) out.push(el.dataset.value);
      } else if (el.checked) {
        out.push(el.dataset.value);
      }
    });
    return out;
  }

  function updateFilter() {
    var cats = currentSelections('cat');
    var brands = currentSelections('brand');
    var weights = currentSelections('weight');
    var visible = 0;
    cards.forEach(function (c) {
      var okCat = cats.length === 0 || cats.indexOf(c.dataset.cat) !== -1;
      var okBrand = brands.length === 0 || brands.indexOf(c.dataset.brand) !== -1;
      var okWeight = weights.length === 0 || (c.dataset.weight && weights.indexOf(c.dataset.weight) !== -1);
      var show = okCat && okBrand && okWeight;
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (grid) grid.style.display = visible ? '' : 'none';
    if (noResults) noResults.classList.toggle('hidden', visible !== 0);
  }

  function syncTopChips() {
    Array.prototype.slice.call(document.querySelectorAll('[data-setcat]')).forEach(function (chip) {
      var cb = document.querySelector('[data-group="cat"][data-value="' + chip.dataset.setcat + '"]');
      var active = cb && cb.checked;
      chip.className = active
        ? 'bg-primary text-on-primary-fixed px-4 py-1.5 rounded-full font-label-sm text-xs'
        : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant px-4 py-1.5 rounded-full font-label-sm text-xs transition-colors';
    });
  }

  Array.prototype.slice.call(document.querySelectorAll('[data-group="cat"], [data-group="brand"]')).forEach(function (cb) {
    cb.addEventListener('change', updateFilter);
  });
  Array.prototype.slice.call(document.querySelectorAll('[data-group="cat"]')).forEach(function (cb) {
    cb.addEventListener('change', syncTopChips);
  });

  Array.prototype.slice.call(document.querySelectorAll('[data-group="weight"]')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.classList.contains('bg-primary');
      btn.className = on
        ? 'bg-[#181818] text-white font-label-sm text-label-sm uppercase px-3 py-1.5 rounded-sm hover:bg-primary hover:text-[#1a1a1a] transition-colors'
        : 'bg-primary text-[#1a1a1a] font-label-sm text-label-sm uppercase px-3 py-1.5 rounded-sm hover:bg-[#181818] hover:text-white transition-colors';
      btn.setAttribute('aria-pressed', on ? 'false' : 'true');
      updateFilter();
    });
  });

  Array.prototype.slice.call(document.querySelectorAll('[data-setcat]')).forEach(function (chip) {
    chip.addEventListener('click', function () {
      var cb = document.querySelector('[data-group="cat"][data-value="' + chip.dataset.setcat + '"]');
      if (cb) cb.checked = !cb.checked;
      updateFilter();
      syncTopChips();
    });
  });

  updateFilter();
  syncTopChips();
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
