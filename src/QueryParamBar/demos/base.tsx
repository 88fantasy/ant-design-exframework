import React from 'react';
import { QueryParamBar } from 'ant-design-exframework';

export default () => (
  <QueryParamBar
    params={[
      {
        key: 'queryParam',
        title: '模糊查询',
        type: 'Input',
      },
      {
        key: 'code',
        title: '参数编码',
        type: 'Input',
      },
      {
        key: 'name',
        title: '参数名称',
        type: 'Input',
      },
      {
        key: 'dict',
        title: '字典',
        type: 'Group',
        fieldProps: {
          options: [
            {
              label: '111',
              value: '111',
            },
            {
              label: '222',
              value: '222',
            },
          ],
        },
      },
      {
        key: 'gov',
        title: '参照',
        type: 'Hov',
        fieldProps: {
          columns: [
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
          ],
          returnKey: 'code',
          queryParams: [
            {
              key: 'code',
              title: '编码',
              type: 'Input',
            },
          ],
          request: async (params = {}) => {
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
          },
        },
      },
    ]}
    onChange={(conditions) => {
      console.log(conditions);
    }}
  />
);
