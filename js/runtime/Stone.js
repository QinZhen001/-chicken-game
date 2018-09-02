import{Sprite} from '../base/Sprite.js'
import {Director} from '../Director'
import {Animation} from '../base/Animation'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


export class Stone extends Sprite {
  constructor(location) {
    const image = Sprite.getImage('stone')
    super(image,
        screenWidth, screenHeight,
        image.width, image.height,
        screenWidth, screenHeight,
        image.width / 1.5, image.height / 1.5
    )
    const LocArr = ['left', 'right']
    this.location = location ? location : LocArr[Math.round(Math.random())]   //出现的位置 left 或 right
    this.moveSpeed = Director.getInstance().moveSpeed
    this.time = 0
  }


  draw() {
    this.y = screenHeight - this.moveSpeed * this.time
    this.x = this.location === 'left' ? 20 : (screenWidth - 20 - this.img.width / 1.5)
    super.draw(this.img,
        0, 0,
        this.img.width, this.img.height,
        this.x, this.y,
        this.img.width / 1.5, this.img.height / 1.5)

    this.time++
  }


  //类方法 初始化爆炸动画
  static initExplosionAnimation() {
    let frames = []
    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19
    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }
    Animation.getInstance().initFrames(frames)
  }


}