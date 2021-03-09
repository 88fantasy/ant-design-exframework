import React, { useState } from 'react';
import { Input, AutoComplete, Tag, Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { SelectProps } from 'antd/es/select';
import Components from './Components';
import { Moment } from 'moment';
import Hov from '../Hov';

export type QueryParamFieldType = keyof typeof Components;

export type QueryParamType = {
  /**
   * 提交字段
   */
  key: string;
  /**
   * 显示名称
   */
  title: string;
  /**
   * 编辑器类型
   */
  type: QueryParamFieldType;
  /**
   * 编辑器属性, 参考各编辑器文档
   */
  fieldProps?: any;
};

export type QueryParamTypeValue = QueryParamType & {
  value: string;
};

export type QueryParamBarProps = {
  /**
   * 查询条件
   * @default []
   */
  params: QueryParamType[];
  /**
   * 条件变更时触发回调函数
   */
  onChange: (values: QueryParamTypeValue[], params: QueryParamType[]) => void;
  /**
   * 输入框长度
   * @default 600
   */
  width?: number | string;
  /**
   * 输入提示
   * @default "多个关键字用竖线|分隔,多个过滤标签用回车键分隔"
   */
  placeholder?: string;
};

/**
 * 单行查询框
 * 用于8个查询条件以内
 * @param props
 */
const QueryParamBar: React.FC<QueryParamBarProps> = (props) => {
  const [tags, setTags] = useState<QueryParamTypeValue[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [modalVisiable, setModalVisiable] = useState<boolean>(false);
  const [modalNode, setModalNode] = useState<React.ReactNode>(<></>);
  const [currentItem, setCurrentItem] = useState<QueryParamType>();
  const [value, setValue] = useState<string>('');

  const {
    width = 600,
    placeholder = '多个关键字用竖线|分隔,多个过滤标签用回车键分隔',
    onChange,
    params = [],
  } = props;

  const onChanges = {
    Group: (checkedValue: string[]) => {
      setValue(checkedValue.join('|'));
    },
    RangePicker: (dates: [Moment, Moment], dateStrings: [string, string]) => {
      setValue('');
    },
    Input: (v: string) => {
      setValue(v);
    },
    Hov: (v: string) => {
      setValue(v);
    },
  };

  const renderField = (item: QueryParamType, restFieldProps?: any) => {
    const { key, fieldProps, type } = item;
    const Component = Components[item.type] as any;
    return (
      <Component
        {...fieldProps}
        onChange={onChanges[type]}
        {...restFieldProps}
      />
    );
  };

  const setItemValue = (item: QueryParamType | undefined, value: string) => {
    if (item) {
      const tmpTags = [...tags];
      const tag = tmpTags.find((t) => t.key === item.key);
      if (tag) {
        tag.value = value;
      } else {
        const newTag: QueryParamTypeValue = {
          ...item,
          value,
        };
        tmpTags.push(newTag);
      }
      setTags(tmpTags);
      setSearchValue('');
      onChange(tmpTags, params);
    }
  };

  const onSelect = (v: string) => {
    const item = params.find((p) => p.key === v);
    if (item) {
      setCurrentItem(item);
      if (item.type === 'Input') {
        setItemValue(item, searchValue);
      } else if (item.type === 'Hov') {
        Hov.show({
          ...item.fieldProps,
          onFinish: (value: any) => {
            setItemValue(item, value);
          },
        });
      } else {
        setModalNode(renderField(item));
        setModalVisiable(true);
      }
    }
  };

  const onEnter = () => {
    if (!searchValue || searchValue.length === 0) {
      onChange(tags, params);
    }
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
  };

  const options = params.map((item, idx) => {
    return {
      value: item.key,
      label: (
        <div
          key={`autocomplete-${item.key}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{item.title}</span>
        </div>
      ),
      item,
    };
  });

  const onModalConfirm = () => {
    console.log(value);
    setItemValue(currentItem, value);
    setModalVisiable(false);
  };

  const onModalCancel = () => {
    setModalVisiable(false);
  };

  return (
    <>
      <AutoComplete
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        value={searchValue}
      >
        <Input.Search
          prefix={
            <>
              {tags.map((item, idx: number) => {
                return (
                  <Tag
                    key={`tag-${item.key}`}
                    closable
                    onClose={() => {
                      tags.splice(idx, 1);
                      setTags(tags);
                    }}
                  >
                    {item.title}:{item.value}
                  </Tag>
                );
              })}
            </>
          }
          style={{ width: width || '600px' }}
          placeholder={placeholder}
          suffix={<InfoCircleOutlined />}
          onPressEnter={onEnter}
          onSearch={onEnter}
        />
      </AutoComplete>
      <Modal
        visible={modalVisiable}
        onOk={onModalConfirm}
        onCancel={onModalCancel}
        okText="确认"
        cancelText="取消"
      >
        {modalNode}
      </Modal>
    </>
  );
};
export default QueryParamBar;
