import React from 'react'
import './App.css'
import Page from '../../components/Page/Page'
import Timer from '../../components/Timer/Timer'
import { ThemeContextProvider } from '../../components/ThemeContext/ThemeContext'

class App extends React.Component {
  state = {
    pomoTime: 10,
    breakTime: 5,
    timerRuns: false,
    timerState: 'pomo',
  }

  themeRef = React.createRef()
  //timerRef = React.createRef()

  handleTimerState = () => {
    this.setState(
      (prevState) => ({
        timerState: prevState.timerState === 'pomo' ? 'break' : 'pomo',
      }),
      () => this.themeRef.current.handleThemeChange(this.state.timerState)
    )
  }

  handleTimerRuns = () => {
    this.setState((prevState) => ({
      timerRuns: !prevState.timerRuns,
    }))
  }

  render() {
    const { timerState, pomoTime, breakTime } = this.state
    const { handleTimerState, handleTimerRuns, themeRef } = this
    return (
      <ThemeContextProvider ref={themeRef}>
        <Page>
          <Timer
            handleTimerState={handleTimerState}
            handleTimerRuns={handleTimerRuns}
            startingTimerTime={timerState === 'pomo' ? pomoTime : breakTime}
          />
        </Page>
      </ThemeContextProvider>
    )
  }
}

export default App
