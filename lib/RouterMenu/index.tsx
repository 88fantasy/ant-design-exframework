import React, { useState } from "react";
import styles from "./index.less";
import { Checkbox } from 'antd';
import * as _ from 'lodash';
import { RouterMenuPropsType, RouterMenuItem, } from './data.d';


const HeaderMenu: React.FC<RouterMenuPropsType> = (props) =>{
  const [showDetailPopup, setShowDetailPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [chooseNum, setChooseNum] = useState([])


  const { itemClick } = props;

  let totalNum = 0
  props.menuData.map(item => {
    const {name, children=[] } = item
    if(name){
      if(children.length){
        children.map(childItem => {
          const { name:childName } = childItem
          if(childName){
            totalNum += 1
          }
        })
      }else{
        totalNum += 1
      }
    }
  })

  const stopPropagtion = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  const handleAdd = (e) => {
    stopPropagtion(e)
    setShowDetailPopup(false)
    setShowEditPopup(!showEditPopup)
  }

  const handleShow = (e) => {
    stopPropagtion(e)
    setShowEditPopup(false)
    setChooseNum([])
    setShowDetailPopup(!showDetailPopup)
  }

  const handleItemClick = (path) => {
    setShowDetailPopup(false)
    itemClick(path, {})
  }

  const handleCheckchange = (value:[]) => {
    const res = _.union(chooseNum,value)
    setChooseNum(res)
  }

  const handleCancel = () => {
    setShowEditPopup(false)
    setChooseNum([])
  }

  const renderMenus = () => {
    return <span></span>
  }

  const renderShowPopup = (isShow, canEdit) => {
    return (
     <div>
        {
        isShow? (
          <div onClick={stopPropagtion} className={styles.menuPopup}>
            {
              canEdit? (
                <div className={styles.menuHeader}>
                  <div className={styles.count}>
                    固定至导航栏（{chooseNum.length}/{totalNum}）
                  </div>
                  <div className={styles.buttonWrapper}>
                    <span className={`${styles.save} ${styles.btn}`}>保存</span>
                    <span className={`${styles.cancel} ${styles.btn}`} onClick={handleCancel}>取消</span>
                  </div>
                </div>
              ): null
            }
            <div className={styles.menuWrapper}>
              {
                props.menuData.map((item,index) => {
                  const { name, path, icon, children=[] } = item;
                  if(name){
                    return (
                      <div key={index} className={styles.menuItemWrapper}>
                        <div className={styles.menuItemHeader}>
                          {icon}
                          {/* <img  className={styles.menuItemHeaderIcon}></img> */}
                          <span className={styles.menuItemHeaderName}>{name}</span>
                        </div>
                        <div>
                          {
                            canEdit? (
                              <div >
                                <Checkbox.Group className={styles.menuCheckboxContent} onChange={handleCheckchange}>
                                {
                                  children.length ? children.map((childItem,childIndex) => {
                                    const { path:childPath, name:childName } = childItem
                                    return childName? (
                                      <Checkbox key={childIndex} value={childPath}>{childName}</Checkbox>
                                      // <span key={childIndex} onClick={() => { handleCheck(childPath) }}>{childName}</span>
                                    ): null
                                  }): (
                                    // <span onClick={() => { handleCheck(path) }}>yes</span>
                                  <Checkbox value={path}>{name}</Checkbox>
                                  )
                                }
                                </Checkbox.Group>
                              </div>
                            ): (
                              <div className={styles.menuItemContent}>
                                {
                                  children.length ? children.map((childItem,childIndex) => {
                                    const { path:childPath, name:childName } = childItem
                                    return childName? (
                                      <span key={childIndex} onClick={() => { handleItemClick(childPath) }}>{childName}</span>
                                    ): null
                                  }): (
                                    <span onClick={() => { handleItemClick(path) }}>{name}</span>
                                  )
                                }
                              </div>
                            )
                          }
                        </div>
                      </div>
                    )
                  }else{
                    return null
                  }
                })
              }
            </div>
          </div>
        ): null
      }
     </div>
    )
  } 

  return (
    <div onClick={stopPropagtion} className={styles.headerMenuContainer}>
      <div className={styles.menuListWrapper}>
        <div className={` ${styles.menuIcon} ${showDetailPopup? styles.show: ''}`} onClick={(e) => {handleShow(e)}}>
          <div className={styles.iconDefault}/>
          菜单
          { renderShowPopup(showDetailPopup, false) }
        </div>
        <div className={styles.menuRenderWrapper}>
          {renderMenus()}
        </div>
        <div className={` ${styles.menuIcon} ${showEditPopup? styles.show: ''}`} onClick={(e) => {handleAdd(e)}}>
          <div className={styles.iconAdd}/>
          { renderShowPopup(showEditPopup, true) }
        </div>
      </div>
    </div>
  )
}

export default HeaderMenu
