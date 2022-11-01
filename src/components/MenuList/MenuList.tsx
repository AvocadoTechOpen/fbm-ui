import * as React from 'react';
import { List, ListProps, styled, useControlled } from '@mui/material'
import MenuListContext from './MenuListContext'


export interface MenuList extends ListProps {
  /** 是否可多选 */
  multiple?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

const MenuListRoot: React.FC<ListProps> = styled(List)({
  paddingTop: 4,
  paddingBottom: 4,
  boxShadow: '0px 4px 8px rgba(0,0,0, 0.16)',
  background: '#fff'
})

const MenuList: React.FC<MenuList> = (props) => {
  const {
    children,
    multiple,
    value: valueProp,
    defaultValue = multiple ? [] : undefined,
    onChange,
    ...otherProps
  } = props

  const [value, seValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'MenuList',
    state: 'value',
  });

  const handleChange = (selectedValue) => {
    let newSelected;

    if (multiple) {
      if (value.indexOf(selectedValue) !== -1) {
        newSelected = value.filter((id) => id !== selectedValue);
      } else {
        newSelected = value.concat(selectedValue);
      }
    } else {
      newSelected = selectedValue
    }
    onChange?.(newSelected)
    seValue(newSelected)
  }


  const contextValue = {
    multiple,
    value,
    onChange: handleChange,
  }

  return (
    <MenuListContext.Provider value={contextValue}>
      <MenuListRoot {...otherProps}>
        {children}
      </MenuListRoot>
    </MenuListContext.Provider>
  )
}

MenuList.defaultProps = {
}

export default MenuList
