import React from 'react';
import { FormikProvider, Form as FormikForm} from 'formik';
import { FormProps as FbmFormProps } from './useForm';

export { default as useForm } from './useForm'

export type FormProps<T> = FbmFormProps<T>;

const Form: React.FC<FormProps<any>> = ({ children, ...formik }) => {
  return (
    <FormikProvider value={formik}>
      <FormikForm>
        {children}
      </FormikForm>
    </FormikProvider>
  )
}

export default Form