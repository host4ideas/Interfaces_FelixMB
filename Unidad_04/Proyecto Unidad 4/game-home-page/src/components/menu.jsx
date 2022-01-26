import React, { useState } from "react";
import Instructions from "./instructions";
import HowMade from "./how-it-was-made";

// Defines the menu that appears in the home page
export default function Menu() {
	// Set a control variable to check to render or not some web parts
	const [instrClicked, setInstrClicked] = useState(false);
	// Set a control variable to check to render or not some web parts
	const [howMadeClicked, setHowMadeClicked] = useState(false);

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
				<h2 id="startGame" className="text-option">NEW GAME</h2>
			</div>
			{/* Hidden option for in-game control */}
			<div className="menu-option arcade-font">
				<h2 id="pause" className="text-option default-hidden">PAUSE</h2>
			</div>
			{/* Hidden option for in-game control */}
			<div className="menu-option arcade-font">
				<h2 id="resume" className="text-option default-hidden">RESUME</h2>
			</div>
			<div className="menu-option arcade-font">
				<h2 className="text-option toogle-fade" onClick={handleClickInstr}>INSTRUCTIONS</h2>
				{/* If instructions is clicked, show instructions */}
				{instrClicked && <Instructions />}
			</div>
			<div className="menu-option arcade-font">
				<h2 className="text-option toogle-fade" onClick={handleClickHowMade}>HOW IT WAS MADE</h2>
				{/* If instructions is clicked, show instructions */}
				{howMadeClicked && <HowMade />}
			</div>
		</div>
	)
}