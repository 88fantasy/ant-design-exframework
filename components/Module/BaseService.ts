import { RequestOptionsInit } from "umi-request";
import request from 'umi-request';
import StandardError from "./StandardError";
import _ from 'lodash';
import { ProColumns } from "@ant-design/pro-table";

export  type Optional<T> = {
  [P in keyof T]?: T[P];
};
type PromiseFn = (url: string, data: RequestOptionsInit) => Promise<any>;
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
export type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
export interface Pager {
  size: number,
  total: number,
  current: number,
  pageSize: number
}

export interface IList<T> {
  pager: Pager,
  list: T[]
}

export type IHovs = Optional<{
  [key: string]: {
    columns: ProColumns[],
    queryParams: ProColumns[],
  }
}>

export type IHovDatas = Optional<{
  [key: string]: {
    dataSource: any[],
    pager: Pager
  }
}>

export type IDataItems = Optional<{
  [key: string]: {
    dictionary?: {
      [key: string]: string
    },
    key: string,
    name: string,
    type?: string,
    valueType?: string,
  }
}>

interface Response {
  code: number;
  msg: string;
  data: any
  status: boolean;
}

export default class BaseService<T> {
  public req: PromiseFn;
  public resource: string = '';

  constructor(resource: string, req?: PromiseFn) {
    this.req = req || request;
    this.resource = resource;
  }

  async request(url: string, options: RequestOptionsInit) {
    const { status, msg, data, code }: Response = await this.req(url, options);
    if (!status) {
      throw new StandardError(msg, code);
    }
    return data;
  }

  async create(data: Optional<T>, method?: string) {
    return await this.request(this.resource, {
      data,
      method: method || 'POST',
    })
  }

  async update(id: string | number, data?: Optional<T>, method?: string) {
    return await this.request(`${this.resource}/${id}`, {
      data,
      method: method || 'PATCH',
    })
  }

  async delete(id: string | number, method?: string) {
    return await this.request(`${this.resource}/${id}`, {
      method: method || 'DELETE',
    })
  }

  async get(id: string | number) {
    return await this.request(`${this.resource}/${id}`, {
      method: 'GET',
    })   
  }

  async getModuleInit(): Promise<{
    dataitems: IDataItems,
    hovs: IHovs,
    permissions: string[]
  }> {
    const data = await this.request(`${this.resource}/module/init`, {
      method: 'GET',
    })
    const { dataitems, hovs = {}, permissions = []} = data; 
    const dataitemsObj = _.reduce(dataitems, (result, item) => {
      // @ts-ignore
      result[item.key] = item;
      return result
    }, {});
    return { 
      dataitems: dataitemsObj, 
      hovs: _.reduce(hovs, (result, item, hovKey) => {
        const { columns, queryParams } = item
        // @ts-ignore
        result[hovKey] = {
          queryParams: queryParams.map((key: string) => {
             // @ts-ignore
            const { name } = dataitemsObj[key] || { name: key, key };
            return {
              title: name,
              key,
              dataIndex: key,
            }
          }),
          columns: columns.map((key: string) => {
             // @ts-ignore
            const { name } = dataitemsObj[key] || { name: key, key };
            return {
              title: name,
              key,
              dataIndex: key,
            }
          })
        };
        return result
      }, {}), 
      permissions,
    }
  }

  async getHovData(hovKey: string, data?: any, current?: number, pageSize?: number): Promise<IHovDatas> {
    const { list, pager } = await this.request(`${this.resource}/hov/query/${hovKey}`, {
      data: {
        data,
        page: {
          current,
          pageSize
        }
      },
      method: 'POST',
    })
    return {
      [hovKey]: {
        dataSource: list,
        pager
      }
    }
  }

  async list(data?: any, method?: string): Promise<T[]> {
    return await this.request(`${this.resource}/data/list`, {
      data,
      method: method || 'POST',
    })
  }

  async query(data?: any, current?: number, pageSize?: number, method?: string): Promise<IList<T>> {
    return await this.request(`${this.resource}/query`, {
      data: {
        data,
        page: {
          current,
          pageSize
        }
      },
      method: method || 'POST',
    })
  }
}

export type BaseServiceType= AutoInstanceType<typeof BaseService>