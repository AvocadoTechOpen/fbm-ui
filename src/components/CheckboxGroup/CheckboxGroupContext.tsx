import * as React from 'react';
import type { CheckboxGroupValues } from './types'


/**
 * @ignore - internal component.
 */
const CheckboxGroupContext = React.createContext<CheckboxGroupValues>({});

if (process.env.NODE_ENV !== 'production') {
  CheckboxGroupContext.displayName = 'CheckboxGroupContext';
}

export default CheckboxGroupContext;
