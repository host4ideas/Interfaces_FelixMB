import MainScene from './scenes/MainScene.js'

const main = () => {
	let game;
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
		if (typeof game == "object") {
			game.destroy(true);
		}
		game = new Phaser.Game(config);
		$(".default-hidden").fadeToggle("400");
		$(".toogle-fade").fadeToggle("400");
	});

	$("#pause").click(() => {
		game.scene.pause("default");
	});

	$("#resume").click(() => {
		game.scene.resume("default");
	});

	// Pause game with P key
	$(document).keydown(function (event) {
		console.log(event.key);
		if (event.key == "Escape") {
			game.scene.pause("default");
		}
	});

	$("#survival-game").click(() => {
		game.scene.resume("default");
	})
}

window.onload = main;