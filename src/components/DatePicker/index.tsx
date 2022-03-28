import React from 'react';
import {
  DesktopDatePicker,
  DesktopDatePickerProps,
} from '@mui/lab';

import Input, { FbmInputProps } from '../Input'
import LocalizationProvider from '../LocalizationProvider'
import useFormItemContext from '../FormItem/useFormItemContext';
import { DateIcon } from '../icons'
import { isDate, prefixZero } from '../../utils'

export interface FbmDateRangePickerProps extends DesktopDatePickerProps {
  value: DesktopDatePickerProps['value'];
  onChange: DesktopDatePickerProps['onChange'];
  inputFormat: DesktopDatePickerProps['inputFormat'];
  disableMaskedInput: DesktopDatePickerProps['disableMaskedInput'];
  renderInput: DesktopDatePickerProps['renderInput'];
  error?: string | boolean;
  InputProps?: FbmInputProps;
}

function useMergeProps(props) {
  const formItemContext = useFormItemContext()
  if (formItemContext && formItemContext.meta) {
    const { meta, helpers, value } = formItemContext
    const {
      onChange,
      error,
      value: valueProp,
      ...restProps
    } = props
    return {
      value,
      error: meta?.error,
      onChange: (newValue) => {
        if (meta.touched === false) {
          helpers.setTouched(true)
        }
        helpers.setValue(newValue)
        onChange?.(newValue)
      },
      ...restProps
    }
  }

  return props
}

const FbmDateRangePicker: React.FC<FbmDateRangePickerProps> = props => {
  const {
    value,
    error,
    InputProps,
    onChange,
    onBlur,
    inputFormat,
    ...DesktopDatePickerProps
  } = useMergeProps(props)

  const inputRef = React.useRef(null)

  const handleChange = (newValue) => {
    // if (newValue === null) return
    onChange?.(newValue)
  }


  const renderInput = (props) => {
    const {
      inputRef: inputRefProp,
      inputProps,
      disabled,
      InputProps
    } = props

    if (value === null) {
      inputProps.value = ''
    }

    const handleBlur = (event) => {
      onBlur?.(value)
      if (isDate(value)) {
        const [yyyy, mm, dd] = inputProps.value.split('/')
        const dateStr = [yyyy, prefixZero(mm), prefixZero(dd)].join('/')
        setTimeout(() => {
          inputRef.current.value = dateStr
        }, 100)
      }
    }

    return (
      <Input
        disabled={disabled}
        inputRef={inputRefProp}
        inputProps={{
          ...inputProps,
          ref: inputRef,
        }}
        {...InputProps}
        onBlur={handleBlur}
        onChange={() => { }}
      />
    )
  }

  return (
    <LocalizationProvider>
      <DesktopDatePicker
        value={value}
        onChange={handleChange}
        renderInput={renderInput}
        disableMaskedInput
        inputFormat={inputFormat}
        {...DesktopDatePickerProps}
      />
    </LocalizationProvider>
  )
}


FbmDateRangePicker.defaultProps = {
  inputFormat: 'yyyy/MM/dd',
  // mask: '____/__/__',
  // disableMaskedInput: true,
  components: {
    OpenPickerIcon: DateIcon,
  }
}



export default FbmDateRangePicker
