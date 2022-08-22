import * as React from 'react';
import { Link as MuiLink, LinkProps as MuiLinkProps, styled, Theme } from '@mui/material'

export interface LinkProps extends MuiLinkProps {
  /** 触发验证的时机 */
  text?: React.ReactNode;
  /** 禁止点击 */
  disabled?: boolean;
}

const LinkRoot: React.FC<LinkProps> = styled(MuiLink)(({ disabled, theme }: { theme: Theme } & LinkProps) => ({
  ...(disabled && {
    color: theme.palette.text.disabled,
  })
}))

const Link: React.FC<LinkProps> = React.forwardRef(({
  text,
  disabled,
  href: hrefProp,
  children: childrenProp,
  ...LinkProps
}, ref) => {
  
  const [href, setHref] = React.useState('')

  React.useEffect(() => {
    setHref(disabled ? undefined : hrefProp);
  }, [hrefProp, disabled])

  let children = childrenProp
  if (children == null) {
    children = text
  }

  return (
    <LinkRoot
      ref={ref}
      href={href}
      disabled={disabled}
      {...LinkProps}
    >
      {children}
    </LinkRoot>
  )
})

Link.defaultProps = {
  color: 'text.link',
  fontSize: 14,
  underline: 'none'
}
export default Link