const score = document.querySelector('.score')
const start = document.querySelector('.start')
const gameArea = document.querySelector('.gameArea')
const car = document.createElement('div')
car.classList.add('car')

start.addEventListener('click', startGame)
document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stopRun)

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
}

const setting = {
  start: false,
  score: 0,
  speed: 3
}

function startGame() {
  start.classList.add('hide')
  setting.start = true
  gameArea.appendChild(car)
  requestAnimationFrame(playGame)
}

function playGame() {
  console.log('Play Game')
  if (setting.start) {
    requestAnimationFrame(playGame)
  } else {
    start.classList.remove('hide')
  }
}

function startRun(event) {
  event.preventDefault()
  if (keys[event.key] !== undefined) {
    keys[event.key] = true
    console.log(event.key)
  }
}

function stopRun(event) {
  event.preventDefault()
  if (keys[event.key] !== undefined) {
    keys[event.key] = false
    console.log(event.key)
  }
}
