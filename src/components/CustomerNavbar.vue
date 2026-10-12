<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)
watch(() => route.fullPath, () => { open.value = false })

// ปรับ path ให้ตรงกับ router ของโปรเจกต์
const links = [
  { label: 'บริการ', to: { path: '/', hash: '#services' } },
  { label: 'ราคา', to: { path: '/', hash: '#pricing' } },
  { label: 'รอบเวลา', to: { path: '/', hash: '#rounds' } },
  { label: 'กฎสนาม', to: { path: '/', hash: '#rules' } },
  { label: 'อุปกรณ์', to: '/equipment' },
  { label: 'บัตรจอง', to: '/my-bookings' }
]

const isActive = (l) => typeof l.to === 'string' && route.path === l.to
</script>

<template>
  <nav class="cnav">
    <div class="cnav-inner">
      <!-- โลโก้ MR.HANDSOME (ใช้ไฟล์ Logo.jpg พร้อมตัดขอบกลมสวยงาม) -->
      <router-link to="/" class="cnav-brand">
        <img
          src="/Logo.jpg"
          @error="(e) => e.target.src = '/logo.jpg'"
          alt="MR.HANDSOME Logo"
          class="w-9 h-9 rounded-full object-cover border border-[#ffd700]/40 shrink-0 shadow-sm"
        />
        <span>MR.HANDSOME</span>
      </router-link>

      <div class="cnav-links">
        <router-link
          v-for="l in links" :key="l.label" :to="l.to"
          class="cnav-link" :class="{ 'is-active': isActive(l) }"
        >{{ l.label }}</router-link>
        <router-link to="/schedule" class="cnav-cta">จองรอบ</router-link>
      </div>

      <button class="cnav-burger" :aria-expanded="open" aria-label="เมนู" @click="open = !open">
        <svg v-if="!open" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        <svg v-else viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>

    <transition name="cnav-menu">
      <div v-if="open" class="cnav-mobile">
        <router-link
          v-for="l in links" :key="l.label" :to="l.to"
          class="cnav-mlink" :class="{ 'is-active': isActive(l) }"
        >{{ l.label }}</router-link>
        <router-link to="/schedule" class="cnav-cta cnav-cta-block">จองรอบ</router-link>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.cnav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(18, 18, 18, .95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, .1);
}
.cnav-inner {
  max-width: 72rem; margin: 0 auto; height: 64px;
  padding: 0 1.25rem;
  display: flex; align-items: center; justify-content: space-between;
}
@media (min-width: 768px) { .cnav-inner { padding: 0 2rem; } }

.cnav-brand {
  display: flex; align-items: center; gap: 10px;
  color: #fff; font-weight: 700; letter-spacing: -.01em;
  font-family: 'Prompt', system-ui, sans-serif;
}

.cnav-links { display: none; align-items: center; gap: 4px; }
@media (min-width: 768px) { .cnav-links { display: flex; } }

.cnav-link {
  color: rgba(255, 255, 255, .75); font-size: 15px;
  padding: 8px 12px; border-radius: 8px;
  transition: color .2s, background .2s;
}
.cnav-link:hover { color: #FFD700; background: rgba(255, 255, 255, .06); }
.cnav-link.is-active { color: #FFD700; }

.cnav-cta {
  display: inline-flex; align-items: center; justify-content: center;
  margin-left: 12px; min-height: 40px; padding: 8px 20px;
  background: #FFD700; color: #121212; font-weight: 600; font-size: 14px;
  border-radius: 10px; transition: background .2s, transform .15s;
}
.cnav-cta:hover { background: #ffe033; }
.cnav-cta:active { transform: scale(.97); }
.cnav-cta-block { margin: 12px 0 0; min-height: 48px; font-size: 16px; }

.cnav-burger {
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; margin-right: -8px; color: #fff;
}
@media (min-width: 768px) { .cnav-burger { display: none; } }

.cnav-mobile {
  display: flex; flex-direction: column;
  padding: 8px 1.25rem 16px;
  border-top: 1px solid rgba(255, 255, 255, .1);
}
@media (min-width: 768px) { .cnav-mobile { display: none; } }
.cnav-mlink {
  color: rgba(255, 255, 255, .85); font-size: 16px; padding: 14px 4px;
  border-bottom: 1px solid rgba(255, 255, 255, .08);
}
.cnav-mlink.is-active { color: #FFD700; }

.cnav-link:focus-visible, .cnav-cta:focus-visible, .cnav-burger:focus-visible {
  outline: 2px solid #FFD700; outline-offset: 3px;
}

.cnav-menu-enter-active, .cnav-menu-leave-active { transition: opacity .2s ease, transform .2s ease; }
.cnav-menu-enter-from, .cnav-menu-leave-to { opacity: 0; transform: translateY(-6px); }
</style>