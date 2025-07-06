function sendRequest(url, callback, method, data) {
	const xhr = new XMLHttpRequest();

	xhr.open(method, url, true);

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			const response = xhr.responseText;
			callback(response);
		}
	};

	if (method === "POST") {
		// xhr.setRequestHeader(
		// 	"Content-type",
		// 	"application/x-www-form-urlencoded"
		// );
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		xhr.setRequestHeader("Content-Type", "application/json");
	}

	xhr.send(JSON.stringify(data));
}

sendRequest(
	"http://localhost:3000/admin/acl/index/login",
	(response) => {
		console.log(response);
	},
	"POST",
	{ username: "System", password: "111111" }
);
