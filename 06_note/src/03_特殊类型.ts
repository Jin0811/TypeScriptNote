/**
 * any 和 unknown
 *
 * any
 * 表示任意类型，即可以赋值给任何类型的变量；使用any类型后，该变量可以进行任何操作而不会触发类型检查，相当于关闭了类型检查器的所有限制
 * any可以随意赋值给其他变量
 *
 * unknown
 * 表示未知类型，即不确定具体类型的变量；与any不同，使用unknown类型后，该变量在没有进行类型检查或类型断言之前，不能被赋值给其他变量或进行任何操作
 * unknown在没有进行类型推断之前，无法赋值给其他变量
 *
 */

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

let t_any: number = t1;
// let t_unknown_1: number = t2; // 不能将类型“unknown”分配给类型“number”
let t_unknown_2: number = t2 as number;

// --------------------------------------------------------------------------------------------------------------------------

/**
 * void 和 never
 * 当一个函数，没有返回值时，TS会默认他的返回值为 void 类型
 *
 * 表示一个函数永远不存在返回值，TS会认为类型为never，那么与void相比，never应该是void的子集，因为void实际上的返回值为undefined，而never连undefined也不行
 * 符合never的情况有：当抛出异常的情况和无限死循环
 */

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
