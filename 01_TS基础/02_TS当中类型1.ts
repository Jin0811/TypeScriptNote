/**
 * number：任意数字
 * string：任意字符串
 * boolean：布尔值，true或false
 * 字面量：限制变量的值就是该字面量的值
 * any：任意类型
 * unknown：类型安全的any
 * void：没有值或者undefined
 * never：不能是任何值
 * object：任意的js对象
 * array：任意js数组
 * tuple：元素，TS新增类型，固定长度的数组
 * enum：枚举，TS新增类型
 */

// 直接使用字面量进行类型声明，类似于常量，往后赋值只能赋相同的值
// let a: 10;
// a = 11; // 会报错
// a = 10; // 不会报错

// 使用场景：
// 这里的c的值只能是male或者female，并且是字符串
// | 是或的意思，可以使用 | 来连接多个类型，即联合类型
let b: "male" | "female";
b = "male";
let c: boolean | string;
c = true;


// any：表示任意类型，一个变量设置为any类型后，相当于对该变量关闭TS的类型检测
let d1: any; // 显示any，显示声明any类型的变量
let d2; // 隐式any，如果声明变量时，不设置类型，则会自动判断为any类型

// unknown未知类型
let e: unknown;

// any和unknown的区别
let s: string;

s = d1; // d1为any类型，它可以赋值给任意变量，这里赋值给了一个string
e = "hello";
// s = e; // 这里会进行报错，unknown不能直接赋值给其他变量
// 赋值之前，可以先进行一下类型判断，这样就不会报错
if(typeof e === "string"){
  s = e;
}

// ，
/**
 * 类型断言：可以告诉解析器，变量的实际类型
 * 语法：
 * 1 e as string
 * 2 <string>e
 */
s = e as string;
s = <string>e;


// 有返回值
function fn1(): string | number{
  return 123
}

// void用来表示空，以函数为例，就表示没有返回值的函数
// 没有返回值
function fn2(): void{
  return null
}

// never 表示永远不会返回结果
function fn3(): never{
  throw new Error("报错了");
}

