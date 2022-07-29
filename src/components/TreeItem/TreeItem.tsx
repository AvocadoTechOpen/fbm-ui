import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { elementTypeAcceptingRef } from '@mui/utils';
import Collapse from '@mui/material/Collapse';
import { alpha, styled, useThemeProps } from '@mui/material/styles';
import { ownerDocument, useForkRef, unsupportedProp } from '@mui/material/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import TreeViewContext from '../TreeView/TreeViewContext';
import { DescendantProvider, useDescendant } from '../TreeView/descendants';
import TreeItemContent from './TreeItemContent';
import treeItemClasses, { getTreeItemUtilityClass } from './treeItemClasses';

import {  TreeItemProps  } from './interface'

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    content: ['content'],
    expanded: ['expanded'],
    selected: ['selected'],
    focused: ['focused'],
    disabled: ['disabled'],
    iconContainer: ['iconContainer'],
    label: ['label'],
    group: ['group'],
  };

  return composeClasses(slots, getTreeItemUtilityClass, classes);
};

const TreeItemRoot = styled('li', {
  name: 'MuiTreeItem',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  outline: 0,
});

const StyledTreeItemContent = styled(TreeItemContent, {
  name: 'MuiTreeItem',
  slot: 'Content',
  overridesResolver: (props, styles) => {
    return [
      styles.content,
      styles.iconContainer && {
        [`& .${treeItemClasses.iconContainer}`]: styles.iconContainer,
      },
      styles.label && {
        [`& .${treeItemClasses.label}`]: styles.label,
      },
    ];
  },
})(({ theme }) => ({
  padding: '0 8px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },
  [`&.${treeItemClasses.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity,
    backgroundColor: 'transparent',
  },
  [`&.${treeItemClasses.focused}`]: {
    backgroundColor: theme.palette.action.focus,
  },
  [`&.${treeItemClasses.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:hover': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
    [`&.${treeItemClasses.focused}`]: {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
      ),
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    marginRight: 4,
    width: 15,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    '& svg': {
      fontSize: 18,
    },
  },
  [`& .${treeItemClasses.label}`]: {
    width: '100%',
    // fixes overflow - see https://github.com/mui/material-ui/issues/27372
    minWidth: 0,
    paddingLeft: 4,
    position: 'relative',
    ...theme.typography.body1,
  },
}));

const TreeItemGroup = styled(Collapse, {
  name: 'MuiTreeItem',
  slot: 'Group',
  overridesResolver: (props, styles) => styles.group,
})({
  margin: 0,
  padding: 0,
  marginLeft: 17,
});

const TreeItem: React.FC<TreeItemProps> = React.forwardRef(function TreeItem(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTreeItem' });
  const {
    children,
    className,
    collapseIcon,
    ContentComponent = TreeItemContent,
    ContentProps,
    endIcon,
    expandIcon,
    disabled: disabledProp,
    icon,
    id: idProp,
    label,
    nodeId,
    onClick,
    onMouseDown,
    TransitionComponent = Collapse,
    TransitionProps,
    ...other
  } = props;

  const {
    icons: contextIcons = {},
    focus,
    isExpanded,
    isFocused,
    isSelected,
    isDisabled,
    multiSelect,
    disabledItemsFocusable,
    mapFirstChar,
    unMapFirstChar,
    registerNode,
    unregisterNode,
    treeId,
  } = React.useContext(TreeViewContext);

  let id = null;

  if (idProp != null) {
    id = idProp;
  } else if (treeId && nodeId) {
    id = `${treeId}-${nodeId}`;
  }

  const [treeitemElement, setTreeitemElement] = React.useState(null);
  const contentRef = React.useRef(null);
  const handleRef = useForkRef(setTreeitemElement, ref);

  const descendant = React.useMemo(
    () => ({
      element: treeitemElement,
      id: nodeId,
    }),
    [nodeId, treeitemElement],
  );

  const { index, parentId } = useDescendant(descendant);

  const expandable = Boolean(Array.isArray(children) ? children.length : children);
  const expanded = isExpanded ? isExpanded(nodeId) : false;
  const focused = isFocused ? isFocused(nodeId) : false;
  const selected = isSelected ? isSelected(nodeId) : false;
  const disabled = isDisabled ? isDisabled(nodeId) : false;

  const ownerState = {
    ...props,
    expanded,
    focused,
    selected,
    disabled,
  };

  const classes = useUtilityClasses(ownerState);

  let displayIcon;
  let expansionIcon;

  if (expandable) {
    if (!expanded) {
      expansionIcon = expandIcon || contextIcons.defaultExpandIcon;
    } else {
      expansionIcon = collapseIcon || contextIcons.defaultCollapseIcon;
    }
  }

  if (expandable) {
    displayIcon = contextIcons.defaultParentIcon;
  } else {
    displayIcon = endIcon || contextIcons.defaultEndIcon;
  }

  React.useEffect(() => {
    // On the first render a node's index will be -1. We want to wait for the real index.
    if (registerNode && unregisterNode && index !== -1) {
      registerNode({
        id: nodeId,
        idAttribute: id,
        index,
        parentId,
        expandable,
        disabled: disabledProp,
      });

      return () => {
        unregisterNode(nodeId);
      };
    }

    return undefined;
  }, [registerNode, unregisterNode, parentId, index, nodeId, expandable, disabledProp, id]);

  React.useEffect(() => {
    if (mapFirstChar && unMapFirstChar && label) {
      mapFirstChar(nodeId, contentRef.current.textContent.substring(0, 1).toLowerCase());

      return () => {
        unMapFirstChar(nodeId);
      };
    }
    return undefined;
  }, [mapFirstChar, unMapFirstChar, nodeId, label]);

  let ariaSelected;
  if (multiSelect) {
    ariaSelected = selected;
  } else if (selected) {
    /* single-selection trees unset aria-selected on un-selected items.
     *
     * If the tree does not support multiple selection, aria-selected
     * is set to true for the selected node and it is not present on any other node in the tree.
     * Source: https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
     */
    ariaSelected = true;
  }

  function handleFocus(event) {
    // DOM focus stays on the tree which manages focus with aria-activedescendant
    if (event.target === event.currentTarget) {
      ownerDocument(event.target).getElementById(treeId).focus({ preventScroll: true });
    }

    const unfocusable = !disabledItemsFocusable && disabled;
    if (!focused && event.currentTarget === event.target && !unfocusable) {
      focus(event, nodeId);
    }
  }

  return (
    <TreeItemRoot
      className={clsx(classes.root, className)}
      role="treeitem"
      aria-expanded={expandable ? expanded : null}
      aria-selected={ariaSelected}
      aria-disabled={disabled || null}
      ref={handleRef}
      id={id}
      tabIndex={-1}
      {...other}
      ownerState={ownerState}
      onFocus={handleFocus}
    >
      <StyledTreeItemContent
        as={ContentComponent}
        ref={contentRef}
        classes={{
          root: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          focused: classes.focused,
          disabled: classes.disabled,
          iconContainer: classes.iconContainer,
          label: classes.label,
        }}
        label={label}
        nodeId={nodeId}
        multiSelect={multiSelect}
        onClick={onClick}
        onMouseDown={onMouseDown}
        icon={icon}
        expansionIcon={expansionIcon}
        displayIcon={displayIcon}
        ownerState={ownerState}
        {...ContentProps}
      />
      {children && (
        <DescendantProvider id={nodeId}>
          <TreeItemGroup
            as={TransitionComponent}
            unmountOnExit
            className={classes.group}
            in={expanded}
            component="ul"
            role="group"
            {...TransitionProps}
          >
            {children}
          </TreeItemGroup>
        </DescendantProvider>
      )}
    </TreeItemRoot>
  );
});


export default TreeItem;
