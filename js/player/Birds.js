// 人物类 这里用小鸟来模拟
// 人物做落下动画 要确定好起点和终点
import {Sprite} from '../base/Sprite.js'
import {getRandomDecimal} from '../util/index'



export class Birds extends Sprite {
  //传入终点坐标
  constructor(lastX = 10, lastY = 400, text = "其他", number) {
    const image = Sprite.getImage('birds')
    super(image,
        0, 0,
        image.width, image.height,
        0, 0,
        image.width, image.height)

    //小鸟的状态用一个数组去存储
    //小鸟的宽是34 高24 上下边距10 小鸟的左右9
    this.clippingX = [
      9,
      9 + 34 + 18,
      9 + 34 + 18 + 34 + 18
    ]
    this.clippingY = [10, 10, 10]
    this.clippingWidth = [34, 34, 34]
    this.clippingHeight = [24, 24, 24]
    const birdX = 0
    const birdY = 0
    this.birdsX = [birdX, birdX, birdX]
    this.birdsY = [birdY, birdY, birdY]
    const birdWidth = 34
    const birdHeight = 24
    this.birdsWidth = [birdWidth, birdWidth, birdWidth]
    this.birdHeight = [birdHeight, birdHeight, birdHeight]
    this.x = [birdX, birdX, birdX]
    this.y = [birdY, birdY, birdY]
    this.lastX = lastX //结束时x坐标
    this.lastY = lastY //结束时y坐标
    this.number = number //当前人物的序号
    this.location = this.calcLocation()  //计算当前人物的位置 left 或 right
    this.index = 0 //展示精灵图的第几个部分
    this.count = 0  //计数器 计算index
    this.time = 0 //计数器 计算时间
    this.g = 0.98 / getRandomDecimal(6, 15) //模拟重力加速度(这里其实也是加速度)
    this.xDirection = (this.birdsX[0] - this.lastX) < 0  //x轴的移动方向 true表示x轴的正向 false表示x轴的负方向
    this.yDirection = (this.birdsY[0] - this.lastY) < 0  //y轴的移动方向 true表示y轴的正向 false表示y轴的负方向
    this.text = text + this.number//要绘制的文字
  }


  initDraw() {
    //切换三只小鸟的速度
    const changeSpeed = 0.2
    this.count = this.count + changeSpeed
    //0 1 2
    if (this.index >= 2) {
      this.count = 0
    }
    // 减速器作用
    this.index = Math.floor(this.count)

    let offsetY, offsetX

    //小鸟的位移
    offsetY = (this.g * this.time * (this.time)) / 2
    offsetX = offsetY / 1.2
    for (let i = 0; i <= 2; i++) {
      if (this.xDirection) {
        //向x轴正向移动
        this.birdsX[i] < this.lastX ? this.birdsX[i] = this.x[i] + offsetX : this.birdsX[i] = this.lastX
      } else {
        //向x轴负向移动
        this.birdsX[i] > this.lastX ? this.birdsX[i] = this.x[i] - offsetX : this.birdsX[i] = this.lastX
      }

      if (this.yDirection) {
        //向y轴正向移动
        this.birdsY[i] < this.lastY ? this.birdsY[i] = this.y[i] + offsetY : this.birdsY[i] = this.lastY
      } else {
        //向y轴负向移动
        this.birdsY[i] > this.lastY ? this.birdsY[i] = this.y[i] - offsetY : this.birdsY[i] = this.lastY
      }
    }
    this.time++
    super.draw(
        this.img,
        this.clippingX[this.index], this.clippingY[this.index],
        this.clippingWidth[this.index], this.clippingHeight[this.index],
        this.birdsX[this.index], this.birdsY[this.index],
        this.birdsWidth[this.index], this.birdHeight[this.index]
    )
    if (this.text)
      this.drawText()
  }

  drawText() {
    this.dataStore.ctx.font = '12px Arial'
    this.dataStore.ctx.fillStyle = '#000'
    this.dataStore.ctx.fillText(
        this.text,
        this.birdsX[0] + 2,
        this.birdsY[0] + this.birdHeight[0] + 15,
        this.birdsWidth[0]
    )
  }


  calcLocation() {
    if ((this.number >= 1 && this.number <= 3) ||
        (this.number >= 7 && this.number <= 9) ||
        (this.number >= 13 && this.number <= 15)) {
      return 'left'
    }
    return 'right'
  }

  change(lastX, lastY, number, location) {
    this.x = this.birdsX
    this.y = this.birdsY
    this.lastX = lastX
    this.lastY = lastY
    this.number = number
    this.location = location
    this.xDirection = (this.birdsX[0] - this.lastX) < 0
    this.yDirection = (this.birdsY[0] - this.lastY) < 0
    this.g = 0.98 / getRandomDecimal(15, 20)
    this.time = 0
  }

}