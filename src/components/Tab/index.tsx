import { Tab as MuiTab, styled, TabProps, tabClasses } from '@mui/material'
export { TabProps } from '@mui/material'


const Tab: React.FC<TabProps> = styled(MuiTab)(({ theme }) => ({
  [`&.${tabClasses.root}`]: {
    fontWeight: 500,
    padding: '16px',
    maxWidth: 'inherit',
    minWidth: 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  },
  
  [`&.${tabClasses.selected}`]: {
    // fontWeight: 500,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
}))

export default Tab
