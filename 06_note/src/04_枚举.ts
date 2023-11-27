/**
 * Enum 枚举
 * - 枚举的类型只能是 string 或 number
 * - 定义的名称不能为关键字
 */

/**
 * 数字枚举
 * - 枚组的类型默认为数字类型，默认从0开始以此累加，如果有设置默认值，则只会对后面的值产生影响
 * - 同时支持反向映射（及从成员值到成员名的映射），但只能映射默认值的前面，或者映射无默认值的情况
 */
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

// --------------------------------------------------------------------------------------------------------------------------

/**
 * 字符串枚举
 * 必须要有默认值，不支持反向映射
 */
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

// --------------------------------------------------------------------------------------------------------------------------

/**
 * 常量枚举
 * 除了数字类型和字符串类型之外，还有一种特殊的类型，那就是常量枚组，也就是通过const去定义enum，但这种类型不会编译成任何JS，只会编译对应的值
 */
const enum constType {
  A = 1,
  B = 2,
}
let x1 = constType.A; // 1 编译成JS代码 var x1 = 1;
let x2 = constType.B; // 2 编译成JS代码 var x2 = 2;
console.log(x1, x2);
