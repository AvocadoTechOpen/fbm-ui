import React from 'react'
import { styled, LinearProgress, Box, Tooltip, Theme } from '@mui/material'

import { RefreshIcon, CancelIcon, DeleteIcon } from '../../icons'
import Typography from '../../Typography'
import { FileIcons, getFileFormat } from '../utils'
import {
  UploadFile,
} from '../types';

interface ListItemProps {
  /** 文件名称 */
  name?: UploadFile['name'];
  /** 上传进度 */
  percent: UploadFile['percent'];
  /** 文件上传状态 */
  status: UploadFile['status'];
  /** 取消上传 */
  onClose: (file?: UploadFile) => void;
  /** 重新上传 */
  onRefresh: (file?: UploadFile) => void;
  nameRender: (file?: UploadFile) => React.ReactNode;
}

const FlexCenterBox = styled(Box)({
  display: 'flex',
  alignItems: 'center'
})

const FlexFill = styled(Box)({
  flex: 1,
})

const ActionIconBox = styled('span')({
  cursor: 'pointer',
  position: 'relative',
  top: 5,
  marginLeft: 8,
})

const FileName = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.87)',
  fontSize: '0.875rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: '22px',
})

const Progress = styled(LinearProgress)({
  width: '100%',
  mr: '25px',
  borderRadius: 4,
})

interface ActionIconSpanProps {
  status?: ListItemProps['status'];
  theme?: Theme;

}
const ActionIconSpan: React.FC<ActionIconSpanProps> = styled('span')(({ theme, status }: ActionIconSpanProps) => ({
  color: theme.palette.secondary.main
}))

const HelperText = styled(Typography)({
  fontSize: '0.75rem',
  lineHeight: '22px',
})

const progressColors = {
  uploading: 'primary',
  error: 'error',
  done: 'primary'
}

const ListItem: React.FC<ListItemProps> = ({
  // 文件名称
  name,
  // 上传进度
  percent: percentProp,
  // 上传状态
  status,
  onClose,
  onRefresh,
  nameRender,
}) => {

  const fileFormat: string = getFileFormat(name)
  const FileIcon: React.FC<any> = FileIcons[fileFormat] || FileIcons['undefined']

  const progress = status === 'error' ? 100 : percentProp

  const StatusIcons = {
    uploading: (
      <Tooltip title={'取消上传'} placement="top">
        <ActionIconSpan status={status}>
          <CancelIcon onClick={() => onClose()} />
        </ActionIconSpan>
      </Tooltip>
    ),

    error: (
      <Tooltip title={'重新上传'} placement="top">
        <ActionIconSpan status={status}>
          <RefreshIcon onClick={() => onRefresh()} />
        </ActionIconSpan>
      </Tooltip>
    ),

    done: (
      <Tooltip title={'删除文件'} placement="top">
        <ActionIconSpan status={status}>
          <DeleteIcon onClick={() => onClose()} />
        </ActionIconSpan>
      </Tooltip>
    )
  }

  return (
    <FlexCenterBox sx={{ mt: '5px' }}>
      <FileIcon sx={{
        mr: 1,
        position: 'relative',
        top: '3px',
      }} />
      <FlexFill>
        <FileName>{nameRender()}</FileName>
        <FlexCenterBox sx={{ flex: 1, position: 'relative' }}>
          <Progress
            variant='determinate'
            value={progress}
            color={progressColors[status]}
          />
        </FlexCenterBox>
      </FlexFill>
      <ActionIconBox>
        {StatusIcons[status] || null}
      </ActionIconBox>
    </FlexCenterBox>
  )
}

export default ListItem