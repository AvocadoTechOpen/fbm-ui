
import { InputLabelProps as MuiInputLabelProps } from '@mui/material'
import { InputProps } from '../Input'


export type Extra = string;

export type Label = React.ReactNode;

export type Size = InputProps['size'];

export type Value = InputProps['value'];

export type Error = string

export type RuleItemFnParams = {
  value: Value;
  label: Label;
  max?: number;
} 
export type RuleItemFnType = (input: RuleItemFnParams) => string | Promise<string>
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
  size: Size
}


interface FormItemBaseProps {
  label?: Label;
  extra?: Extra;
  max?: number;
  name?: string;
  error?: ErrorType | boolean | string;
  length?: number;
  rules?: RuleItemType[]
  required?: boolean;
  InputLabelProps?: InputLabelProps;
  HelperProps?: HelperProps;
  InputProps?: InputProps
}

export type FormItemProps = FormItemBaseProps & InputProps