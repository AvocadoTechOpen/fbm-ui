import * as React from 'react';
import { List, ListProps, styled } from '@mui/material'
import MenuListContext from './MenuListContext' 

export interface MenuList extends ListProps {
  /** 是否可多选 */
  multiple?: boolean;
}

const MenuListRoot: React.FC<ListProps> = styled(List)({
  paddingTop: 4,
  paddingBottom: 4,
  boxShadow: '0px 4px 8px rgba(0,0,0, 0.16)',
  background: '#fff'
})

const MenuList: React.FC<MenuList> = ({
  children,
  multiple,
  ...otherProps
}) => {
  const context = React.useMemo(() => ({ multiple }), [multiple]);
  return  (
    <MenuListContext.Provider value={context}>
      <MenuListRoot {...otherProps}>
        {children}
      </MenuListRoot>
    </MenuListContext.Provider>
  )
}

MenuList.defaultProps = {
}

export default MenuList
