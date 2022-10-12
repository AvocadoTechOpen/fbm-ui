import * as React from 'react';
import {
  unstable_useControlled as useControlled,
  unstable_useId as useId,
} from '@mui/utils';


const useTreeSelect = (props) => {
  const {
    id: idProp,
    open: openProp,
    data,
    readOnly,
    componentName = 'useTreeSelect',
    value: valueProp,
    defaultValue = props.multiple ? [] : null,
    getNodeId,
  } = props

  const id = useId(idProp);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: 'open',
  });
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName,
  });

  const [focused, setFocused] = React.useState(false);

  const popupOpen = open && !readOnly;

  const dataMap = React.useMemo(() => {
    const _dataMap = {}

    
    return _dataMap
  }, [data])

  const handleOpen = (event) => {
    if (open) {
      return;
    }
    setOpenState(true);
    // setInputPristine(true);
    // if (onOpen) {
    //   onOpen(event);
    // }
  };

  const handleFocus = (event) => {
    setFocused(true);
    handleOpen(event);
  };

  return {
    id,
    getInputProps: () => ({
      onFocus: handleFocus,
    }),
    getTagProps: () => ({

    }),
    popupOpen,
    anchorEl,
    setAnchorEl,
    value,
  }

}

export default useTreeSelect