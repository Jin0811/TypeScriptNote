/**
 * type (类型别名)
 * type的作用就是给类型起一个新名字，支持基本类型、联合类型、元祖及其它任何你需要的手写类型，常用于联合类型
 */

type h1 = number;
type h2 = { name: string };
type h3 = [string, number];
type h4 = string | number | boolean;
type h5 = (num1: number, num2: number) => number;

// 通过交叉类型，使用&符号连接，来扩展type和interface
interface h6 {
  id: number;
}
type h7 = {
  name: string;
};
type h8 = {
  age: number;
};
type h9 = h6 & h7 & h8;
const info: h9 = {
  id: 1,
  name: "张三",
  age: 18,
};

// type可以通过in关键字来生成映射类型，但interface不行
type h_keys = "name" | "sex";
type h_keys_obj = {
  [k in h_keys]: string;
};
const h10: h_keys_obj = {
  name: "",
  sex: "",
};
