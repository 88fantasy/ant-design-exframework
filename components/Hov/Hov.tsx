import React, { useRef, useState } from 'react';
import { Button, Drawer } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import QueryParamBar from '../QueryParamBar';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';

import type { HovProps, ParamsType } from './index.d';
import type { RequestData } from '../global/typing';

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
  const [searchParams, setSearchParams] = useState<RequestData<U>>();

  const proColumns: ProColumns<T, 'text'>[] = columns.map(column => {
    return {
      title: column.title,
      dataIndex: column.dataIndex,
    }
  });

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
          rowKey={itemKey}
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
              <QueryParamBar params={queryParams.map(p => {
                return {
                  key: p.key,
                  title: p.title,
                  type: 'string',
                }
              })}
                width="800px"
                onChange={(values, params) => {
                  const newParams: RequestData<U> = Object.assign({}, searchParams);
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
            if (request) {
              const newParams: RequestData<U> = Object.assign({
                page: {
                  pageSize: params.pageSize,
                  current: params.current,
                }
              }, searchParams);
              Object.assign(newParams, { ...params });
              request(newParams, sort, filter).then((res) => {
                if (res && res.data) {
                  list = res.data.list;
                }
              }).catch(() => {
                success = false;
              });
            }
            return {
              data: list,
              success,
              total: list.length,
            };
          }}
          rowSelection={
            {
              type: "radio",

            }
          }
          columns={proColumns}
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