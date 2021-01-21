import React, { useRef, useState, Dispatch } from 'react';
import { ProColumns } from '@ant-design/pro-table';
import { Form, Table } from 'antd';
import { FormInstance, Rule } from 'antd/lib/form';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Components from './Components';
import ProFormSelect from './Components/ProFormSelect';
import './BaseForm.less';
import { Pager } from './BaseService'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const op = {
  OPER_EQUAL: "EQUAL",
  OPER_GREATER: "GREATER",
  OPER_LESS: "LESS",
  OPER_BETWEEN: "BETWEEN",
  OPER_GREATER_EQUAL: "GREATER_EQUAL",
  OPER_LESS_EQUAL: "LESS_EQUAL",
  OPER_IN: "IN",
  OPER_MATCHING: "MATCHING",
  OPER_NOT_EQUAL: "NOT_EQUAL",
  OPER_ISNULL: "IS_NULL",
  OPER_STR: "STR",
}
type FieldType = keyof typeof Components;
export type Field = ProColumns & {
  type: FieldType,
  name?: (string | number)[],
  showTime?: boolean,
  format?: string,
  rules?: Rule[],
  pager?: Pager,
  namespace?: string,
  requiredMark?: boolean,
  columns?: ProColumns[],
  queryParams?: ProColumns[],
  returnKey?: string,
  dataSource?: {
    [key: string]: string | number
  }[]
}

interface Props {
  formStyle: 'table' | 'standard',
  fields: Field[],
  formRef?: React.MutableRefObject<FormInstance | undefined>,
  dispatch: Dispatch<any>,

}


const BaseForm: React.FC<Props> = (props) => {
  const { fields, formRef: propsFormRef } = props;
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(form);
  const [, updateState] = useState(false);
  const forgetUpdate = () => {
    setTimeout(() => updateState(true));
  };


  // const renderField = (item: Field) => {
  //   const { type, title, name, key, ...rest } = item;
  //   const Component = Components[item.type] as any;
  //   return (
  //     <Form.Item label={title} name={name || [key || ""]}>
  //       <Component {...rest} name={name || [key || ""]}/>
  //     </Form.Item>
  //   )
  // }
  const renderTableField = (item: Field, index: number, _record: any) => {
    const { type, title, name, key, rules, ...rest } = item;
    const Component = Components[item.type] as any; 
    return (
      <Form.Item name={['values', index, 'value']} rules={rules} >
        <Component {...rest} name={['values', index, 'value']} itemKey={key} dispatch={props.dispatch}/>
      </Form.Item>
    )
  }
  const columns = [
    {
      title: '复选框',
      dataIndex: 'checkbox',
      key: 'checkbox',
      width: 100,
      render: (_text: string, _record: any, index: number) => {
        return (
          <Form.Item name={['values', index, 'checkbox']} valuePropName="checked" initialValue={false}>
            <Checkbox/>
          </Form.Item>
        )
      }
    },
    {
      title: '字段',
      dataIndex: 'key',
      key: 'key',
      width: 200,
      render: (_text: string, record: any, index: number) => {
        return (
          <ProFormSelect
            options={[
              {
                value: record.key,
                label: record.label
              },
            ]}
            disabled
            initialValue={record.key}
            name={['values', index, 'key']}
          />
        )
      }
    },
    {
      title: '操作符',
      dataIndex: 'op',
      key: 'op',
      width: 200,
      render: (_text: string, _record: any, index: number) => {
        return (
          <ProFormSelect
            options={Object.keys(op).map(key => {
              // @ts-ignore
              const value = op[key]
              return {
                label: value,
                value
              }
            })}
            initialValue={op.OPER_EQUAL}
            name={['values', index, 'op']}
          />
        )
      }
    },
    {
      title: '值',
      dataIndex: 'field',
      key: 'field',
      render: (_text: string, record: any, index: number) => {
        return renderTableField(record.field, index, record);
      }
    },
  ]
  const datas = fields.map(field => {
    return {
      checkbox: false,
      key: field.key,
      label: field.title,
      op: '=',
      field
    }
  })
  return (
    <div className="base-form">
      <Form
        form={form}
        {...layout}
        name="basic"
        initialValues={{}}
      >
        <input
          type="text"
          style={{
            display: 'none',
          }}
        />
        <Form.Item noStyle shouldUpdate>
          {(formInstance) => {
            // 支持 fromRef，这里 ref 里面可以随时拿到最新的值
            if (propsFormRef && !propsFormRef.current) forgetUpdate();
            if (propsFormRef) propsFormRef.current = formInstance as FormInstance;
            formRef.current = formInstance as FormInstance;
          }}
        </Form.Item>
        
        <Table columns={columns} dataSource={datas} pagination={false}/>
      </Form>
    </div>
  );
}
export default BaseForm;