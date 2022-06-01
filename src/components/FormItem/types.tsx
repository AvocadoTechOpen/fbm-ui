
import { InputLabelProps as MuiInputLabelProps } from '@mui/material'
import { InputProps } from '../Input'
import {
  FieldMetaProps,
  FieldHelperProps
} from 'formik'


type Extra = string;

type Label = React.ReactNode;

type Size = InputProps['size'];

// 超长溢出错误类型
export  type ErrorType = {
  isBeyond?: boolean
}

export type RuleItemType = ((value: any, formItem: object) => void | string) | {
  type?: string;
  message?: string;
  required?: boolean;
};

export interface HelperProps {
  extra?: Extra;
  max?: number;
  length?: number;
  error: boolean;
}

export interface InputLabelProps extends MuiInputLabelProps {
  size: Size
}

export interface FormItemProps extends InputProps {
  name?: string;
  value?: any,
  label?: Label;
  extra?: Extra;
  max?: number;
  error?: boolean | string | ErrorType;
  length?: number;
  rules?: RuleItemType[]
  required?: boolean;
  InputLabelProps?: InputLabelProps;
  inputProps?: InputProps['inputProps'];
  InputProps?: InputProps;
  inputRef?: React.Ref<any>;
  meta?: FieldMetaProps<any>;
  helpers?: FieldHelperProps<any>;
}