import { pick, mergeWith } from 'lodash';
import { Field } from './BaseForm';

export function pickBy(commonConfig: any, array: any): Field[] {
  let config = {};
  if (Array.isArray(commonConfig)) {
    commonConfig.forEach((item) => {
      // @ts-ignore
      config = mergeWith(config, item.apply(this), (a, b) => {
        return Object.assign({}, a, b);
      });
    })
  } else {
    // @ts-ignore
    config = commonConfig.apply(this);
  }
  if(array) config = pick(config, array);
  return Object.keys(config).map(key=>{
    return Object.assign({
      key,
      // @ts-ignore
    }, config[key])
  })
}

export interface Dictionary<T> {
  [index: string]: T;
}