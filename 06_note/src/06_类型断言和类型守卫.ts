/**
 * 类型断言
 */
const q1: unknown = "typescript";
// const q1_Len = q1.toUpperCase(); // “q1”的类型为“未知”
const q1_Len_1 = (q1 as string).toUpperCase(); // as语法
const q1_Len_2 = (<string>q1).toUpperCase(); // 尖括号语法
