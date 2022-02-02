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

		vid.setDisplaySize(
			(this.cameras.main.worldView.x + this.cameras.main.width),
			(this.cameras.main.worldView.y + this.cameras.main.height)
		);

		vid.play(true);

		// Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
		vid.setPaused(false);

		this.time.delayedCall(3000, () => {
			this.cameras.main.fadeOut(1200, 0, 0, 0);

			this.time.delayedCall(1200, () => {
				this.scene.switch('mainscene');
			});
		});
	}
}
