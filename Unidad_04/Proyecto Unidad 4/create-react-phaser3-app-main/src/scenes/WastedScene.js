import Phaser from 'phaser';
import wastedVideo from '../assets/video/gtav_wasted.mp4';
// Audio controller
import audioController from "../audioController";

export default class WastedScene extends Phaser.Scene {
	constructor() {
		super('wastedscene');
	}

	preload() {
		this.load.video('wasted', wastedVideo, 'loadeddata', true, false);
	}

	create() {
		// Pause all audios
		audioController.pauseAllAudios();

		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		var vid = this.add.video(screenCenterX, screenCenterY, 'wasted');

		vid.setDisplaySize(
			(this.cameras.main.worldView.x + this.cameras.main.width),
			(this.cameras.main.worldView.y + this.cameras.main.height)
		);

		vid.play(false);

		// Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
		vid.setPaused(false);

		this.time.delayedCall(7000, () => {
			this.sys.game.destroy(true);
		});
	}
}
