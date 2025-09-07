import mitt from 'mitt'

type Events = {
  playSong: { startTime: number; endDelay: number }
}

const emitter = mitt<Events>()

export default {
  $on: emitter.on,
  $off: emitter.off,
  $emit: emitter.emit,
}
