/**
 * 类型守卫是可以进行运行时检查的一种表达式，用于确保该类型在一定的范围内
 * - in 用于判断属性是哪个类型里面的
 * - typeof 用于判断基本类型，如string ｜ number等
 * - instanceof 用于判断一个实例是不是构造函数，或使用类的时候
 * - 类型谓词
 */

// in
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

// typeof
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

// instanceof
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

// 类型谓词
const isNumber_k = (x: any): boolean => {
  return typeof x === "number";
};
console.log(isNumber_k(1)); // true
console.log(isNumber_k("1")); // false
