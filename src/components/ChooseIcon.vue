<script lang='ts' setup>
import * as ElIcons from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { toLine } from '@/utils'

const props = defineProps<{
  title: string
  modelValue: boolean
  // 'onUpdate:modelValue': (value: boolean) => void
}>()

const emits = defineEmits(['update:modelValue'])

// const visible = useVModel(props)
const visible = useVModel(props, 'modelValue', emits)

const { copy } = useClipboard()

const handleClickIcon = (item: string) => {
  const text = `<el-icon-${toLine(item)} />`
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
      h120 overflow-auto
      flex="~ wrap" justify-center items-center
    >
      <div
        v-for="(item, index) in Object.keys(ElIcons)"
        :key="index"
        class="w1/4 h20"
        flex="~ col" justify-center items-center
        cursor-pointer
        @click="handleClickIcon(item)"
      >
        <component :is="`el-icon-${toLine(item)}`" w8 h8 />
        <div>{{ item }}</div>
      </div>
    </div>
  </el-dialog>
</template>
