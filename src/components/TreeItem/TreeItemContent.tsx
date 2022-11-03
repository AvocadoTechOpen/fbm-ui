import * as React from 'react';
import clsx from 'clsx';
import { styled, checkboxClasses } from '@mui/material'
import useTreeItem from './useTreeItem';
import Checkbox from '../Checkbox'
import { DoneIcon } from '../icons'


import { InternalStandardProps as StandardProps } from '@mui/material';

export interface TreeItemContentProps extends StandardProps<React.HTMLAttributes<HTMLElement>> {
  renderTreeItemLabel?: (treeItemProps: any) => React.ReactNode;
  renderTreeItemContent?: (treeItemProps: any) => React.ReactNode;
  /**
   * 额外渲染节点
   */
  renderExtra?: (treeItemProps: any) => React.ReactNode;
  /**
   * 是否在节点前添加选框
   */
  checkable?: boolean;
  multiSelect?: boolean;
  className?: string;
  classes: {
    /** Styles applied to the root element. */
    root: string;
    /** State class applied to the content element when expanded. */
    expanded: string;
    /** State class applied to the content element when selected. */
    selected: string;
    /** State class applied to the content element when focused. */
    focused: string;
    /** State class applied to the element when disabled. */
    disabled: string;
    /** Styles applied to the tree node icon and collapse/expand icon. */
    iconContainer: string;
    /** Styles applied to the label element. */
    label: string;
    /** Styles applied to the extra element. */
    extra: string;
    /** Styles applied to the selectedIcon element. */
    selectedIcon: string;
    // 禁止选中节点
    disableSelection?: string;
  };
  label?: React.ReactNode | string;
  nodeId: string;
  icon?: React.ReactNode;
  expansionIcon?: React.ReactNode;
  displayIcon?: React.ReactNode;
}

const TreeItemCheckbox = styled(Checkbox)({
  [`& .${checkboxClasses.root}`]: {
    '&:hover': {
      background: 'transparent !important',
    }
  }
})


const TreeItemContent: React.FC<TreeItemContentProps> = React.forwardRef((props, ref) => {
  const {
    classes,
    checkable = props.multiSelect,
    renderExtra,
    className,
    displayIcon,
    multiSelect,
    expansionIcon,
    icon: iconProp,
    label: labelProp,
    nodeId,
    onClick,
    onMouseDown,
    renderTreeItemContent,
    renderTreeItemLabel,
    ...other
  } = props;

  const {
    disabled,
    expanded,
    selected,
    disableSelection,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  const treeItemContentProps = {
    icon,
    nodeId,
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
    multiSelect,
  }

  let children = null
  if (renderTreeItemContent && typeof renderTreeItemContent === 'function') {
    children = renderTreeItemContent(treeItemContentProps)
  } else {
    const label = renderTreeItemLabel?.(treeItemContentProps) ?? labelProp
    children = (
      <React.Fragment>
        <div className={classes.iconContainer} onClick={handleExpansion}> {icon} </div>
        {
          checkable
            ? <TreeItemCheckbox sx={{ ml: '4px' }} disabled={disableSelection || disabled} label={label} checked={selected} onChange={handleSelection} />
            : (
              <div className={classes.label} onClick={handleSelection}>
                {label}
              </div>
            )
        }
        {
          (!checkable && selected === true) && (
            <DoneIcon className={classes.selectedIcon} color="primary" />
          )
        }
        {renderExtra != null && (
          <div className={classes.extra}>
            {renderExtra?.(treeItemContentProps)}
          </div>
        )}
      </React.Fragment>
    )
  }

  return (
    <div
      // @ts-ignore
      ref={ref}
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
        [classes.disableSelection]: disableSelection,
      })}
      onMouseDown={handleMouseDown}
      {...other}
    >
      {children}
    </div>
  );
});

export default TreeItemContent;
