<script lang='ts' setup>
import * as ElIcons from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  title: string
  modelValue: boolean
  // 'onUpdate:modelValue': (value: boolean) => void
}>()

const emits = defineEmits(['update:modelValue'])

// const visible = useVModel(props)
const visible = useVModel(props, 'modelValue', emits)

const { copy } = useClipboard()

function handleClickIcon(key: string) {
  const text = `<${key} />`
  copy(text).then(() => {
    visible.value = false
    ElMessage.success('复制成功')
  })
}
</script>

<template>
  <el-button @click="visible = true">
    <slot />
  </el-button>
  <el-dialog v-model="visible" :title="title">
    <div
      h120 items-center justify-center overflow-auto
      flex="~ wrap"
    >
      <div
        v-for="(key, index) in Object.keys(ElIcons)"
        :key="index"
        h20 cursor-pointer items-center justify-center
        class="w1/4"
        flex="~ col"
        @click="handleClickIcon(key)"
      >
        <component :is="(ElIcons as any)[key]" h8 w8 />
        <div>{{ key }}</div>
      </div>
    </div>
  </el-dialog>
</template>
