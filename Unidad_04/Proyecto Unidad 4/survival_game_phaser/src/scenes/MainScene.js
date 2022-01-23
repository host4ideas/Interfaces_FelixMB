export default class MainScene extends Phaser.Scene {
	constructor() {
		super('MainScene');
	}

	preload(){
		this.preload.image('card', '../assets/card.js')
	}
}