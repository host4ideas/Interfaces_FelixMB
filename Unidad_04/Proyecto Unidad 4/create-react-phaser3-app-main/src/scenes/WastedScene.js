import Phaser from 'phaser';
import wastedVideo from '../assets/video/gtav_wasted.mp4';

export default class WastedScene extends Phaser.Scene {
	constructor() {
		super('wastedscene');
	}

	preload() {
		this.load.video('wasted', wastedVideo, 'loadeddata', true, false);
	}

	create() {
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

		var vid = this.add.video(screenCenterX, screenCenterY, 'wasted');

		vid.play(false);

		// Prevents video freeze when game is out of focus (i.e. user changes tab on the browser)
		vid.setPaused(false);
	}
}
