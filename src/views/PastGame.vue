<template>
  <Game :day="day" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTargetDate, getMsDifference, getDayNumber } from '@/composables/day'
import Game from '@/components/Game.vue'

const route = useRoute()
const targetDayNumber = +route.params.day
const targetDate = getTargetDate(targetDayNumber)
const diffMs = getMsDifference(targetDate)

const day = ref(getDayNumber(diffMs))
</script>
