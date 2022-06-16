import React from 'react'
import styled from '@mui/material/styles/styled'

import Button, { ButtonProps } from '../Button'
import IconButton from '../IconButton'
import Box from '../Box'
import Popactions from '../Popactions'

const buttonComponents = {
  'IconButton': IconButton,
  'Button': Button,
};

type ButtonType = 'IconButton' | 'Button';

export interface ActionProps extends ButtonProps {
  buttonType?: ButtonType;
  /** 按钮展示文字 */
  text?: string,
  /** 下拉展示更多按钮 */
  actions?: ActionProps[]
  /** 按钮间距 */
  spacing?: number | string;
  /** click Params */
  data?: any;

}

const ActionsRoot = styled(Box)(({ spacing }: ActionProps) => ({
  display: 'flex',
  alignItems: 'center',
  '&>button': {
    marginLeft: spacing
  },
  '&>div': {
    marginLeft: spacing
  }
}
))

const Action: React.FC<ActionProps> = ({
  spacing,
  actions,
  data,
}) => {
  const actionBtns = actions.map(actionsItems => {
    const { text, actions: subActons, buttonType = 'Button', onClick, ...buttonProps } = actionsItems

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event?.stopPropagation?.()
      onClick?.(data)
    }
    const ButtonComponent = buttonComponents[buttonType]

    const children = (
      <ButtonComponent onClick={handleClick} {...buttonProps}>
        {buttonType === 'Button' ? text : buttonProps?.icon}
      </ButtonComponent>
    )

    if (subActons && subActons.length > 0) {
      return (
        <Popactions key={text} actions={subActons}>
          {children}
        </Popactions>
      )
    }
    return children
  })

  return (
    <ActionsRoot spacing={spacing}>
      {actionBtns}
    </ActionsRoot>
  )
}

Action.defaultProps = {
  actions: [],
  spacing: '7px',
  buttonType: 'Button',
}


export default Action