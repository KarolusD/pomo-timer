import React from 'react'
import './App.css'
import Page from '../../components/Page/Page'
import Timer from '../../components/Timer/Timer'
import { ThemeContextProvider } from '../../components/ThemeContext/ThemeContext'

class App extends React.Component {
  state = {
    pomoTime: 630,
    breakTime: 5,
    timerRuns: false,
    timerEnds: false,
    pomoStart: false,
    timerState: 'pomo',
  }

  themeRef = React.createRef()

  handleTimerState = () => {
    this.setState(
      (prevState) => ({
        timerState: prevState.timerState === 'pomo' ? 'break' : 'pomo',
      }),
      () => this.themeRef.current.handleThemeChange(this.state.timerState)
    )
  }

  handleTimerRuns = (run) => {
    this.setState({ timerRuns: run })
  }

  handleTimerEnds = (ends) => {
    this.setState({ timerEnds: ends })
  }

  handleTimerReset = () => {
    this.setState(
      {
        timerState: 'pomo',
        timerRuns: false,
        timerEnds: false,
        pomoStart: false,
      },
      () => this.themeRef.current.handleThemeChange(this.state.timerState)
    )
  }

  handlePomoStart = () => {
    this.setState({ pomoStart: true })
  }

  render() {
    const {
      timerState,
      pomoTime,
      breakTime,
      timerRuns,
      pomoStart,
      timerEnds,
    } = this.state
    const {
      handleTimerState,
      handleTimerRuns,
      handleTimerEnds,
      handleTimerReset,
      handlePomoStart,
      themeRef,
    } = this
    return (
      <ThemeContextProvider ref={themeRef}>
        <Page>
          <Timer
            handleTimerState={handleTimerState}
            handleTimerRuns={handleTimerRuns}
            handleTimerEnds={handleTimerEnds}
            handleTimerReset={handleTimerReset}
            handlePomoStart={handlePomoStart}
            startingTimerTime={timerState === 'pomo' ? pomoTime : breakTime}
            timerState={timerState}
            timerRuns={timerRuns}
            timerEnds={timerEnds}
            pomoStart={pomoStart}
          />
        </Page>
      </ThemeContextProvider>
    )
  }
}

export default App
