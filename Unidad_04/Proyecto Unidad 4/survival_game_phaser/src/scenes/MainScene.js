let zombie;
let survivor;
let availableGuns = ['flashlight', 'knife', 'handgun', 'rifle', 'shotgun'];
let survivorGun = availableGuns[1];
var target = 0;
const ROTATION_SPEED = 1 * Math.PI; // radians per second

export default class MainScene extends Phaser.Scene {
	constructor() {
		super();
	}

	preload() {
		this.load.atlas('survivor_animations_knife', '../assets/textures/top_down_survivor/survivor_knife/survivor_knife.png', '../assets/textures/top_down_survivor/survivor_knife/survivor_knife.json');
		this.load.atlas('survivor_animations_rifle', '../assets/textures/top_down_survivor/survivor_rifle/survivor_rifle.png', '../assets/textures/top_down_survivor/survivor_rifle/survivor_rifle.json');
		this.load.atlas('survivor_animations_shotgun', '../assets/textures/top_down_survivor/survivor_shotgun/survivor_shotgun.png', '../assets/textures/top_down_survivor/survivor_shotgun/survivor_shotgun.json');
		this.load.atlas('survivor_animations_handgun', '../assets/textures/top_down_survivor/survivor_handgun/survivor_handgun.png', '../assets/textures/top_down_survivor/survivor_handgun/survivor_handgun.json');
		this.load.atlas('survivor_animations_flashlight', '../assets/textures/top_down_survivor/survivor_flashlight/survivor_flashlight.png', '../assets/textures/top_down_survivor/survivor_flashlight/survivor_flashlight.json');
		this.load.atlas('zombie_animations', '../assets/textures/top_down_zombie/texture.png', '../assets/textures/top_down_zombie/texture.json');
	}

	create() {
		/**
		 ***** SURVIVOR ANIMATIONS *****
		 */

		// Add the character sprite to the map
		survivor = this.add.sprite(600, 370);
		survivor.setScale(1);

		/*
			Knife animations
		*/
		survivor.anims.create({
			key: 'survivor-move-knife',
			frames: this.anims.generateFrameNames('survivor_animations_knife', {
				prefix: "survivor-move_knife_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-idle-knife',
			frames: this.anims.generateFrameNames('survivor_animations_knife', {
				prefix: "survivor-idle_knife_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-meleeattack-knife',
			frames: this.anims.generateFrameNames('survivor_animations_knife', {
				prefix: "survivor-meleeattack_knife_",
				suffix: ".png",
				start: 0,
				end: 14
			}),
			frameRate: 20,
			repeat: -1
		});


		/*
			Rifle animations
		*/

		/*
			Shotgun animations
		*/

		/*
			Flashlight animations
		*/

		/*
			Handgun animations
		*/

		// Follow the mouse pointer as rotation direction
		this.input.on('pointermove', function (pointer) {
			target = Phaser.Math.Angle.BetweenPoints(survivor, pointer);
		});

		// this.input.on('pointermove', function (pointer) {
		// 	zombie.x = pointer.x;
		// 	zombie.y = pointer.y;
		// }, this);

		/**
		 ***** ZOMBIE ANIMATIONS *****
		 */


		// Add the character sprite to the map
		zombie = this.add.sprite(400, 370);
		zombie.setScale(1);

		zombie.anims.create({
			key: 'walk-zombie',
			frames: this.anims.generateFrameNames('zombie_animations', {
				prefix: "skeleton-move_",
				suffix: ".png",
				start: 0,
				end: 15
			}),
			frameRate: 10,
			repeat: -1
		});

		zombie.anims.create({
			key: 'idle-zombie',
			frames: this.anims.generateFrameNames('zombie_animations', {
				prefix: "skeleton-idle-zombie_",
				suffix: ".png",
				start: 0,
				end: 15
			}),
			frameRate: 8,
			repeat: -1
		});

		zombie.anims.create({
			key: 'kick-zombie',
			frames: this.anims.generateFrameNames('zombie_animations', {
				prefix: "skeleton-attack_",
				suffix: ".png",
				start: 0,
				end: 7
			}),
			frameRate: 10,
			repeat: -1
		});

		// // Follow the mouse pointer as rotation direction
		// this.input.on('pointermove', function (pointer) {
		// 	target = Phaser.Math.Angle.BetweenPoints(zombie, pointer);
		// });

		// this.input.on('pointermove', function (pointer) {
		// 	zombie.x = pointer.x;
		// 	zombie.y = pointer.y;
		// }, this);
	}
	update(time, delta) {
		/**
		 * Survivor updates
		 */
		// Rotation of the character
		survivor.rotation = Phaser.Math.Angle.RotateTo(
			survivor.rotation,
			target,
			ROTATION_SPEED * 0.002 * delta,
		);

		let survivorAnimations = {
			idle: "",
			walk: "",
			kick: "",
			shot: "",
			reload: ""
		};

		// Switch animations depending on the actual gun
		switch (survivorGun) {
			case 'knife':
				survivorAnimations["idle"] = "survivor-idle-knife";
				survivorAnimations["kick"] = "survivor-meleeattack-knife";
				survivorAnimations["walk"] = "survivor-move-knife";
				break;
			case 'flashlight':
				survivorAnimations["idle"] = "survivor-idle-knife";
				survivorAnimations["kick"] = "survivor-meleeattack-knife";
				survivorAnimations["walk"] = "survivor-move-knife";
				break;
			case 'rifle':
				survivorAnimations["idle"] = "survivor-idle-knife";
				survivorAnimations["kick"] = "survivor-meleeattack-knife";
				survivorAnimations["walk"] = "survivor-move-knife";
				survivorAnimations["shot"] = "survivor-move-knife";
				survivorAnimations["reload"] = "survivor-move-knife";
				break;
			case 'shotgun':
				survivorAnimations["idle"] = "survivor-idle-knife";
				survivorAnimations["kick"] = "survivor-meleeattack-knife";
				survivorAnimations["walk"] = "survivor-move-knife";
				survivorAnimations["shot"] = "survivor-move-knife";
				survivorAnimations["reload"] = "survivor-move-knife";
				break;
			case 'handgun':
				survivorAnimations["idle"] = "survivor-idle-knife";
				survivorAnimations["kick"] = "survivor-meleeattack-knife";
				survivorAnimations["walk"] = "survivor-move-knife";
				survivorAnimations["shot"] = "survivor-move-knife";
				survivorAnimations["reload"] = "survivor-move-knife";
				break;
		}

		var keyW = this.input.keyboard.addKey('W');  // Get key W object
		keyW.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);
		});
		keyW.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyQ = this.input.keyboard.addKey('Q');  // Get key W object
		keyQ.on('down', ev => {
			survivor.play(survivorAnimations["kick"]);
		});
		keyQ.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyE = this.input.keyboard.addKey('E');  // Get key W object
		keyE.on('down', ev => {
			survivor.play(survivorAnimations["shot"]);
		});
		keyE.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyR = this.input.keyboard.addKey('R');  // Get key W object
		keyR.on('down', ev => {
			survivor.play(survivorAnimations["reload"]);
		});
		keyR.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});

		/**
		 * Zombie updates
		 */
		// Rotation of the character
		zombie.rotation = Phaser.Math.Angle.RotateTo(
			zombie.rotation,
			target,
			ROTATION_SPEED * 0.002 * delta,
		);

		var keyW = this.input.keyboard.addKey('W');  // Get key W object
		keyW.on('down', ev => {
			zombie.play('walk-zombie');
		});
		keyW.on('up', ev => {
			zombie.play('idle-zombie');
		});
		var keyW = this.input.keyboard.addKey('Q');  // Get key W object
		keyW.on('down', ev => {
			zombie.play('kick-zombie');
		});
		keyW.on('up', ev => {
			zombie.play('idle-zombie');
		});
	}
}

