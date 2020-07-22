import React from 'react'
import './App.css'
import Page from '../../components/Page/Page'
import { ThemeContextProvider } from '../../components/ThemeContext/ThemeContext'

class App extends React.Component {
  render() {
    return (
      <ThemeContextProvider>
        <Page>
          <h1> Hello World!</h1>
        </Page>
      </ThemeContextProvider>
    )
  }
}

export default App
