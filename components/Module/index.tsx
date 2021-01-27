import React, { Dispatch } from 'react';
import { ParamsType } from '@ant-design/pro-provider';
import ProTable, {  ProTableProps } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import QueryParamModal, { QueryParamModalField } from '../QueryParamModal';
import { FormInstance } from 'antd/lib/form';
import { IDataItems, IHovs, Pager, IHovDatas } from './BaseService';
import { TablePaginationConfig } from 'antd/lib/table';

export type ModuleDispatchOptions = {
  type: string,
  payload?: {
    data: any,
    current?: number,
    pageSize?: number,
  },
  callback?: (res: any) => void
}

export type ModuleDataProps<T> = {
  list: T[],
  pager: Pager,
  dataitems: IDataItems,
  hovs: IHovs,
  permissions: string[],
  hovDatas: IHovDatas,
  namespace: string,
  dispatch: Dispatch<ModuleDispatchOptions>,
} 
export enum SearchType {
  TABLE = 'table',
  STANDARD = 'standard'
}
export type ModuleAllProps<T, U extends ParamsType> = ModuleDataProps<T> & {
  columns: QueryParamModalField[],
  queryParams: QueryParamModalField[],
  fields : QueryParamModalField[],
  opFormVisible?: boolean,
  proTableProps: ProTableProps<T, U>,
  type: SearchType,
} 

export default class Module<T, U extends ParamsType> extends React.Component<ModuleAllProps<T, U>>{
  state = {
    searchModal: false,
    loading: false,
  }
  advancedSearchRef: React.MutableRefObject<FormInstance | undefined>
  searchRef: React.MutableRefObject<FormInstance | undefined>
  params = []
  current: number | undefined = 1
  pageSize: number | undefined
  total = 0
  
  
  
  constructor(props: ModuleAllProps<T, U>) {
    super(props);
    // @ts-ignore
    this.advancedSearchRef = React.createRef<FormInstance>();
    // @ts-ignore
    this.searchRef = React.createRef<FormInstance>();
  }

  componentDidMount() {
    const { dispatch, namespace } = this.props;
    dispatch({
      type: `${namespace}/moduleInitEffect`,
    })
    this.search();
  }
  // @ts-ignore
  handleSearchChange(pagination: TablePaginationConfig, filters, sorter) {
    this.current = pagination.current;
    this.pageSize = pagination.pageSize;
    this.search()
  }

  async search() {
    if (this.props.type === SearchType.STANDARD) {
      return await this.handleSearch()
    } else {
      const val = this.advancedSearchRef.current?.getFieldsValue();
      return await this.getList(val && val.values || [])
    }
  }

  async handleSearch() {
    const params = this.searchRef.current?.getFieldsValue();
    const arr = Object.keys(params).filter(key => {
      return params[key] !== undefined
    }).map(key => {
      return {
        key,
        value: params[key],
        op: '=',
        checkbox: true
      }
    })
    return await this.getList(arr);
  }

  filter(params: any[]) {
    return params && params.filter(item => {
      return item.checkbox;
    })
  }

  async getList(params?: any) {
    this.params = params || this.params;
    const { dispatch, namespace } = this.props;
    this.setState({
      loading: true,
    })
    return new Promise((resolve) => {
      dispatch({
        type: `${namespace}/indexEffect`,
        payload: {
          data: this.filter(this.params),
          current: this.current || 1,
          pageSize: this.pageSize
        },
        callback: (res) => {
          resolve(res);
          this.setState({
            loading: false,
          })
        }
      })
    })
    
  }

  toolBarRender = (action: any, rows: any) => {
    const buttons = [
      <Button key="button" type="primary" onClick={() => {
        const { dispatch, namespace } = this.props
        dispatch({
          type: `${namespace}/createEffect`,
          payload: {
            data: {
              test1: 1,
            }
          },
          callback: () => {
            alert('新增成功')
          }
        })
      }}>
        新建
      </Button>,
      <Button key="button" type="primary" onClick={() => {
        this.setState({
          searchModal: true
        })
      }}>
        打开高级搜索
      </Button>,
    ]
    if (this.props.proTableProps.toolBarRender) {
      const val = this.props.proTableProps.toolBarRender(action, rows)
      return buttons.concat(val as any)
    }
    return buttons;
  }

  render() {  
    const { proTableProps: { editable, rowKey, pagination }, } = this.props;
    // const newCols = queryParams.map(item => {
    //   item.hideInTable = true;
    //   return item
    // }).concat(columns.map(item => {
    //   item.search = false
    //   return item
    // }));
   
    return (
      <div>
        <QueryParamModal 
          formRef={this.advancedSearchRef} 
          fields={this.props.queryParams} 
          formStyle="table" 
          onFinish={() => {

          }}
        />
        <DrawerForm
          title="新建表单"
          visible={this.props.opFormVisible}
          onFinish={async () => {
            // console.log(values);
            message.success('提交成功');
            // 不返回不会关闭弹框
            return true;
          }}
        >
          
        </DrawerForm>
        <ProTable<T>
          columns={[]}
          request={
            async () => {
              await this.search();
              return Promise.resolve({
                data: this.props.list,
                total: this.props.pager.total,
                success: true,
              });
            }
          }
          loading={this.state.loading}
          dataSource={this.props.list}
          formRef={this.searchRef}
          editable={editable}
          rowKey={rowKey || 'id'}
          search={this.props.type !== 'standard'? false : undefined}
          onChange={(pagination1, filters, sorter) => {
            this.handleSearchChange(pagination1, filters, sorter)
          }}
          pagination={pagination || {
            pageSize: 10,
            total: this.props.pager.total
          }}
          dateFormatter="string"
          headerTitle="高级表格"
          toolBarRender={this.toolBarRender}
        />
      </div>
    );
  }
}
