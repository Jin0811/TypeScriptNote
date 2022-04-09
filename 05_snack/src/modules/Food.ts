// 定义食物类Food
class Food {
  // 定义一个属性表示食物所对应的元素
  element: HTMLElement

  constructor() {
    // 获取页面当中的食物元素，并且赋值给element属性
    // 因为可能获取不到元素，所以ts会提示报错，使用 ! 来解决这个报错
    this.element = document.getElementById("food")!
  }

  // 定义一个获取食物X轴坐标的方法
  get X() {
    return this.element.offsetLeft
  }

  // 定义一个获取食物Y轴坐标的方法
  get Y() {
    return this.element.offsetTop
  }

  // 修改食物位置
  change() {
    // 生成一个随意的位置
    // 蛇移动一次就是一格，一格的大小就是10
    // 范围0-290，并且每次位置必须是10的倍数
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.top = top + "px";
    this.element.style.left = left + "px";
  }
}

export default Food;