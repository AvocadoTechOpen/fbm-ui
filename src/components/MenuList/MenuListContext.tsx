import * as React from 'react';

/**
 * @ignore - internal component.
 */

export type MenuListContextTypes = {
  multiple?: boolean;
  value?: any;
  onChange?:(value) => void;
}

const MenuListContext = React.createContext<MenuListContextTypes>({});

if (process.env.NODE_ENV !== 'production') {
  MenuListContext.displayName = 'MenuListContext';
}

export default MenuListContext;
