<script lang="tsx">
import type { DefineComponent, ExtractPropTypes } from 'vue'
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
  nameField: {
    type: String,
    default: 'name',
  },
  indexField: {
    type: String,
    default: 'index',
  },
  iconField: {
    type: String,
    default: 'icon',
  },
  childrenField: {
    type: String,
    default: 'children',
  },
} as const

type MenuProps = ExtractPropTypes<typeof props>

type RequiredByKeys<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & Omit<T, K>

export type RealMenuProps = RequiredByKeys<
  Partial<MenuProps>,
  'menuData'
>

export default defineComponent({
  props,
  setup(props, { attrs }) {
    const renderMenu = (menuData: MenuItem[]) => {
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

    return () => (
      <el-menu h-screen {...attrs}>
        {renderMenu(props.menuData)}
      </el-menu>
    )
  },
})
</script>
