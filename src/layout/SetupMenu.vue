<script lang="tsx" setup>
import * as Icons from '@element-plus/icons-vue'
import type { DefineComponent } from 'vue'
import type { MenuItem } from './type'

export interface MenuProps {
  menuData: MenuItem[]
  nameField?: string
  indexField?: string
  iconField?: string
  childrenField?: string
}

const props = withDefaults(defineProps<MenuProps>(), {
  nameField: 'name',
  indexField: 'index',
  iconField: 'icon',
  childrenField: 'children',
})

function RenderMenu(menuData: MenuItem[]) {
  return menuData.map((item) => {
    const Icon = item[props.iconField]
      ? (Icons as any)[item[props.iconField]] as DefineComponent<object, object, any>
      : null

    if (item[props.childrenField]?.length) {
      // sub-menu
      const slots = {
        default: () => RenderMenu(item[props.childrenField]),
        title: () => {
          return (
            <>
              {Icon ? <Icon h4 w4 /> : null}
              <span>{item[props.nameField]}</span>
            </>
          )
        },
      }
      return <el-sub-menu min-w-45 gap-1 index={item[props.indexField]} v-slots={slots} />
    }

    return (
      <el-menu-item min-w-45 gap-1 index={item[props.indexField]}>
        {Icon ? <Icon h4 w4 /> : null}
        <span>{item[props.nameField]}</span>
      </el-menu-item>
    )
  })
}

function RenderMenuFactory() {
  return RenderMenu(props.menuData)
}
</script>

<template>
  <el-menu h-screen>
    <RenderMenuFactory />
  </el-menu>
</template>
