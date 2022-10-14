import React from 'react';
import {
  Dialog as MuiDialog,
  Fade,
  styled,
  IconButton,
  DialogProps as MuiDialogProps,
  dialogClasses as muiDialogClasses,
  BackdropProps,
} from '@mui/material'
import useThemeProps from '@mui/material/styles/useThemeProps'
import { unstable_composeClasses as composeClasses } from '@mui/base';
import clsx from 'clsx';

import { CloseIcon } from '../icons'
import Typography from '../Typography'
import Box from '../Box'
import ConfirmFooter, { ConfirmFooterProps } from '../ConfirmFooter'
import dialogClasses, { getDividerUtilityClass, DialogClassesKey } from './dialogClasses';

const useUtilityClasses = (ownerState) => {
  const { } = ownerState

  const slots = {
    root: ['root'],
    header: ['header'],
    content: ['content'],
    footer: ['footer'],
  };

  return composeClasses(slots, getDividerUtilityClass, {});
};

type SizeMap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface HeaderProps {
  /** 标题 */
  title?: string;
  /** 是否显示dialog又上角“x” */
  isShowClose?: boolean;
  /** 传null则不显示， 传vnode则自定义底部内容， 不传则展示默认footer */
  header?: React.ReactNode | null;
  /** 关闭弹框事件 */
  onClose?: ConfirmFooterProps['onClose'];
  className?: string;
}

export interface FooterProps extends ConfirmFooterProps {
  /** 传null则不显示， 传vnode则自定义底部内容， 不传则展示默认footer */
  footer?: React.ReactNode | null;
}

export interface DialogProps extends HeaderProps, FooterProps {
  /** 是否显示弹框 */
  open?: boolean;
  /** 弹框宽度 */
  width?: number;
  /** ref */
  ref?: React.Ref<HTMLDivElement>;
  /** 弹框尺寸 */
  size?: SizeMap;
  BackdropProps?: BackdropProps;
  /**
  * Override or extend the styles applied to the component.
  */
  classes?: Partial<DialogClassesKey>;
  /**
  * @ignore
  */
  className?: string;
}

export interface DialogContainerProps {
  /** 弹框宽度 */
  width?: number;
  /** 是否显示header */
  isNullHeader: boolean;
  /** 是否显示footer */
  isNullFooter: boolean;
  /** 弹框大小 */
  size?: SizeMap
}

const DialogRoot: React.FC<MuiDialogProps> = styled(MuiDialog)({
  [`& .${muiDialogClasses.paper}`]: {
    maxWidth: 'none',
  }
})

const DialogContent = styled(Box)({
  marginBottom: '16px',
  paddingLeft: '24px',
  paddingRight: '16px',
  flex: '1 1 auto',
  overflow: 'auto',
})

const DialogHeader = styled(Box)(({ title }) => ({
  paddingLeft: '24px',
  paddingRight: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(!title && {
    justifyContent: 'flex-end',
  }),
  height: '56px',
  flexShrink: 0,
}))

const DialogFooter = styled(Box)(({
  paddingLeft: '24px',
  paddingRight: '16px',
  height: '56px',
}))


const defaultSizes = {
  'xs': '360px',
  'sm': '588px',
  'md': '800px',
  'lg': '960px',
  'xl': '1280px'
}

const DialogContainer: React.FC<DialogContainerProps> = styled(Box)(({
  size,
  width,
  isNullHeader,
  isNullFooter,
}: DialogContainerProps) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    overflow: 'auto',
    width: width || defaultSizes[(size as string)],
    ...(isNullHeader && {
      paddingTop: '24px',
    }),
    ...(isNullFooter && {
      paddingBottom: '24px',
    }),
  }
})

const Header: React.FC<HeaderProps> = (props) => {
  const { title, isShowClose, header, onClose } = props

  if (header === null) return null

  if (typeof header === 'function') {
    return header(props)
  }

  if (!title && !isShowClose) return null

  const Title = () => {
    if (!title) return null
    return (
      <div style={{ flex: 1, padding: '8px 0' }}>
        <Typography color='black' weight='medium'>
          {title}
        </Typography>
      </div>
    )
  }

  const CloseBtn = () => {
    if (!isShowClose) return null
    return (
      <IconButton
        onClick={onClose}
        style={{ padding: 0 }}>
        <CloseIcon />
      </IconButton>
    )
  }

  return (
    <DialogHeader {...props}>
      <Title />
      <CloseBtn />
    </DialogHeader>
  )
}

const Footer: React.FC<FooterProps> = (props) => {
  const {
    footer,
    className,
    ...confirmFooterProps
  } = props

  if (footer === null) return null

  let children = null;
  if (footer && typeof footer === 'function') {
    children = (
      <React.Fragment>
        {footer(props)}
      </React.Fragment>
    )
  } else {
    children = <ConfirmFooter {...confirmFooterProps} />
  }

  return (
    <DialogFooter className={className} >
      {children}
    </DialogFooter>
  );
}

const Dialog: React.FC<DialogProps> = React.forwardRef((inProps, ref) => {
  const {
    open,
    size,
    width,
    title,
    header,
    isShowClose,
    className,
    classes: classesProp,
    children,
    footer,
    okText,
    closeText,
    isCloseButton,
    closeProps,
    okProps,
    onClose,
    onOk,
    ...otherProps
  } = useThemeProps({ props: inProps, name: 'FDialog' })

  const isNullHeader = header === null
  const isNullFooter = footer === null

  const classes = useUtilityClasses({
    classes: classesProp
  });

  return (
    // @ts-ignore
    <DialogRoot
      open={open}
      TransitionComponent={Fade}
      {...otherProps}
      onClose={onClose}
      ref={ref}
      className={clsx(classes.root, className)}
    >
      <DialogContainer
        width={width}
        size={size}
        isNullHeader={isNullHeader}
        isNullFooter={isNullFooter}
      >
        <Header
          title={title}
          header={header}
          isShowClose={isShowClose}
          onClose={onClose}
          className={classes.header}
        />
        <DialogContent className={classes.content}>
          {children}
        </DialogContent>
        <Footer
          footer={footer}
          okText={okText}
          closeText={closeText}
          isCloseButton={isCloseButton}
          closeProps={closeProps}
          okProps={okProps}
          onClose={onClose}
          onOk={onOk}
          className={classes.footer}
        />
      </DialogContainer>
    </DialogRoot>
  )
})

Dialog.defaultProps = {
  size: 'xs',
  isShowClose: false,
  isCloseButton: true,
  closeText: '取消',
  okText: '好的',
  closeProps: {
    variant: 'text',
    color: 'secondary',
  },
  okProps: {
    variant: 'contained',
  },
}
export default Dialog