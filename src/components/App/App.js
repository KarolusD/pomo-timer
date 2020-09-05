import React, { Suspense } from 'react'
import './App.css'
import Page from '../Page/Page'
import Timer from '../Timer/Timer'
import NavBar from '../NavBar/NavBar'
import NavItem from '../NavItem/NavItem'
import settings from '../../assets/icons/settings.svg'
import volumeOn from '../../assets/icons/volume-on.svg'
import volumeOff from '../../assets/icons/volume-off.svg'
import close from '../../assets/icons/close.svg'
import { ThemeContextProvider } from '../ThemeContext/ThemeContext'
import MenuContextProvider, { MenuContext } from '../MenuContext/MenuContext'
const DropDown = React.lazy(() => import('../DropDown/DropDown'))

class App extends React.Component {
  state = {
    timerRuns: false,
    timerEnds: false,
    pomoStart: false,
    timerState: 'pomo',
    passedPomos: 0,
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
        passedPomos: 0,
      },
      () => this.themeRef.current.handleThemeChange(this.state.timerState)
    )
  }

  handlePomoStart = () => {
    this.setState({ pomoStart: true })
  }

  handlePassedPomos = () => {
    this.setState(({ passedPomos }) => ({ passedPomos: passedPomos + 1 }))
  }

  handleStartingTime = (menuContext) => {
    const { longBreakEvery, pomoTime, breakTime, longBreakTime } = menuContext
    const { passedPomos, timerState } = this.state

    if (
      passedPomos !== 0 &&
      passedPomos % longBreakEvery === 0 &&
      timerState === 'break'
    ) {
      return longBreakTime
    } else if (timerState === 'break') {
      return breakTime
    } else if (timerState === 'pomo') {
      return pomoTime
    }
  }

  render() {
    const {
      timerState,
      timerRuns,
      pomoStart,
      timerEnds,
      passedPomos,
    } = this.state

    const {
      handleTimerState,
      handleTimerRuns,
      handleTimerEnds,
      handleTimerReset,
      handlePomoStart,
      handlePassedPomos,
      handleStartingTime,
      themeRef,
    } = this

    return (
      <ThemeContextProvider ref={themeRef}>
        <MenuContextProvider>
          <MenuContext.Consumer>
            {(menuState) => (
              <Page>
                <NavBar>
                  <NavItem icon={volumeOff} />
                  <NavItem icon={settings} secondaryIcon={close} changeable>
                    <Suspense fallback={<div>Loading...</div>}>
                      <DropDown />
                    </Suspense>
                  </NavItem>
                </NavBar>
                <Timer
                  handleTimerState={handleTimerState}
                  handleTimerRuns={handleTimerRuns}
                  handleTimerEnds={handleTimerEnds}
                  handleTimerReset={handleTimerReset}
                  handlePomoStart={handlePomoStart}
                  handlePassedPomos={handlePassedPomos}
                  startingTimerTime={handleStartingTime(menuState)}
                  timerState={timerState}
                  timerRuns={timerRuns}
                  timerEnds={timerEnds}
                  pomoStart={pomoStart}
                  passedPomos={passedPomos}
                />
              </Page>
            )}
          </MenuContext.Consumer>
        </MenuContextProvider>
      </ThemeContextProvider>
    )
  }
}

export default App
