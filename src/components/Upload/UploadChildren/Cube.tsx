import React from 'react'
import { Box } from '@mui/material'
import styled from '@mui/material/styles/styled'
import { AddIcon, CancelIcon } from '../../icons'
import { UploadFile } from '../types'

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

const ImgWrapper = styled(Box)(({ width, height }: IProps) => ({
  position: 'relative',
  width: width ?? 120,
  height: height ?? 120,
  borderRadius: '4px',
  '&:hover .fbm-cube-hidden': {
    display: 'flex',
  },
}))

const DeleteBtn = styled(Box)(() => ({
  display: 'none',
  position: 'absolute',
  top: -10,
  right: -10,
  backgroundColor: 'white',
  borderRadius: '100%',
  cursor: 'pointer',
}))

const EditBtn = styled(Box)(() => ({
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 32,
  fontSize: '14px',
  color: 'white',
  backgroundColor: 'rgba(0,0,0,0.56)',
  borderEndStartRadius: '4px',
  borderEndEndRadius: '4px',
  cursor: 'pointer',
}))

interface IProps {
  file?: UploadFile
  onRemove?: (file: UploadFile) => void
  width?: number
  height?: number
}

const Cube: React.FC<IProps> = (props) => {
  const { file, onRemove, ...restProps } = props
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
          style={{ borderRadius: '4px', objectFit: 'cover' }}
        />
        <DeleteBtn className="fbm-cube-hidden" onClick={handleRemove}>
          <CancelIcon sx={{ width: 20, height: 20 }} />
        </DeleteBtn>
        <EditBtn className="fbm-cube-hidden">更换图片</EditBtn>
      </ImgWrapper>
    )
  }

  return (
    <Wrapper {...restProps}>
      <AddIcon />
    </Wrapper>
  )
}

export default Cube
