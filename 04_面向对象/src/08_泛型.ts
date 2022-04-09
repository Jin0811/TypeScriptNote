(function(){

  // 接受一个参数，并且返回这个参数
  // 参数的类型和返回值的类型是一致的
  function fn1(a: number): number{
    return a
  }

  /**
   * 在定义函数或者类时，如果遇到类型不明确的情况，就可以使用泛型
   * T就是一个泛型，只有在函数运行的时候，才可以确定T的类型
   */
  function fn2<T>(a: T): T{
    return a
  }
  fn2(10); // 不指定泛型，TS会进行类型推断，但是可能推断错误
  fn2<string>('hello'); // 指定泛型


  // 多个泛型
  function fn3<T, K>(a: T, b: K): T{
    console.log(b);
    return a;
  }
  fn3(10, "hello")
  fn3<number, string>(20, "hi")


  // 限制泛型的范围
  // 表示泛型T必须是Inter的实现类
  interface Inter{
    length: number;
  }
  function fn4<T extends Inter>(a: T): number{
    return a.length
  }
  fn4('123')

  class MyClass<T>{
    name: T;
    constructor(name: T){
      this.name = name;
    }
  }
  const mc1 = new MyClass("张三")
  const mc2 = new MyClass<string>("张三")

})();