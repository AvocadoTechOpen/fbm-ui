import React from "react";
import { TreeView } from "@mui/lab";
import { Box, Checkbox } from "@mui/material";
import { cloneDeep } from "lodash";
import { ArrowDropDownIcon, ArrowDropRightIcon } from "../../icons/index";
import { Tree, FormChkeckBox } from "./FieldTree.style";

interface RenderTree {
  isSelected: boolean;
  token: string;
  canOrder: boolean;
  canRemoved: boolean;
  isGroup: boolean;
  fields: any[];
  name: string;
  canSelected: boolean;
  open: boolean;
  children: any[];
  label: string;
}
interface TreeViewContainerProps {
  data: RenderTree[];
  onChange: (_, data: any[]) => void;
  value: RenderTree[];
}
const TreeViewContainer: React.FC<TreeViewContainerProps> = (props) => {
  const { data, value, onChange } = props;

  const renderTree = (nodes: RenderTree) => (
    <Tree
      key={nodes.token}
      nodeId={nodes.token}
      label={
        <Box display="flex" alignItems="center">
          <FormChkeckBox
            onClick={(e) => e.stopPropagation()}
            control={
              <Checkbox
                checked={value.find((v) => v.token === nodes.token) ? true : false}
                onChange={(e) => {
                  const { checked } = e.target;
                  const list = cloneDeep(value);
                  if (checked) {
                    list.push(nodes);
                  } else {
                    const index = list.findIndex((j) => j.token === nodes.token);
                    list.splice(index, 1);
                  }
                  onChange(undefined, list);
                }}
              />
            }
            label={nodes.label}
          />
        </Box>
      }
    >
      {nodes.children?.map((node: RenderTree) => renderTree(node))}
    </Tree>
  );

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowDropRightIcon />}
    >
      {data.map((v: RenderTree) => {
        return renderTree(v);
      })}
    </TreeView>
  );
};
export default TreeViewContainer;
