/**
 * Array 数组
 */

// 方式一 类型名称 + []
const arr1: string[] = [];
arr1.push("tom");
// arr1.push(1); // 类型“number”的参数不能赋给类型“string”的参数

// 方式二 Array<数据类型>
const arr2: Array<number> = [];
// arr2.push("tom"); // 类型“string”的参数不能赋给类型“number”的参数
arr2.push(1);

// 方式三 数组联合类型
const arr3: Array<string | number> = [];
arr3.push("tom");
arr3.push(1);

// --------------------------------------------------------------------------------------------------------------------------

/**
 * Tuple 元组
 * 元组内元素的数量、位置、类型都必须一致
 */
// const tuple1: [number, string] = []; // 不能将类型“[]”分配给类型“[number, string]”。源具有0个元素，但目标需要2个
// const tuple1: [number, string] = [1, "tom", "jack"]; // 不能将类型“[number, string, string]”分配给类型“[number, string]”。源具有3个元素，但目标仅允许2个
// const tuple1: [number, string] = ["tom", 1]; // 不能将类型“string”分配给类型“number”，不能将类型“number”分配给类型“string”
const tuple1: [number, string] = [1, "tom"];

// --------------------------------------------------------------------------------------------------------------------------

/**
 * object
 * 在定义上直接使用 object 是可以的，但你要更改对象的属性就会报错，原因是并没有使对象的内部具体的属性做限制，所以需要使用 {} 来定义内部类型
 *
 * Object
 * 大写的O，代表所有的原始类型或非原始类型都可以进行赋值，除了null和undefined
 */

// object 小写的o
const obj1: object = { a: 1, b: 2 };
// obj1.a = 3; // 类型“object”上不存在属性“a”
// obj1.c = 4; // 类型“object”上不存在属性“c”
const obj2: { a: number; b: number } = { a: 1, b: 2 };
obj2.a = 3;
obj2.b = 4;
// obj2.c = 5; // 类型“{ a: number; b: number; }”上不存在属性“c”

// Object 大写的O
let obj3: Object;
obj3 = 1;
obj3 = "1";
obj3 = true;
obj3 = {};
obj3 = Symbol();
obj3 = 100000000000000000;
// obj3 = null; // 不能将类型“null”分配给类型“Object”
// obj3 = undefined; // 不能将类型“undefined”分配给类型“Object”

// --------------------------------------------------------------------------------------------------------------------------

/**
 * 函数，分为普通函数和箭头函数
 * 在书写的时候，可以写入返回值的类型，如果写入，则必须要有对应类型的返回值，但通常情况下是省略，因为TS的类型推断功能够正确推断出返回值类型
 *
 * 可选参数：如果函数要配置可有可无的参数时，可以通过 ? 实现，切可选参数一定要在最后面
 * 默认参数：函数内可以自己设定其默认参数，用 = 实现
 * 剩余参数：仍可以使用扩展运算符 ...
 *
 * void和never的区别
 * - void，表示函数返回值空，即undefined
 * - never类型则是表示函数没有返回值，也绝不会（never）有返回值的情况发生
 */

function test1(num1: number, num2: number): number {
  return num1 + num2;
}
function test2(num1: number, num2: number) {
  return num1 + num2;
}
const test3 = (num1: number, num2: number): number => {
  return num1 + num2;
};
// 可选参数
function test4(name: string, age?: number): void {
  console.log(name, age);
}
// 默认参数
function test5(name: string, age: number = 18) {
  console.log(name, age);
}
// 剩余参数
function test6(...nums: Array<number>): number {
  return nums.reduce((pre: number, cur: number) => pre + cur, 0);
}

/**
 * 函数重载
 * 是使用相同名称和不同参数数量或类型创建多个方法的一种能力，在 TypeScript 中，表现为给同一个函数提供多个函数类型定义；简单的说：可以在同一个函数下定义多种类型值，总后汇总到一块
 * 函数只能有一个函数体，但是可以有多个重载签名
 */
type DataType = {
  id: number;
  name: string;
  age: number;
};
function getData(id: string): DataType;
function getData(id: Array<string>): Array<DataType>;
function getData(id: string | Array<string>): DataType | Array<DataType> {
  if (Array.isArray(id)) {
    const data: Array<DataType> = [
      { id: 1, name: "张三", age: 18 },
      { id: 2, name: "李四", age: 20 },
    ];
    return data;
  } else {
    const data: DataType = { id: 1, name: "张三", age: 18 };
    return data;
  }
}
