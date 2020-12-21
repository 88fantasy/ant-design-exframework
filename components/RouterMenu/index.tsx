import * as React from 'react';
import { Checkbox, Popover } from 'antd';
import { ShareAltOutlined, DownOutlined } from '@ant-design/icons';
import { MenuDataItem, } from '@ant-design/pro-layout';
import { CheckboxValueType, } from 'antd/lib/checkbox/Group';

// import classNames from 'classnames';
import './style';

export interface RouterMenuItem extends MenuDataItem {
  /**
   * @_target 跳转地址
   */
  _target?: string;
  children?: RouterMenuItem[];
}

export interface RouterMenuPropsType {
  title?: string | false;
  menuData: RouterMenuItem[],
  showEdit?: boolean;
  itemClick: (path: string | undefined, item: RouterMenuItem) => void;
  onSave?: (menus: CheckboxValueType[]) => void;
  onCancel?: () => void;
  className?: string;
}



const RouterMenu: React.FC<RouterMenuPropsType> = (props) => {
  const [checkedMenus, setCheckedMenus] = React.useState<CheckboxValueType[]>([]);
  const prefixCls = 'router-menu';

  const { menuData, itemClick, title = "菜单", showEdit = false,
    onSave, onCancel, 
    // className,
  } = props;

  let totalNum = 0
  menuData.forEach(item => {
    const { name, children = [] } = item
    if (name) {
      if (children.length) {
        children.forEach(childItem => {
          const { name: childName } = childItem
          if (childName) {
            totalNum += 1
          }
        })
      } else {
        totalNum += 1
      }
    }
  })

  // const handleAdd = (e) => {
  //   setShowEdit(!showEdit)
  // }

  // const handleShow = (e) => {
  //   setShowEdit(false)
  //   setChooseNum([])
  // }

  const handleCheckchange = (value: CheckboxValueType[]) => {
    const res = [...new Set([...checkedMenus, ...value])];
    setCheckedMenus(res);
  }

  // const handleCancel = () => {
  //   setShowEdit(false)
  //   setChooseNum([])
  // }

  // const routerMenuCls = classNames(
  //   prefixCls,
  //   // {
  //   //   [`${prefixCls}-with-description`]: !!description,
  //   //   [`${prefixCls}-no-icon`]: !isShowIcon,
  //   //   [`${prefixCls}-banner`]: !!banner,
  //   //   [`${prefixCls}-rtl`]: direction === 'rtl',
  //   // },
  //   className,
  // );


  const menuConetent = (
    <div className={`${prefixCls}-menuPopup`}>
      {
        showEdit ? (
          <div className={`${prefixCls}-menuHeader`}>
            <div className={`${prefixCls}-count`}>
              固定至导航栏（{checkedMenus.length}/{totalNum}）
                  </div>
            <div className={`${prefixCls}-buttonWrapper`}>
              <span className={`${prefixCls}`} onClick={() => onSave && onSave(checkedMenus)} >保存</span>
              <span className={`${prefixCls}`} onClick={() => onCancel && onCancel()}>取消</span>
            </div>
          </div>
        ) : null
      }
      <div className={`${prefixCls}-menuWrapper`}>
        {
          menuData.map((item) => {
            const { name, path, icon, children = [], hideInMenu = false, key, hideChildrenInMenu = false, _target } = item;
            if (name && !hideInMenu) {
              return (
                <div key={key} className={`${prefixCls}-menuItemWrapper`}>
                  <div className={`${prefixCls}-menuItemHeader`}>
                    {icon}
                    {/* <img  className={`${prefixCls}-menuItemHeaderIcon`}></img> */}
                    <span className={`${prefixCls}-menuItemHeaderName`}>{name}</span>
                  </div>
                  <div>
                    {
                      showEdit ? (
                        <div >
                          <Checkbox.Group className={`${prefixCls}-menuCheckboxContent`} onChange={handleCheckchange}>
                            {
                              !hideChildrenInMenu && children.length ? children.map((childItem) => {
                                const { path: childPath, name: childName, key: childKey, _target: childTarget } = childItem
                                return childName ? (
                                  <Checkbox key={childKey} value={childPath}>{childName}{childTarget ? <ShareAltOutlined /> : null}</Checkbox>
                                  // <span key={childIndex} onClick={() => { handleCheck(childPath) }}>{childName}</span>
                                ) : null
                              }) : (
                                  // <span onClick={() => { handleCheck(path) }}>yes</span>
                                  <Checkbox value={path}>{name}{_target ? <ShareAltOutlined /> : null}</Checkbox>
                                )
                            }
                          </Checkbox.Group>
                        </div>
                      ) : (
                          <div className={`${prefixCls}-menuItemContent`}>
                            {
                              !hideChildrenInMenu && children.length ? children.map((childItem) => {
                                const { path: childPath, name: childName, key: childKey, _target: childTarget } = childItem
                                return childName ? (
                                  <span key={childKey} onClick={() => { itemClick(childPath, childItem) }}>{childName}{childTarget ? <ShareAltOutlined /> : null}</span>
                                ) : null
                              }) : (
                                  <span onClick={() => { itemClick(path, item) }}>{name}{_target ? <ShareAltOutlined /> : null}</span>
                                )
                            }
                          </div>
                        )
                    }
                  </div>
                </div >
              )
            }
            return null
          })
        }
      </div >
    </div>
  );

  return (
    <Popover content={menuConetent} placement="bottom" overlayClassName={`${prefixCls}-disableBox`} >
      {title} <DownOutlined />
    </Popover>
  )
}

export default RouterMenu;