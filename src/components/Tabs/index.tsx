import * as React from 'react'
import { Tabs as MuiTabs, TabsProps as MiuTabsProps, styled } from '@mui/material'

import Tab, { TabProps } from '../Tab'
import Divider, { DividerProps } from '../Divider'

export interface TabsProps extends MiuTabsProps {
  tabs?: TabProps[];
  TabProps?: TabProps;
  borderBottom?: string;
}


const BorderBottom = styled(Divider)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
})

const Tabs: React.FC<TabsProps> = ({
  tabs,
  children: childrenProp,
  TabProps,
  borderBottom,
  ...TabsProps
}) => {
  let children = childrenProp
  if (children == null) {
    children = tabs?.map((tabProps) => {
      return <Tab {...tabProps} {...TabProps} />
    })
  }
  return (
    <MuiTabs {...TabsProps}>
      {children}
      {borderBottom !== 'none' &&  <BorderBottom />}
    </MuiTabs>
  )
}

export default Tabs