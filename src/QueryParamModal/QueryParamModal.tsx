import React, { useRef, useState } from 'react';
import {
  Form,
  Table,
  Modal,
  Button,
  Checkbox,
  Typography,
  message,
  TableColumnType,
} from 'antd';
// import  Protable, { ProColumnType} from '@ant-design/pro-table';
import type { FormInstance, Rule } from 'antd/lib/form';
import Components from './Components';
import { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Moment } from 'moment';
import { defaultMomentDateTime } from '../Typings';

import './style';

enum FilterConditionOper {
  /**
   * 等于
   */
  EQUAL = 'EQUAL',
  /**
   * 大于
   */
  GREATER = 'GREATER',
  /**
   * 小于
   */
  LESS = 'LESS',
  /**
   * 介于
   */
  BETWEEN = 'BETWEEN',
  /**
   * 大于等于
   */
  GREATER_EQUAL = 'GREATER_EQUAL',
  /**
   * 小于等于
   */
  LESS_EQUAL = 'LESS_EQUAL',
  /**
   * 包含
   */
  IN = 'IN',
  /**
   * 匹配
   */
  MATCHING = 'MATCHING',
  /**
   * 不等于
   */
  NOT_EQUAL = 'NOT_EQUAL',
  /**
   * 为空
   */
  ISNULL = 'IS_NULL',
  /**
   * 不为空
   */
  IS_NOT_NULL = 'IS_NOT_NULL',
  /**
   * 自定义
   */
  STR = 'STR',
}

export type FilterConditionOperType = keyof typeof FilterConditionOper;

enum FilterConditionDataTypeEnum {
  /**
   * 字符串
   */
  STRING = 'STRING',
  /**
   * 数组
   */
  LIST = 'LIST',
  /**
   * 数字
   */
  NUMBER = 'NUMBER',
  /**
   * 布尔
   */
  BOOLEAN = 'BOOLEAN',
  /**
   * JSON
   */
  JSON = 'JSON',
  /**
   * 日期
   */
  DATE = 'DATE',
  /**
   * 日期时间
   */
  DATETIME = 'DATETIME',
}

export type FilterConditionDataType = keyof typeof FilterConditionDataTypeEnum;

/**
 * 查询条件
 */
export type FilterCondition = {
  /**
   * 提交字段
   */
  key: string;
  /**
   * 操作符
   */
  oper: FilterConditionOperType;
  /**
   * 值
   */
  filterValue: any;
  /**
   * 数据类型
   */
  filterDataType: FilterConditionDataType;
};

export type QueryParamModalFieldType = keyof typeof Components;

/**
 * 查询字段属性
 */
export type QueryParamModalField = {
  /**
   * 提交字段
   */
  key: string;
  /**
   * 显示
   */
  title: string;
  /**
   * 编辑器类型
   */
  type: QueryParamModalFieldType;

  /**
   * 校验规则
   */
  rules?: Rule[];
  /**
   * 可选操作符
   */
  opers?: FilterConditionOperType[];
  /**
   * 初始操作符
   */
  initialOperValue?: FilterConditionOperType;
  /**
   * 编辑器属性, 参考各编辑器文档
   */
  fieldProps?: any;
};

type FilerConditionRowValue = {
  /**
   * 是否勾选
   */
  checkbox: boolean;
  /**
   * 提交字段
   */
  key: string;
  /**
   * 操作符
   */
  oper: FilterConditionOperType;
  /**
   * 操作值, 根据不同编辑器会不同
   */
  value: any;
  /**
   * 编辑器类型
   */
  editor: string;
};

export type FilerConditionRow = {
  /**
   * 是否选择
   */
  checkbox: boolean;
  /**
   * 提交字段
   */
  key: string;
  /**
   * 显示名称
   */
  label: string;
  /**
   * 操作符
   * @default 可选操作数组第一个
   */
  oper?: FilterConditionOper;
  /**
   * 字段设置
   */
  field: QueryParamModalField;
};

export type QueryParamModalProps = {
  /**
   * 查询框标题
   * @default 高级查询
   */
  title?: string;
  /**
   * 显示类型
   * @default table
   */
  formStyle?: 'table' | 'standard';
  /**
   * 查询框字段信息
   * @default []
   */
  fields: QueryParamModalField[];
  /**
   * 查询框 Form 的引用
   */
  formRef?: React.MutableRefObject<FormInstance | undefined>;
  /**
   * 点击查询的时候回调函数
   */
  onFinish: (conditions: FilterCondition[]) => void;
};

const getOperLabel = (oper: FilterConditionOper) => {
  switch (oper) {
    case FilterConditionOper.EQUAL:
      return '=';
    case FilterConditionOper.NOT_EQUAL:
      return '!=';
    case FilterConditionOper.GREATER:
      return '>';
    case FilterConditionOper.GREATER_EQUAL:
      return '>=';
    case FilterConditionOper.LESS:
      return '<';
    case FilterConditionOper.LESS_EQUAL:
      return '<=';
    case FilterConditionOper.BETWEEN:
      return '介于';
    case FilterConditionOper.IN:
      return '包含';
    case FilterConditionOper.ISNULL:
      return '为空';
    case FilterConditionOper.IS_NOT_NULL:
      return '不为空';
    case FilterConditionOper.MATCHING:
      return '匹配';
    case FilterConditionOper.STR:
      return '自定义';
    default:
      return '未定义';
  }
};

const getDefaultFieldDataType = (
  type: QueryParamModalFieldType,
): FilterConditionDataType => {
  switch (type) {
    case 'ProFormSelect':
    case 'ProFormDateTimeRangePicker':
      return FilterConditionDataTypeEnum.LIST;
    case 'ProFormDatePicker':
      return FilterConditionDataTypeEnum.DATE;
    case 'ProFormDigit':
      return FilterConditionDataTypeEnum.NUMBER;
    case 'ProFormText':
    case 'Hov':
      return FilterConditionDataTypeEnum.STRING;
  }
};

const getDefaultOpers = (field: QueryParamModalField): string[] => {
  if (field.opers) {
    return field.opers;
  } else {
    switch (field.type) {
      case 'ProFormSelect':
        return [FilterConditionOper.IN, FilterConditionOper.ISNULL];
      case 'ProFormDigit':
      case 'ProFormDatePicker':
        return [
          FilterConditionOper.GREATER,
          FilterConditionOper.LESS,
          FilterConditionOper.GREATER_EQUAL,
          FilterConditionOper.LESS_EQUAL,
          FilterConditionOper.ISNULL,
        ];
      case 'ProFormDateTimeRangePicker':
        return [FilterConditionOper.BETWEEN];
      case 'ProFormText':
        return [
          FilterConditionOper.MATCHING,
          FilterConditionOper.EQUAL,
          FilterConditionOper.ISNULL,
          FilterConditionOper.IS_NOT_NULL,
        ];
      case 'Hov':
        return [FilterConditionOper.EQUAL, FilterConditionOper.NOT_EQUAL];
    }
  }
};

const QueryParamModal: React.FC<QueryParamModalProps> = (props) => {
  const {
    title = '高级查询',
    fields = [],
    formRef: propsFormRef,
    onFinish,
    // formStyle = 'table',
  } = props;
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(form);
  const [, updateState] = useState(false);
  const [visible, setVisible] = useState(false);
  const forgetUpdate = () => {
    setTimeout(() => updateState(true));
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const renderTableField = (
    item: QueryParamModalField,
    index: number,
    _record: any,
  ) => {
    const { key, rules, fieldProps } = item;
    const Component = Components[item.type] as any;
    return (
      <Form.Item name={['values', index, 'value']} rules={rules}>
        <Component
          {...fieldProps}
          name={['values', index, 'value']}
          itemKey={key}
        />
      </Form.Item>
    );
  };
  const columns: TableColumnType<FilerConditionRow>[] = [
    {
      dataIndex: 'checkbox',
      width: 40,
      render: (_text: string, _record: FilerConditionRow, index: number) => {
        return (
          <Form.Item
            name={['values', index, 'checkbox']}
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox />
          </Form.Item>
        );
      },
    },
    {
      title: '字段',
      dataIndex: 'key',
      width: 100,
      render: (_text: string, record: FilerConditionRow, index: number) => {
        return (
          <div style={{ display: 'flex' }}>
            <Form.Item style={{ width: 150 }}>
              <Typography.Text>{record.label}</Typography.Text>
            </Form.Item>
            <ProFormText
              disabled
              initialValue={record.key}
              fieldProps={{ style: { display: 'none' } }}
              name={['values', index, 'key']}
            />
            <ProFormText
              name={['values', index, 'editor']}
              disabled
              fieldProps={{ style: { display: 'none' } }}
              initialValue={record.field.type}
            />
          </div>
        );
      },
    },
    {
      title: '操作符',
      dataIndex: 'oper',
      width: 120,
      render: (_text: string, _record: FilerConditionRow, index: number) => {
        const opers = getDefaultOpers(_record.field);
        return (
          <ProFormSelect
            allowClear={false}
            options={opers.map((key) => {
              const oper = key as FilterConditionOper;
              return {
                label: getOperLabel(oper),
                value: key,
              };
            })}
            initialValue={_record.oper || (opers && opers[0])}
            name={['values', index, 'oper']}
          />
        );
      },
    },
    {
      title: '值',
      dataIndex: 'field',
      render: (_text: string, record: FilerConditionRow, index: number) => {
        return renderTableField(record.field, index, record);
      },
    },
  ];
  const datas: FilerConditionRow[] = fields.map((field) => {
    return {
      checkbox: false,
      key: field.key,
      label: field.title,
      oper: field.initialOperValue as FilterConditionOper,
      field,
    };
  });
  return (
    <>
      <Button type="default" onClick={showModal}>
        {title}
      </Button>
      <Modal
        title={title}
        visible={visible}
        forceRender={true}
        centered
        bodyStyle={{ padding: 0 }}
        onOk={async () => {
          const conditions: FilterCondition[] = [];
          await form
            .validateFields()
            .then(({ values }: { values: FilerConditionRowValue[] }) => {
              values
                .filter((item) => item.checkbox)
                .forEach((item) => {
                  const type = item.editor as QueryParamModalFieldType;
                  switch (type) {
                    case 'ProFormDateTimeRangePicker':
                      item.value = [
                        (item.value[0] as Moment).format(defaultMomentDateTime),
                        (item.value[1] as Moment).format(defaultMomentDateTime),
                      ];
                      break;
                    default:
                  }
                  conditions.push({
                    key: item.key,
                    oper: item.oper,
                    filterValue: item.value,
                    filterDataType: getDefaultFieldDataType(type),
                  });
                });
            })
            .catch((errorInfo) => {
              message.error(`条件校验失败: ${errorInfo}`);
            });
          setVisible(false);
          onFinish(conditions);
        }}
        onCancel={handleCancel}
        width={'60%'}
        okText="查询"
      >
        <div className="base-form">
          <Form form={form} name="basic" initialValues={{}}>
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
                if (propsFormRef)
                  propsFormRef.current = formInstance as FormInstance;
                formRef.current = formInstance as FormInstance;
              }}
            </Form.Item>
            <Table columns={columns} dataSource={datas} pagination={false} />
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default QueryParamModal;
