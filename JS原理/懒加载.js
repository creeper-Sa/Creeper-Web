// 实现intersectionObserver实现可视窗口与图片相交再请求图片资源
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const image = entry.target
			const attribute = entry.target.getAttribute('data-src')
			console.log(attribute)
			entry.target.src = attribute
			observer.unobserve(image)
		}else {console.log(entry)}
	});
});

document.querySelectorAll("img").forEach((image) => {
	observer.observe(image, {
		childList: true,
		subtree: true,
	});
});
