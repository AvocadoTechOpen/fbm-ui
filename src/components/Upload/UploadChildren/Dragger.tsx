import React from 'react'
import { Box, Stack } from '@mui/material'
import styled from '@mui/material/styles/styled'
import Typography from '../../Typography'
import { UploadFile } from '../types'
import { DeleteIcon, EditIcon } from '../../icons'

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

const ImgWrapper = styled(Box)(({ width, height }: DraggerProps) => ({
  position: 'relative',
  width: width ?? 380,
  height: height ?? 146,
  borderRadius: '4px',
  overflow: 'hidden',
  '& .fbm-drop-mask': {
    backgroundColor: 'rgba(0,0,0,0.56)',
    position: 'absolute',
    inset: 0,
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '&:hover .fbm-drop-mask': {
    display: 'flex',
    cursor: 'pointer',
  },
  '& .upload-mask': {
    right: '50%',
  },
  '& .delete-mask': {
    left: '50%',
  },
  '& .line': {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1,
    height: '50%',
    backgroundColor: 'rgba(255,255,255,0.32)',
    zIndex: 1,
  },
}))

interface DraggerProps {
  status?: string
  file?: UploadFile
  onRemove?: (file: UploadFile) => void
  width?: number
  height?: number
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { status, file, onRemove, ...restProps } = props
  const imgUrl = file?.response?.url

  function handleRemove(e) {
    e.stopPropagation()
    onRemove?.(file!)
  }

  if (imgUrl) {
    return (
      <ImgWrapper {...restProps}>
        <img
          src={imgUrl}
          width="100%"
          height="100%"
          style={{ objectFit: 'cover' }}
        />
        <Box className="fbm-drop-mask upload-mask">
          <EditIcon htmlColor="white" />
        </Box>
        <Box className="fbm-drop-mask line" />
        <Box className="fbm-drop-mask delete-mask" onClick={handleRemove}>
          <DeleteIcon htmlColor="white" />
        </Box>
      </ImgWrapper>
    )
  }

  return (
    <DraggerBox {...restProps}>
      <Stack spacing={0.5} alignItems="center">
        <Typography variant="caption" color="secondary">
          TODO: cloud_upload icon
        </Typography>
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
