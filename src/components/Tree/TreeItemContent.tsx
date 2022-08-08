import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useTreeItem from '@mui/lab/TreeItem/useTreeItem';

/**
 * @ignore - internal component.
 */
const TreeItemContent = React.forwardRef(function TreeItemContent(props, ref) {
  const {
    classes,
    className,
    displayIcon,
    expansionIcon,
    icon: iconProp,
    label,
    nodeId,
    onClick,
    onMouseDown,
    ...other
  } = props;

  const {
    disabled,
    expanded,
    selected,
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

  const handleClick = (event) => {
    handleExpansion(event);
    handleSelection(event);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      ref={ref}
      {...other}
    >
      <div className={classes.iconContainer}>{icon}</div>
      <div className={classes.label}>{label}</div>
    </div>
  );
});

export default TreeItemContent;
