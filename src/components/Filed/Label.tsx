import styled from '@mui/material/styles/styled'
import {
  InputLabel,
  inputLabelClasses,
  InputLabelProps,
} from '@mui/material'

const LabelRoot = styled(InputLabel)(({ variant, size }: FbmInputLabelProps) => (
  {
    lineHeight: 1,
    zIndex: 1,
    top: '0',
    ...(variant === 'outlined' && {
      [`&.${inputLabelClasses.shrink}`]: {
        transform: 'translate(14px, -5px) scale(0.75)',
      }
    }),
    ...(variant === 'outlined' && size === 'small' && {
      top: '1px',
      [`&.${inputLabelClasses.shrink}`]: {
        transform: 'translate(14px, -7px) scale(0.75)',
      }
    })
  }
));
const Label: React.FC<InputLabelProps> = (props) => {
  const { children, ...labelProps } = props
  if (!children) return null
  return (
    <LabelRoot {...labelProps}>
      {children}
    </LabelRoot>
  )
}
