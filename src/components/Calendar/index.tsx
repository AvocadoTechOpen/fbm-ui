import React from 'react';
import {
  DesktopDatePicker,
  DesktopDatePickerProps,
} from '@mui/lab';

import Input, { InputProps } from '../Input'
import LocalizationProvider from '../LocalizationProvider'
import { DateIcon } from '../icons'
import { isDate, prefixZero } from '../../utils'

export interface FbmDateRangePickerProps extends DesktopDatePickerProps {
  value: DesktopDatePickerProps['value'];
  onChange: DesktopDatePickerProps['onChange'];
  inputFormat: DesktopDatePickerProps['inputFormat'];
  disableMaskedInput: DesktopDatePickerProps['disableMaskedInput'];
  renderInput: DesktopDatePickerProps['renderInput'];
  error?: string | boolean;
  InputProps?: InputProps;
}


const Calendar: React.FC<FbmDateRangePickerProps> = props => {
  const {
    value,
    error,
    InputProps,
    onChange,
    inputFormat,
    ...DesktopDatePickerProps
  } = props


  const renderInput = (props) => {
    const {
      inputRef: inputRefProp,
      inputProps,
      disabled,
    } = props

    if (value === null) {
      inputProps.value = ''
    }

    return (
      <Input
        disabled={disabled}
        inputRef={inputRefProp}
        {...InputProps}
      />
    )
  }

  const handleChange = () => {

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


Calendar.defaultProps = {
  inputFormat: 'yyyy/MM/dd',
  // mask: '____/__/__',
  // disableMaskedInput: true,
  components: {
    OpenPickerIcon: DateIcon,
  }
}



export default Calendar
