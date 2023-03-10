// import React, { useState, useRef } from 'react';
// import { ParamsType } from '@ant-design/pro-provider';
// import ProTable, {
//   ProTableProps,
//   ActionType,
//   RequestData,
// } from '@ant-design/pro-table';
// import { Button, message, Form } from 'antd';
// import { DrawerForm, DrawerFormProps } from '@ant-design/pro-form';
// import QueryParamModal, {
//   QueryParamModalProps,
//   QueryParamModalField,
// } from '../QueryParamModal';
// import QueryParamBar, { QueryParamBarProps } from '../QueryParamBar';
// import { FormInstance } from 'antd/lib/form';
// import { IDataItems, IHovs, IHovDatas } from '../Base/BaseService';
// import { SortOrder } from 'antd/lib/table/interface';
// import { ApiResponseData, ApiResponsePage } from '../Typings';

// export type ModuleDispatchOptions = {
//   type: string;
//   payload?: {
//     data: any;
//     current?: number;
//     pageSize?: number;
//   };
//   callback?: (res: any) => void;
// };

// export type ModuleDataProps = {
//   dataitems: IDataItems;
//   hovs: IHovs;
//   permissions: string[];
//   hovDatas: IHovDatas;
// };

// enum ModuleEnum {
//   query = 'query',
//   standard = 'standard',
// }

// enum SearchEnum {
//   bar = 'bar',
//   modal = 'modal',
// }

// enum EditState {
//   append = 'append',
//   edit = 'edit',
// }

// type ModuleType = keyof typeof ModuleEnum;
// type SearchType = keyof typeof SearchEnum;
// type EditStateType = keyof typeof EditState;

// export type ModuleProps<T, U extends ParamsType> = {
//   title: string;
//   search: SearchType;
//   type: ModuleType;
//   rowKey: string;
//   columns: QueryParamModalField[];
//   queryParams: QueryParamModalField[];
//   fields: QueryParamModalField[];
//   queryProps?: QueryParamBarProps | QueryParamModalProps;
//   children?: React.ReactChildren;
//   formRender?: React.ReactNode;
//   formProps?: DrawerFormProps<T>;
//   append?: (entity: T) => Promise<Partial<ApiResponseData<T>>>;
//   update?: (entity: T) => Promise<Partial<ApiResponseData<T>>>;
//   delete?: (entities: T[]) => Promise<Partial<ApiResponseData<number>>>;

//   actionRef?:
//     | React.MutableRefObject<ActionType | undefined>
//     | ((actionRef: ActionType) => void);
//   request?: (
//     params: RequestData<U>,
//     sort: Record<string, SortOrder>,
//     filter: Record<string, React.ReactText[]>,
//   ) => Promise<Partial<ApiResponsePage<T>>>;
//   proTableProps?: ProTableProps<T, U>;
// };

// /**
//  * ??????????????????
//  * @name T ????????????
//  * @name U ????????????
//  * @param props
//  */
// const Module = <T, U extends ParamsType>(props: ModuleProps<T, U>) => {
//   const {
//     title,
//     search,
//     type,
//     rowKey,
//     formProps,
//     proTableProps,
//     queryProps,
//     children,
//   } = props;
//   const [formVisible, setFormVisible] = useState(false);
//   const [editState, setEditState] = useState<EditStateType>();
//   const [querForm] = Form.useForm();
//   const querFormRef = useRef<FormInstance>(querForm);
//   // const [searchParams, setSearchParams] = useState<U>();

//   const searchRender = (type: SearchType) => {
//     switch (type) {
//       case 'modal':
//         return (
//           <QueryParamModal
//             fields={[]}
//             {...queryProps}
//             formRef={querFormRef}
//             onFinish={(_conditions) => {
//               // setSearchParams({ conditions });
//               // actionRef.current?.reload();
//             }}
//           />
//         );
//       case 'bar':
//         return (
//           <QueryParamBar
//             params={[]}
//             {...queryProps}
//             onChange={(_conditions) => {
//               //   const newParams = {
//               //     ...searchParams,
//               //   };
//               //   params.forEach((value) => {
//               //     Object.assign(newParams, { [value.key]: undefined });
//               //   });
//               //   values.forEach((value) => {
//               //     Object.assign(newParams, { [value.key]: value.value });
//               //   });
//               //   setSearchParams(newParams);
//               //   actionRef.current?.reload();
//             }}
//           />
//         );
//     }
//   };

//   return (
//     <>
//       <DrawerForm
//         title={editState === 'append' ? '??????' : '??????'}
//         visible={formVisible}
//         onFinish={async () => {
//           // console.log(values);
//           message.success('????????????');
//           // ???????????????????????????
//           return true;
//         }}
//         {...formProps}
//       >
//         {children}
//       </DrawerForm>
//       <ProTable<T, U>
//         rowKey={rowKey || 'id'}
//         toolbar={{
//           search: searchRender(search),
//           actions:
//             type === 'standard'
//               ? [
//                   <Button
//                     key="button"
//                     type="primary"
//                     onClick={() => {
//                       setEditState('append');
//                       setFormVisible(true);
//                     }}
//                   >
//                     ??????
//                   </Button>,
//                 ]
//               : undefined,
//         }}
//         dateFormatter="string"
//         headerTitle={title}
//         search={false}
//         {...proTableProps}
//       />
//     </>
//   );
// };

// export default Module;
