
import { styled } from '@mui/material/styles';
import { TreeItem } from '@mui/lab';
import FormControlLabel from '@mui/material/FormControlLabel';



const Tree = styled(TreeItem)(() => ({
  '& .MuiTreeItem-label': {
    color: 'rgba(0,0,0,.86)',
    fontWeight: '500 !important',
    fontSize: '14px !important',
  },
  '& .MuiFormControlLabel-labelPlacementEnd': {
    width: '100% !important',
  },
  '& .MuiTreeItem-content': {
    background: 'transparent !important',
    padding: 0,
  },
  '& .Mui-selected': {
    background: 'transparent !important',
  },
  '& .Mui-focused': {
    background: 'transparent !important',
  },
  // '& .MuiTreeItem-iconContainer': {
  //   marginBottom: '16px',
  // },
}));

const FormChkeckBox = styled(FormControlLabel)(() => ({
  width: '100%',
  '& .MuiFormControlLabel-label': {
    color: 'rgba(0, 0, 0, 0.86)',
    fontSize: '14px !important',
    marginLeft: '3px',
  },
  '& .MuiTypography-root': {
    padding: '0px 0px 13px',
  },
  '& .MuiCheckbox-colorPrimary': {
    padding: '0px 0px 13px',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px',
  },
}));

const choiceStyle = {
  choiceLeft: {
    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
    height: 'calc(100vh - 140px)',
    overflow: 'auto',
    paddingRight: '16px',
    width: '50%',
  },
  inputSearch: {
    height: 36,
    marginBottom: '16px',
    fontSize: '14px',
  },
  choiceRight: {
    paddingLeft: '16px',
    height: 'calc(100vh - 140px)',
    overflow: 'auto',
    width: '50%',
  },
};
export {  Tree, FormChkeckBox, choiceStyle };
