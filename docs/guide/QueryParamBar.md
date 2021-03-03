# 查询框(bar)

## 何时使用

- 查询条件太多,希望可以节约界面空间时
- 建议少于八个查询条件时使用

## 代码演示

```tsx
import React from 'react';
import { QueryParamBar } from 'ant-design-exframework';

export default () => (
  <QueryParamBar
    params={[
      {
        key: 'queryParam',
        title: '模糊查询',
        type: 'string',
      },
      {
        key: 'code',
        title: '参数编码',
        type: 'string',
      },
      {
        key: 'name',
        title: '参数名称',
        type: 'string',
      },
      {
        key: 'dict',
        title: '字典',
        type: 'dictionary',
      },
    ]}
    onChange={(values, params) => {}}
  />
);
```

<API src="../../src/QueryParamBar/QueryParamBar.tsx"></API>
