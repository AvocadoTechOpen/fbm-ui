import React from 'react';
import { Box, styled, IconButton } from '@mui/material'
import { CloseIcon, KeyboardArrowLeftIcon } from '../../icons'
import { ConfirmFooterProps } from '../../ConfirmFooter'

export interface HeaderProps {
  title?: React.ReactNode;
  isShowClose?: boolean;
  header?: React.ReactNode | ((props: HeaderProps) => React.ReactDOM) | null;
  onClose?: ConfirmFooterProps['onClose']
  onBack?: () => void;
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
  display: 'flex',
  alignItems: 'center',
})

const Header: React.FC<HeaderProps> = props => {
  const {
    title,
    isShowClose,
    header,
    onClose,
    onBack,
  } = props

  // checkout null
  if (header === null || (!title && !isShowClose)) {
    return null
  }

  if (header) {
    if (typeof header === 'function') {
      return header(props)
    }
    return header
  }

  let closeButton = null
  if (isShowClose) {
    closeButton = (
      <IconButton
        onClick={onClose}>
        <CloseIcon />
      </IconButton>
    )
  }

  let backButton = null
  if (onBack && typeof onBack === 'function') {
    backButton = (
      <IconButton
        onClick={onBack}>
        <KeyboardArrowLeftIcon />
      </IconButton>
    )
  }

  return (
    <HeaderBox>
      <Title>
        {backButton}
        {title}
      </Title>
      {closeButton}
    </HeaderBox>
  )
}

export default Header