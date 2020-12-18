import React, { useState } from "react";
import { Checkbox, Popover, Button, } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import * as _ from 'lodash';
import styles from "./index.less";
const RouterMenu = (props) => {
    const [checkedMenus, setCheckedMenus] = useState([]);
    const { menuData, itemClick, title = "菜单", showEdit = false, onSave, onCancel } = props;
    let totalNum = 0;
    menuData.forEach(item => {
        const { name, children = [] } = item;
        if (name) {
            if (children.length) {
                children.forEach(childItem => {
                    const { name: childName } = childItem;
                    if (childName) {
                        totalNum += 1;
                    }
                });
            }
            else {
                totalNum += 1;
            }
        }
    });
    // const handleAdd = (e) => {
    //   setShowEdit(!showEdit)
    // }
    // const handleShow = (e) => {
    //   setShowEdit(false)
    //   setChooseNum([])
    // }
    const handleCheckchange = (value) => {
        const res = _.union(checkedMenus, value);
        setCheckedMenus(res);
    };
    // const handleCancel = () => {
    //   setShowEdit(false)
    //   setChooseNum([])
    // }
    const menuConetent = (React.createElement("div", { className: styles.menuPopup },
        showEdit ? (React.createElement("div", { className: styles.menuHeader },
            React.createElement("div", { className: styles.count },
                "\u56FA\u5B9A\u81F3\u5BFC\u822A\u680F\uFF08",
                checkedMenus.length,
                "/",
                totalNum,
                "\uFF09"),
            React.createElement("div", { className: styles.buttonWrapper },
                React.createElement("span", { className: `${styles.save} ${styles.btn}`, onClick: () => onSave && onSave(checkedMenus) }, "\u4FDD\u5B58"),
                React.createElement("span", { className: `${styles.cancel} ${styles.btn}`, onClick: () => onCancel && onCancel() }, "\u53D6\u6D88")))) : null,
        React.createElement("div", { className: styles.menuWrapper }, menuData.map((item) => {
            const { name, path, icon, children = [], hideInMenu = false, key, hideChildrenInMenu = false, _target } = item;
            if (name && !hideInMenu) {
                return (React.createElement("div", { key: key, className: styles.menuItemWrapper },
                    React.createElement("div", { className: styles.menuItemHeader },
                        icon,
                        React.createElement("span", { className: styles.menuItemHeaderName }, name)),
                    React.createElement("div", null, showEdit ? (React.createElement("div", null,
                        React.createElement(Checkbox.Group, { className: styles.menuCheckboxContent, onChange: handleCheckchange }, !hideChildrenInMenu && children.length ? children.map((childItem) => {
                            const { path: childPath, name: childName, key, _target: childTarget } = childItem;
                            return childName ? (React.createElement(Checkbox, { key: key, value: childPath },
                                childName,
                                childTarget ? React.createElement(ShareAltOutlined, null) : null)
                            // <span key={childIndex} onClick={() => { handleCheck(childPath) }}>{childName}</span>
                            ) : null;
                        }) : (
                        // <span onClick={() => { handleCheck(path) }}>yes</span>
                        React.createElement(Checkbox, { value: path },
                            name,
                            _target ? React.createElement(ShareAltOutlined, null) : null))))) : (React.createElement("div", { className: styles.menuItemContent }, !hideChildrenInMenu && children.length ? children.map((childItem) => {
                        const { path: childPath, name: childName, key, _target: childTarget } = childItem;
                        return childName ? (React.createElement("span", { key: key, onClick: () => { itemClick(childPath, childItem); } },
                            childName,
                            childTarget ? React.createElement(ShareAltOutlined, null) : null)) : null;
                    }) : (React.createElement("span", { onClick: () => { itemClick(path, item); } },
                        name,
                        _target ? React.createElement(ShareAltOutlined, null) : null)))))));
            }
            return null;
        }))));
    return (React.createElement(Popover, { content: menuConetent, placement: "bottom", overlayClassName: styles.diableBox },
        React.createElement(Button, { type: "link" }, title)));
};
export default RouterMenu;
