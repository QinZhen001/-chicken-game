//游戏开始的入口
import {DataStore} from './js/base/DataStore.js'
import {Director} from './js/Director.js'
import {ResourceLoader} from './js/base/ResourceLoader.js'
import {BackGround} from './js/runtime/BackGround.js'
import {Birds} from './js/player/Birds.js'
import {ButtonA} from './js/runtime/ButtonA'
import {ButtonB} from './js/runtime/ButtonB'
import {Stone} from './js/runtime/Stone'
import {StartButton} from './js/player/StartButton'

export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()
    const loader = ResourceLoader.create()
    loader.onLoaded(map => this.onResourceFirstLoaded(map))
  }

  onResourceFirstLoaded(map) {
    this.dataStore.canvas = this.canvas
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.init()
  }

  init() {
    const firstY = 400
    const secondY = 450
    const thirdY = 500
    this.director.isGameOver = false
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

    // .put('land', Land)
    // .put('score', Score)
    // .put('startButton', StartButton);

    //创建铅笔要在游戏逻辑运行之前
    // this.director.createPencil()
    this.director.run();
    this.director.registerEvent()
    // this.director.initAnimation()
  }

}