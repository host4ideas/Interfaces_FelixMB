import MainScene from './scenes/MainScene.js'

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
			debug: true,
			debugShowBody: true
		}
	},
};

const game = new Phaser.Game(config);