<template>
  <div>
    <YouTube src="" width="250" height="250" @ready="onReady" ref="youtube" />
    <button>(SONG 2) ></button>
  </div>
</template>

<script setup lang="ts">
import YouTube from 'vue3-youtube'
import { ref, onBeforeUnmount, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const props = defineProps<{ id: string }>()

const youtube = ref<InstanceType<typeof YouTube> | null>(null)

let player: InstanceType<typeof YouTube>
let endTimeout: ReturnType<typeof setTimeout> | null = null

const handlePlaySong = (startTime: number, endDelay?: number) => {
  player.pauseVideo()
  player.seekTo(startTime, true)
  player.playVideo()

  if (!endDelay) return

  if (endTimeout !== null) {
    clearTimeout(endTimeout)
    endTimeout = null
  }

  endTimeout = setTimeout(() => {
    player.pauseVideo()
  }, endDelay * 1000)
}

const onReady = async () => {
  player = youtube.value!

  player.loadVideoById(props.id)
  player.playVideo()
  player.pauseVideo()

  playerStore.finishLoading()

  watch(
    () => playerStore.playCount,
    () => {
      handlePlaySong(playerStore.startTime, playerStore.endDelay)
    },
  )
}

onBeforeUnmount(() => {
  if (endTimeout) clearTimeout(endTimeout)
})
</script>

<style scoped>
div {
  background-color: #e6e3e3;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  visibility: hidden;
}

button {
  align-self: flex-end;
}
</style>
