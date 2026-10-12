<!--
  src/views/EquipmentView.vue
  แคตตาล็อกอุปกรณ์ (MR.HANDSOME Equipment Showcase)
  - เชื่อมต่อรูปจากโฟลเดอร์ public/equipment/ ตรงรุ่น 100%
  - รองรับการ Deploy บน Vercel ได้ทันที
-->
<script setup>
import { ref, computed } from 'vue'

// หมวดหมู่อุปกรณ์
const categories = [
  { id: 'compound', label: 'ธนูทดกำลัง' },
  { id: 'recurve', label: 'ธนูรีเคิร์ฟ' },
  { id: 'barebow', label: 'ธนูแบร์โบว์' },
  { id: 'arrow', label: 'ลูกธนูคาร์บอน' },
  { id: 'accessory', label: 'ศูนย์เล็งและอุปกรณ์เสริม' }
]

// แบรนด์อุปกรณ์
const brands = [
  { id: 'mathews', label: 'Mathews' },
  { id: 'hoyt', label: 'Hoyt' },
  { id: 'pse', label: 'PSE' },
  { id: 'easton', label: 'Easton' },
  { id: 'carter', label: 'Carter' }
]

// น้ำหนักดึง (Draw Weight)
const drawWeights = ['40-50', '50-60', '60-70', '70+']

// ข้อมูลอุปกรณ์ประจำสนาม MR.HANDSOME (ดึงจาก public/equipment/)
const equipmentList = ref([
  {
    id: 'eq-01',
    name: 'ธนูทดกำลัง Phase4 29"',
    brand: 'mathews',
    category: 'compound',
    weight: '50-60',
    description: 'คันธนูคอมพาวด์ประสิทธิภาพสูง ระบบรอกคู่ลดแรงสะเทือน เงียบ นิ่ง ออกแบบสำหรับนักยิงเชิงยุทธวิธีและแข่งขัน',
    specs: {
      'น้ำหนักดึง': '50-60 ปอนด์',
      'วัสดุโครง': 'คาร์บอนไฟเบอร์ & อะลูมิเนียม CNC',
      'การใช้งาน': 'ยิงเป้ามาตรฐาน & 3D'
    },
    image: '/equipment/eq-01.jpg'
  },
  {
    id: 'eq-02',
    name: 'Axis Pro คาร์บอน 5 มม.',
    brand: 'easton',
    category: 'arrow',
    weight: '',
    description: 'ก้านลูกธนูไมโครคาร์บอน 5 มม. น้ำหนักเบา เจาะทะลุได้ลึก แม่นยำสูงแม้ลมแรง พร้อมปีกขนนกแท้',
    specs: {
      'ขนาดก้าน': '5 มม. ไมโครไดอาเมเตอร์',
      'วัสดุ': 'High-Strength Carbon',
      'การใช้งาน': 'แข่งขันระยะไกล 18-50 ม.'
    },
    image: '/equipment/eq-02.jpg'
  },
  {
    id: 'eq-03',
    name: 'คันธนูรีเคิร์ฟ Xceed 25"',
    brand: 'hoyt',
    category: 'recurve',
    weight: '40-50',
    description: 'โครง Riser อะลูมิเนียมเกรดแข่งขันโอลิมปิก ให้ความมั่นคง สมดุลน้ำหนักยอดเยี่ยม และฟีลลิ่งการน้าวสายที่เฉียบคม',
    specs: {
      'น้ำหนักดึง': '40-50 ปอนด์',
      'วัสดุโครง': 'อะลูมิเนียมเกรดอากาศยาน',
      'การใช้งาน': 'Olympic Target 18m'
    },
    image: '/equipment/eq-03.jpg'
  },
  {
    id: 'eq-04',
    name: 'อุปกรณ์ช่วยยิง Target 4',
    brand: 'carter',
    category: 'accessory',
    weight: '',
    description: 'อุปกรณ์ช่วยปล่อยสายแบบไกนิ้วโป้ง (Thumb Trigger Release) กลไกสเตนเลสตัดเฉียบคม เพื่อความแม่นยำระดับนักกีฬาทีมชาติ',
    specs: {
      'ประเภท': 'Thumb Trigger Release',
      'วัสดุ': 'Hardened Steel & Brass',
      'การใช้งาน': 'ยิงเป้าความแม่นยำสูง'
    },
    image: '/equipment/eq-04.jpg'
  },
  {
    id: 'eq-05',
    name: 'Barebow Traditional Pro 68"',
    brand: 'pse',
    category: 'barebow',
    weight: '40-50',
    description: 'ธนูสไตล์สัญชาตญาณ ไร้ศูนย์เล็ง ให้ความรู้สึกดิบ คลาสสิก เหมาะสำหรับฝึกสมาธิและการจับจังหวะการยิงแบบดั้งเดิม',
    specs: {
      'น้ำหนักดึง': '40 ปอนด์',
      'ประเภท': 'Modern Bare Bow',
      'การใช้งาน': 'สันทนาการ & ฝึกสัญชาตญาณ'
    },
    image: '/equipment/eq-05.jpg'
  }
])

// Filter States
const selectedCategories = ref([])
const selectedBrands = ref([])
const selectedWeight = ref('')

// Toggle Category
const toggleCategory = (catId) => {
  const index = selectedCategories.value.indexOf(catId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(catId)
  }
}

// Toggle Weight
const toggleWeight = (w) => {
  selectedWeight.value = selectedWeight.value === w ? '' : w
}

// Reset Filters
const resetFilters = () => {
  selectedCategories.value = []
  selectedBrands.value = []
  selectedWeight.value = ''
}

// คำนวณรายการอุปกรณ์ตามเงื่อนไข
const filteredEquipment = computed(() => {
  return equipmentList.value.filter(item => {
    if (selectedCategories.value.length > 0 && !selectedCategories.value.includes(item.category)) {
      return false
    }
    if (selectedBrands.value.length > 0 && !selectedBrands.value.includes(item.brand)) {
      return false
    }
    if (selectedWeight.value && item.weight !== selectedWeight.value) {
      return false
    }
    return true
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#121212] text-stone-100 font-sans antialiased flex flex-col" lang="th">
    
    <!-- แถบแจ้งเตือน View-Only Catalog -->
    <div class="bg-[#ffd700] text-black py-2.5 px-4 text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm">
      <span class="material-symbols-outlined text-[18px]">visibility</span>
      <span>แคตตาล็อกสำหรับศึกษาข้อมูลและชมอุปกรณ์ ณ สนาม MR.HANDSOME เท่านั้น (VIEW-ONLY CATALOG)</span>
    </div>

    <!-- Main Content Grid -->
    <main class="flex-grow w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-8">
      
      <!-- ฝั่งซ้าย: Sidebar Filters -->
      <aside class="w-full md:w-64 shrink-0 space-y-6">
        <div class="bg-[#181818] border border-[#2c2c2c] rounded-2xl p-5 space-y-6">
          <div class="flex items-center justify-between border-b border-[#2c2c2c] pb-3">
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">กรองอุปกรณ์</h3>
            <button
              v-if="selectedCategories.length || selectedBrands.length || selectedWeight"
              @click="resetFilters"
              class="text-[11px] text-[#ffd700] hover:underline cursor-pointer font-semibold"
            >
              ล้างตัวกรอง
            </button>
          </div>

          <!-- Category Filter -->
          <div>
            <h4 class="text-xs font-mono font-bold text-stone-400 uppercase mb-3">หมวดหมู่</h4>
            <div class="space-y-2.5 text-xs">
              <label
                v-for="cat in categories"
                :key="cat.id"
                class="flex items-center gap-2.5 cursor-pointer text-stone-300 hover:text-white"
              >
                <input
                  type="checkbox"
                  :value="cat.id"
                  v-model="selectedCategories"
                  class="rounded bg-[#222] border-[#383838] text-[#ffd700] focus:ring-0 cursor-pointer w-4 h-4"
                  style="accent-color: #ffd700;"
                />
                <span>{{ cat.label }}</span>
              </label>
            </div>
          </div>

          <!-- Brand Filter -->
          <div>
            <h4 class="text-xs font-mono font-bold text-stone-400 uppercase mb-3">แบรนด์</h4>
            <div class="space-y-2.5 text-xs">
              <label
                v-for="brand in brands"
                :key="brand.id"
                class="flex items-center gap-2.5 cursor-pointer text-stone-300 hover:text-white"
              >
                <input
                  type="checkbox"
                  :value="brand.id"
                  v-model="selectedBrands"
                  class="rounded bg-[#222] border-[#383838] text-[#ffd700] focus:ring-0 cursor-pointer w-4 h-4"
                  style="accent-color: #ffd700;"
                />
                <span>{{ brand.label }}</span>
              </label>
            </div>
          </div>

          <!-- Draw Weight Filter -->
          <div>
            <h4 class="text-xs font-mono font-bold text-stone-400 uppercase mb-3">น้ำหนักดึง</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="w in drawWeights"
                :key="w"
                type="button"
                @click="toggleWeight(w)"
                :class="[
                  'px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer',
                  selectedWeight === w
                    ? 'bg-[#ffd700] text-black border-[#ffd700]'
                    : 'bg-[#222] text-stone-400 border-[#383838] hover:text-white'
                ]"
              >
                {{ w }} ปอนด์
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- ฝั่งขวา: รายการการ์ดอุปกรณ์ -->
      <section class="flex-1 space-y-6">
        
        <!-- แถบหมวดหมู่ด่วนด้านบน (Quick Filter Chips) -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex items-center gap-2 flex-wrap text-xs">
            <span class="text-stone-400 font-bold">หมวด:</span>
            <button
              v-for="cat in categories"
              :key="cat.id"
              type="button"
              @click="toggleCategory(cat.id)"
              :class="[
                'px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer border',
                selectedCategories.includes(cat.id)
                  ? 'bg-[#ffd700] text-black border-[#ffd700]'
                  : 'bg-[#181818] text-stone-400 border-[#2c2c2c] hover:text-white'
              ]"
            >
              {{ cat.label }}
            </button>
          </div>

          <span class="text-xs font-mono text-stone-400">
            พบ {{ filteredEquipment.length }} รายการ
          </span>
        </div>

        <!-- กรณีไม่พบอุปกรณ์ -->
        <div v-if="filteredEquipment.length === 0" class="text-center py-20 bg-[#181818] border border-[#2c2c2c] rounded-2xl p-8">
          <span class="material-symbols-outlined text-5xl text-stone-500 mb-3">search_off</span>
          <h3 class="text-base font-bold text-white mb-1">ไม่พบอุปกรณ์ที่ตรงกับเงื่อนไข</h3>
          <p class="text-xs text-stone-400 mb-4">ลองปรับหรือปลดตัวกรองทางซ้ายมือเพื่อดูรายการอื่น</p>
          <button @click="resetFilters" class="px-4 py-2 rounded-xl bg-[#ffd700] text-black font-bold text-xs cursor-pointer">
            ล้างตัวกรองทั้งหมด
          </button>
        </div>

        <!-- ตารางการ์ดอุปกรณ์ -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="item in filteredEquipment"
            :key="item.id"
            class="bg-[#181818] border border-[#2c2c2c] hover:border-[#ffd700]/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group shadow-md"
          >
            <!-- ส่วนรูปภาพ (ดึงจาก public/equipment/ รูปไม่แตกแน่นอน) -->
            <div class="aspect-square bg-[#1f1f1f] flex items-center justify-center relative overflow-hidden">
              <span class="absolute top-3 left-3 bg-[#ffd700] text-black text-[10px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase z-10 shadow-md">
                ชมที่สนามเท่านั้น
              </span>

              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <!-- รายละเอียด -->
            <div class="p-5 flex flex-col flex-grow">
              <span class="text-[10px] font-mono text-[#ffd700] uppercase font-bold tracking-wider mb-1">
                {{ item.brand }}
              </span>
              <h3 class="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#ffd700] transition-colors">
                {{ item.name }}
              </h3>
              <p class="text-xs text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                {{ item.description }}
              </p>

              <!-- ข้อมูลสเปก -->
              <div class="space-y-1 mb-4 text-[11px] text-stone-300 bg-[#222] p-2.5 rounded-xl border border-[#2c2c2c]">
                <div v-for="(val, key) in item.specs" :key="key" class="truncate">
                  <strong class="text-stone-400 font-mono">{{ key }}:</strong> {{ val }}
                </div>
              </div>

              <!-- ท้ายการ์ด -->
              <div class="mt-auto pt-3 border-t border-[#262626] flex items-center justify-between">
                <span class="text-[11px] font-mono text-stone-400">สำหรับทดลองที่สนาม</span>
                <span class="material-symbols-outlined text-[16px] text-[#ffd700]">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main>

    <!-- Footer แบบมินิมอล -->
    <footer class="w-full py-6 px-4 bg-[#101010] border-t border-[#262626] mt-auto">
      <div class="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <span class="font-bold text-[#ffd700]">MR.HANDSOME ARCHERY CLUB</span>
        <span>© 2026 MR.HANDSOME. All rights reserved.</span>
      </div>
    </footer>

  </div>
</template>