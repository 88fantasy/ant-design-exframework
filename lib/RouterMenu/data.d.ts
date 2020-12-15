
export interface RouterMenuItem {
  name: string;
  path: string;
  icon: string;
  children?: [];
}


export interface RouterMenuPropsType{
  menuData: RouterMenuItem[],
  itemClick: (path: string, item: any) => void;
}

export interface RouterMenuStateType{
  
}
