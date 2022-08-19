import * as React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

const Link: React.FC<MuiLinkProps> = React.forwardRef((props, ref) => {
  return <MuiLink ref={ref} {...props} />
})

export default Link