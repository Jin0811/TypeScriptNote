"use strict";
(function () {
    /**
     * 以abstract开头的类是抽象类
     * 抽象类与其他类区别不大，只是不能用来创建对象
     * 抽象类就是专门用来被继承的类
     */
    // Animal为抽象类
    // Animal是用来被其他类继承的，一般不希望这个类可以创建对象
    class Animal {
        constructor(name) {
            this.name = name;
        }
    }
    // Dog类
    class Dog extends Animal {
        sayHello() {
            console.log(`${this.name} 汪汪汪`);
        }
    }
    const dog = new Dog("旺财");
    console.log(dog);
    // Cat类
    // 下面的语句会报错：非抽象类“Cat”不会实现继承自“Animal”类的抽象成员“sayHello”。
    // 这是因为Animal当中定义了一个抽象方法，但是Cat没有重写这个方法
    // class Cat extends Animal{}
})();
