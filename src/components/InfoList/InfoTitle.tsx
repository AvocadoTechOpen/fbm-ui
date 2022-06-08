import React, { ReactNode, FC } from 'react';
import { styled, Theme } from '@mui/material'

import Box from '../Box';
import Typography from '../Typography';

export interface InfoTitleProps {
  title: ReactNode;
  beforeIcon?: boolean;
}

interface TitleRootProps {
  beforeIcon: boolean;
  theme?: Theme;
};

const InfoTitleRoot: FC<TitleRootProps> = styled(Box)(({ theme, beforeIcon }: TitleRootProps) =>( {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: 60,
  paddingLeft: theme.spacing(4.5),
  '&::before': {
    ...(beforeIcon && {
      content: '""',
      display: 'inline-block',
      marginRight: 6,
      width: 2,
      height: 14,
      background: 'linear-gradient(360deg, #4bb051 0%, #5fc766 100%)'
    })
  }
}));

const InfoTitle: FC<InfoTitleProps> = ({ title, beforeIcon }) => {
  
  return (
    <InfoTitleRoot beforeIcon={beforeIcon}>
      <Typography variant="h6" fontSize={16} weight="medium">{title}</Typography>
    </InfoTitleRoot>
  )
}

export default InfoTitle;
