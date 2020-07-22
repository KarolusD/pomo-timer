import React from 'react'
import { themes } from '../../theme/theme'
const { Provider, Consumer } = React.createContext(themes.pomo)

class ThemeContextProvider extends React.Component {
  state = {
    theme: themes.pomo,
  }
  render() {
    const { theme } = this.state
    const { children } = this.props

    return <Provider value={theme}>{children}</Provider>
  }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer }
