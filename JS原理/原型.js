function Person(name) {
  this.name = name;
  this.fun = function () {
    return this.name;
  };
}

const p1 = new Person("111");
const p2 = new Person("222");

// console.log(p1.fun === p2.fun)
// console.log(p2.fun())

console.log(Person.prototype === Object.getPrototypeOf(p1))

// 构造函数也是函数
console.log(Object.getPrototypeOf(Person) === Function.prototype)

// 原型对象也是对象
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype)

// teacher.prototype -> Person.prototype -> Object.prototype

