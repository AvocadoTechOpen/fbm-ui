import React from 'react';
import styled from '@mui/material/styles/styled'
import { ChipProps } from '@mui/material'

import Avatar from '../Avatar'
import Box from '../Box'
import Typography from '../Typography'
import Chip from '../Chip'
import { EduExperience, WorkExperience } from './Experience'
import { textAlign } from '@mui/lab/node_modules/@mui/system';

type AgeMap = 1 | 2
type ChipsProps = {
  chips?: ChipProps[]
}

export type ExperienceDate = {
  start: Date | string | number;
  end: Date | string | number;
}

export type EduExperience = {
  school?: string;
  major?: string;
  eduBackground?: string;
  eduDate?: ExperienceDate
}

export type WorkExperience = {
  companyName?: string;
  positionName?: string;
  workDate?: ExperienceDate;
}

export interface FbmUserInfoProps {
  /** 性别 1:男 2:女 */
  sex?: AgeMap;
  /** 头像 */
  avatar?: string;
  /** 名称 */
  name?: string;
  /** 年龄 */
  age?: string | number;
  /** 参与职位数 */
  positionCount?: number | string;
  /** 其他信息 */
  otherInfo?: React.ReactNode;
  /** 个人信息 */
  desc?: string;
  /** 标签 */
  chips?: ChipsProps['chips'];
  /** 教育经历 */
  eduExperience?: EduExperience;
  /** 工作经历 */
  workExperience: WorkExperience;
}

const FbmUserInfoRoot = styled(Box)({
  display: 'flex',
})

const InfoRoot = styled(Box)({
  marginLeft: 5,
  position: 'relative',
  top: '-5px',
})

const NameRoot = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: '4px',
})

const PositionCountContainer = styled(Box)({
  width: '20px',
  height: '18px',
  background: '#E3F2FD',
  borderRadius: '4px',
  fontSize: 12,
  color: '#03A9F4',
  textAlign: 'center',
  lineHeight: '18px',
})

const NameText = styled(Typography)({
  height: 22,
})

export const DescTetx = styled(Typography)({
  height: 22,
  fontSize: 14,
  color: 'rgba(0, 0, 0, 0.56)',
})

const Chips: React.FC<ChipsProps> = ({
  chips
}) => {
  if (!chips || (chips && chips.length === 0)) return null

  const Items = chips.map((chip, index) => (
    <Chip
      key={index}
      color='primary'
      sx={{ mr: '8px' }}
      {...chip}
    />
  ))

  return (
    <Box sx={{ mt: '8px' }}>
      {Items}
    </Box>
  )
}

const FbmUserInfo: React.FC<FbmUserInfoProps> = ({
  avatar,
  sex,
  name,
  desc,
  chips,
  age,
  positionCount,
  otherInfo,
  eduExperience,
  workExperience,
}) => {

  const avatarProps = {
    avatar,
    sex,
  }

  return (
    <FbmUserInfoRoot>
      <Box>
        <Avatar
          {...avatarProps}
        />
      </Box>
      <InfoRoot>
        <NameRoot>
          { name && <NameText mr={2}>{name}</NameText> }
          { age && <DescTetx mr={2}>{age}岁</DescTetx>}
          { positionCount &&  <PositionCountContainer>{positionCount}</PositionCountContainer> }
          { otherInfo }
        </NameRoot>
        <DescTetx>{desc}</DescTetx>
        <Chips chips={chips} />
        <EduExperience data={eduExperience} />
        <WorkExperience data={workExperience} />
      </InfoRoot>
    </FbmUserInfoRoot>
  )
}

FbmUserInfo.defaultProps = {
  name: '',
  chips: []
}


export default React.memo(FbmUserInfo)