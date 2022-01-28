import Phaser from 'phaser'
import survivorKnifeAnimations from '../assets/textures/top_down_survivor/survivor_knife/survivor_knife.png';
import survivorKnifeConfiguration from '../assets/textures/top_down_survivor/survivor_knife/survivor_knife.json';
import survivorRifleAnimations from '../assets/textures/top_down_survivor/survivor_rifle/survivor_rifle.png';
import survivorRifleConfiguration from '../assets/textures/top_down_survivor/survivor_rifle/survivor_rifle.json';
import survivorShotgunAnimations from '../assets/textures/top_down_survivor/survivor_shotgun/survivor_shotgun.png';
import survivorShotgunConfiguration from '../assets/textures/top_down_survivor/survivor_shotgun/survivor_shotgun.json';
import survivorHandgunAnimations from '../assets/textures/top_down_survivor/survivor_handgun/survivor_handgun.png';
import survivorHandgunConfiguration from '../assets/textures/top_down_survivor/survivor_handgun/survivor_handgun.json';
import survivorFlashlightAnimations from '../assets/textures/top_down_survivor/survivor_flashlight/survivor_flashlight.png';
import survivorFlashlightConfiguration from '../assets/textures/top_down_survivor/survivor_flashlight/survivor_flashlight.json';
import zombieAnimations from '../assets/textures/top_down_zombie/texture.png';
import zombieConfiguration from '../assets/textures/top_down_zombie/texture.json';
import bulletSprite from '../assets/sprites/bullet5.png';

// Zombie variables
let zombieGroup;

// Survivor variables
let survivor;
let availableGuns = ['flashlight', 'knife', 'handgun', 'rifle', 'shotgun'];
let survivorGun = availableGuns[2];

// Bullet variables
var bullet;
var mouse;
var input;

// Game variables
let target = 0;
const ROTATION_SPEED = 1 * Math.PI; // radians per second

// Game round variables
let currentRound = 1;
let zombieCount = 0;

// Damage and health variables
let weaponDamage = 2;
let survivorHealth = 5;
let zombieHitDelay = 400;

/**
 **** MAIN SCENE CLASS ****
 */
export default class MainScene extends Phaser.Scene {
	constructor() {
		super('mainscene');
		// Weapon variables
		this.lastShot = 0;
		this.shotDelay = 300;
		this.ammo = 90;
		this.currentMag = 30;
	}

	preload() {
		this.load.atlas('survivor_animations_knife', survivorKnifeAnimations, survivorKnifeConfiguration);
		this.load.atlas('survivor_animations_rifle', survivorRifleAnimations, survivorRifleConfiguration);
		this.load.atlas('survivor_animations_shotgun', survivorShotgunAnimations, survivorShotgunConfiguration);
		this.load.atlas('survivor_animations_handgun', survivorHandgunAnimations, survivorHandgunConfiguration);
		this.load.atlas('survivor_animations_flashlight', survivorFlashlightAnimations, survivorFlashlightConfiguration);
		this.load.atlas('zombie_animations', zombieAnimations, zombieConfiguration);
		// To add images
		this.textures.addBase64('bullet', bulletSprite);
	}

	create() {
		/**
		 **** AMMO INFO **** 
		 */
		this.ammoInfo = this.add.text(0, 0, `${this.currentMag} / ${this.ammo}`, { fontSize: '1.5rem' });

		/**
		 **** HEALTH INFO **** 
		 */
		this.healthInfo = this.add.text(200, 0, `Health: ${survivorHealth}`, { fontSize: '1.5rem' });

		/**
		 **** ROUND INFO **** 
		 */
		this.roundInfo = this.add.text(500, 0, `Round: ${currentRound}`, { fontSize: '1.5rem' });

		/**
		 ***** SURVIVOR ANIMATIONS *****
		 */
		// Add the character sprite to the map
		survivor = this.add.sprite(600, 370, `survivor_animations_${survivorGun}`);
		survivor.setScale(0.3);

		this.add.existing(survivor);
		this.physics.add.existing(survivor);

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

		/**
		 ***** ZOMBIE ANIMATIONS *****
		 */
		// Random create zombies from the game borders

		let { width, height } = this.sys.game.canvas;
		zombieGroup = this.physics.add.group();

		zombieGroup.children.entries.forEach(zombie => {
			zombie.setScale(0.2);
			zombie.zombieHealth = 5;

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

		/*
			Mouse inputs events
		*/
		// for mouse click event
		mouse = this.input.mousePointer;
		// for mouse position
		input = this.input;

		/**
		 **** Set survivor and zombie health regarding the game difficulty ****
		 */


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
				weaponDamage = 4;
				this.shotdelay = 500;
				break;
			case 'flashlight':
				survivorAnimations["idle"] = "survivor-idle-flashlight";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-flashlight";
				survivorAnimations["walk"] = "survivor-move-flashlight";
				weaponDamage = 1;
				this.shotdelay = 200;
				break;
			case 'rifle':
				survivorAnimations["idle"] = "survivor-idle-rifle";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-rifle";
				survivorAnimations["walk"] = "survivor-move-rifle";
				survivorAnimations["shoot"] = "survivor-shoot-rifle";
				survivorAnimations["reload"] = "survivor-reload-rifle";
				weaponDamage = 3;
				this.shotdelay = 300;
				break;
			case 'shotgun':
				survivorAnimations["idle"] = "survivor-idle-shotgun";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-shotgun";
				survivorAnimations["walk"] = "survivor-move-shotgun";
				survivorAnimations["shoot"] = "survivor-shoot-shotgun";
				survivorAnimations["reload"] = "survivor-reload-shotgun";
				weaponDamage = 4;
				this.shotdelay = 500;
				break;
			case 'handgun':
				survivorAnimations["idle"] = "survivor-idle-handgun";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-handgun";
				survivorAnimations["walk"] = "survivor-move-handgun";
				survivorAnimations["shoot"] = "survivor-shoot-handgun";
				survivorAnimations["reload"] = "survivor-reload-handgun";
				weaponDamage = 2;
				this.shotdelay = 400;
				break;
			default:
				survivorAnimations["idle"] = "survivor-idle-flashlight";
				survivorAnimations["meleeattack"] = "survivor-meleeattack-flashlight";
				survivorAnimations["walk"] = "survivor-move-flashlight";
				weaponDamage = 1;
				this.shotdelay = 200;
		}

		/*
			Key define
		*/
		var keyW = this.input.keyboard.addKey('W');  // Get key W object
		var keyA = this.input.keyboard.addKey('A');  // Get key A object
		var keyS = this.input.keyboard.addKey('S');  // Get key S object
		var keyD = this.input.keyboard.addKey('D');  // Get key D object
		var keyQ = this.input.keyboard.addKey('Q');  // Get key Q object
		var keyE = this.input.keyboard.addKey('E');  // Get key E object
		var keyR = this.input.keyboard.addKey('R');  // Get key R object

		/*
			Key bindings
		*/
		// Movements
		keyW.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);		// Up
			survivor.body.setVelocityY(-100);
		});
		keyW.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
			survivor.body.setVelocityY(0);
		});
		keyA.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);		// Left
			survivor.body.setVelocityX(-100);
		});
		keyA.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
			survivor.body.setVelocityX(0);
		});
		keyS.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);		// Down
			survivor.body.setVelocityY(100);
		});
		keyS.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
			survivor.body.setVelocityY(0);
		});
		keyD.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);		// Right
			survivor.body.setVelocityX(100);
		});
		keyD.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
			survivor.body.setVelocityX(0);
		});
		// Interactions
		keyQ.on('down', ev => {
			survivor.play(survivorAnimations["meleeattack"]);	// Melee atack
		});
		keyQ.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		keyE.on('down', ev => {
			survivor.play(survivorAnimations["shoot"]);		// Use
		});
		keyE.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		keyR.on('down', ev => {
			survivor.play(survivorAnimations["reload"]);	// Reload
		});
		keyR.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});

		// // Change weapon
		// this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
		// 	soil.tilePositionX += deltaX * 0.5;
		// 	soil.tilePositionY += deltaY * 0.5;
		// });

		/**
		 * Zombie updates
		 */
		zombieGroup.children.entries.forEach(zombie => {

			// move zombies to the survivor's position at 160 px/s
			this.physics.moveToObject(zombie, survivor, 100);

			// Rotation of the zombie to the survivor position
			updateAngleToSprite(survivor, zombie);

			zombie.play('walk-zombie');

			// When the zombie reaches the survivor
			// this.healthInfo.setText(`<i class="fas fa-heartbeat"></i>${survivorHealth -= 1}`);
		});

		/**
		 * Bullet updates
		 */
		// mouse clicked
		if (mouse.isDown) {
			// Check the delay and if survivor.alive === true
			if (this.time.now > (this.shotDelay + this.lastShot)) {
				// Make sure the player can't shoot when dead and that they are able to shoot another bullet
				this.lastShot = this.time.now;
				// Update ammo info
				this.ammoInfo.setText(`${this.currentMag -= 1} / ${this.ammo}`);
				// change the bullet spawn depending on the gun size
				bullet = this.physics.add.sprite(survivor.x, survivor.y, 'bullet');
				// bullet sprite rotation to mouse firection
				updateAngleToMouse(this, bullet);
				// move bullet to mouse direction
				this.physics.moveTo(bullet, input.x, input.y, 500);
				//  When the bullet sprite his a zombie from zombieGroup, call spriteHitHealth function
				this.physics.add.overlap(bullet, zombieGroup, spriteHitHealth);

				if (zombieCount == 0) {
					currentRound++;
					newRound();
				}
			}
		}
	}
}

// Function to update the rotation of a sprite with mouse pointer position
function updateAngleToMouse(game, view) {
	const dx = game.input.activePointer.x - view.x;
	const dy = game.input.activePointer.y - view.y;
	const targetAngle = (360 / (2 * Math.PI)) * Math.atan2(dy, dx);

	view.angle = targetAngle;
}

// Rotation of sprite1 to the sprite2 position
function updateAngleToSprite(sprite1, sprite2) {
	const dx = sprite1.x - sprite2.x;
	const dy = sprite1.y - sprite2.y;
	const targetAngle = (360 / (2 * Math.PI)) * Math.atan2(dy, dx);

	sprite2.angle = targetAngle;
}

// When a bullet hits a zombie
function spriteHitHealth(sprite, zombie) {
	// Hide the bullet
	bullet.disableBody(true, true);

	zombie.zombieHealth -= weaponDamage;

	if (zombie.zombieHealth < 1) {
		// zombieCount--;
		//  Hide the sprite
		zombieGroup.killAndHide(zombie);

		//  Disable the body
		zombie.body.enable = false;
	}
}

function newRound(zombieGroup, canvasWidth, canvasHeigth) {
	for (let i = 0; i < 10; i++) {
		var random = Phaser.Math.Between(0, 1);
		zombieGroup.create(200 + (random * 200), 200 + (random * 200), 'zombie_animations');
		zombieCount++;
	}
}