// 定义记分牌ScorePanel
class ScorePanel {
  // 分数和等级初始值
  score: number = 0;
  level: number = 1;

  // 分数和等级对应的Dom元素
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  
  maxLevel: number; // 设置一个变量，限制等级
  upScore: number; // 设置一个变量，表示多少分时进行升级

  constructor(maxLevel:number=10, upScore:number=10) {
    this.maxLevel = maxLevel;
    this.upScore = upScore;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }

  // 加分方法
  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + "";
    // 判断分数是多少，根据分数来设置等级
    if(this.score % this.upScore == 0){
      this.levelUp();
    }
  }

  // 等级提升
  levelUp() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.levelEle.innerHTML = this.level + "";
    }
  }
}

export default ScorePanel;