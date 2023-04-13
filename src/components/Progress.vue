<script lang='ts' setup>
interface Props {
  percentage: number
  isAnimate?: boolean
  time?: number
}

const props = withDefaults(defineProps<Props>(), {
  isAnimate: false,
  time: 3000,
})

// 标识动画加载过程中改变的值
const realPercentage = ref(props.isAnimate ? 0 : props.percentage)

onMounted(() => {
  if (props.isAnimate) {
    // 规定时间内加载完成
    const t = Math.ceil(props.time / props.percentage)
    const timer = setInterval(() => {
      realPercentage.value += 1
      if (realPercentage.value >= props.percentage) {
        realPercentage.value = props.percentage
        clearInterval(timer)
      }
    }, t)
  }
})
</script>

<template>
  <el-progress :percentage="realPercentage" />
</template>
