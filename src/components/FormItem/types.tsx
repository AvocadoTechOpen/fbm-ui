
import { InputLabelProps as MuiInputLabelProps, FormControlProps } from '@mui/material'
import { InputProps } from '../Input'
import { SelectProps } from '../Select'


export type Extra = string;

export type Label = React.ReactNode;

export type Size = InputProps['size'];

export type Value = InputProps['value'];

export type Error = string | boolean

export type RuleItemFnParams = {
  value: Value;
  label: Label;
  max?: number;
}
export type RuleItemFnType = (input: RuleItemFnParams) => Error
export type RuleItemObjType = {
  type?: string;
  message?: string;
  required?: boolean;
}
export type RuleItemType = RuleItemObjType | RuleItemFnType;

export interface HelperProps {
  extra?: Extra;
  max?: number;
  length?: number;
  error: boolean;
}

export interface InputLabelProps extends MuiInputLabelProps {
  size?: Size
}

// type ChildrenType<Values = any> = RenderChildren<Values> | React.ReactNode;

interface FormItemBaseProps {
  ref?: any;
  label?: Label;
  extra?: Extra;
  max?: number;
  name?: string;
  error?: Error;
  length?: number;
  rules?: RuleItemType[]
  required?: boolean;
  InputLabelProps?: InputLabelProps;
  HelperProps?: HelperProps;
  InputProps?: InputProps;
  options?: SelectProps['options']
  SelectProps?: SelectProps;
  children?: React.ReactNode;
  /** 触发验证的时机 */
  trigger?: 'onChange' | 'onBlur' | ('onChange' | 'onBlur')[];
  shouldMemoUpdate?: ((prev: FormItemProps, next: FormItemProps) => boolean)
  /** 用于性能优化 */
  fast?: boolean;
}

export type FormItemProps = FormItemBaseProps & InputProps