import{Sprite} from '../base/Sprite.js'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export class ButtonB extends Sprite {
  constructor() {
    const image = Sprite.getImage('icon_b')
    super(image,
        0, 0,
        image.width, image.height,
        screenWidth - 50 - 40, screenHeight - 100,
        image.width, image.height
    )
  }

}