<script setup lang="ts">
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
