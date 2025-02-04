<script lang="jsx">
export default {
  name: 'NTableColumn',
  setup(column, { slots }) {
    const elTableColumnSlots = {}

    if (column.renderCell)
      elTableColumnSlots.default = scope => column.renderCell(h, scope)

    if (slots[column.prop])
      elTableColumnSlots.default = scope => slots[column.prop](scope)

    if (column._children)
      elTableColumnSlots.default = () => column._children.map(column => <NTableColumn key={column.prop} {...column} v-slots={slots} />)

    if (slots[`${column.prop}Header`])
      elTableColumnSlots.header = scope => slots[`${column.prop}Header`](scope)

    return () => (
      column.visible !== false && (
        <el-table-column
          attrs={{
            ...column,
            align: column.align ?? 'center',
            showOverflowTooltip: column.showOverflowTooltip ?? true,
          }}
          v-slots={elTableColumnSlots}
        >
          {/* {column._children?.map(column => <NTableColumn key={column.prop} {...column} v-slots={slots} />)} */}
        </el-table-column>
      )
    )
  },
}
</script>
