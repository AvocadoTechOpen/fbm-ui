import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useTreeItem from './useTreeItem';
import Checkbox from '../Checkbox'

/**
 * @ignore - internal component.
 */
const TreeItemContent = React.forwardRef(function TreeItemContent(props, ref) {
  const {
    classes,
    className,
    displayIcon,
    multiSelect,
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
    handleSelection(event);
    if (onClick) {
      onClick(event);
    }
  };

  return (
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
      <div
        className={classes.iconContainer}
        onClick={handleExpansion}
      >
        {icon}
      </div>

      <div className={classes.label}>
        {
          multiSelect ? (
            <Checkbox label={label} checked={selected} onChange={handleSelection} />
          ) :  label
        }
      </div>

    </div>
  );
});

TreeItemContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,
  /**
   * The tree node label.
   */
  label: PropTypes.node,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
};

export default TreeItemContent;
