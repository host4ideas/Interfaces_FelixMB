import MainScene from './scenes/MainScene.js'

const main = () => {
	console.log("window loaded");
	const config = {
		type: Phaser.AUTO,
		parent: 'survival-game',
		width: 800,
		height: 600,
		pixelArt: true,
		scene: [MainScene],
		physics: {
			default: "arcade",
			arcade: {
				// debug: true,
				// debugShowBody: true,
				gravity: { y: 0 }
			}
		},
	};

	$("#startGame").click(() => {
		console.log("click")
		const game = new Phaser.Game(config);
	});
}

window.onload = main;