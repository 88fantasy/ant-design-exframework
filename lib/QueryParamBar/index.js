import React from 'react';
import { Input, AutoComplete, Tag, } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
class QueryParamBar extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            options: [],
            tags: [],
            searchValue: '',
        };
        this.onSelect = (v, option) => {
            const { onChange, params } = this.props;
            const { item } = option;
            const { tags } = this.state;
            const value = v.substring(0, v.length - 1);
            const tag = tags.find((value) => value.key === item.key);
            if (tag) {
                tag.value = value;
            }
            else {
                const newTag = {
                    ...option.item,
                    value,
                };
                tags.push(newTag);
            }
            this.setState({
                ...this.state,
                options: [],
                searchValue: '',
            });
            onChange(tags, params);
        };
        this.onEnter = (event) => {
            const { searchValue } = this.state;
            if (!searchValue || searchValue.length == 0) {
                const { onChange, params } = this.props;
                const { tags } = this.state;
                onChange(tags, params);
            }
        };
        this.onSearch = (value) => {
            this.setState({
                ...this.state,
                options: value ? this.searchResult(value) : [],
                searchValue: value,
            });
        };
        this.searchResult = (query) => {
            const { params } = this.props;
            return params.map((item, idx) => {
                const category = `${query}${idx}`;
                return {
                    value: category,
                    label: (React.createElement("div", { key: `autocomplete-${item.key}`, style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                        } },
                        React.createElement("span", null,
                            item.name,
                            ":",
                            query))),
                    item,
                };
            });
        };
    }
    render() {
        const { width } = this.props;
        const { options, tags, searchValue } = this.state;
        const { placeholder = '多个关键字用竖线|分隔,多个过滤标签用回车键分隔' } = this.props;
        return (React.createElement(AutoComplete, { options: options, onSelect: this.onSelect, onSearch: this.onSearch, value: searchValue },
            React.createElement(Input.Search, { prefix: React.createElement(React.Fragment, null, tags.map((item, idx) => {
                    return React.createElement(Tag, { key: `tag-${item.key}`, closable: true, onClose: (e) => {
                            tags.splice(idx, 1);
                            this.setState({ ...this.state, tags, });
                        } },
                        item.name,
                        ":",
                        item.value);
                })), style: { width: `${width ? width : '600px'}` }, placeholder: placeholder, suffix: React.createElement(InfoCircleOutlined, null), onPressEnter: this.onEnter, onSearch: this.onEnter })));
    }
}
;
export default QueryParamBar;
