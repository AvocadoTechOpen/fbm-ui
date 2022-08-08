import { TreeViewProps as MuiTreeViewProps, TreeItemProps as MuiTreeItemProps } from '@mui/lab'

export interface DataNode {

}

export interface TreeItemProps {
  label?: React.ReactNode;
  nodeId: string;
}

export interface TreeProps {
  data?: DataNode[]
  value?: DataNode[]
  TreeViewProps: MuiTreeViewProps;
  TreeItemProps?: MuiTreeItemProps;
  getNodeLabel?: (data: DataNode) => React.ReactNode;
  getNodeId?: (data: DataNode) => string;
  defaultCollapseIcon?: React.ReactNode;
  defaultExpandIcon?: React.ReactNode;
}

