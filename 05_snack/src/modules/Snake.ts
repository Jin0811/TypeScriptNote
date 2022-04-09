// 定义蛇类Snake
class Snake {
  head: HTMLElement; // 蛇头
  bodies: HTMLCollection; // 身体（包括蛇头）
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div");
  }
  
  // 获取蛇头坐标
  get X(){
    return this.head.offsetLeft;
  }
  get Y(){
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  set X(value: number){
    // 如果X没有改变，则直接返回
    if(this.X === value){ return }
    // 判断是否撞墙
    if(value < 0 || value > 290){
      throw new Error("Snake撞墙");
    }
    // 判断是否进行了调头
    // 判断蛇头的X是否跟第二节身体的X相同
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
      
      
      // 发生了调头，让蛇往反方向继续移动
      if(value < this.X){
        // 发生了掉头，如果value小于了X，则说明是调头方向为左
        // 此时应让蛇继续往右行走
        if(this.X == 290){ return } // 修复撞墙之前一直按反方向，蛇穿墙的BUG
        value = this.X + 10
      }else{
        if(this.X == 0){ return } // 修复撞墙之前一直按反方向，蛇穿墙的BUG
        value = this.X - 10
      }
    }
    // 移动身体
    this.moveBody();
    this.head.style.left = value + "px";
    // 检查是否撞到身体
    this.checkHeadBody();
  }
  set Y(value: number){
    if(this.Y === value){ return }
    // 判断是否撞墙
    if(value < 0 || value > 290){
      throw new Error("Snake撞墙");
    }
    // 判断是否进行了调头
    // 判断蛇头的X是否跟第二节身体的X相同
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
      // 发生了调头，让蛇往反方向继续移动
      if(value < this.Y){
        // 发生了掉头，如果value小于了Y，则说明是调头方向为上
        // 此时应让蛇继续往下行走
        if(this.Y == 290){ return } // 修复撞墙之前一直按反方向，蛇穿墙的BUG
        value = this.Y + 10
      }else{
        if(this.Y == 0){ return } // 修复撞墙之前一直按反方向，蛇穿墙的BUG
        value = this.Y - 10
      }
    }
    // 移动身体
    this.moveBody();
    this.head.style.top = value + "px";
    // 检查是否撞到身体
    this.checkHeadBody();
  }

  // 蛇增加身体
  addBody(){
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  
  // 移动蛇的身体
  moveBody(){
    for(let i=this.bodies.length-1; i>0; i--){
      // 获取前面一节身体的位置
      let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
      // 将值设置到当前这一节身体
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }
 
  // 检查蛇头是否撞上了身体 
  checkHeadBody(){
    for(let i=1; i<this.bodies.length; i++){
      let body = this.bodies[i] as HTMLElement;
      if(this.X === body.offsetLeft && this.Y === body.offsetTop){
        throw new Error("撞到身体");
      }
    }
  }
}

export default Snake;