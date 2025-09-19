<template>
  <YouTube src="" width="300" height="300" @ready="onReady" ref="youtube" />
</template>

<script setup lang="ts">
import YouTube from 'vue3-youtube'
import eventBus from '@/event-bus'
import { ref, onBeforeUnmount, watch } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const videoId = ref('ydpHpB_IKiw')
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
  try {
    player = youtube.value!

    const response = await fetch('/api/days/0/songs/1/id')
    const id = await response.text()

    player.loadVideoById(id)
    player.playVideo()
    player.pauseVideo()

    //eventBus.$on('playSong', handlePlaySong)
    watch(
      () => playerStore.playing,
      (newValue, oldValue) => {
        handlePlaySong(playerStore.startTime, playerStore.endDelay)
      },
    )
  } catch (err) {
    console.error(err)
  }
}

onBeforeUnmount(() => {
  eventBus.$off('playSong')
  if (endTimeout) clearTimeout(endTimeout)
})
</script>
