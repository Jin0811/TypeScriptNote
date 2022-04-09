// 定义一个变量为10
let a = 10

// noImplicitAny
function add(a: number, b:number): number{
  return a+b
}

// noImplicitThis
function test(this: Window){
  console.log(this);
}

// strictNullChecks
// box1可能是dom元素，也可能是null
let box1 = document.getElementById('box1')
if(box1){
  box1.addEventListener('click', function(){
    alert("1")
  })
}