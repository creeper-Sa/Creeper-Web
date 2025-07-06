function Person() {
  this.array = [1, 2, 3];
}

// 原型链继承
// 多个实例修改污染数据
// function teacher() {

// }

// teacher.prototype = new Person();
// teacher.prototype.constructor = teacher;

// const t1 = new teacher();
// const t2 = new teacher();

// t1.array.push(4);
// console.log(t1.array);
// console.log(t2.array);

// 通过构造函数强化
// 只能继承父类的方法和属性，对于原型上的方法和属性是继承不到的
// 每次创建子类实例都会实例化一个父类，对资源的消耗是很大的
// function teacher() {
// 	Person.call(this)
// }

// Person.prototype.a = 1

// const t1 = new teacher()
// console.log(t1)

// console.log(Object.getPrototypeOf(teacher.prototype) === Person.prototype)

// 组合式继承（组合原型链和构造函数强化）
// 会导致属性在原型上存储了一份，在实例上又存储了一份，浪费空间

// function teacher() {
//   Person.call(this); // 第二
// }

// teacher.prototype = new Person() // 第一次调用Person
// teacher.prototype.constructor = teacher;

// Person.prototype.a = 1;

// const t1 = new teacher()
// console.log(t1.a) // 1 拿到原型上的数据
// console.log(t1.array) // [1,2,3] 有自己的单独数据

// 寄生式外加借用父类构造函数解决缺点

// function teacher () {
// 	Person.call(this)
// }

// function inheritPrototype(subType, superType) {
// 	const prototype = Object.create(superType.prototype) // 创建一个__proto__指向superType.prototype的空对象
// 	console.log(Object.getPrototypeOf(prototype) === superType.prototype) // true
// 	prototype.constructor = subType // 修正构造函数
// 	subType.prototype = prototype // 给subtype原型赋引用值
// }

// inheritPrototype(teacher, Person)

// const t1 = new teacher()

// Person.prototype.a = 1

// console.log(t1.a)