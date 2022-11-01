import * as React from 'react';
import {
  styled,
  ListItem,
  ListItemProps,
  ListItemButton,
  listItemButtonClasses,
  ListItemButtonProps,
  ListItemText,
  ListItemTextProps,
  listItemTextClasses,
  ListItemIcon,
  ListItemIconProps,
  Popper,
  PopperProps,
  Box,
  checkboxClasses,
  formControlLabelClasses,
} from '@mui/material'

import { cloneElement, isValidElement } from '../../utils/reactNode'
import { ArrowDropRightIcon, DoneIcon } from '../icons'
import MenuListContext from '../MenuList/MenuListContext'
import Checkbox from '../Checkbox'

export interface MenuItemProps {
  ListItemProps?: ListItemProps,
  disablePadding?: boolean;
  disabled?: boolean;
  /** 主文本 */
  text?: React.ReactNode;
  /** 辅助文本 */
  secondaryText?: React.ReactNode;
  /**  */
  startIcon?: React.ReactNode;
  StartListItemIconProps?: ListItemIconProps;
  subMenuList?: React.ReactNode;
  PopperProps?: PopperProps;
  checkbox?: React.ReactNode;
  value?: any;
  onMouseMove?: ListItemProps['onMouseMove'];
  onMouseLeave?: ListItemProps['onMouseLeave'];
  onClick?: ListItemProps['onClick'];
  selected?: boolean;
  /** 是否可多选 */
  multiple?: boolean;
}

type OwnerState = {
  subMenuList?: MenuItemProps['subMenuList'];
  checkbox?: MenuItemProps['checkbox'];
}

type MenuItemButtonProps = ListItemButtonProps & { ownerState: OwnerState };

const MenuItemButton: React.FC<MenuItemButtonProps> = styled(ListItemButton)(({ ownerState }: MenuItemButtonProps) => ({
  paddingTop: 0,
  paddingBottom: 0,
  ...(ownerState.subMenuList && {
    paddingRight: 0,
  }),

  [`&.${listItemButtonClasses.selected}`]: {
    backgroundColor: 'transparent',
  },
}))

export const MenuItemText: React.FC<ListItemTextProps> = styled(ListItemText)(({ secondary }) => ({
  marginTop: 7,
  marginBottom: 7,
  [`& .${listItemTextClasses.primary}`]: {
    fontSize: '14px',
    lineHeight: '22px',
  },
  [`& .${listItemTextClasses.secondary}`]: {
    fontSize: '12px',
    lineHeight: '18px',
  },
  ...(secondary && ({
    marginTop: 4,
    marginBottom: 4,
  }))
}))


type MenuItemStartIconProps = ListItemIconProps & { ownerState?: OwnerState };

const MenuItemStartIcon: React.FC<MenuItemStartIconProps> = styled(ListItemIcon)(({ ownerState }: MenuItemStartIconProps) => {
  return {
    minWidth: 40,
    ...(ownerState?.checkbox && {
      minWidth: 'auto',
      [`& .${checkboxClasses.root}`]: {
        '&:hover': {
          background: 'none',
        },
      },
      [`& .${formControlLabelClasses.root}`]: {
        marginRight: 0,
      },
    })
  }
})

const MenuItem: React.FC<MenuItemProps> = React.forwardRef((props, ref) => {
  const {
    disablePadding,
    disabled,
    text,
    secondaryText,
    startIcon,
    subMenuList,
    ListItemProps,
    PopperProps,
    onMouseMove,
    onMouseLeave,
    onClick,
    children: childrenProp,
    checkbox: checkboxProp,
    selected: selectedProp,
    multiple: multipleProp,
    value,
    ...moreProps
  } = props


  const menuListContext = React.useContext(MenuListContext) || {};

  const multiple = React.useMemo(() => {
    if (multipleProp !== undefined) return !!multipleProp

    return !!menuListContext.multiple

  }, [multipleProp, menuListContext.multiple])

  const selected = React.useMemo(() => {
    if (selectedProp !== undefined) return selectedProp

    const cValue = menuListContext?.value
    if (cValue !== undefined && value !== undefined) {
      if (multiple) {
        return cValue?.includes(value)
      }
      return cValue === value
    }

    return false
  }, [selectedProp, value, menuListContext?.value])

  let checkbox = childrenProp
  if (multiple && checkbox === undefined) {
    checkbox = <Checkbox />
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleMouseEnter = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
    onMouseMove?.(e)
  }

  const handleMouseLeave = (e) => {
    setOpen(false)
    onMouseLeave?.(e)
  }

  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e)
    menuListContext?.onChange?.(value)
  }

  const ownerState = {
    subMenuList,
    checkbox,
  };

  let children = childrenProp
  if (children == null) {
    children = (
      <MenuItemText
        primary={text}
        secondary={secondaryText}
      />
    )
  }


  return (
    <ListItem
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disablePadding={disablePadding}
      {...ListItemProps}
    >
      <MenuItemButton
        disabled={disabled}
        dense={false}
        ownerState={ownerState}
        selected={selected}
        {...moreProps}
        onClick={handleClick}
      >
        {startIcon && (
          <MenuItemStartIcon>
            {startIcon}
          </MenuItemStartIcon>
        )}
        {isValidElement(checkbox) && (
          <MenuItemStartIcon ownerState={ownerState}>
            {cloneElement(checkbox, {
              disabled,
              value,
              checked: selected,
            })}
          </MenuItemStartIcon>
        )}
        {children}
        {subMenuList != null && (
          <ArrowDropRightIcon />
        )}
        {(multiple === false && selected === true) &&
          <DoneIcon color="primary" />
        }
      </MenuItemButton>
      {subMenuList && (
        <Popper open={open} anchorEl={anchorEl} placement='right-start' {...PopperProps}>
          <Box sx={{ marginLeft: '2px' }}>
            {subMenuList}
          </Box>
        </Popper>
      )}
    </ListItem >
  )
})

MenuItem.defaultProps = {
  disablePadding: true
}

export default MenuItem
