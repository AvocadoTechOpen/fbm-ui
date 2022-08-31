import * as React from 'react';
import {
  styled,
  ListItem,
  ListItemProps,
  ListItemButton,
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
  listItemButtonClasses
} from '@mui/material'

import { cloneElement, isValidElement } from '../../utils/reactNode'
import { ArrowDropRightIcon } from '../icons'

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
  value: any;
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
    children: childrenProp,
    checkbox,
    ...moreProps
  } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleMouseEnter = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
    onMouseMove?.(e)
  }

  const handeMouseLeave = (e) => {
    setOpen(false)
    onMouseLeave?.(e)
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
      onMouseLeave={handeMouseLeave}
      disablePadding={disablePadding}
      {...ListItemProps}
    >
      <MenuItemButton
        disabled={disabled}
        dense={false}
        ownerState={ownerState}
        {...moreProps}
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
            })}
          </MenuItemStartIcon>
        )}
        {children}
        {subMenuList != null && (
          <ArrowDropRightIcon />
        )}
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
