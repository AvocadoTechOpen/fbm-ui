import React, { useCallback, useImperativeHandle } from 'react'
import { TreeView } from '@mui/lab'
import useTree from './useTree'
import { isArray, isEmpty } from '../../utils'
import { DataNode, TreeProps } from './interface'

import { styled } from '../styled'
import Box from '../Box'
import { ArrowDropDownIcon, ArrowDropRightIcon } from '../icons'
import TreeItem from './TreeItem'

// TODO
const Tree: React.FC<TreeProps> = React.forwardRef((props, ref) => {
  const {
    getNodeLabel,
    getNodeId,
    defaultCollapseIcon,
    defaultExpandIcon,
  } = props

  const {
    data
  } = useTree(props)

  const renderTreeItems = useCallback((data) => {
    if (isEmpty(data)) return null

    return data.map(nodeData => {
      const { children, label, id } = nodeData

      // 获取nodeLable 
      const _label = getNodeLabel?.(nodeData) || label;

      // 获取nodeId
      const _nodeId = getNodeId?.(nodeData) || id

      return (
        <TreeItem
          key={_nodeId}
          nodeId={_nodeId}
          label={_label}
        >
          {renderTreeItems(children)}
        </TreeItem>
      )
    })
  }, [data])


  useImperativeHandle(ref, () => {
    return {
      // 获取选中的节点数据
      getSelected: () => { }
    }
  })

  return (
    <TreeView
      multiSelect={true}
      defaultExpandIcon={defaultExpandIcon}
      defaultCollapseIcon={defaultCollapseIcon}
    >
      {renderTreeItems(data)}
    </TreeView>
  )
})


Tree.defaultProps = {
  defaultCollapseIcon: <ArrowDropDownIcon />,
  defaultExpandIcon: <ArrowDropRightIcon />
}
export default Tree;
