import React from 'react';
import { zhCN } from 'date-fns/locale';
import { LocalizationProvider, LocalizationProviderProps } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export interface FbmLocalizationProviderProps {
  locale?: LocalizationProviderProps['locale']
  dateAdapter?: LocalizationProviderProps['dateAdapter']
}

const FbmLocalizationProvider: React.FC<FbmLocalizationProviderProps> = (inProps) => {
  const { children, ...props } = inProps;
  return (
    <LocalizationProvider {...(props as LocalizationProviderProps)}>
      {children}
    </LocalizationProvider>
  )
}

FbmLocalizationProvider.defaultProps = {
  dateAdapter: AdapterDateFns,
  locale: zhCN,
}

export default FbmLocalizationProvider
