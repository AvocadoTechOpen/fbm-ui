import React from 'react'
import { Box, Stack } from '@mui/material'
import styled from '@mui/material/styles/styled'
import Typography from '../../Typography'

const DraggerBox = styled(Box)(({ width, height }: DraggerProps) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: width ?? 380,
  height: height ?? 146,
  backgroundColor: '#f5f5f5',
  border: '1px dashed rgba(0,0,0,0.08)',
  borderRadius: '4px',
  cursor: 'pointer',
}))

interface DraggerProps {
  status?: string
  width?: number
  height?: number
}

const Dragger: React.FC<DraggerProps> = (props) => {
  return (
    <DraggerBox {...props}>
      <Stack spacing={0.5}>
        <Typography fontWeight={500}>将文件拖到此处以上传</Typography>
        <Stack direction="row" spacing={0.5} justifyContent="center">
          <Typography variant="caption" color="secondary">
            或
          </Typography>
          <Typography variant="caption" color="#576B95">
            选取文件
          </Typography>
        </Stack>
      </Stack>
    </DraggerBox>
  )
}

export default Dragger
