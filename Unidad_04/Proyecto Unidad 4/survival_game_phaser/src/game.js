import MainScene from './MainScene.js';

const config = {
	width: 640,
	heigth: 1024,
	backgroundColor: "#333333",
	type: Phaser.AUTO,
	parent: "survival-game",
	scene: [MainScene]
}

new Phaser.Game(config);