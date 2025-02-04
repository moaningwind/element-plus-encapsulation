<script lang="jsx">
import { h } from 'vue'
import NFormValueItem from './NFormValueItem.vue'

export default {
  name: 'NFormItem',
  props: {
    formOption: Object,
    model: Object,
    defaultColSpan: Number,
  },
  setup(props, { slots: rootSlots }) {
    const { formOption, model, defaultColSpan } = props

    const { formItem, col } = formOption

    const slots = {
      label: () => rootSlots[`${formItem.prop}_label`] && rootSlots[`${formItem.prop}_label`](formOption),
      default: () =>
        rootSlots[formItem.prop]
          ? rootSlots[formItem.prop](formOption)
          : h(NFormValueItem, { model, formOption }),
    }

    console.log(formOption)

    return () => (
      formOption.if !== false && [
        <el-col
          {...col}
          span={col?.span ?? defaultColSpan}
          style={{ display: formOption.show !== false ? null : 'none' }}
        >
          <el-form-item key={formItem.prop} {...formItem} v-slots={slots} />
        </el-col>,
        formOption.children?.length
        && formOption.children.map(child => (
          <NFormItem
            formOption={typeof child === 'function' ? child(formOption, model) : child}
            model={model}
            defaultColSpan={defaultColSpan}
            v-slots={rootSlots}
          />
        )),
      ]
    )
  },
}
</script>
