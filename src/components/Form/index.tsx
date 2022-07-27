import React from 'react';
import { FormikProvider, Form as FormikForm} from 'formik';
import { FormProps } from './useForm';

export { default as useForm, FormProps} from './useForm'

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