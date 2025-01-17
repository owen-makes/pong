
const SPEED = .005

export default class Paddle{  
  constructor(paddleElem){
    this.paddleElem = paddleElem
    this.reset()
  }

  get position(){
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue('--position'))
  }
  
  set position(value){
    this.paddleElem.style.setProperty("--position", value)
  }

  update(delta, ballHeight){
    this.position += SPEED * delta * (ballHeight - this.position)
  }

  rect(){
    return this.paddleElem.getBoundingClientRect()
  }
  
  reset(){
    this.position = 50
  }
}
  