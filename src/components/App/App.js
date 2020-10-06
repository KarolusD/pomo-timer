import React, { useEffect, useState, useContext, useCallback } from 'react'
import './App.css'
import Page from '../Page/Page'
import Timer from '../Timer/Timer'
import NavBar from '../NavBar/NavBar'
import NavItem from '../NavItem/NavItem'
import settings from '../../assets/icons/settings.svg'
import volumeOn from '../../assets/icons/volume-on.svg'
import volumeOff from '../../assets/icons/volume-off.svg'
import close from '../../assets/icons/close.svg'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import MenuContextProvider from '../MenuContext/MenuContext'
import FinishModal from '../FinishModal/FinishModal'
import DropDown from '../DropDown/DropDown'

const App = () => {
  const [timerRuns, setTimerRuns] = useState(false)
  const [timerEnds, setTimerEnds] = useState(false)
  const [pomoStart, setPomoStart] = useState(false)
  const [passedPomos, setPassedPomos] = useState(0)
  const [timerState, setTimerState] = useState('pomo')

  const { handleThemeChange } = useContext(ThemeContext)

  useEffect(() => {
    if (
      typeof Storage !== 'undefined' &&
      localStorage.getItem('localPomodoroInfo')
    ) {
      const { passedPomos, lastPomoDate } = JSON.parse(
        localStorage.getItem('localPomodoroInfo')
      )
      if (lastPomoDate === new Date().toLocaleDateString()) {
        setPassedPomos(passedPomos)
      }
    } else {
      setPassedPomos(0)
    }
  }, [])

  const handleTimerState = () => {
    setTimerState(timerState === 'pomo' ? 'break' : 'pomo')
  }

  useEffect(() => {
    handleThemeChange(timerState)
  }, [handleThemeChange, timerState])

  const handleTimerRuns = (run) => {
    setTimerRuns(run)
  }

  const handleTimerEnds = (ends) => {
    setTimerEnds(ends)
  }

  const handleTimerReset = () => {
    setTimerState('pomo')
    setTimerRuns(false)
    setTimerEnds(false)
    setPomoStart(false)
  }

  const handlePomoStart = () => {
    setPomoStart(!pomoStart)
  }

  const handlePassedPomos = () => {
    setPassedPomos((passedPomos) => passedPomos + 1)
  }

  const settingLocalStorage = useCallback(() => {
    const localPomodoroInfo = {
      passedPomos: passedPomos,
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
  }, [passedPomos])

  useEffect(() => {
    settingLocalStorage()
  }, [passedPomos, settingLocalStorage])

  return (
    <MenuContextProvider>
      <Page>
        <NavBar>
          <NavItem icon={volumeOff} secondaryIcon={volumeOn} changeable sound />
          <NavItem icon={settings} secondaryIcon={close} changeable>
            <DropDown />
          </NavItem>
        </NavBar>
        <Timer
          timerState={timerState}
          timerRuns={timerRuns}
          timerEnds={timerEnds}
          pomoStart={pomoStart}
          passedPomos={passedPomos}
          handleTimerState={handleTimerState}
          handleTimerRuns={handleTimerRuns}
          handleTimerEnds={handleTimerEnds}
          handleTimerReset={handleTimerReset}
          handlePomoStart={handlePomoStart}
          handlePassedPomos={handlePassedPomos}
        />
      </Page>
      <FinishModal />
    </MenuContextProvider>
  )
}

export default App
