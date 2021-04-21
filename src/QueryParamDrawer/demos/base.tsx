import React from 'react';
import { QueryParamDrawer } from 'ant-design-exframework';

const Index: React.FC = () => {
  return (
    <QueryParamDrawer
      fields={[
        {
          key: 'moduleCode',
          title: '模块',
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
            onFinish: (value: any) => {},
          },
        },
        {
          key: 'credate',
          title: '日期',
          type: 'ProFormDateTimeRangePicker',
          fieldProps: {},
        },
        {
          key: 'centent',
          title: '内容',
          type: 'ProFormText',
        },
      ]}
      onFinish={(conditions) => {}}
    />
  );
};

export default Index;
