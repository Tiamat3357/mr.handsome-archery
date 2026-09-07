<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const packages = ref([])
const loading = ref(true)

// ดึงข้อมูลแพ็กเกจจากตาราง packages
const fetchPackages = async () => {
  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('id')

    if (error) throw error
    packages.value = data
  } catch (err) {
    console.error('Error loading packages:', err.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPackages()
})
</script>

<template>
  <div class="p-8 max-w-5xl mx-auto">
    <!-- Header -->
    <header class="mb-8 border-b border-[#2C2D30] pb-4 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-black text-amber-500 tracking-wider">MR. HANDSOME ARCHERY</h1>
        <p class="text-sm text-gray-400">ระบบเคาน์เตอร์คิดเงิน & จัดการสนาม (POS Counter)</p>
      </div>
      <div class="text-right text-xs text-emerald-400 font-mono">
        ● DATABASE CONNECTED
      </div>
    </header>

    <!-- Packages List -->
    <div v-if="loading" class="text-gray-400">กำลังโหลดข้อมูลแพ็กเกจ...</div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="pkg in packages" 
        :key="pkg.id" 
        class="bg-[#1C1E22] border border-[#2C2D30] p-5 rounded-xl hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between"
      >
        <div>
          <h3 class="text-xl font-bold text-white mb-2">{{ pkg.name }}</h3>
          <p class="text-sm text-gray-400 mb-4">{{ pkg.description }}</p>
        </div>
        <div class="pt-4 border-t border-[#2C2D30] flex justify-between items-center">
          <span class="text-xs text-gray-500">ค่าบริการ</span>
          <span class="text-2xl font-bold text-amber-400">฿{{ pkg.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>