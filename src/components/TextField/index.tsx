import React from 'react'
import FormItem from '../FormItem/FormItem'
import { FormItemProps } from '../FormItem/types'
import { InputProps } from '../Input'

export { default as useTextField } from './useTextField'

interface TextFieldProps extends FormItemProps {
  onError?: () => void;
  onChange?: InputProps['onChange']
  component?: string;
  setError?: () => void;
  handleValidate?: () => void;
  isBeyond?: boolean;
}

const TextField: React.FC<TextFieldProps> = React.forwardRef(({
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

export default TextField