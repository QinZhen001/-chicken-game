import {Sprite} from '../base/Sprite.js'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export class StartButton extends Sprite {
  constructor() {
    const image = Sprite.getImage('startButton');
    super(
        image,
        0, 0,
        image.width, image.height,
        (screenWidth - image.width) / 2,
        (screenHeight - image.height) / 2.5,
        image.width, image.height
    );
  }

  draw() {
    super.draw()
    this.drawText()
  }

  drawText() {
    this.dataStore.ctx.font = '16px Arial 600'
    this.dataStore.ctx.fillStyle = '#000'
    this.dataStore.ctx.fillText(
        "游戏结束",
        (screenWidth - this.img.width) / 2,
        (screenHeight / 2.5) + this.img.height,
    )
  }
}