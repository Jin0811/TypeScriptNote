(function(){

  /**
   * animal类
   * Dog和Cat可以通过extends来继承Animal
   * Dog和Cat是子类，Animal是父类
   * 使用继承后，子类将会拥有父类所有的方法和属性
   * 通过继承，可以把多个类当中共有的代码写在一个父类当中
   * 这样只需要写一次代码，即可让所有的子类都同时拥有父类的属性和方法
   * 
   * 如果希望在子类当中添加一些父类当中没有的属性和方法，直接加即可
   * 如果子类当中添加了和父类相同的方法，则子类的方法会覆盖父类的方法
   * 这种子类覆盖父类方法的形式，我们称之为方法重写
   * 
   */
  class Animal{
    name: string;
    age: number;
    constructor(name: string, age: number){
      this.name = name;
      this.age = age;
    }
    sayHello(){
      console.log("动物在叫")
    }
  }


  // Dog类
  class Dog extends Animal{
    // Dog独有的方法
    run(){
      console.log(`${this.name} run`);
    }
    sayHello(){
      console.log(`${this.name} 汪汪汪`)
    }
  }
  const dog = new Dog("旺财", 3)
  console.log(dog);
  dog.sayHello()
  dog.run()


  // Cat类
  class Cat extends Animal{
    sayHello(){
      console.log(`${this.name} 喵喵喵`)
    }
  }
  const cat = new Cat("咪咪", 2)
  console.log(cat);
  cat.sayHello()
  
})()