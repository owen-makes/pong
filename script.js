import Ball from './ball.js'
import Paddle from './paddle.js'

const ball = new Ball(document.getElementById('ball'))
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const computerPaddle = new Paddle(document.getElementById('computer-paddle'))
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')
let lastTime

function update(time) {
  if (lastTime != null){
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(),computerPaddle.rect()])
    computerPaddle.update(delta, ball.x)

    if (isLose()){
      handleLose()
    }
  }
  
  lastTime = time

  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
  if (rect.right > window.innerWidth || rect.left < 0){
    console.log('lose')
    return true
  }
}

function handleLose(){
  const rect = ball.rect()
  console.log(rect)
  if (rect.right >= window.innerWidth){
    playerScore.textContent = parseInt(playerScore.textContent) + 1
  } else {
    computerScore.textContent = parseInt(computerScore.textContent) + 1
  }
  ball.reset()
  playerPaddle.reset()
  computerPaddle.reset()
}

document.addEventListener('mousemove', e=>{
  playerPaddle.position = (e.y /window.innerHeight) *100
})

window.requestAnimationFrame(update)
