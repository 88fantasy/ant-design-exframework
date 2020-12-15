
import { SelectProps } from 'antd/es/select';

export interface QueryParamType  {
  key: string;
  name: string;
  type: string;
}


export interface QueryParamTypeValue extends QueryParamType {
  value: string;
}

export interface QueryParamBarPropsType {
  params: QueryParamType[];
  onChange: (values: QueryParamTypeValue[], params:QueryParamType[]) => void;
  width?: number | string;
  placeholder?:string;
}

export interface QueryParamBarStateType {
  options: SelectProps<object>['options'];
  tags: Array<QueryParamTypeValue>;
  searchValue: string;
}