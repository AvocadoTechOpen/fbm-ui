type Name = string;
export type Value = any[];

export interface CheckboxGroupProps {
  name?: Name
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: Value) => void;
  value?: Value;
  defaultValue?: any[];
  children?: React.ReactNode;
  row?: boolean;
}

export interface CheckboxGroupValues {
  name?: Name
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  value?: Value;
}