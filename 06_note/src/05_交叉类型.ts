/**
 * 交叉类型，将多个类型合并为一个类型，使用&符号连接
 *
 * 基础属性
 * - 属性名相同，
 *  - 类型相同，合并后的类型也是此类型
 *  - 类型不同，且其中一个类型为boolean，则合并后的整个type为never
 * - 属性名不相同
 *  - 直接进行合并
 *
 * 非基础属性和基础属性的合并规则相同
 */

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

// --------------------------------------------------------------------------------------------------------------------------

interface objInterface1 {
  a: string;
  b?: string;
  c: boolean;
}
interface objInterface2 {
  a: string;
  b?: number;
  d: symbol;
}
interface pInterface3 {
  obj: objInterface1;
}
interface pInterface4 {
  obj: objInterface2;
}
type pInterface5 = pInterface3 & pInterface4;
const p2: pInterface5 = {
  obj: {
    a: "111",
    // b: "222", // 不能将类型“string”分配给类型“never”
    c: true,
    d: Symbol(),
  },
};
