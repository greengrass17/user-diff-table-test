import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const StyledButton = withStyles({
  root: {
    background: '#03a9f4'
  },
  label: {
    textTransform: 'initial'
  }
})(Button)

export default StyledButton
