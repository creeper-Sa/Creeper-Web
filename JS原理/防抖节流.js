// 防抖是指在同一时间触发多次事件，只会执行最后一次，防止发送多次相同请求，用于表单验证延迟判定，窗口大小改变完再做出反应

// 传入需要防抖的事件回调和时间间隔
function debounce(fun, wait) {
	let timer = null;

	return function (args) {
		// 每次调用清除上次还没结果的定时器
		clearTimeout(timer);
		timer = setTimeout(() => {
			fun(...args);
		}, wait);
	};
}

// 节流是指在同一事件触发多次事件，只会执行第一次，减少事件发生频率，可以用于滚动事件判定，按钮点击

function throttle(fun, wait) {
	let timer = null;

	return function (args) {
		// 如果timer不为null说明有事件正在进行
		if (timer) {
			return;
		}
		timer = setTimeout(() => {
			fun(...args);
			timer = null;
		}, wait);
	};
}
