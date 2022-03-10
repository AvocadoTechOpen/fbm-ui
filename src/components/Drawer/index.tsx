import React from 'react';

import DrawerRoot, { FbmDrawerRootProps } from './src/DrawerRoot'
import Header from './src/Header'
import Content from './src/Content'
import Footer from './src/Footer'
import { FbmConfirmFooterProps } from '../ConfirmFooter'

export interface FbmDrawerProps extends FbmConfirmFooterProps {
  open: boolean;
  footer?: React.ReactNode | null;
  anchor?: FbmDrawerRootProps['anchor'];
  title?: React.ReactNode;
  isShowClose: boolean;
}

const FbmDrawer: React.FC<FbmDrawerProps> = (props) => {
  const {
    open,
    title,
    anchor,
    children,
    onOk,
    onClose,
    okText,
    closeText,
    okProps,
    closeProps,
    footer,
    isShowClose,
  } = props

  return (
    <DrawerRoot
      open={open}
      anchor={anchor}
      onClose={onClose}
    >
      <Content>
        <Header
          title={title}
          isShowClose={isShowClose}
          onClose={onClose}
        />
        
        {children}
      </Content>
      <Footer
        footer={footer}
        onOk={onOk}
        onClose={onClose}
        okText={okText}
        closeText={closeText}
        okProps={okProps}
        closeProps={closeProps}
      />
    </DrawerRoot>
  )
}

FbmDrawer.defaultProps = {
  open: false,
  anchor: 'right',
  isShowClose: true,
}

export default FbmDrawer
