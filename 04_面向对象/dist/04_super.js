"use strict";
(function () {
    // Animal类
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            console.log("动物在叫");
        }
    }
    // Dog类
    class Dog extends Animal {
        // 如果在子类当中写了构造函数，则构造函数也会覆盖父类的构造函数
        // 这个时候必须要调用父类的构造函数：super()
        constructor(name, age) {
            super(name); // 调用父类的构造函数
            this.age = age;
        }
        // 在类的方法当中，super就表示当前类的父类
        sayHello() {
            super.sayHello();
        }
    }
    const dog = new Dog("旺财", 3);
    console.log(dog);
    dog.sayHello();
})();
