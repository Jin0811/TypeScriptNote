// object代表是对象类型，但是在js当中，一切皆为对象，在实际项目当中一般不会使用object
let a: object
a = {}

// 定义一个对象，并且这个对象当中必须要有一个name属性
// age? 代表是可选属性
let b1: { name: string, age?: number }
// b = {} // 这里会报错
b1 = { name: "张三" }

// 如果只要求必须要name属性，其他属性不作限制
// [propName: string]: any 表示任意类型的属性，propName可以随便写
let c1: { name: string, [propName: string]: any };
c1 = {
  name: "李四",
  age: 18,
  sayHi: () => {
    console.log("大家好，我是李四");
  }
}


// d是一个函数，接收两个参数，都为number，返回值也为number
let d: (a: number, b: number) => number
d = function(a, b){
  return a+b
}

// 定义一个数组，并且这个数组当中只能放字符串
let e1: string[]
let e2: Array<string>

// 定义一个数组，并且这个数组当中只能放数值
let f: Array<number>
// f.push("abc") // 这一行会报错，不能存放字符串
f.push(1)


/**
 * 元组，即固定长度的数组
 * let h: [string, string]
 */

let h03: [string, number]
h03 = ["1", 2]


/**
 * 枚举
 */
enum Gender{
  Male = 0,
  FeMale = 0,
}
let i03: { name: string, gender: Gender }
i03 = {
  name: "张三",
  gender: Gender.Male
}
console.log(i03.gender == Gender.Male)

let g03: string | number // 或
let j03: { name: string } & { age: number } // 且

// 类型的别名
type myString = string; // 给string起一个别名
let m03: myString;

type myType = 1 | 2 | 3 | 4 | 5;
let n03: myType; // n03可以为12345的其中之一