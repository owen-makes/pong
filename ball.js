const INITIAL_VELOCITY = 0.01
const VELOCITY_INCREASE = 0.000001

export default class Ball{  
  constructor(ballElem){
    this.ballElem = ballElem
    this.reset()
  }

  get x(){
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'))
  }
  
  set x(value){
    this.ballElem.style.setProperty("--x", value)
  }
  
  get y(){
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'))
  }

  set y(value){
    this.ballElem.style.setProperty("--y", value)
  }

  rect(){
    return this.ballElem.getBoundingClientRect()
  }

  reset(){
    this.y = 50
    this.x = 50
    //Unit vector direction:
    this.direction = { x: 0 ,y:0}
    while(Math.abs(this.direction.x <= 0.2) || 
    Math.abs(this.direction.x >= 0.9)
  ) {
      const heading = randomNumberBetween(0, 360) //In radians
      this.direction = { x: Math.cos(heading), y: Math.sin(heading)} //Convert to unit vector
    }
    console.log(this.direction)
    this.velocity = INITIAL_VELOCITY
  }

  update(delta, paddleRects){
    this.x += this.direction.x * this.velocity * delta
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE * delta
    const rect = this.rect()

    if (rect.bottom > window.innerHeight || rect.top < 0){
      this.direction.x *= -1
    }

    if (paddleRects.some(r => isCollision(r,rect))) {
      this.direction.y *= -1
    }

  }
}

function randomNumberBetween(min,max){
  return Math.random() * (max - min) + min
}

function isCollision(r1, r2){
  return (
    r1.left <= r2.right &&
    r1.right >= r2.left &&
    r1.bottom >= r2.top &&
    r1.top <= r2.bottom
  )
}
