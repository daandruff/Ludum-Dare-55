import { Game } from "./src/game.js";
import { Clock, Timer, Timer_Type } from "./src/clock.js";

// Constants
const Canvas = document.getElementById("canvas");
const Context = Canvas.getContext("2d");
const App = new Game(160, 144, Context);

// Globals
let GameTime = new Clock();

function runAnimationFrame() {
	let dt = GameTime.dt;

	App.update(dt, GameTime.ticks);

	Canvas.width = Canvas.width;

	App.draw(GameTime.ticks);

	// Update time and fire new frame
	GameTime.update();
	window.requestAnimationFrame(runAnimationFrame);
}

window.requestAnimationFrame(runAnimationFrame);

Canvas.addEventListener("click", (e) => {
	App.clickEvent(e.offsetX, e.offsetY);
});

window.addEventListener("keydown", (e) => {
	App.keyboardEvent(e.code);
});
