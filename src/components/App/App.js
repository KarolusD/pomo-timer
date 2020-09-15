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
import MenuContextProvider from '../MenuContext/MenuContext'
const DropDown = React.lazy(() => import('../DropDown/DropDown'))

class App extends React.Component {
  state = {
    timerRuns: false,
    timerEnds: false,
    pomoStart: false,
    passedPomos: 0,
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
        passedPomos: 0,
      },
      () => this.themeRef.current.handleThemeChange(this.state.timerState)
    )
  }

  handlePomoStart = () => {
    this.setState(({ pomoStart }) => ({ pomoStart: !pomoStart }))
  }

  handlePassedPomos = () => {
    this.setState(({ passedPomos }) => ({ passedPomos: passedPomos + 1 }))
  }

  render() {
    const {
      timerState,
      timerRuns,
      pomoStart,
      timerEnds,
      passedPomos,
      passedTime,
    } = this.state

    const {
      handleTimerState,
      handleTimerRuns,
      handleTimerEnds,
      handleTimerReset,
      handlePomoStart,
      handlePassedPomos,
      handlePassedTime,
      themeRef,
    } = this

    return (
      <ThemeContextProvider ref={themeRef}>
        <MenuContextProvider>
          <Page>
            <NavBar>
              <NavItem
                icon={volumeOff}
                secondaryIcon={volumeOn}
                changeable
                sound
              />
              <NavItem icon={settings} secondaryIcon={close} changeable>
                <Suspense fallback={<div>Loading...</div>}>
                  <DropDown />
                </Suspense>
              </NavItem>
            </NavBar>
            <Timer
              timerState={timerState}
              timerRuns={timerRuns}
              timerEnds={timerEnds}
              pomoStart={pomoStart}
              passedPomos={passedPomos}
              passedTime={passedTime}
              handleTimerState={handleTimerState}
              handleTimerRuns={handleTimerRuns}
              handleTimerEnds={handleTimerEnds}
              handleTimerReset={handleTimerReset}
              handlePomoStart={handlePomoStart}
              handlePassedPomos={handlePassedPomos}
              handlePassedTime={handlePassedTime}
            />
          </Page>
        </MenuContextProvider>
      </ThemeContextProvider>
    )
  }
}

export default App
