import React from 'react';
import { QueryParamBarPropsType, QueryParamBarStateType } from './data.d';
declare class QueryParamBar extends React.Component<QueryParamBarPropsType, QueryParamBarStateType> {
    state: QueryParamBarStateType;
    onSelect: (v: string, option: any) => void;
    onEnter: (event: any) => void;
    onSearch: (value: string) => void;
    searchResult: (query: string) => {
        value: string;
        label: JSX.Element;
        item: import("./data").QueryParamType;
    }[];
    render(): JSX.Element;
}
export default QueryParamBar;
