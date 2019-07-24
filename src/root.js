import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import App from './app'

const theme = {
  primary: '#365DF0',
  secondary: '#E1E7FD',
  danger: '#F95E5A',
  boldText: '#170C3A',
  lightText: '#8F8A9B',
  offgrey: '#B1ADB9',
  mostLightestBlue: '#E1E7FD'
}

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    background-color: ${theme.mostLightestBlue};
    height: 100vh;
  }
`

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <App />
      </>
    </ThemeProvider>
  )
}
