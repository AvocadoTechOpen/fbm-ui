import { Tab as MuiTab, TabProps as MuiTabProps, tabClasses, styled} from '@mui/material'

export type TabProps = MuiTabProps

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
