import React from 'react'

import {
  useControlled,
} from '@mui/material/utils';
import { UploadListProps } from '../types'
import ListItem from './ListItem'
import CubeItem from './CubeItem'
import clsx from 'clsx'

const UploadList: React.FC<UploadListProps> = ({
  items,
  type,
  iconType,
  onRemove,
  onRefresh,
  itemRender,
  classes,
  nameRender: nameRenderProp,
  onSelect,
  selected: selectedProp,
  ...restProps
}) => {
  if (!items || items?.length === 0) return null

  const [selected, setSelectedState] = useControlled({
    controlled: selectedProp,
    default: '',
    name: 'TreeView',
    state: 'selected',
  });

  // 取消上传
  const handleClose = (file) => onRemove(file);

  // 重新上传
  const handleRefresh = (file) => onRefresh(file);

  // handleSelection
  const handleSelect = (file, index, files) => {
    setSelectedState(file)
    onSelect?.(file, index, files)
  }

  // 修饰文件名称
  const nameRender = (file) => {
    if (nameRenderProp != null && typeof nameRenderProp === 'function') {
      return nameRenderProp(file)
    }
    return file.name
  }

  return <React.Fragment>
    {
      items.map((item, index, items) => {
        const itemProps = {
          className: clsx(classes.root, {
            [classes.selected]: typeof selected === 'object' ? selected.uid === item.uid : selected === item.uid,
          }),
          name: item.name,
          size: item.size,
          percent: item.percent,
          status: item.status,
          iconType: iconType,
          originFileObj: item.originFileObj,
          nameRender: () => nameRender(item),
          onClose: () => handleClose(item),
          onRefresh: () => handleRefresh(item),
          onClick: () => handleSelect?.(item, index, items)
        }

        let children = null
        if (itemRender && typeof itemRender === 'function') {
          children = <div key={item.uid}> {itemRender(itemProps)} </div>
        } else if (type === 'cube') {
          children = <CubeItem key={item.uid}  {...itemProps}  {...restProps} />
        } else {
          children = <ListItem key={item.uid} {...itemProps} {...restProps} />
        }
        return children
      })
    }
  </React.Fragment>
}

export default UploadList