import type { MaybeRef, UseRafFnCallbackArguments } from '@vueuse/core'
import { tryOnMounted, useRafFn } from '@vueuse/core'
import { isRef, ref, unref, watch } from 'vue'

export interface CountToOptions {
  startVal?: MaybeRef<number>
  endVal?: MaybeRef<number>
  duration?: number
  autoplay?: boolean
  useEasing?: boolean
  easingFn?: (x: number) => number
}

// https://easings.net/
function easeInQuad(x: number): number {
  return x * x
}

export function useCountTo(options?: CountToOptions) {
  const {
    startVal = 0,
    endVal = 100,
    duration = 3000,
    autoplay = true,
    easingFn = easeInQuad,
  } = options ?? {}

  let realStartVal: number
  let realDuration: number
  let startTime: number
  let remaining: number

  const num = ref(startVal)

  const { pause: pauseRaf, resume: resumeRaf } = useRafFn(count, { immediate: false })

  tryOnMounted(() => {
    if (autoplay)
      start()
  })

  if (isRef(startVal)) {
    watch(startVal, () => {
      if (autoplay)
        start()
    })
  }

  if (isRef(endVal)) {
    watch(endVal, () => {
      if (autoplay)
        start()
    })
  }

  function start() {
    startTime = 0
    realStartVal = num.value = unref(startVal)
    realDuration = duration
    resumeRaf()
  }

  function pause() {
    pauseRaf()
  }

  function resume() {
    if (remaining > 0) {
      startTime = 0
      realStartVal = unref(num)
      realDuration = remaining
      resumeRaf()
    }
  }

  function count({ timestamp }: UseRafFnCallbackArguments) {
    if (!startTime)
      startTime = timestamp

    const passTime = timestamp - startTime

    const t = passTime > realDuration ? 1 : passTime / realDuration

    num.value = realStartVal + (unref(endVal) - realStartVal) * easingFn(t)

    remaining = realDuration - passTime
    if (remaining < 0)
      pause()
  }

  return {
    num,
    start,
    pause,
    resume,
  }
}
