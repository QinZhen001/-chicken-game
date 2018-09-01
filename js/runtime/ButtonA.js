import{Sprite} from '../base/Sprite.js'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export class ButtonA extends Sprite {
  constructor() {
    const image = Sprite.getImage('icon_a')
    super(image,
        0, 0,
        image.width, image.height,
        50, screenHeight - 100,
        image.width, image.height
    )
  }

}