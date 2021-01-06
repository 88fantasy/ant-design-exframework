import { ProColumns } from '@ant-design/pro-table';

export declare type RuleProColumns = ProColumns & { rules?: any[] };

export declare type PaginationPage = {
  current: number;
  pageSize: number;
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