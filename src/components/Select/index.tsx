
import React from 'react';
import { Select, SelectProps as MuiSelectProps, selectClasses, MenuItem, MenuItemProps } from '@mui/material'
import styled from '@mui/material/styles/styled'

import Input from '../Input'
import { ArrowDropDownIcon } from '../icons'

type OptionMap = {
  label: string;
  value: MenuItemProps['value'],
}

export interface SelectProps extends MuiSelectProps {
  name?: string;
  options?: OptionMap[];
}

const SelectRoot = styled(Select)({
  [`& .${selectClasses.icon}`]: {
    color: 'rgba(0, 0, 0, 0.56)'
  }
})

const FbmSelect: React.FC<SelectProps> = React.forwardRef((props, ref) => {
  const {
    options,
    children: childrenProp,
    ...SelectProps
  } = props

  let children = childrenProp
  if (children == null) {
    children = options.map(({ label, value }) => (
      <MenuItem key={label} value={value}>
        {label || value}
      </MenuItem>
    ))
  }

  return (
    <SelectRoot ref={ref} {...SelectProps}>
      {children}
    </SelectRoot>
  )
})

FbmSelect.defaultProps = {
  input: <Input />,
  IconComponent: ArrowDropDownIcon,
  options: [],
  fullWidth: true,
}

export default FbmSelect