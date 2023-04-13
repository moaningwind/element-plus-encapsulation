<script lang="tsx" setup>
import type { DefineComponent } from 'vue'
import * as Icons from '@element-plus/icons-vue'

interface MenuItem {
  [key: string]: any
  icon?: string
  name: string
  index: string
  children?: MenuItem[]
}

interface MenuProps {
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

const attrs = useAttrs()

function renderMenu(menuData: MenuItem[]) {
  return menuData.map((item) => {
    const Icon = item[props.iconField]
      ? (Icons as any)[item[props.iconField]] as DefineComponent<{}, {}, any>
      : null

    if (item[props.childrenField]?.length) {
      // sub-menu
      const slots = {
        default: () => renderMenu(item[props.childrenField]),
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

function render() {
  return (
    <el-menu h-screen {...attrs}>
      {renderMenu(props.menuData)}
    </el-menu>
  )
}
</script>

<template>
  <component :is="render" />
</template>
