import Phaser from 'phaser';
import warpVideo from '../assets/video/wormhole.mp4';

export default class WarpScene extends Phaser.Scene {
	constructor() {
		super('warpscene');
	}

	preload() {
		this.load.video('wormhole', warpVideo, 'loadeddata', false, true);
	}

	create() {
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		var vid = this.add.video(screenCenterX, screenCenterY, 'wormhole');

		vid.play(true);

		// Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
		vid.setPaused(false);

		setTimeout(() => {
			this.scene.start('mainscene');
		}, 4000);
	}
}
