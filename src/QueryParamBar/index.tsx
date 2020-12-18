import React from 'react';
import { Input, AutoComplete, Tag, } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { QueryParamBarPropsType, QueryParamBarStateType, QueryParamTypeValue, } from './data.d';





class QueryParamBar extends React.Component<QueryParamBarPropsType, QueryParamBarStateType>{

  state:QueryParamBarStateType = {
    options : [],
    tags: [],
    searchValue: '',
  }

  onSelect = (v : string, option) => {
    const { onChange, params } = this.props;
    const { item } = option;
    const { tags } = this.state;
    const value = v.substring(0,v.length-1);

    const tag = tags.find((value) => value.key === item.key);
    if(tag) {
      tag.value = value;
    }
    else {
      const newTag:QueryParamTypeValue =  {
        ...option.item,
        value,
      };
      tags.push(newTag);
    }
    this.setState({
      ...this.state,
      options: [],
      searchValue : '',
    });
    onChange(tags,params);
  }

  onEnter = (event) => {
    const { searchValue } = this.state;
    if( !searchValue || searchValue.length == 0  ) {
      const { onChange, params } = this.props;
      const { tags } = this.state;
      onChange(tags,params);
    }

  }

  onSearch = (value: string) => {
    this.setState({
      ...this.state,
      options: value ? this.searchResult(value) : [],
      searchValue: value,
    });
  }

  searchResult = (query: string) => {

    const { params } = this.props;

    return params.map((item, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <div key={`autocomplete-${item.key}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                {item.name}:{query}
              </span>
            </div>
          ),
          item,
        };
      });
  }

  render() {
    const { width } = this.props;
    const { options, tags, searchValue } = this.state;

    const {placeholder='多个关键字用竖线|分隔,多个过滤标签用回车键分隔'} = this.props;

    return (
      <AutoComplete
        options={options}
        onSelect={this.onSelect}
        onSearch={this.onSearch}
        value={searchValue}
      >
        <Input.Search
          prefix={
            <>
              {
                tags.map((item,idx : number) => {
                  return <Tag key={`tag-${item.key}`} closable onClose={(e) => {
                    tags.splice(idx, 1);
                    this.setState({...this.state,tags,});
                  }}>{item.name}:{item.value}</Tag>
                })
              }
            </>
          } 
          style={{ width: `${width?width:'600px'}`}} 
          placeholder={placeholder}
          suffix={<InfoCircleOutlined />}
          onPressEnter={this.onEnter}
          onSearch={this.onEnter}
        />
      </AutoComplete>
    );
  }
};

export default QueryParamBar;
