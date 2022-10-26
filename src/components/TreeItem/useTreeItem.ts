import * as React from 'react';
import TreeViewContext from '../TreeView/TreeViewContext';

export default function useTreeItem(nodeId) {
  const {
    focus,
    isExpanded,
    isExpandable,
    isFocused,
    isDisabled,
    isSelected,
    selectNode,
    toggleExpansion,
    multiSelect,
    disableSelection,
  } = React.useContext(TreeViewContext);

  const expandable = isExpandable ? isExpandable(nodeId) : false;
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;

  const handleExpansion = (event) => {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }

      const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

      // If already expanded and trying to toggle selection don't close
      if (expandable && !(multiple && isExpanded(nodeId))) {
        toggleExpansion(event, nodeId);
      }
    }
  };

  const handleSelection = (event) => {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }
      if (multiSelect) {
        selectNode(event, nodeId, true);
      } else {
        selectNode(event, nodeId);
      }
    }
  };

  const preventSelection = (event) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
      // Prevent text selection
      event.preventDefault();
    }
  };

  return {
    disabled,
    expanded,
    disableSelection,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  };
}
