import * as React from 'react';
import { Paper, Popper } from '@mui/material'
import clsx from 'clsx';
import {
  unstable_composeClasses as composeClasses,
} from '@mui/base';

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
    size,
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
    renderTags,
    ChipProps,
  } = props

  const {
    id,
    value,
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

  const hasClearIcon = !disabled && !readOnly;
  // const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

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

    if (renderTags) {
      startAdornment = renderTags(selectedNodesData, getCustomizedTagProps, ownerState);
    } else {
      startAdornment = selectedNodesData.map((nodeData, index) => (
        <Chip
          label={nodeData.label}
          size={size === 'small' ? 'medium' : size}
          {...getCustomizedTagProps({ index })}
          {...ChipProps}
        />
      ))
    }
  }

  return (
    <React.Fragment>
      <TreeSelectInput
        id={id}
        disabled={disabled}
        size={size}
        ref={setAnchorEl}
        startAdornment={startAdornment}
        endAdornment={
          <TreeSelectEndAdornment>
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
        }
        inputProps={{
          className: classes.input,
          disabled,
          readOnly,
          ...getInputProps(),
        }}
      />
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
            {data && data.length > 0 ? (
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
            ) : null}
          </TreeSelectPaper>
        </TreeSelectPopper>
      ) : null}
    </React.Fragment>
  );
});


TreeSelect.defaultProps = {
}
export default TreeSelect;
