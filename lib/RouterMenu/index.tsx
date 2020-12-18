import React, { useState } from "react";
import { Checkbox, Popover, Button, } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import * as _ from 'lodash';
import styles from "./index.less";
import { RouterMenuPropsType, RouterCheckboxValueType, } from './data.d';


const HeaderMenu: React.FC<RouterMenuPropsType> = (props) => {
  const [checkedMenus, setCheckedMenus] = useState<RouterCheckboxValueType[]>([]);


  const { menuData, itemClick, title = "菜单", showEdit = false,
    onSave, onCancel
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

  const handleCheckchange = (value: RouterCheckboxValueType[]) => {
    const res = _.union(checkedMenus, value)
    setCheckedMenus(res);
  }

  // const handleCancel = () => {
  //   setShowEdit(false)
  //   setChooseNum([])
  // }

  const menuConetent = (
    <div className={styles.menuPopup}>
      {
        showEdit ? (
          <div className={styles.menuHeader}>
            <div className={styles.count}>
              固定至导航栏（{checkedMenus.length}/{totalNum}）
                  </div>
            <div className={styles.buttonWrapper}>
              <span className={`${styles.save} ${styles.btn}`} onClick={() => onSave && onSave(checkedMenus)} >保存</span>
              <span className={`${styles.cancel} ${styles.btn}`} onClick={() => onCancel && onCancel()}>取消</span>
            </div>
          </div>
        ) : null
      }
      <div className={styles.menuWrapper}>
        {
          menuData.map((item) => {
            const { name, path, icon, children = [], hideInMenu = false, key, hideChildrenInMenu = false, _target } = item;
            if (name && !hideInMenu) {
              return (
                <div key={key} className={styles.menuItemWrapper}>
                  <div className={styles.menuItemHeader}>
                    {icon}
                    {/* <img  className={styles.menuItemHeaderIcon}></img> */}
                    <span className={styles.menuItemHeaderName}>{name}</span>
                  </div>
                  <div>
                    {
                      showEdit ? (
                        <div >
                          <Checkbox.Group className={styles.menuCheckboxContent} onChange={handleCheckchange}>
                            {
                              !hideChildrenInMenu && children.length ? children.map((childItem) => {
                                const { path: childPath, name: childName, key, _target: childTarget } = childItem
                                return childName ? (
                                  <Checkbox key={key} value={childPath}>{childName}{childTarget ? <ShareAltOutlined /> : null}</Checkbox>
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
                          <div className={styles.menuItemContent}>
                            {
                              !hideChildrenInMenu && children.length ? children.map((childItem) => {
                                const { path: childPath, name: childName, key, _target: childTarget } = childItem
                                return childName ? (
                                  <span key={key} onClick={() => { itemClick(childPath, childItem) }}>{childName}{childTarget ? <ShareAltOutlined /> : null}</span>
                                ) : null
                              }) : (
                                  <span onClick={() => { itemClick(path, item) }}>{name}{_target ? <ShareAltOutlined /> : null}</span>
                                )
                            }
                          </div>
                        )
                    }
                  </div>
                </div>
              )
            }
            return null
          })
        }
      </div>
    </div>
  );

  return (
    <Popover content={menuConetent} placement="bottom" overlayClassName={styles.diableBox} >
      <Button type="link">{title}</Button>
    </Popover>
  )
}

export default HeaderMenu
