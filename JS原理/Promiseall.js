// // promise 是静态方法，不应挂载在prototype上，应该写在构造函数上

// Promise.myAll = function (params) {
//   let rej;
//   let res;
//   // 内部处理promise
//   const p = new Promise((resolve, reject) => {
//     res = resolve;
//     rej = reject;
//   });

//   // 由于params可能是各种类型，传参进来不一定是数组，但一定是迭代器能用for of 迭代
//   let i = 0;
//   const result = [];
//   for (const item of params) {
// 	const index = i;// 暂存下标，给异步代码确定完成的Promise下标
//     i++; // 计数
// 	// Promise包裹，保证传入对象最后的状态都是promise
// 	Promise.resolve(item).then((data) => {
// 		// 汇总结果
// 		// 保证输出顺序用下标储存结果
// 		result[index] = data;
// 		// 判断是否结束
// 		// 运行异步代码时，作为同步资源的i已经是传入参数的个数了
// 		i--;

// 		if(i === 0){
// 			return res(result)
// 		}
// 	}, rej)
//   }

//   if (i === 0) {
//     res([]);
//   }

//   return p;
// };

	Promise.myAll = function (params) {
	const p = new Promise((resolve, reject) => {
		let result = [];
		let i = 0;
		for (const item of params) {
		const index = i;
		i++;
		Promise.resolve(item).then((data) => {
			result[index] = data;

			i--;

			if (i === 0) {
			return resolve(result);
			}
		}, reject);
		}

		if (i === 0) {
		resolve([]);
		}
	});

	return p;
	};

Promise.myAll([1, 2, 3, 45]).then(
  (res) => {
    console.log("成功", res);
  },
  (err) => {
    console.log("错误", err);
  }
);
