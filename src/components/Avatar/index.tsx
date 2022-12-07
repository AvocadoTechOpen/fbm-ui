import * as React from 'react';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, svgIconClasses } from '@mui/material'
import styled from '@mui/material/styles/styled'

import Box from '../Box'
import { MaleIcon, FemaleIIcon } from '../icons'

/** 尺寸 */
type SizeType = 'small' | 'middle' | 'large';

/** 性别 */
type Sex = number | string

export interface AvatarProps extends MuiAvatarProps {
  /** 尺寸 */
  size?: SizeType | string | number;
  /** 是否为禁用状态 */
  disabled?: boolean;
  /** 性别 */
  sex?: Sex;
  /** 是否是新添加的 */
  showNewTip?: boolean;
  newTipColor?: string
}

const defaultSizes = {
  small: 24,
  middle: 36,
  large: 48
}

const SexIcons = {
  // 男 icon
  1: MaleIcon,
  // 女 icon
  2: FemaleIIcon
}

export const RANDOM_COLOR = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#1E88E5',
  '#0288D1',
  '#0097A7',
  '#009688',
  '#43A047',
  '#E65100',
  '#795548',
  '#757575',
];

const BoxRoot = styled(Box)({
  display: 'inline-block',
  borderRadius: '50%',
  position: 'relative',
})

interface INewTipRootProps {
  color?: string
}
const NewTipRoot = styled(Box)(({ color }: INewTipRootProps) => ({
  position: 'absolute',
  left: '-4px',
  width: '6px',
  height: '6px',
  display: 'inline-block',
  backgroundColor: color || '#4CAF50',
  borderRadius: '6px',
}))


interface ISexProps {
  sex: Sex
}

const SexRoot = styled(Box)(({ sex }: ISexProps) => {
  const bgColor = {
    1: 'rgb(75, 132, 255)',
    2: 'rgb(255, 79, 123)'
  }
  return {
    position: 'absolute',
    width: 12,
    height: 12,
    right: '-2px',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    border: '1px solid #fff',
    background: bgColor[sex],
    [`.${svgIconClasses.root}`]: {
      color: '#fff',
      fontSize: 12,
      width: 'auto',
      height: 'auto',
    }
  }
})

const AvatarRoot: React.FC<AvatarProps> = styled(MuiAvatar)(({ size, children }: AvatarProps) => {
  return {
    width: defaultSizes[size] || size,
    height: defaultSizes[size] || size,
    ...(children ? {
      // @ts-ignore
      backgroundColor: RANDOM_COLOR[(children?.charCodeAt(0) || 0) % RANDOM_COLOR?.length],
      color: '#ffffff',
    } : {}),
  }
})

const Avatar: React.FC<AvatarProps> = ({
  size,
  disabled,
  sex,
  showNewTip,
  newTipColor,
  ...otherProps
}) => {
  const SexIcon = SexIcons[sex]

  return (
    <BoxRoot
      disabled={disabled}
      MaskProps={{
        sx: {
          borderRadius: '50%'
        }
      }}
    >
      {showNewTip && <NewTipRoot color={newTipColor} />}
      <AvatarRoot
        size={size}
        {...otherProps}
      />
      {
        SexIcon ? (
          <SexRoot sex={sex}>
            <SexIcon />
          </SexRoot>
        ) : null
      }
    </BoxRoot>
  )
}

Avatar.defaultProps = {
  size: 'middle',
  disabled: false,
}

export default Avatar
