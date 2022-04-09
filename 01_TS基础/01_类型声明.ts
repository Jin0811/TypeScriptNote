// 声明一个变量a，同时指定其类型为number
// a的类型设置为number，在以后的使用当中，a的值只能是数字
let a: number;

a = 10;
a = 33;
// a = "hello"; // 此行代码会报错，不能将一个字符串赋值给一个number类型的变量

let b: string;
b = "字符串";


// 声明布尔变量，并且赋值
let c: boolean = true;

// 如果变量的声明和赋值是同时进行的，则TS可以自动对变量进行类型检测
let d = true
// d = 123

// function sum(): number {} 设置返回值的类型
function sum(a: number, b: number): number{
  return a + b
}

sum(123, 456);
// sum(123, "456"); // 这一行，传递了一个字符串，会报错
// sum(123, 456, 789); // 这一行，函数要求2个参数，但是传递了3个，同样也会报错