const score = document.querySelector('.score')
const start = document.querySelector('.start')
const startLevel = document.querySelectorAll('.start-game button')
const gameArea = document.querySelector('.gameArea')
const car = document.createElement('div')
const win = document.getElementById('you-win')
car.classList.add('car')
gameArea.classList.add('hide')

const player = {
  name: null,
  score: null
}

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
}

const setting = {
  start: false,
  score: 0,
  speed: 1,
  traffic: 6
}

startLevel.forEach($el => {
  switch ($el.dataset.level) {
    case 'lite':
      setting.speed = 3
      $el.addEventListener('click', startGame)
    break;
    case 'middle':
      setting.speaffic = 4
      $el.addEventListener('click', startGame)
      break;
    case 'hard':
      setting.speed = 8
      $el.addEventListener('click', startGame)
      break;
  }
})
document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stopRun)

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1
}
function storage(score) {
  if (score) {
    if (!localStorage.nfjs) {
      localStorage.nfjs = JSON.stringify({score})
      win.classList.remove('hide')
    } else {
      const bestScore = JSON.parse(localStorage.nfjs).score
      if (bestScore < score) {
        localStorage.nfjs = JSON.stringify({score})
        win.classList.remove('hide')
      }
    }
  }
}
function startGame() {
  start.classList.add('hide')
  gameArea.classList.remove('hide')
  win.classList.add('hide')
  gameArea.innerHTML = ''
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div')
    line.classList.add('line')
    line.style.top = (i * 100) + 'px'
    line.y = i * 100
    gameArea.appendChild(line)
  }
  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div')
    enemy.id = 'enemy'
    enemy.y = -100 * setting.traffic * (i + 1)
    enemy.style.top = enemy.y + 'px'
    enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px'
    gameArea.appendChild(enemy)
  }
  soundGame(true)
  setting.start = true
  setting.score = 0
  gameArea.appendChild(car)
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2 + 'px'
  car.style.top = 'auto'
  car.style.bottom = '10px'
  setting.x = car.offsetLeft
  setting.y = car.offsetTop
  requestAnimationFrame(playGame)
}

function soundGame(sound) {
  if (sound) {
    const audio = document.createElement('audio')
    audio.id = 'sound'
    audio.autoplay = true
    audio.loop = true
    audio.src = 'sound/car_sound.mp3'
    gameArea.appendChild(audio)
  } else {
    const audio = document.getElementById('sound')
    audio.muted = true
  }
}

function playGame() {
  if (setting.start) {
    setting.score += setting.speed
    score.textContent = 'SCORE: ' + setting.score
    moveRoad()
    moveEnemy()
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight - 3)) {
      setting.y += setting.speed
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed
    }
    car.style.left = setting.x + 'px'
    car.style.top = setting.y + 'px'
    requestAnimationFrame(playGame)
  }
}

function startRun(event) {
  event.preventDefault()
  if (keys[event.key] !== undefined) {
    keys[event.key] = true
  }
}

function stopRun(event) {
  event.preventDefault()
  if (keys[event.key] !== undefined) {
    keys[event.key] = false
  }
}

function moveRoad() {
  let lines = document.querySelectorAll('.line')
  lines.forEach((line) => {
    line.y += setting.speed
    line.style.top = line.y + 'px'
    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100
    }
  })
}

function moveEnemy() {
  let enemy = document.querySelectorAll('#enemy')
  enemy.forEach((item, index) => {
    let carRect = car.getBoundingClientRect()
    let enemyRect = item.getBoundingClientRect()
    if (carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left &&
      carRect.left <= enemyRect.right &&
      carRect.bottom >= enemyRect.top) {
      setting.start = false
      start.classList.remove('hide')
      gameArea.classList.add('hide')
      start.style.top = score.offsetHeight
      soundGame(false)
      storage(setting.score)
    }
    if (index % 2) {
      item.className = 'enemy'
    } else {
      item.className = 'enemy2'
    }
    item.y += setting.speed / 2
    item.style.top = item.y + 'px'
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic
      item.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px'

    }
  })
}
