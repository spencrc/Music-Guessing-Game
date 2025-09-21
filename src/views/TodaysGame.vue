<template>
  <Game :day="day" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getMsDifference, getDayNumber } from '@/composables/day'
import Game from '@/components/Game.vue'

const diffMs = getMsDifference(new Date())

const day = ref(getDayNumber(diffMs))
</script>
