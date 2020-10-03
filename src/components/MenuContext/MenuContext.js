import React from 'react'
import breakSound from '../../assets/sounds/break-sound.mp3'
import longBreakSound from '../../assets/sounds/long-break-sound.mp3'
import pomoSound from '../../assets/sounds/pomo-sound.mp3'
import endSound from '../../assets/sounds/end-sound.mp3'
import useLocalStorageInput from '../../hooks/useLocalStorageInput'
import useLocalStorageToggle from '../../hooks/useLocalStorageToggle'
export const MenuContext = React.createContext()

const MenuContextProvider = ({ children }) => {
  const [autoStartPomo, handleAutoStartPomo] = useLocalStorageToggle(
    false,
    'localPomodoroSettings',
    'autoStartPomo'
  )

  const [autoStartBreak, handleAutoStartBreak] = useLocalStorageToggle(
    false,
    'localPomodoroSettings',
    'autoStartBreak'
  )

  const [pomoTime, handlePomoTime] = useLocalStorageInput(
    1500,
    'localPomodoroSettings',
    'pomoTime'
  )

  const [breakTime, handleBreakTime] = useLocalStorageInput(
    300,
    'localPomodoroSettings',
    'breakTime'
  )

  const [longBreakTime, handleLongBreakTime] = useLocalStorageInput(
    900,
    'localPomodoroSettings',
    'longBreakTime'
  )

  const [longBreakEvery, handleLongBreakEvery] = useLocalStorageInput(
    4,
    'localPomodoroSettings',
    'longBreakEvery'
  )

  const [pomoRingtone, handlePomoRingtone] = useLocalStorageToggle(
    true,
    'localPomodoroSettings',
    'pomoRingtone'
  )

  const [breakRingtone, handleBreakRingtone] = useLocalStorageToggle(
    true,
    'localPomodoroSettings',
    'breakRingtone'
  )

  const [soundOn, handleSoundOn] = useLocalStorageToggle(
    true,
    'localPomodoroSettings',
    'soundOn'
  )

  const [focusGoal, handleFocusGoal] = useLocalStorageInput(
    6000,
    'localPomodoroSettings',
    'focusGoal'
  )

  const handlePlaySound = (sound) => {
    const pomoAudio = new Audio(pomoSound)
    const breakAudio = new Audio(breakSound)
    const longBreakAudio = new Audio(longBreakSound)
    const endAudio = new Audio(endSound)

    switch (sound) {
      case 'pomo':
        pomoAudio.play()
        break
      case 'long break':
        longBreakAudio.play()
        break
      case 'break':
        breakAudio.play()
        break
      case 'end':
        endAudio.play()
        break
      default:
        break
    }
  }

  const { Provider } = MenuContext

  return (
    <Provider
      value={{
        autoStartPomo,
        autoStartBreak,
        pomoTime,
        breakTime,
        longBreakTime,
        longBreakEvery,
        pomoRingtone,
        breakRingtone,
        soundOn,
        focusGoal,
        handleAutoStartBreak,
        handleAutoStartPomo,
        handlePomoTime,
        handleBreakTime,
        handleLongBreakTime,
        handleLongBreakEvery,
        handlePomoRingtone,
        handleBreakRingtone,
        handlePlaySound,
        handleSoundOn,
        handleFocusGoal,
      }}
    >
      {children}
    </Provider>
  )
}

export default MenuContextProvider
