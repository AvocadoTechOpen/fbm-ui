import React from 'react'
import styled from '@mui/material/styles/styled'

import Button, { ButtonProps } from '../Button'
import Box from '../Box'
import Popactions from '../Popactions'

export interface ActionProps extends ButtonProps {
  /** 按钮展示文字 */
  text?: string,
  /** 下拉展示更多按钮 */
  actions?: ActionProps[]
  /** 按钮间距 */
  spacing?: number | string;
  /** click Params */
  data?: any
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
    const { text, actions: subActons, onClick, ...buttonProps } = actionsItems

    const handleClick = () => {
      if (onClick && typeof onClick === 'function') {
        onClick(data)
      }
    }

    if (subActons && subActons.length > 0) {
      return (
        <Popactions key={text} actions={subActons}>
          <Button
            onClick={handleClick}
            {...buttonProps}
          >
            {text}
          </Button>
        </Popactions>
      )
    }
    return (
      <Button
        key={text}
        onClick={handleClick}
        {...buttonProps}
      >
        {text}
      </Button>
    )
  })

  return (
    <ActionsRoot spacing={spacing}>
      {actionBtns}
    </ActionsRoot>
  )
}

Action.defaultProps = {
  actions: [],
  spacing: '7px'
}


export default Action