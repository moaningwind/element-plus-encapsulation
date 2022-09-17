<script lang="tsx" setup>
import * as Icons from '@element-plus/icons-vue'

export interface MenuItem {
  [key: string]: any
  icon?: string
  name: string
  index: string
  children?: MenuItem[]
}

export interface MenuProps {
  menuData: MenuItem[]
  name?: string
  index?: string
  icon?: string
  children?: string
}

const props = withDefaults(defineProps<MenuProps>(), {
  name: 'name',
  index: 'index',
  icon: 'icon',
  children: 'children',
})

const attrs = useAttrs()

const renderMenu = (menuData: MenuItem[]) => {
  return menuData.map((item) => {
    const Icon = (Icons as any)[item[props.icon]]

    // sub-menu
    const slots = {
      default: () => renderMenu(item[props.children]),
      title: () => {
        return (
          <>
            <Icon class="w4 h4 mr1" />
            <span>{item[props.name]}</span>
          </>
        )
      },
    }

    // 递归渲染children
    if (item[props.children]?.length)
      return <el-sub-menu class="min-w-45" index={item[props.index]} v-slots={slots} />

    // 正常渲染普通的菜单
    return (
      <el-menu-item class="min-w-45" index={item[props.index]}>
        <Icon class="w4 h4 mr1" />
        <span>{item[props.name]}</span>
      </el-menu-item>
    )
  })
}

const render = () => (
  <el-menu class="h100vh" {...attrs}>
    {renderMenu(props.menuData)}
  </el-menu>
)
</script>

<template>
  <component :is="render" />
</template>
