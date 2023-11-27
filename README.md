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

### 2.3 特殊类型

#### any 和 unknown

- any
  - 表示任意类型，即可以赋值给任何类型的变量；使用 any 类型后，该变量可以进行任何操作而不会触发类型检查，相当于关闭了类型检查器的所有限制
  - any 可以随意赋值给其他变量
- unknown
  - 表示未知类型，即不确定具体类型的变量；与 any 不同，使用 unknown 类型后，该变量在没有进行类型检查或类型断言之前，不能被赋值给其他变量或进行任何操作
  - unknown 在没有进行类型推断之前，无法赋值给其他变量

```ts
let t1: any;
t1 = 1;
t1 = "1";
t1 = true;
t1 = null;
t1 = undefined;
t1.toString();

let t2: unknown;
t2 = 1;
t2 = "1";
t2 = true;
t2 = null;
t2 = undefined;
// t2.toString(); // “t2”的类型为“未知”
// new t2(); // “t2”的类型为“未知”

let t_any: number = t1; // any可以随意赋值给其他变量
// let t_unknown_1: number = t2; // 未进行类型推断，不能将类型“unknown”分配给类型“number”
let t_unknown_2: number = t2 as number; // 已进行类型推断，可以进行赋值
```

#### void 和 never

- void
  - 当一个函数，没有返回值时，TS 会默认他的返回值为 void 类型
- never
  - 表示一个函数永远不存在返回值，TS 会认为类型为 never，那么与 void 相比，never 应该是 void 的子集，因为 void 实际上的返回值为 undefined，而 never 连 undefined 也不行
  - 符合 never 的情况有：当抛出异常的情况和无限死循环

```ts
function t3(num1: number) {
  console.log(num1);
}
function t4(num1: number): void {
  console.log(num1);
}
// never不能返回undefined，错误信息：返回“从不”的函数不能具有可访问的终结点
// function t5(num1: number): never {
//   console.log(num1);
// }
function t6(num1: number): never {
  throw new Error("Error!");
}
```

### 2.4 枚举

枚举的类型只能是 string 或 number，并且定义的名称不能为关键字

#### 数字枚举

- 枚组的类型默认为数字类型，默认从 0 开始以此累加，如果有设置默认值，则只会对后面的值产生影响
- 同时支持反向映射（及从成员值到成员名的映射），但只能映射默认值的前面，或者映射无默认值的情况

```ts
enum numberType {
  A, // 0 从0开始累加
  B, // 1
  C = 5, // 设置默认值
  D, // 6 设置了默认值，则从默认值开始进行累加
  E, // 7
}
// 正向映射
const numEnum1 = numberType.A; // 0
const numEnum2 = numberType.D; // 6

// 反向映射
console.log(
  numberType[0], // A
  numberType[1], // B
  numberType[2] // undefined 因为枚举当中并不存在 2
);
console.log(
  numberType[5], // C
  numberType[6], // D
  numberType[7] // E
);
```

#### 字符串枚举

- 必须要有默认值，不支持反向映射

```ts
enum stringType {
  A = "AAA",
  B = "BBB",
  C = "CCC",
}
console.log(
  stringType.A, // AAA
  stringType.B // BBB
  // stringType["CCC"], // 不支持反向映射，报错 Property 'CCC' does not exist on type 'typeof stringType'.
);
```

#### 常量枚举

- 除了数字类型和字符串类型之外，还有一种特殊的类型，那就是常量枚组，也就是通过 const 去定义 enum，但这种类型不会编译成任何 JS，只会编译对应的值

```ts
const enum constType {
  A = 1,
  B = 2,
}
let x1 = constType.A; // 1 编译成JS代码 var x1 = 1;
let x2 = constType.B; // 2 编译成JS代码 var x2 = 2;
console.log(x1, x2);
```

#### 异构枚举

- 包含了数字类型和字符串类型的混合
