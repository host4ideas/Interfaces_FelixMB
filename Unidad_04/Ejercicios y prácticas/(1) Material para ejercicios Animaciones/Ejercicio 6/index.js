const main = () => {
	const fileOne = fetch("https://reqres.in/api/users");
	const fileTwo = fetch("https://reqres.in/api/login");
	const progressText = $("#progressText");
	const progressBar = $("#progressBar");

	function animate() {
		const duration = 2000;
		// +new Date() parses the current date to ms
		const end = +new Date() + duration;

		const step = () => {
			console.log("test");
			let current = +new Date();
			let remaining = end - current;

			let rate = 1 - remaining / duration;

			if (progressBar.css("width") == '100%' || remaining < 60) {
				return;
			}

			progressBar.css("width", `${(rate * (100))}%`)

			requestAnimationFrame(step);
		}
		step();
	}

	function performedTask() {
		return new Promise(res => {
			animate();
			setTimeout(() => {
				res();
			}, 2000);
		})
	}

	$("#startFetch").click(() => {
		switch ($("#fileSelection").val()) {
			case "0":
				progressText.html("Loading ...");
				fileOne.then(result => {
					return performedTask();
				}).then(result => {
					progressText.html("El fichero cargó correctamente");
				}).catch((err) => {
					progressText.html(err);
				});
				break;
			case "1":
				progressText.html("Loading ...");
				Promise.all([fileOne, fileTwo]).then(result => {
					return performedTask();
				}).then(result => {
					progressText.html("El fichero cargó correctamente");
				}).catch((err) => {
					progressText.html(err);
				});
				break;
			case "2":
				progressText.html("Loading ...");
				Promise.race([fileOne, fileTwo]).then(result => {
					return performedTask();
				}).then(result => {
					progressText.html("El fichero cargó correctamente");
				}).catch((err) => {
					progressText.html(err);
				});
				break;
		}
	});
}

window.onload = main;