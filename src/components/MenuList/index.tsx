import * as React from 'react';
import { List, ListProps, styled } from '@mui/material'

export interface MenuList extends ListProps {

}

const MenuListRoot:React.FC<ListProps> = styled(List)({
  paddingTop: 4,
  paddingBottom: 4,
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
