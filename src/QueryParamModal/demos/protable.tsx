import React, { useState, useRef } from 'react';
import { Form } from 'antd';
import { QueryParamModal } from 'ant-design-exframework';
import ProTable from '@ant-design/pro-table';
import type { FormInstance } from 'antd/lib/form';

type TableListParams = {
  sorter?: string;
  conditions?: FilterCondition[];
  page?: PaginationPage;
};

const Index: React.FC = () => {
  const [sorter, setSorter] = useState<string>('');
  const [searchParams, setSearchParams] = useState({});
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(form);

  const columns: ProColumns[] = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 100,
    },
    {
      title: '内容',
      dataIndex: 'content',
      copyable: true,
      ellipsis: true,
    },
  ];

  return (
    <ProTable<{
      title: string;
      content: string;
    }>
      actionRef={actionRef}
      rowKey="loggerId"
      onChange={(_, _filter, _sorter) => {
        const sorterResult = _sorter as SorterResult<Logger>;
        if (sorterResult.field) {
          setSorter(`${sorterResult.field}_${sorterResult.order}`);
        }
      }}
      params={{
        sorter,
      }}
      toolbar={{
        search: (
          <QueryParamModal
            formRef={formRef}
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
                      type: 'string',
                    },
                  ],
                  request: (params = {}) => {
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
                  onFinish: (value: any) => {
                    formRef.current.setFields([
                      {
                        name: ['values', 0, 'value'],
                        value,
                      },
                    ]);
                  },
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
            onFinish={(conditions) => {
              setSearchParams({ conditions });
              actionRef.current?.reload();
            }}
          />
        ),
      }}
      request={(params = {}) => {
        return {
          data: [
            {
              title: '标题',
              content: '内容',
            },
          ],
          success: true,
          total: 1,
        };
      }}
      columns={columns}
      search={false}
    />
  );
};

export default Index;
