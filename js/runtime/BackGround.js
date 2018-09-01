// 背景
import {Director} from '../Director.js'
import{Sprite} from '../base/Sprite.js'
import {DataStore} from '../base/DataStore.js'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export class BackGround extends Sprite {
  constructor() {
    const image = Sprite.getImage('background')
    super(image,
        0, 0,
        image.width, image.height,
        0, 0,
        DataStore.getInstance().canvas.width,
        DataStore.getInstance().canvas.height)
    this.top = 0
  }

  update() {
    this.top += 2

    if (this.top >= screenHeight)
      this.top = 0
  }


  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render() {
    super.draw(
        this.img,
        0,
        0,
        this.srcW,
        this.srcH,
        0,
        -screenHeight + this.top,
        DataStore.getInstance().canvas.width,
        DataStore.getInstance().canvas.height
    )

    super.draw(
        this.img,
        0,
        0,
        this.srcW,
        this.srcH,
        0,
        this.top,
        DataStore.getInstance().canvas.width,
        DataStore.getInstance().canvas.height
    )
  }
}