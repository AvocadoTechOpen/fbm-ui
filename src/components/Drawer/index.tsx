import React from 'react';

import DrawerRoot, { DrawerRootProps } from './src/DrawerRoot'
import Header, { HeaderProps } from './src/Header'
import Content from './src/Content'
import Footer from './src/Footer'
import { FbmConfirmFooterProps } from '../ConfirmFooter'

export interface DrawerProps extends FbmConfirmFooterProps {
  open: boolean;
  onBack?: HeaderProps['onBack'];
  footer?: React.ReactNode | null;
  header?: React.ReactNode | null;
  anchor?: DrawerRootProps['anchor'];
  title?: React.ReactNode;
  isShowClose?: boolean;
  BackdropProps?: DrawerRootProps['BackdropProps'];
  isBackdrop?: boolean;
}

const Drawer: React.FC<DrawerProps> = (props) => {
  const {
    open,
    title,
    anchor,
    children,
    onOk,
    onClose,
    onBack,
    okText,
    closeText,
    okProps,
    closeProps,
    footer,
    header,
    isShowClose,
    BackdropProps,
    isBackdrop,
  } = props

  return (
    <DrawerRoot
      open={open}
      anchor={anchor}
      onClose={onClose}
      BackdropProps={{
        open: isBackdrop === true,
        ...BackdropProps,
      }}
    >
      <Content>
        <Header
          header={header}
          title={title}
          isShowClose={isShowClose}
          onBack={onBack}
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

Drawer.defaultProps = {
  open: false,
  anchor: 'right',
  isShowClose: true,
  isBackdrop: true,
}

export default Drawer
