class Example extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.atlas('zombie_animations', '../../assets/textures/top_down_zombie/texture.png', '../../assets/textures/top_down_zombie/texture.json');
	}

	create() {
		// // Animation set
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNames('zombie_animations', {
				prefix: "skeleton-move_",
				suffix: ".png",
				start: 0,
				end: 4
			}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNames('zombie_animations', {
				prefix: "skeleton-idle_",
				suffix: ".png",
				start: 0,
				end: 16
			}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'kick',
			frames: this.anims.generateFrameNumbers('brawler', { frames: [10, 11, 12, 13, 10] }),
			frameRate: 8,
			repeat: -1,
			repeatDelay: 2000
		});

		this.anims.create({
			key: 'punch',
			frames: this.anims.generateFrameNumbers('brawler', { frames: [15, 16, 17, 18, 17, 15] }),
			frameRate: 8,
			repeat: -1,
			repeatDelay: 2000
		});

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('brawler', { frames: [20, 21, 22, 23] }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'jumpkick',
			frames: this.anims.generateFrameNumbers('brawler', { frames: [20, 21, 22, 23, 25, 23, 22, 21] }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'win',
			frames: this.anims.generateFrameNumbers('brawler', { frames: [30, 31] }),
			frameRate: 8,
			repeat: -1,
			repeatDelay: 2000
		});

		this.anims.create({
			key: 'die',
			frames: this.anims.generateFrameNumbers('brawler', { frames: [35, 36, 37] }),
			frameRate: 8,
		});

		const keys = ['walk', 'idle', 'kick', 'punch', 'jump', 'jumpkick', 'win', 'die'];

		const cody = this.add.sprite(600, 370);
		cody.setScale(1);

		var keyW = this.input.keyboard.addKey('W');  // Get key W object
		keyW.on('down', ev => {
			cody.play('walk');
		});
		keyW.on('up', ev => {
			cody.play('idle');
		});
	}
}

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	pixelArt: true,
	scene: [Example]
};

const game = new Phaser.Game(config);