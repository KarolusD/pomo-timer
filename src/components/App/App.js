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
import FinishModal from '../FinishModal/FinishModal'
const DropDown = React.lazy(() => import('../DropDown/DropDown'))

class App extends React.Component {
  state = {
    timerRuns: false,
    timerEnds: false,
    pomoStart: false,
    passedPomos: 0,
    timerState: 'pomo',
  }

  componentDidMount() {
    // TODO: if last passed pomo time is from yesterday set passedPomos to 0
    // TODO: if last passed pomo time is from today set it in the app
    if (
      typeof Storage !== 'undefined' &&
      localStorage.getItem('localPomodoroInfo')
    ) {
      const { passedPomos, lastPomoDate } = JSON.parse(
        localStorage.getItem('localPomodoroInfo')
      )
      if (lastPomoDate === new Date().toLocaleDateString()) {
        this.setState({
          passedPomos: passedPomos,
        })
      }
    } else {
      this.setState({ passedPomos: 0 })
    }
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
    this.setState(({ pomoStart }) => ({ pomoStart: !pomoStart }))
  }

  handlePassedPomos = () => {
    // TODO: set last passed pomo time to localStorage
    // TODO: set number of passed pomos to localStorage
    this.setState(
      ({ passedPomos }) => ({ passedPomos: passedPomos + 1 }),
      () => this.settingLocalStorage()
    )
  }

  settingLocalStorage = () => {
    const localPomodoroInfo = {
      passedPomos: this.state.passedPomos,
      lastPomoDate: new Date().toLocaleDateString(),
    }

    if (typeof Storage !== 'undefined') {
      localStorage.setItem(
        'localPomodoroInfo',
        JSON.stringify(localPomodoroInfo)
      )
    } else {
      console.info('Local storage not support by this browser')
    }
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
          <FinishModal />
        </MenuContextProvider>
      </ThemeContextProvider>
    )
  }
}

export default App
