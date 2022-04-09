class Dog{
  name: string;
  age: number;

  // constructor被称为构造函数
  // 构造函数会在对象创建时调用
  constructor(name: string, age: number){
    // 在实例方法当中，this指向的就是当前的实例
    this.name = name;
    this.age = age;
  }

  bark(){
    console.log(`${this.name}-汪汪汪`)
  }
}

const dog1 = new Dog("小黑", 3)
const dog2 = new Dog("小白", 2)
console.log(dog1);
console.log(dog2);
dog1.bark()
