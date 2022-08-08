import React from 'react';
import styled from '@mui/material/styles/styled'

import Popover, { PopoverProps } from '../Popover'
import Box from '../Box'
import Typography from '../Typography'
import ConfirmFooter, { ConfirmFooterProps } from '../ConfirmFooter'
import { isFunction } from '../../utils'

export interface PopconfirmProps extends ConfirmFooterProps {
  /** 弹框标题 */
  title?: React.ReactNode;
  /** 弹框内容 */
  content?: React.ReactNode;
  /** 弹框显示icon */
  icon?: React.ReactNode;
  /** 弹框target */
  children: PopoverProps['children'];
  /** 是否显示弹框 */
  open?: PopoverProps['open'];
  /** 是否禁用弹框 */
  disabled?: PopoverProps['disabled'];
  /** 是否需要三角▶️ */
  arrow?: PopoverProps['arrow'];
  /** 触发行为 */
  trigger?: PopoverProps['trigger'];
  /** 弹框位置 */
  placement?: PopoverProps['placement'];
}

interface PopTitleProps {
  children?: React.ReactNode;
}

const PopContent = styled(Box)({
  padding: '0 16px',
})

const PopTitle: React.FC<PopTitleProps> = styled((props) => {
  const { children } = (props as PopTitleProps)
  if (children) {
    return <Typography {...props} />
  }
  return null
})({
  fontSize: 16,
  color: '#000',
  fontWeight: 500,
  height: '56px',
  alignItems: 'center',
  display: 'flex',
}) as any

const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  content: contentProp,
  children,
  onOk,
  okText,
  okProps,
  onClose,
  closeText,
  closeProps,
  ...popoverProps
}) => {

  const contentRender = (popover) => {
    const handleClose = async () => {
      if (isFunction(popover?.handleClose)) {
        popover.handleClose()
      }
      onClose?.()
    }

    let content = contentProp;
    if (isFunction(contentProp)) {
      content = contentProp(popover)
    }

    return (
      <PopContent>
        <PopTitle>
          {title}
        </PopTitle >
        {content}
        <ConfirmFooter
          onOk={onOk}
          okText={okText}
          okProps={okProps}
          onClose={handleClose}
          closeText={closeText}
          closeProps={closeProps}
        />
      </PopContent>
    )
  }

  return (
    <Popover
      content={contentRender}
      onClose={onClose}
      {...popoverProps}
    >
      {children}
    </Popover>
  )
}


Popconfirm.defaultProps = {
  onOk: () => { }
}

export default Popconfirm