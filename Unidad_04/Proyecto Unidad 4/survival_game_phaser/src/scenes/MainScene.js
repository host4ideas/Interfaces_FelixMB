// Zombie variables
let zombie;
let zombieGroup;

// Survivor variables
let survivor;
let availableGuns = ['flashlight', 'knife', 'handgun', 'rifle', 'shotgun'];
let survivorGun = availableGuns[2];

// Game variables
var target = 0;
const ROTATION_SPEED = 1 * Math.PI; // radians per second
let timedEvent;

// Bullet variables
var bullet;
var mouse;
var input;
var control = false;
var worldBounds;

/**
 **** MAIN SCENE CLASS ****
 */

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
		this.load.image('bullet', '../assets/sprites/bullet5.png');
	}

	create() {
		/**
		 ***** SURVIVOR ANIMATIONS *****
		 */

		// Add the character sprite to the map
		survivor = this.add.sprite(600, 370);
		survivor.setScale(0.5);

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
			Flashlight animations
		*/

		survivor.anims.create({
			key: 'survivor-move-flashlight',
			frames: this.anims.generateFrameNames('survivor_animations_flashlight', {
				prefix: "survivor-move_flashlight_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-idle-flashlight',
			frames: this.anims.generateFrameNames('survivor_animations_flashlight', {
				prefix: "survivor-idle_flashlight_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-meleeattack-flashlight',
			frames: this.anims.generateFrameNames('survivor_animations_flashlight', {
				prefix: "survivor-meleeattack_flashlight_",
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

		survivor.anims.create({
			key: 'survivor-move-rifle',
			frames: this.anims.generateFrameNames('survivor_animations_rifle', {
				prefix: "survivor-move_rifle_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-idle-rifle',
			frames: this.anims.generateFrameNames('survivor_animations_rifle', {
				prefix: "survivor-idle_rifle_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-meleeattack-rifle',
			frames: this.anims.generateFrameNames('survivor_animations_rifle', {
				prefix: "survivor-meleeattack_rifle_",
				suffix: ".png",
				start: 0,
				end: 14
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-reload-rifle',
			frames: this.anims.generateFrameNames('survivor_animations_rifle', {
				prefix: "survivor-reload_rifle_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-shoot-rifle',
			frames: this.anims.generateFrameNames('survivor_animations_rifle', {
				prefix: "survivor-shoot_rifle_",
				suffix: ".png",
				start: 0,
				end: 2
			}),
			frameRate: 10,
			repeat: -1
		});

		/*
			shotgun animations
		*/

		survivor.anims.create({
			key: 'survivor-move-shotgun',
			frames: this.anims.generateFrameNames('survivor_animations_shotgun', {
				prefix: "survivor-move_shotgun_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-idle-shotgun',
			frames: this.anims.generateFrameNames('survivor_animations_shotgun', {
				prefix: "survivor-idle_shotgun_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-meleeattack-shotgun',
			frames: this.anims.generateFrameNames('survivor_animations_shotgun', {
				prefix: "survivor-meleeattack_shotgun_",
				suffix: ".png",
				start: 0,
				end: 14
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-reload-shotgun',
			frames: this.anims.generateFrameNames('survivor_animations_shotgun', {
				prefix: "survivor-reload_shotgun_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-shoot-shotgun',
			frames: this.anims.generateFrameNames('survivor_animations_shotgun', {
				prefix: "survivor-shoot_shotgun_",
				suffix: ".png",
				start: 0,
				end: 2
			}),
			frameRate: 10,
			repeat: -1
		});


		/*
			Handgun animations
		*/

		survivor.anims.create({
			key: 'survivor-move-handgun',
			frames: this.anims.generateFrameNames('survivor_animations_handgun', {
				prefix: "survivor-move_handgun_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-idle-handgun',
			frames: this.anims.generateFrameNames('survivor_animations_handgun', {
				prefix: "survivor-idle_handgun_",
				suffix: ".png",
				start: 0,
				end: 19
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-meleeattack-handgun',
			frames: this.anims.generateFrameNames('survivor_animations_handgun', {
				prefix: "survivor-meleeattack_handgun_",
				suffix: ".png",
				start: 0,
				end: 14
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-reload-handgun',
			frames: this.anims.generateFrameNames('survivor_animations_handgun', {
				prefix: "survivor-reload_handgun_",
				suffix: ".png",
				start: 0,
				end: 14
			}),
			frameRate: 20,
			repeat: -1
		});

		survivor.anims.create({
			key: 'survivor-shoot-handgun',
			frames: this.anims.generateFrameNames('survivor_animations_handgun', {
				prefix: "survivor-shoot_handgun_",
				suffix: ".png",
				start: 0,
				end: 2
			}),
			frameRate: 10,
			repeat: -1
		});

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
		zombieGroup = this.physics.add.group();
		zombieGroup.create(200, 100, 'zombie_animations');
		zombieGroup.create(400, 100, 'zombie_animations');

		zombieGroup.children.entries.forEach(zombie => {
			zombie.setScale(0.5);
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
					prefix: "skeleton-idle_",
					suffix: ".png",
					start: 0,
					end: 15
				}),
				frameRate: 8,
				repeat: -1
			});

			zombie.anims.create({
				key: 'meleeattack-zombie',
				frames: this.anims.generateFrameNames('zombie_animations', {
					prefix: "skeleton-attack_",
					suffix: ".png",
					start: 0,
					end: 7
				}),
				frameRate: 10,
				repeat: -1
			});
		})

		// timedEvent = this.time.addEvent({ delay: 50, callback: createZombie, callbackScope: this, loop: true });

		// function createZombie() {
		// 	this.physics.add.existing(zombie);
		// 	addAnimations(zombie);
		// }

		// zombieGroup = this.physics.add.group();

		// // Follow the mouse pointer as rotation direction
		// this.input.on('pointermove', function (pointer) {
		// 	target = Phaser.Math.Angle.BetweenPoints(zombie, pointer);
		// });

		// this.input.on('pointermove', function (pointer) {
		// 	zombie.x = pointer.x;
		// 	zombie.y = pointer.y;
		// }, this);

		// for mouse click event
		mouse = this.input.mousePointer;
		// for mouse position
		input = this.input;

		// set game bounds
		worldBounds = this.physics.world.bounds;
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

		// Animations object will be updated whenever the user changes gun
		let survivorAnimations = {
			idle: "",
			walk: "",
			meleeattack: "",
			shoot: "",
			reload: ""
		};

		// Switch animations depending on the actual gun
		switch (survivorGun) {
			case 'knife':
				survivorAnimations["idle"] = "survivor-idle-knife";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-knife";
				survivorAnimations["walk"] = "survivor-move-knife";
				break;
			case 'flashlight':
				survivorAnimations["idle"] = "survivor-idle-flashlight";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-flashlight";
				survivorAnimations["walk"] = "survivor-move-flashlight";
				break;
			case 'rifle':
				survivorAnimations["idle"] = "survivor-idle-rifle";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-rifle";
				survivorAnimations["walk"] = "survivor-move-rifle";
				survivorAnimations["shoot"] = "survivor-shoot-rifle";
				survivorAnimations["reload"] = "survivor-reload-rifle";
				break;
			case 'shotgun':
				survivorAnimations["idle"] = "survivor-idle-shotgun";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-shotgun";
				survivorAnimations["walk"] = "survivor-move-shotgun";
				survivorAnimations["shoot"] = "survivor-shoot-shotgun";
				survivorAnimations["reload"] = "survivor-reload-shotgun";
				break;
			case 'handgun':
				survivorAnimations["idle"] = "survivor-idle-handgun";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-handgun";
				survivorAnimations["walk"] = "survivor-move-handgun";
				survivorAnimations["shoot"] = "survivor-shoot-handgun";
				survivorAnimations["reload"] = "survivor-reload-handgun";
				break;
		}

		/*
			Map animations with keyboard keys
		*/
		var keyW = this.input.keyboard.addKey('W');  // Get key W object
		keyW.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);
			// survivor.y += -160;
		});
		keyW.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyA = this.input.keyboard.addKey('A');  // Get key A object
		keyA.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);
			survivor.setVelocityX(-160);
		});
		keyA.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyS = this.input.keyboard.addKey('S');  // Get key S object
		keyS.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);
			survivor.setVelocityY(-160);
		});
		keyS.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyD = this.input.keyboard.addKey('D');  // Get key D object
		keyD.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);
			survivor.setVelocityX(160);
		});
		keyD.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyQ = this.input.keyboard.addKey('Q');  // Get key Q object
		keyQ.on('down', ev => {
			survivor.play(survivorAnimations["meleeattack"]);
		});
		keyQ.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyE = this.input.keyboard.addKey('E');  // Get key E object
		keyE.on('down', ev => {
			survivor.play(survivorAnimations["shoot"]);
		});
		keyE.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		var keyR = this.input.keyboard.addKey('R');  // Get key R object
		keyR.on('down', ev => {
			survivor.play(survivorAnimations["reload"]);
		});
		keyR.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});

		/**
		 * Zombie updates
		 */
		var keyW = this.input.keyboard.addKey('W');  // Get key W object
		var keyW = this.input.keyboard.addKey('Q');  // Get key Q object
		zombieGroup.children.entries.forEach(zombie => {
			// Rotation of the character
			zombie.rotation = Phaser.Math.Angle.RotateTo(
				zombie.rotation,
				target,
				ROTATION_SPEED * 0.002 * delta,
			);
			// Map animations with keyboard keys
			keyW.on('down', ev => {
				zombie.play('walk-zombie');
			});
			keyW.on('up', ev => {
				zombie.play('idle-zombie');
			});
			keyQ.on('down', ev => {
				zombie.play('meleeattack-zombie');
			});
			keyQ.on('up', ev => {
				zombie.play('idle-zombie');
			});
		})

		/**
		 * Bullet updates
		 */
		function spriteHitHealth(sprite, zombie) {
			//  Hide the sprite
			zombieGroup.killAndHide(zombie);

			//  And disable the body
			zombie.body.enable = false;
		}

		// mouse clicked
		if (mouse.isDown && control == false) {
			// for fire again
			bullet = this.physics.add.sprite(survivor.x, survivor.y, 'bullet');
			// bullet sprite rotation to mouse firection
			updateAngle(this, bullet);
			// move to mouse position 
			this.physics.moveTo(bullet, input.x, input.y, 500);
			// call to fire function
			control = true;
			//  When the bullet sprite his a zombie from zombieGroup, call spriteHitHealth function
			this.physics.add.overlap(bullet, zombieGroup, spriteHitHealth);
		}

		// check world bounds
		if (typeof bullet == "object" && (bullet.x > worldBounds.width || bullet.y > worldBounds.height || bullet.x < 0 || bullet.y < 0)) {
			control = false;
		}
	}
}

// collide bullet and zombie action
function destroy() {
	zombie.destroy();
	bullet.destroy();
	control = false;
}

// Function to update the rotation of a sprite
function updateAngle(game, view) {
	const dx = game.input.activePointer.x - view.x;
	const dy = game.input.activePointer.y - view.y;
	const targetAngle = (360 / (2 * Math.PI)) * Math.atan2(dy, dx);

	view.angle = targetAngle;
}