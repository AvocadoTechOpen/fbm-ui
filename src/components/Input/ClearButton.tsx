import React from 'react';
import { IconButton, styled, IconButtonProps } from '@mui/material'
import { CloseIcon } from '../icons'

const ClearButtonRoot: React.FC<IconButtonProps> = styled(IconButton)({
  padding: 3,
  '& svg': {
    fontSize: '16px !important'
  }
})

export interface ClearButtonProps extends IconButtonProps {
  ref?:  React.Ref<any>;
}

const ClearButton: React.FC<ClearButtonProps> = React.forwardRef((props, ref) => {
  return (
    <ClearButtonRoot size='small' ref={ref} {...props}>
      <CloseIcon />
    </ClearButtonRoot>
  )
})

export default ClearButton