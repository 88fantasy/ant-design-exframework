import React, { useState } from 'react';
import { Input, AutoComplete, Tag, Popover, Button, Menu } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { SelectProps } from 'antd/es/select';
import { TooltipPlacement } from 'antd/lib/tooltip';

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
  /**
   * 条件选择显示位置
   * @default "bottomLeft"
   */
  placement?: TooltipPlacement;
};

/**
 * 单行查询框
 * 用于8个查询条件以内
 * @param props
 */
const QueryParamBar: React.FC<QueryParamBarProps> = (props) => {
  const inputRef = React.useRef<any>(null);
  const [tags, setTags] = useState<QueryParamTypeValue[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [popState, setPopState] = useState<{ [x: string]: boolean }>({});
  const [menuVisiable, setMenuVisiable] = useState<boolean>(false);

  const {
    width = 600,
    placeholder = '多个关键字用竖线|分隔,多个过滤标签用回车键分隔',
    onChange,
    params = [],
    placement = 'bottomLeft',
  } = props;

  const paramsMap: { [x: string]: QueryParamType } = params.reduce(
    (obj, item) => ({
      ...obj,
      [item['key']]: item,
    }),
    {},
  );

  const onSelect = (v: string, item: QueryParamType) => {
    setMenuVisiable(false);
    if (v && v.length > 0) {
      const value = v.substring(0, v.length - 1);

      const tag = tags.find((t) => t.key === item.key);
      if (tag) {
        tag.value = value;
      } else {
        const newTag: QueryParamTypeValue = {
          ...item,
          value,
        };
        tags.push(newTag);
      }
      setSearchValue('');
      onChange(tags, params);
    }
  };

  const onEnter = () => {
    if (!searchValue || searchValue.length === 0) {
      onChange(tags, params);
    }
  };

  return (
    <Popover
      content={
        <Menu
          mode="vertical"
          onSelect={({ item, key, keyPath, domEvent }) => {
            const param = paramsMap[key];
            onSelect(searchValue, param);
          }}
        >
          {params &&
            params.map((param) => {
              return <Menu.Item key={param.key}>{param.title}</Menu.Item>;
            })}
        </Menu>
      }
      visible={menuVisiable}
      placement={placement}
      // onVisibleChange={this.handleVisibleChange}
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
        style={{ width: `${width ? width : '600px'}` }}
        placeholder={placeholder}
        suffix={<InfoCircleOutlined />}
        onPressEnter={onEnter}
        onSearch={onEnter}
        onFocus={(e) => {
          setMenuVisiable(true);
        }}
        onBlur={(e) => {
          setMenuVisiable(false);
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        ref={inputRef}
        // value={searchValue}
      />
    </Popover>
  );
};
export default QueryParamBar;
