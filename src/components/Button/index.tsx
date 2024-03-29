import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, buttonClasses } from '@mui/material'
import styled from '@mui/material/styles/styled'
import { alpha } from '@mui/system';

import Loading from '../Loading'

export interface ButtonProps extends MuiButtonProps {
  /** 按钮loading */
  loading?: boolean;
  /** 按钮禁用 */
  disabled?: boolean;
  /** 按钮显示文字 */
  text?: string;
  /** 按钮icon */
  icon?: MuiButtonProps['startIcon']
}

const ButtonRoot = styled(MuiButton)(({ color, theme, variant, size }) => {
  return {
    minWidth: 'auto',
    '& .MuiButton-startIcon': {
      marginRight: '4px'
    },
    '&:hover': {
      boxShadow: 'none',
      ...(variant === 'text' &&
        color !== 'inherit' && {
        backgroundColor: alpha(
          theme.palette[color].main,
          theme.palette.action.hoverOpacity,
        ),
      }),
      ...(variant === 'contained' &&
        color !== 'inherit' && {
        backgroundColor: alpha(
          theme.palette[color].main,
          0.8
        ),
      }),
    },
    ...(size === 'small' && {
      padding: '1px 8px',
    }),
    ...(color === 'inherit' && {
      borderColor: 'rgba(0,0,0,.12)',
      color: theme.palette.text.primary,
      '&:hover': {
        background: theme.palette.action.hover,
        borderColor: 'rgba(0,0,0,.04)',
      },
    }),

    ...(variant === 'text' &&
      color !== 'inherit' && {
      color: theme.palette[color].main,
    }),
    ...(variant === 'outlined' && {
      backgroundColor: '#fff',
      ...(size === 'small' && {
        padding: '0px 8px',
      }),
      ...(size === 'medium' && {
        padding: '4px 16px',
      }),
      ...(size === 'large' && {
        padding: '8px 24px',
      }),
    }),
    [`&.${buttonClasses.disabled}`]: {
      border: '1px solid rgba(0,0,0,.04)'
    }
  }
})

const Button: React.FC<ButtonProps> = (props) => {
  const { loading, children, text, icon, ...buttonProps } = props
  if (loading) {
    buttonProps.disabled = true
  }
  buttonProps['startIcon'] = buttonProps.startIcon || icon

  const LoadingRender = () => loading ? <Loading  isMask={false} size={16} /> : null

  return (
    <ButtonRoot {...buttonProps}>
      {children || text}
      <LoadingRender />
    </ButtonRoot>
  )
}

Button.defaultProps = {
  variant: 'contained',
  loading: false,
  color: 'primary',
  size: 'medium',
}

export default Button