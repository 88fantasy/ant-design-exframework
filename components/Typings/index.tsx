import type { ProColumns } from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import type { Rule } from 'antd/lib/form';

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
}

export declare type ApiResponsePage<T> = {
  code: number;
  status: boolean;
  message?: string;
  data: {
    list: T[];
    pager: PaginationPager;
  };
}

export declare type RequestData<T extends ParamsType> = T & {
  page?: PaginationPage;
}

export type FilterCondition = {
  key: string;
}