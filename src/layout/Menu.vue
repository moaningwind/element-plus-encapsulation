<script lang="tsx">
import type { ExtractPropTypes, PropType } from 'vue'
import * as Icons from '@element-plus/icons-vue'

interface MenuItem {
  [key: string]: any
  icon?: string
  name: string
  index: string
  children?: MenuItem[]
}

const props = {
  menuData: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  name: {
    type: String,
    default: 'name',
  },
  index: {
    type: String,
    default: 'index',
  },
  icon: {
    type: String,
    default: 'icon',
  },
  children: {
    type: String,
    default: 'children',
  },
} as const

type RequiredByKeys<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & Omit<T, K>

export type MenuProps = RequiredByKeys<
  Partial<ExtractPropTypes<typeof props>>,
  'menuData'
>

export default defineComponent({
  props,
  setup(props, { attrs }) {
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

    return () => (
      <el-menu class="h100vh" {...attrs}>
        {renderMenu(props.menuData)}
      </el-menu>
    )
  },
})
</script>
