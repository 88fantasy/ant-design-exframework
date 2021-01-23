import type { ProColumns } from '@ant-design/pro-table';
import type { PaginationPager } from '../global/typing';
import Components from './Components';
import type { Rule } from 'antd/lib/form';


export interface QueryParamModalProps {
  formStyle: 'table' | 'standard',
  fields: QueryParamModalField[],
  formRef?: React.MutableRefObject<FormInstance | undefined>,
  dispatch: Dispatch<any>,

}

type FieldType = keyof typeof Components;

export type QueryParamModalField = ProColumns & {
  type: FieldType,
  name?: (string | number)[],
  showTime?: boolean,
  format?: string,
  rules?: Rule[],
  pager?: PaginationPager,
  namespace?: string,
  requiredMark?: boolean,
  columns?: ProColumns[],
  queryParams?: ProColumns[],
  returnKey?: string,
  dataSource?: {
    [key: string]: string | number
  }[]
}