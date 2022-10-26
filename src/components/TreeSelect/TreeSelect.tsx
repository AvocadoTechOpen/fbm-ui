import * as React from 'react';
import { Paper, Popper } from '@mui/material'
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import {
  TreeSelectInput,
  TreeSelectPopper,
  TreeSelectPaper,
  TreeSelectTreeBox,
  TreeSelectEndAdornment,
  TreeSelectClearIndicator,
  TreeSelectPopupIndicator,
} from './TreeSelect.styles'
import useTreeSelect from './useTreeSelect'
import { getTreeSelectUtilityClass } from './treeSelectClasses'
import { TreeView, Chip } from '..'
import { ArrowDropDownIcon, CloseIcon } from '../icons'
import { InputProps } from '@mui/material'

import type { TreeSelectProps } from './interface'

export const useUtilityClasses = (ownerState) => {
  const {
    classes,
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
  } = ownerState;

  const slots = {
    root: [
      'root',
      focused && 'focused',
      fullWidth && 'fullWidth',
      hasClearIcon && 'hasClearIcon',
      hasPopupIcon && 'hasPopupIcon',
    ],
    inputRoot: ['inputRoot'],
    input: ['input', inputFocused && 'inputFocused'],
    tag: ['tag'],
    // limitTag: ['limitTag', `limitTag${capitalize(size)}`],
    endAdornment: ['endAdornment'],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen'],
    popper: ['popper', disablePortal && 'popperDisablePortal'],
    paper: ['paper'],
    listbox: ['listbox'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    option: ['option'],
    optionLabel: ['optionLabel'],
    optioncheckedIcon: ['optioncheckedIcon'],
    typography: ['typography'],
    checkedIcon: ['checkedIcon'],
    groupLabel: ['groupLabel'],
    groupUl: ['groupUl'],
  };

  return composeClasses(slots, getTreeSelectUtilityClass, classes);
};


const TreeSelect: React.FC<TreeSelectProps> = React.forwardRef((props, ref) => {
  const {
    data,
    multiple,
    clearIcon = <CloseIcon />,
    clearText = 'Clear',
    closeText = 'Close',
    popupIcon = <ArrowDropDownIcon />,
    openText = '',
    getNodeLabel = (node) => node.label ?? node,
    getNodeId,
    getNodeChildren,
    readOnly = false,
    disabled,
    size,
    PaperComponent = Paper,
    PopperComponent = Popper,
    ChipProps,
    renderInput
  } = props

  const {
    id,
    dirty,
    popupOpen,
    setAnchorEl,
    anchorEl,
    focused,
    selectedNodesData,
    getInputProps,
    getTagProps,
    getClearProps,
    getTreeBoxProps,
    getTreeProps,
    getPopupIndicatorProps,
  } = useTreeSelect({ ...props })

  const hasClearIcon = dirty && !disabled && !readOnly;

  const ownerState = {
    ...props,
    focused,
    hasClearIcon,
    popupOpen,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  let startAdornment
  if (multiple) {
    const getCustomizedTagProps = (params) => ({
      className: classes.tag,
      disabled,
      ...getTagProps(params),
    });

    startAdornment = selectedNodesData.map((nodeData, index) => (
      <Chip
        label={nodeData.label}
        size={size === 'small' ? 'medium' : size}
        {...getCustomizedTagProps({ index })}
        {...ChipProps}
      />
    ))
  }

  const treeInputProps: InputProps = {
    id,
    disabled,
    size,
    ref: setAnchorEl,
    startAdornment,
    endAdornment: (
      <TreeSelectEndAdornment>
        {
          hasClearIcon && (
            <TreeSelectClearIndicator
              {...getClearProps()}
              aria-label={clearText}
              title={clearText}
              className={clsx(
                classes.clearIndicator,
              )}
            >
              {clearIcon}
            </TreeSelectClearIndicator>
          )
        }
        <TreeSelectPopupIndicator
          {...getPopupIndicatorProps()}
          disabled={disabled}
          aria-label={popupOpen ? closeText : openText}
          title={popupOpen ? closeText : openText}
          // @ts-ignore
          ownerState={ownerState}
          className={clsx(
            classes.popupIndicator,
          )}
        >
          {popupIcon}
        </TreeSelectPopupIndicator>
      </TreeSelectEndAdornment>
    ),
    inputProps: {
      className: classes.input,
      disabled,
      readOnly,
      ...getInputProps(),
    }
  }
  let treeInput = null
  if (renderInput && typeof renderInput === 'function') {
    treeInput = renderInput(treeInputProps)
  } else {
    treeInput = <TreeSelectInput {...treeInputProps} />
  }

  return (
    <React.Fragment>
      {treeInput}
      {popupOpen && anchorEl ? (
        <TreeSelectPopper
          open
          as={PopperComponent}
          style={{
            width: anchorEl ? anchorEl.clientWidth : null,
          }}
          role="presentation"
          anchorEl={anchorEl}
        >
          <TreeSelectPaper
            as={PaperComponent}
          >
            <TreeSelectTreeBox
              {...getTreeBoxProps()}
            >
              <TreeView
                {...getTreeProps()}
                data={data}
                disabled={disabled}
                multiSelect={multiple}
                getNodeLabel={getNodeLabel}
                getNodeId={getNodeId}
                getNodeChildren={getNodeChildren}
              />
            </TreeSelectTreeBox>
          </TreeSelectPaper>
        </TreeSelectPopper>
      ) : null}
    </React.Fragment>
  );
});


TreeSelect.defaultProps = {
}
export default TreeSelect;
