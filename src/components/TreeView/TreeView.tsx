import * as React from 'react';
import clsx from 'clsx';
import { styled, useTheme, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import {
  useControlled,
  useForkRef,
  ownerDocument,
  unstable_useId as useId,
} from '@mui/material/utils';

import TreeViewContext from './TreeViewContext';
import { DescendantProvider } from './descendants';
import { getTreeViewUtilityClass } from './treeViewClasses';
import TreeItem from '../TreeItem'
import { TreeViewProps } from './interface'
import { isEmpty } from '../../utils';
import { ArrowDropDownIcon, ArrowDropRightIcon } from '../icons'

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTreeViewUtilityClass, classes);
};

const TreeViewRoot = styled('ul', {
  name: 'MuiTreeView',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  padding: 0,
  margin: 0,
  listStyle: 'none',
  outline: 0,
});

export const TreeViewnoOptions = styled('div', {
  name: 'MuiTreeView',
  slot: 'NoNodes',
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: '10px',
}));

function noopSelection() {
  return false;
}

const defaultDefaultExpanded = [];
const defaultDefaultSelected = [];

const TreeView: React.FC<TreeViewProps> = React.forwardRef((inProps, ref) => {
  const props = useThemeProps({ props: inProps, name: 'MuiTreeView' });

  const {
    data,
    searchLabel,
    noOptionsText = '暂无选项',
    children: childrenProp,
    disabled,
    className,
    defaultCollapseIcon,
    defaultEndIcon,
    defaultExpanded = defaultDefaultExpanded,
    defaultExpandIcon,
    defaultParentIcon,
    defaultSelected = defaultDefaultSelected,
    disabledItemsFocusable = false,
    disableSelection = false,
    expanded: expandedProp,
    id: idProp,
    multiSelect = false,
    onBlur,
    onFocus,
    onKeyDown,
    onNodeFocus,
    onNodeSelect,
    onNodeToggle,
    selected: selectedProp,
    getNodeLabel = (node) => node.label,
    getNodeId = (node) => node.id,
    getNodeChildren = (node) => node.children,
    renderTreeItemContent,
    renderExtra,
    ...other
  } = props;

  const ownerState = {
    ...props,
    defaultExpanded,
    defaultSelected,
    disabledItemsFocusable,
    disableSelection,
    multiSelect,
  };


  const classes = useUtilityClasses(ownerState);

  const treeId = useId(idProp);

  const treeRef = React.useRef(null);
  const handleRef = useForkRef(treeRef, ref);

  const [focusedNodeId, setFocusedNodeId] = React.useState(null);

  const nodeMap = React.useRef({});


  const firstCharMap = React.useRef({});

  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'TreeView',
    state: 'expanded',
  });

  const [selected, setSelectedState] = useControlled({
    controlled: selectedProp,
    default: defaultSelected,
    name: 'TreeView',
    state: 'selected',
  });

  /*
   * Status Helpers
   */
  const isExpanded = React.useCallback(
    (id) => {
      return !!searchLabel || (Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false)
    },
    [expanded, searchLabel],
  );

  const isExpandable = React.useCallback(
    (id) => nodeMap.current[id] && nodeMap.current[id].expandable,
    [],
  );

  const isSelected = React.useCallback(
    (id) => (Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id),
    [selected],
  );

  const isDisabled = React.useCallback((id) => {
    let node = nodeMap.current[id];
    // This can be called before the node has been added to the node map.
    if (!node) {
      return false;
    }

    if (disabled) {
      return true
    }

    if (disabled) {
      return true
    }

    if (node.disabled) {
      return true;
    }

    while (node.parentId != null) {
      node = nodeMap.current[node.parentId];
      if (node.disabled) {
        return true;
      }
    }

    return false;
  }, [disabled]);

  const isFocused = (id) => focusedNodeId === id;

  /*
   * Child Helpers
   */

  // Using Object.keys -> .map to mimic Object.values we should replace with Object.values() once we stop IE11 support.
  const getChildrenIds = (id) =>
    Object.keys(nodeMap.current)
      .map((key) => {
        return nodeMap.current[key];
      })
      .filter((node) => node.parentId === id)
      .sort((a, b) => a.index - b.index)
      .map((child) => child.id);

  const getNavigableChildrenIds = (id) => {
    let childrenIds = getChildrenIds(id);

    if (!disabledItemsFocusable) {
      childrenIds = childrenIds.filter((node) => !isDisabled(node));
    }
    return childrenIds;
  };

  /*
   * Node Helpers
   */
  const getNode = (id) => {
    return {
      ...nodeMap?.current?.[id],
    }
  }

  const getParent = (id) => {
    return nodeMap?.current?.[id]?.parentId
  }

  const getChildren = (id) =>
    Object.keys(nodeMap.current)
      .map((key) => {
        return nodeMap.current[key];
      })
      .filter((node) => node.parentId === id)

  /*
   * Focus Helpers
   */
  const focus = (event, id) => {
    if (id) {
      setFocusedNodeId(id);

      if (onNodeFocus) {
        onNodeFocus(event, id);
      }
    }
  };
  /*
   * Expansion Helpers
   */
  const toggleExpansion = (event, value = focusedNodeId) => {
    let newExpanded;

    if (expanded.indexOf(value) !== -1) {
      newExpanded = expanded.filter((id) => id !== value);
    } else {
      newExpanded = [value].concat(expanded);
    }

    if (onNodeToggle) {
      onNodeToggle(event, newExpanded);
    }

    setExpandedState(newExpanded);
  };

  /*
   * Selection Helpers
   */
  const lastSelectedNode = React.useRef(null);
  const lastSelectionWasRange = React.useRef(false);
  const currentRangeSelection = React.useRef([]);

  const handleMultipleSelect = (event, value) => {
    let newSelected;
    if (selected.indexOf(value) !== -1 && Array.isArray(selected)) {
      newSelected = selected.filter((id) => id !== value);
    } else {
      newSelected = Array.isArray(selected) ? selected.concat(value) : [value]
    }

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    setSelectedState(newSelected);
  };

  const handleSingleSelect = (event, value) => {
    const newSelected = multiSelect ? [value] : value;

    if (onNodeSelect) {
      onNodeSelect(event, newSelected);
    }

    setSelectedState(newSelected);
  };

  const selectNode = (event, id, multiple = false) => {
    if (id) {

      if (multiple) {
        handleMultipleSelect(event, id);
      } else {
        handleSingleSelect(event, id);
      }
      lastSelectedNode.current = id;
      lastSelectionWasRange.current = false;
      currentRangeSelection.current = [];

      return true;
    }
    return false;
  };

  /*
   * Mapping Helpers
   */
  const registerNode = React.useCallback((node) => {
    const { id, index, parentId, expandable, idAttribute, disabled, label } = node;

    nodeMap.current[id] = {
      id,
      index,
      parentId,
      expandable,
      idAttribute,
      disabled,
      label,
      children: getChildren(id)
    };
  }, []);

  const unregisterNode = React.useCallback((id) => {
    const newMap = { ...nodeMap.current };
    delete newMap[id];
    nodeMap.current = newMap;

    setFocusedNodeId((oldFocusedNodeId) => {
      if (
        oldFocusedNodeId === id &&
        treeRef.current === ownerDocument(treeRef.current).activeElement
      ) {
        return getChildrenIds(null)[0];
      }
      return oldFocusedNodeId;
    });
  }, []);

  const mapFirstChar = React.useCallback((id, firstChar) => {
    firstCharMap.current[id] = firstChar;
  }, []);

  const unMapFirstChar = React.useCallback((id) => {
    const newMap = { ...firstCharMap.current };
    delete newMap[id];
    firstCharMap.current = newMap;
  }, []);

  const handleFocus = (event) => {
    // if the event bubbled (which is React specific) we don't want to steal focus
    if (event.target === event.currentTarget) {
      const firstSelected = Array.isArray(selected) ? selected[0] : selected;
      focus(event, firstSelected || getNavigableChildrenIds(null)[0]);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setFocusedNodeId(null);

    if (onBlur) {
      onBlur(event);
    }
  };

  const activeDescendant = nodeMap.current[focusedNodeId]
    ? nodeMap.current[focusedNodeId].idAttribute
    : null;


  React.useImperativeHandle(ref, () => ({
    nodeMap: nodeMap?.current,
    getNode,
    getChildrenIds,
    getParent,
  }))


  const searchNodeLabel = (label, children = []) => {
    if (!searchLabel) return true
    
    let f = false
    if (label && typeof label === 'string') {
      f = label.toLowerCase().includes(searchLabel?.toLowerCase())
    }

    if (f) return true

    if (Array.isArray(children)) {
      children.forEach((node) => {
        const label = getNodeLabel?.(node);
        f = searchNodeLabel(label)
      })
    }

    return f
  }


  const renderTreeItems = React.useCallback((data) => {
    if (isEmpty(data)) return null

    return data.map(nodeData => {

      const label = getNodeLabel?.(nodeData);
      const nodeId = getNodeId?.(nodeData)
      const children = getNodeChildren?.(nodeData)

      if (!searchNodeLabel(label, children)) {
        return null
      }

      return (
        <TreeItem
          key={nodeId}
          nodeId={nodeId}
          label={label}
          renderExtra={renderExtra}
          renderTreeItemContent={renderTreeItemContent}
        >
          {renderTreeItems(children)}
        </TreeItem>
      )
    }).filter(node => node != null)
  }, [searchLabel, data, getNodeLabel, getNodeId])


  let children = childrenProp ?? renderTreeItems(data)
  if (children == null || (Array.isArray(children) && children.length === 0)) {
    children = (
      <TreeViewnoOptions> {noOptionsText} </TreeViewnoOptions>
    )
  }
  
  return (
    <TreeViewContext.Provider
      value={{
        icons: { defaultCollapseIcon, defaultExpandIcon, defaultParentIcon, defaultEndIcon },
        focus,
        toggleExpansion,
        isExpanded,
        isExpandable,
        isFocused,
        isSelected,
        isDisabled,
        selectNode: disableSelection ? noopSelection : selectNode,
        multiSelect,
        disabledItemsFocusable,
        mapFirstChar,
        unMapFirstChar,
        registerNode,
        unregisterNode,
        treeId,
      }}
    >
      <DescendantProvider>
        <TreeViewRoot
          role="tree"
          id={treeId}
          aria-activedescendant={activeDescendant}
          aria-multiselectable={multiSelect}
          className={clsx(classes.root, className)}
          ref={handleRef}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          // @ts-ignore
          ownerState={ownerState}
          {...other}
        >
          {children}
        </TreeViewRoot>
      </DescendantProvider>
    </TreeViewContext.Provider>
  );
});


TreeView.defaultProps = {
  defaultCollapseIcon: <ArrowDropDownIcon />,
  defaultExpandIcon: <ArrowDropRightIcon />
}
export default TreeView;
