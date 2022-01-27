import React from "react";
import Menu from "./menu";
import Header from "./header";

export default function App() {

	const [gameLoaded, setGameLoaded] =

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

	async function 

	return (
		<div id="homePage" className="App">
			<Header />
			<p id="progressText">Aquí se realiza el seguimiento</p>
			<div id="progressBar"></div>
			<Menu />
		</div>
	)
}