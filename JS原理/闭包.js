function fun () {
	let a = 0;
	return function () {
		a++
		console.log(a)
	}
}

// fun()()// 导致内存泄漏
const closure = fun()
closure()
closure()
closure = null; // 解除闭包

