import * as React from 'react';
import CheckboxGroupContext from './CheckboxGroupContext';

export default function useCheckboxGroupContext() {
  return React.useContext(CheckboxGroupContext);
}
