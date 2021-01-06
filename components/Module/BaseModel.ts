import { BaseServiceType, IDataItems, IHovDatas, IHovs, Pager } from './BaseService';
const state = {
  list: [],
  pager: {} as Pager,
  dataitems: {} as IDataItems,
  hovs: {} as IHovs,
  permissions: [] as string[],
  hovDatas: {} as IHovDatas
}
type StateType = typeof state
const BaseModel = (service: BaseServiceType) => {
  return {
    state,
    effects: {
      * indexEffect(action: any, { call, put }: {call: any, put: any}) {
        const { payload: { current, size, data }, callback } = action;
        const payload = yield call(service.query.bind(service), data, current, size);
        if (callback) {
          callback(payload)
        }
        yield put({
          type: 'indexReducer',
          payload,
        });
      },
      * moduleInitEffect(action: any, { call, put }: {call: any, put: any}) {
        const { callback } = action;
        const payload = yield call(service.getModuleInit.bind(service));
        if (callback) {
          callback(payload)
        }
        yield put({
          type: 'moduleInitReducer',
          payload,
        });
      },
      * hovDataEffect(action: any, { call, put }: {call: any, put: any}) {
        const { payload: { hovKey, data, current, pageSize }, callback } = action;
        const payload = yield call(service.getHovData.bind(service, hovKey, data, current, pageSize));
        if (callback) {
          callback(payload)
        }
        yield put({
          type: 'hovDataReducer',
          payload,
        });
      },
      * createEffect(action: any, { call }: {call: any}) {
        const { payload: { data }, callback } = action;
        const payload = yield call(service.create.bind(service), data);
        if (callback) {
          callback(payload)
        }
      },
      * updateEffect(action: any, { call }: {call: any, put: any}) {
        const { payload: { id, data }, callback } = action;
        const payload = yield call(service.update.bind(service), id, data);
        if (callback) {
          callback(payload)
        }
      },
      * deleteEffect(action: any, { call }: {call: any, put: any}) {
        const { payload: { id }, callback } = action;
        const payload = yield call(service.delete.bind(service), id);
        if (callback) {
          callback(payload)
        }
      },
    },
    reducers: {
      indexReducer(newState: StateType, action: any) {
        return {
          ...newState,
          ...action.payload,
        };
      },
      moduleInitReducer(newState: StateType, action: any) {
        return {
          ...newState,
          ...action.payload,
        };
      },
      hovDataReducer(newState: StateType, action: any) {
        return {
          ...newState,
          hovDatas: {
            ... state.hovDatas,
            ...action.payload,
          }
        };
      },
    },
  }
  
}
export default BaseModel;