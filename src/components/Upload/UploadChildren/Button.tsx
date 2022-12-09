import React from 'react';
import Button, { ButtonProps } from '../../Button'
import { DocumentUploadIcon } from '../../icons'

const UploadButton: React.FC<ButtonProps> = ({
  children,
  icon,
  ...restProps
}) => {
  return (
    <Button
      icon={icon || <DocumentUploadIcon />}
      {...restProps}
    >
      {children}
    </Button>
  )
}

export default UploadButton