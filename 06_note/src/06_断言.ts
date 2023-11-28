/**
 * 类型断言
 */
const q1: unknown = "typescript";
// const q1_Len = q1.toUpperCase(); // “q1”的类型为“未知”
const q1_Len_1 = (q1 as string).toUpperCase(); // as语法
const q1_Len_2 = (<string>q1).toUpperCase(); // 尖括号语法

// --------------------------------------------------------------------------------------------------------------------------

/**
 * 非空断言
 * 后缀表达式操作符 ! 可以用于断言操作对象是非null和非undefined 类型
 */
const q2 = (name: string | null | undefined): void => {
  // 报错：不能将类型“string | null | undefined”分配给类型“string”
  // const str1: string = name;

  // !可以帮助我们过滤null和undefined类型，也就是说，编译器会默认我们只会传来string类型的数据，所以可以赋值为str2
  const str2: string = name!;
  console.log(str2);
};

// --------------------------------------------------------------------------------------------------------------------------

/**
 * 确定赋值断言
 * TS在2.7版本中引入了确定赋值断言，即允许在实例属性和变量声明后面放置一个 ! 号，以告诉TS该属性会被明确赋值
 */
let q3: number;
let q4!: number;
// console.log(q3); // 报错：在赋值前使用了变量“q3”
console.log(q4);

// --------------------------------------------------------------------------------------------------------------------------

/**
 * 双重断言
 * 断言失效后，可能会用到，但一般情况下不会使用
 */
interface Q5 {
  id: number;
  name: string;
}
// 报错：类型 "string" 到类型 "Q5" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"
// const q6 = "张三" as Q5;
const q7 = "张三" as unknown as Q5; // 此时访问q7，编辑器就会提示有id和name属性
