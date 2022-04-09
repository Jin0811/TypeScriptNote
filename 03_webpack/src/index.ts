import { test } from "./moduleTest"
console.log(test)

function sum(a: number, b: number): number{
  return a+b
}

console.log(sum(1,25));


const obj = {
  name: "张三",
  age: 33,
}
console.log(obj);

obj.age = 18;
console.log(obj);

console.log(Promise)
