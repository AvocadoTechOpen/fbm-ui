import React, { useMemo } from 'react'
import {
  styled,
  LinearProgress,
  Box,
  LinearProgressProps,
} from '@mui/material'
import filesize from 'filesize'
import { CancelIcon } from '../../icons'
import { Message } from '../../'
import { UploadFile } from '../types'
import {
  RcFile as OriginFileObj,
} from 'rc-upload/lib/interface';

function formatInfo(size: number, percent: number) {
  return `${filesize(size * (percent / 100))} / ${filesize(size)}`
}

interface ListItemProps {
  iconType?: 'image'
  /** 源文件 */
  originFileObj: OriginFileObj;
  /** 文件名称 */
  name?: UploadFile['name']
  /** 文件大小 */
  size: UploadFile['size']
  /** 上传进度 */
  percent: UploadFile['percent']
  /** 文件上传状态 */
  status: UploadFile['status']
  /** 取消上传 */
  onClose: (file?: UploadFile) => void
  /** 重新上传 */
  onRefresh: (file?: UploadFile) => void
  nameRender: (file?: UploadFile) => React.ReactNode
}

const ImgWrapper = styled(Box)(({ width = 120, height = 120 }: { width?: string | number; height?: string | number }) => ({
  position: 'relative',
  width: width,
  height: height,
  border: '1px solid transparent',
  borderRadius: '4px',
  '&:hover .fbm-cube-hidden': {
    display: 'flex',
  },
  margin: '0 8px 8px 0',
}))

const DeleteBtn = styled(Box)(() => ({
  display: 'none',
  position: 'absolute',
  top: -10,
  right: -10,
  backgroundColor: 'white',
  borderRadius: '100%',
  cursor: 'pointer',
  zIndex: 2,
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

const UploadingRoot = styled(Box)({
  padding: '0 10px',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(0,0,0,0.56)',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Progress = styled(LinearProgress)({
  width: '100%',
  borderRadius: 4,
})

const progressColors = {
  uploading: 'primary',
  error: 'error',
  done: 'primary',
}


const ListItem: React.FC<ListItemProps> = ({
  // 文件名称
  name,
  originFileObj,
  size,
  // 上传进度
  percent: percentProp,
  // 上传状态
  status,
  iconType,
  onClose,
  onRefresh,
  nameRender,
  ...restProps
}) => {
  const blobSrc = useMemo(() => {
    // @ts-ignore
    if (originFileObj?.originFileObj) {
      // @ts-ignore
      return URL.createObjectURL(originFileObj.originFileObj)
    }
    return URL.createObjectURL(originFileObj)
  }, [])

  const progress = status === 'error' ? 100 : percentProp

  React.useEffect(() => {
    let time = null
    if (status === 'error') {
      Message.error('图片上传失败，请重试')
      time = setTimeout(() => {
        onClose?.()
      }, 700)
    }
    return () => {
      clearTimeout(time)
    }
  }, [status])

  return (
    <ImgWrapper {...restProps}>
      <img
        src={blobSrc}
        width="100%"
        height="100%"
        style={{ borderRadius: '4px', objectFit: 'cover' }}
      />
      <DeleteBtn className="fbm-cube-hidden" onClick={() => onClose()}>
        <CancelIcon sx={{ width: 20, height: 20 }} />
      </DeleteBtn>
      {(status === 'uploading' || status === 'error') && (
        <UploadingRoot>
          <Progress
            variant="determinate"
            value={progress}
            color={progressColors[status] as LinearProgressProps['color']}
          />
        </UploadingRoot>
      )}
    </ImgWrapper>
  )
}

export default ListItem
