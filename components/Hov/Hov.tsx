import React, { useRef, useState } from 'react';
import { Button, Drawer } from 'antd';
import type { ParamsType } from '@ant-design/pro-provider';
import type { SorterResult, SortOrder, } from 'antd/es/table/interface';
import QueryParamBar, { QueryParamType } from '../QueryParamBar';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import type { ApiResponsePage, RequestParamsType } from '../Typings';

export type HovColumn = ProColumns & {
  
}

export type HovParam =  QueryParamType & {
  
}

export type HovProps<T, U extends ParamsType> = {
  /**
   * 标题
   */
  title?: string;
  /**
   * 选定值
   */
  value?: number | string,
  /**
   * 表头列定义
   */
  columns: HovColumn[],
  /**
   * 返回字段
   */
  returnKey: string,  
  /**
   *
   * 用于定义 payload的 hovkey
   * @default 与returnKey 相同
   */
  itemKey?: string,
  /**
   * 查询表格字段定义
   */
  queryParams: HovParam[],
  /**
   * 当值改变时通知父组件进行修改
   */
  onFinish?: (value: any, record: T) => void;

  /**
   * 返回数据的请求
   */
  request?: (
    params: RequestParamsType<U>,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => Promise<Partial<ApiResponsePage<T>>>;
}

const Hov = <T extends Record<string, any>, U extends ParamsType>(
  props: HovProps<T, U>) => {

  const {
    title,
    value,
    columns,
    returnKey,
    itemKey,
    queryParams,
    onFinish,
    request,
  } = props;
  
  const [visible, setVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const [sorter, setSorter] = useState<string>('');
  const [searchParams, setSearchParams] = useState<RequestParamsType<U>>();
  
  const showDrawer = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="default" onClick={showDrawer}>
        {value || '打开'}
      </Button>
      <Drawer title={title} placement="bottom" visible={visible} height="500" onClose={handleCancel} >
        <ProTable<T>
          actionRef={actionRef}
          rowKey={itemKey || returnKey}
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter as SorterResult<T>;
            if (sorterResult.field) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            }
          }}
          params={{
            sorter,
          }}
          toolbar={{
            search:
              <QueryParamBar params={queryParams}
                width="800px"
                onChange={(values, params) => {
                  const newParams: RequestParamsType<U> = Object.assign({}, searchParams);
                  params.forEach((value) => {
                    Object.assign(newParams, { [value.key]: undefined });
                  });
                  values.forEach((value) => {
                    Object.assign(newParams, { [value.key]: value.value });
                  });
                  setSearchParams(newParams);
                  actionRef.current?.reload();
                }} />,
          }}
          request={async (params = {}, sort, filter) => {
            let list: T[] = [];
            let success = true;
            let total = 0;
            if (request) {
              const newParams: RequestParamsType<U> = Object.assign({
                page: {
                  pageSize: params.pageSize,
                  current: params.current,
                }
              }, searchParams);
              Object.assign(newParams, { ...params });
              await request(newParams, sort, filter).then((res) => {
                if (res && res.data) {
                  list = res.data.list;
                  total = res.data.pager.total;
                }
              }).catch(() => {
                success = false;
              });
            }
            return {
              data: list,
              success,
              total,
            };
          }}
          columns={columns}
          search={false}
          onRow={
            record => {
              return onFinish ? {
                onDoubleClick: () => {
                  onFinish(record[returnKey], record);
                  setVisible(false);
                }
              } : {}
            }
          }
        />
      </Drawer>
    </>
  )
};

export default Hov;