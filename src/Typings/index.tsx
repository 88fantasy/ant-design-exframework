import type { ProColumns } from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import type { Rule } from 'antd/lib/form';
import moment from 'moment';

export type RuleProColumns = ProColumns & { rules?: Rule[] };

export type QueryPageBaseRequest = {
  sorter?: string;
  page?: PaginationPage;
};

export type PaginationPage = {
  current?: number;
  pageSize?: number;
};

export type PaginationPager = PaginationPage & {
  size: number;
  total: number;
};

export type ApiResponseData<T> = {
  code: number;
  status: boolean;
  message?: string;
  data: T;
};

export type ApiResponsePage<T> = {
  code: number;
  status: boolean;
  message?: string;
  data: {
    list: T[];
    pager: PaginationPager;
  };
};

export const defaultApiResponseData: ApiResponseData<any> = {
  code: 400,
  status: false,
  data: {},
};

export const defaultApiResponsePage: ApiResponsePage<any> = {
  code: 400,
  status: false,
  data: {
    list: [],
    pager: {
      size: 0,
      total: 0,
    },
  },
};

export type RequestParamsType<T extends ParamsType> = T & {
  page?: PaginationPage;
};

export type RequestConditionsType = {
  conditions?: FilterCondition[];
  page?: PaginationPage;
};

export const defaultRangePickerProps = {
  showTime: {
    hideDisabledOptions: true,
    defaultValue: [
      moment('00:00:00', 'HH:mm:ss'),
      moment('11:59:59', 'HH:mm:ss'),
    ],
  },
  format: 'YYYY-MM-DD HH:mm:ss',
  ranges: {
    今天: [moment().startOf('day'), moment()],
    本周: [moment().startOf('week'), moment().endOf('week')],
    本月: [moment().startOf('month'), moment().endOf('month')],
  },
};

export const defaultMomentDate = 'YYYY-MM-DD';
export const defaultMomentDateTime = 'YYYY-MM-DD HH:mm:ss';

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
