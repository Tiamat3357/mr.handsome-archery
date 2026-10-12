<script setup>
const year = new Date().getFullYear()
const isClosedToday = new Date().getDay() === 3 // วันพุธ

const rounds = [
  { time: '11:00 – 12:00', label: 'รอบเช้า' },
  { time: '13:00 – 14:00', label: 'บ่าย 1' },
  { time: '14:30 – 15:30', label: 'บ่าย 2' },
  { time: '16:00 – 17:00', label: 'เย็น 1' },
  { time: '17:30 – 18:30', label: 'เย็น 2' }
]

const highlights = [
  { value: '5', label: 'รอบต่อวัน' },
  { value: '฿20', label: 'ค่าเป้า' },
  { value: '7', label: 'ครั้ง ลดครึ่งราคา' },
  { value: '10', label: 'ครั้ง ยิงฟรี 1 รอบ' }
]

const features = [
  { no: '01', title: 'มีสตาฟสอนตลอดรอบ', text: 'มีสตาฟคอยดูแลและสอนวิธียิงที่ถูกต้อง มือใหม่ที่ไม่เคยจับธนูมาก่อนก็เริ่มได้เลย' },
  { no: '02', title: 'เลือกได้ 2 แบบ', text: 'Olympic Recurve มีศูนย์เล็ง หรือ Bare Bow ไม่มีศูนย์เล็ง เลือกตามสไตล์ที่ชอบ' },
  { no: '03', title: 'สะสมแต้มด้วยเบอร์โทร', text: 'มาครบ 7 ครั้งลด 50% ครบ 10 ครั้งยิงฟรี 1 รอบ ไม่ต้องพกบัตร ไม่ต้องกลัวหาย' }
]

// ใส่ลิงก์รูปของร้านที่ช่อง image ได้เลย ถ้าเว้นว่างไว้จะแสดงลายเป้าแทน
const bows = [
  {
    name: 'Olympic Recurve',
    tag: 'มีศูนย์เล็ง',
    desc: 'พัฒนาต่อเป็นนักกีฬาได้ เหมาะกับคนที่อยากฝึกอย่างจริงจัง',
    prices: [
      { label: 'ครั้งแรก', amount: 350 },
      { label: 'ครั้งต่อไป', amount: 300 }
    ],
    image: ''
  },
  {
    name: 'Bare Bow',
    tag: 'ไม่มีศูนย์เล็ง',
    desc: 'เน้นสัญชาตญาณและความแม่นยำ ยิงด้วยความรู้สึกล้วนๆ',
    prices: [{ label: 'ราคาเดียว', amount: 300 }],
    image: ''
  }
]

const rules = [
  { title: 'การใช้อุปกรณ์', text: 'ไม่ใช้อุปกรณ์ของทางสนามมีค่าบริการเพิ่มเติม 100 บาท / ชั่วโมง / ท่าน' },
  { title: 'ค่าปรับอุปกรณ์เสียหาย', text: 'กรณีลูกธนูเสียหายหรือสูญหาย ปรับ 150 บาท / ลูก' },
  { title: 'การแต่งกาย', text: 'โปรดแต่งกายให้สุภาพเรียบร้อย และเหมาะสมกับการออกกำลังกายเพื่อความปลอดภัยของตัวท่านเอง' }
]

const toHash = (hash) => ({ path: '/', hash })
</script>

<template>
  <div class="mrhs-page" lang="th">

    <!-- Hero -->
    <header class="hero">
      <svg class="hero-rings" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <circle cx="200" cy="200" r="190" stroke="#FFD700" stroke-opacity=".10" stroke-width="2"/>
        <circle cx="200" cy="200" r="150" stroke="#FFD700" stroke-opacity=".18" stroke-width="2"/>
        <circle cx="200" cy="200" r="110" stroke="#FFD700" stroke-opacity=".30" stroke-width="2"/>
        <circle cx="200" cy="200" r="70" stroke="#FFD700" stroke-opacity=".55" stroke-width="2"/>
        <circle cx="200" cy="200" r="28" fill="#FFD700"/>
      </svg>

      <div class="container-x relative px-5 md:px-8 hero-pad">
        <div class="hero-copy">
          <p class="rise hero-pill">
            <span class="dot" :class="{ 'dot-closed': isClosedToday }"></span>
            {{ isClosedToday ? 'วันนี้ร้านหยุด · เปิดอีกครั้งพรุ่งนี้ 11:00' : 'เปิดทุกวัน 11:00 – 18:30 · หยุดวันพุธ' }}
          </p>

          <h1 class="rise hero-title" style="animation-delay: .08s">
            <span>แม่นยำ</span>
            <span>ในทุกการยิง</span>
          </h1>

          <p class="rise lead hero-lead" style="animation-delay: .16s">
            สนามยิงธนู Backyard Archery ในร้าน Mr. Handsome พะเยา มีสตาฟคอยสอนเทคนิคที่ถูกต้อง ตั้งแต่ครั้งแรกที่จับคันธนู
          </p>

          <div class="rise hero-actions" style="animation-delay: .24s">
            <router-link to="/schedule" class="btn-primary bounce-soft">
              จองรอบ
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </router-link>
            <router-link :to="toHash('#pricing')" class="btn-outline">ดูราคา</router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Quick facts -->
    <section class="relative z-10 -mt-12 px-5 md:px-8">
      <div class="container-x facts">
        <div
          v-for="(h, i) in highlights" :key="h.label"
          class="fact"
          :class="{ 'fact-left': i % 2 === 1, 'fact-top': i >= 2, 'fact-md-left': i > 0 }"
        >
          <div class="font-display fact-value">{{ h.value }}</div>
          <div class="fact-label">{{ h.label }}</div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="section px-5 md:px-8">
      <div class="container-x">
        <p class="eyebrow">ทำไมต้องที่นี่</p>
        <h2 class="section-title">ลองยิงธนูแบบสบายๆ<br class="hidden md:block">แต่ได้เทคนิคจริง</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          <div v-for="f in features" :key="f.no" class="card-lift card p-7">
            <span class="font-mono text-sm" style="color:#b89b00">{{ f.no }}</span>
            <h3 class="font-display card-title mt-4">{{ f.title }}</h3>
            <p class="muted leading-relaxed mt-2">{{ f.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="section section-alt px-5 md:px-8">
      <div class="container-x">
        <p class="eyebrow">ราคา</p>
        <h2 class="section-title">ประเภทธนูและอัตราค่าบริการ</h2>
        <p class="lead muted mt-3">ทุกเซสชันรวมอุปกรณ์และมีเจ้าหน้าที่ผู้เชี่ยวชาญดูแลและสอนเทคนิคการยิงที่ถูกต้อง</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <article v-for="bow in bows" :key="bow.name" class="card-lift card overflow-hidden flex flex-col">
            <div class="bow-cover" :style="bow.image ? { backgroundImage: `url(${bow.image})` } : {}">
              <svg v-if="!bow.image" class="bow-rings" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                <circle cx="200" cy="200" r="190" stroke="#FFD700" stroke-opacity=".15" stroke-width="3"/>
                <circle cx="200" cy="200" r="140" stroke="#FFD700" stroke-opacity=".30" stroke-width="3"/>
                <circle cx="200" cy="200" r="90" stroke="#FFD700" stroke-opacity=".55" stroke-width="3"/>
                <circle cx="200" cy="200" r="35" fill="#FFD700"/>
              </svg>
              <span class="bow-tag">{{ bow.tag }}</span>
            </div>

            <div class="p-7 flex flex-col flex-1">
              <h3 class="font-display bow-name">{{ bow.name }}</h3>
              <p class="muted leading-relaxed mt-2">{{ bow.desc }}</p>

              <div class="price-list">
                <div v-for="p in bow.prices" :key="p.label" class="price-row">
                  <span class="muted">{{ p.label }}</span>
                  <span>
                    <span class="font-display price-amount">฿{{ p.amount }}</span>
                    <span class="muted text-sm"> / ชม. / คน</span>
                  </span>
                </div>
              </div>
              <p class="muted text-sm mt-4">+ ค่าเป้า 20 บาท</p>

              <router-link to="/schedule" class="btn-dark mt-6 w-full">จองรอบนี้</router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Rounds -->
    <section id="rounds" class="section px-5 md:px-8">
      <div class="container-x">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p class="eyebrow">รอบเวลา</p>
            <h2 class="section-title">วันละ 5 รอบ</h2>
            <p class="muted mt-3">เปิดทุกวัน หยุดวันพุธ</p>
          </div>
          <router-link to="/schedule" class="btn-primary self-start md:self-auto">ดูรอบที่ว่าง</router-link>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-10">
          <div v-for="r in rounds" :key="r.time" class="card-lift card round-card">
            <div class="font-mono round-time">{{ r.time }}</div>
            <div class="muted text-sm mt-1">{{ r.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loyalty -->
    <section class="px-5 md:px-8 pb-20 md:pb-28">
      <div class="container-x loyalty">
        <svg class="loyalty-rings" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <circle cx="200" cy="200" r="190" stroke="#fff" stroke-width="18"/>
          <circle cx="200" cy="200" r="130" stroke="#fff" stroke-width="18"/>
          <circle cx="200" cy="200" r="70" stroke="#fff" stroke-width="18"/>
        </svg>

        <div class="relative grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p class="eyebrow" style="color:#FFD700">สะสมแต้ม</p>
            <h2 class="font-display loyalty-title">ยิงยิ่งบ่อย ยิ่งคุ้ม</h2>
            <p class="lead loyalty-text mt-4">ทุกครั้งที่มาใช้บริการได้ 1 แต้ม ผูกกับเบอร์โทรศัพท์ บอกเบอร์กับสตาฟแล้วสะสมได้เลย ตรวจสอบแต้มของตัวเองได้ทุกเมื่อ</p>
            <router-link to="/my-bookings" class="btn-primary mt-7">ตรวจสอบแต้มของฉัน</router-link>
          </div>

          <div class="pb-10">
            <div class="grid grid-cols-10 gap-1.5">
              <div v-for="n in 10" :key="n" class="relative flex justify-center">
                <span
                  class="stamp"
                  :class="n === 10 ? 'stamp-free' : n === 7 ? 'stamp-half' : ''"
                ></span>
                <span v-if="n === 7" class="stamp-label" style="left:50%; transform:translateX(-50%)">7 · ลด 50%</span>
                <span v-if="n === 10" class="stamp-label" style="right:0">10 · ฟรี 1 รอบ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rules -->
    <section id="rules" class="section section-alt px-5 md:px-8">
      <div class="container-x grid md:grid-cols-12 gap-10">
        <div class="md:col-span-5">
          <p class="eyebrow" style="color:#B3261E">ความปลอดภัย</p>
          <h2 class="section-title">กฎระเบียบและข้อควรทราบ</h2>
          <p class="lead muted mt-3 leading-relaxed">โปรดปฏิบัติตามกฎของสนามอย่างเคร่งครัด เพื่อความปลอดภัยและความเรียบร้อยของทุกคน</p>
        </div>

        <div class="md:col-span-7 space-y-4">
          <div v-for="(r, i) in rules" :key="r.title" class="card rule-card">
            <span class="font-mono text-sm" style="color:#B3261E">0{{ i + 1 }}</span>
            <div>
              <h3 class="font-display rule-title">{{ r.title }}</h3>
              <p class="muted mt-1 leading-relaxed">{{ r.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer px-5 md:px-8">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <div class="font-display" style="font-size:18px;font-weight:700">MR.HANDSOME</div>
          <p class="text-sm mt-1" style="color:rgba(255,255,255,.6)">© {{ year }} Mr. Handsome Archery · แม่นยำในทุกการยิง</p>
        </div>
        <div class="footer-links">
          <router-link :to="toHash('#services')">บริการ</router-link>
          <router-link :to="toHash('#pricing')">อัตราค่าบริการ</router-link>
          <router-link :to="toHash('#rules')">ความปลอดภัยในสนาม</router-link>
          <router-link to="/schedule">จองรอบ</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600&family=Prompt:wght@500;600;700&display=swap');

.mrhs-page {
  background-color: #F9F8F6; color: #121212;
  font-family: 'IBM Plex Sans Thai', system-ui, sans-serif;
}
.font-display { font-family: 'Prompt', 'IBM Plex Sans Thai', sans-serif; }

/* ความกว้างเขียนเองทั้งหมด ไม่พึ่ง max-w-* ของ Tailwind */
.container-x { width: 100%; max-width: 72rem; margin-inline: auto; }
.lead { max-width: 36rem; line-height: 1.8; text-wrap: pretty; }
.muted { color: #5f5b53; }

/* Typography */
.eyebrow { font-size: 13px; font-weight: 600; letter-spacing: .08em; color: #b89b00; margin-bottom: 12px; }
.section-title {
  font-family: 'Prompt', sans-serif; font-weight: 700;
  font-size: clamp(1.75rem, 4vw, 2.5rem); line-height: 1.4;
  text-wrap: balance;
}
.section { padding-block: 5rem; scroll-margin-top: 72px; }
@media (min-width: 768px) { .section { padding-block: 7rem; } }
.section-alt { background: #F0EEE8; }

/* Hero */
.hero { position: relative; overflow: hidden; background: #121212; color: #fff; }
.hero-rings {
  position: absolute; right: -8rem; top: 50%; transform: translateY(-50%);
  width: 560px; pointer-events: none;
}
@media (min-width: 768px) { .hero-rings { width: 720px; } }
.hero-pad { padding-top: 5rem; padding-bottom: 7rem; }
@media (min-width: 768px) { .hero-pad { padding-top: 8rem; padding-bottom: 10rem; } }
.hero-copy { width: 100%; max-width: 38rem; }

.hero-pill {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; color: rgba(255,255,255,.8);
  border: 1px solid rgba(255,255,255,.15); border-radius: 999px; padding: 6px 16px;
}
.dot { width: 6px; height: 6px; border-radius: 999px; background: #FFD700; }
.dot-closed { background: #f87171; }

.hero-title {
  margin-top: 1.75rem; font-weight: 700;
  font-size: clamp(2.75rem, 9vw, 4.75rem);
  line-height: 1.3;
}
.hero-title span { display: block; }
.hero-lead { margin-top: 1.5rem; color: rgba(255,255,255,.7); font-size: 1.0625rem; max-width: 30rem; }
.hero-actions { margin-top: 2.25rem; display: flex; flex-wrap: wrap; gap: 12px; }

/* Quick facts */
.facts {
  display: grid; grid-template-columns: repeat(2, 1fr);
  background: #fff; border: 1px solid rgba(0,0,0,.1); border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0,0,0,.06);
}
@media (min-width: 768px) { .facts { grid-template-columns: repeat(4, 1fr); } }
.fact { padding: 1.5rem 1.25rem; text-align: center; border-color: rgba(0,0,0,.1); }
@media (min-width: 768px) { .fact { padding: 1.5rem 2rem; text-align: left; } }
.fact-left { border-left-width: 1px; }
.fact-top { border-top-width: 1px; }
@media (min-width: 768px) {
  .fact-top { border-top-width: 0; }
  .fact-md-left { border-left-width: 1px; }
}
.fact-value { font-size: clamp(1.9rem, 4vw, 2.5rem); font-weight: 700; line-height: 1.3; }
.fact-label { font-size: 14px; color: #5f5b53; margin-top: 2px; }

/* Cards */
.card { background: #fff; border: 1px solid rgba(0,0,0,.1); border-radius: 1rem; }
.card-title { font-size: 1.25rem; font-weight: 600; line-height: 1.4; }
.card-lift { transition: transform .25s ease, box-shadow .25s ease; }
.card-lift:hover { transform: translateY(-4px); box-shadow: 0 14px 34px rgba(0,0,0,.08); }

/* Pricing */
.bow-cover {
  height: 11rem; position: relative; overflow: hidden;
  background: #121212 center / cover no-repeat;
}
.bow-rings { position: absolute; right: -2.5rem; bottom: -4rem; width: 18rem; }
.bow-tag {
  position: absolute; left: 1.25rem; top: 1.25rem;
  background: #FFD700; color: #000; font-size: 12px; font-weight: 600;
  padding: 4px 12px; border-radius: 999px;
}
.bow-name { font-size: 1.5rem; font-weight: 700; line-height: 1.4; }
.price-list { margin-top: 1.5rem; border-block: 1px solid rgba(0,0,0,.1); }
.price-row { display: flex; align-items: baseline; justify-content: space-between; padding-block: 1rem; }
.price-row + .price-row { border-top: 1px solid rgba(0,0,0,.1); }
.price-amount { font-size: 1.875rem; font-weight: 700; }

/* Rounds */
.round-card { padding: 1.25rem 1rem; text-align: center; border-radius: .75rem; }
.round-time { font-size: 1.05rem; font-weight: 600; letter-spacing: -.01em; }

/* Loyalty */
.loyalty {
  position: relative; overflow: hidden; background: #121212; color: #fff;
  border-radius: 1.5rem; padding: 3rem 1.75rem;
}
@media (min-width: 768px) { .loyalty { padding: 4rem 3.5rem; } }
.loyalty-rings { position: absolute; right: -6rem; top: -6rem; width: 20rem; opacity: .07; pointer-events: none; }
.loyalty-title { font-size: clamp(1.9rem, 4vw, 2.5rem); font-weight: 700; line-height: 1.4; }
.loyalty-text { color: rgba(255,255,255,.7); }
.stamp {
  width: 20px; height: 20px; border-radius: 999px; border: 2px solid rgba(255,255,255,.25);
}
@media (min-width: 768px) { .stamp { width: 28px; height: 28px; } }
.stamp-half { border-color: #FFD700; background: rgba(255,215,0,.2); }
.stamp-free { border-color: #FFD700; background: #FFD700; }
.stamp-label {
  position: absolute; top: 100%; margin-top: 12px;
  white-space: nowrap; font-size: 12px; color: #FFD700;
}

/* Rules */
.rule-card {
  display: flex; gap: 1.25rem; padding: 1.5rem;
  border-left: 4px solid #B3261E;
}
.rule-title { font-size: 1.125rem; font-weight: 600; line-height: 1.4; }

/* Footer */
.footer { background: #121212; color: #fff; padding-block: 3rem; }
.footer-links { display: flex; flex-wrap: wrap; gap: 8px 24px; font-size: 14px; color: rgba(255,255,255,.7); }
.footer-links a { transition: color .2s; }
.footer-links a:hover { color: #fff; }

/* Buttons */
.btn-primary, .btn-outline, .btn-dark {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 48px; padding: 12px 28px; border-radius: 12px; font-weight: 600;
  transition: transform .15s, background .2s, border-color .2s, color .2s;
}
.btn-primary { background: #FFD700; color: #121212; }
.btn-primary:hover { background: #ffe033; }
.btn-outline { border: 1px solid rgba(255,255,255,.3); color: #fff; }
.btn-outline:hover { border-color: #FFD700; color: #FFD700; }
.btn-dark { background: #121212; color: #fff; }
.btn-dark:hover { background: #2a2a2a; }
.btn-outline:active, .btn-dark:active { transform: scale(.98); }
.btn-primary:focus-visible, .btn-outline:focus-visible, .btn-dark:focus-visible {
  outline: 2px solid #FFD700; outline-offset: 3px;
}

/* ปุ่มจองเด้งเบาๆ (เด้งสองจังหวะแล้วพัก ไม่เด้งรัวจนน่ารำคาญ) */
.bounce-soft { animation: bounce-soft 2.4s ease-in-out infinite; }
.bounce-soft:hover { animation-play-state: paused; }
@keyframes bounce-soft {
  0%, 50%, 100% { transform: translateY(0); }
  14% { transform: translateY(-12px); }
  28% { transform: translateY(0); }
  39% { transform: translateY(-6px); }
}

/* Entrance */
.rise { opacity: 0; animation: rise .7s cubic-bezier(.2,.7,.2,1) forwards; }
@keyframes rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }

@media (prefers-reduced-motion: reduce) {
  .rise { animation: none; opacity: 1; }
  .bounce-soft { animation: none; }
  .card-lift, .btn-primary, .btn-outline, .btn-dark { transition: none; }
}
</style>