import * as React from 'react';
import { Box as MuiBox, BoxProps as MuiBoxProps } from '@mui/material'
import styled from '@mui/material/styles/styled'

import Loading from '../Loading'
import Mask, { MaskProps } from '../Mask'

interface LoadingProps {
  /** 遮罩loading */
  loading?: boolean;
  /** Loding尺寸 */
  size?: 'large' | 'small' | number;
  /** Loading提示文案 */
  desc?: React.ReactNode;
  /** 是否需要遮罩 */
  isMask?: boolean;
 
}

export interface BoxProps extends MuiBoxProps {
  /** loading */
  loading?: boolean | LoadingProps;
  /** 是否禁用 */
  disabled?: boolean;
   /** 遮罩组件proos */
  MaskProps?: MaskProps
}

const BoxRoot: React.FC = styled(MuiBox)({
  position: 'relative',
  boxSizing: 'border-box',
})

const DisabledMaskRender = ({
  disabled,
}) => disabled ? <Mask /> : null

const LoadingRender: React.FC<LoadingProps> = ({
  loading,
  size,
  desc,
}) => {
  if (!loading) return null
  return (
    <Loading desc={desc} size={size} />
  )
}

const Box: React.FC<BoxProps> = React.forwardRef((props, ref) => {
  const  {
    loading,
    disabled,
    children,
    MaskProps,
    ...otherProps
  } = props

  const loadingProps = {
    ...(
      (typeof (loading) === 'boolean')
        ? { loading }
        : loading
    ),
  }

  return (
    <BoxRoot ref={ref} {...otherProps}>
      <LoadingRender {...loadingProps} />
      <DisabledMaskRender
        disabled={disabled}
        {...MaskProps}
      />
      {children}
    </BoxRoot>
  )
})

Box.defaultProps = {
  loading: false,
  disabled: false,
}

export default Box
