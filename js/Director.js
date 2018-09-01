// 导演类，控制游戏逻辑
import {DataStore} from './base/DataStore.js'
// import {Animation} from './base/Animation'
import {BackGround} from './runtime/BackGround'
import {Birds} from './player/Birds.js'
import {ButtonA} from './runtime/ButtonA'
import {ButtonB} from './runtime/ButtonB'
import {Stone} from './runtime/Stone'
import {StartButton} from './player/StartButton'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export class Director {
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  constructor() {
    this.dataStore = DataStore.getInstance()
    this.moveSpeed = 2 //移动速度
  }


  run() {
    this.checkIsGameOver()
    if (!this.isGameOver) {
      this.dataStore.get('background').update();
      this.dataStore.get('background').render()
      let len = this.dataStore.get('birdsNum')
      for (let i = 1; i <= len; i++) {
        this.dataStore.get(`bird${i}`).initDraw()
      }
      this.dataStore.get('buttonA').draw()
      this.dataStore.get('buttonB').draw()
      this.drawText()

      if (this.dataStore.get('showStoneFlag')) {
        this.dataStore.get('stone').draw()
      }

      let timer = requestAnimationFrame(() => this.run())
      this.dataStore.put('timer', timer)
    } else {
      console.log('游戏结束')
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.get('startButton').draw();
      wx.vibrateShort({});
      this.dataStore.destroy();
      //触发微信小游戏垃圾回收
      wx.triggerGC();
    }
  }


  registerEvent() {
    wx.onTouchStart((res) => {
      // console.log(res.changedTouches[0].clientX, res.changedTouches[0].clientY)
      const result = this.checkClick(res.changedTouches[0].clientX, res.changedTouches[0].clientY)
      switch (result) {
        case 'buttonA':
          this.onClickBtnA()
          break
        case 'buttonB':
          this.onClickBtnB()
          break
        case 'stone':
          this.onClickCallStone()
          break
        case 'restart':
          this.restart()
          break
      }
    })
  }

  checkClick(TouchX, TouchY) {
    if (!this.isGameOver) {
      if (TouchX >= 50 && TouchX <= 90 &&
          TouchY >= (screenHeight - 100) &&
          TouchY <= (screenHeight - 100 + 40)) {
        return 'buttonA'
      }
      if (TouchX >= (screenWidth - 50 - 40) &&
          TouchX <= (screenWidth - 50) &&
          TouchY >= (screenHeight - 100) &&
          TouchY <= (screenHeight - 100 + 40)) {
        return 'buttonB'
      }
      if (TouchX >= ((screenWidth / 2) - 32) &&
          TouchX <= ((screenWidth / 2) + 32) &&
          TouchY >= 100 &&
          TouchY <= 120 + 16) {
        return 'stone'
      }
    } else {
      if (TouchX >= ((screenWidth / 2) - 32) &&
          TouchX <= ((screenWidth / 2) + 32) &&
          TouchY >= screenHeight / 2.5 &&
          TouchY <= screenHeight / 2.5 + 70) {
        return 'restart'
      }
    }
  }

  onClickBtnA() {
    // orginBird.text要包括 用户
    let orginBird = this.dataStore.get('bird1')
    if (orginBird.location === 'left' || !orginBird.text.includes('用户'))
      return
    let targetBird = this.dataStore.get('bird17')
    let tempBird = {}

    tempBird.birdsX = orginBird.birdsX
    tempBird.birdsY = orginBird.birdsY
    tempBird.location = orginBird.location
    tempBird.number = orginBird.number


    orginBird.change(targetBird.birdsX[0], targetBird.birdsY[0], targetBird.number, targetBird.location)
    targetBird.change(tempBird.birdsX[0], tempBird.birdsY[0], tempBird.number, tempBird.location)

  }

  onClickBtnB() {
    let orginBird = this.dataStore.get('bird1')
    if (orginBird.location === 'right' || !orginBird.text.includes('用户'))
      return
    let targetBird = this.dataStore.get('bird17')
    let tempBird = {}

    tempBird.birdsX = orginBird.birdsX
    tempBird.birdsY = orginBird.birdsY
    tempBird.location = orginBird.location
    tempBird.number = orginBird.number


    orginBird.change(targetBird.birdsX[0], targetBird.birdsY[0], targetBird.number, targetBird.location)
    targetBird.change(tempBird.birdsX[0], tempBird.birdsY[0], tempBird.number, tempBird.location)
  }


  onClickCallStone() {
    this.dataStore.put('showStoneFlag', true)
  }

  restart() {
    const firstY = 400
    const secondY = 450
    const thirdY = 500
    //初始化时 将图片放入dataStore
    this.dataStore
        .put('background', BackGround)
        .put('buttonA', ButtonA)
        .put('buttonB', ButtonB)
        .put('stone', Stone)
        .put('startButton', StartButton)
        .put('bird1', new Birds(10, thirdY, "用户", 1))    //小鸟的宽是34 高24
        .put('bird2', new Birds(10 + 34 + 25, thirdY, "其他", 2))    //小鸟和小鸟之间的间距是25
        .put('bird3', new Birds(10 + 34 + 25 + 34 + 25, thirdY, "其他", 3))
        .put('bird4', new Birds(375 - 10 - 34 - 25 - 34 - 25 - 34, thirdY, "其他", 4))
        .put('bird5', new Birds(375 - 10 - 34 - 25 - 34, thirdY, "其他", 5))
        .put('bird6', new Birds(375 - 10 - 34, thirdY, "其他", 6))
        .put('bird7', new Birds(10, secondY, "其他", 7))
        .put('bird8', new Birds(10 + 34 + 25, secondY, "其他", 8))
        .put('bird9', new Birds(10 + 34 + 25 + 34 + 25, secondY, "其他", 9))
        .put('bird10', new Birds(375 - 10 - 34 - 25 - 34 - 25 - 34, secondY, "其他", 10))
        .put('bird11', new Birds(375 - 10 - 34 - 25 - 34, secondY, "其他", 11))
        .put('bird12', new Birds(375 - 10 - 34, secondY, "其他", 12))
        .put('bird13', new Birds(10, firstY, "其他", 13))
        .put('bird14', new Birds(10 + 34 + 25, firstY, "其他", 14))
        .put('bird15', new Birds(10 + 34 + 25 + 34 + 25, firstY, "其他", 15))
        .put('bird16', new Birds(375 - 10 - 34 - 25 - 34 - 25 - 34, firstY, "其他", 16))
        .put('bird17', new Birds(375 - 10 - 34 - 25 - 34, firstY, "其他", 17))
        .put('bird18', new Birds(375 - 10 - 34, firstY, "其他", 18))
        .put('birdsNum', 18)
        .put('showStoneFlag', false)

    this.isGameOver = false
    this.run();
  }

  drawText() {
    this.dataStore.ctx.font = '16px Arial'
    this.dataStore.ctx.fillStyle = '#ddd'
    this.dataStore.ctx.fillText(
        "召唤石头",
        screenWidth / 2 - 32,
        120)
  }

  //判断游戏是否结束
  checkIsGameOver() {
    // 小鸟边框模型
    let bird = this.dataStore.get('bird2')
    const birdsBorder = {
      top: bird.birdsY[0],
      bottom: bird.birdsY[0] + bird.birdHeight[0],
      left: bird.birdsX[0],
      right: bird.birdsX[0] + bird.birdsWidth[0]
    }

    //撞击物的边框模型
    let stone = this.dataStore.get('stone')
    const StoneBorder = {
      top: stone.y,
      bottom: stone.y + stone.height,
      left: stone.x,
      right: stone.x + stone.width
    }


    if (Director.isStrike(birdsBorder, StoneBorder)) {
      console.log('撞到了');
      this.isGameOver = true;
      return
    }

  }

  /**
   * 简单的碰撞检测定义：
   * 小的精灵的中心点处于大的精灵所在的矩形内即可
   */
  static isStrike(bird, stone) {

    // const spX = bird.top + sp.width / 2
    const spX = bird.left + (bird.right - bird.left) / 2
    const spY = bird.top + (bird.bottom - bird.top) / 2

    //撞击情况
    if (spX >= stone.left &&
        spX <= stone.right &&
        spY >= stone.top &&
        spY <= stone.bottom
    ) {
      return true
    }

    return false
  }


  // initAnimation() {
  //   this.animation = Animation.getInstance()
  //   this.dataStore.get('stone').initExplosionAnimation()
  // }

}