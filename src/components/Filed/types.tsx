import {
  FieldMetaProps,
  FieldHelperProps
} from 'formik'


type ErrorType = {
  isBeyond?: boolean
}

export type RuleItemType = ((value: any, formItem: object) => void | string) | {
  type?: string;
  message?: string;
  required?: boolean;
};

export type FbmFormItemProps = {
  name?: string;
  value?: any,
  label?: BaseTextFieldProps['label'];
  extra?: string;
  max?: number;
  error?: boolean | string | ErrorType;
  length?: number;
  rules?: RuleItemType[]
  required?: boolean;
  InputLabelProps?: InputLabelProps;
  inputProps?: FbmInputProps['inputProps'];
  InputProps?: FbmInputProps;
  inputRef?: React.Ref<any>;
  meta?: FieldMetaProps<any>;
  helpers?: FieldHelperProps<any>;
} & FbmInputProps

export interface HelperProps extends FormHelperTextProps {
  extra?: FbmFormItemProps['extra'];
  max?: number;
  length?: number;
  error: boolean;
}

export interface FbmInputLabelProps extends InputLabelProps {
  size?: FbmInputProps['size']
}