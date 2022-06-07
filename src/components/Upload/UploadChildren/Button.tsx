import React from 'react';
import Button, { ButtonProps } from '../../Button'
import { DocumentUploadIcon } from '../../icons'

const UploadButton: React.FC<ButtonProps> = ({
  children,
  ...restProps
}) => {
  return (
    <Button
      icon={<DocumentUploadIcon />}
      {...restProps}
    >
      {children}
    </Button>
  )
}

export default UploadButton