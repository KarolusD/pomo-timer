import React, { Component } from 'react'
import breakSound from '../../assets/sounds/break-sound.mp3'
import longBreakSound from '../../assets/sounds/long-break-sound.mp3'
import pomoSound from '../../assets/sounds/pomo-sound.mp3'
import endSound from '../../assets/sounds/end-sound.mp3'
export const MenuContext = React.createContext()

class MenuContextProvider extends Component {
  state = {
    autoStartBreak: false,
    autoStartPomo: false,
    pomoTime: 3,
    breakTime: 3,
    longBreakTime: 600,
    longBreakEvery: 4,
    pomoRingtone: false,
    breakRingtone: false,
  }

  handleAutoStartBreak = () => {
    this.setState(({ autoStartBreak }) => ({
      autoStartBreak: !autoStartBreak,
    }))
  }

  handleAutoStartPomo = () => {
    this.setState(({ autoStartPomo }) => ({
      autoStartPomo: !autoStartPomo,
    }))
  }

  handlePomoTime = (time) => {
    this.setState({ pomoTime: time })
  }

  handleBreakTime = (time) => {
    this.setState({ breakTime: time })
  }

  handleLongBreakTime = (time) => {
    this.setState({ longBreakTime: time })
  }

  handleLongBreakEvery = (every) => {
    this.setState({ longBreakEvery: every })
  }

  handleRingtone = (timerState) => {
    console.log(timerState, 'audio sounds')
    const breakAudio = new Audio(breakSound)
    const longBreakAudio = new Audio(longBreakSound)
    const pomoAudio = new Audio(pomoSound)
    const endAudio = new Audio(endSound)
    if (timerState === 'break') {
      breakAudio.play()
    } else if (timerState === 'pomo') {
      pomoAudio.play()
    }
  }

  render() {
    const { Provider } = MenuContext
    const { children } = this.props
    return (
      <Provider
        value={{
          ...this.state,
          handleAutoStartBreak: this.handleAutoStartBreak,
          handleAutoStartPomo: this.handleAutoStartPomo,
          handlePomoTime: this.handlePomoTime,
          handleBreakTime: this.handleBreakTime,
          handleLongBreakTime: this.handleLongBreakTime,
          handleLongBreakEvery: this.handleLongBreakEvery,
          handleRingtone: this.handleRingtone,
        }}
      >
        {children}
      </Provider>
    )
  }
}

export default MenuContextProvider
