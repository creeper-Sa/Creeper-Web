() => {
	// 箭头函数的this指向包裹它的作用域的this
}

function func () {
	// 匿名函数/具名函数
	// 直接调用的情况下，this指向全局（global或者window）
}

call,apply,bind
//bind只认第一次调用的对象为this
// call\apply认括号里的对象为this

new Object()// new this指向新创建的对象

obj.fun() // obj.调用，this指向obj