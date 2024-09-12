<script setup>
const text = ref('LazyTooltipLazyTooltipLazyTooltip')
</script>

<template>
  <LazyTooltip max-w-20 :text="text">
    <el-tooltip
      effect="dark"
      :content="text"
      placement="top-start"
    >
      <span inline-block w-full truncate>{{ text }}</span>
    </el-tooltip>
  </LazyTooltip>
</template>
