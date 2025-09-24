<template>
  <p>{{ status }} {{ message }}</p>
  <p>CLICK <router-link to="/">HERE</router-link> TO GO HOME</p>
</template>

<script setup lang="ts">
defineProps<{
  status: number
  message: string
}>()
</script>

<style scoped>
a {
  text-decoration: underline;
}
</style>
