"use strict";
/**
 * 使用class关键字来定义一个类
 *
 * 对象当中主要包含两个部分：
 * 1、属性（分为实例属性和类属性）
 * 2、方法
 *
 * 直接定义的属性是实例属性，需要通过实例进行访问
 * 使用static定义的属性是类属性（静态属性），可以通过类直接访问
 *
 * readonly表示一个只读的属性，不能进行修改
 *
 * 使用static开头的方法就是类方法，只能通过类进行访问
 */
class Person {
    constructor() {
        // 定义实例属性
        this.name = "张三";
        this.age = 18;
    }
    // 定义实例方法，只能通过实例进行访问
    sayHello() {
        console.log("hello");
    }
    // 定义类方法，只能通过类进行访问
    static sayInfo() {
        console.log("类方法，只能通过类进行调用");
    }
}
// 在属性前面使用static关键字可以定义类属性（静态属性）
Person.info = "Person类用于创建人物对象";
const p1 = new Person();
console.log(p1.name); // 访问实例属性，只有new之后才能访问
console.log(Person.info); // 访问类属性，可以直接通过Person类访问
// p1.age = 20 // 这一行会报错，因为age为只读属性
p1.sayHello(); // 调用实例的方法
Person.sayInfo(); // 调用类方法
