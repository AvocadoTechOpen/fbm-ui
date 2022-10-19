import * as React from 'react';
import {
  unstable_setRef as setRef,
  unstable_useEventCallback as useEventCallback,
  unstable_useControlled as useControlled,
  unstable_useId as useId,
} from '@mui/utils';


export default function useTreeSelect(props) {
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    clearOnBlur = !props.freeSolo,
    componentName = 'useTreeSelect',
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = props.multiple,
    disabled: disabledProp,
    freeSolo = false,
    id: idProp,
    inputValue: inputValueProp,
    name,
    label,
    size,
    placeholder,
    multiple = false,
    onChange,
    onClose,
    onBlur,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    readOnly = false,
    value: valueProp,
    expanded: expandedProp
  } = props;

  const id = useId(idProp);
  const ignoreFocus = React.useRef(false);
  const firstFocus = React.useRef(true);
  const inputRef = React.useRef(null);
  const treeboxRef = React.useRef(null);
  const treeRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [focusedTag, setFocusedTag] = React.useState(-1);

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName,
  });

  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: '',
    name: componentName,
    state: 'inputValue',
  });

  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: [],
    name: componentName,
    state: 'expanded',
  });

  const [focused, setFocused] = React.useState(false);

  const getNode = (nodeId) => {
    if (nodeId && typeof nodeId === 'string') {
      return treeRef?.current?.getNode?.(nodeId)
    }
  }

  const resetInputValue = React.useCallback(
    (event, newValue) => {
      const isOptionSelected = multiple ? value.length < newValue.length : newValue !== null;
      if (!isOptionSelected && !clearOnBlur) {
        return;
      }
      let newInputValue;
      if (multiple) {
        newInputValue = '';
      } else if (newValue == null) {
        newInputValue = '';
      } else {
        newInputValue = getNode(newValue)?.label
      }

      if (inputValue === newInputValue) {
        return;
      }

      setInputValueState(newInputValue);

      if (onInputChange) {
        onInputChange(event, newInputValue, 'reset');
      }
    },
    [inputValue, multiple, onInputChange, setInputValueState, clearOnBlur, value],
  );

  const prevValue = React.useRef();

  React.useEffect(() => {
    const valueChange = value !== prevValue.current;
    prevValue.current = value;

    if (focused && !valueChange) {
      return;
    }

    // Only reset the input's value when freeSolo if the component's value changes.
    if (freeSolo && !valueChange) {
      return;
    }

    // resetInputValue(null, value);
  }, [value, resetInputValue, focused, prevValue, freeSolo]);

  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: 'open',
  });

  const [inputPristine, setInputPristine] = React.useState(true);

  const inputValueIsSelectedValue =
    !multiple && value != null && inputValue === getNode?.(value)?.label;

  const popupOpen = open && !readOnly;

  const handleTreeboxRef = useEventCallback((node) => {
    if (!node) {
      return;
    }
    setRef(treeboxRef, node);
  });

  const handleTreeRef = useEventCallback((node) => {
    if (!node) {
      return;
    }
    setRef(treeRef, node);
  });

  const handleOpen = (event) => {
    if (open) {
      return;
    }

    setOpenState(true);
    setInputPristine(true);

    if (onOpen) {
      onOpen(event);
    }
  };

  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }

    setOpenState(false);

    if (onClose) {
      onClose(event, reason);
    }
  };

  const handleValue = (event, newValue, reason, details) => {

    if (multiple) {
      if (value.length === newValue.length && value.every((val, i) => val === newValue[i])) {
        return;
      }
    } else if (value === newValue) {
      return;
    }

    if (onChange) {
      onChange(event, newValue, reason, details);
    }

    setValueState(newValue);
  };

  const isTouch = React.useRef(false);

  const selectNewValue = (event, option, reasonProp = 'selectOption', origin = 'options') => {
    let reason = reasonProp;
    let newValue = multiple ? option.slice() : option;

    resetInputValue(event, newValue);

    handleValue(event, newValue, reason, { option });
    if (!disableCloseOnSelect && (!event || (!event.ctrlKey && !event.metaKey))) {
      handleClose(event, reason);
    }

    if (
      blurOnSelect === true ||
      (blurOnSelect === 'touch' && isTouch.current) ||
      (blurOnSelect === 'mouse' && !isTouch.current)
    ) {
      inputRef.current.blur();
    }
  };

  //===================== Input Event =====================
  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState('');

    if (onInputChange) {
      onInputChange(event, '', 'clear');
    }
    handleValue(event, multiple ? [] : null, 'clear', undefined);
  };

  const handleFocus = (event) => {
    setFocused(true);

    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };

  const handleBlur = (event) => {
    if (
      treeboxRef.current !== null &&
      treeboxRef.current.parentElement.contains(document.activeElement)
    ) {
      inputRef.current.focus();
      return;
    }

    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;

    if (autoSelect && freeSolo && inputValue !== '') {
      selectNewValue(event, inputValue, 'blur', 'freeSolo');
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }

    handleClose(event, 'blur');
    onBlur?.(event)
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);

      if (onInputChange) {
        onInputChange(event, newValue, 'input');
      }
    }

    if (newValue === '') {
      if (!disableClearable && !multiple) {
        handleValue(event, null, 'clear', undefined);
      }
    } else {
      handleOpen(event);
    }
  };

  const handleTagDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, 'removeOption', {
      option: value[index],
    });
  };

  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, 'toggleInput');
    } else {
      handleOpen(event);
      inputRef.current.focus();
    }
  };

  const handleInputMouseDown = (event) => {
    if (inputValue === '' || !open) {
      handlePopupIndicator(event);
    }
  };

  const handleKeyDown = (event) => { 
    switch (event.key) {
      case 'Backspace':
        if (multiple && !readOnly && inputValue === '' && value.length > 0) {
          const index = focusedTag === -1 ? value.length - 1 : focusedTag;
          const newValue = value.slice();
          newValue.splice(index, 1);
          handleValue(event, newValue, 'removeOption', {
            option: value[index],
          });
        }
        break;
      default:
    }
  }
  //===================== Input Event end =====================


  //===================== tree Event =====================
  const handleNodeSelect = (event, newValue) => {
    selectNewValue(event, newValue)
  }

  const handleNodeToggle = (event, newValue) => {
    setExpandedState(newValue)
  }
  //===================== tree Event end =====================

  if (disabledProp && focused) {
    handleBlur(undefined);
  }

  const selectedNodesData = React.useMemo(() => {
    if (multiple && value && value.length > 0) {
      return value.map((nodeId) => {
        const nodeData = getNode(nodeId)
        return nodeData
      })
    }
    return []
  }, [value])

  const treeDefaultExpanded = (multiple ? value : [value]).map((nodeId) => {
    const nodeData = getNode(nodeId)
    return nodeData?.parentId
  })
  
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : !!value);


  return {
    getInputProps: () => ({
      id,
      name,
      label,
      size,
      placeholder,
      value: inputValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      onKeyDown: handleKeyDown,
      autoComplete: 'off',
      ref: inputRef,
      autoCapitalize: 'none',
      spellCheck: false,
      role: 'combobox',
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear,
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator,
    }),
    getTagProps: ({ index }) => ({
      key: index,
      'data-tag-index': index,
      tabIndex: -1,
      ...(!readOnly && { onDelete: handleTagDelete(index) }),
    }),
    getTreeBoxProps: () => ({
      role: 'treeBox',
      id: `${id}-treeBox`,
      'aria-labelledby': `${id}-label`,
      ref: handleTreeboxRef,
      onMouseDown: (event) => {
        // Prevent blur
        event.preventDefault();
      },
    }),
    getTreeProps: () => ({
      selected: value,
      expanded: expanded,
      ref: handleTreeRef,
      onNodeSelect: handleNodeSelect,
      onNodeToggle: handleNodeToggle,
      searchLabel: inputValueIsSelectedValue && inputPristine ? '' : inputValue,
    }),
    id,
    inputValue,
    value,
    dirty,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    selectedNodesData,
  };
}
