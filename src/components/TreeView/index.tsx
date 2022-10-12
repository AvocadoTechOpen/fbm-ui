export { default } from './TreeView'

// import React, { useCallback, useImperativeHandle } from 'react'
// import { isArray, isEmpty } from '../../utils'
// import { ArrowDropDownIcon, ArrowDropRightIcon } from '../icons'

// import TreeView from './TreeView'
// import TreeItem from '../TreeItem'
// import { TreeViewProps } from './interface'

// // TODO
// const Tree: React.FC<TreeViewProps> = React.forwardRef((props, ref) => {
//   const {
//     data,
//     children: childrenProp,
//     getNodeLabel = (node) => node.label,
//     getNodeId = (node) => node.id,
//     ...TreeViewProps
//   } = props

//   const renderTreeItems = useCallback((data) => {
//     if (isEmpty(data)) return null

//     return data.map(nodeData => {
//       const { children, label, id } = nodeData

//       // 获取nodeLable 
//       const _label = getNodeLabel?.(nodeData);

//       // 获取nodeId
//       const _nodeId = getNodeId?.(nodeData)

//       return (
//         <TreeItem
//           key={_nodeId}
//           nodeId={_nodeId}
//           label={_label}
//         >
//           {renderTreeItems(children)}
//         </TreeItem>
//       )
//     })
//   }, [data, getNodeLabel, getNodeId])


//   useImperativeHandle(ref, () => {
//     return {
//       // 获取选中的节点数据
//       getSelected: () => { }
//     }
//   })

//   return (
//     <TreeView
//       {...TreeViewProps}
//     >
//       {childrenProp ?? renderTreeItems(data)}
//     </TreeView>
//   )
// })

// Tree.defaultProps = {
//   defaultCollapseIcon: <ArrowDropDownIcon />,
//   defaultExpandIcon: <ArrowDropRightIcon />
// }
// export default Tree;
