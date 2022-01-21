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

	$("#startFetch").click(async () => {
		switch ($("#fileSelection").val()) {
			case "0":
				try {
					progressText.html("Loading ...");
					await fileOne;
					await performedTask();
					progressText.html("El fichero cargó correctamente");
				} catch (e) {
					progressText.html(e.message);
				}
				break;
			case "1":
				try {
					progressText.html("Loading ...");
					await Promise.all([fileOne, fileTwo]);
					await performedTask();
					progressText.html("El fichero cargó correctamente");
				} catch (e) {
					progressText.html(e.message);
				}
				break;
			case "2":
				try {
					progressText.html("Loading ...");
					await Promise.race([fileOne, fileTwo]);
					performedTask();
					progressText.html("El fichero cargó correctamente");
				} catch (e) {
					progressText.html(e.message);
				}
				break;
		}
	});
}

window.onload = main;