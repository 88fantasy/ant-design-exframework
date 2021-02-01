import React, { useState } from 'react';
import { Input, AutoComplete, Tag } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { SelectProps } from 'antd/es/select';

export type QueryParamType = {
  /**
   * 提交字段
   */
  key: string;
  /**
   * 显示名称
   */
  title: string;
  type: 'string' | 'dictionary';
};

export type QueryParamTypeValue = QueryParamType & {
  value: string;
};

export type QueryParamBarProps = {
  params: QueryParamType[];
  onChange: (values: QueryParamTypeValue[], params: QueryParamType[]) => void;
  width?: number | string;
  placeholder?: string;
};

/**
 * 单行查询框
 * 用于8个查询条件以内
 * @param props 
 */
const QueryParamBar: React.FC<QueryParamBarProps> = (props) => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const [tags, setTags] = useState<QueryParamTypeValue[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const { width, placeholder = '多个关键字用竖线|分隔,多个过滤标签用回车键分隔', onChange, params } = props;

  const onSelect = (v: string, option: any) => {
    const { item } = option;
    const value = v.substring(0, v.length - 1);

    const tag = tags.find((t) => t.key === item.key);
    if (tag) {
      tag.value = value;
    } else {
      const newTag: QueryParamTypeValue = {
        ...option.item,
        value,
      };
      tags.push(newTag);
    }
    setOptions([]);
    setSearchValue('');
    onChange(tags, params);
  };

  const onEnter = () => {
    if (!searchValue || searchValue.length === 0) {
      onChange(tags, params);
    }
  };

  const onSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
    setSearchValue(value);
  };

  const searchResult = (query: string) => {
    return params.map((item, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            key={`autocomplete-${item.key}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              {item.title}:{query}
            </span>
          </div>
        ),
        item,
      };
    });
  };

  return (
    <AutoComplete options={options} onSelect={onSelect} onSearch={onSearch} value={searchValue}>
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
        style={{ width: `${width ? width : '600px'}` }}
        placeholder={placeholder}
        suffix={<InfoCircleOutlined />}
        onPressEnter={onEnter}
        onSearch={onEnter}
      />
    </AutoComplete>
  );
};
export default QueryParamBar;
