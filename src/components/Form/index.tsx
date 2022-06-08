import React from 'react';
import { FormikProvider, FormikProps, Form as FormikForm} from 'formik';

export { default as useForm } from './useForm'

const Form: React.FC<FormikProps<any>> = ({ children, ...formik }) => {
  return (
    <FormikProvider value={formik}>
      <FormikForm>
        {children}
      </FormikForm>
    </FormikProvider>
  )
}

export default Form