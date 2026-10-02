<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMsg.value = 'กรุณากรอกอีเมลและรหัสผ่าน'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value
    })

    if (error) throw error

    // ล็อกอินสำเร็จ พุ่งตรงเข้าหน้า POS ทันที
    router.push('/pos')
  } catch (err) {
    errorMsg.value = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง: ' + err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-root">
    <div class="glow-layer" aria-hidden="true">
      <span class="glow glow-a"></span>
      <span class="glow glow-b"></span>
    </div>
    <div class="grain-layer" aria-hidden="true"></div>

    <div class="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div class="login-card p-8 w-full max-w-sm flex flex-col items-center">
        <!-- Logo -->
        <svg viewBox="0 0 40 40" class="w-12 h-12 mb-3">
          <circle cx="20" cy="20" r="18" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
          <circle cx="20" cy="20" r="11" fill="none" stroke="var(--gold)" stroke-width="1.5"/>
          <circle cx="20" cy="20" r="3" fill="var(--gold-bright)"/>
        </svg>

        <h1 class="text-sm font-bold tracking-[0.14em] text-white">MR. HANDSOME ARCHERY</h1>
        <p class="text-xs font-mono text-[#9a9a9a] mt-1 mb-6">OWNER / STAFF PORTAL</p>

        <!-- Error Alert -->
        <div v-if="errorMsg" class="w-full p-2.5 mb-4 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleLogin" class="w-full space-y-4">
          <div>
            <label class="block text-xs font-mono text-[#9a9a9a] mb-1">อีเมลผู้ดูแลระบบ</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              placeholder="owner@mr-handsome.com"
              class="input-field w-full"
            />
          </div>

          <div>
            <label class="block text-xs font-mono text-[#9a9a9a] mb-1">รหัสผ่าน</label>
            <input 
              v-model="password" 
              type="password" 
              required 
              placeholder="••••••••"
              class="input-field w-full"
            />
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="btn-primary w-full py-3 mt-2 text-xs font-bold"
          >
            {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบร้าน' }}
          </button>
        </form>

        <p class="text-[11px] text-[#666] text-center mt-6">
          *เข้าสู่ระบบครั้งเดียว อุปกรณ์จะจำสิทธิ์การใช้งานให้อัตโนมัติ
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-root {
  --bg: #0a0a0a;
  --panel-bg: rgba(22, 22, 22, 0.75);
  --inset-bg: rgba(255, 255, 255, 0.03);
  --border: rgba(255, 255, 255, 0.09);
  --gold: #c9962b;
  --gold-bright: #ffc93c;
  --glow-color: 255, 201, 60;
  --glow-opacity: 0.12;
  background: var(--bg);
  min-height: 100vh;
  position: relative;
}

.glow-layer { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.glow {
  position: absolute; border-radius: 9999px; filter: blur(90px);
  background: radial-gradient(circle, rgba(var(--glow-color), var(--glow-opacity)) 0%, rgba(var(--glow-color), 0) 70%);
}
.glow-a { width: 500px; height: 500px; top: -100px; left: -50px; }
.glow-b { width: 450px; height: 450px; bottom: -100px; right: -50px; }

.grain-layer {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.035; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.login-card {
  background: var(--panel-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.input-field {
  background: var(--inset-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  color: #ececec;
  outline: none;
  transition: border-color .2s;
}
.input-field:focus {
  border-color: var(--gold);
}

.btn-primary {
  background: var(--gold-bright);
  color: #0a0a0a;
  border-radius: 6px;
  transition: transform .15s, filter .2s;
  cursor: pointer;
  border: none;
}
.btn-primary:hover:not(:disabled) { filter: brightness(1.08); }
.btn-primary:active:not(:disabled) { transform: scale(0.98); }
.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
</style>