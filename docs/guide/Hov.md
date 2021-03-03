# 参照(hov)

## 何时使用

- 通过一个关联表引用某一个制定主键

## 代码演示

```tsx
/**
 * title: 基本用法
 * desc: 通过 `onFinish` 获取选定的值
 */

import React from 'react';
import { Hov } from 'ant-design-exframework';

const Index: React.FC = () => {
  return (
    <Hov
      columns={[
        {
          dataIndex: 'code',
          title: '编码',
        },
        {
          dataIndex: 'name',
          title: '模块名称',
        },
        {
          dataIndex: 'star',
          title: '点赞数',
        },
      ]}
      returnKey="code"
      queryParams={[
        {
          key: 'code',
          title: '编码',
          type: 'string',
        },
      ]}
      request={(params = {}) => {
        return Promise.resolve({
          code: 200,
          status: true,
          data: {
            list: [
              {
                code: '111',
                name: '222',
                star: 0,
              },
            ],
            pager: {
              size: 1,
              total: 1,
            },
          },
        });
      }}
      onFinish={(value: any) => {
        console.log(value);
      }}
    />
  );
};

export default Index;
```

<API src="../../src/Hov/Hov.tsx"></API>
