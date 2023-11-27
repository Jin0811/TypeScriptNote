# TypeScript 学习笔记

- 此笔记是个人学习笔记，笔记的内容参考了这个文档 ➡ [参考文档](https://zhuanlan.zhihu.com/p/505175155) ，这里手动敲一遍代码和文档用来加深记忆
- [TS 线上编辑器 TypeScript Playground](https://www.typescriptlang.org/zh/play)

## 1 TS 基础命令

```js
npm install -g typescript // 全局安装ts
tsc -v // 查看ts版本
tsc test.ts // 编译文件
```

## 2 数据类型

- 基本类型：string / number / boolean / symbol / bigint / null / undefined
- 引用类型：array / Tuple(元组) / object(包含 Object 和{}) / function
- 特殊类型：any / unknow / void / nerver / Enum(枚举)
- 其他类型：类型推理 / 字面量类型 / 交叉类型

### 2.1 基本类型

```ts
// 字符串
const str: string = "Tom";

// 数字
const num: number = 1;

// 布尔值
const bool: boolean = false;

// symbol
const sym1: symbol = Symbol();
const sym2: symbol = Symbol();
console.log(sym1 === sym2); // false

// bigint
const big: bigint = 10n;

// null
const nu: null = null;

// undefined
const undef: undefined = undefined;
```

需要注意：

- null 和 undefined 两个类型一旦赋值上，就不能在赋值给任何其他类型
- symbol 是独一无二的，假设在定义一个 sym1，那么 sym === sym1 为 false

### 2.2 引入类型

#### Array

- 类型名称 + []
- Array<数据类型>
- Array<数据类型-1 | 数据类型-2>

```ts
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
```

#### Tuple

Tuple 可以说是 Array 的一种特殊情况，Array 可以限制数组内的元素类型，但是无法限制数组内元素的数量和位置。Tuple 的作用就是限制元素的类型、个数、位置的数组，同时 Tuple 这个概念值存在于 TS，在 JS 上是不存在的

注意：在 TS 中，是允许对 Tuple 扩增的（也就是允许使用 push 方法），但在访问上不允许

```ts
/**
 * Tuple 元组
 * 元组内元素的数量、位置、类型都必须一致
 */
// const tuple1: [number, string] = []; // 不能将类型“[]”分配给类型“[number, string]”。源具有0个元素，但目标需要2个
// const tuple1: [number, string] = [1, "tom", "jack"]; // 不能将类型“[number, string, string]”分配给类型“[number, string]”。源具有3个元素，但目标仅允许2个
// const tuple1: [number, string] = ["tom", 1]; // 不能将类型“string”分配给类型“number”，不能将类型“number”分配给类型“string”
const tuple1: [number, string] = [1, "tom"];
```

#### object

- object 小写的 o，在定义上直接使用 object 是可以的，但你要更改对象的属性就会报错，原因是并没有使对象的内部具体的属性做限制，所以需要使用 {} 来定义内部类型

  ```ts
  // object 小写的 o
  const obj1: object = { a: 1, b: 2 };
  // obj1.a = 3; // 类型“object”上不存在属性“a”
  // obj1.c = 4; // 类型“object”上不存在属性“c”
  const obj2: { a: number; b: number } = { a: 1, b: 2 };
  obj2.a = 3;
  obj2.b = 4;
  // obj2.c = 5; // 类型“{ a: number; b: number; }”上不存在属性“c”
  ```

- Object 大写的 O，代表所有的原始类型或非原始类型都可以进行赋值，除了 null 和 undefined

  ```ts
  // Object 大写的 O
  let obj3: Object;
  obj3 = 1;
  obj3 = "1";
  obj3 = true;
  obj3 = {};
  obj3 = Symbol();
  obj3 = 100000000000000000;
  // obj3 = null; // 不能将类型“null”分配给类型“Object”
  // obj3 = undefined; // 不能将类型“undefined”分配给类型“Object”
  ```

#### function 函数

函数，分为普通函数和箭头函数，在书写的时候，可以写入返回值的类型，如果写入，则必须要有对应类型的返回值，但通常情况下是省略，因为 TS 的类型推断功能够正确推断出返回值类型

- 可选参数：如果函数要配置可有可无的参数时，可以通过 ? 实现，切可选参数一定要在最后面

  ```ts
  // 可选参数
  function test4(name: string, age?: number): void {
    console.log(name, age);
  }
  ```

- 默认参数：函数内可以自己设定其默认参数，用 = 实现

  ```ts
  // 默认参数
  function test5(name: string, age: number = 18) {
    console.log(name, age);
  }
  ```

- 剩余参数：仍可以使用扩展运算符 ...

  ```ts
  // 剩余参数
  function test6(...nums: Array<number>): number {
    return nums.reduce((pre: number, cur: number) => pre + cur, 0);
  }
  ```

函数重载

是使用相同名称和不同参数数量或类型创建多个方法的一种能力，在 TypeScript 中，表现为给同一个函数提供多个函数类型定义；简单的说：可以在同一个函数下定义多种类型值，总后汇总到一块；函数只能有一个函数体，但是可以有多个重载签名

```ts
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
```
