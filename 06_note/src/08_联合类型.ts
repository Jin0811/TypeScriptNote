/**
 * 联合类型表示取值可以为多种类型中的一种，未赋值时联合类型上只能访问两个类型共有的属性和方法
 *
 * 可辨识联合
 * 可辨识联合：包含三个特点，分别是可辨识、联合类型、类型守卫
 * 这种类型的本质是：结合联合类型和字面量类型的一种类型保护方法
 * 如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，那么就可以利用这个公共属性，来创建不同的类型保护区块
 */

// 联合类型
// w1接收一个name，而name可以接收string或number类型，那么这个参数便是联合类型
const w1 = (name: string | number) => {};
w1("123");
w1(123);

// 可辨识联合
// 定义了 w2、w3、w4 三个接口，这三个接口都包含type属性，那么type就是可辨识属性，其他属性只跟特性的接口相关，通过可辨识属性type，才能使用其相关的属性
interface w2 {
  type: 1;
  name: string;
}
interface w3 {
  type: 2;
  age: number;
}
interface w4 {
  type: 3;
  isMan: boolean;
}
const w5 = (data: w2 | w3 | w4) => {
  console.log(data.type); // w2 | w3 | w4 都有type属性
  // console.log(data.age); // 报错：类型“w2 | w3 | w4”上不存在属性“age”
};
const w6 = (data: w2 | w3 | w4) => {
  if (data.type === 1) {
    console.log(`我的名字是${data.name}`);
  } else if (data.type === 2) {
    console.log(`我的年龄是${data.age}`);
  } else if (data.type === 3) {
    console.log(`我的性别是${data.isMan ? "男" : "女"}`);
  }
};
w6({ type: 1, name: "张三" });
w6({ type: 2, age: 18 });
w6({ type: 3, isMan: true });
