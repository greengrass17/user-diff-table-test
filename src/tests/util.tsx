import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../components/withTheme'

function customRender(ui : React.ReactElement, { ...options } = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    )
  })
}

export * from '@testing-library/react'
export { customRender as render }
