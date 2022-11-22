import React, { useCallback, useMemo } from 'react'
import {
  styled,
  LinearProgress,
  Box,
  Tooltip,
  LinearProgressProps,
} from '@mui/material'
import filesize from 'filesize'
import { RefreshIcon, DeleteIcon, CloseIcon } from '../../icons'
import Typography from '../../Typography'
import { FileIcons, getFileFormat } from '../utils'
import { UploadFile } from '../types'
import {
  RcFile as OriginFileObj,
} from 'rc-upload/lib/interface';
import IconButton from '../../IconButton'

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

const FlexCenterBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
})

const ListItemRoot = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px',
  minHeight: 56,
  padding: '0 16px',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
})

const FlexFill = styled(Box)({
  flex: 1,
  minWidth: 0,
})

const ActionIconBox = styled('span')({
  cursor: 'pointer',
  position: 'relative',
  marginLeft: 8,
})

const FileName = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.86)',
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: '22px',
  minWidth: 0,
})

const Progress = styled(LinearProgress)({
  width: '100%',
  mr: '25px',
  borderRadius: 4,
})

const IconImage = styled(Box)(({ src }: { src: string }) => ({
  backgroundImage: `url(${src})`,
  borderRadius: 4,
  height: 56,
  width: 56,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '16px 8px 16px 0'
}))

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
    if (originFileObj) {
      return  URL.createObjectURL(originFileObj)
    }
    return null;
  }, [])

  const fileIcon = useMemo(() => {
    if (iconType === 'image' && blobSrc) {
      return <IconImage src={blobSrc} />
    }
    const fileFormat: string = getFileFormat(name)
    const FileIcon = FileIcons[fileFormat] || FileIcons['undefined']
    return <FileIcon sx={{ mr: 1 }} />
  }, [name, iconType, blobSrc])

  const progress = status === 'error' ? 100 : percentProp

  const StatusIcons = {
    uploading: (
      <Tooltip title={'取消上传'} placement="top">
        <IconButton >
          <CloseIcon onClick={() => onClose()} />
        </IconButton>
      </Tooltip>
    ),

    error: (
      <Tooltip title={'重新上传'} placement="top">
        <IconButton >
          <RefreshIcon onClick={() => onRefresh()} />
        </IconButton>
      </Tooltip>
    ),
    done: (
      <Tooltip title={'删除文件'} placement="top">
        <IconButton>
          <DeleteIcon onClick={() => onClose()} />
        </IconButton>
      </Tooltip>
    ),
  }

  const handleViweFile = useCallback(() => {
    window.open(URL.createObjectURL(originFileObj))
  }, [])

  return (
    <ListItemRoot>
      <FlexCenterBox onClick={handleViweFile} sx={{ flex: 1, cursor: 'pointer' }}>
        {fileIcon}
        <FlexFill>
          <FileName>{nameRender()}</FileName>
          {status === 'uploading' && (
            <FlexCenterBox sx={{ flex: 1, position: 'relative' }}>
              <Progress
                variant="determinate"
                value={progress}
                color={progressColors[status] as LinearProgressProps['color']}
              />
            </FlexCenterBox>
          )}
          {status === 'error' ? (
            <Typography variant="caption" color="error">
              上传失败
            </Typography>
          ) : (
            <Typography variant="caption" color="secondary">
              {formatInfo(size, percentProp)}
            </Typography>
          )}
        </FlexFill>
      </FlexCenterBox>
      <ActionIconBox>{StatusIcons[status] || null}</ActionIconBox>
    </ListItemRoot>
  )
}

export default ListItem
