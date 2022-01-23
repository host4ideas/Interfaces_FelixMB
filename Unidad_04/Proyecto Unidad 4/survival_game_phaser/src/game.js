import MainScene from './MainScene.js';

const config = {
	type: Phaser.AUTO,
	parent: 'survival-game',
	width: 800,
	height: 600,
	pixelArt: true,
	scene: [Example]
};

const game = new Phaser.Game(config);