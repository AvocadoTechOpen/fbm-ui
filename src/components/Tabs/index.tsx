import * as React from 'react'
import { Tabs as MuiTabs, TabsProps as MiuTabsProps } from '@mui/material'

import Tab, { TabProps } from '../Tab'

export interface TabsProps extends MiuTabsProps {
  tabs?: TabProps[];
  TabProps: TabProps;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  children: childrenProp,
  TabProps,
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
    </MuiTabs>
  )
}

export default Tabs