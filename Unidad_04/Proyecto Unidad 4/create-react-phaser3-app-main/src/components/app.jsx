import React, { useState } from "react";
import Menu from "./menu";
import Header from "./header";

export default function App() {

	const [gameLoaded, setGameLoaded] = useState(false);

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

	async function handleLoadGameState() {
		await performedTask();
		setGameLoaded(true);
	}

	return (
		<div id="homePage" className="App" onLoad={handleLoadGameState}>
			<Header />
			{gameLoaded ? <Menu /> : <div><p>Loading ...</p> <div id="progressBar"></div></div>}
		</div>
	)
}