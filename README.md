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

### 2.5 交叉类型

交叉类型，将多个类型合并为一个类型，使用&符号连接

- 基础属性
  - 属性名相同，
    - 类型相同，合并后的类型也是此类型
    - 类型不同，则合并后的此属性类型为 never；如果其中一个类型为 boolean，则合并后的整个 type 为 never，即全部的属性都为 never
  - 属性名不相同
    - 直接进行合并
- 非基础属性和基础属性的合并规则相同

```ts
/**
 * a 同名属性，类型相同 => a: string
 * b 同名属性，类型不同 => b: never
 * c 不同名属性 => c: number
 * d 不同名属性 => d: symbol
 */

type pType1 = {
  a: string;
  b?: string;
  c: boolean;
};
type pType2 = {
  a: string;
  b?: number;
  d: symbol;
};
type pAllType = pType1 & pType2;
const p1: pAllType = {
  a: "111",
  // b: "222", // 不能将类型“string”分配给类型“never”
  c: true,
  d: Symbol(),
};
```

### 2.6 断言

#### 类型断言

在特定的环境中，我们会比 TS 知道这个值具体是什么类型，不需要 TS 去判断，简单的理解就是，类型断言会告诉编译器，你不用给我进行检查，相信我，他就是这个类型

语法：

- 尖括号语法（尖括号语法在 react 当中会报错，因为会与 react 中的 JSX 语法冲突）
- as 语法（推荐使用 as 语法）

```ts
const q1: unknown = "typescript";
// const q1_Len = q1.toUpperCase(); // “q1”的类型为“未知”
const q1_Len_1 = (q1 as string).toUpperCase(); // as语法
const q1_Len_2 = (<string>q1).toUpperCase(); // 尖括号语法
```

#### 非空断言

后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型

```ts
const q2 = (name: string | null | undefined): void => {
  // 报错：不能将类型“string | null | undefined”分配给类型“string”
  // const str1: string = name;

  // !可以帮助我们过滤null和undefined类型，也就是说，编译器会默认我们只会传来string类型的数据，所以可以赋值为str2
  const str2: string = name!;
  console.log(str2);
};
```

#### 确定赋值断言

TS 在 2.7 版本中引入了确定赋值断言，即允许在实例属性和变量声明后面放置一个 ! 号，以告诉 TS 该属性会被明确赋值

```ts
let q3: number;
let q4!: number;
// console.log(q3); // 报错：在赋值前使用了变量“q3”
console.log(q4);
```

#### 双重断言

断言失效后，可能会用到，但一般情况下不会使用

```ts
interface Q5 {
  id: number;
  name: string;
}
// 报错：类型 "string" 到类型 "Q5" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"
// const q6 = "张三" as Q5;
const q7 = "张三" as unknown as Q5; // 此时访问q7，编辑器就会提示有id和name属性
```

### 2.7 类型守卫

- in 用于判断属性是哪个类型里面的

  ```ts
  interface k1 {
    id: number;
    name: string;
  }
  interface k2 {
    id: number;
    age: number;
  }
  const k_test_fun_1 = (data: k1 | k2): void => {
    if ("name" in data) {
      console.log(`${data.id}-${data.name}`);
    }
    if ("age" in data) {
      console.log(`${data.id}-${data.age}`);
    }
  };
  ```

- typeof 用于判断基本类型，如 string ｜ number 等

  ```ts
  const k3: number = 1.111;
  const k4: string = "1";
  const k_test_fun_2 = (data: string | number): void => {
    if (typeof data === "number") {
      console.log(data.toFixed(2));
    }
    if (typeof data === "string") {
      console.log(data.length);
    }
  };
  ```

- instanceof 用于判断一个实例是不是构造函数，或使用类的时候

  ```ts
  class Name_k {
    name: string = "张三";
  }
  class Age_k extends Name_k {
    age: number = 18;
  }
  const k_test_fun_3 = (data: Name_k | Age_k): void => {
    if (data instanceof Name_k) {
      console.log(data.name);
    }
    if (data instanceof Age_k) {
      console.log(data.age);
    }
  };
  ```

- 类型谓词

  ```ts
  const isNumber_k = (x: any): boolean => {
    return typeof x === "number";
  };
  console.log(isNumber_k(1)); // true
  console.log(isNumber_k("1")); // false
  ```

### 2.8 联合类型

联合类型表示取值可以为多种类型中的一种，未赋值时联合类型上只能访问两个类型共有的属性和方法

联合类型分为普通联合类型和可辨识联合

普通联合类型

```ts
// w1接收一个name，而name可以接收string或number类型，那么这个参数便是联合类型
const w1 = (name: string | number) => {};
w1("123");
w1(123);
```

可辨识联合

- 可辨识联合：包含三个特点，分别是可辨识、联合类型、类型守卫
- 这种类型的本质是：结合联合类型和字面量类型的一种类型保护方法
- 如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，那么就可以利用这个公共属性，来创建不同的类型保护区块

```ts
// 定义了 w2、w3、w4 三个接口，这三个接口都包含type属性，那么type就是可辨识属性，其他属性只跟特性的接口相关，通过可辨识属性type，才能使用其相关的属性
interface w2 {
  type: 1;
  name: string;
}
interface w3 {
  type: 2;
  age: number;
}
interface w4 {
  type: 3;
  isMan: boolean;
}
const w5 = (data: w2 | w3 | w4) => {
  console.log(data.type); // w2 | w3 | w4 都有type属性
  // console.log(data.age); // 报错：类型“w2 | w3 | w4”上不存在属性“age”
};
const w6 = (data: w2 | w3 | w4) => {
  if (data.type === 1) {
    console.log(`我的名字是${data.name}`);
  } else if (data.type === 2) {
    console.log(`我的年龄是${data.age}`);
  } else if (data.type === 3) {
    console.log(`我的性别是${data.isMan ? "男" : "女"}`);
  }
};
w6({ type: 1, name: "张三" });
w6({ type: 2, age: 18 });
w6({ type: 3, isMan: true });
```

### 2.9 类型别名和接口

#### type 类型别名

type 的作用就是给类型起一个新名字，支持基本类型、联合类型、元祖及其它任何你需要的手写类型，常用于联合类型

#### interface 接口

在面向对象语言中表示行为抽象，也可以用来描述对象的形状

属性控制

- 可选属性 使用?来定义一个可选属性
- 只读属性 使用 readonly 来修饰某个属性只读
- 任意属性 [props: string]: any 表示允许任意属性

```ts
interface inter1 {
  id: number;
  name?: string;
  readonly nation: string;
  [props: string]: any;
}
```

继承和扩展

- 扩展 interface
- 扩展 type

```ts
// 接口 B_inter
interface B_inter {
  id: number;
}
// 接口 C_inter
interface C_inter {
  name: string;
}
// 类型别名 B_type
type B_type = {
  age: number;
};
// 类型别名 C_type
type C_type = {
  hobby: Array<string>;
};
// 使用extends扩展两个接口
interface A_inter_1 extends B_inter, C_inter {
  mark: 1;
}
// 使用extends扩展两个类型别名
interface A_inter_2 extends B_type, C_type {
  mark: 2;
}
const A_inter_1_obj: A_inter_1 = {
  id: 1,
  name: "",
  mark: 1,
};
const A_inter_2_obj: A_inter_2 = {
  age: 18,
  hobby: [],
  mark: 2,
};
```

接口重复定义

- 重复定义的接口会自动进行合并

```ts
interface inter_repeat_1 {
  id: number;
}
interface inter_repeat_1 {
  name: string;
}
const inter_repeat_obj: inter_repeat_1 = {
  id: 1,
  name: "张三",
};
```

接口定义函数和类

- 接口可以定义一个函数的基本结构，函数的实现必须满足接口
- 接口可以定义一个类的基本结构，当类使用 implements 去实现接口时，类必须满足接口

```ts
// 接口定义函数
interface func_inter {
  (num1: number, num2: number): number;
}
const func_1: func_inter = (num1: number, num2: number): number => {
  return num1 + num2;
};

// 接口定义类
interface class_inter {
  id: number;
  name: string;
  isMan: boolean;
  sayHello(text: string): void;
}
class Implements_class implements class_inter {
  id: number;
  name: string;
  isMan: boolean = true;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  sayHello(text: string) {
    console.log(`${this.name}: ${text}`);
  }
}
```

类属性修饰符

- public 默认值，属性可以在任意位置访问和修改，包括子类当中
- private 私有属性，私有属性只能在类内部进行访问和修改，子类当中也不能访问和修改
- protected 受保护的，只能在当前类和当前类的子类进行访问和修改
- readonly 只读
