# 抽屉查询框(Drawer)

## 何时使用

- 查询条件太多,希望可以节约界面空间时
- 查询条件需要操作符时

## 代码演示

<code
  src="../../src/QueryParamDrawer/demos/base.tsx"
  title="基本用法"
  desc="通过 `onChange` 获取查询条件">
</code>

<code
  src="../../src/QueryParamDrawer/demos/protable.tsx"
  title="结合 ProTable 使用"
  desc="通过 `onChange` 获取查询条件">
</code>

<API
  src="../../src/QueryParamDrawer/QueryParamDrawer.tsx">
</API>

### QueryParamDrawerField

| 参数             | 说明                         | 类型                                                                                                                                                           | 默认值 | 版本 |
| ---------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| key              | 提交字段                     | `string`                                                                                                                                                       | -      |      |
| title            | 显示                         | `string`                                                                                                                                                       | -      |      |
| type             | 编辑器类型                   | `"ProFormSelect" \| "ProFormText" \| "ProFormDatePicker" \| "ProFormDateTimeRangePicker" \| "ProFormDigit" \| "Hov"`                                           | -      |      |
| rules            | 校验规则                     | Rule[]                                                                                                                                                         | true   | -    |
| opers            | 可选操作符                   | `"EQUAL" \| "GREATER" \| "LESS" \| "BETWEEN" \| "GREATER_EQUAL" \| "LESS_EQUAL" \| "IN" \| "MATCHING" \| "NOT_EQUAL" \| "ISNULL" \| "IS_NOT_NULL" \| "STR" []` | -      |      |
| initialOperValue | 初始操作符                   | `"EQUAL" \| "GREATER" \| "LESS" \| "BETWEEN" \| "GREATER_EQUAL" \| "LESS_EQUAL" \| "IN" \| "MATCHING" \| "NOT_EQUAL" \| "ISNULL" \| "IS_NOT_NULL" \| "STR"`    | false  |      |
| fieldProps       | 编辑器属性, 参考各编辑器文档 | any                                                                                                                                                            | -      |      |
