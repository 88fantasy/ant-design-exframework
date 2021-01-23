import * as React from 'react';
import type { ParamsType } from '@ant-design/pro-provider';
import type { SortOrder } from 'antd/lib/table/interface'
import { PaginationPager, PaginationPage, ApiResponsePage, RequestData } from '../global/typing';

export type ParamsType =  ParamsType;
export type HovColumn = {
  /**
   * 显示名称
   */
  title: string;
  /**
   * 数据字典
   */
  dataIndex: string;
  /**
   * 提交字段
   */
  key: string;
}

export type HovParam = {
   /**
   * 显示名称
   */
  title: string;
  /**
   * 数据字典
   */
  dataIndex: string;
  /**
   * 提交字段
   */
  key: string;
}

export type HovProps<T, U extends ParamsType> = {
  title?: string;
  /**
   * 值
   */
  value?: number | string,
  /**
   * 表头列定义
   */
  columns: HovColumn[],
  returnKey: string,  
  /**
   *
   * 用于定义 payload的 hovkey
   */
  itemKey: string,
  /**
   * 查询表格字段定义
   */
  queryParams: HovParam[],
  /**
   * 当值改变时通知父组件进行修改
   */
  onFinish?: (value: any, record: T) => void;

  request?: (
    params: RequestData<U>,
    sort: Record<string, SortOrder>,
    filter: Record<string, React.ReactText[]>,
  ) => Promise<Partial<ApiResponsePage<T>>>;
}