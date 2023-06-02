<script lang="jsx">
function CustomTableColumn(props, { slots }) {
  function RenderCustomTableColumn(column, slots) {
    return (
      <el-table-column
        { ...column }
        align={ column.align ?? 'center'}
      >
        {{
          default: (scope) => {
            if (column.children)
              return column.children.map(child => RenderCustomTableColumn(child, slots))
            if (column.render)
              return column.render(scope)
            if (slots[column.prop])
              return slots[column.prop](scope)
            return scope.row[column.prop]
          },
          header: (scope) => {
            if (column.headerRender)
              return column.headerRender(scope)
            if (slots[`${column.prop}Header`])
              return slots[`${column.prop}Header`](scope)
            return column.label
          },
        }}
      </el-table-column>
    )
  }

  return RenderCustomTableColumn(props, slots)
}

export default CustomTableColumn
</script>
