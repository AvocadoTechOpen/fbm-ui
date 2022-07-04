
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

const SelectRoot = styled(Select)(({ size }: SelectProps) => {
  return {
    [`& .${selectClasses.icon}`]: {
      color: 'rgba(0, 0, 0, 0.56)'
    },

    [`& .${selectClasses.select}`]: {
      ...(size === 'small') && {
        padding: '7px 12px 6px 12px',
      }
    },
  }
})

const FbmSelect: React.FC<SelectProps> = React.forwardRef((props, ref) => {
  const {
    options,
    children: childrenProp,
    label,
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

  const input = <Input label={label} />

  return (
    <SelectRoot ref={ref} input={input} {...SelectProps}>
      {children}
    </SelectRoot>
  )
})

FbmSelect.defaultProps = {
  IconComponent: ArrowDropDownIcon,
  options: [],
  fullWidth: true,
}

export default FbmSelect