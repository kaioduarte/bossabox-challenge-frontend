import styled from 'styled-components'
import { Button as BsButton } from 'reactstrap'

const Button = styled(BsButton)`
  border: 0;
  border-color: transparent !important;
  border-radius: 5px;
`

export const ActionButton = styled(Button).attrs(props => ({
  color: props.variant || 'primary'
}))`
  background-color: ${props =>
    !props.variant
      ? props.theme.primary
      : props.theme[props.variant]} !important;
  color: ${props =>
    props.variant === 'secondary' ? props.theme.primary : 'white'} !important;
`
