const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonStop = document.querySelector('.stop')
const buttonSet = document.querySelector('.set')
const buttonPlus = document.querySelector('.plus')
const buttonMinus = document.querySelector('.minus')
let minutesDisplay = document.querySelector('.minutes')
let secondsDisplay = document.querySelector('.seconds')
let minutes = Number(minutesDisplay.textContent)
let timerTimeOut

import Sounds from "./sounds.js"

const sounds = Sounds()

function resetControls() {
  buttonStop.classList.add('hide')
  buttonSet.classList.remove('hide')
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
}

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countdown() {
  timerTimeOut = setTimeout( function() {
    let minutes = Number(minutesDisplay.textContent)
    let seconds = Number(secondsDisplay.textContent)

    if (minutes <= 0 && seconds <=0) {
      updateDisplay()
      resetControls()
      return
    }

    if (seconds <= 0) {
      seconds = 7
      --minutes
    }
  
     updateDisplay(minutes, (seconds- 1))

    countdown()
  }, 1000)
}


buttonPlay.addEventListener('click', function() {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonStop.classList.remove('hide')
  buttonSet.classList.add('hide')
  countdown()
})

buttonPause.addEventListener('click', function() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
  clearTimeout(timerTimeOut)
})

buttonStop.addEventListener('click', function(){
  resetControls()
  resetTimer()
} )

buttonSet.addEventListener('click', function() {
  let newMinutes = Number(prompt('Quantos minutos?'))
  if (!newMinutes) {
    resetTimer()
    return
  }
  minutes = newMinutes
  updateDisplay(minutes, 0)
})
