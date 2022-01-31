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
let game;

// Game round variables
let currentRound = 0;
let zombieCount = 0;

// Game info varialbes
let ammoInfo;
let healthInfo;
let roundInfo;
let newRoundInfoText

// Damage and health variables
let weaponDamage = 2;
let survivorHealth = 5;

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
		// Zombie variables
		this.lastZombieHit = 0;
		this.zombieHitDelay = 1000;
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
		game = this;
	}

	create() {
		/**
		 **** NEW ROUND INFO ****
		 */
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
		newRoundInfoText = this.add.text(screenCenterX, screenCenterY, `Round: ${currentRound}`, { fontSize: '5rem', color: '#eb5449' }).setOrigin(0.5);

		/**
		 **** AMMO INFO **** 
		 */
		ammoInfo = this.add.text(0, 0, `${this.currentMag} / ${this.ammo}`, { fontSize: '1.5rem' });

		/**
		 **** HEALTH INFO **** 
		 */
		healthInfo = this.add.text(200, 0, `Health: ${survivorHealth}`, { fontSize: '1.5rem' });

		/**
		 **** ROUND INFO **** 
		 */
		roundInfo = this.add.text(500, 0, `Round: ${currentRound}`, { fontSize: '1.5rem' });

		/**
		 ***** SURVIVOR CREATION & ANIMATIONS *****
		 */
		// Add the character sprite to the map
		survivor = this.add.sprite(600, 370, `survivor_animations_${survivorGun}`);
		survivor.setScale(0.3);

		this.add.existing(survivor);
		this.physics.add.existing(survivor);

		survivor.body.setSize(64, 64, 32, 32);

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

		// survivor default animation
		survivor.anims.play(`survivor-idle-${survivorGun}`);

		// Follow the mouse pointer as rotation direction
		this.input.on('pointermove', function (pointer) {
			target = Phaser.Math.Angle.BetweenPoints(survivor, pointer);
		});

		// Set world collition bounds
		survivor.body.setCollideWorldBounds(true);

		/**
		 ***** ZOMBIE CREATION & ANIMATIONS *****
		*/
		// Create the zombies group
		zombieGroup = this.physics.add.group();
		newRound(newRoundInfoText, this);

		/*
			Mouse inputs events
		*/
		// for mouse click event
		mouse = this.input.mousePointer;
		// for mouse position
		input = this.input;

		/*
		   Key define
	   */
		this.keyW = this.input.keyboard.addKey('W');  // Get key W object
		this.keyA = this.input.keyboard.addKey('A');  // Get key A object
		this.keyS = this.input.keyboard.addKey('S');  // Get key S object
		this.keyD = this.input.keyboard.addKey('D');  // Get key D object
		this.keyQ = this.input.keyboard.addKey('Q');  // Get key Q object
		this.keyE = this.input.keyboard.addKey('E');  // Get key E object
		this.keyR = this.input.keyboard.addKey('R');  // Get key R object
		this.key1 = this.input.keyboard.addKey('1');
		this.key2 = this.input.keyboard.addKey('2');
		this.key3 = this.input.keyboard.addKey('3');
		this.key4 = this.input.keyboard.addKey('4');
		this.key5 = this.input.keyboard.addKey('5');
	}
	update(time, delta) {
		/**
		 **** Survivor updates ****
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
				weaponDamage = 3;
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
		 **** Key bindings ****
		*/
		// Movements
		this.keyW.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);		// Up
			survivor.body.setVelocityY(-100);
		});
		this.keyW.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
			survivor.body.setVelocityY(0);
		});
		this.keyA.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);		// Left
			survivor.body.setVelocityX(-100);
		});
		this.keyA.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
			survivor.body.setVelocityX(0);
		});
		this.keyS.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);		// Down
			survivor.body.setVelocityY(100);
		});
		this.keyS.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
			survivor.body.setVelocityY(0);
		});
		this.keyD.on('down', ev => {
			survivor.play(survivorAnimations["walk"]);		// Right
			survivor.body.setVelocityX(100);
		});
		this.keyD.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
			survivor.body.setVelocityX(0);
		});
		// Interactions
		this.keyQ.on('down', ev => {
			survivor.play(survivorAnimations["meleeattack"]);	// Melee atack
		});
		this.keyQ.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		this.keyE.on('down', ev => {
			survivor.play(survivorAnimations["shoot"]);		// Use
		});
		this.keyE.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		this.keyR.on('down', ev => {
			survivor.play(survivorAnimations["reload"]);	// Reload
		});
		this.keyR.on('up', ev => {
			survivor.play(survivorAnimations["idle"]);
		});
		// Change weapon
		this.key1.on('down', ev => {
			survivorGun = availableGuns[0];
		});
		this.key2.on('down', ev => {
			survivorGun = availableGuns[1];
		});
		this.key3.on('down', ev => {
			survivorGun = availableGuns[2];
		});
		this.key4.on('down', ev => {
			survivorGun = availableGuns[3];
		});
		this.key5.on('down', ev => {
			survivorGun = availableGuns[4];
		});

		/**
		 **** Zombie updates ****
		 */
		zombieGroup.children.entries.forEach(zombie => {

			// move zombies to the survivor's position at 160 px/s
			this.physics.moveToObject(zombie, survivor, 100);

			// Rotation of the zombie to the survivor position
			updateAngleToSprite(survivor, zombie);
		});

		/**
		 * ZOMBIE AND SURVIVOR COLLISION
		*/
		//  When a zombie hits the survivor, call
		this.physics.add.overlap(survivor, zombieGroup, zombieHitSurvivor);

		/**
		 * Bullet updates
		 */
		// mouse clicked
		if (mouse.isDown) {
			// Check the delay
			if (this.time.now > (this.shotDelay + this.lastShot)) {
				// Make sure the player can't shoot when dead and that they are able to shoot another bullet
				this.lastShot = this.time.now;

				if (this.currentMag - 1 < 0) {
					this.currentMag = 0;
				} else {
					// Update ammo info
					ammoInfo.setText(`${this.currentMag -= 1} / ${this.ammo}`);
				}

				// change the bullet spawn depending on the gun size
				bullet = this.physics.add.sprite(survivor.x + 20, survivor.y, 'bullet');

				// bullet sprite rotation to mouse firection
				updateAngleToMouse(this, bullet);
				// move bullet to mouse direction
				this.physics.moveTo(bullet, input.x, input.y, 500);
				//  When the bullet sprite his a zombie from zombieGroup, call bulletHitZombie function
				this.physics.add.overlap(bullet, zombieGroup, bulletHitZombie);

				if (zombieCount < 1) {
					survivor.body.enable = false;
					newRound(newRoundInfoText, this);
					survivor.body.enable = true;
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

// When a zombie hits the survivor
function bulletHitZombie(bullet, zombie) {
	// Hide the bullet
	bullet.destroy(true);

	zombie.zombieHealth -= weaponDamage;

	if (zombie.zombieHealth < 1) {
		zombieCount--;

		zombie.destroy(true);
	}
}

// Melee attack
const enableMelee = () => {
	this.attackZone = this.add.zone(this.playerSprite.x, this.playerSprite.y, 20, 40)
	this.playerSprite.on('animationupdate', (anim, frame, sprite, frameKey) => {
		if (frame.index == 1) {
			this.physics.world.disable(this.attackZone);
		}
	});
}

function setZombieAnimations(zombie, scene) {
	zombie.setScale(0.2);

	zombie.anims.create({
		key: 'walk-zombie',
		frames: scene.anims.generateFrameNames('zombie_animations', {
			prefix: "skeleton-move_",
			suffix: ".png",
			start: 0,
			end: 15
		}),
		frameRate: 10,
		repeat: 0
	});

	zombie.anims.create({
		key: 'idle-zombie',
		frames: scene.anims.generateFrameNames('zombie_animations', {
			prefix: "skeleton-idle_",
			suffix: ".png",
			start: 0,
			end: 15
		}),
		frameRate: 8,
		repeat: 0
	});

	zombie.anims.create({
		key: 'meleeattack-zombie',
		frames: scene.anims.generateFrameNames('zombie_animations', {
			prefix: "skeleton-attack_",
			suffix: ".png",
			start: 0,
			end: 7
		}),
		frameRate: 10,
		repeat: 0
	});
}

function addZombies(scene, zombieGroup) {
	let { width, height } = scene.sys.game.canvas;
	for (let i = 0; i < ((currentRound * 4) - (currentRound * 2)); i++) {
		zombieCount++;
		let border = Math.floor(Phaser.Math.Between(0, 1));
		let randomSpeed = Math.floor(Phaser.Math.Between(0, 1));
		
		switch (border) {
			case 0:
				let randomHeigth = Math.floor(Phaser.Math.Between(0, height));
				zombieGroup.create(width - 100, randomHeigth - 100, "zombie_animations");
				break;
			case 1:
				let randomWidth = Math.floor(Phaser.Math.Between(0, width));
				zombieGroup.create(randomWidth - 100, height - 100, "zombie_animations");
				break;
		}
	}

	// Add to each zombie in the zombie group the proper animations
	zombieGroup.children.entries.forEach(zombie => {
		setZombieAnimations(zombie, scene);
		zombie.zombieHealth = 5;
		survivor.body.setSize(64, 64, 64, 64);
		zombie.anims.play('walk-zombie');
	});
}

// Creates a new round by setting the round info as visible and adding the zombies to the game
function newRound(text, scene) {
	text.setText(`Round: ${++currentRound}`);
	text.visible = true;
	scene.time.delayedCall(2000, () => {
		text.visible = false;
		addZombies(scene, zombieGroup);
	}, null, scene);
}

// When a zombie hits the survivor
function zombieHitSurvivor(survivor, zombie) {
	if (game.time.now > (game.zombieHitDelay + game.lastZombieHit)) {
		// Make sure the player can't shoot when dead and that they are able to shoot another bullet
		game.lastZombieHit = game.time.now;

		zombie.anims.play('meleeattack-zombie', 60, false);

		survivorHealth -= 1;
		healthInfo.setText(`Health: ${survivorHealth}`);

		if (survivorHealth < 1) {
			playLostGame();
			survivor.destroy(true);
		}
	}
}

function playLostGame() {
	game.cameras.main.fadeOut(1000, 0, 0, 0);
	game.time.delayedCall(1000, () => {
		game.scene.start('wastedscene');
	});
}
