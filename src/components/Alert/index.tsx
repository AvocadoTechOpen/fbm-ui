import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, styled, AlertColor, Theme } from '@mui/material'

import {
  CheckIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon
} from '../icons'

type AlertType = AlertColor

export interface AlertProps extends MuiAlertProps {
  /** Alert类型 可选 默认为info */
  type?: AlertType;
  /** Alert显示内容 */
  children?: React.ReactNode,
  /** 提示文案 */
  message?: React.ReactNode,
}

interface IconProps {
  icon: React.ReactNode;
  type: AlertType
}

interface AlertRootProps {
  type?: AlertType;
  theme: Theme
}

const AlertRoot:React.FC<AlertProps> = styled(MuiAlert)(({ theme, type }: AlertRootProps) => {
  return {
    color: theme.palette.text.secondary,
    padding: '4px 16px',
    border: '1px solid',
    borderColor: theme.palette[type].main,
    backgroundColor: theme?.custom?.bgColor[type],
  }
})

const Icon: React.FC<IconProps> = ({ icon, type }) => {
  if (icon === null) return null
  if (icon === undefined) {
    const typeIcons = {
      success: <CheckIcon />,
      error: <ErrorIcon />,
      warning: <WarningIcon />,
      info: <InfoIcon />,
    }
    if (typeIcons[type]) {
      return typeIcons[type]
    }
  }

  return <React.Fragment> {icon} </React.Fragment>
}

const Alert: React.FC<AlertProps> = ({
  type,
  children,
  message,
  icon,
  color: componentColor,
  ...otherProps
}) => (
  <AlertRoot
    type={type}
    color={componentColor || type}
    icon={<Icon icon={icon} type={type} />}
    {...otherProps}
  >
    {message || children}
  </AlertRoot>
)

Alert.defaultProps = {
  type: 'info',
}

export default Alert
