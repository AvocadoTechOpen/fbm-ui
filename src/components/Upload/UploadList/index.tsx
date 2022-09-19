import React from 'react'
import { Box, styled, Theme } from '@mui/material';

import { UploadListProps, UploadListPlace } from '../types'
import ListItem from './ListItem'


interface IRootProps {
  place?: UploadListPlace;
  theme?: Theme;
}

const UploadListRoot: React.FC<IRootProps> = styled(Box)(({ place }: IRootProps) => ({
  ...(place === 'top' && {
    marginBottom: 10,
  }),
  ...(place === 'bottom' && {
    marginTop: 10,
  })
}))

const FbmUploadList: React.FC<UploadListProps> = props => {
  const {
    items,
    onRemove,
    onRefresh,
    itemRender,
    uploadListPlace,
    nameRender: nameRenderProp,
    ...restProps
  } = props


  if (!items || items?.length === 0) return null

  const handleClose = (file) => onRemove(file)
  const handleRefresh = (file) => onRefresh(file)
  const nameRender = (file) => {
    if (nameRenderProp != null && typeof nameRenderProp === 'function') {
      return nameRenderProp(file)
    }
    return file.name
  }

  return (
    <UploadListRoot
      place={uploadListPlace}
      {...restProps}
    >
      {(items || []).map((item) => {
        const itemProps = {
          name: item.name,
          size: item.size,
          percent: item.percent,
          status: item.status,
          nameRender: () => nameRender(item),
          onClose: () => handleClose(item),
          onRefresh: () => handleRefresh(item)
        }

        let children = null
        if (itemRender && typeof itemRender === 'function') {
          children = <div key={item.uid}> {itemRender(itemProps)} </div>
        } else {
          children = <ListItem key={item.uid} {...itemProps} />
        }

        return (
          <span key={item.uid}>
            {children}
          </span>
        )
      })}
    </UploadListRoot>
  )
}

export default FbmUploadList