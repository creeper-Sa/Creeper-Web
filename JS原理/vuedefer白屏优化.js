// 没有vue环境实现个自增函数算了
const currentValue = 0;

// 不声明数据类型变量会被挂载到global上

let animationId = null;

function updateCount() {
	animationId = requestAnimationFrame(() => {
		currentValue++;
		updateCount();
	}); // jsAPI 查看当前帧数
}

function stopAnimation() {
	cancelAnimationFrame(animationId); // 清除当前动画帧
	animationId = null;
}

function defer(n) {
	return currentValue > n;
}

updateCount()
console.log(currentValue);
stopAnimation()
