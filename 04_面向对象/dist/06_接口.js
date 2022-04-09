"use strict";
(function () {
    const obj1 = {
        name: "张三",
        age: 18
    };
    console.log(obj1);
    const obj2 = {
        name: "李四",
        age: 20,
        gender: "男"
    };
    console.log(obj2);
    /**
     * 定义类，可以使类去实现一个接口
     * 实现接口就是使类满足接口的要求
     */
    class MyClass {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log(this.name);
        }
    }
})();
