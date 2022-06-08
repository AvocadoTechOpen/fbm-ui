import * as React from 'react';
import { CircularProgress, Theme } from '@mui/material'
import styled from '@mui/material/styles/styled'

import { FbmThemeOptions } from '../ThemeProvider'
import Mask from '../Mask'
import Typography from '../Typography'

type SizeType = 'small' | 'large'
type ColorType = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
export interface LoadingProps {
  /** 尺寸 */
  size?: SizeType | number
  /** 颜色 */
  color?: ColorType,
  /**  Loading提示文案 */
  desc?: React.ReactNode;
  /** 是否需要遮罩 */
  isMask?: boolean;
}

interface MaskRootProps {
  theme?: Theme;
  isMask?: boolean;
}

const MaskRoot: React.FC<MaskRootProps> = styled(Mask)(({ theme, isMask }: MaskRootProps) => {
  return {
    ...(isMask && {
      backgroundColor: (theme as FbmThemeOptions).custom?.mask.white,
    }),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
})

MaskRoot.defaultProps = {
  isMask: true,
}


const LoadingTextRender: React.FC<{desc?: React.ReactNode}> = ({ desc }) => {
  if (!desc) return null;
  if (typeof desc === 'string') {
    return (
      <Typography
        variant='overline'
        display='block'
        weight='regular'
      >
        {desc}
      </Typography>
    )
  }
  return <span>{desc}</span>
}

const FbmLoading: React.FC<LoadingProps> = (props) => {
  const { isMask, desc,  ...loadingProps } = props
  return (
    <MaskRoot isMask={isMask}>
      <CircularProgress {...loadingProps} />
      <LoadingTextRender desc={desc} />
    </MaskRoot>
  )
}

FbmLoading.defaultProps = {
  color: 'primary',
  size: 44,
}

export default FbmLoading
