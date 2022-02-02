import React, { useState } from "react";
import Phaser from 'phaser'
import Instructions from "./instructions";
import HowMade from "./how-it-was-made";
import config from '../PhaserGame';
import menuOptionAudio from '../assets/audio/menu/Menu-Selection-Change-D2.mp3'
import menuSoundTrack from '../assets/audio/music/2021-11-14_-_Ogre_Boss_-_David_Fesliyan.mp3'

// Defines the menu that appears in the home page
export default function Menu() {
	// Set a control variable to check to render or not some web parts
	const [instrClicked, setInstrClicked] = useState(false);
	// Set a control variable to check to render or not some web parts
	const [howMadeClicked, setHowMadeClicked] = useState(false);
	// Set a control variable to check to render or not some web parts
	const [newGame, setNewGame] = useState();
	// Game paused state
	const [gamePaused, setGamePaused] = useState(false);

	var audio = new Audio(menuSoundTrack);
	audio.play();

	document.addEventListener('keypress', (ev) => {
		if (ev.key == 'p' || ev.key == 'P') {
			if (gamePaused) {
				newGame.scene.resume("mainscene");
				document.getElementById("phaser-container").style.visibility = "initial";
				setGamePaused(false);
			} else {
				document.getElementById("phaser-container").style.visibility = "hidden";
				newGame.scene.pause("mainscene");
				setGamePaused(true);
			}
		}
	});

	const handleHover = () => {
		var audio = new Audio(menuOptionAudio);
		audio.play();
	}

	function handleClickNewGame() {
		if (typeof newGame == "object") {
			/*
				The first argument of the destroy method, true, 
				says that I want to remove the game from the canvas element of the page when I destroy the game. 
				The second argument, false, says to NOT remove all of Phaser and its plugins for the page.
			*/
			newGame.destroy(true, false);
		}
		setNewGame(new Phaser.Game(config));
	}

	function handleClickHowMade() {
		if (howMadeClicked) {
			setHowMadeClicked(false);
		} else {
			setHowMadeClicked(true);
		}
	}

	function handleClickInstr() {
		if (instrClicked) {
			setInstrClicked(false);
		} else {
			setInstrClicked(true);
		}
	}

	return (
		<div id="menu">
			{/* Option menu with three default options */}
			<div className="menu-option arcade-font">
				<h2 id="startGame" className="text-option" onClick={handleClickNewGame} onMouseEnter={handleHover}>NEW GAME</h2>
			</div>
			<div className="menu-option arcade-font">
				<h2 className="text-option toogle-fade" onClick={handleClickInstr} onMouseEnter={handleHover}>INSTRUCTIONS</h2>
				{/* If instructions is clicked, show instructions */}
				{instrClicked && <Instructions />}
			</div>
			<div className="menu-option arcade-font">
				<h2 className="text-option toogle-fade" onClick={handleClickHowMade} onMouseEnter={handleHover}>HOW IT WAS MADE</h2>
				{/* If instructions is clicked, show instructions */}
				{howMadeClicked && <HowMade />}
			</div>
		</div>
	)
}