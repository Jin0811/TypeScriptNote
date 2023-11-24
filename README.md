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
