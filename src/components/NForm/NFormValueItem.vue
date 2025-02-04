<script>
export default {
  name: 'NFormValueItem',
  inject: {
    labelField: {
      type: String,
      default: 'label',
    },
    valueField: {
      type: String,
      default: 'value',
    },
  },
  props: {
    formOption: Object,
    model: Object,
  },
  computed: {
    formIs() {
      return this.formOption.is
    },
    formType() {
      return this.formOption.type
    },
    colOption() {
      return this.formOption.col
    },
    formItemOption() {
      return this.formOption.formItem
    },
    formItemProp() {
      return this.formItemOption.prop
    },
    inputOption() {
      return this.formOption.input
    },
    formInitialize() {
      return this.formOption.initialize
    },
  },
  watch: {
    formIs() {
      this.formInitialize?.(this.formOption, this.model)
    },
    formType() {
      this.formInitialize?.(this.formOption, this.model)
    },
  },
  created() {
    this.formInitialize?.(this.formOption, this.model)
  },
}
</script>

<!-- eslint-disable vue/no-mutating-props -->
<template>
  <component
    :is="formIs"
    v-if="formIs"
    v-model="model[formItemProp]"
    v-bind="inputOption"
  />

  <el-input
    v-else-if="formType === 'input'"
    v-model="model[formItemProp]"
    v-bind="inputOption"
  />

  <el-input
    v-else-if="formType === 'textarea'"
    v-model="model[formItemProp]"
    type="textarea"
    v-bind="inputOption"
  />

  <el-date-picker
    v-else-if="formType === 'date'"
    v-model="model[formItemProp]"
    v-bind="inputOption"
  />

  <el-select
    v-else-if="formType === 'select'"
    v-model="model[formItemProp]"
    class="w-full"
    v-bind="inputOption"
  >
    <el-option
      v-for="item in formOption.input.options"
      :key="item[valueField]"
      :label="item[labelField]"
      :value="item[valueField]"
    />
  </el-select>

  <el-tree-select
    v-else-if="formType === 'treeselect'"
    v-model="model[formItemProp]"
    v-bind="inputOption"
  />

  <el-radio-group
    v-else-if="formType === 'radio'"
    v-model="model[formItemProp]"
  >
    <el-radio v-for="item in formOption.input.options" :key="item[valueField]" :value="item[valueField]">
      {{ item[labelField] }}
    </el-radio>
  </el-radio-group>

  <el-checkbox-group
    v-else-if="formType === 'checkbox'"
    v-model="model[formItemProp]"
  >
    <el-checkbox
      v-for="item in formOption.input.options"
      :key="item[valueField]"
      :value="item[valueField]"
    >
      {{ item[labelField] }}
    </el-checkbox>
  </el-checkbox-group>

  <el-switch
    v-else-if="formType === 'switch'"
    v-model="model[formItemProp]"
    v-bind="inputOption"
  />

  <div
    v-else-if="formType === 'div'"
    v-bind="inputOption"
    v-text="model[formItemProp]"
  />
</template>
