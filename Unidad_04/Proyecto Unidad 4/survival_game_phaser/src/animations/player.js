let zombie;
let player;
var target = 0;
const ROTATION_SPEED = 1 * Math.PI; // radians per second

class Example extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.atlas('zombie_animations', '../assets/textures/top_down_zombie/texture.png', '../assets/textures/top_down_zombie/texture.json');
		this.load.atlas('zombie_animations', '../assets/textures/top_down_zombie/texture.png', '../assets/textures/top_down_zombie/texture.json');
	}

	create() {
		// // Animation set
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNames('zombie_animations', {
				prefix: "skeleton-move_",
				suffix: ".png",
				start: 0,
				end: 15
			}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNames('zombie_animations', {
				prefix: "skeleton-idle_",
				suffix: ".png",
				start: 0,
				end: 15
			}),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'kick',
			frames: this.anims.generateFrameNames('zombie_animations', {
				prefix: "skeleton-attack_",
				suffix: ".png",
				start: 0,
				end: 7
			}),
			frameRate: 10,
			repeat: -1
		});

		// Add the character sprite to the map
		zombie = this.add.sprite(600, 370);
		zombie.setScale(1);

		// Follow the mouse pointer as rotation direction
		this.input.on('pointermove', function (pointer) {
			target = Phaser.Math.Angle.BetweenPoints(zombie, pointer);
		});

		// this.input.on('pointermove', function (pointer) {
		// 	zombie.x = pointer.x;
		// 	zombie.y = pointer.y;
		// }, this);
	}
	update(time, delta) {

		// Rotation of the character
		zombie.rotation = Phaser.Math.Angle.RotateTo(
			zombie.rotation,
			target,
			ROTATION_SPEED * 0.002 * delta,
		);

		var keyW = this.input.keyboard.addKey('W');  // Get key W object
		keyW.on('down', ev => {
			zombie.play('walk');
		});
		keyW.on('up', ev => {
			zombie.play('idle');
		});

		var keyW = this.input.keyboard.addKey('Q');  // Get key W object
		keyW.on('down', ev => {
			zombie.play('kick');
		});
		keyW.on('up', ev => {
			zombie.play('idle');
		});

		// //  only move when you click
		// if (game.input.mousePointer.isDown) {
		// 	//  400 is the speed it will move towards the mouse
		// 	game.physics.arcade.moveToPointer(zombie, 400);

		// 	//  if it's overlapping the mouse, don't move any more
		// 	if (Phaser.Rectangle.contains(zombie.body, game.input.x, game.input.y)) {
		// 		zombie.body.velocity.setTo(0, 0);
		// 	}
		// }
	}
}

const config = {
	type: Phaser.AUTO,
	parent: 'survival-game',
	width: 800,
	height: 600,
	pixelArt: true,
	scene: [Example],
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
			debugShowBody: true
		}
	},
};

const game = new Phaser.Game(config);