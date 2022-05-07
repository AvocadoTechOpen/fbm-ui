import React from 'react'
import FormItem, { FbmFormItemProps } from '../FormItem/FormItem'
import { FbmInputProps } from '../Input'

export { default as useTextField } from './useTextField'
export { default as useInput } from './useInput'

interface FbmTextField extends FbmFormItemProps {
  onError?: () => void;
  onChange?: FbmInputProps['onChange']
  component?: string;
  setError?: () => void;
  handleValidate?: () => void;
  isBeyond?: boolean;
}

const FbmTextField: React.FC<FbmTextField> = React.forwardRef(({
  /** useTextField生成的 无需传给FormItem   */
  setError,
  handleValidate,
  isBeyond,
  /** end  */
  ...props
}, ref) => {
  
  return (
    <FormItem
      inputRef={ref}
      {...props}
    />
  )
})

export default FbmTextField