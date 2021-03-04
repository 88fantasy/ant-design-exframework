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
