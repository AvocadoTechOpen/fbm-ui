import * as React from 'react';

/**
 * @ignore - internal component.
 */
const TreeViewContext = React.createContext<any>({});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
