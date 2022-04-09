(function(){

  class Person{
    // TS可以在属性前添加属性的修饰符

    public name: string; // public公共属性
    private age: number; // private私有属性

    constructor(name: string, age: number){
      this.name = name;
      this.age = age;
    }

    // 定义一个方法，用来获取age属性
    getAge(): number{
      return this.age
    }
    // 定义一个方法，用来修改age属性
    setAge(value: number): void{
      if(value && value>0){
        this.age = value
      }
    }

    // 上面的方法比较繁琐，可以使用下面的简便写法
    // 读取：per.easyName
    // 修改：per.easyName = '李四'
    get easyName(){
      return this.name
    }
    set easyName(value: string){
      this.name = value
    }
  }

  const per = new Person("张三", 18)
  console.log(per);
  
  /**
   * 现在属性是在对象当中设置的，属性可以任意地修改
   * 属性可以任意被修改会导致对象中的数据变得非常不安全
   * 修饰符
   * 1、public：默认值，属性可以在任意位置访问和修改，包括子类当中
   * 2、private：私有属性，私有属性只能在类内部进行访问和修改，子类当中也不能访问和修改
   * 3、protected：受保护的，只能在当前类和当前类的子类进行访问和修改
   * 4、readonly：只读
   */
  per.name = "李四";
  // per.age = -20; // 报错：Property 'age' is private and only accessible within class 'Person'
  console.log(per);
  per.setAge(30);
  console.log(per.getAge());
  
  
  class A{
    protected num: number;
    constructor(num: number){
      this.num = num;
    }
  }
  class B extends A{
    test(){
      console.log(this.num);
    }
  }

  class C{
    // 使用修饰符，将属性直接在构造函数当中进行定义，无需进行this赋值
    constructor(public name: string, public age: number){}
  }
  const _c = new C("王五", 40)
  

})();