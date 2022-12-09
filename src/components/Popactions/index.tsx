import React from 'react';
import styled from '@mui/material/styles/styled'
import { MenuItem, Box, ListItemIcon, ListSubheader } from '@mui/material'

import Popover, { PopoverProps } from '../Popover'
import { ButtonProps } from '../Button'
import { ActionsProps } from '../Actions'

export interface PopactionsProps extends PopoverProps {
  actions?: ActionsProps[]
}

interface ActionMenusTitle {
  title?: string
}
interface ActionMenuItemProps extends ButtonProps {
  text?: string;
  icon?: ButtonProps['startIcon'];
  title?: ActionMenusTitle['title'];
  actions?: ActionMenuItemProps[];
  onClick: any
}

interface ActionsMenu {
  actions: ActionMenuItemProps[];
  onClose: () => void;
}

const MenuItemRoot = styled(MenuItem)({
  fontSize: 14,
  padding: '7px 16px'
})

const ActionMenuItem: React.FC<ActionMenuItemProps> = ({
  children,
  icon,
  onClick,
  disabled = false,
}) => {
  return (
    <MenuItemRoot onClick={onClick} disabled={disabled}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      {children}
    </MenuItemRoot>
  )
}

const ActionMenu: React.FC<ActionsMenu> = (props) => {
  const { actions, ...popupProps } = props;

  const getMenuItems = (actions) => actions.map(actionsItem => {
    const { text, icon, onClick, actions, disabled } = actionsItem
    if (actions && actions.length) {
      return [
        <ListSubheader key={text}>
          {text}
        </ListSubheader>,
        ...getMenuItems(actions)
      ]
    }

    const handleMenuItemClick = (event) => {
      event.stopPropagation()
      if (onClick && typeof onClick === 'function') {
        onClick(popupProps)
      }
    }

    return (
      <ActionMenuItem key={text} icon={icon} onClick={handleMenuItemClick} disabled={disabled}>
        {text}
      </ActionMenuItem>
    )
  })

  return (
    <Box sx={{ minWidth: 40, py: 0.5 }}>
      {getMenuItems(actions)}
    </Box>
  )
}

const Popactions: React.FC<PopactionsProps> = (props) => {
  const { children, actions, ...popoverProps } = props
  const content = (popupProps) => <ActionMenu {...popupProps} actions={actions} />
  return (
    <Popover
      content={content}
      {...popoverProps}
    >
      {children}
    </Popover>
  )
}

Popactions.defaultProps = {
  trigger: 'hover',
  actions: [],
  arrow: false,
}

export default Popactions