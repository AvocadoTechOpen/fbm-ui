import React from 'react'
import { Box } from '@mui/material'
import styled from '@mui/material/styles/styled'
import { AddIcon } from '../../icons'

const Wrapper = styled(Box)(({ width, height }: IProps) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: width ?? 120,
  height: height ?? 120,
  backgroundColor: '#f5f5f5',
  border: '1px dashed rgba(0,0,0,0.08)',
  borderRadius: '4px',
  cursor: 'pointer',
}))

interface IProps {
  width?: number
  height?: number
}

const Cube: React.FC<IProps> = (props) => {
  return (
    <Wrapper {...props}>
      <AddIcon />
    </Wrapper>
  )
}

export default Cube
