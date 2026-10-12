<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CustomerNavbar from './components/CustomerNavbar.vue'

const route = useRoute()
// หน้าหลังบ้าน (pos / dashboard / login) จะไม่แสดง navbar ลูกค้า
const showNav = computed(() => !route.meta.backoffice)
</script>

<template>
  <CustomerNavbar v-if="showNav" />
  <router-view />
</template>