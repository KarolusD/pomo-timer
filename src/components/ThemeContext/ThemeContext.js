import React, { useState } from 'react'
import { themes } from '../../theme/theme'

export const ThemeContext = React.createContext()

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.pomo)

  const handleThemeChange = (timerState) => {
    setTheme(timerState === 'pomo' ? themes.pomo : themes.break)
  }

  const { Provider } = ThemeContext

  return <Provider value={{ theme, handleThemeChange }}>{children}</Provider>
}

export default ThemeContextProvider
