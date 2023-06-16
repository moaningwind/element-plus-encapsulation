<script setup lang="ts">
function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - 2 ** (-10 * x)
}

const { pause, resume, num } = useCountTo({
  startVal: 0,
  endVal: 100,
  easingFn: easeOutExpo,
})

const percentage = computed(() => {
  return +num.value.toFixed(2)
})
</script>

<template>
  <el-progress :percentage="percentage" />
  <el-progress status="success" :percentage="percentage" />
  <el-progress type="circle" :percentage="percentage" />
  <div space="x-2">
    <button btn @click="pause">
      pause
    </button>
    <button btn @click="resume">
      resume
    </button>
  </div>
</template>
