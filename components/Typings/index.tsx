import type { ProColumns } from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import type { Rule } from 'antd/lib/form';
import moment from 'moment';

export declare type RuleProColumns = ProColumns & { rules?: Rule[] };

export type QueryPageBaseRequest = {
  sorter?: string;
  page?: PaginationPage;
};

export declare type PaginationPage = {
  current?: number;
  pageSize?: number;
};

export declare type PaginationPager = PaginationPage & {
  size: number;
  total: number;
};

export declare type ApiResponseData<T> = {
  code: number;
  status: boolean;
  message?: string;
  data: T;
};

export declare type ApiResponsePage<T> = {
  code: number;
  status: boolean;
  message?: string;
  data: {
    list: T[];
    pager: PaginationPager;
  };
};

export declare type RequestData<T extends ParamsType> = T & {
  page?: PaginationPage;
};

export type FilterCondition = {
  key: string;
};

export const defaultRangePickerProps = {
  showTime: {
    hideDisabledOptions: true,
    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
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