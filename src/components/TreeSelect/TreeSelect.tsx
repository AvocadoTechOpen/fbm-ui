import * as React from 'react';
import { Paper, Popper } from '@mui/material'
import { createFilterOptions } from '@mui/base';
import { TreeSelectPopper, TreeSelectPaper } from './TreeSelect.styles'

import Input from '../Input'
import useTreeSelect from './useTreeSelect'
import TreeView from '../TreeView';
import Chip from '../Chip'
import { flattenDeep } from 'lodash'

export { createFilterOptions };

const TreeSelect: React.FC<any> = React.forwardRef((props, ref) => {
  const {
    data,
    multiple,
    getNodeLabel,
    getNodeId,
    getNodeChildren,

    disabled,
    size,
    PaperComponent = Paper,
    PopperComponent = Popper,
    renderTags,
    getOptionLabel,
    ChipProps,
  } = props

  const {
    id,
    value,
    popupOpen,
    setAnchorEl,
    anchorEl,
    getInputProps,
    getTagProps,
  } = useTreeSelect({ ...props })

  console.log(flattenDeep(data))

  let startAdornment;
  if (multiple && value.length > 0) {
    const getCustomizedTagProps = (params) => ({
      // className: classes.tag,
      disabled,
      ...getTagProps(params),
    });

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps, ownerState);
    } else {
      startAdornment = value.map((option, index) => (
        <Chip
          label={getOptionLabel(option)}
          size={size}
          {...getCustomizedTagProps({ index })}
          {...ChipProps}
        />
      ));
    }
  }

  return (
    <React.Fragment>
      <Input
        id={id}
        disabled={disabled}
        size={size}
        ref={setAnchorEl}
        inputProps={{
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
            <TreeView
              data={data}
              selected={value}
              getNodeLabel={getNodeLabel}
              getNodeId={getNodeId}
              getNodeChildren={getNodeChildren}
            />
          </TreeSelectPaper>
        </TreeSelectPopper>
      ) : null}
    </React.Fragment>
  );
});


TreeSelect.defaultProps = {
}
export default TreeSelect;
