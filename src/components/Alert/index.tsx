import * as React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, styled, AlertColor, Theme, alpha, alertClasses } from '@mui/material'

import IconButton, { IconButtonProps } from '../IconButton';

import {
  CheckIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon
} from '../icons'

type AlertType = AlertColor

export interface AlertProps extends MuiAlertProps {
  show?: boolean;
  /** Alert类型 可选 默认为info */
  type?: AlertType;
  /** Alert显示内容 */
  children?: React.ReactNode,
  /** 提示文案 */
  message?: React.ReactNode,
  CloseButtonProps?: IconButtonProps;
}

interface IconProps {
  icon: React.ReactNode;
  type: AlertType
}

interface AlertRootProps {
  type?: AlertType;
  theme: Theme
}

const AlertRoot: React.FC<AlertProps> = styled(MuiAlert)(({ theme, type, show }: AlertRootProps) => {
  return {
    color: theme.palette.text.secondary,
    padding: '4px 16px',
    border: '1px solid',
    borderColor: theme.palette[type].main,
    backgroundColor: alpha(theme.palette[type].main, 0.25),
    [`& .${alertClasses.action}`]: {
      padding: 0,
    },
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
  onClose,
  color: colorProp,
  ...otherProps
}) => {
  const [show, setShow] = React.useState<boolean>(true)
  const handleClose = (e) => {
    onClose?.(e)
    setShow(false)
  }

  if (show === false) return null;

  return (
    <AlertRoot
      type={type}
      show={show}
      color={colorProp || type}
      icon={<Icon icon={icon} type={type} />}
      action={
        onClose && (
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )
      }
      {...otherProps}
    >
      {message || children}
    </AlertRoot>
  )
}

Alert.defaultProps = {
  type: 'info',
}

export default Alert
