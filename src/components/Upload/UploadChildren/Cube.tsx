import React from 'react'
import { Box, BoxProps } from '@mui/material'
import styled from '@mui/material/styles/styled'
import { AddIcon } from '../../icons'
import { UploadFile } from '../types'

const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  border: '1px dashed rgba(0,0,0,0.08)',
  borderRadius: '4px',
  cursor: 'pointer',
  width: 120,
  height: 120,
  '&:hover': {
    backgroundColor: '#EAEAEA'
  }
})

interface IProps extends BoxProps {
  file?: UploadFile;
  onRemove?: (file: UploadFile) => void;
}

const Cube: React.FC<IProps> = (props) => {
  const { file, onRemove, ...restProps } = props

  return (
    <Wrapper {...restProps}>
      <AddIcon />
    </Wrapper>
  )
}

export default Cube
