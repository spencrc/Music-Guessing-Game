<template>
  <YouTube
    src=""
    width="300"
    height="300"
    @ready="onReady"
    ref="youtube"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YouTube from 'vue3-youtube'
import eventBus from '@/event-bus'

export default defineComponent({
  components: { YouTube },
  data() {
    return {
      videoId: "ydpHpB_IKiw",
      player: null as typeof YouTube | null,
      endTimeout: null as ReturnType<typeof setTimeout> | null,
    }
  },
  mounted() {
    this.player = this.$refs.youtube as typeof YouTube
  },
  beforeUnmount() {
    eventBus.$off('playSong')
    if (this.endTimeout !== null) clearTimeout(this.endTimeout)
  },
  methods: {
    async onReady() {
      await fetch("/api/days/0/songs/1/id")
        .then(res => res.text())
        .then(id => {
          this.player!.loadVideoById(id)
        })
        .catch(err => console.error(err))

      this.player!.playVideo()
      this.player!.pauseVideo()

      eventBus.$on('playSong', ({ startTime, endDelay }) => {
      this.player!.pauseVideo()
      this.player!.seekTo(startTime, true)
      this.player!.playVideo()

      if (!endDelay) return

      if (this.endTimeout !== null) {
        clearTimeout(this.endTimeout)
        this.endTimeout = null
      }

      this.endTimeout = setTimeout(() => {
        this.player!.pauseVideo()
      }, endDelay * 1000)
    })
    },
  },
})
</script>
