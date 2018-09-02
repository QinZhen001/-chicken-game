/**
 * 简易的帧动画类实现
 */
import {DataStore} from './DataStore.js'

export class Animation {

  static getInstance() {
    if (!Animation.instance) {
      Animation.instance = new Animation()
    }
    return Animation.instance
  }

  constructor() {
    this.dataStore = DataStore.getInstance()
    this.ctx = this.dataStore.ctx
    // 当前动画是否播放中
    this.isPlaying = false
    // 动画是否需要循环播放
    this.loop = false
    // 每一帧的时间间隔
    this.interval = 1000 / 10
    // 帧定时器
    this.timer = null
    // 当前播放的帧
    this.index = -1
    // 总帧数
    this.count = 0
    // 帧图片集合
    this.imgList = []
  }

  /**
   * 初始化帧动画的所有帧
   * 为了简单，只支持一个帧动画
   */
  initFrames(imgList) {
    imgList.forEach((imgSrc) => {
      let img = wx.createImage()
      img.src = imgSrc
      this.imgList.push(img)
    })
    this.count = imgList.length
  }

  // 将播放中的帧绘制到canvas上
  draw() {
    let img = this.imgList[this.index]
    this.ctx.drawImage(
        img,
        0, 0,
        img.width, img.height,
        this.x, this.y,
        img.width * 2, img.height * 2
    )
  }

  // 播放预定的帧动画
  playAnimation(x = 0, y = 0, index = 0, loop = false) {
    this.x = x
    this.y = y
    // 动画播放的时候精灵图不再展示，播放帧动画的具体帧
    this.visible = false
    this.isPlaying = true
    this.loop = loop
    this.index = index
    if (this.interval > 0 && this.count) {
      this.timer = setInterval(
          () => this.frameLoop(),
          this.interval
      )
    }
  }

  // 停止帧动画播放
  stop() {
    this.isPlaying = false
    if (this.timer)
      clearInterval(this.timer)
  }

  // 帧遍历
  frameLoop() {
    this.draw()
    this.index++
    if (this.index > this.count - 1) {
      if (this.loop) {
        this.index = 0
      }
      else {
        this.index--
        this.stop()
      }
    }
  }
}
