import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import ThemeContextProvider from './components/ThemeContext/ThemeContext'

ReactDOM.render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>,
  document.getElementById('root')
)
