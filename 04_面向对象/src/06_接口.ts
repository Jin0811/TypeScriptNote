(function(){
  // 描述一个对象的类型
  type myType = {
    name: string,
    age: number,
  }
  const obj1: myType = {
    name: "张三",
    age: 18
  }
  console.log(obj1);


  /**
   * 接口用来定义一个类结构
   * 用来定义一个类当中应该包含哪些属性和方法
   * 同时接口也可以当成类型声明来使用
   * 接口可以多次定义，会进行合并
   */
  interface myInterface{
    name: string,
    age: number,
  }
  interface myInterface{
    gender: string,
  }
  const obj2: myInterface = {
    name: "李四",
    age: 20,
    gender: "男"
  }
  console.log(obj2);


  /**
   * 接口在定义类的时候可以限制类的结构
   * 接口中所有的属性都不能有实际的值，所有的方法都不能有方法体
   */
  interface myInter{
    name: string,
    sayHello(): void;
  }
  /**
   * 定义类，可以使类去实现一个接口
   * 实现接口就是使类满足接口的要求
   */
  class MyClass implements myInter {
    name: string;
    constructor(name: string){
      this.name = name;
    }

    sayHello(){
      console.log(this.name);
    }
  }



})();