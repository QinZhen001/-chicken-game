import{Sprite} from '../base/Sprite.js'
import {Director} from '../Director'
import {Animation} from '../base/Animation'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


export class Stone extends Sprite {
  constructor() {
    const image = Sprite.getImage('stone')
    super(image,
        0, 0,
        image.width, image.height,
        20, screenHeight,
        image.width / 1.5, image.height / 1.5
    )
    this.time = 0
  }


  draw() {
    let moveY = Director.getInstance().moveSpeed
    this.y = screenHeight - moveY * this.time

    super.draw(this.img,
        0, 0,
        this.img.width, this.img.height,
        20, this.y,
        this.img.width / 1.5, this.img.height / 1.5)

    this.time++
  }


  initExplosionAnimation() {
    let frames = []
    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19
    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }
    Animation.getInstance().initFrames(frames)
  }


}