const array = [1, 2, [3, 4], [4, 5, [6, 7, 8, [1, 2, 3]]], 1, 2, 3];

function flatArr(array) {
	return array.reduce((acc, curr) => {
		if (Array.isArray(curr)) {
			return [...acc, ...flatArr(curr)];
		} else {
			return [...acc, curr];
		}
	}, []);
}

// console.log(flatArr(array))

// 数组去重
function distinctArr(array) {
	const arr = {};
	array.forEach((item) => {
		arr[item] = 1;
	});

	return Object.keys(arr);
}

// console.log(distinctArr(flatArr(array)))

function flatten(arr) {
	while (
		arr.some((item) => {
			console.log(item)
			return Array.isArray(item);
		})
	) {
		arr = [].concat(...arr);
		console.log(arr);
	}
	return arr;
}

// 示例
const arr = [1, [2, [3, [4]], 5]];
console.log(flatten(arr)); // [1, 2, 3, 4, 5]
