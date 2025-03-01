<!-- eslint-disable vue/prop-name-casing -->
<script>
import { flatten } from '@/utils'
import { constant, omit } from 'lodash-es'
import NTableColumn from './NTableColumn.vue'
import NTableToolbar from './NTableToolbar.vue'

export default {
  name: 'NTable',
  components: { NTableToolbar, NTableColumn },
  inheritAttrs: false,
  props: {
    'showToolbar': {
      type: Boolean,
      // default: true,
    },
    'showExportExcel': Boolean,
    'showFullScreen': Boolean,
    'loading': Boolean,
    'columns': {
      type: Array,
      default: constant([]),
    },
    'showPagination': {
      type: Boolean,
      default: true,
    },
    'currentPage': {
      type: Number,
      default: 1,
    },
    'pageSize': {
      type: Number,
      default: 10,
    },
    'resetCurrentWhenSizeChange': {
      type: Boolean,
      default: true,
    },
    'pageSizes': {
      type: Array,
      default: constant([10, 20, 30, 40, 50]),
    },
    'total': {
      type: Number,
      default: 0,
    },
    'layout': {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    'onUpdate:currentPage': Function,
    'onUpdate:pageSize': Function,
    'onCurrentChange': Function,
    'onSizeChange': Function,
  },
  data() {
    return {
      checkedColumns: [],
    }
  },
  computed: {
    computedCurrentPage: {
      get() {
        return this.currentPage
      },
      set(newval) {
        this['onUpdate:currentPage']?.(newval)
      },
    },
    computedPageSize: {
      get() {
        return this.pageSize
      },
      set(newval) {
        this['onUpdate:pageSize']?.(newval)
      },
    },
    flatColumns() {
      return flatten(this.columns)
    },
    specificColumns() {
      return this.flatColumns.filter(item => item.type)
    },
    generalColumns() {
      return this.flatColumns.filter(item => !item.type)
    },
  },
  watch: {
    generalColumns: {
      handler(newval) {
        this.checkedColumns = newval.map(item => item.label)
      },
      immediate: true,
    },
    checkedColumns(newval) {
      this.generalColumns.forEach((column) => {
        column.visible = newval.includes(column.label)
      })
    },
  },
  methods: {
    handleCurrentChange() {
      this.onCurrentChange?.()
    },
    handleSizeChange() {
      if (this.resetCurrentWhenSizeChange)
        this.computedCurrentPage = 1
      this.onSizeChange?.()
    },
  },
}
</script>

<!-- eslint-disable vue/no-unused-refs -->
<template>
  <div>
    <!-- toolbar -->
    <NTableToolbar
      v-if="showToolbar"
      v-model:checked-columns="checkedColumns"
      :general-columns="generalColumns"
      :show-export-excel="showExportExcel"
      :show-full-screen="showFullScreen"
    >
      <template #buttons>
        <slot name="buttons" />
      </template>
      <template #tools>
        <slot name="tools" />
      </template>
    </NTableToolbar>
    <!-- elTable -->
    <el-table
      ref="elTable"
      v-loading="loading"
      m="y-4"
      v-bind="$attrs"
    >
      <slot />

      <template v-for="column in columns">
        <el-table-column
          v-if="column.type"
          :key="column.type"
          :align="column.align || 'center'"
          v-bind="column"
        />
        <NTableColumn v-else :key="column.prop" v-bind="column">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </NTableColumn>
      </template>

      <slot name="tail" />

      <template #append>
        <slot name="append" />
      </template>

      <template #empty>
        <slot name="empty" />
      </template>
    </el-table>
    <!-- elPagination -->
    <el-pagination
      v-if="showPagination"
      ref="elPagination"
      v-model:current-page="computedCurrentPage"
      v-model:page-size="computedPageSize"
      text="right"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>
