<template>
  <div class="clue">
    <div class="features">
      <span class="button-placeholder">PLAY</span>
      <div class="input-frame">
        <span class="input-placeholder">GUESS A SONG</span>
        <span class="button-placeholder">(SKIP)</span>
      </div>
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
