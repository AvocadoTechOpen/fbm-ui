import React from 'react';
import { styled } from '@mui/system';
import {
  Tooltip,
  TooltipProps,
  ClickAwayListener,
  tooltipClasses,
  ClickAwayListenerProps,
  Box,
  BoxProps,
} from '@mui/material'

import { isFunction } from '../../utils'

type TriggerMap = 'click' | 'hover' | 'focus'
export interface PopoverProps {
  /** 是否显示弹框 */
  open?: TooltipProps['open'];
  /** 是否禁用弹框 */
  disabled?: boolean;
  /** 弹框内容 */
  content?: TooltipProps['title'];
  /** 是否需要三角▶️ */
  arrow?: TooltipProps['arrow'];
  /** 触发行为 */
  trigger?: TriggerMap;
  /** 弹框位置 */
  placement?: TooltipProps['placement'];
  /** 弹框关闭回调 */
  onClose?: TooltipProps['onClose'];
  /** 弹框背景色 */
  bgColor?: string
  /** 点击除弹框外其他区域弹框消失 */
  isClickAway?: boolean;
  TriggerProps?: BoxProps;
  ClickAwayListenerProps?: ClickAwayListenerProps | BoxProps;
  onClickAway?: (event: MouseEvent | TouchEvent) => void | boolean;
  children: React.ReactNode;
}

interface ClickWrapProps extends ClickAwayListenerProps {
  trigger: PopoverProps['trigger'];
  isClickAway?: PopoverProps['isClickAway'];
}

interface UseOpen {
  ({
    open,
    trigger,
  }: {
    open: PopoverProps['open'];
    trigger: TriggerMap;
  }): [boolean, (open: boolean) => void]
};

const PopoverRoot: React.FC<TooltipProps> = styled((inProps) => {
  const { className, ...props } = (inProps as TooltipProps)
  return (
    <Tooltip
      {...props}
      classes={{ popper: className }}
    />
  )
})(({ theme, arrow }: any) => ({
  zIndex: 1300,
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette?.common?.white || '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0px 1px 10px 0px rgb(0 0 0 / 12%)',
    padding: 0,
    maxWidth: '100%',
    ...(arrow === false && {
      margin: '3px !important'
    })
  },
  [`& .${tooltipClasses.arrow}:before`]: {
    color: '#fff',
    boxShadow: '0px 0px 1px 0px rgb(0 0 0 / 12%)',
  },
}));

const ClickWrapRoot: React.FC<BoxProps> = styled(Box)({
  display: 'inline-block',
})

const TriggerRoot: React.FC<BoxProps> = styled(Box)({
  display: 'inline-block',
})

const ClickWrap: React.FC<ClickWrapProps> = ({
  trigger,
  children,
  isClickAway,
  disableReactTree,
  mouseEvent,
  onClickAway,
  touchEvent,
  ...props
}) => {
  if (trigger !== 'click' || isClickAway === false) return children
  return (
    <ClickAwayListener
      disableReactTree={disableReactTree}
      mouseEvent={mouseEvent}
      onClickAway={onClickAway}
      touchEvent={touchEvent}
    >
      <ClickWrapRoot
        {...props}
      >
        {children}
      </ClickWrapRoot>
    </ClickAwayListener>
  )
}

const useOpen: UseOpen = ({
  trigger,
  open: openProp,
}) => {
  // 如果open是undefined则交给mui Tooltip 处理
  const isAutomaticOpen = openProp === undefined
  if (!isAutomaticOpen || trigger === 'hover') {
    return [openProp, () => undefined]
  }

  const [open, setOpen] = React.useState(false)
  const handleSetOpen = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  return [open, handleSetOpen]
}

const Popover: React.FC<PopoverProps> = React.forwardRef((props, ref) => {
  const {
    open: openProp,
    disabled,
    content: contentProp,
    arrow,
    trigger,
    placement,
    children: childrenProp,
    onClose,
    isClickAway,
    TriggerProps,
    ClickAwayListenerProps,
    onClickAway,
    ...PopoverProps
  } = props

  const [open, setOpen] = useOpen({
    open: openProp,
    trigger,
  })

  const handleClose = (event: Event) => {
    setOpen(false)
    if (isFunction(onClose)) {
      onClose(event)
    }
  }

  const handleOpen = () => {
    if (disabled === false) {
      setOpen(true);
    }
  };

  const handleClickAway = (event) => {
    // bugfix: select在popover内打开自动关闭popover 
    if (event.composedPath().indexOf(document.body) === 0) {
      return
    }

    if (open === false) return
    const bool: boolean | void = onClickAway?.(event)
    if (bool === false) {
      return
    }
    handleClose(event)
  }

  const disableListeners = {
    disableFocusListener: disabled || trigger !== 'focus',
    disableHoverListener: disabled || trigger !== 'hover',
    disableTouchListener: true,
  }

  let content = null
  if (typeof contentProp === 'function') {
    content = contentProp({
      handleClose,
      handleOpen,
      open,
    })
  } else {
    content = contentProp
  }

  let children = null
  if (typeof childrenProp === 'function') {
    children = childrenProp({
      handleClose,
      handleOpen,
      open,
    })
  } else {
    children = childrenProp
  }

  return (
    <ClickWrap
      isClickAway={isClickAway}
      trigger={trigger}
      onClickAway={handleClickAway}
      {...ClickAwayListenerProps}
    >
      <PopoverRoot
        ref={ref}
        open={open}
        arrow={arrow}
        placement={placement}
        onClose={handleClose}
        title={content}
        onClick={handleOpen}
        {...disableListeners}
        {...PopoverProps}
      >
        <TriggerRoot
          {...TriggerProps}
        >
          {children}
        </TriggerRoot>
      </PopoverRoot>
    </ClickWrap>
  )
})

Popover.defaultProps = {
  placement: 'bottom',
  trigger: 'click',
  onClose: undefined,
  arrow: true,
  content: null,
  children: null,
  isClickAway: true,
  ClickAwayListenerProps: {},
  TriggerProps: {},
  disabled: false
}

export default Popover