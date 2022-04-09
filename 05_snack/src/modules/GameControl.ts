import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制类
class GameControl {
  snake: Snake; // 蛇
  food: Food; // 食物
  scorePanel: ScorePanel; // 记分牌
  direction: string = "Right"; // 创建一个属性来记录蛇的移动方向
  isLive: boolean = true; // 创建一个属性来记录游戏是否继续

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init(); // 初始化游戏
  }

  // 游戏的初始化方法，调用之后游戏即开始
  init(){
    // 绑定键盘按下的事件
    // this.keyDownHandler当中的this指向的是document
    // 可以用bind来改变this指向，指向到当前实例
    document.addEventListener("keydown", this.keyDownHandler.bind(this));

    // 调用蛇移动方法（这里利用了递归）
    this.run();
  }

  // 创建一个键盘按下的响应函数
  keyDownHandler(event: KeyboardEvent){
    // 校验event.key的值是否合法
    this.direction = event.key;
  }

  // 创建一个让蛇移动的方法
  run(){
    // 获取蛇目前的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
    }

    // 检查蛇是否吃到食物
    this.checkEat(X, Y);

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      console.log(e);
      this.isLive = false;
    }

    // 这里利用了递归的思想
    // 在init当中，调用了run方法
    // run方法内部，每隔一段时间，再进行自调用
    // 自调用后，又会开启一个定时器，定期器当中再调用本身
    let time = 300 - (this.scorePanel.level-1) * 30;
    this.isLive && setTimeout(this.run.bind(this), time);
  }

  // 检查蛇是否吃到食物
  checkEat(X: number, Y: number){
    if(X === this.food.X && Y === this.food.Y){
      this.food.change(); // 重置食物的位置
      this.scorePanel.addScore(); // 分数增加
      this.snake.addBody(); // 蛇要增加一节
    }
  }
}

export default GameControl