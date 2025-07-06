function person(a, b, c, d) {
	console.log(this.name);
	console.log(a, b, c, d);
	return { a, b, c, d };
}

const man = {
	name: "曼巴",
};

// 方法挂到原型上
Function.prototype.myCall = function (obj) {
	// 指定函数的this指向, 如果传入null就指向window
	const bindObj = obj || global;
	bindObj.p = this; // 这里this指向调用call的函数
	const args = [...arguments]; // 把伪数组转换成真数组
	args.splice(0, 1);
	const result = bindObj.p(...args);
	delete bindObj.p; // 不能改变原对象

	// 解决需要返回值的问题
	return result;
};

// console.log(person.myCall(null, 1, 2, 3, 4));

Function.prototype.myApply = function (obj) {
	const bindObj = obj || global;
	bindObj.f = this;

	const args = arguments[1];
	const result = bindObj.f(...args);
	delete bindObj.f;

	return result;
};

// console.log(person.myApply(null, [1, 2, 3, 4]));

Function.prototype.myBind = function (obj) {
	const that = this;

	const args = [...arguments].slice(1);

	// 存储函数
	const func = function () {
		const allArgs = [...args, ...arguments];

		// 如果this指向是func的实例， 说明调用了new方法， 特殊处理（new 方法会将this指向用new新创建的实例）
		if (this instanceof func) {
			// 把这个函数的this指向新创建的对象
			that.apply(this, allArgs);
		} else {
			that.apply(obj, allArgs)
		}
	};

	func.prototype = that.prototype; // 调用func的构造就相当于调用that的

	return func;
};

const aaa = person.myBind(man, 1, 2);
new aaa(3, 4);


// global.name = '哈哈哈'

// aaa(1, 2, 3, 4)
// aaa(3, 4)
