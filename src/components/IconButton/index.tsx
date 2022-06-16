import React from 'react';
import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps, styled } from '@mui/material'

export interface IconButtonProps extends MuiIconButtonProps {}

const IconButtonRoot = styled(MuiIconButton)({
  boxShadow: 'none',
})

const IconButton: React.FC<IconButtonProps> = IconButtonRoot

export default IconButton