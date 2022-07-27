import React, { useCallback, useImperativeHandle } from 'react'
import { TreeView, TreeItem } from '@mui/lab'
import useTree from './useTree'
import { isArray, isEmpty } from '../../utils'
import { DataNode, TreeProps } from './interface'

// TODO
const Tree: React.FC<TreeProps> = React.forwardRef((props, ref) => {
  const {
    getNodeLabel,
    getNodeId
  } = props

  const {
    data
  } = useTree(props)

  const renderTree = useCallback((data) => {
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
          {renderTree(children)}
        </TreeItem>
      )
    })
  }, [data])
  

  useImperativeHandle(ref, () => {
    return {
      // 获取选中的节点数据
      getSelected: () => {}
    }
  })
  
  return (
    <TreeView>
      {renderTree(data)}
    </TreeView>
  )
})

export default Tree;
