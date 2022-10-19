import * as React from 'react';
import {
  unstable_setRef as setRef,
  unstable_useEventCallback as useEventCallback,
  unstable_useControlled as useControlled,
  unstable_useId as useId,
} from '@mui/utils';

function stripDiacritics(string) {
  return typeof string.normalize !== 'undefined'
    ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    : string;
}



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
    filterOptions = () => {},
    filterSelectedOptions = false,
    freeSolo = false,
    id: idProp,
    inputValue: inputValueProp,
    isOptionEqualToValue = (option, value) => option.value === value.value,
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
    options,
    data,
    readOnly = false,
    selectOnFocus = !props.freeSolo,
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
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);

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

  const filteredOptions = popupOpen
    ? filterOptions(
      data?.filter((option) => {
        if (
          (multiple ? value : [value]).some(
            (value2) => value2 !== null && isOptionEqualToValue(option, value2),
          )
        ) {
          return false;
        }
        return true;
      }),
      // we use the empty string to manipulate `filterOptions` to not filter any options
      // i.e. the filter predicate always returns true
      {
        inputValue: inputValueIsSelectedValue && inputPristine ? '' : inputValue,
      },
    )
    : [];

  const listboxAvailable = open && filteredOptions?.length > 0 && !readOnly;

  if (process.env.NODE_ENV !== 'production') {
    if (value !== null && !freeSolo && options?.length > 0) {
      const missingValue = (multiple ? value : [value]).filter(
        (value2) => !options.some((option) => isOptionEqualToValue(option, value2)),
      );

      if (missingValue.length > 0) {
        console.warn(
          [
            `MUI: The value provided to ${componentName} is invalid.`,
            `None of the options match with \`${missingValue.length > 1
              ? JSON.stringify(missingValue)
              : JSON.stringify(missingValue[0])
            }\`.`,
            'You can use the `isOptionEqualToValue` prop to customize the equality test.',
          ].join('\n'),
        );
      }
    }
  }

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

    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], 'blur');
    } else if (autoSelect && freeSolo && inputValue !== '') {
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

  // Prevent input blur when interacting with the combobox
  const handleMouseDown = (event) => {
    if (event.target.getAttribute('id') !== id) {
      event.preventDefault();
    }
  };

  // Focus the input when interacting with the combobox
  const handleClick = () => {
    inputRef.current.focus();

    if (
      selectOnFocus &&
      firstFocus.current &&
      inputRef.current.selectionEnd - inputRef.current.selectionStart === 0
    ) {
      inputRef.current.select();
    }

    firstFocus.current = false;
  };

  const handleInputMouseDown = (event) => {
    if (inputValue === '' || !open) {
      handlePopupIndicator(event);
    }
  };


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


  return {
    getRootProps: (other = {}) => ({
      'aria-owns': listboxAvailable ? `${id}-listbox` : null,
      ...other,
      onMouseDown: handleMouseDown,
      onClick: handleClick,
    }),
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
      // if open then this is handled imperativeley so don't let react override
      // only have an opinion about this when closed
      'aria-activedescendant': popupOpen ? '' : null,
      'aria-autocomplete': autoComplete ? 'both' : 'list',
      'aria-controls': listboxAvailable ? `${id}-listbox` : undefined,
      'aria-expanded': listboxAvailable,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: 'off',
      ref: inputRef,
      autoCapitalize: 'none',
      spellCheck: 'false',
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
      searchValue: inputValueIsSelectedValue && inputPristine ? '' : inputValue,
    }),
    id,
    inputValue,
    value,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    selectedNodesData,
  };
}
