<template>
  <ul>
    <li v-for="day in daysDescending" :key="day">
      <router-link v-if="day === todaysNumber" to="/"> #{{ String(day).padStart(3, '0') }} TODAY </router-link>
      <router-link v-else :to="`/archive/${day}`">
        #{{ String(day).padStart(3, '0') }} {{ getTargetDate(day).toISOString().split('T')[0] }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { getDayNumber, getMsDifference, getTargetDate } from '@/composables/day'
import { ref } from 'vue'

const todaysDiffMs = getMsDifference(new Date())
const todaysNumber = getDayNumber(todaysDiffMs)

const daysDescending = ref(Array.from({ length: todaysNumber }, (_, i) => todaysNumber - i))
</script>

<style>
ul {
  margin: 0;
  list-style-type: none;
}
</style>
