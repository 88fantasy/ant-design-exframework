import React, { Dispatch, useRef, useState } from 'react';
import { Button, Input, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Pager } from '../Module/BaseService';
import _ from 'lodash';
import { FormInstance } from 'antd/lib/form/Form';
import { Form } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';


export interface HovProps {
  /**
   * 值
   */
  value?: number | string,
  /**
   * 表头列定义
   */
  columns?: {
    title: string,
    dataIndex: string,
    key: string,
  }[],
  /**
   * 表格分页
   */
  pager?: Pager,
  /**
   * 表格数据
   */
  dataSource?: any[],
  /**
   *
   * type: `${namespace}/hovDataEffect`
   * 用于定义dispatch的type
   *
   */
  namespace: string,

  dispatch: Dispatch<any>,
  /**
   *
   * 用于定义 payload的 hovkey
   */
  itemKey: string,
  /**
   * 查询表格字段定义
   */
  queryParams?: {
    title: string,
    dataIndex: string,
    key: string,
  }[],
  /**
   * 当值改变时通知父组件进行修改
   */
  onChange?: (value: number | string) => void;
}

const Example: React.FC<HovProps> = ({ value, dataSource, columns , onChange, dispatch, namespace, itemKey, pager, queryParams }) => {

  const triggerChange = (changedValue: string | number) => {
    if (onChange) {
      onChange(changedValue);
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const showModal = () => {
    handleSave();
    setIsModalVisible(true);
  };

  const handleSearchChange = (pagination: TablePaginationConfig, _filters: any, _sorter: any) => {
    setCurrent(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
    handleSave(pagination.current, pagination.pageSize);
  }

  const handleSave = (c?: number, s?: number) => {
    const values = formRef.current.getFieldsValue();
    const arr = Object.keys(values).filter(key => {
      return values[key] !== undefined
    }).map(key => {
      return {
        key,
        value: values[key],
        op: '=',
        checkbox: true
      }
    })
    setLoading(true);
    dispatch({
      type: `${namespace}/hovDataEffect`,
      payload: {
        hovKey: itemKey,
        current: c || current,
        pageSize: s || pageSize,
        data: arr
      },
      callback: () => {
        setLoading(false);
      }
    })
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(form);
  const newDatas = _.reduce(queryParams, (result, item) => {
    const key = item.key || '';
    result[key] = (
      <Form.Item name={[key]} key={key}>
        <Input/>
      </Form.Item>
    );
    return result
  }, {} as any)
  newDatas.key ='key';

  return (
    <>
      <Button type="default" onClick={showModal}>
        {value || '打开'}
      </Button>
      <Modal title="参照查询" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={"60%"}>
        <Form
          form={form}
          name="basic"
          initialValues={{}}
        >
          <input
            type="text"
            style={{
              display: 'none',
            }}
          />
          <Table columns={queryParams} dataSource={[newDatas]} pagination={false}/>
        </Form>
        <div style={{marginTop: 10, marginBottom: 10}}>
          <Button onClick={handleSave as any} type="primary">查询</Button>
        </div>
        <div>结果集</div>
        <Table dataSource={dataSource} columns={columns}
          pagination = {{
            total: pager?.total,
            pageSize,
            current,
          }}
          onChange={(pagination, filters, sorter) => {
            handleSearchChange(pagination, filters, sorter)
          }}
          loading={loading}
          rowKey="id"
          onRow={record => {
            return {
              onClick: () => {
                handleOk();
                triggerChange(record.key);
              }, // 点击行
            };
          }}
        />
      </Modal>
    </>
  )
};

export default Example;