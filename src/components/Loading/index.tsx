import * as React from 'react';
import { CircularProgress, Theme, Box, styled} from '@mui/material'

import Mask, { MaskProps } from '../Mask'
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
  MaskProps?: MaskProps
}

interface MaskRootProps {
  theme?: Theme;
  isMask?: boolean;
}

const MaskRoot: React.FC<MaskRootProps> = styled(Mask)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

const LoadingTextRender: React.FC<{ desc?: React.ReactNode }> = ({ desc }) => {
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

const Loading: React.FC<LoadingProps> = (props) => {
  const { isMask, desc, MaskProps, ...loadingProps} = props

  return (
    <MaskRoot color={!isMask && 'none' }  {...MaskProps}>
      <CircularProgress {...loadingProps} />
      <LoadingTextRender desc={desc} />
    </MaskRoot>
  )
}

Loading.defaultProps = {
  color: 'primary',
  size: 44,
  isMask: true,
}

export default Loading
