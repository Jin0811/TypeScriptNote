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
