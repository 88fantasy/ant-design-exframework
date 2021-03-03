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

export type FilterCondition = {
  key: string;
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
