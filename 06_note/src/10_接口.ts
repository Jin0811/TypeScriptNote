/**
 * interface (接口)
 * 在面向对象语言中表示行为抽象，也可以用来描述对象的形状
 *
 * 属性控制：
 * 可选属性 使用?来定义一个可选属性
 * 只读属性 使用readonly来修饰某个属性只读
 * 任意属性 [props: string]: any 表示允许任意属性
 *
 * 继承和扩展
 * - 扩展interface
 * 	interface A_inter extends B_inter, C_inter {}
 * - 扩展type
 * 	interface A_inter extends B_type, C_type {}
 *
 * 接口重复定义：重复定义的接口会自动进行合并
 * interface inter_repeat_1 {}
 * interface inter_repeat_1 {}
 *
 * 接口定义函数
 * 接口可以定义一个函数的基本结构，函数的实现必须满足接口
 *
 * 接口定义类
 * 接口可以定义一个类的基本结构，当类使用implements去实现接口时，类必须满足接口
 *
 * 类属性修饰符
 * public 默认值，属性可以在任意位置访问和修改，包括子类当中
 * private 私有属性，私有属性只能在类内部进行访问和修改，子类当中也不能访问和修改
 * protected 受保护的，只能在当前类和当前类的子类进行访问和修改
 * readonly 只读
 */

// 属性控制
interface inter1 {
  id: number;
  name?: string;
  readonly nation: string;
  [props: string]: any;
}

// 继承和扩展
interface B_inter {
  id: number;
}
interface C_inter {
  name: string;
}
type B_type = {
  age: number;
};
type C_type = {
  hobby: Array<string>;
};
interface A_inter_1 extends B_inter, C_inter {
  mark: 1;
}
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

// 接口重复定义：重复定义的接口会自动进行合并
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
