import React from 'react'
import styled from '@mui/material/styles/styled'

import Box from '../Box'
import Button, { ButtonProps } from '../Button'

// type SizeMap = 'small' | 'medium' | 'large'

export interface ConfirmFooterProps {
  /** 确定按钮 */
  onOk?: (props: ConfirmFooterProps) => void | Promise<void>;
  /** 确定按钮文案 */
  okText?: string;
  /** 确定按钮按钮ButtonProps  */
  okProps?: ButtonProps;
  /** 是否禁用确定按钮  */
  okDisabled?: boolean;
  /** 是否需要取消按钮 */
  isCloseButton?: boolean;
  /** 是否需要取消按钮 */
  onClose?: () => void | Promise<void>;
  /** 确定按钮文案 */
  closeText?: string;
  /** 取消按钮ButtonProps  */
  closeProps?: ButtonProps;
  /** 自定义Footer  */
  footer?: React.ReactNode
  className?: string;
}

const ConfirmFooterRoot = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '56px'
})

const ConfirmFooter: React.FC<ConfirmFooterProps> = React.forwardRef((props, ref) => {
  const {
    onOk,
    okText,
    okDisabled,
    okProps,
    isCloseButton,
    onClose,
    closeText,
    closeProps,
    footer,
    ...otherProps
  } = props

  if (footer === null) return null

  if (typeof footer === 'function') {
    return footer(props)
  }

  const [loading, setLoading] = React.useState(false)

  if (footer === null) return null;
  if (typeof footer === 'function') return footer(props)

  const handleClose = async (e) => {
    e?.stopPropagation()
    try {
      await onClose?.()
    } catch (error) {
      throw error
    }
  }

  const handleOk = async () => {
    if (onOk) {
      try {
        setLoading(true)
        await onOk(props)
        setLoading(false)
      } catch (error) {
        throw error
      }
    }
  }
  
  return (
    <ConfirmFooterRoot {...otherProps} ref={ref}>
      {
        isCloseButton && (
          <Button
            variant='text'
            onClick={handleClose}
            sx={{ mr: '8px' }}
            color='secondary'
            {...closeProps}
          >
            {closeText}
          </Button>
        )
      }
      <Button
        loading={loading}
        disabled={okDisabled}
        onClick={handleOk}
        {...okProps}
      >
        {okText}
      </Button>
    </ConfirmFooterRoot>
  )
})


ConfirmFooter.defaultProps = {
  okDisabled: false,
  okText: '确定',
  okProps: {},
  isCloseButton: true,
  closeProps: {},
  closeText: '取消'
}

export default ConfirmFooter