import * as React from 'react';
import ThemeProvider from '../ThemeProvider'

interface InternalLayoutProps {
  children: React.ReactNode;
}
export interface LayoutProps extends React.FC<InternalLayoutProps> {
}

const Layout: React.FC<InternalLayoutProps> = ({
  children,
}) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
)

export default Layout
