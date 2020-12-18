import {
  MenuDataItem, 
} from '@ant-design/pro-layout';

import {
  CheckboxValueType, 
} from 'antd/lib/checkbox/Group';



export interface RouterMenuItem extends MenuDataItem {
  /**
   * @_target 跳转地址
   */
 _target?: string;
 children?: RouterMenuItem[];
}

export interface RouterCheckboxValueType extends CheckboxValueType {

}

export interface RouterMenuPropsType{
  title?: string;
  menuData: RouterMenuItem[],
  showEdit?: boolean;
  itemClick: (path: string | undefined, item: RouterMenuItem) => void;
  onSave?: ( menus: RouterCheckboxValueType[] ) => void;
  onCancel?: () => void;
}

export interface RouterMenuStateType{
  
}
