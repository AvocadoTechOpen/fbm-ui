import * as React from 'react';
import { List, ListProps, styled } from '@mui/material'

export interface MenuList extends ListProps {
}

const MenuListRoot:React.FC<ListProps> = styled(List)({
  paddingTop: 4,
  paddingBottom: 4,
  boxShadow: '0px 4px 8px rgba(0,0,0, 0.16)',
  background: '#fff'
})

const MenuList: React.FC<MenuList> = ({
  children,
  ...otherProps
}) => (
  <MenuListRoot {...otherProps}>
    {children}
  </MenuListRoot>
)

MenuList.defaultProps = {
}

export default MenuList
