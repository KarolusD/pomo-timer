import React, { Component } from 'react'
import { themes } from '../../theme/theme'
const ThemeContext = React.createContext(themes.pomo)
const { Provider, Consumer } = ThemeContext

class ThemeContextProvider extends Component {
  state = {
    theme: themes.pomo,
  }

  handleThemeChange = (timerState) => {
    this.setState({
      theme: timerState === 'pomo' ? themes.pomo : themes.break,
    })
  }

  render() {
    const { theme } = this.state
    const { children } = this.props

    return <Provider value={theme}>{children}</Provider>
  }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer, ThemeContext }
