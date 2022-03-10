import React from 'react';
import { Box, styled, IconButton } from '@mui/material'
import { CloseIcon } from '../../icons'
import { FbmConfirmFooterProps } from '../../ConfirmFooter'

interface HeaderProps {
  title?: React.ReactNode;
  isShowClose?: boolean;
  onClose: FbmConfirmFooterProps['onClose']
  header?:  React.ReactNode | null;
}

const HeaderBox = styled(Box)({
  padding: '16px 0',
  display: 'flex',
  alignItems: 'center',
})

const Title = styled('div')({
  fontSize: 16,
  fontWeight: 500,
  color: 'rgba(0, 0, 0, 0.86)',
  flex: 1,
})

const Header: React.FC<HeaderProps> = ({
  title,
  isShowClose,
  onClose,
  header,
}) => {
  // checkout null
  if (header === null || (!title && !isShowClose)) {
    return null
  }

  let closeBtn = null
  if (isShowClose) {
    closeBtn = (
      <IconButton
        onClick={onClose}
        style={{ padding: 0 }}>
        <CloseIcon />
      </IconButton>
    )
  }

  return (
    <HeaderBox>
      <Title>
        {title}
      </Title>
      {closeBtn}
    </HeaderBox>
  )
}

export default Header