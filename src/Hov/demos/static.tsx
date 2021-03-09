import React from 'react';
import ReactDOM from 'react-dom';
import { Hov } from 'ant-design-exframework';
import { Button } from 'antd';

const Index: React.FC = () => {
  const click = () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(
      <Hov
        visible={true}
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
            type: 'Input',
          },
        ]}
        request={async (params = {}) => {
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
        onFinish={(value: any) => {}}
      />,
      div,
    );
  };

  return <Button onClick={click}>打开</Button>;
};

export default Index;
